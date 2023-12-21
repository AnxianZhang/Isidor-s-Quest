using System.Collections;
using UnityEngine;

public class Jump : PotionItem
{
    private float jumpAmount = 1.50f; // in %

    public override void onUse()
    {
        StartCoroutine(boostJump());
    }

    private IEnumerator boostJump()
    {
        base.mainPlayer.jumpBoost(this.jumpAmount, '*');
        base.mainPlayer.useObject(gameObject);
        yield return new WaitForSeconds(5);
        base.mainPlayer.jumpBoost(this.jumpAmount, '/');
        Destroy(gameObject);
    }
}
