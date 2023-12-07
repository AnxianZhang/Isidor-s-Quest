using UnityEngine;
using System.Collections;
using UnityEngine.SceneManagement;

public class NextLvlSceen : MonoBehaviour
{
    private void resume()
    {
        Time.timeScale = 1f;
    }
    public void nextLvlButton()
    {
        StartCoroutine(laodNextSceen());
    }

    public void village()
    {
        resume();
        SceneManager.LoadScene("Village");
    }

    public IEnumerator laodNextSceen()
    {
        resume();
        this.gameObject.transform.GetChild(3).gameObject.SetActive(false);
        this.gameObject.transform.GetChild(0).gameObject.GetComponent<Animator>().SetTrigger("FadeIn");
        yield return new WaitForSeconds(1f);
        SceneManager.LoadScene(SceneManager.GetActiveScene().buildIndex + 1);
    }
}
