using System.Collections;
using System.Collections.Generic;
using System.IO;
using UnityEngine;
using UnityEngine.SceneManagement;
using System;
using UnityEngine.Networking;

public class SaveData : MonoBehaviour
{
    [System.Serializable]
    public class SaveDatas
    {
        public string level;
        public string chooseCharacter;
        public int coins;
        public int health;
        public bool reussie;
        public double successPercentLevel;
    }

    [System.Serializable]
    public class SaveUserGameDatas
    {
        public int coins;
        public string chooseCharacter;
        public int levelStrength; 
        public int levelDefence;   
        public int levelSpeed;
        public int levelLife; 
    }
    private bool isWrite = true;
    private GameObject door;
    private GameObject mainPlayer;
    private GameObject SpawnPoint;
    private CoinUI coin;
    public StoringData storeData;
    // Start is called before the first frame update
    void Start()
    {
        this.mainPlayer = GameObject.Find(storeData.CharacterName);
        this.coin = GameObject.Find("Coin").GetComponent<CoinUI>();
        this.SpawnPoint = GameObject.Find("SpawnPoint");
        this.door = GameObject.Find("Door");
    }

    void Update()
    {
        if (mainPlayer.GetComponent<Player>().isDeath && isWrite)
        {
            var currentScene = SceneManager.GetActiveScene();
            string currentSceneName = currentScene.name;
            double percentSuccessLevel = getLevelPercent(this.SpawnPoint.GetComponent<Transform>().position.x, this.mainPlayer.GetComponent<Transform>().position.x, this.door.GetComponent<Transform>().position.x);
            int coinQuantity = CoinUI.getCoins();
            StartCoroutine(PostSaveGame("http://localhost:3005/PostSaveGame", currentSceneName, this.mainPlayer.name, coinQuantity, this.mainPlayer.GetComponent<Player>().currentLife, false, percentSuccessLevel));
            StartCoroutine(UserSaveProfile("http://localhost:3005/SaveUserGameProfile", coinQuantity, this.mainPlayer.name, this.mainPlayer.GetComponent<Player>().skills.lifeLvl, this.mainPlayer.GetComponent<Player>().skills.defenceLvl, this.mainPlayer.GetComponent<Player>().skills.damageDealLvl, this.mainPlayer.GetComponent<Player>().skills.moveSpeedLvl));
            SaveDataInLocal(currentSceneName, this.mainPlayer.name, coinQuantity, this.mainPlayer.GetComponent<Player>().currentLife, false, percentSuccessLevel);
        }
        if (door.GetComponent<DoorToNext>().isDoor && isWrite)
        {
            var currentScene = SceneManager.GetActiveScene();
            string currentSceneName = currentScene.name;
            int coinQuantity = CoinUI.getCoins();
            StartCoroutine(PostSaveGame("http://localhost:3005/PostSaveGame", currentSceneName, this.mainPlayer.name, coinQuantity, this.mainPlayer.GetComponent<Player>().currentLife, true, 100.00));
            StartCoroutine(UserSaveProfile("http://localhost:3005/SaveUserGameProfile", coinQuantity, this.mainPlayer.name, this.mainPlayer.GetComponent<Player>().skills.lifeLvl, this.mainPlayer.GetComponent<Player>().skills.defenceLvl, this.mainPlayer.GetComponent<Player>().skills.damageDealLvl, this.mainPlayer.GetComponent<Player>().skills.moveSpeedLvl));
            SaveDataInLocal(currentSceneName, this.mainPlayer.name, coinQuantity, this.mainPlayer.GetComponent<Player>().currentLife, true, 100.00);
        }
    }

    private double getLevelPercent(float spawnPoint, float characterPoint, float doorPoint)
    {
        float newSpawnPoint = spawnPoint;
        float newCharacterPoint = characterPoint;
        float newDoorPoint = doorPoint;
        if (newSpawnPoint < 0f)
        {
            newSpawnPoint = newSpawnPoint * -1.0f;
        }
        if (newCharacterPoint < 0f)
        {
            newCharacterPoint = newCharacterPoint * -1.0f;
        }
        if (newDoorPoint < 0f)
        {
            newDoorPoint = newDoorPoint * -1.0f;
        }
        float percentSuccess = newCharacterPoint / (newSpawnPoint + newDoorPoint) * 100.0f;
        return Math.Round(percentSuccess, 2);
    }
    private void SaveDataInLocal(string level, string nameCharacter, int coins, int health, bool reussie, double percentSuccess)
    {
        isWrite = false;
        SaveDatas data = new SaveDatas
        {
            level = level,
            chooseCharacter = nameCharacter,
            coins = coins,
            health = health,
            reussie = reussie,
            successPercentLevel = percentSuccess
        };

        string json = JsonUtility.ToJson(data);

        using (StreamWriter writer = new StreamWriter(Application.dataPath + "/SaveData/saveData.json", true))
        {
            writer.Write(json);
        }
    }
    public IEnumerator PostSaveGame(string url, string level, string nameCharacter, int coins, int health, bool reussie, double percentSuccess)
    {
        isWrite = false;
        SaveDatas data = new SaveDatas
        {
            level = level,
            chooseCharacter = nameCharacter,
            coins = coins,
            health = health,
            reussie = reussie,
            successPercentLevel = percentSuccess
        };

        string json = JsonUtility.ToJson(data);
        using (UnityWebRequest www = UnityWebRequest.PostWwwForm(url, json))
        {
            www.SetRequestHeader("content-type", "application/json");
            www.uploadHandler.contentType = "application/json";
            www.uploadHandler = new UploadHandlerRaw(System.Text.Encoding.UTF8.GetBytes(json));

            yield return www.SendWebRequest();
        }
    }

    public IEnumerator UserSaveProfile(string url, int coins, string chooseCharacter, int levelStrength, int levelDefence, int levelLife, int levelSpeed)
    {
        isWrite = false;
        SaveUserGameDatas data = new SaveUserGameDatas
        {
           coins = coins,
           chooseCharacter = chooseCharacter,
           levelStrength = levelStrength,
           levelDefence = levelDefence,
           levelLife = levelLife,
           levelSpeed = levelSpeed,
        };

        string json = JsonUtility.ToJson(data);
        using (UnityWebRequest www = UnityWebRequest.PostWwwForm(url, json))
        {
            www.SetRequestHeader("content-type", "application/json");
            www.uploadHandler.contentType = "application/json";
            www.uploadHandler = new UploadHandlerRaw(System.Text.Encoding.UTF8.GetBytes(json));

            yield return www.SendWebRequest();
        }
    }
}