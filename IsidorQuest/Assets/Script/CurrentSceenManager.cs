using UnityEngine;
using UnityEngine.SceneManagement;


public class CurrentSceenManager : MonoBehaviour
{

    public static CurrentSceenManager instance;
    private int goldRecoltedInSceen;
    private int goldWhenEnteringTheSceen;
    private int playerLifeWhenEnteringTheSceen;

    [SerializeField] private bool isPlayerPresentByDefault;
    private DontDestroy[] objectToDestroy;
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
        this.objectToDestroy = Object.FindObjectsOfType<DontDestroy>();
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
        Debug.Log(objectToDestroy.Length);
        foreach (DontDestroy dd in this.objectToDestroy)
        {
            if (!Player.hasChangeSceen)
            {
                dd.removeDontDestroy();
                Debug.Log("hello");
            }
            else if (!dd.hasChangeSceen)
                dd.destroy();
        }
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
