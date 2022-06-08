import { AxiosApi } from "./axios.api";

let axiosApi

// singleton pattern
function initApi () {
    axiosApi = new AxiosApi('https://api.kuna.io:443')
}

export { axiosApi, initApi }