import { axiosApi } from "@/js/api";

export async function getRatesFromApi() {
    const { data } = await axiosApi.get("/v3/exchange-rates");
    return data;
}
