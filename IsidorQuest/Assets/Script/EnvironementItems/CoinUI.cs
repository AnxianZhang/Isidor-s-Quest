using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class CoinUI : MonoBehaviour
{
    public int startCoinQuantity;
    public Text coinQuantity;

    public static int CurrentCoinQuantity;

    void Start()
    {
        if (!Player.hasChangeSceen)
            CurrentCoinQuantity = startCoinQuantity;
        //Debug.Log("coin: " + CurrentCoinQuantity);
    }

    void Update()
    {
        coinQuantity.text = CurrentCoinQuantity.ToString();
    }

    public static int getCoins(){
        return CurrentCoinQuantity;
    }

    public static void removeCoins(int amount)
    {
        CurrentCoinQuantity -= amount;
    }
}
