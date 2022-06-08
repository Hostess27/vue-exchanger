import axios from 'axios'

export class AxiosApi {
    _instance = {}

    constructor (apiUrl) {
        this._instance = axios.create({ baseURL: apiUrl })
    }

    get (endpoint, params) {
        if (!endpoint) throw new Error("Invalid endpoint")
        const response = this._instance.get(endpoint, params)
        return response
    }
}