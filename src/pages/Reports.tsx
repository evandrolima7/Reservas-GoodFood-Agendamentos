import { Footer } from "../layouts/Footer";
import { HeaderMenu } from "../layouts/HeaderMenu";
import { SearchBar } from "../components/searchBar/SearchBar";
import { GraphicComponent } from "../components/graphics/GraphicComponent";
import { GraphicComponentLine } from "../components/graphics/GraphicComponentLine";
import { GraphicComponentPie } from "../components/graphics/GraphicComponentPie";
import { useEffect, useState } from "react";
import { api } from "../apiAxios";
import CardClient from "../components/cards/CardClient";
import { toZonedTime, format } from 'date-fns-tz';
import { GraphicComponentQuantity } from "../components/graphics/GraphicComponentQuantity";
import { GraphicComponentMonth } from "../components/graphics/GraphicComponentMonth";
import SpinnerLoader from "../components/spiners/SpinnerLoad";
import ModalDelete from "../components/modals/ModalDelete";
import ModalEdit from "../components/modals/ModalEdite";

export const Reports = () => {
  const [loading, setLoading] = useState(true);
  const [reserves, setReserves] = useState<any[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [reserveToDelete, setReserveToDelete] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [reserveToEdit, setReserveToEdit] = useState<any | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const [editName, setEditName] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [editDate, setEditDate] = useState("");
  const [editTime, setEditTime] = useState("");
  const [editQuantity, setEditQuantity] = useState<number | any>();
  const [editObservations, setEditObservations] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const reservationsPerPage = 6;

  const loadReserves = async () => {
    setLoading(true);
    try {
      const json = await api.getAllReserves();
      setReserves(json.list);
    } catch (error) {
      setErrorMessage("Erro ao carregar as reservas.");
      console.error("Erro ao carregar as reservas", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReserves();
  }, []);

  const requestDelete = (id: string) => {
    setReserveToDelete(id);
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await api.deleteUniqueReserva(id);
      setReserves(prev => prev.filter(res => res._id !== id));
      setShowModal(false);
      setReserveToDelete(null);
    } catch (error) {
      console.error("Erro ao excluir reserva:", error);
      alert("Erro ao excluir reserva.");
    }
  };

  const handleCancelDelete = () => {
    setShowModal(false);
    setReserveToDelete(null);
  };

  const requestEdit = (id: string) => {
    const reserve = reserves.find(r => r._id === id);
    setReserveToEdit(reserve);
    setEditName(reserve.name);
    setEditPhone(reserve.phone);
    setEditDate(reserve.dateReserve);
    setEditTime(reserve.timeReserve);
    setEditQuantity(reserve.quantity);
    setEditObservations(reserve.observations);
    setShowModal(true);
  };

  const handleEdit = async () => {
    if (!reserveToEdit) return;

    const formatDateToBrazil = (date: string) => {
      const brazilTimeZone = 'America/Sao_Paulo';
      const zonedDate = toZonedTime(date, brazilTimeZone);
      return format(zonedDate, 'yyyy-MM-dd', { timeZone: brazilTimeZone });
    };

    const formattedDate = formatDateToBrazil(editDate);

    try {
      await api.editReserve(
        reserveToEdit._id,
        editName,
        editPhone,
        formattedDate,
        editTime,
        editQuantity,
        editObservations
      );
      setReserves(prev =>
        prev.map((reserve) =>
          reserve._id === reserveToEdit._id
            ? { ...reserve, name: editName, phone: editPhone, dateReserve: formattedDate, timeReserve: editTime, quantity: editQuantity, observations: editObservations }
            : reserve
        )
      );
      setShowModal(false);
      setReserveToEdit(null);
    } catch (error) {
      setErrorMessage("Erro ao editar reserva.");
    }
  };

  const handleCancelEdit = () => {
    setShowModal(false);
    setReserveToEdit(null);
  };

  const filteredReserves = reserves.filter((res) =>
    res.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastReservation = currentPage * reservationsPerPage;
  const indexOfFirstReservation = indexOfLastReservation - reservationsPerPage;

  const currentReserves = filteredReserves
    .slice() 
    .reverse()
    .slice(indexOfFirstReservation, indexOfLastReservation);

  const totalPages = Math.ceil(filteredReserves.length / reservationsPerPage);
  const paginate = (pageNumber: number) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <HeaderMenu />
      <div className="flex flex-col md:flex-row max-w-[1200px] m-auto h-auto md:h-screen bg-black">
        <div className="bg-black w-full md:w-220 h-auto md:h-screen overflow-y-auto md:border-2 md:border-l-amber-400 border-r-amber-400">
          <p className="text-center text-white md:text-3xl text-xl py-4">Relatórios</p>
          <GraphicComponent />
          <GraphicComponentLine />
          <GraphicComponentPie />
          <GraphicComponentQuantity />
          <GraphicComponentMonth />
        </div>

        <div className="bg-black w-full md:w-220 h-auto md:h-screen overflow-y-auto md:border-2 md:border-l-amber-400 border-r-amber-400">
          <p className="text-center text-white md:text-3xl text-xl py-4">Todas as reservas</p>
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

          <div className="px-4">
            <div className="w-full p-1 md:pt-5 py-0 ">
              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                {loading ? (
                  <div className="flex justify-center items-center">
                    <SpinnerLoader />
                  </div>
                ) : (
                  currentReserves.map((res: any, index) => (
                    <CardClient
                      key={index}
                      id={res._id}
                      name={res.name}
                      phone={res.phone}
                      quantity={res.quantity}
                      date={res.dateReserve}
                      time={res.timeReserve}
                      observations={res.observations}
                      onDelete={requestDelete}
                      onEdit={requestEdit}
                    />
                  ))
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-4">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-yellow-500 text-white rounded-2 mb-5 disabled:opacity-50"
            >
              Anterior
            </button>
            <span className="px-4 py-2 text-white">{`Página ${currentPage}`}</span>
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage >= totalPages}
              className="px-4 py-2 bg-yellow-500 text-white rounded-2 mb-5 disabled:opacity-50"
            >
              Próxima
            </button>
          </div>
        </div>

        {showModal && reserveToDelete && (
          <ModalDelete handleDelete={handleDelete} handleCancelDelete={handleCancelDelete} reserveToDelete={reserveToDelete} />
        )}

        {showModal && reserveToEdit && (
        <ModalEdit
          show={showModal}
          reserveToEdit={reserveToEdit}
          onSave={handleEdit}
          onCancel={handleCancelEdit}
          errorMessage={errorMessage}
        />
      )}
      </div>
      <Footer />
    </>
  );
};
