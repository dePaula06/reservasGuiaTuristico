const connect = require("../db/connect");
const continenteRegioes = {
  África: [
    "África do Sul",
    "África do Norte",
    "África Ocidental",
    "África Oriental",
    "África Central",
  ],
  América: ["América do Norte", "América Central", "América do Sul", "Caribe"],
  Ásia: [
    "Ásia Oriental",
    "Ásia Central",
    "Sudeste Asiático",
    "Ásia do Sul",
    "Oriente Médio",
  ],
  Europa: ["Europa Ocidental", "Europa Oriental", "Escandinávia", "Balcãs"],
  Oceania: [
    "Austrália e Nova Zelândia",
    "Melanésia",
    "Micronésia",
    "Polinésia",
  ],
};

module.exports = class LocalController {
  static async createLocal(req, res) {
    const { continente, regiao, pais, cidade, fotoLocal } = req.body;
  
    if (!continente || !regiao || !pais || !cidade || !fotoLocal) {
      return res.status(400).json({ error: "Todos os campos são obrigatórios" });
    }
  
    // Validação de continente
    if (!continenteRegioes[continente]) {
      return res.status(400).json({ error: "Continente inválido" });
    }
  
    // Validação de região
    if (!continenteRegioes[continente].includes(regiao)) {
      return res.status(400).json({ error: "Região inválida para o continente selecionado" });
    }
  
    // Verifica se o país não excede o máximo de caracteres
    if (pais.length > 100) {
      return res.status(400).json({
        error: "O campo país deve ter no máximo 100 caracteres",
      });
    }
  
    // Verifica se cidade não excede o máximo de caracteres
    if (cidade.length > 100) {
      return res.status(400).json({
        error: "O campo cidade deve ter no máximo 100 caracteres",
      });
    }
  
    // Regex para validar caracteres permitidos
    const regexLetrasAcentosEspacos = /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ\s]+$/;
  
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
  
     // Verificação de unicidade para cidade e país
  const checkCityCountryQuery = `SELECT * FROM local WHERE cidade = ? AND pais = ?`;
  connect.query(checkCityCountryQuery, [cidade, pais], (err, result) => {
    if (err) {
      console.error("Erro ao verificar a cidade e o país: " + err);
      return res.status(500).json({ error: "Erro ao verificar dados" });
    }
    if (result.length > 0) {
      return res.status(400).json({ error: "A combinação de cidade e país já existe" });
    }

    // Se não houver entradas existentes, prossiga com a inserção
    const queryInsert = `INSERT INTO local (continente, regiao, pais, cidade, fotoLocal) VALUES (?, ?, ?, ?, ?)`;
    connect.query(queryInsert, [continente, regiao, pais, cidade, fotoLocal], (err, result) => {
      if (err) {
        console.error("Erro: " + err);
        return res.status(500).json({ error: "Erro ao criar local" });
      }
      res.status(201).json({ message: "Local criado com sucesso" });
    });
  });
}
  

  static async getLocais(req, res) {
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
    const { continente, regiao, pais, cidade, fotoLocal } = req.body;

    // Verifica se algum campo está em branco
    if (!continente || !regiao || !pais || !cidade || !fotoLocal) {
      return res
        .status(400)
        .json({ error: "Todos os campos são obrigatórios" });
    }
       // Validação de continente
       if (!continenteRegioes[continente]) {
        return res.status(400).json({ error: "Continente inválido" });
      }
    
      // Validação de região
      if (!continenteRegioes[continente].includes(regiao)) {
        return res.status(400).json({ error: "Região inválida para o continente selecionado" });
      }
    
      // Verifica se o país não excede o máximo de caracteres
      if (pais.length > 100) {
        return res.status(400).json({
          error: "O campo país deve ter no máximo 100 caracteres",
        });
      }
    
      // Verifica se cidade não excede o máximo de caracteres
      if (cidade.length > 100) {
        return res.status(400).json({
          error: "O campo cidade deve ter no máximo 100 caracteres",
        });
      }
    
      // Regex para validar caracteres permitidos
      const regexLetrasAcentosEspacos = /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ\s]+$/;
    
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

    // Verificar se a nova combinação de cidade e país já existe em outra entrada
  const checkCityCountryQuery = `SELECT * FROM local WHERE cidade = ? AND pais = ? AND idLocal != ?`;
  connect.query(checkCityCountryQuery, [cidade, pais, idLocal], (err, result) => {
    if (err) {
      console.error("Erro ao verificar a cidade e o país: " + err);
      return res.status(500).json({ error: "Erro ao verificar dados" });
    }
    if (result.length > 0) {
      return res.status(400).json({ error: "A combinação de cidade e país já existe" });
    }

    // Se não houver conflitos, prossiga com a atualização
    const queryUpdate = `UPDATE local SET continente = ?, regiao = ?, pais = ?, cidade = ?, fotoLocal = ? WHERE idLocal = ?`;
    connect.query(queryUpdate, [continente, regiao, pais, cidade, fotoLocal, idLocal], (err, result) => {
      if (err) {
        console.error("Erro: " + err);
        return res.status(500).json({ error: "Erro ao atualizar local" });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Local não encontrado" });
      }
      res.status(200).json({ message: "Local atualizado com sucesso" });
    });
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
