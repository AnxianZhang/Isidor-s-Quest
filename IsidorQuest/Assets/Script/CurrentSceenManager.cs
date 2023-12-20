using UnityEngine;
using UnityEngine.SceneManagement;
using System.Collections.Generic;
using System.Linq;


public class CurrentSceenManager : MonoBehaviour
{

    public static CurrentSceenManager instance;
    private int goldRecoltedInSceen;
    private int goldWhenEnteringTheSceen;
    private int playerLifeWhenEnteringTheSceen;

    [SerializeField] private bool isPlayerPresentByDefault;
    private List<DontDestroy> objectToDestroy;
    public StoringData storeData;
    private void Awake()
    {
        if (instance != null)
        {
            Debug.Log("More that an instance of CurrentSceenManager existing !");
            return;
        }
        instance = this;
    }

    private void Start()
    {
        this.objectToDestroy = new List<DontDestroy>(Object.FindObjectsOfType<DontDestroy>().ToList());
        this.playerLifeWhenEnteringTheSceen = GameObject.Find(storeData.CharacterName).GetComponent<Player>().currentLife;
        //this.goldRecoltedInSceen = GameObject.

        if (Player.hasChangeSceen && SceneManager.GetActiveScene().name.Equals("WorldOneLvl1"))
            removeDontDestoyObjects();
    }
    /*
    private void destroyNewObjectAndPreserveOld()
    {
        foreach (DontDestroy dd in this.objectToDestroy)
            if (dd.hasChangeSceen)
            {

            }
    }*/

    public void removeDontDestoyObjects()
    {
        List<DontDestroy> toRemove = new List<DontDestroy>();
        for (int i = 0; i < this.objectToDestroy.Count; ++i)
        {
            if (!Player.hasChangeSceen)
            {
                this.objectToDestroy[i].removeDontDestroy();
            }
            else if (!this.objectToDestroy[i].hasChangeSceen)
            {
                this.objectToDestroy[i].destroy();
                toRemove.Add(this.objectToDestroy[i]);
            }
        }

        if (toRemove.Count() != 0)
            for (int i = 0; i < toRemove.Count; ++i)
                this.objectToDestroy.Remove(toRemove[i]);

    }

    public int getPlayerLifeWhenEnteringTheSceen()
    {
        return playerLifeWhenEnteringTheSceen;
    }

    public bool getIsPlayerPresentByDefault() { return isPlayerPresentByDefault; }

    public void incrementGoldRecoltedInCurrentSceen()
    {
        goldRecoltedInSceen++;
    }

    public int getGoldRecoltedInSceen()
    {
        return goldRecoltedInSceen;
    }
}
