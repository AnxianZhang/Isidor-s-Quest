using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using System;
using static UnityEditor.Experimental.GraphView.GraphView;

public class Archer : Player
{
    [SerializeField] private ProjecfileShot projectile;
    [SerializeField] private Transform launchRight;
    [SerializeField] private Transform launchLeft;

    public new void Start()
    {
        base.Start();
        setPlayerCompetenciesSkills();
    }

    private void setPlayerCompetenciesSkills(){
        base.maxLife = 60;
        base.defence = 0;
        base.currentLife = base.maxLife;
        base.damageDeal = 10;
        base.cooldown = 1f;
        print(base.damageDeal);
        for(int i = 0; i < base.skills.damageDealLvl - 1; i++){
            base.damageDeal = (int)Math.Round(base.damageDeal * 1.10f);
        }
        for(int i = 0; i < base.skills.defenceLvl - 1; i++){
            base.defence += .02f;
        }
        for(int i = 0; i < base.skills.lifeLvl - 1; i++){
            base.maxLife = (int)Math.Round(base.maxLife * 1.10f);
            base.currentLife = (int)Math.Round(base.currentLife * 1.10f);
        }
        for(int i = 0; i < base.skills.moveSpeedLvl - 1; i++){
            base.boostSpeed(1.01f, '*');
        }

        print(base.damageDeal);
    }

    public new void Update()
    {
        base.playerActions();
    }

    protected override void doPlayerAttaque()
    {
        gm.ProjectileSoundPlay();
        if (spriteRenderer.flipX == true)
        {
            Instantiate(this.projectile, new Vector3(this.launchLeft.position.x, this.launchLeft.position.y, 1.0f), transform.rotation);
        }
        else
        {
            Instantiate(this.projectile, this.launchRight.position, transform.rotation);
        }
        lastAttackedAt = Time.time;
    }

    void OnCollisionEnter2D(Collision2D col)
    {
        base.isInWater(col);
        base.isPotion(col);
    }

    public void AttackEnemy(GameObject enemy)
    {
        enemy.GetComponent<Enemy>().Attack(base.damageDeal, transform.position);
    }

    public void AttackLayer(GameObject layer, Collider2D col, Vector3 vec)
    {
        layer.GetComponent<DestructibleLayer>().Attack(col, vec);
    }
}
