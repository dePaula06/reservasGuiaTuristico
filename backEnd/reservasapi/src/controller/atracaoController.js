const connect = require("../db/connect");

module.exports = class AtracaoController {
  static async createAtracao(req, res) {
    const { idLocal, atracao, fotoAtracao } = req.body;

    if (!idLocal || !atracao || !fotoAtracao) {
      return res
        .status(400)
        .json({ error: "Todos os campos são obrigatórios" });
    }

    // Verifica se a atração já existe
    const existQuery = `SELECT * FROM atracao WHERE atracao = ? AND idLocal = ?`;
    connect.query(existQuery, [atracao, idLocal], (err, result) => {
      if (err) {
        console.error("Erro ao verificar a existência da atração: " + err);
        return res
          .status(500)
          .json({ error: "Erro ao verificar a existência da atração" });
      }

      if (result.length > 0) {
        return res
          .status(409)
          .json({ error: "Atração já existente para este local" });
      }

      // Insere a nova atração se não existir
      const insertQuery = `INSERT INTO atracao (idLocal, atracao, fotoAtracao) VALUES (?, ?, ?)`;
      connect.query(
        insertQuery,
        [idLocal, atracao, fotoAtracao],
        (err, result) => {
          if (err) {
            console.error("Erro ao criar atração: " + err);
            return res.status(500).json({ error: "Erro ao criar atração" });
          }
          res.status(201).json({ message: "Atração criada com sucesso" });
        }
      );
    });
  }

  static async getAtracoes(req, res) {
    const query = `SELECT * FROM atracao`;

    connect.query(query, (err, result) => {
      if (err) {
        console.log("Erro: " + err);
        return res.status(500).json({ error: "Erro ao buscar atração" });
      }
      if (result.length === 0) {
        return res.status(404).json({ message: "Atração não encontrada" });
      }
      res
        .status(200)
        .json({ message: "Atrações encontradas", atracao: result });
    });
  }

  static async getAtracaoByID(req, res) {
    const { idAtracao } = req.params;
    const query = `SELECT * FROM atracao WHERE idAtracao = '${idAtracao}'`;

    connect.query(query, (err, result) => {
      if (err) {
        console.log("Erro: " + err);
        return res.status(500).json({ error: "Erro ao buscar atração" });
      }
      if (result.length === 0) {
        return res.status(404).json({ message: "Atração não encontrada" });
      }
      res
        .status(200)
        .json({ message: "Atração encontrada", atracao: result[0] });
    });
  }

  static async updateAtracao(req, res) {
    const { idAtracao } = req.params;
    const { idLocal, atracao, fotoAtracao } = req.body;

    // Verifica se a atração já existe
    const existQuery = `SELECT * FROM atracao WHERE atracao = ? AND idLocal = ?`;
    connect.query(existQuery, [atracao, idLocal], (err, result) => {
      if (err) {
        console.error("Erro ao verificar a existência da atração: " + err);
        return res
          .status(500)
          .json({ error: "Erro ao verificar a existência da atração" });
      }

      if (result.length > 0) {
        return res
          .status(409)
          .json({ error: "Atração já existente para este local" });
      }
      // Se não houver conflitos, prossiga com a atualização
      const queryUpdate = `UPDATE atracao SET idLocal = ?, atracao = ?, fotoAtracao = ? WHERE idAtracao = ?`;
connect.query(queryUpdate, [idLocal, atracao, fotoAtracao, idAtracao], (err, result) => {
          if (err) {
            console.error("Erro: " + err);
            return res.status(500).json({ error: "Erro ao atualizar atração" });
          }
          if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Atração não encontrada" });
          }
          res.status(200).json({ message: "Atração atualizada com sucesso" });
        }
      );
    });
  }

  static async deleteAtracao(req, res) {
    const { idAtracao } = req.params;
    const query = `DELETE FROM atracao WHERE idAtracao = '${idAtracao}'`;

    connect.query(query, (err, result) => {
      if (err) {
        console.log("Erro: " + err);
        return res.status(500).json({ error: "Erro ao excluir atração" });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Atração não encontrada" });
      }
      res.status(200).json({ message: "Atração excluída com sucesso" });
    });
  }
};
