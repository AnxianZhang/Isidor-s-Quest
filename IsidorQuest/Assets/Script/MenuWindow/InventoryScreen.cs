using UnityEngine;
using UnityEngine.UI;

public class InventoryScreen : MonoBehaviour
{

    private bool isOpen;
    [SerializeField] private GameObject inventoryMenu;
    private Player pM;
    private Inventory inventory;
    private bool[] updated;

    // Start is called before the first frame update
    void Start()
    {
        this.pM = GameObject.FindGameObjectWithTag("Player").GetComponent<Player>();
        this.inventory = GameObject.FindGameObjectWithTag("Inventory").GetComponent<Inventory>();

        this.updated = new bool[inventory.GetLenInv()];
        for (int i = 0; i< updated.Length; i++){
            updated[i] = false;
        }
    }

    // Update is called once per frame
    void Update()
    {

        if (Input.GetKeyDown(KeyCode.I) && !this.pM.isDeath)
        {
            if (isOpen) closeInventory();
            else openInventory();
        }

        if (isOpen) { 
            updateInventory();
        }
    }

    private void updateInventory()
    {
        GameObject[] slotsSprite = GameObject.FindGameObjectsWithTag("SlotSprite");
        GameObject[] inv =  inventory.GetInv();
        int index = 0;
        foreach (GameObject items in inv) {
            Image sprite = slotsSprite[index].GetComponent<Image>();
            Button button = slotsSprite[index].GetComponent<Button>();
            if(items != null){
                if(!updated[index]){
                    sprite.sprite = items.GetComponent<SpriteRenderer>().sprite;
                    button.onClick.AddListener(() => {useItem(button.transform.parent.GetSiblingIndex()-1);});
                    button.interactable = true;
                    updated[index] = true;
                } 
            }
            else{
                sprite.sprite = null;
                button.interactable = false;
                updated[index] = false;
            }
            index++;
        }
    }

    private void openInventory(){
        inventoryMenu.SetActive(true); 
        Time.timeScale = .0f;
        isOpen = true;
    }

    private void closeInventory(){
        inventoryMenu.SetActive(false);
        Time.timeScale = 1f;
        isOpen = false;
    }

    private void useItem(int index){
        inventory.UseItem(index);
    }
}
