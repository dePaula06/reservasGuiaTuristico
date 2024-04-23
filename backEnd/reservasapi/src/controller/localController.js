const connect = require("../db/connect");

module.exports = class LocalController {
  static async createLocal(req, res) {
    const { continente, regiao, pais, cidade, atracao, fotoLocal } = req.body;

    // Verifica se algum campo está em branco
    if (!continente || !regiao || !pais || !cidade || !atracao || !fotoLocal ) {
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

    // Verifica se a região não excede o máximo de caracteres
    if (regiao.length > 100) {
      return res.status(400).json({
        error: "O campo região deve ter no máximo 100 caracteres",
      });
    }

    // Verifica se a país não excede o máximo de caracteres
    if (pais.length > 100) {
      return res.status(400).json({
        error: "O campo região deve ter no máximo 100 caracteres",
      });
    }

    // Verifica se cidade não excede o máximo de caracteres
    if (cidade.length > 100) {
      return res.status(400).json({
        error: "O campo região deve ter no máximo 100 caracteres",
      });
    }

    // Verifica se atração não excede o máximo de caracteres
    if (atracao.length > 255) {
      return res.status(400).json({
        error: "O campo região deve ter no máximo 100 caracteres",
      });
    }

    // Verifica se continente e país ou região contêm somente letras, acentos e espaços
    const regexLetrasAcentosEspacos = /^[a-zA-ZÀ-ÖØ-öø-ÿ\s]+$/;
    if (!regexLetrasAcentosEspacos.test(continente)) {
      return res.status(400).json({
        error: "O campo continente só aceita letras, acentos e espaços",
      });
    }
    if (!regexLetrasAcentosEspacos.test(regiao)) {
      return res.status(400).json({
        error: "O campo região só aceita letras, acentos e espaços",
      });
    }
    if (!regexLetrasAcentosEspacos.test(pais)) {
      return res.status(400).json({
        error: "O campo país só aceita letras, acentos e espaços",
      });
    }
    if (!regexLetrasAcentosEspacos.test(cidade)) {
      return res.status(400).json({
        error: "O campo cidade só aceita letras, acentos e espaços",
      });
    }
    if (!regexLetrasAcentosEspacos.test(atracao)) {
      return res.status(400).json({
        error: "O campo atraçao só aceita letras, acentos e espaços",
      });
    }

    // Executa a query para inserir o local no banco de dados
    const queryInsert = `INSERT INTO local (continente, regiao, pais, cidade, atracao, fotoLocal) VALUES (?, ?, ?, ?, ?, ?)`;
    connect.query(queryInsert, [continente, regiao, pais, cidade, atracao, fotoLocal], (err, result) => {
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
    const { continente,  regiao, pais, cidade, atracao, fotoLocal  } = req.body;

    // Verifica se algum campo está em branco
    if (!continente || !regiao || !pais || !cidade || !atracao || !fotoLocal ) {
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

    // Verifica se a região não excede o máximo de caracteres
    if (regiao.length > 100) {
      return res.status(400).json({
        error: "O campo região deve ter no máximo 100 caracteres",
      });
    }

    // Verifica se a país não excede o máximo de caracteres
    if (pais.length > 100) {
      return res.status(400).json({
        error: "O campo região deve ter no máximo 100 caracteres",
      });
    }

    // Verifica se cidade não excede o máximo de caracteres
    if (cidade.length > 100) {
      return res.status(400).json({
        error: "O campo região deve ter no máximo 100 caracteres",
      });
    }

    // Verifica se atração não excede o máximo de caracteres
    if (atracao.length > 255) {
      return res.status(400).json({
        error: "O campo região deve ter no máximo 100 caracteres",
      });
    }

    // Verifica se continente e país ou região contêm somente letras, acentos e espaços
    const regexLetrasAcentosEspacos = /^[a-zA-ZÀ-ÖØ-öø-ÿ\s]+$/;
    if (!regexLetrasAcentosEspacos.test(continente)) {
      return res.status(400).json({
        error: "O campo continente só aceita letras, acentos e espaços",
      });
    }
    if (!regexLetrasAcentosEspacos.test(regiao)) {
      return res.status(400).json({
        error: "O campo região só aceita letras, acentos e espaços",
      });
    }
    if (!regexLetrasAcentosEspacos.test(pais)) {
      return res.status(400).json({
        error: "O campo país só aceita letras, acentos e espaços",
      });
    }
    if (!regexLetrasAcentosEspacos.test(cidade)) {
      return res.status(400).json({
        error: "O campo cidade só aceita letras, acentos e espaços",
      });
    }
    if (!regexLetrasAcentosEspacos.test(atracao)) {
      return res.status(400).json({
        error: "O campo atraçao só aceita letras, acentos e espaços",
      });
    }


    const query = `UPDATE local SET continente = '${continente}', regiao = '${regiao}', pais = '${pais}', cidade = '${cidade}', atracao = '${atracao}', fotoLocal = '${fotoLocal}' WHERE idLocal = '${idLocal}'`;

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
