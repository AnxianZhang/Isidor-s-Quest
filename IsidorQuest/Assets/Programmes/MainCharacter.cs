using System.Collections;
using System.Collections.Generic;
using System.Diagnostics;
using UnityEngine;
using UnityEngine.SceneManagement;
public class MainCharacter : MonoBehaviour
{
    [SerializeField] private GameObject mp;
    [SerializeField] private Animator animation;
    [SerializeField] private SpriteRenderer spriteRenderer;
    private enemy enemy;
    private Rigidbody2D rb;
    private float speed = 10.0f;
    private float jumpForce = 5.0f;    
    private int life = 100;
    private int lifeMax = 100;
    private int degat = 20;
    private Vector3 jump;
    private bool isGround;
    private bool isJump = false;
    private bool isWater = false;
    private bool isLander = false;
    private bool isDeath = false;
    private bool isAttackSnake = false;
    private Vector2 velocity = Vector2.zero;
    //private bool isWalk = false;
    // Start is called before the first frame update
    void Start()
    {
        rb = mp.GetComponent<Rigidbody2D>();
        jump = new Vector3(0.0f, 2.0f, 0.0f);
    }

    // Update is called once per frame
    void Update()
    {
        float directionH = Input.GetAxisRaw("Horizontal");
        float directionV = Input.GetAxisRaw("Vertical");
        movePlayer(directionH,directionV);
        animationPlayer();
        if (isWater)
        {
            Death();
        }
        print(isAttackSnake);
        if(life <= 0)
        {
            Death();
            if(Input.GetKey(KeyCode.R)){
                resuscitate();
            }
        }
        if(isAttackSnake == true){
            AttackSnake();
        }

    }
    public void AttackSnake()
    {
        if(Input.GetKey(KeyCode.S)){
            enemy.Attack(degat, transform.position);
            isAttackSnake = false;
        }
    }
    private void Death()
    {
        rb.bodyType = RigidbodyType2D.Static;
        life = life - life;
        isDeath = true;
    }

    public bool getDeath(){
        return isDeath;
    }
    private void animationPlayer()
    {
        flip(rb.velocity.x);
        if(isGround){
            float speed = Mathf.Abs(rb.velocity.x);
            animation.SetFloat("speed", speed);
        }
        else{
            animation.SetFloat("speed", 0.0f);
        }
        if (Input.GetKey(KeyCode.UpArrow) && isLander || Input.GetKey(KeyCode.DownArrow) && isLander)
        {
            animation.SetBool("isLander", true);
        }
        else
        {
            animation.SetBool("isLander", false);
        }
        animation.SetBool("isJump", isJump);
        animation.SetBool("isDeath", isDeath);
    }
    private void flip(float _velocity){
        if(_velocity > 0.1f){
            spriteRenderer.flipX = false;
        }
        else if(_velocity < -0.1f){
            spriteRenderer.flipX = true;
        }
    }
    private void resuscitate()
    {
        SceneManager.LoadScene(SceneManager.GetActiveScene().name);
    }

    public int getLife()
    {
        return life;
    }

     public int getLifeMax()
    {
        return lifeMax;
    }
    private void movePlayer(float directionH, float directionV)
    {
        if (directionH != 0 && !isJump && isGround)
        {
            Vector2 targetVelocity = new Vector2(directionH * speed, 0f);
            rb.velocity = Vector2.SmoothDamp(rb.velocity, targetVelocity, ref velocity, 0.5f);
        }
        if (Input.GetKeyDown(KeyCode.Space) && isGround)
        {
            rb.AddForce(jump * jumpForce, UnityEngine.ForceMode2D.Impulse);
            isGround = false;
            isJump = true;
        }
        else
        {
            isJump = false;
        }
        if (Input.GetKey(KeyCode.UpArrow) && isLander)
        {
            transform.Translate(Vector2.up * speed * Time.deltaTime, Space.World);
        }
        if (Input.GetKey(KeyCode.DownArrow) && isLander)
        {
            transform.Translate(Vector2.down * speed * Time.deltaTime, Space.World);
        }
    }

    void OnCollisionEnter2D(Collision2D col)
    {
        if (col.gameObject.tag == "ground")
        {
            isGround = true;
        }
        if (col.gameObject.tag != "ground")
        {
            isGround = false;
        }
        if (col.gameObject.tag == "water")
        {
            isWater = true;
        }
         if (col.gameObject.tag == "enemy")
        {
            isAttackSnake = true;
            enemy = GameObject.Find(col.gameObject.name).GetComponent<enemy>();
        }

    }
    void OnCollisionExit2D(Collision2D col)
    {
        if (col.gameObject.tag == "enemy")
        {
            isAttackSnake = false;
            isGround = true;
        }
    }
    
    void OnTriggerEnter2D(Collider2D col)
    {
        if (col.CompareTag("echelle"))
        {
            isLander = true;
        }
    }

    void OnTriggerExit2D(Collider2D col)
    {
        if (col.CompareTag("echelle"))
        {
            isLander = false;
        }
    }

    public void Attack(int degat, Vector3 enemyPosition)
    {
        life = life - degat;
        if(!isJump){
            Vector2 direction = (enemyPosition - transform.position) * -1;
            rb.AddForce(new Vector3(direction.x * 100.0f,250.0f,0f));
        }
        isGround = false;
    }

}
