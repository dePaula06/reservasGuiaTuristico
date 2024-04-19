const connect = require("../db/connect");

module.exports = class UserController {
    static async createUser(req, res) {
        const { cpf, nome, email, telefone, senha } = req.body;
    
        // Verifica se algum campo está em branco
        if (!cpf || !nome || !email || !telefone || !senha) {
          return res.status(400).json({ error: "Todos os campos são obrigatórios" });
        }
    
        // Verifica se o CPF contém apenas números e possui 11 caracteres
        if (!(/^\d{11}$/).test(cpf)) {
          return res.status(400).json({ error: "CPF inválido" });
        }
    
        // Verifica se o telefone contém apenas números e possui 13 caracteres
        if (!(/^\d{13}$/).test(telefone)) {
          return res.status(400).json({ error: "Telefone inválido" });
        }
    
        // Verifica se o nome não excede 255 caracteres
        if (nome.length > 255) {
          return res.status(400).json({ error: "O nome deve ter no máximo 255 caracteres" });
        }
    
        // Verifica o formato do email e sua dependência de provedor de email
        const emailValid = /^[a-zA-Z0-9._%+-]+@(?:gmail|outlook|yahoo)\.(?:com|com\.br|net|org)$/i;
        if (!emailValid.test(email)) {
          return res.status(400).json({ error: "Formato de email inválido ou provedor não suportado" });
        }
    
        // Verifica a segurança da senha
        const senhaValid = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
        if (!senhaValid.test(senha)) {
          return res.status(400).json({ error: "A senha deve conter no mínimo 8 caracteres, incluindo letras, números e símbolos" });
        }
    
        // Verifica se o email é único
        const queryEmailUnique = `SELECT COUNT(*) as count FROM usuario WHERE email = '${email}'`;
        connect.query(queryEmailUnique, (err, result) => {
          if (err) {
            console.log("Erro: " + err);
            return res.status(500).json({ error: "Erro ao verificar email" });
          }
          if (result[0].count > 0) {
            return res.status(400).json({ error: "O email já está em uso" });
          }
    
          // Verifica se o CPF é único
          const queryCPFUnique = `SELECT COUNT(*) as count FROM usuario WHERE cpf = '${cpf}'`;
          connect.query(queryCPFUnique, (err, result) => {
            if (err) {
              console.log("Erro: " + err);
              return res.status(500).json({ error: "Erro ao verificar CPF" });
            }
            if (result[0].count > 0) {
              return res.status(400).json({ error: "O CPF já está em uso" });
            }
    
            // Verifica se o telefone é único
            const queryTelefoneUnique = `SELECT COUNT(*) as count FROM usuario WHERE telefone = '${telefone}'`;
            connect.query(queryTelefoneUnique, (err, result) => {
              if (err) {
                console.log("Erro: " + err);
                return res.status(500).json({ error: "Erro ao verificar telefone" });
              }
              if (result[0].count > 0) {
                return res.status(400).json({ error: "O telefone já está em uso" });
              }
    
              // Se todos os campos forem únicos, podemos prosseguir com a inserção
              const queryInsert = `INSERT INTO usuario (cpf, nome, email, telefone, senha) VALUES ('${cpf}', '${nome}', '${email}', '${telefone}', '${senha}')`;
              connect.query(queryInsert, (err, result) => {
                if (err) {
                  console.log("Erro: " + err);
                  return res.status(500).json({ error: "Erro ao criar usuário" });
                }
                res.status(201).json({ message: "Usuário criado com sucesso" });
              });
            });
          });
        });
    }
    

  static async getUserByCPF(req, res) {
    const { cpf } = req.params;
    const query = `SELECT * FROM usuario WHERE cpf = '${cpf}'`;

    connect.query(query, (err, result) => {
      if (err) {
        console.log("Erro: " + err);
        return res.status(500).json({ error: "Erro ao buscar usuário" });
      }
      if (result.length === 0) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }
      res.status(200).json({ message: "Usuário encontrado", user: result[0] });
    });
  }

  static async getUsers(req, res) {
    const query = `SELECT * FROM usuario`;

    connect.query(query, (err, result) => {
      if (err) {
        console.log("Erro: " + err);
        return res.status(500).json({ error: "Erro ao buscar usuário" });
      }
      if (result.length === 0) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }
      res.status(200).json({ message: "Usuário encontrado", user: result });
    });
  }

  static async updateUser(req, res) {
    const { cpf } = req.params;
    const { nome, email, telefone, senha } = req.body;

    // Verifica se algum campo está em branco
    if (!nome || !email || !telefone || !senha) {
      return res
        .status(400)
        .json({ error: "Todos os campos são obrigatórios" });
    }

    // Verifica se o nome não excede 255 caracteres
    if (nome.length > 255) {
      return res
        .status(400)
        .json({ error: "O nome deve ter no máximo 255 caracteres" });
    }

    // Verifica o formato do email e sua dependência de provedor de email
    const emailValid =
      /^[a-zA-Z0-9._%+-]+@(?:gmail|outlook|yahoo)\.(?:com|com\.br|net|org)$/i;
    if (!emailValid.test(email)) {
      return res
        .status(400)
        .json({ error: "Formato de email inválido ou provedor não suportado" });
    }

    // Verifica se o telefone contém apenas números e possui 13 caracteres
    if (!/^\d{13}$/.test(telefone)) {
      return res.status(400).json({ error: "Telefone inválido" });
    }

    // Verifica a segurança da senha
    const senhaValid =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (!senhaValid.test(senha)) {
      return res
        .status(400)
        .json({
          error:
            "A senha deve conter no mínimo 8 caracteres, incluindo letras, números e símbolos",
        });
    }

    const query = `UPDATE usuario SET nome = '${nome}', email = '${email}', telefone = '${telefone}', senha = '${senha}' WHERE cpf = '${cpf}'`;

    connect.query(query, (err, result) => {
      if (err) {
        console.log("Erro: " + err);
        return res.status(500).json({ error: "Erro ao atualizar usuário" });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }
      res.status(200).json({ message: "Usuário atualizado com sucesso" });
    });
  }

  static async deleteUser(req, res) {
    const { cpf } = req.params;
    const query = `DELETE FROM usuario WHERE cpf = '${cpf}'`;

    connect.query(query, (err, result) => {
      if (err) {
        console.log("Erro: " + err);
        return res.status(500).json({ error: "Erro ao excluir usuário" });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }
      res.status(200).json({ message: "Usuário excluído com sucesso" });
    });
  }
};
