using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class CurrentSceenManager : MonoBehaviour
{

    public static CurrentSceenManager instance;
    private int goldRecoltedInSceen;

    [SerializeField] private bool isPlayerPresentByDefault;
    private DontDestroy[] objectToDestroy;

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
    }

    public void removeDontDestoyObjects()
    {
        foreach (DontDestroy dd in this.objectToDestroy)
            dd.removeDontDestroy();
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
