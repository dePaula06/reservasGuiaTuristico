const connect = require("../db/connect");

module.exports = class siginController {
    static async signInAdmin(req, res) {
        const { cpf, senha } = req.body;

        // Verifica se o CPF contém apenas números e possui 11 caracteres
        if (!(/^\d{11}$/).test(cpf)) {
            return res.status(400).json({ error: "CPF inválido" });
        }

        // Verifica a segurança da senha
        const senhaValid = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
        if (!senhaValid.test(senha)) {
        return res.status(400).json({ error: "A senha deve conter no mínimo 8 caracteres, incluindo letras, números e símbolos" });
        }

        // Verifica se o CPF e a senha do administrador são os esperados
        if (cpf !== "12345678919" || senha !== "1234%ht9") {
            return res.status(403).json({ error: "Acesso negado - Credenciais de administrador inválidas" });
        }

        return res.status(200).json({ message: "Login de administrador bem-sucedido" });
    }

    static async signInUser(req, res) {
        const { cpf, senha } = req.body;

        // Verifica se o CPF contém apenas números e possui 11 caracteres
        if (!(/^\d{11}$/).test(cpf)) {
            return res.status(400).json({ error: "CPF inválido" });
        }

        // Verifica a segurança da senha
        const senhaValid = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
        if (!senhaValid.test(senha)) {
        return res.status(400).json({ error: "A senha deve conter no mínimo 8 caracteres, incluindo letras, números e símbolos" });
        }

        // Consulta SQL para verificar se o CPF e a senha correspondem a um usuário registrado
        const query = `SELECT * FROM usuario WHERE cpf = '${cpf}' AND senha = '${senha}'`;

        connect.query(query, (err, result) => {
            if (err) {
                console.log("Erro: " + err);
                return res.status(500).json({ error: "Erro ao fazer login" });
            }

            if (result.length === 0) {
                return res.status(404).json({ error: "Credenciais inválidas" });
            }

            // Se o CPF e a senha correspondem a um usuário, o login é bem-sucedido
            return res.status(200).json({ message: "Login de usuário bem-sucedido" });
        });
    }
};
