using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public abstract class PotionItem : InventoryItem
{
    protected Player mainPlayer { get; set; }
    public StoringData storeData;


    void Start()
    {
        this.mainPlayer = GameObject.Find(storeData.CharacterName).GetComponent<Player>();
    }

    public void makeItDisapeard()
    {
        Debug.Log("hola");
        gameObject.GetComponent<SpriteRenderer>().enabled = false;
        foreach (BoxCollider2D b in gameObject.GetComponents<BoxCollider2D>())
            b.enabled = false;
        gameObject.GetComponent<Rigidbody2D>().bodyType = RigidbodyType2D.Static;
    }

    void OnTriggerEnter2D(Collider2D other)
    {
        if (other.tag == "Player" && other.GetType().ToString().Equals("UnityEngine.CapsuleCollider2D"))
        {
            if (mainPlayer.pickUp(gameObject))
                makeItDisapeard();
        }
        if (other.tag == "water")
        {
            Destroy(gameObject);
        }
    }
}
