using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Force : PotionItem
{
    private float strengthAmount = 1.50f; // in %

    public override void onUse()
    {
        StartCoroutine(boostStrength());
    }

    private IEnumerator boostStrength()
    {
        if(!base.gm.playerDrinkIsPlaying()){
            base.gm.playerDrinkSound();
        }
        base.mainPlayer.boostForce(this.strengthAmount, '*');
        base.mainPlayer.useObject(gameObject);
        yield return new WaitForSeconds(5);
        base.mainPlayer.boostForce(this.strengthAmount, '/');
        Destroy(gameObject);
    }
}
