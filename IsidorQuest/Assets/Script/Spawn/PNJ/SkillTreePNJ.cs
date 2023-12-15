using UnityEngine;
using UnityEngine.UI;

public class SkillTreePNJ : MonoBehaviour
{
    [SerializeField] private GameObject upgradeSkillsMenu;

    private Text interactText;

    private bool canPlayerInteract;

    void Start()
    {
        this.interactText = GameObject.FindGameObjectWithTag("Msg").GetComponent<Text>();
    }

    private void Update()
    {
        if (Input.GetKeyDown(KeyCode.E) && this.canPlayerInteract && !PauseMenu.getIsPaused())
        {
            this.upgradeSkillsMenu.SetActive(!this.upgradeSkillsMenu.activeInHierarchy);
            this.interactText.enabled = !this.interactText.enabled;
            Time.timeScale = !this.interactText.enabled ? 0 : 1;
            PauseMenu.setIsInSkillTreeMenu(!this.interactText.enabled);
        }
    }

    private void OnTriggerEnter2D(Collider2D collision)
    {
        if (collision.gameObject.tag == "Player")
        {
            this.interactText.enabled = true;
            this.interactText.text = "Skill tree";
            this.canPlayerInteract = true;
        }

    }

    private void OnTriggerExit2D(Collider2D collision)
    {
        if (collision.gameObject.tag == "Player")
        {
            this.interactText.enabled = false;
            this.canPlayerInteract = false;
            PauseMenu.setIsInSkillTreeMenu(false);
        }
    }
}
