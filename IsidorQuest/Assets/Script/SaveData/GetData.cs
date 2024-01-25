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
        public string chooseCharacter;
        public string ActualLevel;
        public int levelStrength; 
        public int levelDefence;   
        public int levelSpeed;
        public int levelLife;
        public int item1; 
        public int item2; 
        public int item3; 
        public int item4; 

        public static SaveUserGameDatas CreateFromJSON(string jsonString)
        {
            return JsonUtility.FromJson<SaveUserGameDatas>(jsonString);
        }
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

    private void setObject(){
        this.mainPlayer = GameObject.Find(storeData.CharacterName);
        this.door = GameObject.Find("Door");
    }
    // Update is called once per frame
    void Update()
    {
        int index = SceneManager.GetActiveScene().buildIndex;
        if(index > 1){
            if(mainPlayer == null || this.door == null){
                setObject();
            }
            if (mainPlayer != null && mainPlayer.GetComponent<Player>().isDeath)
            {
                StartCoroutine(GetRequest("http://localhost:5000/getUserGameData"));
                isRead = false;
                print(data);
            }
            else{
                isRead = true;
            }
            if (door != null && door.GetComponent<DoorToNext>().isDoor)
            {
                StartCoroutine(GetRequest("http://localhost:5000/getUserGameData"));
                isRead = false;
            }
            else{
                isRead = true;
            }
        }
    }

    public int getCoins(){
        return data.coins;
    }
    IEnumerator GetRequest(string uri)
    {
        using (UnityWebRequest webRequest = UnityWebRequest.Get(uri))
        {
            // Request and wait for the desired page.
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
