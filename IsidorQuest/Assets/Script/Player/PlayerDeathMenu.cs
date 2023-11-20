using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;

public class PlayerDeathMenu : MonoBehaviour
{
    public void resuscitate()
    {
        SceneManager.LoadScene(SceneManager.GetActiveScene().name);
    }

    public void WebSiteHome()
    {
        SceneManager.LoadScene(SceneManager.GetActiveScene().buildIndex - 1);
    }

}
