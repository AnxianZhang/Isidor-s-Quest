using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Runtime.CompilerServices;
using UnityEngine;
using UnityEngine.SceneManagement;

public class MiniMap : MonoBehaviour
{
    [SerializeField]
    private float MinH=5f;
    [SerializeField]
    private float MaxH=14f;
    [SerializeField]
    private GameObject MiniMapUI;
    // Start is called before the first frame update
    void Start()
    {

    }

    // Update is called once per frame
    void Update()
    {
        UpdateMinimapVisibility();
    }

    void UpdateMinimapVisibility()
    {
        string currentSceneName = SceneManager.GetActiveScene().name;

        if (currentSceneName == "Village" || currentSceneName == "HomeMenu" || currentSceneName == "SelectCharacter")
        {
            MiniMapUI.SetActive(false);
        }
        else
        {
            MiniMapUI.SetActive(true);
        }
    }
}