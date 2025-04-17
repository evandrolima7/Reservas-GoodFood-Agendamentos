import axios from "axios";

const http = axios.create({
  baseURL: "https://api-reservas-good-food.onrender.com"
});

http.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  const publicRoutes = ["/register", "/login"];

  if (token && config.url && !publicRoutes.includes(config.url)) {
    config.headers.Authorization = `Bearer ${token}`;  
  }

  return config;
});

export const api = {
  registerNewUser: async (name: string, email: string, password: string) => {
    const res = await http.post("/register", { name, email, password });
    if (res.data.token) {
      localStorage.setItem("token", res.data.token);
    }
    return res.data;
  },

  loginUser: async (email: string, password: string) => {
    const res = await http.post("/login", { email, password });
    if (res.data.token) {
      localStorage.setItem("token", res.data.token);
    }
    return res.data;
  },

  getAllUsers: async () => {
    const res = await http.get("/list");
    return res.data;
  },

  getAllReserves: async () => {
    const res = await http.get("/reserva");
    return res.data;
  },

  getUniqueReserva: async (id: string) => {
    const res = await http.get(`/reserva/${id}`);  
    return res.data;
  },

  createNewReserve: async (
    name: string,
    phone: string,
    dateReserve: string,
    timeReserve: string,
    quantity: number,
    observations?: string
  ) => {
    const payload: any = { name, phone, dateReserve, timeReserve, quantity };
   
    payload.observations = observations?.trim() ?? "";
    const res = await http.post("/reserva", payload);
    return res;
  },

  editReserve: async (
    id: string,
    name?: string,
    phone?: string,
    dateReserve?: string,
    timeReserve?: string,
    quantity?: number,
    observations?: string
  ) => {
    const updatedData: any = {};
    if (name)        updatedData.name        = name;
    if (phone)       updatedData.phone       = phone;
    if (dateReserve) updatedData.dateReserve = dateReserve;
    if (timeReserve) updatedData.timeReserve = timeReserve;
    if (quantity !== undefined) updatedData.quantity     = quantity;
    if (observations !== undefined) updatedData.observations = observations;

    const res = await http.patch(`/reserva/${id}`, updatedData);  
    return res;
  },

  deleteUniqueReserva: async (id: string) => {
    const res = await http.delete(`/reserva/${id}`); 
    return res;
  },
};
