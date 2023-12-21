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
        base.mainPlayer.boostSpeed(this.speedAmount, '*');
        base.mainPlayer.useObject(gameObject);
        yield return new WaitForSeconds(5);
        base.mainPlayer.boostSpeed(this.speedAmount, '/');
        Destroy(gameObject);
    }
}
