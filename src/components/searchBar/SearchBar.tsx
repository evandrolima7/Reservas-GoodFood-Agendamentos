interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

export const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="m-auto mb-5 mt-3 relative w-3/4 md:w-100 h-10 bg-gray-100 rounded-5 shadow-md p-1.5 transition-all duration-150 ease-in-out hover:scale-105 hover:shadow-lg">
      <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
        <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
        </svg>
      </div>
      <input
        type="text"
        className="pl-8 pr-24 py-0 text-base text-gray-700 bg-transparent rounded-2xl focus:outline-none"
        placeholder="Pesquisar nome..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} 
      />
    </div>
  );
};
