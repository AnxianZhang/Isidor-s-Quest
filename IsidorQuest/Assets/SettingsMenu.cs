using UnityEngine;
using UnityEngine.Audio;


public class Settings : MonoBehaviour
{
   
    [SerializeField] private AudioMixer mixer;

    public void setVolume(float volume)
    {
        this.mixer.SetFloat("volume", volume);
    }

    public void setFullSreen(bool isFullSreen)
    {
        Debug.Log(isFullSreen);
        Screen.fullScreen = isFullSreen;
    }
}
