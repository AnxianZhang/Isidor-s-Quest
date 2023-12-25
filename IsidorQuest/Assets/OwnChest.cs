using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class OwnChest : NPC
{
    public static bool isInOwnChest;
    private GameObject inventoryMenu;

    protected override string textToShow()
    {
        return "Your chest";
    }


    private new void Start()
    {
        base.Start();
        this.inventoryMenu = GameObject.FindGameObjectWithTag("Menus").transform.GetChild(4).gameObject;
    }

    protected override void otherAction()
    {
        isInOwnChest = !isInOwnChest;
        this.inventoryMenu.SetActive(!this.inventoryMenu.activeInHierarchy);
        inventoryMenu.GetComponent<RectTransform>().anchoredPosition = this.inventoryMenu.activeInHierarchy ? new Vector2(280, 0) : new Vector2();
    }
}
