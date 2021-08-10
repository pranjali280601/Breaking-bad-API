import axios from "axios"

const instance = axios.create({
    baseURL : "https://www.breakingbadapi.com",
})

export default instance

// /api/characters