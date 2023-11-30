using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Archer : PlayerMovement
{
    private int blinks = 2;
    private float time = 0.02f;
    private Rigidbody2D rb;
    [SerializeField] private int life;
    [SerializeField] private int lifeMax;
    [SerializeField] private int degat;
    private bool isWater = false;
    private bool isDeath = false;
    [SerializeField] private float cooldown;
    private float lastAttackedAt = 0f;
    // Start is called before the first frame update
    private bool isHit = false;
    // Start is called before the first frame update
    public new void Start()
    {
        base.Start();
        rb = gameObject.GetComponent<Rigidbody2D>();
    }

    // Update is called once per frame
    public new void Update()
    {
        base.Update();
        if (isWater)
        {
            Death();
        }
        if (life <= 0)
        {
            Death();
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
    public override void Attack(int degat, Vector3 enemyPosition){

    } 
    void OnCollisionEnter2D(Collision2D col)
    {
        if (col.gameObject.tag == "water")
        {
            isWater = true;
        }
    }
}
