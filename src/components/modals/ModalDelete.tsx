import React from "react";

interface ModalDeleteProps {
  handleDelete: (id: string) => Promise<void>;
  reserveToDelete: string;
  handleCancelDelete: () => void;
}

const ModalDelete: React.FC<ModalDeleteProps> = ({ handleDelete, reserveToDelete, handleCancelDelete }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-75">
      <div className="bg-white rounded-lg p-6 w-96">
        <h3 className="text-lg font-semibold text-center">Tem certeza que deseja excluir?</h3>
        <div className="mt-4 text-center">
          <button
            onClick={() => handleDelete(reserveToDelete)}
            className="bg-red-600 text-white py-2 px-4 rounded-2 m-2"
          >
            Confirmar
          </button>
          <button
            onClick={handleCancelDelete}
            className="bg-gray-500 text-white py-2 px-4 rounded-2 m-2"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalDelete;
