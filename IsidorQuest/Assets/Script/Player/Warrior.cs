using System;
using System.Collections;
using System.Collections.Generic;
using System.Runtime.InteropServices;
using UnityEngine;
using UnityEngine.SceneManagement;

public class Warrior : MonoBehaviour
{
    private SpriteRenderer spriteRenderer;
    private int blinks = 2;
    private float time = 0.02f;
    private Enemy enemy;
    private Rigidbody2D rb;
    private int life = 100;
    private int lifeMax = 100;
    private int degat = 20;
    private bool isWater = false;
    private bool isDeath = false;
    private bool isAttackSnake = false;
    // Start is called before the first frame update
    void Start()
    {
        rb = gameObject.GetComponent<Rigidbody2D>();
        spriteRenderer = gameObject.GetComponent<SpriteRenderer>();
    }

    // Update is called once per frame
    void Update()
    {
        if (isWater)
        {
            Death();
        }
        if (life <= 0)
        {
            Death();
        }
        if (isAttackSnake == true)
        {
            AttackSnake();
        }

    }
    public void AttackSnake()
    {
        if (Input.GetKey(KeyCode.S))
        {
            enemy.Attack(degat, transform.position);
            isAttackSnake = false;
        }
    }
    private void Death()
    {
        life = life - life;
        isDeath = true;
        Destroy(gameObject);
    }

    public bool getDeath()
    {
        return isDeath;
    }
    public int getLife()
    {
        return life;
    }

    public int getLifeMax()
    {
        return lifeMax;
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
        if (col.gameObject.tag == "Enemy")
        {
            isAttackSnake = true;
            enemy = GameObject.Find(col.gameObject.name).GetComponent<Enemy>();
        }

    }
    void OnCollisionExit2D(Collision2D col)
    {
        if (col.gameObject.tag == "Enemy")
        {
            isAttackSnake = false;
        }
    }

    public void Attack(int degat, Vector3 enemyPosition)
    {
        life = life - degat;
        float res = enemyPosition.y - transform.position.y;
        if(res > 0.30f){
            Vector2 direction = (enemyPosition - transform.position) * -1;
            rb.AddForce(new Vector3(direction.x * 100.0f, 250.0f, 0f));
        }
        BlinkPlayer(blinks, time);
    }
}
