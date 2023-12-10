using UnityEngine;
using UnityEngine.SceneManagement;
using System.Collections;

public class PlayerDeathScreen : MonoBehaviour
{
    private Player player;
    private GameObject deathMenu;
    private bool isDisplayBoxCalled;

    private void Start()
    {
        this.player = GameObject.FindWithTag("Player").GetComponent<Player>();
        this.deathMenu = gameObject.transform.GetChild(2).gameObject;
    }

    void Update()
    {
        DisplayBox();
    }

    private void DisplayBox()
    {
        if (player.isDeath && !this.isDisplayBoxCalled)
        {
            this.deathMenu.SetActive(true);
            this.isDisplayBoxCalled = true;
        }
    }

    private void executeRemoveObjects()
    {
        if (CurrentSceenManager.instance.getIsPlayerPresentByDefault())
        {
            CurrentSceenManager.instance.removeDontDestoyObjects();
        }

        CoinUI.removeCoins(CurrentSceenManager.instance.getGoldRecoltedInSceen());
    }

    public void retryButton()
    {
        executeRemoveObjects();
        SceneManager.LoadScene(SceneManager.GetActiveScene().name);

        this.player.revive(
            CurrentSceenManager.instance.getIsPlayerPresentByDefault(), 
            CurrentSceenManager.instance.getPlayerLifeWhenEnteringTheSceen()
        );
        this.isDisplayBoxCalled = false;
        this.deathMenu.SetActive(false);
    }

    public void mainMenuButton()
    {
        Time.timeScale = 1f;
        CurrentSceenManager.instance.removeDontDestoyObjects();
        SceneManager.LoadScene("HomeMenu");
    }
}