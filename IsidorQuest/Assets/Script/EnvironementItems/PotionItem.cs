using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PotionItem : MonoBehaviour
{
    private Player mainPlayer;
    private int heal = 30;

    // Start is called before the first frame update
    void Start()
    {
        this.mainPlayer = GameObject.FindWithTag("Player").GetComponent<Player>();
    }

    // Update is called once per frame
    void Update()
    {
        
    }

    void OnTriggerEnter2D(Collider2D other)
    {
        if (other.tag == "Player" && other.GetType().ToString() == "UnityEngine.CapsuleCollider2D")
        {
            if (mainPlayer.pickUp(gameObject)) gameObject.SetActive(false);
        }
        if (other.tag == "water"){
            Destroy(gameObject);
        }
    }
}
