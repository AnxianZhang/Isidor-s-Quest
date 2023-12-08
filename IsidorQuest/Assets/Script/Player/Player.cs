using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public abstract class Player : PlayerMovement
{
    protected int blinks = 2;
    protected float time = 0.02f;
    protected Rigidbody2D rB;
    protected int damageDeal { get; set; }
    public int maxLife { get; protected set; }
    public int currentLife { get; protected set; }
    public float cooldown { get; protected set; }

    public bool isDeath { get; protected set; }
    protected float lastAttackedAt;

    protected bool isWater;
    protected bool isHit;

    protected abstract void doPlayerAttaque();

    protected void playerActions()
    {
        base.Update();
        if (this.isWater || this.currentLife <= 0)
        {
            Death();
        }
        if (Input.GetKeyDown(KeyCode.S) && Time.time > this.lastAttackedAt + this.cooldown || Input.GetKeyDown(KeyCode.S) && lastAttackedAt == 0f)
        {
            doPlayerAttaque();
        }
    }

    private void Death()
    {
        this.currentLife = this.currentLife - this.currentLife;
        this.isDeath = true;
        gameObject.SetActive(false);
        //Destroy(gameObject);
    }

    public float getCooldownNow()
    {
        if (Time.time <= lastAttackedAt + cooldown && lastAttackedAt != 0f)
            return (lastAttackedAt + cooldown) - Time.time;
        else
        {
            return 0f;
        }
    }

    private void BlinkPlayer(int numBlinks, float seconds)
    {
        StartCoroutine(DoBlinks(numBlinks, seconds));
    }

    private IEnumerator DoBlinks(int numBlinks, float seconds)
    {
        for (int i = 0; i < numBlinks * 2; i++)
        {
            base.spriteRenderer.enabled = !base.spriteRenderer.enabled;
            yield return new WaitForSeconds(seconds);
        }
        base.spriteRenderer.enabled = true;
    }

    public void Attack(int degat, Vector3 enemyPosition)
    {
        this.currentLife = this.currentLife - degat;
        float res = enemyPosition.x - transform.position.x;
        if (base.rigidBody.velocity.y <= 0f)
        {
            Vector2 direction = (enemyPosition - transform.position) * -1;
            base.rigidBody.AddForce(new Vector3(direction.x * 1000f, 100f, 0f));
        }
        if (res >= -0.5f && res < 0.5f)
        {
            Vector2 direction = (enemyPosition - transform.position) * -1;
            base.rigidBody.AddForce(new Vector3(direction.x * 1000f, 200f, 0f));
        }
        BlinkPlayer(blinks, time);
    }

    public void isInWater(Collision2D col)
    {
        if (col.gameObject.tag == "water")
        {
            this.isWater = true;
        }
    }
}