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
    private Transform mainPlayer;
    public StoringData storeData;


    void Start()
    {
        this.getData = GameObject.Find("GetData").GetComponent<GetData>();
        this.mainPlayer = GameObject.Find(storeData.CharacterName).GetComponent<Transform>();
        inventory = new GameObject[inventorySize];
        setInventory();
    }

    private void setInventory(){
        List<int> liste = this.getData.getInventory();
        GameObject potionGO = null;
        for(int i = 0; i < liste.Count; i++){
             if(liste[i] != 0){
                if(liste[i] == 1){
                     potionGO = Instantiate(instantHeal, this.transform);
                }
                if(liste[i] == 2){
                    potionGO = Instantiate(Jump, this.transform);
                }
                if(liste[i] == 3){
                    potionGO = Instantiate(Speed, this.transform);
                }
                if(liste[i] == 4){
                    potionGO = Instantiate(Strength, this.transform);
                }
                
                potionGO.GetComponent<PotionItem>().makeItDisapeard();
                AddItem(potionGO);
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
