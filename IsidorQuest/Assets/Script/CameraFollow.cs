using UnityEngine;
using UnityEngine.SceneManagement;

public class CameraFollow : MonoBehaviour
{
    public string sceneToChage;
    public void startGameButton()
    {
        SceneManager.LoadScene(sceneToChage);
    }

    public void settingsButton()
    {

    }

    public void quitGameButton()
    {
        Application.Quit();
    }
}
