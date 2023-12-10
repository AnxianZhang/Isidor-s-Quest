using UnityEngine;
using UnityEngine.Audio;


public class Settings : MonoBehaviour
{
   
    [SerializeField] private AudioMixer mixer;

    private void Update()
    {
        if (this.gameObject.activeInHierarchy && Input.GetKeyDown(KeyCode.Escape))
        {
            quitSettings();
        }
    }

    public void setVolume(float volume)
    {
        this.mixer.SetFloat("volume", volume);
    }

    public void setFullSreen(bool isFullSreen)
    {
        //Debug.Log(isFullSreen);
        Screen.fullScreen = isFullSreen;
    }

    public void quitSettings()
    {
        gameObject.SetActive(false);
    }
}
