using UnityEngine;
using UnityEngine.UI;

public abstract class NPC : MonoBehaviour
{
    [SerializeField] private GameObject menuToOpen;

    private Text interactText;

    private bool canPlayerInteract;
    private GameObject playerHealAndCoinsUI;

    protected abstract string textToShow();


    protected void Start()
    {
        this.interactText = GameObject.FindGameObjectWithTag("Msg").GetComponent<Text>();
        this.playerHealAndCoinsUI = GameObject.Find("CanvasUI");
    }

    protected void Update()
    {
        if (Input.GetKeyDown(KeyCode.E) && this.canPlayerInteract && !PauseMenu.getIsPaused())
        {
            this.menuToOpen.SetActive(!this.menuToOpen.activeInHierarchy);
            this.interactText.enabled = !this.interactText.enabled;
            Time.timeScale = !this.interactText.enabled ? 0 : 1;
            this.playerHealAndCoinsUI.SetActive(!this.menuToOpen.activeInHierarchy);
            PauseMenu.setIsInSkillTreeMenu(!this.interactText.enabled);
        }
    }

    protected void OnTriggerEnter2D(Collider2D collision)
    {
        if (collision.gameObject.tag == "Player")
        {
            this.interactText.enabled = true;
            this.interactText.text = textToShow();
            this.canPlayerInteract = true;
        }

    }

    protected void OnTriggerExit2D(Collider2D collision)
    {
        if (collision.gameObject.tag == "Player" && this.interactText)
        {
            this.interactText.enabled = false;
            this.canPlayerInteract = false;
            PauseMenu.setIsInSkillTreeMenu(false);
        }
    }
}