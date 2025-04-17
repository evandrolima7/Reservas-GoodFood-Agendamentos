import { useState, useRef, useEffect } from 'react'
import { HeaderMenu } from "../layouts/HeaderMenu"
import { Footer } from "../layouts/Footer"
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { DateClickArg } from '@fullcalendar/interaction'
import { api } from '../apiAxios'
import { loadApi } from '../loadApi'
import { toZonedTime, format } from 'date-fns-tz'
import CardClient from '../components/cards/CardClient'
import ModalDelete from '../components/modals/ModalDelete'
import ModalEdit from '../components/modals/ModalEdite'
import Spinner from '../components/spiners/Spinner'

export const Reserves = () => {
    const timeZone = 'America/Sao_Paulo'
    const [selectedDate, setSelectedDate] = useState<Date>(toZonedTime(new Date(), timeZone))
    const calendarRef = useRef<FullCalendar>(null)
  
    const handleDayChange = (direction: 'left' | 'right') => {
      const newDate = new Date(selectedDate)
      newDate.setDate(newDate.getDate() + (direction === 'left' ? -1 : 1))
      setSelectedDate(newDate)
      calendarRef.current?.getApi().gotoDate(newDate)
    }
  
    const handleDateClick = (info: DateClickArg) => {
      setSelectedDate(info.date)
      calendarRef.current?.getApi().gotoDate(info.date)
    }
  
    const handleTodayClick = () => {
      const today = toZonedTime(new Date(), timeZone)
      setSelectedDate(today)
      calendarRef.current?.getApi().today()
      calendarRef.current?.getApi().gotoDate(today)
    }
  
    const nowDate = format(selectedDate, 'dd/MM/yyyy')

  const [reserves, setReserves] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [reserveToDelete, setReserveToDelete] = useState<string | null>(null)
  const [reserveToEdit, setReserveToEdit] = useState<any | null>(null)
  const [errorMessage, setErrorMessage] = useState<string>("")
  const [, setName] = useState("")
  const [, setPhone] = useState("")
  const [, setDate] = useState("")
  const [, setTime] = useState("")
  const [, setQuantity] = useState<number | any>()
  const [, setObservations] = useState("")

  useEffect(() => {
    loadReserves()
  }, [])

  const loadReserves = async () => {
    try {
      const json = await loadApi.load()
      setReserves(json)
    } catch (error) {
      console.error("Erro ao carregar as reservas", error)
    } finally {
      setLoading(false)
    }
  }

  const getLocalDateFromUTC = (dateStr: string): Date | null => {
    const utcDate = new Date(dateStr);
    if (isNaN(utcDate.getTime())) return null; 
  
    return new Date(
      utcDate.getUTCFullYear(),
      utcDate.getUTCMonth(),
      utcDate.getUTCDate()
    );
  };

const filteredReserves = reserves.filter((res) => {
  const localDate = getLocalDateFromUTC(res.dateReserve);
  if (!localDate) return false;
  
  const reservaDate = format(localDate, 'yyyy-MM-dd');
  const selected = format(selectedDate, 'yyyy-MM-dd');
  return reservaDate === selected;
});

const reservationDates = new Set(
  reserves.map(res => {
    const localDate = getLocalDateFromUTC(res.dateReserve);
    return localDate ? format(localDate, 'yyyy-MM-dd') : '';
  }).filter(date => date !== '')
);

  const requestDelete = (id: string) => {
    setReserveToDelete(id)
    setShowModal(true)
  }

  const requestEdit = (id: string) => {
    const reserve = reserves.find(r => r._id === id)
    setReserveToEdit(reserve)
    setShowModal(true)
  }

  const handleDelete = async (id: string) => {
    try {
      await api.deleteUniqueReserva(id)
      setReserves(prev => prev.filter(reserve => reserve._id !== id))
      setShowModal(false)
      setReserveToDelete(null)
    } catch (error) {
      console.error("Erro ao excluir reserva:", error)
      alert("Erro ao excluir reserva.")
    }
  }

  const handleCancelDelete = () => {
    setShowModal(false)
    setReserveToDelete(null)
  }

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
      if (!date) {
        throw new Error("Data inválida ou vazia.");
      }
      const brazilTimeZone = 'America/Sao_Paulo';
      const zonedDate = toZonedTime(date, brazilTimeZone);
      return format(zonedDate, 'yyyy-MM-dd', { timeZone: brazilTimeZone });
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
    setShowModal(false)
    setReserveToEdit(null)
  }

  useEffect(() => {
    if (reserveToEdit) {
      setName(reserveToEdit.name)
      setPhone(reserveToEdit.phone)
      setDate(reserveToEdit.dateReserve)
      setTime(reserveToEdit.timeReserve)
      setQuantity(reserveToEdit.quantity)
      setObservations(reserveToEdit.observations)
    }
  }, [reserveToEdit])

  if (loading) {
    return (
      <div className="flex m-auto justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <HeaderMenu />
      <div className=" md:flex items-start md:p-20 pt-1">
        <div className="bg-black text-white w-full py-4 ">
          <div className="flex flex-col items-center justify-center px-2 px-4">
            <div className="flex items-center mb-4 md:mb-6 space-x-2 md:space-x-4">
              <button
                onClick={() => handleDayChange('left')}
                className="bg-gray-700 hover:bg-gray-600 text-white p-1 md:p-2 rounded-full transition duration-300"
              >
                <FaChevronLeft className="text-xl md:text-3xl" />
              </button>

              <p className="text-lg md:text-2xl font-semibold mx-2 md:ml-4">
                {nowDate}
              </p>

              <button
                onClick={() => handleDayChange('right')}
                className="bg-gray-700 hover:bg-gray-600 text-white p-1 md:p-2 rounded-full transition duration-300"
              >
                <FaChevronRight className="text-xl md:text-3xl" />
              </button>
            </div>

            <div className="bg-gray-800 p-2 md:p-4 rounded-lg shadow-lg w-full max-w-6xl">
              <div className="overflow-x-auto">
                <FullCalendar
                  ref={calendarRef}
                  plugins={[dayGridPlugin, interactionPlugin]}
                  initialView="dayGridMonth"
                  initialDate={selectedDate}
                  

                  events={reserves.map((res: any) => ({
                    id: res._id,
                    title: "Reserva",
                    date: res.dateReserve,
                    allDay: true,
                    display: 'background',
                    backgroundColor: '#378006'
                  }))}
                  dateClick={handleDateClick}
                  headerToolbar={{
                    left: 'customToday',
                    center: 'title',
                    right: 'prev,next',
                    
                  }}
                  customButtons={{
                    customToday: {
                      text: 'Hoje',
                      click: handleTodayClick,
                    }
                  }}
                  key={selectedDate.toISOString()}
                  aspectRatio={1.5}
                  height={'auto'}
                  contentHeight={'auto'}
                  windowResizeDelay={100}
                  dayCellDidMount={(info) => {
                    const dateStr = format(info.date, 'yyyy-MM-dd', { timeZone: 'America/Sao_Paulo' });
                    if (reservationDates.has(dateStr)) {
                      info.el.style.backgroundColor = "#9336"
                    }
                  }}
                  views={{
                    dayGridMonth: {
                      titleFormat: { year: 'numeric', month: 'short' },
                      dayHeaderFormat: { weekday: 'short' }
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="md:w-full mt-4 md:mt-0">
          <div className="justify-center m-auto">
            
            <div className="w-full p-1 md:pt-5 h-screen py-0 overflow-y-scroll">
              <p className="text-white md:text-3xl mb-5 text-center">Reservas</p>
              {filteredReserves.length === 0 ? (
                <div className="text-white text-center">Não há reservas para hoje!</div>
              ) : (
                <div className="w-screen flex scrollbar-thin gap-4 mt-4 bg-black p-3 text-xs overflow-x-scroll md:grid grid-cols-2 md:w-auto gap-4">
                  {filteredReserves
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
                    ))}
                </div>
              )}
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
      </div>
      <Footer />
    </>
  )
}