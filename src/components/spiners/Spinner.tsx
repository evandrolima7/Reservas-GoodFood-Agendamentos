const Spinner = () => {
  return (
    <div className="flex flex-col justify-center items-center h-full">
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-yellow-500" />
      <h2 className="text-black mt-4">Carregando... </h2>
      <p className="text-black dark:text-zinc-400">
        Aguarde mais um pouco...
      </p>
    </div>
  );
};

export default Spinner;
