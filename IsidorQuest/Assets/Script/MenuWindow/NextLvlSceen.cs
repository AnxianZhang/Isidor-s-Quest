using UnityEngine;
using System.Collections;
using UnityEngine.SceneManagement;

public class NextLvlSceen : MonoBehaviour
{
    private GameObject nextLvlSreen;

    private void Start()
    {
        this.nextLvlSreen = gameObject.transform.GetChild(3).gameObject;
    }

    private void resume()
    {
        Time.timeScale = 1f;
        this.nextLvlSreen.SetActive(false);
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
        this.gameObject.transform.GetChild(0).gameObject.GetComponent<Animator>().SetTrigger("FadeIn");
        yield return new WaitForSeconds(1f);
        SceneManager.LoadScene(SceneManager.GetActiveScene().buildIndex + 1);
    }
}
