using System.Collections;
using System.Collections.Generic;
using System.Diagnostics;
using UnityEngine;

public class MainCharacter : MonoBehaviour
{
    [SerializeField] private GameObject mp;
    [SerializeField] private Animator animation;
    [SerializeField] private SpriteRenderer spriteRenderer;
    private Rigidbody2D rb;
    private float speed = 10.0f;
    private float jumpForce = 5.0f;    
    private int life = 100;
    private int degat = 20;
    private Vector3 jump;
    private bool isGround;
    private bool isJump = false;
    private bool isWater = false;
    private bool isLander = false;
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
        if(life <= 0)
        {
            mp.SetActive(false);
            resuscitate();
        }

    }
    private void Death()
    {
        life = life - life;
        print(life);
        mp.SetActive(false);
    }
    private void animationPlayer()
    {
        flip(rb.velocity.x);
        float speed = Mathf.Abs(rb.velocity.x);
        animation.SetFloat("speed", speed);
        animation.SetBool("isLander", isLander);
        animation.SetBool("isJump", isJump);
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
        life = 100;
        transform.position = new Vector3(-2.63765f, -0.75f, 0f);
        isWater = false;
        mp.SetActive(true);
    }

    public int getLife()
    {
        return life;
    }
    private void movePlayer(float directionH, float directionV)
    {
        if (directionH != 0)
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
        if (col.gameObject.tag == "water")
        {
            isWater = true;
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
        Vector2 direction = (enemyPosition - transform.position) * -1;
        rb.AddForce(new Vector3(direction.x * 100.0f,250.0f,0f));
    }

}
