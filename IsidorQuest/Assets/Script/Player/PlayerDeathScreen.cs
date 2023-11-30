using UnityEngine;
using UnityEngine.SceneManagement;

public class PlayerDeathScreen : MonoBehaviour
{
    //[SerializeField] private Canvas playerDeathScreen;
    private PlayerMovement player;
    private GameObject deathMenu;
    private bool isDisplayBoxCalled;

    private void Start()
    {
        this.player = GameObject.Find("Player") ? GameObject.FindWithTag("Player").GetComponent<Warrior>() : GameObject.FindWithTag("Player").GetComponent<Archer>();
        this.deathMenu = gameObject.transform.GetChild(1).gameObject;
    }

    // Update is called once per frame
    void Update()
    {
        DisplayBox();
    }

    private void DisplayBox()
    {
        if (player.getIsDeath() && !this.isDisplayBoxCalled)
        {
            Time.timeScale = .0f;
            this.deathMenu.SetActive(true);
            this.isDisplayBoxCalled = true;
        }
    }

    public void retryButton()
    {
        Time.timeScale = 1f;
        SceneManager.LoadScene(SceneManager.GetActiveScene().name);
    }

    public void mainMenuButton()
    {
        Time.timeScale = 1f;
        SceneManager.LoadScene("HomeMenu");
    }
}
