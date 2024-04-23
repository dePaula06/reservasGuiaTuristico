import axios from "axios";

const api = axios.create({
    baseURL: "http://192.168.100.112:5000/api/v1/",
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
});

const sheets = {
    signInUser: (cpf, senha) => api.post("/reservaguiaturistico/sigin", { cpf, senha }),
}


export default sheets;
