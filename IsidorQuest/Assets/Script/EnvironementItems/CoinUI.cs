using UnityEngine;
using UnityEngine.UI;

public class CoinUI : MonoBehaviour
{
    public Text coinQuantity;
    public static int CurrentCoinQuantity;
    private GetData getData;
    void Start()
    {
        this.getData = GameObject.Find("GetData").GetComponent<GetData>();
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
