using UnityEngine;
public class DoorToNext : MonoBehaviour
{
    [SerializeField] private GameObject goToNextLvlMenu;

    void OnTriggerEnter2D(Collider2D other)
    {
        if(other.tag == "Player")
        {
            this.goToNextLvlMenu.SetActive(true);
            Time.timeScale = 0f;
        }
    }
}