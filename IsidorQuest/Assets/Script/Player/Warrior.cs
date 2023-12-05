using System;
using System.Collections;
using System.Collections.Generic;
using System.Runtime.InteropServices;
using UnityEngine;
using UnityEngine.SceneManagement;

public class Warrior : PlayerMovement
{
    private int blinks = 2;
    private float time = 0.02f;
    private Rigidbody2D rb;
    private int life = 100;
    private int lifeMax = 100;
    private int degat = 20;
    private bool isWater = false;
    private bool isDeath = false;
    private float cooldown = 2f;
    private float lastAttackedAt = 0f;
    // Start is called before the first frame update
    private GameObject[] enemys;
    private bool isHit = false;

    public new void Start()
    {
        base.Start();
        rb = gameObject.GetComponent<Rigidbody2D>();
        enemys = GameObject.FindGameObjectsWithTag("Enemy");
    }

    // Update is called once per frame
    public new void Update()
    {
        base.Update();
        AttackAnimation();
        if (isWater)
        {
            Death();
        }
        if (life <= 0)
        {
            Death();
        }
        if (Input.GetKeyDown(KeyCode.S) && Time.time > lastAttackedAt + cooldown || Input.GetKeyDown(KeyCode.S) && lastAttackedAt == 0f)
        {
            AttackEnemy();
        }
        else{
            isHit = false;
        }

    }

    private void AttackAnimation(){
        this.animator.SetBool("isHit", isHit);
    }
    public void AttackEnemy()
    {
        for(int i = 0; i < enemys.Length; i++){
            float res = enemys[i].transform.position.y - transform.position.y;
            float resSprite = enemys[i].transform.position.x - transform.position.x;
            bool tourner = resSprite < 0 && spriteRenderer.flipX ||  resSprite >= 0 && !spriteRenderer.flipX ? true : false; 
            if(Vector2.Distance(enemys[i].transform.position, transform.position) < 2.0f && res < 0.25f && res > -0.25f && tourner){
                enemys[i].GetComponent<Enemy>().Attack(degat, transform.position);
                lastAttackedAt = Time.time;
                isHit = true;
            }
        }
    }

    private void Death()
    {
        life = life - life;
        isDeath = true;
        gameObject.SetActive(false);
        //Destroy(gameObject);
    }

    public override bool getIsDeath()
    {
        return isDeath;
    }
    public override int getLife()
    {
        return life;
    }

    public override int getLifeMax()
    {
        return lifeMax;
    }

    public override float getCooldown(){
        return cooldown;
    }

    public override float getCooldownNow(){
        if(Time.time <= lastAttackedAt + cooldown && lastAttackedAt != 0f)
            return (lastAttackedAt + cooldown) - Time.time;
        else{
            return 0f;
        }
    }

    void BlinkPlayer(int numBlinks, float seconds)
    {
        StartCoroutine(DoBlinks(numBlinks, seconds));
    }

    IEnumerator DoBlinks(int numBlinks, float seconds)
    {
        for (int i = 0; i < numBlinks * 2; i++)
        {
            spriteRenderer.enabled = !spriteRenderer.enabled;
            yield return new WaitForSeconds(seconds);
        }
        spriteRenderer.enabled = true;
    }

    void OnCollisionEnter2D(Collision2D col)
    {
        if (col.gameObject.tag == "water")
        {
            isWater = true;
        }
    }

    public override void Attack(int degat, Vector3 enemyPosition)
    {
        life = life - degat;
        float res = enemyPosition.x - transform.position.x;
        if(this.rb.velocity.y <= 0f){
            Vector2 direction = (enemyPosition - transform.position) * -1;
            rb.AddForce(new Vector3(direction.x * 1000f, 100f, 0f));
        }
        if(res >= -0.5f && res < 0.5f){
            Vector2 direction = (enemyPosition - transform.position) * -1;
            rb.AddForce(new Vector3(direction.x * 1000f, 200f, 0f));
        }
        BlinkPlayer(blinks, time);
    }
}
