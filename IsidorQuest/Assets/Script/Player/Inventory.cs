using System;
using System.Collections;
using System.Collections.Generic;
using Unity.VisualScripting;
using UnityEngine;

public class Inventory : MonoBehaviour
{

    
    private int inventorySize = 4;
    private GameObject[] inventory;

    // Start is called before the first frame update
    void Start()
    {
        inventory = new GameObject[inventorySize];
    }

    // Update is called once per frame
    void Update()
    {
        
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
        item.transform.SetParent(gameObject.transform);
        return true;
    }

    public GameObject[] GetInv(){
        return inventory;
    }

    public void UseItem(int index)
    {
        inventory[index].GetComponent<InventoryItem>().onUse();
    }

    public int GetLenInv(){
        return inventorySize;
    }
}
