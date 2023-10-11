using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Warrior : MonoBehaviour
{
    public int health;

    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        
    }
    public void PlayerHarmed(int damageE)
    {
        health = health - damageE;
        if (health <= 0) 
        {
            Destroy(gameObject);
        }
    }
}
