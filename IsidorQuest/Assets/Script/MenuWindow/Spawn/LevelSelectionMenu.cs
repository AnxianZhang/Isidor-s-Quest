using UnityEngine;
using UnityEngine.SceneManagement;
using UnityEngine.UI;

public class LevelSelectionMenu : MenuInSpawn
{
    //private GameObject nextLvlMenu;
    //private Text interactText;
    //private GameObject playerHealAndCoinsUI;

    private new void Start()
    {
        base.Start();
        this.myMenu = transform.GetChild(2).gameObject;
        //this.interactText = GameObject.FindGameObjectWithTag("Msg").GetComponent<Text>();
        //this.playerHealAndCoinsUI = GameObject.Find("CanvasUI");
    }

/*    private void closeMenu()
    {
        this.nextLvlMenu.SetActive(false);
        base.interactText.enabled = true;
        base.playerHealAndCoinsUI.SetActive(true);
        Time.timeScale = 1f;
    }*/

    public void lunchWorld1LvlOne()
    {
        base.closeMenu();
        SceneManager.LoadScene("WorldOneLvl1");
        //CurrentSceenManager.instance.removeDontDestoyObjects();
    }

    public void lunchWorld1LvlTwo()
    {
        base.closeMenu();
        SceneManager.LoadScene("WorldOneLvl2");
    }

  /*  public void quitButton()
    {
        base.closeMenu();
    }*/
}
