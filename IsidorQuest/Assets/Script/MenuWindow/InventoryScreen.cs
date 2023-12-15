using System;
using System.Collections;
using System.Collections.Generic;
using System.Diagnostics;
using UnityEditor;
using UnityEditor.U2D;
using UnityEngine;
using UnityEngine.UI;

public class InventoryScreen : MonoBehaviour
{

    private bool isOpen;
    [SerializeField] private GameObject inventoryMenu;
    private Player pM;
    private Inventory inventory;

    // Start is called before the first frame update
    void Start()
    {
        this.pM = GameObject.FindGameObjectWithTag("Player").GetComponent<Player>();
        this.inventory = GameObject.FindGameObjectWithTag("Inventory").GetComponent<Inventory>();
    }

    // Update is called once per frame
    void Update()
    {
        if (Input.GetKeyDown(KeyCode.I) && !this.pM.isDeath)
        {
            if (isOpen) closeInventory();
            else openInventory();
        }

        if(isOpen){updateInventory();}
    }

    private void updateInventory()
    {
        GameObject[] slotsSprite = GameObject.FindGameObjectsWithTag("SlotSprite");
        GameObject[] inv =  inventory.GetInv();
        int index = 0;
        foreach (GameObject items in inv) {
            Image sprite = slotsSprite[index].GetComponent<Image>();
            if(items != null){
                sprite.sprite = items.GetComponent<SpriteRenderer>().sprite;
            }
            else{
                sprite.sprite = null;
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
}
