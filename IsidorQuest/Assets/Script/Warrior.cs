using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Warrior : MonoBehaviour
{
    public int health;
    public int blinks;
    public float time;
    
    private Renderer myRender;
    private ScreenFlash sf;

    // Start is called before the first frame update
    void Start()
    {
        myRender = GetComponent<Renderer>();
        sf=GetComponent<ScreenFlash>();
    }

    // Update is called once per frame
    void Update()
    {
        
    }

    public void PlayerHarmed(int damageE)
    {
        sf.FlashScreen();
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
