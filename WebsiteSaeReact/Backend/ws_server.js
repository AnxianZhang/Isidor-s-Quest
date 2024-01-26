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
            // console.log(JSON.parse(message))
            ws.send(message.toString('utf-8'))
            // data = JSON.parse(message);
            // if(data.scene != null){
            //     ws.send(searchData(data.scene));
            // }
            // else{
            //     addData(data);
            //     ws.send(JSON.stringify(data)); // on ne peut pas renvoyer un json
            // }
        }catch (e){
            console.error(e);
            ws.send("Not a valid argument");
            console.log(e)
        }
    })
})

function dataIsValid(data){
    return data.pseudo != null && data.character != null && data.position != null && data.currentScene != null;
}

function addData(data){
    if(!dataIsValid(data)){
        throw new SyntaxError();
    }
}

function searchData(scene){
    
}