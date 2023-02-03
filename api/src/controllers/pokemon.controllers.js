const axios = require("axios");
const Sequelize = require("sequelize");
const { pokemon, tipo } = require("../db.js");

const getPokemon = async (req, res) => {
  const { name } = req.query;
  try {
    if (name) {
      const { data } = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${name}`
      );
      const pokemonNombre = {
        name: data.forms[0].name,
        life: data.stats[0].base_stat,
        attack: data.stats[1].base_stat,
        defense: data.stats[2].base_stat,
        speed: data.stats[5].base_stat,
        height: data.height,
        weight: data.weight,
        img: data.sprites.other.dream_world.front_default,
        tipos: data.types.map((e) => e.type.name).join(", "),
        id: data.id,
      };
      return res.json(pokemonNombre);
    }
    const request = [];
    const infoDb = await pokemon.findAll({
      include: [
        { model: tipo, attributes: ["name"], through: { attributes: [] } },
      ],
    });
    if (infoDb.length === 0) {
      for (let i = 1; i <= 40; i++) {
        request.push(axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`));
      }
      const data = await Promise.all(request);
      const dataPokemon = data.map((e) => {
        return {
          name: e.data.forms[0].name,
          life: e.data.stats[0].base_stat,
          attack: e.data.stats[1].base_stat,
          defense: e.data.stats[2].base_stat,
          speed: e.data.stats[5].base_stat,
          height: e.data.height,
          weight: e.data.weight,
          img: e.data.sprites.other.dream_world.front_default,
          tipo: e.data.types.map((e) => e.type.name),
          idBusqueda: e.data.id,
        };
      });
      for (let p of dataPokemon) {
        const [pokemonCreado, creado] = await pokemon.findOrCreate({
          where: { name: p.name },
          defaults: {
            life: p.life,
            attack: p.attack,
            defense: p.defense,
            speed: p.speed,
            height: p.height,
            weight: p.weight,
            img: p.img,
            idBusqueda: p.idBusqueda,
          },
        });
        const tiposDb = await tipo.findAll({
          where: { name: { [Sequelize.Op.in]: p.tipo } },
        });
        for (let tipoDb of tiposDb) {
          await pokemonCreado.addTipo(tipoDb);
        }
      }
      const infoDb = await pokemon.findAll({
        include: [
          { model: tipo, attributes: ["name"], through: { attributes: [] } },
        ],
      });
      infoDb.forEach((e) => {
        let data = e.dataValues.tipos.map((e) => e.name);
        e.dataValues.tipos = data.join(", ");
      });
      return res.json(infoDb);
    }
    infoDb.forEach((e) => {
      let data = e.dataValues.tipos.map((e) => e.name);
      e.dataValues.tipos = data.join(", ");
    });
    res.json(infoDb);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getPokemonId = async (req, res) => {
  const { id } = req.params;
  try {
    if (id <= 1008) {
      const { data } = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${id}`
      );
      const pokemonId = {
        name: data.forms[0].name,
        life: data.stats[0].base_stat,
        attack: data.stats[1].base_stat,
        defense: data.stats[2].base_stat,
        speed: data.stats[5].base_stat,
        height: data.height,
        weight: data.weight,
        img: data.sprites.other.dream_world.front_default,
        tipos: data.types.map((e) => e.type.name).join(", "),
      };
      return res.json(pokemonId);
    }
    const pokemonDb = await pokemon.findByPk(id);
    if (pokemonDb) return res.json(pokemonDb);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const postPokemon = async (req, res) => {
  const { name, life, attack, defense, speed, height, weight, img, tipos } =
    req.body;
  try {
    const [nuevoPokemon, creado] = await pokemon.findOrCreate({
      where: { name },
      defaults: {
        life,
        attack,
        defense,
        speed,
        height,
        weight,
        img,
      },
    });
    const tiposDb = await tipo.findAll({
      where: { name: { [Sequelize.Op.in]: tipos } },
    });
    for (let tipoDb of tiposDb) {
      await nuevoPokemon.addTipo(tipoDb);
    }
    res.json(nuevoPokemon);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updatePokemon = async (req, res) => {
  const { name, life, attack, defense, speed, height, weight, img, tipos } =
    req.body;
  const { id } = req.params;
  try {
    const [estado, pokemonActual] = await pokemon.update(
      {
        name,
        life,
        attack,
        defense,
        speed,
        height,
        weight,
        img,
      },
      { where: { id }, returning: true }
    );
    if (tipos) {
      const tiposDb = await tipo.findAll({
        where: { name: { [Sequelize.Op.in]: tipos } },
      });
      await pokemonActual[0].setTipos([]);
      for (let tipoDb of tiposDb) {
        await pokemonActual[0].addTipo(tipoDb);
      }
    }
    if (estado === 0)
      return res
        .status(404)
        .json({ message: "el pokemon con ese Id no existe" });
    res.json(pokemonActual[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deletePokemon = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await pokemon.destroy({ where: { id } });
    if (data !== 1)
      return res
        .status(404)
        .json({ message: "el pokemon con ese Id no existe" });
    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getPokemon,
  getPokemonId,
  postPokemon,
  updatePokemon,
  deletePokemon,
};
