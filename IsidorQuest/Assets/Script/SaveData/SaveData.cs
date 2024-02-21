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
        public int ActualLevel;
        public int levelStrength; 
        public int levelDefence;   
        public int levelSpeed;
        public int levelLife;
        public int item1; 
        public int item2; 
        public int item3; 
        public int item4; 
    }
    private bool isWrite = true;
    private GameObject door;
    private GameObject mainPlayer;
    private GameObject SpawnPoint;
    private Inventory inventory;
    private CoinUI coin;
    public StoringData storeData;
    private GetData gm;
    private GameObject shop;
    private GameObject skillTree;
    private int cpt;
    // Start is called before the first frame update
    void Start()
    {
        this.cpt = 1;
        this.mainPlayer = GameObject.Find(storeData.CharacterName);
        this.coin = GameObject.Find("Coin").GetComponent<CoinUI>();
        this.inventory = GameObject.FindGameObjectWithTag("Inventory").GetComponent<Inventory>();
        this.SpawnPoint = GameObject.Find("SpawnPoint");
        this.door = SceneManager.GetActiveScene().name == "Village" ? GameObject.Find("LvlTeleporter") : GameObject.Find("Door");
        this.shop = GameObject.Find("ShopDisign");
        this.skillTree = GameObject.Find("SkillTreePNJ");
        this.gm = GameObject.Find("GetData").GetComponent<GetData>();
    }
    private static string GetSceneNameFromScenePath(string scenePath)
    {
        var sceneNameStart = scenePath.LastIndexOf("/", StringComparison.Ordinal) + 1;
        var sceneNameEnd = scenePath.LastIndexOf(".", StringComparison.Ordinal);
        var sceneNameLength = sceneNameEnd - sceneNameStart;
        return scenePath.Substring(sceneNameStart, sceneNameLength);
    }
    void Update()
    {
        if (mainPlayer.GetComponent<Player>().isDeath && isWrite)
        {
            var currentScene = SceneManager.GetActiveScene();
            string currentSceneName = currentScene.name;
            double percentSuccessLevel = getLevelPercent(this.SpawnPoint.GetComponent<Transform>().position.x, this.mainPlayer.GetComponent<Transform>().position.x, this.door.GetComponent<Transform>().position.x);
            int coinQuantity = CoinUI.getCoins();
            StartCoroutine(PostSaveGame("http://localhost:3005/game/save", currentSceneName, this.mainPlayer.name, coinQuantity, this.mainPlayer.GetComponent<Player>().currentLife, false, percentSuccessLevel));
            SaveDataInLocal(currentSceneName, this.mainPlayer.name, coinQuantity, this.mainPlayer.GetComponent<Player>().currentLife, false, percentSuccessLevel);
        }
        bool transportOk = SceneManager.GetActiveScene().name == "Village" ? this.door.GetComponent<NPC>().getCanPlayerInteract() : door.GetComponent<DoorToNext>().isDoor;
        if(SceneManager.GetActiveScene().name == "Village" && !transportOk && !this.shop.GetComponent<NPC>().getCanPlayerInteract() && !this.skillTree.GetComponent<NPC>().getCanPlayerInteract()){
            isWrite = true;
        }
        if (transportOk && isWrite || this.shop != null && this.shop.GetComponent<NPC>().getCanPlayerInteract() && isWrite || this.skillTree != null && this.skillTree.GetComponent<NPC>().getCanPlayerInteract() && isWrite)
        {
            var currentScene = SceneManager.GetActiveScene();
            string currentSceneName = currentScene.name;
            int nextSceneIndex;
            if(currentScene.buildIndex + 1 < SceneManager.sceneCountInBuildSettings && currentScene.buildIndex + 1 > gm.getActualLevel()){
                nextSceneIndex = currentScene.buildIndex + 1;
            }
            else{
                nextSceneIndex = gm.getActualLevel();
            }
            int[] inventoryNumbers = inventoryNumber();
            int coinQuantity = CoinUI.getCoins();
            StartCoroutine(PostSaveGame("http://localhost:3005/game/save", currentSceneName, this.mainPlayer.name, coinQuantity, this.mainPlayer.GetComponent<Player>().currentLife, true, 100.00));
            StartCoroutine(UserSaveProfile("http://localhost:3005/game/profile", coinQuantity, nextSceneIndex, this.mainPlayer.name, this.mainPlayer.GetComponent<Player>().skills.damageDealLvl, this.mainPlayer.GetComponent<Player>().skills.defenceLvl, this.mainPlayer.GetComponent<Player>().skills.lifeLvl, this.mainPlayer.GetComponent<Player>().skills.moveSpeedLvl,inventoryNumbers[0], inventoryNumbers[1], inventoryNumbers[2], inventoryNumbers[3]));
            SaveDataInLocal(currentSceneName, this.mainPlayer.name, coinQuantity, this.mainPlayer.GetComponent<Player>().currentLife, true, 100.00);
        }
    }
    
    private int[] inventoryNumber(){
        GameObject[] inventorys = this.inventory.GetInv();
        int[] inventoryNumbers = new int[this.inventory.GetLenInv()];
        for(int i = 0; i < this.inventory.GetLenInv(); i++){
            if(inventorys[i] != null){
                if(String.Equals(inventorys[i].name.Replace("(Clone)", ""), "InstanteHeal")){
                    inventoryNumbers[i] = 1;
                }
                if(String.Equals(inventorys[i].name.Replace("(Clone)", ""), "Jump")){
                    inventoryNumbers[i] = 2;
                }
                if(String.Equals(inventorys[i].name.Replace("(Clone)", ""), "Speed")){
                    inventoryNumbers[i] = 3;
                }
                if(String.Equals(inventorys[i].name.Replace("(Clone)", ""), "Strength")){
                    inventoryNumbers[i] = 4;
                }
            }
        }
        return inventoryNumbers;
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

    public IEnumerator UserSaveProfile(string url, int coins, int level, string chooseCharacter, int levelStrength, int levelDefence, int levelLife, int levelSpeed, int items1, int items2, int items3, int items4)
    {
        isWrite = false;
        SaveUserGameDatas data = new SaveUserGameDatas
        {
           coins = coins,
           chooseCharacter = chooseCharacter,
           ActualLevel = level,
           levelStrength = levelStrength,
           levelDefence = levelDefence,
           levelLife = levelLife,
           levelSpeed = levelSpeed,
           item1 = items1,
           item2 = items2,
           item3 = items3,
           item4 = items4
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