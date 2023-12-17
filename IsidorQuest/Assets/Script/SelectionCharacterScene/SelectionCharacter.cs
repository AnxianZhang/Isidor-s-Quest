using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.SceneManagement;
public class SelectionCharacter : MonoBehaviour
{
    [SerializeField] private GameObject[] characterSelection;
    public StoringData storeData;
    private const string LVL_TO_LOAD = "WorldOneLvl1";
    private int nbCharacter;
    private int actualCharacter;
    private Text UIText;
    // Start is called before the first frame update
    void Start()
    {
        nbCharacter = characterSelection.Length;
        storeData.CharacterName = this.characterSelection[actualCharacter].name;
        actualCharacter = 0;
        UIText = GameObject.Find("TextNameCharacterSelect").GetComponent<Text>();
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
    }

    public void goToNextLevel(){
        //SetCharacterActiveInNextScene();
        SceneManager.LoadScene(LVL_TO_LOAD);
    }

    /*private void SetCharacterActiveInNextScene()
    {
        DontDestroyOnLoad(characterSelection[actualCharacter]);
    }*/
}
