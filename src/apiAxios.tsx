import axios from "axios";

const http = axios.create({
    baseURL: "https://api-reservas-good-food.onrender.com"
})

http.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    const publicRoutes = ["/register", "/login"];

    if(token && config.url && !publicRoutes.includes(config.url)){
        config.headers.Authorization = `Bearer ${token}`;
    }
        
   
    return config;
});


export const api = {
    registerNewUser: async(name:string, email:string, password:string) => {
        let response = await http.post("/register", {name, email, password});

        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
        }
        return response.data;
    },
    loginUser: async (email:string, password: string) => {
        let response = await http.post("/login", { email, password });

        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
        }
        return response.data;
    },
    getAllUsers: async() => {
        let response = await http.get("/list")
        return response.data;
    },
    getAllReserves: async() => {
        let response = await http.get("/reserva")
        return response.data;
    },
    getUniqueReserva: async(id: string) => {
        let response = await http.get(`/reserva/${id}`)
        return response.data;
    },
    createNewReserve: async(
        name: string, 
        phone: string,
        dateReserve: string,
        timeReserve: string,
        quantity: number,
        observations: string
    ) => {
        let response = await http.post("/reserva", 
            {name, phone, dateReserve, timeReserve,quantity, observations}
        )
        return response;
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
        let updatedData: any = {};
    
        if (name) updatedData.name = name;
        if (phone) updatedData.phone = phone;
        if (dateReserve) updatedData.dateReserve = dateReserve;
        if (timeReserve) updatedData.timeReserve = timeReserve;
        if (quantity) updatedData.quantity = quantity;
        if (observations) updatedData.observations = observations;
    
        try {
            let response = await http.patch(`/reserva/${id}`, updatedData);
            return response;
        } catch (error) {
            console.error("Erro ao editar reserva:", error);
            throw error;
        }
    },
    deleteUniqueReserva: async(id: string) => {
        let response = await http.delete(`/reserva/${id}`)
        return response;
    },
}