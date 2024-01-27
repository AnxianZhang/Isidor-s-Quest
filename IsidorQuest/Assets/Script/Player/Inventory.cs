using UnityEngine;
using UnityEngine.SceneManagement;
using System;
using System.Linq;
using System.Collections.Generic;

public class Inventory : MonoBehaviour
{
    private int inventorySize = 4;
    private GameObject[] inventory;
    private GetData getData;
    [SerializeField] private GameObject instantHeal;
    [SerializeField] private GameObject Jump;
    [SerializeField] private GameObject Speed;
    [SerializeField] private GameObject Strength;




    void Start()
    {
        this.getData = GameObject.Find("GetData").GetComponent<GetData>();
        inventory = new GameObject[inventorySize];
        List<int> liste = this.getData.getInventory();
        print("inventaire");
        for(int i = 0; i < liste.Count; i++){
             if(liste[i] != 0){
                if(liste[i] == 1){
                    Instantiate(instantHeal);
                }
                if(liste[i] == 2){
                    Instantiate(Jump);
                }
                if(liste[i] == 3){
                    Instantiate(Speed);
                }
                if(liste[i] == 4){
                    Instantiate(Strength);
                }
            }
        }
    }



    //Add the item in the inventory, if the inventory is full return false
    public bool AddItem(GameObject item){
        int index = 0;
        foreach (GameObject slot in inventory) {
            if(slot == null){
                break;
            }
            index++;
        }
        if(index == inventorySize) return false;
        inventory[index] = item;
/*        Debug.Log("in AddItem");
        Debug.Log(index);
        Debug.Log(inventory[index]); // s'ajoute bien*/
        item.transform.SetParent(gameObject.transform);
        return true;
    }

    public void removeItem(GameObject item)
    {
        inventory[Array.IndexOf(inventory, item)] = null;
        item.transform.SetParent(null);
        SceneManager.MoveGameObjectToScene(item, SceneManager.GetActiveScene());
    }

    public GameObject[] GetInv(){
        return inventory;
    }

    public bool isFull()
    {
        return this.inventory.Count(item => item == null) > 0;
    }

    public void UseItem(int index)
    {
        Debug.Log("in UseItem"); // x2
        Debug.Log("idx: " + index + "item: "+ inventory[index]);
        inventory[index].GetComponent<InventoryItem>().onUse();
    }

    public int GetLenInv(){
        return inventorySize;
    }
}
