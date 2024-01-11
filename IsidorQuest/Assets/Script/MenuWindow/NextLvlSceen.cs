using UnityEngine;
using System.Collections;
using UnityEngine.SceneManagement;

public class NextLvlSceen : MonoBehaviour
{
    private GameObject nextLvlSreen;
    private bool isAlreadyExec;

    private void Start()
    {
        this.nextLvlSreen = gameObject.transform.GetChild(4).gameObject;
    }

    private void resume()
    {
        Time.timeScale = 1f;
        this.nextLvlSreen.SetActive(false);
    }
    public void nextLvlButton()
    {
        if (SceneManager.sceneCountInBuildSettings != SceneManager.GetActiveScene().buildIndex + 1)
            StartCoroutine(laodNextSceen());
        else
        {
            // show a message ==> no more lvl available for now
        }
    }

    public void village()
    {
        resume();
        Player.hasChangeSceen = true;
        if (!this.isAlreadyExec)
        {
            foreach (DontDestroy dd in Object.FindObjectsOfType<DontDestroy>())
                dd.hasChangeSceen = true;
            this.isAlreadyExec = true;
        }
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
