using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class InventoryScreen : MonoBehaviour
{

    private bool isOpen;
    [SerializeField] private GameObject inventoryMenu;
    private Player pM;
    // Start is called before the first frame update
    void Start()
    {
        this.pM = GameObject.FindGameObjectWithTag("Player").GetComponent<Player>();
    }

    // Update is called once per frame
    void Update()
    {
        if ((Input.GetKeyDown(KeyCode.I)) && !this.pM.isDeath)
        {
            if (isOpen) closeInventory();
            else openInventory();
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
