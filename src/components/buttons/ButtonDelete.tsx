import { FC } from "react";

type ButtonDeleteProps = {
  id: string;
  onDelete: (id: string) => void;
};

const ButtonDelete: FC<ButtonDeleteProps> = ({ id, onDelete }) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onDelete(id);
  };

  return (
    <button
      className="brightness-150 dark:red-100 group hover:shadow-lg hover:shadow-red-700/60 transition ease-in-out hover:scale-105 p-1 rounded-4 bg-red-600 hover:bg-red-700 mt-2"
      onClick={handleClick}
    >
      <div className="px-6 py-2 backdrop-blur-xl bg-black/80 rounded-lg font-bold w-full h-full">
        <div className="group-hover:scale-100 flex group-hover:text-white text-white gap-1 md:text-xl">
          <svg
            stroke="currentColor"
            viewBox="0 0 24 24"
            fill="none"
            className="h-5 w-5 mr-2"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              strokeWidth={2}
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          </svg>
          Excluir
        </div>
      </div>
    </button>
  );
};

export default ButtonDelete;