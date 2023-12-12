using System.Collections;
using System.Collections.Generic;
using System.IO;
using UnityEngine;
using UnityEngine.SceneManagement;


public class SaveData : MonoBehaviour
{
    [System.Serializable]
    public class SaveDatas
    {
    public string level;
    public int coins;
    public int health;
    public bool reussie;
    }
    private Player mainPlayer;
    private bool isWrite = true;
    private CoinUI coin;
    // Start is called before the first frame update
    void Start()
    {
        this.mainPlayer = GameObject.FindWithTag("Player").GetComponent<Player>();
        this.coin = GameObject.Find("Coin").GetComponent<CoinUI>();
    }

    void Update()
    {
        if(mainPlayer.isDeath && isWrite){
            var currentScene = SceneManager.GetActiveScene();
            string currentSceneName = currentScene.name;
            int coinQuantity = this.coin.getCoins();
            SaveDataInLocal(currentSceneName, coinQuantity, this.mainPlayer.currentLife, false); 
        }
        else if(!mainPlayer.isDeath){
            isWrite = true;
        }
    }

    public void SaveDataInLocal(string levelValue, int coins, int health, bool reussie)
    {
        isWrite = false;
        SaveDatas data = new SaveDatas
        {   
            level = levelValue,
            coins = coins,
            health = health,
            reussie = reussie
        };

        string json = JsonUtility.ToJson(data);

        using (StreamWriter writer = new StreamWriter(Application.dataPath + "/SaveData/saveData.json", true))
        {
            writer.Write(json);
        }
    }
}
