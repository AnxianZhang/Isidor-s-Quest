using UnityEngine;
using UnityEngine.UI;

public class MenuInSpawn : MonoBehaviour
{
    protected GameObject myMenu { get; set; }

    protected GameObject playerHealAndCoinsUI { get; set; }
    protected Text interactText { get; set; }


    protected void Start()
    {
        this.interactText = GameObject.FindGameObjectWithTag("Msg").GetComponent<Text>();
        this.playerHealAndCoinsUI = GameObject.Find("CanvasUI");
    }

    public void closeMenu()
    {
        PauseMenu.setIsInSkillTreeMenu(false);
        this.playerHealAndCoinsUI.SetActive(true);
        this.myMenu.SetActive(false);
        this.interactText.enabled = true;
        Time.timeScale = 1f;
    }
}