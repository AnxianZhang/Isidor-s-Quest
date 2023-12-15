using UnityEngine;
using UnityEngine.UI;
using System.Linq;
using System;


public class SkillTreeMenu : MonoBehaviour
{
    private const int INCREMENT_COST = 5;
    private const int MAX_SKILL_LVL = 10;

    [Header("The lvl of skilltree")]
    [SerializeField] private Text HpLvl;
    [SerializeField] private Text defenceLvl;
    [SerializeField] private Text attackLvl;
    [SerializeField] private Text speedLvl;

    [Header("Cost of the upgrade")]
    [SerializeField] private Text upgradingHPCost;
    [SerializeField] private Text upgradingDefenceCost;
    [SerializeField] private Text upgradingAttackCost;
    [SerializeField] private Text upgradingSpeedCost;

    [Header("Player statiscs")]
    [SerializeField] private Text playerMaxHP;
    [SerializeField] private Text playerDefence;
    [SerializeField] private Text playerAttack;
    [SerializeField] private Text playerSpeed;

    private GameObject upgradeSkillsMenu;
    private Player player;
    private Text interactText;

    void Start()
    {
        this.upgradeSkillsMenu = transform.GetChild(1).gameObject;
        this.player = GameObject.FindGameObjectWithTag("Player").GetComponent<Player>();
        this.interactText = GameObject.FindGameObjectWithTag("Msg").GetComponent<Text>();

        this.playerMaxHP.text = this.player.maxLife.ToString();
        this.playerDefence.text = (this.player.defence * 100).ToString() + "%";
        this.playerAttack.text = this.player.damageDeal.ToString();
        this.playerSpeed.text = this.player.getMoveSpeed().ToString();
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

    private bool hasEnoughCoin(int toCompare)
    {
        return CoinUI.getCoins() >= toCompare;
    }

    public void quitButton()
    {
        this.upgradeSkillsMenu.SetActive(false);
        this.interactText.enabled = true;
        Time.timeScale = 1f;
    }

    private void upgradeStat(ref Text costText, ref Text lvlText, Action upgradePlayer)
    {
        int costAmount = extractNumber(costText.text);
        int upgradeLvl = extractNumber(lvlText.text);

        if (hasEnoughCoin(costAmount) && upgradeLvl < MAX_SKILL_LVL)
        {
            costText.text = "Cost: " + (costAmount + INCREMENT_COST);
            lvlText.text = "lv." + ++upgradeLvl + " / 10";
            upgradePlayer.Invoke();
            CoinUI.removeCoins(costAmount);
        }
    }

    public void addHealth()
    {
        upgradeStat(ref this.upgradingHPCost, ref this.HpLvl, ()=> {
            this.player.upgradeLife();
            this.playerMaxHP.text = this.player.maxLife.ToString();
        });
    }

    public void addDefence()
    {
        upgradeStat(ref this.upgradingDefenceCost, ref this.defenceLvl, () => {
            this.player.upgradeDefence();
            this.playerDefence.text = (this.player.defence * 100).ToString() + "%";
        });
    }

    public void addAttack()
    {
        upgradeStat(ref this.upgradingAttackCost, ref this.attackLvl, () => {
            this.player.upgradeDamageDeal();
            this.playerAttack.text = this.player.damageDeal.ToString();
        });
    }

    public void addSpeed()
    {
        upgradeStat(ref this.upgradingSpeedCost, ref this.speedLvl, () => {
            this.player.upgradeMoveSpeed();
            this.playerSpeed.text = this.player.getMoveSpeed().ToString();
        });
    }
}
