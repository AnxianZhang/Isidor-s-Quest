using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class enemy : MonoBehaviour
{
    [SerializeField] private GameObject snake;
    [SerializeField] private Animator animation;
    [SerializeField] private MainCharacter mainPlayer;
    [SerializeField] private SpriteRenderer spriteRenderer;
    private Rigidbody2D rb;
    private int life = 60;
    private float cooldown = 2f; //seconds
    private float lastAttackedAt = 0f;
    private int lifeMax = 60;
    private int degat = 5;
    private float posX;
    private float posY;
    private Transform target;
    private bool isAttack = false;
    private bool isDeath = false;
    private float speedSnake = 7.0f;


    private Vector2 velocity = Vector2.zero;
    // Start is called before the first frame update
    void Start()
    {
        rb = snake.GetComponent<Rigidbody2D>();
        target = mainPlayer.transform;
        posX = transform.position.x;
        posY = transform.position.y;
    }

    private void moveEnemy()
    {
        Vector2 displacement = target.position - transform.position;
        displacement = displacement.normalized;
        rb.velocity = Vector2.SmoothDamp(rb.velocity, displacement*speedSnake, ref velocity, 0.5f);
    }

    // Update is called once per frame
    void Update()
    {
        animationSnake();
        float res = target.position.y - transform.position.y;
        if (Vector2.Distance(target.position, transform.position) < 10.0f && res < 0.2f)
        {
            moveEnemy();
        }
        if(isAttack == true){
            if(Time.time > lastAttackedAt + cooldown){
                AttackPlayer();
            }
        }
        if(life <= 0 ||isDeath){
            Death();
        }
    }

    private void animationSnake()
    {
        flip(rb.velocity.x);
        float speed = Mathf.Abs(rb.velocity.x);
        animation.SetFloat("speed", speed);
    }
    private void flip(float _velocity){
        if(_velocity > 0.1f){
            spriteRenderer.flipX = false;
        }
        else if(_velocity < -0.1f){
            spriteRenderer.flipX = true;
        }
    }

    private void Death()
    {
        life = life - life;
        snake.SetActive(false);
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
    }
    public int getLife(){
        return life;
    }

    public int getLifeMax(){
        return lifeMax;
    }
}
