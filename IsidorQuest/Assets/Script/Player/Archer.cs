using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Archer : Player
{
    [SerializeField] private ProjecfileShot projectile;
    [SerializeField] private Transform launchRight;
    [SerializeField] private Transform launchLeft;

    public new void Start()
    {
        base.Start();
        base.maxLife = 60;
        this.defence = 0;
        base.currentLife = base.maxLife;
        base.damageDeal = 10;
        base.cooldown = 1f;
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
    }

    public void AttackEnemy(GameObject enemy)
    {
        enemy.GetComponent<Enemy>().Attack(base.damageDeal, transform.position);
    }
}
