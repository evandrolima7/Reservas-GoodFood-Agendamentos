import { Link } from "react-router-dom";

export const MenuHome = () => {
    return(
        <div className="hidden md:flex flex-col w-80 ml-4 mr-4 bg-black md:border-2 md:border-l-amber-400 border-r-amber-400">
                  <div className="px-4 py-6 border-b border-amber-400/20">
                    <div className="flex items-center justify-between">
                      <p className="text-lg font-semibold text-amber-400 md:text-3xl text-center">Menu</p>
                    </div>
                  </div>
                  <div className="p-4 space-y-4">
                    <Link to="/" className="block text-gray-300 hover:text-amber-400 transition-colors py-2 px-3 rounded-lg hover:bg-gray-800 text-white md:no-underline md:text-2xl">
                      Dashboard
                    </Link>
                    <Link to="/add" className="block text-gray-300 hover:text-amber-400 transition-colors py-2 px-3 rounded-lg hover:bg-gray-800 text-white no-underline md:text-2xl">
                      Nova Reserva
                    </Link>
                    <Link to="/reserves" className="block text-gray-300 hover:text-amber-400 transition-colors py-2 px-3 rounded-lg hover:bg-gray-800 text-white no-underline md:text-2xl">
                      Reservas
                    </Link>
                    <Link to="/rel" className="block text-gray-300 hover:text-amber-400 transition-colors py-2 px-3 rounded-lg hover:bg-gray-800 text-white md:text-2xl">
                      Relatórios
                    </Link>
                    <Link to="/login" className="w-full flex items-center text-white hover:text-blue-300 mt-8 py-2 px-3 rounded-lg md:text-2xl">
                      <span className="mr-2 md:text-2xl text-red-500 no-underline">Sair</span>
                      <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 512 512">
                        <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z" />
                      </svg>
                    </Link>
                  </div>
                </div>
        
    )
}