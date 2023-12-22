using UnityEngine;
using UnityEngine.UI;


public class ShopMenu : MenuUsingCoin
{
    [Header("Cost of each potions")]
    [SerializeField] private Text healPotionText;
    [SerializeField] private Text speedPotionText;
    [SerializeField] private Text jumpPotionText;
    [SerializeField] private Text strengthPotionText;

    [Header("Potions item")]
    [SerializeField] private GameObject heal;
    [SerializeField] private GameObject speed;
    [SerializeField] private GameObject jump;
    [SerializeField] private GameObject strength;

    private Inventory inventory;

    private new void Start()
    {
        base.Start();
        base.myMenu = transform.GetChild(3).gameObject;

        this.inventory = GameObject.FindGameObjectWithTag("Inventory").GetComponent<Inventory>();
    }


    private void buy(ref Text costText, ref GameObject potion)
    {
        int costAmount = base.extractNumber(costText.text);
        if (base.hasEnoughCoin(costAmount) && this.inventory.isFull()) 
        {
            GameObject potionGO = Instantiate(potion, this.inventory.transform);
            potionGO.GetComponent<PotionItem>().makeItDisapeard();
            this.inventory.AddItem(potionGO);
            base.removeCoins(costAmount);
        }
        else
        {
            // msg to tell that the player don't have enougth gold or slot in inventory
        }

    }

    public void buyInstanteHealth()
    {
        buy(ref this.healPotionText, ref this.heal);
    }
}
