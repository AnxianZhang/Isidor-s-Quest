using UnityEngine;
using UnityEngine.UI;

public class SkillTreePNJ : MonoBehaviour
{
    private Text interactText;
    void Start()
    {
        this.interactText = GameObject.FindGameObjectWithTag("Msg").GetComponent<Text>();
    }

    private void OnTriggerEnter2D(Collider2D collision)
    {
        this.interactText.enabled = true;
        this.interactText.text = "Skill tree";
    }

    private void OnTriggerStay2D(Collider2D collision)
    {
        
    }

    private void OnTriggerExit2D(Collider2D collision)
    {
        this.interactText.enabled = false;
    }
}
