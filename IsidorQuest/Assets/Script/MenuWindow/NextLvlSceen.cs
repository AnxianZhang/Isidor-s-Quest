using UnityEngine;
using UnityEngine.SceneManagement;

public class NextLvlSceen : MonoBehaviour
{
    private void resume()
    {
        Time.timeScale = 1f;
    }
    public void nextLvlButton()
    {
        resume();
        SceneManager.LoadScene(SceneManager.GetActiveScene().buildIndex + 1);
    }

    public void village()
    {
        resume();
        SceneManager.LoadScene("Village");
    }
}
