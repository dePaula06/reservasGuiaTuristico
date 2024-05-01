import axios from "axios";

const api = axios.create({
    baseURL: "http://192.168.100.112:5000/api/v1/reservaguiaturistico/",
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
});

const sheets = {
    signInUser: (cpf, senha) => api.post("/sigin", { cpf, senha }),
    createUser: (cpf, nome, email, telefone, senha) => api.post("/user", { cpf, nome, email, telefone, senha }),
    getLocais: () => api.get("/local/") // Adicione esta linha para buscar locais
}

export default sheets;
