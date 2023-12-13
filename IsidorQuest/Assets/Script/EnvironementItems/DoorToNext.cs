using UnityEngine;
public class DoorToNext : MonoBehaviour
{
    [SerializeField] private GameObject goToNextLvlMenu;
    private GameSound gm;
    public bool isDoor { get; protected set; }
    void Start(){
        this.gm = GameObject.FindWithTag("SoundManager").GetComponent<GameSound>();
        isDoor = false;
    }
    
    void OnTriggerEnter2D(Collider2D other)
    {
        if(other.tag == "Player")
        {
            gm.doorSoundPlay();
            isDoor = true;
            this.goToNextLvlMenu.SetActive(true);
            Time.timeScale = 0f;
        }
    }
}