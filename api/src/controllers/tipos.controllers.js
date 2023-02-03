const axios = require("axios");
const { tipo } = require("../db.js");

const getTipos = async (req, res) => {
  try {
    const { data } = await axios.get(`https://pokeapi.co/api/v2/type`);
    const tipoPokemon = data.results.map((e) => e.name);
    for (let name of tipoPokemon) {
      await tipo.findOrCreate({ where: { name } });
    }
    res.json(await tipo.findAll());
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getTipoId = async (req, res) => {
  try {
    const data = await tipo.findByPk(req.params.id);
    if (!data)
      return res.status(404).json({ message: "el tipo con ese Id no existe" });
    res.json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const postTipo = async (req, res) => {
  try {
    const data = await tipo.findOrCreate({ where: { name: req.body.name } });
    res.json(data[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateTipo = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const data = await tipo.update({ name }, { where: { id } });
    if (data[0] === 0)
      return res
        .status(404)
        .json({ message: "el tipo con ese Id no existe" });
    res.json({ message: "producto actualizado" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteTipo = async (req, res) => {
  const { id } = req.params;
  try {
    data = await tipo.destroy({ where: { id } });
    if (data !== 1)
      return res
        .status(404)
        .json({ message: "el tipo con ese Id no existe" });
    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getTipos,
  getTipoId,
  postTipo,
  updateTipo,
  deleteTipo,
};
