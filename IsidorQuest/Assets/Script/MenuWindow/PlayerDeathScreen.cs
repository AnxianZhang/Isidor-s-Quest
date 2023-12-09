using UnityEngine;
using UnityEngine.SceneManagement;

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
            Time.timeScale = .0f;
            Debug.Log("hi");
            this.deathMenu.SetActive(true);
            this.isDisplayBoxCalled = true;
        }
    }

    private void executeRemoveDontDestroyObjects()
    {
        if (CurrentSceenManager.instance.isActiveAndEnabled) CurrentSceenManager.instance.removeDontDestoyObjects();
    }

    public void retryButton()
    {
        executeRemoveDontDestroyObjects();
        this.isDisplayBoxCalled = false;
        this.player.revive();
        Time.timeScale = 1f;
        SceneManager.LoadScene(SceneManager.GetActiveScene().name);
    }

    public void mainMenuButton()
    {
        Time.timeScale = 1f;
        SceneManager.LoadScene("HomeMenu");
    }
}