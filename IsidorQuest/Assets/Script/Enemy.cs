using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public abstract class Enemy : MonoBehaviour
{
    public int health;
    public int damage;
    public GameObject dropCoin;

    public float flashTime;

    private SpriteRenderer sr;
    private Color originalColor;
    private Warrior PH;

    // Start is called before the first frame update
    public void Start()
    {
        PH = GameObject.FindGameObjectWithTag("Player").GetComponent<Warrior>();
        sr = GetComponent<SpriteRenderer>();
        originalColor = sr.color;
    }

    // Update is called once per frame
    public void Update()
    {
        if(health <= 0){
            Instantiate(dropCoin,transform.position,Quaternion.identity);
            Destroy(gameObject);
        }
    }

    public void EnemyHarmed(int damageP){
        health = health - damageP;
        FlashColor(flashTime);
    }

    public void FlashColor(float time){
        sr.color = Color.red;
        Invoke("ResetColor",time);
    }
    
    public void ResetColor(){
        sr.color = originalColor;
    }

    void OnTriggerEnter2D(Collider2D other)
    {
        if(other.tag == "Player")
        {
            if(PH != null)
            {
                PH.PlayerHarmed(damage);
                // Debug.Log("-1-1-1");
            }
        }
    }
}
