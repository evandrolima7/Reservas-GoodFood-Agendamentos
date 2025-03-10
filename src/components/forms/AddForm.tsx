import { useEffect, useState } from "react";
import CardClient from "../cards/CardClient";
import { api } from "../../apiAxios";
import { toZonedTime, format } from 'date-fns-tz';
import SpinnerLoader from "../spiners/SpinnerLoad";
import ModalDelete from "../modals/ModalDelete";
import ModalEdit from "../modals/ModalEdite";


export const AddForm = () => {
  const [reserves, setReserves] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [reserveToDelete, setReserveToDelete] = useState<string | null>(null);
  const [reserveToEdit, setReserveToEdit] = useState<any | null>(null); 
  const [errorMessage, setErrorMessage] = useState<string>("");

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [quantity, setQuantity] = useState<number | any>();
  const [observations, setObservations] = useState("");

  const [editName, setEditName] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [editDate, setEditDate] = useState("");
  const [editTime, setEditTime] = useState("");
  const [editQuantity, setEditQuantity] = useState<number | any>();
  const [editObservations, setEditObservations] = useState("");

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      await api.createNewReserve(name, phone, date, time, quantity, observations);
      loadReserves();
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message || "Erro ao registrar a reserva.");
      console.error("Erro ao registrar a reserva:", error);
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
      await api.editReserve(reserveToEdit._id, editName, editPhone, formattedDate, editTime, editQuantity, editObservations)
      setReserves((prev) =>
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

  return (
    <div className="grid md:flex flex-row">
      <div>
        <div className="flex items-start relative py-5 sm:max-w-xl sm:mx-auto w-full">
          <div className="relative px-4 py-0 bg-black mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
            <div className="text-left text-white md:pl-30 pd-30 mb-20">
              <div className="m-auto text-center space-x-2 justify-center text-2xl md:text-3xl">
                <p>Registrar nova reserva</p>
              </div>
              {errorMessage && <div className="text-red-500">{errorMessage}</div>}
              <div className="mt-1">
                <label htmlFor="name" className="font-semibold text-md md:text-xl text-white pb-1 block">
                  Nome:
                </label>
                <input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  className="border rounded-lg px-2 py-2 mt-1 mb-2 text-sm w-full bg-white text-black focus:border-yellow-500 focus:ring-4 focus:ring-yellow-500 md:py-0"
                />
                <label htmlFor="phone" className="font-semibold text-md md:text-xl text-white pb-1 block">
                  Telefone:
                </label>
                <input
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  type="text"
                  className="border rounded-lg px-2 py-2 mt-1 mb-3 text-sm w-full bg-white text-black focus:border-yellow-500 focus:ring-4 focus:ring-yellow-500 md:py-0"
                />
                <label htmlFor="date" className="font-semibold text-md md:text-xl text-white pb-1 block">
                  Data:
                </label>
                <input
                  id="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  type="date"
                  className="border rounded-lg px-2 py-2 mt-1 mb-3 text-sm w-full bg-white text-black focus:border-yellow-500 focus:ring-4 focus:ring-yellow-500 md:py-0"
                />
                <label htmlFor="time" className="font-semibold text-md md:text-xl text-white pb-1 block">
                  Hora:
                </label>
                <input
                  id="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  type="time"
                  className="border rounded-lg px-2 py-2 mt-1 mb-3 text-sm w-full bg-white text-black focus:border-yellow-500 focus:ring-4 focus:ring-yellow-500 md:py-0"
                />
                <label htmlFor="quantity" className="font-semibold text-md md:text-2xl text-white pb-1 block">
                  Quantidade:
                </label>
                <input
                  id="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  type="number"
                  className="border rounded-lg px-2 py-2 mt-1 mb-3 text-sm w-full bg-white text-black focus:border-yellow-500 focus:ring-4 focus:ring-yellow-500 md:py-0"
                />
                <label htmlFor="observations" className="font-semibold text-md md:text-xl text-white pb-1 block">
                  Observações:
                </label>
                <textarea
                  id="observations"
                  value={observations}
                  onChange={(e) => setObservations(e.target.value)}
                  className="md:py-1 border rounded-lg px-3 py-5 mt-1 mb-3 text-sm w-full bg-white text-black focus:border-yellow-500 focus:ring-4 focus:ring-yellow-500"
                />
              </div>
              <div className="mt-1">
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="py-2 px-4 bg-yellow-500 hover:bg-yellow-400 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-3"
                >
                  Registrar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="justify-center m-auto">
        <div className="w-full p-1 md:pt-5 h-screen py-0 overflow-y-scroll">
          <p className="text-white md:text-3xl mb-5 text-center">Últimas reservas</p>
          <div className="w-full md:grid grid-cols-2 gap-4">
            {loading ? (
              <div className="ml-40 w-full">
                <SpinnerLoader />
              </div>
            ) : (
              reserves
                .slice()
                .reverse()
                .slice(0, 9)
                .map((res: any, index) => (
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
  );
};

export default AddForm;
