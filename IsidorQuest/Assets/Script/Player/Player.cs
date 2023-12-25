using Assets.Script.Player;
using System;
using System.Collections;
using System.Collections.Generic;
using Unity.VisualScripting;
using UnityEngine;

public abstract class Player : PlayerMovement
{
    public static bool hasChangeSceen { get; set; }
    protected int blinks = 2;
    protected float time = 0.02f;
    protected Rigidbody2D rB;
    public int damageDeal { get; protected set; }
    public int maxLife { get; protected set; }
    public int currentLife { get; protected set; }
    public float cooldown { get; protected set; }
    public float defence { get; protected set; }

    public SkillsLvl skills { get; protected set; }

    public bool isDeath { get; protected set; }
    protected float lastAttackedAt;
    protected bool isWater;
    protected bool isHit;
    private Inventory inventory;

    protected abstract void doPlayerAttaque();

    protected new void Start()
    {
        base.Start();
        this.skills = new SkillsLvl();
        this.inventory = GameObject.FindGameObjectWithTag("Inventory").GetComponent<Inventory>();
    }

    public void upgradeMoveSpeed()
    {
        boostSpeed(1.01f, '*');
        ++this.skills.moveSpeedLvl;
    }

    public void upgradeDamageDeal()
    {
        this.damageDeal = (int)Math.Round(this.damageDeal * 1.10f);
        ++this.skills.damageDealLvl;
    }

    public void upgradeLife()
    {
        this.maxLife = (int)Math.Round(this.maxLife * 1.10f);
        this.currentLife = (int)Math.Round(this.currentLife * 1.10f);
        ++this.skills.lifeLvl;
    }

    public void upgradeDefence()
    {
        this.defence += .02f;
        ++this.skills.defenceLvl;
    }

    public bool pickUp(GameObject item){
        return inventory.AddItem(item);
    }

    public void useObject(GameObject item)
    {
        this.inventory.removeItem(item);
    }

    protected void playerActions()
    {
        base.Update();
        if ((this.isWater || this.currentLife <= 0))
        {
            Death();
        }
        if ((Input.GetKeyDown(KeyCode.S) && Time.time > this.lastAttackedAt + this.cooldown
            || Input.GetKeyDown(KeyCode.S) && lastAttackedAt == 0f)
            && !PauseMenu.getIsPaused())
        {
            doPlayerAttaque();
        }
    }

    public void revive(bool isPresentByDefault, int lifeWhenEnteringSceen)
    {
        this.currentLife = isPresentByDefault ? this.maxLife : lifeWhenEnteringSceen;
        this.isDeath = false;
        this.isWater = false;
        gameObject.SetActive(true);
        BlinkPlayer();
    }

    private void Death()
    {
        gm.playerDeathSound();
        this.currentLife = 0;
        this.isDeath = true;
        gameObject.SetActive(false);
    }

    public float getCooldownNow()
    {
        if (Time.time <= this.lastAttackedAt + this.cooldown && this.lastAttackedAt != 0f)
            return (this.lastAttackedAt + this.cooldown) - Time.time;
        else
        {
            return 0f;
        }
    }

    private void BlinkPlayer()
    {
        StartCoroutine(DoBlinks(this.blinks, this.time));
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
        float newDefence = 1 - this.defence;
        int newDegat = (int) Math.Round(degat * newDefence, 0);
        print(newDegat);
        this.currentLife -= newDegat;
        float res = enemyPosition.x - transform.position.x;
        if (!gm.playerDamageIsPlaying())
        {
            gm.playerDamageSound();
        }
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
        BlinkPlayer();
    }

    public void isInWater(Collision2D col)
    {
        if (col.gameObject.tag.Equals("water"))
        {
            this.isWater = true;
        }
    }

    public void addHealth(int hp)
    {
        currentLife += hp;
        if (currentLife > maxLife)
        {
            currentLife = maxLife;
        }
    }

    public void boostForce(float percentage, char myOperator)
    {
        if (myOperator.Equals('*'))
            this.damageDeal = (int)Math.Round(this.damageDeal * percentage);
        else
            this.damageDeal = (int)Math.Round(this.damageDeal / percentage);
    }

    public void boostSpeed(float percentage, char myOperator)
    {
        if (myOperator.Equals('*'))
            base.setMoveSpeed((float)(base.getMoveSpeed() * percentage));
        else
            base.setMoveSpeed((float)(base.getMoveSpeed() / percentage));
    }
}