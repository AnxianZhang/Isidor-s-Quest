using System;
using System.Collections;
using System.Collections.Generic;
using System.Runtime.InteropServices;
using UnityEngine;
using UnityEngine.SceneManagement;

public class Warrior : Player
{
    private GameObject[] enemies;

    public new void Start()
    {
        base.Start();
        base.maxLife = 100;
        base.currentLife = base.maxLife;
        base.damageDeal = 20;
        base.cooldown = 2f;

        this.enemies = GameObject.FindGameObjectsWithTag("Enemy");
    }

    // Update is called once per frame
    public new void Update()
    {
        base.playerActions();
    }

    protected override void doPlayerAttaque()
    {
        // bug here, in the new lvl, enemies ref are in the prev lvl, and not is the new one
        for (int i = 0; i < this.enemies.Length; i++)
        {
            float res = this.enemies[i].transform.position.y - transform.position.y;
            float resSprite = this.enemies[i].transform.position.x - transform.position.x;
            bool tourner = resSprite < 0 && spriteRenderer.flipX || resSprite >= 0 && !spriteRenderer.flipX ? true : false;
            if (Vector2.Distance(this.enemies[i].transform.position, transform.position) < 2.0f && res < 0.25f && res > -0.25f && tourner)
            {
                this.enemies[i].GetComponent<Enemy>().Attack(base.damageDeal, transform.position);
                lastAttackedAt = Time.time;
                isHit = true;
            }
        }
    }

    void OnCollisionEnter2D(Collision2D col)
    {
        base.isInWater(col);
    }
}
