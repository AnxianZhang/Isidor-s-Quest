using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;

public class MultiPlayerManager : MonoBehaviour
{
    [SerializeField]
    private GameObject otherWarriorPlayerSprite;
    [SerializeField]
    private GameObject otherArcherPlayerSprite;

    private string currentScene;
    private Player currentPlayer;
    private static IDictionary<string , GameObject> otherPlayers;
    private static IDictionary<string, Position> otherPlayerPosition;
    private static MultiPlayerManager instance;

    private void Awake()
    {
        if (instance != null)
        {
            Debug.Log("More thant one instance of MultiPlayerMager existing ! ");
            return;
        }

        instance = this;
        otherPlayers = new Dictionary<string, GameObject>();
        otherPlayerPosition = new Dictionary<string, Position>();
        this.currentPlayer = GameObject.FindGameObjectWithTag("Player").GetComponent<Player>();
    }

    private void Update()
    {
        this.currentScene = SceneManager.GetActiveScene().name;

        foreach (var p in otherPlayerPosition)
        {
            Vector3 v = new(p.Value.position[0] + 1, p.Value.position[1] + 1, 0);

            if (!otherPlayers.ContainsKey(p.Key))
            {
                GameObject otherPlayer = getNewOtherPlayer(v, p.Value.characterClass);
                otherPlayer.SetActive(true);
                otherPlayers.Add(p.Key, otherPlayer);
            }
            else
                otherPlayers[p.Key].transform.position = v;
        }
    }

    public static MultiPlayerManager GetMultiPlayerManager()
    {
        return instance;
    }

    private bool isInSameScene(Position p)
    {
        return this.currentScene.Equals(p.currentScene);
    }

    private bool isSamePseudo(string pseudo)
    {
        return pseudo.Equals(this.currentPlayer.pseudo);
    }

    private GameObject getNewOtherPlayer(Vector3 v, string characterClass)
    {
        switch (characterClass)
        {
            case "Warrior":
                return Instantiate(otherWarriorPlayerSprite, v, Quaternion.identity);
            case "Archer":
                return Instantiate(otherArcherPlayerSprite, v, Quaternion.identity);
        }
        return null;
    }

    private void addOtherPlayer(Position p)
    {
        //Vector3 v = new(p.position[0], p.position[1], 0);
        Debug.Log("hello");
        if (otherPlayerPosition.ContainsKey(p.pseudo))
        {
            Debug.Log("update position");

            otherPlayerPosition[p.pseudo].position = p.position;
        }
        else
        {

            //GameObject otherPlayer = Instantiate(otherPlayerSprite, v, Quaternion.identity);
            //Debug.Log("add player");

            //otherPlayerPosition.GetComponent<SpriteRenderer>().sprite = getClassSprite(p.characterClass);
            //Debug.Log("add player");
            Debug.Log("add player");

            otherPlayerPosition.Add(p.pseudo, p);

        }
    }

    public void canBeAdd(Position p)
    {
        if (isInSameScene(p) && !isSamePseudo(p.pseudo))
        {
            addOtherPlayer(p);
        }
    }
}
