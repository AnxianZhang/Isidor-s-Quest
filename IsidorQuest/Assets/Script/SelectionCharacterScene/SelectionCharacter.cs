using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.SceneManagement;
using System.IO;
public class SelectionCharacter : MonoBehaviour
{
    
    [System.Serializable]
public class Player
{
    public string life;
    public string Strength;
    public string Defence;
    public string Speed;
    public string Jump;
}
[System.Serializable]
public class Players
{
    public Player[] players;
}
    [SerializeField] private GameObject[] characterSelection;
    public StoringData storeData;
    public TextAsset jsonFile;
    private const string LVL_TO_LOAD = "WorldOneLvl1";
    private int nbCharacter;
    private int actualCharacter;
    private Text UIText;
    //private Text JumpText;
    private Text SpeedText;
    private Text DefenceText;
    private Text LifeText;
    private Text StrengthText;
    // Start is called before the first frame update
    void Start()
    {
        nbCharacter = characterSelection.Length;
        storeData.CharacterName = this.characterSelection[actualCharacter].name;
        actualCharacter = 0;
        UIText = GameObject.Find("TextNameCharacterSelect").GetComponent<Text>();
        //this.JumpText = GameObject.Find("JumpText").GetComponent<Text>();
        this.SpeedText = GameObject.Find("SpeedText").GetComponent<Text>();
        this.DefenceText = GameObject.Find("DefenceText").GetComponent<Text>();
        this.LifeText = GameObject.Find("LifeText").GetComponent<Text>();
        this.StrengthText = GameObject.Find("StrengthText").GetComponent<Text>();
        SkillText();
    }

    // Update is called once per frame
    void Update()
    {
        
    }

    public void nextCharacter(){
        if(actualCharacter < nbCharacter-1){
            this.characterSelection[actualCharacter].SetActive(false);
            actualCharacter += 1;
            this.characterSelection[actualCharacter].SetActive(true);
            UIText.text = this.characterSelection[actualCharacter].name;
            storeData.CharacterName = this.characterSelection[actualCharacter].name;           
        }
        else{
            this.characterSelection[actualCharacter].SetActive(false);
            actualCharacter = 0;
            this.characterSelection[actualCharacter].SetActive(true); 
            UIText.text = this.characterSelection[actualCharacter].name;
            storeData.CharacterName = this.characterSelection[actualCharacter].name;
        }
        SkillText();        
    }

    public void backCharacter(){
        if(actualCharacter == 0){
            this.characterSelection[actualCharacter].SetActive(false);
            actualCharacter = this.nbCharacter-1;
            this.characterSelection[actualCharacter].SetActive(true);
            UIText.text = this.characterSelection[actualCharacter].name;
            storeData.CharacterName = this.characterSelection[actualCharacter].name;           
        }
        else{
            this.characterSelection[actualCharacter].SetActive(false);
            actualCharacter -= 1;
            this.characterSelection[actualCharacter].SetActive(true); 
            UIText.text = this.characterSelection[actualCharacter].name;
            storeData.CharacterName = this.characterSelection[actualCharacter].name;
        }
        SkillText();        
    }

    public void goToNextLevel(){
        SceneManager.LoadScene(LVL_TO_LOAD);
    }

    private void SkillText()
    {   
        Players PlayersInJson = JsonUtility.FromJson<Players>(jsonFile.text);
        LifeText.text = PlayersInJson.players[actualCharacter].life;
        //JumpText.text = PlayersInJson.players[actualCharacter].Jump;
        StrengthText.text = PlayersInJson.players[actualCharacter].Strength;
        SpeedText.text = PlayersInJson.players[actualCharacter].Speed;
        DefenceText.text = PlayersInJson.players[actualCharacter].Defence;
    }
}
