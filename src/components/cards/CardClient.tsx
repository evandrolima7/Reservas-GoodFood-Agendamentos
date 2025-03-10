import ButtonDelete from "../buttons/ButtonDelete";
import ButtonEdit from "../buttons/ButtonEdit";

type Card = {
  id: string;
  name: string;
  phone: string;
  quantity: number;
  date: string;
  time: string;
  observations: string;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
};

const CardClient = ({
  id,
  name,
  phone,
  quantity,
  date,
  time,
  observations,
  onDelete,
  onEdit,
}: Card) => {
  return (
    <div className="max-w-xs mb-5 sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto">
      <div className="relative bg-gray-900/50 backdrop-blur-xl rounded-2xl p-6 border border-gray-800">
        <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-yellow-500 rounded-tl-2xl" />
        <div className="absolute top-0 right-0 w-10 h-10 border-t-2 border-r-2 border-yellow-400 rounded-tr-2xl" />
        <div className="absolute bottom-0 left-0 w-10 h-10 border-b-2 border-l-2 border-yellow-500 rounded-bl-2xl" />
        <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-yellow-500 rounded-br-2xl" />
        
        <div className="relative">
          <div className="absolute -top-10 left-0 px-4 py-2 bg-gradient-to-r from-red-500 to-yellow-500 rounded-full text-xs text-white text-center md:-top-10 md:text-md">
            {new Date(date).toLocaleDateString('pt-BR', { timeZone: 'UTC' })} - {time}
          </div>
          <p className="text-xl font-bold pt-4 text-white text-center md:text-left">{name}</p>
          <p className="text-md font-semibold mb-6 text-white bg-clip-text bg-gradient-to-t from-pink-500 via-red-400 to-yellow-500 text-center md:text-left md:text-xl">
            Tel: {phone}
          </p>
          <p className="text-sm mb-6 text-white bg-clip-text bg-gradient-to-t from-pink-500 via-red-400 to-yellow-500 text-center md:text-left md:text-xl">
            Quantidade: {quantity}
          </p>
          <p className="text-sm text-gray-300 mb-8 text-center md:text-left md:text-md">
            Observações: {observations}
          </p>

          <div className="flex flex-col gap-2 mt-4">
            <ButtonEdit id={id} onEdit={onEdit} />
            <ButtonDelete id={id} onDelete={onDelete} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardClient;