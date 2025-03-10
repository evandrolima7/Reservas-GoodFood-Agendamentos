type Card = {
  title: string;
  imgCard: string;
  textCard: string;
  numberCard: number;
};

const CardComponentDash = ({
  title,
  imgCard,
  textCard,
  numberCard
}: Card) => {
  return (
    <div className="m-auto w-full sm:w-80 md:w-96 lg:w-80 xl:w-96 h-64 duration-500 group overflow-hidden relative rounded bg-white text-neutral-50 p-4 flex flex-col justify-evenly text-center text-black border-2 rounded-4 shadow-md ">
      <div className="absolute blur duration-500 group-hover:blur-none w-36 h-36 rounded-full group-hover:translate-x-12 group-hover:translate-y-12 bg-yellow-400 right-1 -bottom-24" />
      <div className="absolute blur duration-500 group-hover:blur-none w-12 h-12 rounded-full group-hover:translate-x-12 group-hover:translate-y-2 bg-yellow-200 right-12 bottom-12" />
      <div className="absolute blur duration-500 group-hover:blur-none w-36 h-36 rounded-full group-hover:translate-x-12 group-hover:-translate-y-12 bg-amber-300 right-1 -top-12" />
      <div className="absolute blur duration-500 group-hover:blur-none w-24 h-24 bg-amber-400 rounded-full group-hover:-translate-x-12" />
      
      <div className="z-10 flex flex-col justify-evenly w-full h-full">
        <span className="text-xs font-bold md:text-xl">{title}</span>
        <img className="w-16 sm:w-24 m-auto" src={imgCard} alt="Imagem do card" />
        <p className="md:text-sm">{textCard}</p> 
        <h3>{numberCard}</h3>
      </div>
    </div>
  );
};

export default CardComponentDash;
