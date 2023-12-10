using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class CoinItem : MonoBehaviour
{
    void OnTriggerEnter2D(Collider2D other)
    {
        if (other.tag == "Player" && other.GetType().ToString() == "UnityEngine.CapsuleCollider2D")
        {
            CoinUI.CurrentCoinQuantity++;
            CurrentSceenManager.instance.incrementGoldRecoltedInCurrentSceen();
            Destroy(gameObject);
        }
    }
}