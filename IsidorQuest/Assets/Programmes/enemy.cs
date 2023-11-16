using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public abstract class enemy : MonoBehaviour
{
    [SerializeField] private MainCharacter mainPlayer;
    public SpriteRenderer spriteRenderer;
    private Rigidbody2D rb;
    [SerializeField] private int life;
    private float cooldown = 2f; 
    private float lastAttackedAt = 0f;
    private int lifeMax;
    [SerializeField] private int degat;
    private Transform target;
    private bool isAttack = false;
    [SerializeField] private float flashTime;
    private bool isDeath = false;
    private Color originalColor;
    // Start is called before the first frame update
    public void Start()
    {
        rb = gameObject.GetComponent<Rigidbody2D>();
        spriteRenderer = gameObject.GetComponent<SpriteRenderer>();
        target = mainPlayer.transform;
        originalColor = spriteRenderer.color;
        this.lifeMax = life;
    }

    // Update is called once per frame
    public void Update()
    {
        if(isAttack == true){
            if(Time.time > lastAttackedAt + cooldown){
                AttackPlayer();
            }
        }
        if(life <= 0 ||isDeath){
            Death();
        }
    }

    private void FlashColor(float time){
     spriteRenderer.color = Color.red;
     Invoke("ResetColor",time);
 }
 
    private void ResetColor(){
         spriteRenderer.color = originalColor;
    }

    private void Death()
    {
        life = life - life;
        gameObject.SetActive(false);
        isDeath = true;
    }

    public void AttackPlayer()
    {
        mainPlayer.Attack(degat,transform.position);
        isAttack = false;   
        lastAttackedAt = Time.time;
    }
    void OnCollisionEnter2D(Collision2D col)
    {
        if (col.gameObject.tag == "Player")
        {
            isAttack = true;
        }
        if (col.gameObject.tag == "water")
        {
            isDeath = true;
        }
        

    }

    void OnCollisionExit2D(Collision2D col)
    {
        if (col.gameObject.tag == "Player")
        {
            isAttack = false;
        }

    }

    public void Attack(int degat, Vector3 playerPosition)
    {
        life = life - degat;
        Vector2 direction = (playerPosition - transform.position) * -1;
        rb.AddForce(new Vector3(direction.x * 200.0f,100.0f,0f));
        FlashColor(flashTime);
    }
    public int getLife(){
        return life;
    }

    public int getLifeMax(){
        return lifeMax;
    }
}
