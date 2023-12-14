using UnityEngine;
using UnityEngine.UI;

public class Shop : MonoBehaviour
{
    private Text interactText;
    void Start()
    {
        this.interactText = GameObject.FindGameObjectWithTag("Msg").GetComponent<Text>();
    }

    private void OnTriggerEnter2D(Collider2D collision)
    {
        this.interactText.enabled = true;
        this.interactText.text = "Shop";
    }

    private void OnTriggerExit2D(Collider2D collision)
    {
        this.interactText.enabled = false;
    }
}
