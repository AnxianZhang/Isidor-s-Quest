using System.Collections;
using System.Collections.Generic;
using System.Text;
using UnityEngine;

using HybridWebSocket;

public class WebSocketWorker
{
    private const string URL = "ws://localhost:8080/";
    private WebSocket ws;

    public WebSocketWorker()
    {
        this.ws = WebSocketFactory.CreateInstance(URL);

        ws.OnMessage += (byte[] msg) =>
        {
            //Position position = JsonUtility.FromJson<Position>(Encoding.UTF8.GetString(msg));
            //MultiPlayerManager.GetMultiPlayerManager().canBeAdd(position);
            Debug.Log("toto");
        };

        
        ws.Connect();
    }

    public void sendPosition(string msg)
    {
        this.ws.Send(Encoding.UTF8.GetBytes(msg));
    }
}
