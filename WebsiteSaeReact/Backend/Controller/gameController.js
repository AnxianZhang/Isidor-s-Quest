const mongoose = require('mongoose');
const {Game, UserGame} = require("../Models/Model");
var localStorage = require('localStorage')

const saveGameData = async(req,res) =>{
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/DatabaseIsidor');
        const data = req.body;
        const newGameSave = new Game({
            pseudo : JSON.parse(localStorage.getItem('isConnect')).pseudo,
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
        console.error('erreur durant l enregistrement des donnée', error);
        res.status(500).send("erreur lors de l'enregsitrement des données au niveau du backend");
      }
}

const userSave = async (req, res) => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/DatabaseIsidor');
    const datas = req.body;
    const currentUser = await UserGame.findOne({
      pseudo: JSON.parse(localStorage.getItem('isConnect')).pseudo,
    }).exec();

    if (currentUser !== null) {
      if (datas.chooseCharacter === 'Archer') {
        const ArcherLevel = {
          levelStrength: datas.levelStrength,
          levelDefence: datas.levelDefence,
          levelSpeed: datas.levelSpeed,
          levelLife: datas.levelLife,
        };
        const updatedUser = await UserGame.findOneAndUpdate(
          { pseudo : JSON.parse(localStorage.getItem('isConnect')).pseudo }, 
          { coins : datas.coins, Warrior : WarriorLevel }, 
          { new: true } 
        ).exec();
      }

      if (datas.chooseCharacter === 'Warrior') {
        const WarriorLevel = {
          levelStrength: datas.levelStrength,
          levelDefence: datas.levelDefence,
          levelSpeed: datas.levelSpeed,
          levelLife: datas.levelLife,
        };
        const updatedUser = await UserGame.findOneAndUpdate(
          { pseudo : JSON.parse(localStorage.getItem('isConnect')).pseudo }, 
          { coins : datas.coins, Warrior : WarriorLevel }, 
          { new: true } 
        ).exec();
      }
      return res.status(200).send('Données bien mises à jour');
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send('Une erreur s\'est produite lors de la mise à jour des données');
  } 
};

module.exports = {
    saveGameData,
    userSave
}