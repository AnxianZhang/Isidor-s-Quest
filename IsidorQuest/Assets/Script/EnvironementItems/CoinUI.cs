using UnityEngine;
using UnityEngine.UI;

public class CoinUI : MonoBehaviour
{
    public Text coinQuantity;
    private SaveData sv;
    public static int CurrentCoinQuantity;
    private GetData getData;

    void Start()
    {
        this.getData = GameObject.Find("GetData").GetComponent<GetData>();
        this.sv = GameObject.Find("SavingData").GetComponent<SaveData>();
        if (!Player.hasChangeSceen)
            CurrentCoinQuantity = this.getData.getCoins();
        //Debug.Log("coin: " + CurrentCoinQuantity);
    }

    void Update()
    {
        //sv.saveData();
        coinQuantity.text = CurrentCoinQuantity.ToString();
        //CurrentCoinQuantity = this.getData.getCoins();
    }

    public static int getCoins(){
        return CurrentCoinQuantity;
    }

    public static void removeCoins(int amount)
    {
        CurrentCoinQuantity -= amount;
    }
}
