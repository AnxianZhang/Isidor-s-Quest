using UnityEngine;
using UnityEngine.UI;
using System.Linq;


public class SkillTreeMenu : MonoBehaviour
{
    private GameObject upgradeSkillsMenu;
    private Player player;

    private int HpLvl;
    private int defenceLvl;
    private int attackLvl;
    private int speedLvl;

    void Start()
    {
        this.upgradeSkillsMenu = transform.GetChild(1).gameObject;
        this.player = GameObject.FindGameObjectWithTag("Player").GetComponent<Player>();
    }

    private int parseInt(string text)
    {
        string extractedNumber = new(text.Where(char.IsDigit).ToArray());

        return int.TryParse(extractedNumber, out int number) ? number : -1;
    }

    private int extractNumber(string text)
    {
        int slashIdx = text.IndexOf("/");

        return parseInt(slashIdx != -1 ? text.Substring(0, slashIdx) : text);
    }

    public void quitButton()
    {
        this.upgradeSkillsMenu.SetActive(false);
    }

    private void addButton(Text costText, Text lvlText)
    {
        int cost = extractNumber(costText.text);
        int lvl = extractNumber(lvlText.text);

    }
}
