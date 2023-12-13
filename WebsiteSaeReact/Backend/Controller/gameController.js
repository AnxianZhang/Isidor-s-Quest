const mongoose = require('mongoose');
const {Game} = require("../Models/Model");

const saveGameData = async(req,res) =>{
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/DatabaseIsidor');
        const data = req.body
        const newGameSave = new Game({
            levelName : data.level,
            chooseCharacter : data.chooseCharacter,
            coins : data.coins,
            health : data.health,
            reussie : data.reussie,
            successPercentLevel : data.successPercentLevel
        });
        await newGameSave.save();
        return res.status(200).send('Données enregistrées avec succès');
      } catch (error) {
        console.error('erreur durant l inscription', error);
        res.status(500).send("erreur lors de l'inscription/erreur au niveau du backend");
      }
}

module.exports = {
    saveGameData
}