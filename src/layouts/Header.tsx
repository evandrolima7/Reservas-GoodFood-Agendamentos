import { Link } from "react-router-dom";

export const Header = () => {
  const date: Date = new Date();
  const nowDate: string = date.toLocaleDateString('pt-BR');

  return (
    <div className="relative">
      <nav className=" top-0 w-full bg-black border-b-2 border-amber-400 shadow-xl z-50 ">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-[1200px]">
          <div className="flex items-center justify-between h-24 items-stretch">
            <div className="flex-shrink-0 flex items-center space-x-4">
              <img 
                className="w-32 transition-transform hover:scale-105" 
                src="/images/logo-good-removebg-preview.png" 
                alt="Logotipo" 
              />
            </div>
            <p className="text-xl text-gray-300 text-center self-center">{nowDate} <br/>Reservas</p>
            <p className="hidden md:flex text-xl text-gray-300 text-center self-center flex flex-row"><svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-person-fill text-white dark:text-indigo-300 w-10 h-7" viewBox="0 0 16 16">
        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"></path>
      </svg> </p>

            {/* Menu Mobile Button */}
            <div className="md:hidden self-center">
              <button 
                className=" p-2 rounded-md text-gray-400 hover:text-amber-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-amber-400"
                type="button" 
                data-bs-toggle="offcanvas" 
                data-bs-target="#offcanvasDarkNavbar"
                aria-controls="offcanvasDarkNavbar"
              >
                <span className="sr-only ">Abrir menu</span>
                <svg 
                  className="h-6 w-6" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M4 6h16M4 12h16M4 18h16" 
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu (Offcanvas) */}
      <div 
        className="offcanvas offcanvas-end fixed right-0 top-0 h-full w-64 bg-black shadow-2xl transform transition-transform duration-300 ease-in-out"
        id="offcanvasDarkNavbar"
        aria-labelledby="offcanvasDarkNavbarLabel"
      >
        <div className="px-4 py-6 border-b border-amber-400/20">
          <div className="flex items-center justify-between">
            <p className="text-lg font-semibold text-amber-400 ">Menu</p>
            <button 
              type="button" 
              className="text-gray-400 hover:text-amber-400 transition-colors"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-4 space-y-4">
        <Link to="/home" className="block text-gray-300 hover:text-amber-400 transition-colors py-2 px-3 rounded-lg hover:bg-gray-800 text-white no-underline">
            Dashboard
          </Link>
          <Link to="/add" className="block text-gray-300 hover:text-amber-400 transition-colors py-2 px-3 rounded-lg hover:bg-gray-800 text-white no-underline">
            Nova Reserva
          </Link>
          <Link to="/reserves" className="block text-gray-300 hover:text-amber-400 transition-colors py-2 px-3 rounded-lg hover:bg-gray-800 text-white no-underline">
            Reservas
          </Link>
          <Link to="/rel" className="block text-gray-300 hover:text-amber-400 transition-colors py-2 px-3 rounded-lg hover:bg-gray-800 text-white no-underline">
            Relatórios
          </Link>
          <Link to="/login"><button className="w-full flex items-center text-red-400 hover:text-red-300 mt-8 py-2 px-3 rounded-lg hover:bg-gray-800">
            <span className="mr-2">Sair</span>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 512 512">
              <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z" />
            </svg>
          </button></Link>
        </div>
      </div>
    </div>
  );
};
