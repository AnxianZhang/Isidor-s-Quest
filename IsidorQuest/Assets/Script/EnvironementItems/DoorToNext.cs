using UnityEngine;
public class DoorToNext : MonoBehaviour
{
    private GameObject goToNextLvlMenu;
    private GameSound gm;
    public bool isDoor { get; protected set; }
    void Start(){
        this.gm = GameObject.FindWithTag("SoundManager").GetComponent<GameSound>();
        this.goToNextLvlMenu = GameObject.FindGameObjectWithTag("Menus").transform.GetChild(4).gameObject;
        isDoor = false;
    }

    //Only for dev
    private void Update()
    {
        if (Input.GetKeyDown(KeyCode.T))
        {
            Debug.Log("for dev");
            gm.doorSoundPlay();
            isDoor = true;
            this.goToNextLvlMenu.SetActive(true);
            Time.timeScale = 0f;
        }
    }

    void OnTriggerEnter2D(Collider2D other)
    {
        if(other.tag == "Player" || Input.GetKeyDown(KeyCode.T))
        {
            gm.doorSoundPlay();
            isDoor = true;
            this.goToNextLvlMenu.SetActive(true);
            Time.timeScale = 0f;
        }
    }
}