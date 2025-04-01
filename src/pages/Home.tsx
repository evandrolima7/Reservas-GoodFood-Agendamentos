import { useState, useEffect } from "react";
import { loadApi } from "../loadApi";
import CardComponentDash from "../components/cards/CardComponentDash";
import ButtonAdd from "../components/buttons/ButtonAdd";
import ButtonRel from "../components/buttons/ButtonRel";
import { GraphicComponent } from "../components/graphics/GraphicComponent";
import CardClient from "../components/cards/CardClient";
import { Header } from "../layouts/Header";
import { Footer } from "../layouts/Footer";
import img1 from "/public/images/calendar.png";
import img2 from "/public/images/graph.png";
import img3 from "/public/images/pessoas.png";
import { api } from "../apiAxios";
import { toZonedTime, format } from "date-fns-tz";
import { GraphicComponentPie } from "../components/graphics/GraphicComponentPie";
import ModalDelete from "../components/modals/ModalDelete";
import ModalEdit from "../components/modals/ModalEdite";
import { MenuHome } from "../components/menuHome/MenuHome";
import { GraphicComponentMonth } from "../components/graphics/GraphicComponentMonth";
import Spinner from "../components/spiners/Spinner";

export const Home = () => {
  const [reserves, setReserves] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeReservesToday, setActiveReservesToday] = useState(0);
  const [totalPeopleToday, setTotalPeopleToday] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [reserveToDelete, setReserveToDelete] = useState<string | null>(null);
  const [reserveToEdit, setReserveToEdit] = useState<any | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  
  useEffect(() => {
    loadReserves();
  }, []);

  const loadReserves = async () => {
    try {
      const json = await loadApi.load();
      setReserves(json);

      const today = new Date();
      const todayString = today.toISOString().split("T")[0];

      const reservesToday = json.filter((reserve: any) => {
        const reserveDate = new Date(reserve.dateReserve).toISOString().split("T")[0];
        return reserveDate === todayString;
      });

      setActiveReservesToday(reservesToday.length);
      const totalPeople = reservesToday.reduce((acc: number, reserve: any) => acc + reserve.quantity, 0);
      setTotalPeopleToday(totalPeople);
    } catch (error) {
      console.error("Erro ao carregar as reservas", error);
    } finally {
      setLoading(false);
    }
  };

  const requestDelete = (id: string) => {
    setReserveToDelete(id);
    setShowModal(true);
  };

  const requestEdit = (id: string) => {
    const reserve = reserves.find((r) => r._id === id);
    setReserveToEdit(reserve);
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await api.deleteUniqueReserva(id);
      setReserves((prev) => prev.filter((reserve) => reserve._id !== id));
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

  const handleEdit = async (updatedData: {
    name: string;
    phone: string;
    date: string;
    time: string;
    quantity: number;
    observations: string;
  }) => {
    if (!reserveToEdit) return;

    const formatDateToBrazil = (date: string) => {
      const brazilTimeZone = "America/Sao_Paulo";
      const zonedDate = toZonedTime(date, brazilTimeZone);
      return format(zonedDate, "yyyy-MM-dd", { timeZone: brazilTimeZone });
    };

    const formattedDate = formatDateToBrazil(updatedData.date);

    try {
      await api.editReserve(
        reserveToEdit._id,
        updatedData.name,
        updatedData.phone,
        formattedDate,
        updatedData.time,
        updatedData.quantity,
        updatedData.observations
      );
      setReserves((prev) =>
        prev.map((reserve) =>
          reserve._id === reserveToEdit._id
            ? { ...reserve, ...updatedData, dateReserve: formattedDate }
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

  if (loading) {
    return (
      <div className="flex m-auto justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }
  const cardData = [
    {
      title: "Reservas ativas",
      imgCard: img1,
      textCard: "Número de reservas confirmadas",
      numberCard: reserves.length,
    },
    {
      title: "Reservas (Hoje)",
      imgCard: img2,
      textCard: "Número de reservas confirmadas para hoje.",
      numberCard: activeReservesToday,
    },
    {
      title: "Quantidade",
      imgCard: img3,
      textCard: "Quantidade de pessoas estimadas para hoje",
      numberCard: totalPeopleToday,
    },
  ];

  return (
    <>
      <Header />
      <div className="flex flex-row max-w-[1200px] m-auto h-screen bg-black">
       <MenuHome />
        <div className="bg-black w-full md:w-220 h-screen overflow-y-scroll md:border-2 md:border-l-amber-400 border-r-amber-400">
          <p className="text-white text-center text-3xl">Dashboard</p>
          <div className="flex gap-2 mt-3 p-3 text-xs md:mt-0 md:m-10 md:text-xl md:ml-13">
            {cardData.map((card, index) => (
              <CardComponentDash
                key={index}
                title={card.title}
                imgCard={card.imgCard}
                textCard={card.textCard}
                numberCard={card.numberCard}
              />
            ))}
          </div>
          <div className="hidden md:flex flex-row-2 ml-6">
            <GraphicComponent />
            <GraphicComponentPie />
          </div>
          <div className="block md:hidden ">
            <GraphicComponent />
            <GraphicComponentPie />
            <GraphicComponentMonth />
          </div>
          <div className="hidden md:flex flex-row-2 items-stretch">
            <GraphicComponentMonth />
            <ButtonRel />
          </div>
          <div className="md:hidden">
          <ButtonRel />
          </div>
          <p className="text-white text-md ml-6 mt-4 md:text-xl">Últimas reservas:</p>
          <div className="flex scrollbar-thin gap-4 mt-4 bg-black p-3 text-xs overflow-x-scroll text-sm md:gap-10">
            {reserves
              .slice()
              .reverse()
              .slice(0, 9)
              .map((reserve, index) => (
                <CardClient
                  key={index}
                  id={reserve._id}
                  name={reserve.name}
                  phone={reserve.phone}
                  quantity={reserve.quantity}
                  date={reserve.dateReserve}
                  time={reserve.timeReserve}
                  observations={reserve.observations}
                  onDelete={requestDelete}
                  onEdit={requestEdit}
                />
              ))}
          </div>
          <div className="mt-8 flex justify-between ml-6 md:flex md:flex-row md:mt-8 md:ml-40 md:mb-20">
            <ButtonAdd />
            <img className="w-30 mr-10 md:w-50" src="/images/calendario.png" alt="calendario.png" />
          </div>
        </div>
      </div>

      <Footer />

      {showModal && reserveToDelete && (
        <ModalDelete
          handleDelete={handleDelete}
          handleCancelDelete={handleCancelDelete}
          reserveToDelete={reserveToDelete}
        />
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
    </>
  );
};

export default Home;
