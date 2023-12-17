using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class ActivationJoueurManager : MonoBehaviour
{
    // Start is called before the first frame update
    public StoringData storeData;
    void Start()
    {
        GameObject[] Joueur = GameObject.FindGameObjectsWithTag("Player");
        for(int i = 0; i < Joueur.Length; i++){
            if(Joueur[i].name != storeData.CharacterName){
                Joueur[i].SetActive(false);
            }
        }
    }

    // Update is called once per frame
    void Update()
    {
        
    }
}
