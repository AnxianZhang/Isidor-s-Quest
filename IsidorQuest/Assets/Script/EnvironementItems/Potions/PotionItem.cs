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

    void OnTriggerEnter2D(Collider2D other)
    {
        if (other.tag == "Player" && other.GetType().ToString().Equals("UnityEngine.CapsuleCollider2D"))
        {
            if (mainPlayer.pickUp(gameObject))
            {
                gameObject.GetComponent<SpriteRenderer>().enabled = false;
                foreach (BoxCollider2D b in gameObject.GetComponents<BoxCollider2D>())
                    b.enabled = false;
                gameObject.GetComponent<Rigidbody2D>().bodyType = RigidbodyType2D.Static;
            }
        }
        if (other.tag == "water")
        {
            Destroy(gameObject);
        }
    }
}
