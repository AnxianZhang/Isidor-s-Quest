using UnityEngine;
public class DoorToNext : MonoBehaviour
{
    [SerializeField] private GameObject goToNextLvlMenu;
    private GameSound gm;

    void Start(){
        this.gm = GameObject.FindWithTag("SoundManager").GetComponent<GameSound>();
    }

    void OnTriggerEnter2D(Collider2D other)
    {
        if(other.tag == "Player")
        {
            gm.doorSoundPlay();
            this.goToNextLvlMenu.SetActive(true);
            Time.timeScale = 0f;
        }
    }
}