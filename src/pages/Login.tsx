import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../apiAxios";

const Login = () => {
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const navigate = useNavigate();

  const handleEmailChange = (e: any) => setEmailValue(e.target.value);
  const handlePasswordChange = (e: any) => setPasswordValue(e.target.value);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await api.loginUser(emailValue, passwordValue);
      if (data.token) {
        navigate("/home");
      }
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message || "Erro ao realizar login.");
    }
  };

  return (
    <div className="relative py-3 sm:max-w-xl sm:mx-auto w-full">
      <form onSubmit={handleSubmit}>
        <div className="relative px-4 py-0 bg-black mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
          <div className="text-center text-white">
            <div className="m-auto space-x-2 justify-center">
              <img className="m-auto mt-0" src="/images/logo-good-removebg-preview.png" alt="logotipo" />
              <h1>Login - Reservas</h1>
              <p className="text-yellow-400">Bem-vindo de volta! Acesse sua conta para gerenciar as reservas.</p>
            </div>
            {errorMessage && <div className="text-red-500">{errorMessage}</div>}
            <div className="mt-1">
              <label htmlFor="login" className="font-semibold text-sm md:text-2xl text-white pb-1 block">E-mail</label>
              <input
                id="login"
                value={emailValue}
                onChange={handleEmailChange}
                type="email"
                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full bg-white text-black focus:border-yellow-500 focus:ring-4 focus:ring-yellow-500"
              />
              <label htmlFor="password" className="font-semibold text-sm md:text-2xl text-white pb-1 block">Senha</label>
              <input
                id="password"
                value={passwordValue}
                onChange={handlePasswordChange}
                type="password"
                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full bg-white text-black focus:border-yellow-500 focus:ring-4 focus:ring-yellow-500"
              />
            </div>
            <div className="text-center mb-1">
              <a href="#" className="underline text-xs md:text-lg text-white font-semibold text-gray-500 hover:text-gray-400 cursor-pointer">
                Esqueceu a senha?
              </a>
            </div>
            <div className="mt-1">
              <button
                type="submit"
                className="py-2 px-4 bg-yellow-500 hover:bg-yellow-400 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-3"
              >
                Entrar
              </button>
            </div>
            <div className="flex items-center justify-between mt-4">
              <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4" />
              <Link to="/register" className="text-xs md:text-md text-white uppercase dark:text-gray-400 hover:underline">
                ou Registre-se
              </Link>
              <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4" />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
