using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Warrior : MonoBehaviour
{
    public int health;
    public int blinks;
    public float time;
    
    private Renderer myRender;

    // Start is called before the first frame update
    void Start()
    {
        myRender = GetComponent<Renderer>();
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
        BlinkPlayer(blinks, time);
    }

    void BlinkPlayer(int numBlinks, float seconds)
    {
        StartCoroutine(DoBlinks(numBlinks, seconds));
    }

    IEnumerator DoBlinks(int numBlinks, float seconds)
    {
        for(int i=0; i < numBlinks *2; i++)
        {
            myRender.enabled = !myRender.enabled;
            yield return new WaitForSeconds(seconds);
        }
        myRender.enabled = true;
    }
}
