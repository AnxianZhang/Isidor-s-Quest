using UnityEngine;
using UnityEngine.SceneManagement;
using UnityEngine.UI;

public class LevelSelectionMenu : MonoBehaviour
{
    private GameObject nextLvlMenu;
    private Text interactText;
    private GameObject playerHealAndCoinsUI;

    private void Start()
    {
        this.nextLvlMenu = transform.GetChild(2).gameObject;
        this.interactText = GameObject.FindGameObjectWithTag("Msg").GetComponent<Text>();
        this.playerHealAndCoinsUI = GameObject.Find("CanvasUI");
    }

    private void closeMenu()
    {
        this.nextLvlMenu.SetActive(false);
        this.interactText.enabled = true;
        this.playerHealAndCoinsUI.SetActive(true);
        Time.timeScale = 1f;
    }

    public void lunchWorld1LvlOne()
    {
        closeMenu();
        SceneManager.LoadScene("WorldOneLvl1");
        //CurrentSceenManager.instance.removeDontDestoyObjects();
    }

    public void lunchWorld1LvlTwo()
    {
        closeMenu();
        SceneManager.LoadScene("WorldOneLvl2");
    }

    public void quitButton()
    {
        closeMenu();
    }
}
