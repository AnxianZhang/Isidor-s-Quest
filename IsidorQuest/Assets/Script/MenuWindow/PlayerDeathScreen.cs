using UnityEngine;
using UnityEngine.SceneManagement;

public class PlayerDeathScreen : MonoBehaviour
{
    //[SerializeField] private Canvas playerDeathScreen;
    private Player player;
    private GameObject deathMenu;
    private bool isDisplayBoxCalled;

    private void Start()
    {
        this.player = GameObject.FindWithTag("Player").GetComponent<Player>();
        this.deathMenu = gameObject.transform.GetChild(2).gameObject;
    }

    // Update is called once per frame
    void Update()
    {
        DisplayBox();
    }

    private void DisplayBox()
    {
        if (player.isDeath && !this.isDisplayBoxCalled)
        {
            Time.timeScale = .0f;
            this.deathMenu.SetActive(true);
            this.isDisplayBoxCalled = true;
        }
    }

    public void retryButton()
    {
        // revice player
        Time.timeScale = 1f;
        SceneManager.LoadScene(SceneManager.GetActiveScene().name);
    }

    public void mainMenuButton()
    {
        Time.timeScale = 1f;
        SceneManager.LoadScene("HomeMenu");
    }
}