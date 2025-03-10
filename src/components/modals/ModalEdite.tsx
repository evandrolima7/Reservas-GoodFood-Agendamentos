import React, { useState, useEffect } from "react";

interface ReservationData {
  name: string;
  phone: string;
  date: string;
  time: string;
  quantity: number;
  observations: string;
}

interface ModalEditProps {
  show: boolean;
  reserveToEdit: any; 
  onSave: (data: ReservationData) => Promise<void>;
  onCancel: () => void;
  errorMessage: string;
}

const ModalEdit: React.FC<ModalEditProps> = ({
  show,
  reserveToEdit,
  onSave,
  onCancel,
  errorMessage,
}) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [quantity, setQuantity] = useState<number>(0);
  const [observations, setObservations] = useState("");

  useEffect(() => {
    if (reserveToEdit) {
      setName(reserveToEdit.name);
      setPhone(reserveToEdit.phone);
      setDate(reserveToEdit.dateReserve);
      setTime(reserveToEdit.timeReserve);
      setQuantity(reserveToEdit.quantity);
      setObservations(reserveToEdit.observations);
    }
  }, [reserveToEdit]);

  if (!show) return null;

  const handleSave = () => {
    onSave({
      name,
      phone,
      date,
      time,
      quantity,
      observations,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
      <div className="bg-white rounded-lg p-6 w-96">
        <h3 className="text-lg font-semibold text-center">Editar Reserva</h3>
        <div className="mt-4">
          <input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Nome"
            className="border rounded-lg px-2 py-2 w-full"
          />
          <input
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            type="text"
            placeholder="Telefone"
            className="border rounded-lg px-2 py-2 w-full mt-2"
          />
          <input
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            type="date"
            className="border rounded-lg px-2 py-2 w-full mt-2"
          />
          <input
            id="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            type="time"
            className="border rounded-lg px-2 py-2 w-full mt-2"
          />
          <input
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            type="number"
            className="border rounded-lg px-2 py-2 w-full mt-2"
          />
          <textarea
            id="observations"
            value={observations}
            onChange={(e) => setObservations(e.target.value)}
            placeholder="Observações"
            className="border rounded-lg px-2 py-2 w-full mt-2"
          />
        </div>
        {errorMessage && <div className="text-red-500 mt-2">{errorMessage}</div>}
        <div className="mt-4 text-center">
          <button
            onClick={handleSave}
            className="bg-yellow-500 text-white py-2 px-4 rounded-2 m-2"
          >
            Salvar
          </button>
          <button
            onClick={onCancel}
            className="bg-gray-500 text-white py-2 px-4 rounded-2 m-2"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalEdit;
