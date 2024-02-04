using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Networking;
using System.Text;
using UnityEngine.SceneManagement;
public class GetData : MonoBehaviour
{

    [System.Serializable]
    public class SaveUserGameDatas
    {
        public int coins;
        public string pseudo;
        public string chooseCharacter;
        public string ActualLevel;
        public CharacterData Archer;
        public CharacterData Warrior;
        public InventoryData inventory;

        public static SaveUserGameDatas CreateFromJSON(string jsonString)
        {
            return JsonUtility.FromJson<SaveUserGameDatas>(jsonString);
        }
    }
    [System.Serializable]
    public class CharacterData
    {
        public int levelStrength;
        public int levelDefence;
        public int levelSpeed;
        public int levelLife;
    }

    [System.Serializable]
    public class InventoryData
    {
        public int item1;
        public int item2;
        public int item3;
        public int item4;
    }
    private SaveUserGameDatas data;

    private GameObject door;
    private GameObject mainPlayer;
    public StoringData storeData;
    private bool isRead = true;
    // Start is called before the first frame update
    void Start()
    {
        StartCoroutine(GetRequest("http://localhost:5000/getUserGameData"));
    }

    private void setObject()
    {
        this.mainPlayer = GameObject.Find(storeData.CharacterName);
        this.door = SceneManager.GetActiveScene().name == "Village" ? GameObject.Find("LvlTeleporter") : GameObject.Find("Door");
    }
    // Update is called once per frame
    void Update()
    {
        int index = SceneManager.GetActiveScene().buildIndex;
        if (index > 1)
        {
            if (mainPlayer == null || this.door == null)
            {
                setObject();
            }
            bool transportOk = SceneManager.GetActiveScene().name == "Village" ? this.door.GetComponent<NPC>().getCanPlayerInteract() : door.GetComponent<DoorToNext>().isDoor;
            if (door != null && transportOk)
            {
                StartCoroutine(GetRequest("http://localhost:5000/getUserGameData"));
            }
        }
    }

    public int getCoins()
    {
        return data.coins;
    }

    public int getLevelStrength(){
        if(storeData.CharacterName == "Warrior"){
            return data.Warrior.levelStrength;
        }
        else{
            return data.Archer.levelStrength;
        }
    }

    public int getLevelDefence(){
        if(storeData.CharacterName == "Warrior"){
            return data.Warrior.levelDefence;
        }
        else{
            return data.Archer.levelDefence;
        }
    }

    public int getLevelLife(){
        if(storeData.CharacterName == "Warrior"){
            return data.Warrior.levelLife;
        }
        else{
            return data.Archer.levelLife;
        }
    }

    public int getLevelSpeed(){
        if(storeData.CharacterName == "Warrior"){
            return data.Warrior.levelSpeed;
        }
        else{
            return data.Archer.levelSpeed;
        }
    }

    public string getPseudo()
    {
        return data.pseudo;
    }

    public List<int> getInventory()
    {
        List<int> list = new List<int>();
        list.Add(data.inventory.item1);
        list.Add(data.inventory.item2);
        list.Add(data.inventory.item3);
        list.Add(data.inventory.item4);
        return list;
    }

    IEnumerator GetRequest(string uri)
    {
        using (UnityWebRequest webRequest = UnityWebRequest.Get(uri))
        {
            yield return webRequest.SendWebRequest();

            string[] pages = uri.Split('/');
            int page = pages.Length - 1;

            switch (webRequest.result)
            {
                case UnityWebRequest.Result.ConnectionError:
                case UnityWebRequest.Result.DataProcessingError:
                    Debug.LogError("Error: " + webRequest.error);
                    break;
                case UnityWebRequest.Result.ProtocolError:
                    Debug.LogError("HTTP Error: " + webRequest.error);
                    break;
                case UnityWebRequest.Result.Success:
                    data = SaveUserGameDatas.CreateFromJSON(webRequest.downloadHandler.text);
                    break;
            }
        }
    }
}
