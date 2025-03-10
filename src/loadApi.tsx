import { api } from "./apiAxios";

export const loadApi = {
    load: async () => {
      const json = await api.getAllReserves();
      return json.list ; 
    }
}