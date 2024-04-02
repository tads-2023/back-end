const express = require("express");
const mongoose = require('mongoose');
const MongoMemoryServer = require('mongodb-memory-server').MongoMemoryServer;
const Pokemon = require("./modelos/pokemon");

const setup = async () => {
    const mongod = await MongoMemoryServer.create();
    console.log("banco em: ",mongod.getUri());
    await mongoose.connect(`${mongod.getUri()}banco`)

    const app = express();

    app.use(express.json());

    app.get("/", (req, res) => {
        res.send("Tá no ar!");
    })

    app.post("/pokemon", async (req, res) => {
        console.log(req.body);
        const {
            nome,
            genero
        } = req.body;
        const novoPokemon = new Pokemon({nome: nome, genero: genero});
        await novoPokemon.save();
        res.send(novoPokemon);
    });

    app.get("/pokemons", async (req, res) => {
        const pokemons = await Pokemon.find({});
        res.send(pokemons);
    })

    app.listen(3000, () => {
        console.log("Ouvindo em http://localhost:3000");
    })
}
setup();    
