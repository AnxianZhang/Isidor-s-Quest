using UnityEngine;
using UnityEngine.SceneManagement;
using System;
using System.Linq;


public class Inventory : MonoBehaviour
{
    private int inventorySize = 4;
    private GameObject[] inventory;

    void Start()
    {
        inventory = new GameObject[inventorySize];
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
        Debug.Log("in AddItem");
        Debug.Log(index);
        Debug.Log(inventory[index]); // s'ajoute bien
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
