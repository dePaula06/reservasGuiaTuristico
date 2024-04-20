const connect = require('../db/connect');

module.exports = class guiaController{

    static async createGuia(req, res){
        const {idLocal, nome, telefone, idiomas, preco, descricao, especialidades, fotoPerfil} = req.body;

        // Verifica se algum campo está em branco
        if (!idLocal || !nome || !idiomas || !telefone || !preco || !especialidades || !fotoPerfil) {
            return res.status(400).json({ error: "Todos os campos são obrigatórios" });
        }

        // Verifica se o telefone contém apenas números e possui 13 caracteres
        if (!(/^\d{13}$/).test(telefone)) {
            return res.status(400).json({ error: "Telefone inválido" });
        }

        // Verifica se o nome não excede 255 caracteres
        if (nome.length > 255) {
            return res.status(400).json({ error: "O nome deve ter no máximo 255 caracteres" });
        }

        // Verifica se idiomas não excede 255 caracteres
        if (idiomas.length > 255) {
            return res.status(400).json({ error: "Os idiomaa devem ter no máximo 255 caracteres" });
        }

        // Verifica se o campo descricao não excede 455 caracteres
        if (descricao.length > 455) {
            return res.status(400).json({ error: "A descrição deve ter no máximo 455 caracteres" });
        }

        // Verifica se o campo especialidades não excede 455 caracteres
        if (especialidades.length > 455) {
            return res.status(400).json({ error: "As especialidades devem ter no máximo 455 caracteres" });
        }

        // Verifica o formato do preço
        if (!/^\d{1,4}(\.\d{1,2})?$/.test(preco)) {
            return res.status(400).json({ error: "Formato de preço inválido. O preço deve ter no máximo 4 dígitos antes da vírgula e no máximo 2 dígitos depois." });
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
        const queryInsert = `INSERT INTO guia (idLocal, nome, idiomas, telefone, descricao, especialidades, preco, fotoPerfil) VALUES ('${idLocal}', '${nome}', '${idiomas}', '${telefone}', '${descricao}', '${especialidades}', '${preco}', '${fotoPerfil}')`;
        connect.query(queryInsert, (err, result) => {
          if (err) {
            console.log("Erro: " + err);
            return res.status(500).json({ error: "Erro ao criar guia" });
          }
          res.status(201).json({ message: "Guia criado com sucesso" });
        });
    });
    }

    static async getGuiaByID(req, res) {
        const { idGuia } = req.params;
        const query = `SELECT * FROM guia WHERE idGuia = '${idGuia}'`;
    
        connect.query(query, (err, result) => {
          if (err) {
            console.log("Erro: " + err);
            return res.status(500).json({ error: "Erro ao buscar guia" });
          }
          if (result.length === 0) {
            return res.status(404).json({ message: "Guia não encontrado" });
          }
          res.status(200).json({ message: "Guia encontrado", guia: result[0] });
        });
      }
    
      static async getGuias(req, res) {
        const query = `SELECT * FROM guia`;
    
        connect.query(query, (err, result) => {
          if (err) {
            console.log("Erro: " + err);
            return res.status(500).json({ error: "Erro ao buscar guia" });
          }
          if (result.length === 0) {
            return res.status(404).json({ message: "Guia não encontrado" });
          }
          res.status(200).json({ message: "Guias encontrados", guia: result });
        });
      }

      static async updateGuia(req, res){
        const { idGuia } = req.params;
        const {idLocal, nome, telefone, idiomas, preco, descricao, especialidades, fotoPerfil} = req.body;

        // Verifica se algum campo está em branco
        if (!idLocal || !nome || !idiomas || !telefone || !preco || !especialidades || !fotoPerfil) {
            return res.status(400).json({ error: "Todos os campos são obrigatórios" });
        }

        // Verifica se o telefone contém apenas números e possui 13 caracteres
        if (!(/^\d{13}$/).test(telefone)) {
            return res.status(400).json({ error: "Telefone inválido" });
        }

        // Verifica se o nome não excede 255 caracteres
        if (nome.length > 255) {
            return res.status(400).json({ error: "O nome deve ter no máximo 255 caracteres" });
        }

        // Verifica se idiomas não excede 255 caracteres
        if (idiomas.length > 255) {
            return res.status(400).json({ error: "Os idiomaa devem ter no máximo 255 caracteres" });
        }

        // Verifica se o campo descricao não excede 455 caracteres
        if (descricao.length > 455) {
            return res.status(400).json({ error: "A descrição deve ter no máximo 455 caracteres" });
        }

        // Verifica se o campo especialidades não excede 455 caracteres
        if (especialidades.length > 455) {
            return res.status(400).json({ error: "As especialidades devem ter no máximo 455 caracteres" });
        }

        // Verifica o formato do preço
        if (!/^\d{1,4}(\.\d{1,2})?$/.test(preco)) {
            return res.status(400).json({ error: "Formato de preço inválido. O preço deve ter no máximo 4 dígitos antes da vírgula e no máximo 2 dígitos depois." });
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

          const query = `UPDATE guia SET idLocal = '${idLocal}', nome = '${nome}', idiomas = '${idiomas}', telefone = '${telefone}', descricao = '${descricao}', especialidades = '${especialidades}', preco = '${preco}', fotoPerfil = '${fotoPerfil}'  WHERE idGuia = '${idGuia}'`;

          connect.query(query, (err, result) => {
            if (err) {
              console.log("Erro: " + err);
              return res.status(500).json({ error: "Erro ao atualizar guia" });
            }
            if (result.affectedRows === 0) {
              return res.status(404).json({ message: "Guia não encontrado" });
            }
            res.status(200).json({ message: "Guia atualizado com sucesso" });
          });
        });
      }

      static async deleteGuia(req, res) {
        const { idGuia } = req.params;
        const query = `DELETE FROM guia WHERE idGuia = '${idGuia}'`;
    
        connect.query(query, (err, result) => {
          if (err) {
            console.log("Erro: " + err);
            return res.status(500).json({ error: "Erro ao excluir guia" });
          }
          if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Guia não encontrado" });
          }
          res.status(200).json({ message: "Guia excluído com sucesso" });
        });
      }
}