import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../apiAxios";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false); 
  const navigate = useNavigate();

  const handleNameChange = (e: any) => setName(e.target.value);
  const handleEmailChange = (e: any) => setEmail(e.target.value);
  const handlePasswordChange = (e: any) => setPassword(e.target.value);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await api.registerNewUser(name, email, password);
      if (data.token) {
        navigate("/login");
      }
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message || "Erro ao registrar usuário.");
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="min-h-screen flex items-start relative py-3 sm:max-w-xl sm:mx-auto w-full">
      <form onSubmit={handleSubmit} method="post">
        <div className="relative px-4 py-0 bg-black mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
          <div className="text-center text-white">
            <div className="m-auto space-x-2 justify-center">
              <img className="m-auto mt-0 w-40" src="/public/images/logo-good-removebg-preview.png" alt="logotipo" />
              <h1>Registrar usuário</h1>
              <p className="text-yellow-400">Registre-se para poder ter acesso ao gerenciador de reservas.</p>
            </div>
            {errorMessage && <div className="text-red-500">{errorMessage}</div>}
            <div className="mt-1">
              <label htmlFor="name" className="font-semibold text-md md:text-2xl text-white pb-1 block">Nome</label>
              <input
                id="name"
                value={name}
                onChange={handleNameChange}
                type="text"
                className="border rounded-lg px-3 py-2 mt-1 mb-2 text-sm w-full bg-white text-black focus:border-yellow-500 focus:ring-4 focus:ring-yellow-500"
              />
              <label htmlFor="email" className="font-semibold text-md md:text-2xl text-white pb-1 block">E-mail</label>
              <input
                id="email"
                value={email}
                onChange={handleEmailChange}
                type="email"
                className="border rounded-lg px-3 py-2 mt-1 mb-3 text-sm w-full bg-white text-black focus:border-yellow-500 focus:ring-4 focus:ring-yellow-500"
              />
              <label htmlFor="password" className="font-semibold text-md md:text-2xl text-white pb-1 block">Senha</label>
              <input
                id="password"
                value={password}
                onChange={handlePasswordChange}
                type="password"
                className="border rounded-lg px-3 py-2 mt-1 mb-3 text-sm w-full bg-white text-black focus:border-yellow-500 focus:ring-4 focus:ring-yellow-500"
              />
            </div>
            <div className="mt-1">
              <button
                type="submit"
                className="py-2 px-4 bg-yellow-500 hover:bg-yellow-400 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-3"
                disabled={loading} 
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-4 border-t-transparent border-yellow-500 rounded-full animate-spin"></div>
                    <span className="ml-2">Registrando...</span>
                  </div>
                ) : (
                  "Registrar"
                )}
              </button>
            </div>
            <div className="flex items-center justify-between mt-4">
              <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4" />
              <Link to="/login" className="text-xs md:text-md text-white uppercase dark:text-gray-400 hover:underline">
                ou Já tem uma conta
              </Link>
              <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4" />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Signup;
