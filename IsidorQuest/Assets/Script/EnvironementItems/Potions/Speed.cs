using System.Collections;
using UnityEngine;


public class Speed : PotionItem
{
    private float speedAmount = 1.30f; // in %

    public override void onUse()
    {
        StartCoroutine(boostSpeed());
    }

    private IEnumerator boostSpeed()
    {
        if(!base.gm.playerDrinkIsPlaying()){
            base.gm.playerDrinkSound();
        }
        base.mainPlayer.useObject(gameObject);
        base.mainPlayer.boostSpeed(this.speedAmount, '*');
        yield return new WaitForSeconds(5);
        base.mainPlayer.boostSpeed(this.speedAmount, '/');
        Destroy(gameObject);
    }
}
