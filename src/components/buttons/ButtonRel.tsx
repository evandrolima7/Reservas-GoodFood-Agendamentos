import { Link } from "react-router-dom";

const ButtonRel= () => {
    return (
      <button className="mt-5 md:text-center flex m-auto w-60 self-center group relative px-10 py-5 rounded-4 bg-gradient-to-br from-yellow-300 via-amber-400 to-yellow-500 text-black font-bold tracking-wider uppercase text-sm hover:from-yellow-400 hover:via-amber-500 hover:to-yellow-600 transform hover:rotate-1 transition-all duration-300 ease-out shadow-[0_0_20px_rgba(251,191,36,0.5)] hover:shadow-[0_0_30px_rgba(251,191,36,0.7)] active:scale-90 overflow-hidden before:absolute before:inset-0 before:rounded-lg before:border-2 before:border-amber-400/50 before:transition-all before:duration-300 hover:before:border-amber-300 hover:before:scale-105">
        <span className="flex items-center gap-2 relative z-10">
          <svg stroke="currentColor" fill="none" viewBox="0 0 24 24" className="w-5 h-5">
            <path strokeLinecap="round" strokeWidth={2} d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
          </svg>
          <Link to="/rel">
          <p className="text-white text-xl md:text-2xl no-underline">Relatórios</p>
          </Link>
          <svg viewBox="0 0 24 24" stroke="currentColor" fill="none" className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-2">
            <path d="M5 12h14m-7-7l7 7-7 7" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
          </svg>
        </span>
        <div className="absolute inset-0 rounded-lg opacity-50 group-hover:opacity-80 transition-opacity duration-300 bg-gradient-to-tl from-amber-200/40 via-transparent to-transparent" />
        <div className="absolute -left-full top-0 h-full w-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:translate-x-[200%] transition-transform duration-700 ease-out" />
      </button>
    );
  }
  
  export default ButtonRel;