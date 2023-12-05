using UnityEngine;
using UnityEngine.SceneManagement;

public class PauseMenu : MonoBehaviour
{
    private static bool isPaused = false;

    private GameObject pauseMenu;

    [SerializeField] private GameObject settingsMenu;

    private void Start()
    {
        this.pauseMenu = gameObject.transform.GetChild(0).gameObject;
    }

    // Update is called once per frame
    void Update()
    {
        if ((Input.GetKeyDown(KeyCode.Escape) || Input.GetKeyDown(KeyCode.P)) && !this.settingsMenu.activeInHierarchy)
        {
            if (isPaused) resume();
            else pause();
        }
    }

    public void resume()
    {
        pauseMenu.SetActive(false);
        Time.timeScale = 1f;
        isPaused = false;
    }

    private void pause()
    {
        pauseMenu.SetActive(true);
        Time.timeScale = .0f;
        isPaused = true;
    }

    public void settingsButton()
    {
        this.settingsMenu.SetActive(true);
    }
    public void mainMenu()
    {
        resume();
        SceneManager.LoadScene("HomeMenu");
    }

    public bool getIsPaused()
    {
        return isPaused;
    }
}
