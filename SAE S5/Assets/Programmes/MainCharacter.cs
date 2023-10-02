using System.Collections;
using System.Collections.Generic;
using System.Diagnostics;
using UnityEngine;

public class MainCharacter : MonoBehaviour
{
    [SerializeField] private GameObject mp;
    [SerializeField] private Animator animation;
    private Rigidbody2D rb;
    private float speed = 10.0f;
    private float jumpForce = 5.0f;    
    private int life = 100;
    private int degat = 20;
    private Vector3 jump;
    private bool isGround;
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
        print(90 / 100);
        movePlayer(directionH,directionV);
        animationPlayer();
        if (isWater)
        {
            Death();
        }
        
    }

    private void Death()
    {
        life = life - life;
        mp.SetActive(false);
    }
    private void animationPlayer()
    {
        float speed = Mathf.Abs(rb.velocity.x);
        animation.SetFloat("speed", speed);
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
        }

        if (Input.GetKey(KeyCode.UpArrow) && isLander)
        {
            print("ok");
            transform.Translate(Vector2.up * speed * Time.deltaTime, Space.World);
        }
        if (Input.GetKey(KeyCode.DownArrow) && isLander)
        {
            transform.Translate(Vector2.down * speed * Time.deltaTime, Space.World);
        }


        print(isLander + " , " +isGround);
    }

    void OnCollisionEnter2D(Collision2D col)
    {
        if (col.gameObject.tag == "ground")
        {
            print("ground ok");
            isGround = true;
        }
        if (col.gameObject.tag == "water")
        {
            print("ground ok");
            isWater = true;
        }

    }

    void OnTriggerEnter2D(Collider2D col)
    {
        if (col.CompareTag("echelle"))
        {
            print("echelle ok");
            isLander = true;
        }
        if (col.CompareTag("ground"))
        {

        }
        /*if (col.CompareTag("Ground"))
        {
            print("ground ok");
            isGround = true;
            isWalk = true;
        }*/
    }

    void OnTriggerExit2D(Collider2D col)
    {
        if (col.CompareTag("echelle"))
        {
            print("echelle nok");
            isLander = false;
        }
        /*if (col.CompareTag("Ground"))
        {
            print("ground nok");
            isGround = false;
            isWalk = false;
        }*/
    }

}
