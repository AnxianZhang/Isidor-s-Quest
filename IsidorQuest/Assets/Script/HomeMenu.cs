using UnityEngine;
using UnityEngine.SceneManagement;

public class HomeMenu : MonoBehaviour
{
    private const string LVL_TO_LOAD = "WorldOneLvl1";

    [SerializeField] private GameObject settingsWindow;


    public void startGame()
    {
        SceneManager.LoadScene(LVL_TO_LOAD);
    }

    public void showSettingMenu()
    {
        settingsWindow.SetActive(true);
    }

    public void quitGame()
    {
        Application.Quit();
    }
}
