import { Link } from "react-router-dom";

const ButtonAdd = () => {
    return (
      <div className="flex flex-col items-center">
        <p className="text-white text-md text-center md:text-yellow-300 md:text-xl">
          Nova reserva:
        </p>
        <Link to="/add">
        <button
          className="ml-4 group cursor-pointer outline-none hover:rotate-90 duration-300 w-32 md:w-40"
          title="Add New"
        >
          <svg
            className="m-auto w-20 md:w-32 stroke-yellow-400 fill-none group-hover:fill-yellow-800 group-active:stroke-yellow-200 group-active:fill-yellow-600 duration-300"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeWidth="1.5" d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z" />
            <path strokeWidth="1.5" d="M8 12H16" />
            <path strokeWidth="1.5" d="M12 16V8" />
          </svg>
        </button>
        </Link>
        <p className="text-white text-md pt-6 text-center md:text-xl">Adicionar</p>
      </div>
    );
  };
  
  export default ButtonAdd;
  