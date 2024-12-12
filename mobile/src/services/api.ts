import axios from "axios";

export const api = axios.create({
    // NOTE: Check IP Address
    baseURL: "http://192.168.100.195:3333",
    timeout: 700
})