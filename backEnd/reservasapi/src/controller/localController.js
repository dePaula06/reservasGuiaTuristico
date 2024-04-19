const connect = require("../db/connect");

module.exports = class LocalController {
  static async createLocal(req, res) {
    const { continente, pais_OU_regiao } = req.body;

    // Verifica se algum campo está em branco
    if (!continente || !pais_OU_regiao) {
      return res
        .status(400)
        .json({ error: "Todos os campos são obrigatórios" });
    }

    // Verifica se o continente não excede 9 caracteres
    if (continente.length > 9) {
      return res
        .status(400)
        .json({ error: "O continente deve ter no máximo 9 caracteres" });
    }

    // Verifica se o país ou região não excede 255 caracteres
    if (pais_OU_regiao.length > 255) {
      return res.status(400).json({
        error: "O campo país ou região deve ter no máximo 255 caracteres",
      });
    }

    // Verifica se continente e país ou região contêm somente letras, acentos e espaços
    const regexLetrasAcentosEspacos = /^[a-zA-ZÀ-ÖØ-öø-ÿ\s]+$/;
    if (!regexLetrasAcentosEspacos.test(continente)) {
      return res.status(400).json({
        error: "O campo continente só aceita letras, acentos e espaços",
      });
    }
    if (!regexLetrasAcentosEspacos.test(pais_OU_regiao)) {
      return res.status(400).json({
        error: "O campo país ou região só aceita letras, acentos e espaços",
      });
    }

    // Executa a query para inserir o local no banco de dados
    const queryInsert = `INSERT INTO local (continente, pais_OU_regiao) VALUES (?, ?)`;
    connect.query(queryInsert, [continente, pais_OU_regiao], (err, result) => {
      if (err) {
        console.log("Erro: " + err);
        return res.status(500).json({ error: "Erro ao criar local" });
      }
      res.status(201).json({ message: "Local criado com sucesso" });
    });
  }

  static async getLocais(req, res){
    const query = `SELECT * FROM local`;

    connect.query(query, (err, result) => {
      if (err) {
        console.log("Erro: " + err);
        return res.status(500).json({ error: "Erro ao buscar local" });
      }
      if (result.length === 0) {
        return res.status(404).json({ message: "Local não encontrado" });
      }
      res.status(200).json({ message: "Locais encontrados", local: result });
    });
  }

  static async getLocalByID(req, res) {
    const { idLocal } = req.params;
    const query = `SELECT * FROM local WHERE idLocal = '${idLocal}'`;

    connect.query(query, (err, result) => {
      if (err) {
        console.log("Erro: " + err);
        return res.status(500).json({ error: "Erro ao buscar local" });
      }
      if (result.length === 0) {
        return res.status(404).json({ message: "Local não encontrado" });
      }
      res.status(200).json({ message: "Local encontrado", local: result[0] });
    });
  }

  static async updateLocal(req, res) {
    const { idLocal } = req.params;
    const { continente, pais_OU_regiao } = req.body;

    // Verifica se algum campo está em branco
    if (!continente || !pais_OU_regiao) {
      return res
        .status(400)
        .json({ error: "Todos os campos são obrigatórios" });
    }

    // Verifica se o continente não excede 9 caracteres
    if (continente.length > 9) {
      return res
        .status(400)
        .json({ error: "O continente deve ter no máximo 9 caracteres" });
    }

    // Verifica se o país ou região não excede 255 caracteres
    if (pais_OU_regiao.length > 255) {
      return res.status(400).json({
        error: "O campo país ou região deve ter no máximo 255 caracteres",
      });
    }

    // Verifica se continente e país ou região contêm somente letras, acentos e espaços
    const regexLetrasAcentosEspacos = /^[a-zA-ZÀ-ÖØ-öø-ÿ\s]+$/;
    if (!regexLetrasAcentosEspacos.test(continente)) {
      return res.status(400).json({
        error: "O campo continente só aceita letras, acentos e espaços",
      });
    }
    if (!regexLetrasAcentosEspacos.test(pais_OU_regiao)) {
      return res.status(400).json({
        error: "O campo país ou região só aceita letras, acentos e espaços",
      });
    }

    const query = `UPDATE local SET continente = '${continente}', pais_OU_regiao = '${pais_OU_regiao}' WHERE idLocal = '${idLocal}'`;

    connect.query(query, (err, result) => {
      if (err) {
        console.log("Erro: " + err);
        return res.status(500).json({ error: "Erro ao atualizar local" });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Local não encontrado" });
      }
      res.status(200).json({ message: "Local atualizado com sucesso" });
    });
  }

  static async deleteLocal(req, res) {
    const { idLocal } = req.params;
    const query = `DELETE FROM local WHERE idLocal = '${idLocal}'`;

    connect.query(query, (err, result) => {
      if (err) {
        console.log("Erro: " + err);
        return res.status(500).json({ error: "Erro ao excluir local" });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Local não encontrado" });
      }
      res.status(200).json({ message: "Local excluído com sucesso" });
    });
  }
};
