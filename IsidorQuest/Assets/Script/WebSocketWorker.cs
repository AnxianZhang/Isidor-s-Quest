using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using WebSocketSharp;
using Assets.Script.Player;

public class WebSocketWorker
{
    private const string URL = "ws://localhost:8080/";
    private WebSocket ws;

    public WebSocketWorker()
    {
        this.ws = new WebSocket(URL);
        ws.Connect();
        ws.OnMessage += (sender, e) =>
        {
            Position position = JsonUtility.FromJson<Position>(e.Data);
/*            Debug.Log(position.characterClass);
            Debug.Log(e.Data);*/
        };
    }

    public void sendPosition (string msg)
    {
        this.ws.Send(msg);
    }
}
