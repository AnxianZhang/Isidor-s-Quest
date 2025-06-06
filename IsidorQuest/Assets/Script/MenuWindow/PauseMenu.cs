using UnityEngine;
using UnityEngine.SceneManagement;

public class PauseMenu : MonoBehaviour
{
    private static bool isPaused = false;

    private GameObject pauseMenu;
    private Player pM;

    [SerializeField] private GameObject settingsMenu;

    private static bool isInSkillTreeMenu;

    public static void setIsInSkillTreeMenu(bool stat)
    {
        isInSkillTreeMenu = stat;
    }

    public StoringData storeData;
    private void Start()
    {
        this.pauseMenu = gameObject.transform.GetChild(2).gameObject;
        this.pM = GameObject.Find(storeData.CharacterName).GetComponent<Player>();
    }

    void Update()
    {
        if ((Input.GetKeyDown(KeyCode.Escape) || Input.GetKeyDown(KeyCode.P)) && !this.settingsMenu.activeInHierarchy && !this.pM.isDeath && !isInSkillTreeMenu)
        {
            Debug.Log("inpause");
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
        Player.hasChangeSceen = false;
        CurrentSceenManager.instance.removeDontDestoyObjects(true);
        SceneManager.LoadScene("HomeMenu");
    }

    public static bool getIsPaused()
    {
        return isPaused;
    }
}
