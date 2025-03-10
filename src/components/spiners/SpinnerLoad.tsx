

const SpinnerLoader = () => {
  return (
    <div className="flex flex-row gap-2 ml-70">
      <div className="w-4 h-4 rounded-full bg-yellow-500 animate-bounce" />
      <div className="w-4 h-4 rounded-full bg-yellow-500 animate-bounce [animation-delay:-.3s]" />
      <div className="w-4 h-4 rounded-full bg-yellow-500 animate-bounce [animation-delay:-.5s]" />
    </div>
  );
}

export default SpinnerLoader;
