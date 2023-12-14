using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class CoinItem : MonoBehaviour
{
    private GameSound gm;
    void Start()
    {
        this.gm = GameObject.FindWithTag("SoundManager").GetComponent<GameSound>();
    }

    // Update is called once per frame
    void Update()
    {
        
    }
    void OnTriggerEnter2D(Collider2D other)
    {
        if (other.tag == "Player" && other.GetType().ToString() == "UnityEngine.CapsuleCollider2D")
        {
            gm.collectCoinPlay();
            CoinUI.CurrentCoinQuantity++;
            CurrentSceenManager.instance.incrementGoldRecoltedInCurrentSceen();
            Destroy(gameObject);
        }
        if (other.tag == "water"){
            Destroy(gameObject);
        }
    }
}