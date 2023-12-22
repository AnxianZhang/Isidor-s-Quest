using UnityEngine;
using UnityEngine.UI;
using System.Linq;


public class MenuUsingCoin : MenuInSpawn
{
    [SerializeField] private Text coinQuantity;


    private void Update()
    {
        initCoinQuantity();
    }


    private int parseInt(string text)
    {
        string extractedNumber = new(text.Where(char.IsDigit).ToArray());

        return int.TryParse(extractedNumber, out int number) ? number : -1;
    }

    protected int extractNumber(string text)
    {
        int slashIdx = text.IndexOf("/");

        return parseInt(slashIdx != -1 ? text.Substring(0, slashIdx) : text);
    }

    protected bool hasEnoughCoin(int toCompare)
    {
        return CoinUI.getCoins() >= toCompare;
    }

    protected void initCoinQuantity()
    {
        this.coinQuantity.text = CoinUI.getCoins().ToString();
    }

    protected void removeCoins(int costAmount)
    {
        CoinUI.removeCoins(costAmount);
        //initCoinQuantity();
    }
}
