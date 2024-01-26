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
        CurrentCoinQuantity = this.getData.getCoins();
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
