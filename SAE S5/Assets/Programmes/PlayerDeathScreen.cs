using System.Collections;
using System.Collections.Generic;
using UnityEngine.UI;
using UnityEngine;

public class PlayerDeathScreen : MonoBehaviour
{
    [SerializeField] private Canvas playerDeathScreen;
    [SerializeField] private MainCharacter lifePlayer;

    // Start is called before the first frame update
    void Start()
    {
        playerDeathScreen.enabled = false;
    }

    // Update is called once per frame
    void Update()
    {
        DisplayBox();
    }

    private void DisplayBox(){
        if(lifePlayer.getLife() <= 0){
            playerDeathScreen.enabled = true;
        }
    }
}
