using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;

public class DontDestroy : MonoBehaviour
{
    private string objID;
    private DontDestroy[] toNotDestroy;
    private void Awake()
    {
        this.objID = name + transform.position.ToString() + transform.eulerAngles.ToString();
        this.toNotDestroy = Object.FindObjectsOfType<DontDestroy>();
    }

    private void Start()
    {
        for (int i = 0; i < this.toNotDestroy.Length; ++i)
            if (this.toNotDestroy[i] != this && this.toNotDestroy[i].objID == objID)
                Destroy(gameObject);
        DontDestroyOnLoad(gameObject);
    }

    public void removeDontDestroy()
    {
        SceneManager.MoveGameObjectToScene(gameObject, SceneManager.GetActiveScene());
    }
}
