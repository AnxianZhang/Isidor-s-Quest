const { json } = require("express");
const { MemoryStore } = require("express-session");
const WebSocket = require("ws");

const server = new WebSocket.Server({port : 8080});


/** Liste d'object json
 * pseudo : String
 * character : String (Warrior ou archer)
 * position : int[2]
 * currentScene : String
 */
const dataPos = [];

server.on("connection", (ws) => {
    console.log("user connected to websocket")
    ws.on('disconnection', ()=>{
        console.log("the user is now disconected")
    })

    ws.on("message", (message) => {
        try{
            const data = JSON.parse(message);
            // ws.send(message)
            if(dataIsValid(data)){
                // const i = searchData(data.currentScene)
                // console.log(i)
                ws.send(JSON.stringify(data))
            }
        }catch (e){
            console.error(e);
            ws.send("Not a valid argument");
            console.log(e)
        }
    })
})

function dataIsValid(data){
    return data.pseudo != null && data.characterClass != null && data.position != null && data.currentScene != null;
}

function addData(data){
    if(!dataIsValid(data)){
        throw new SyntaxError();
    }

    const playerData = dataPos.find((element) => element.pseudo == data.pseudo)

    if(playerData == undefined){
        dataPos.push(data);
    }
    else {
        dataPos[dataPos.indexOf(playerData)] = data;
    }
}

function searchData(scene){

    const res = [];

    dataPos.forEach((element) => {
        if (element.currentScene === scene){
            res.push(element);
        }
    })

    return JSON.stringify(res);
}

function deleteData(playerName){

}