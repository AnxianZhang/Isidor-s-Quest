using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class EnemySnake : enemy
{
    private Rigidbody2D rb;
    private Animator animation;
    [SerializeField] private Transform target;
    private float speedSnake = 7.0f;
    private Vector2 velocity = Vector2.zero;
    // Start is called before the first frame update
    public new void Start()
    {
        base.Start();
        animation = gameObject.GetComponent<Animator>();
        rb = gameObject.GetComponent<Rigidbody2D>();

    }

    private void moveEnemy()
    {
        Vector2 displacement = target.position - transform.position;
        displacement = displacement.normalized;
        rb.velocity = Vector2.SmoothDamp(rb.velocity, displacement * speedSnake, ref velocity, 0.5f);
    }

    // Update is called once per frame
    public new void Update()
    {
        base.Update();
        animationSnake();
        float res = target.position.y - transform.position.y;
        if (Vector2.Distance(target.position, transform.position) < 10.0f && res < 0.2f)
        {
            moveEnemy();
        }
    }

    private void animationSnake()
    {
        flip(rb.velocity.x);
        float speed = Mathf.Abs(rb.velocity.x);
        animation.SetFloat("speed", speed);
    }
    private void flip(float _velocity)
    {
        if (_velocity > 0.1f)
        {
            spriteRenderer.flipX = false;
        }
        else if (_velocity < -0.1f)
        {
            spriteRenderer.flipX = true;
        }
    }

/*public float speed;
public float waitTime;
public Transform[] movePos;

private int i=0;
private bool movingRight = true;
private float wait;
private System.Random random;
private float randomTimer = 0f;
// Start is called before the first frame update
public new void Start()
{
    base.Start();
    wait = waitTime;
    random = new System.Random();
}

// Update is called once per frame
public new void Update()
{
    base.Update();
    //Debug.Log(Vector2.Distance(movePos[0].position, movePos[1].position));// >3 -> ai
    
    if(Vector2.Distance(movePos[0].position, movePos[1].position) > 3){
        //ai
        //random bool true false //0 right 1 left
        
        randomTimer -= Time.deltaTime;
        if (Vector2.Distance(transform.position, movePos[0].position) > 0.1f || 
                Vector2.Distance(transform.position, movePos[1].position) > 0.1f || 
                Vector2.Distance(transform.position, movePos[0].position) <= 0.1f||
                Vector2.Distance(transform.position, movePos[1].position) <= 0.1f){
            if (randomTimer <= 0f){
                int randomInt = random.Next(2);
                movingRight = (randomInt == 1);

                Debug.Log("right?"+movingRight);
                if(Vector2.Distance(transform.position, movePos[1].position) <= 0.1f){movingRight=true;}
                if(Vector2.Distance(transform.position, movePos[0].position) <= 0.1f){movingRight=false;}
                randomTimer = 1.0f;
            }

            if(movingRight){
                transform.position = 
                    Vector2.MoveTowards(transform.position, movePos[0].position, speed * Time.deltaTime);
                transform.eulerAngles = new Vector3(0,0,0);
            }if(!movingRight){
                transform.position = 
                        Vector2.MoveTowards(transform.position, movePos[1].position, speed * Time.deltaTime);
                transform.eulerAngles = new Vector3(0,-180,0);
            }
            if (Vector2.Distance(transform.position, movePos[0].position) <= 0.1f || Vector2.Distance(transform.position, movePos[1].position) <= 0.1f){
                if (waitTime > 0){
                    waitTime -= Time.deltaTime;
                }
                waitTime = wait;
            }

        }
    }
    else{
        //sans ai
        // Debug.Log(Vector2.Distance(transform.position, movePos[i].position) < 0.1f);
        transform.position = 
            Vector2.MoveTowards(transform.position, movePos[i].position, speed * Time.deltaTime);

        if (Vector2.Distance(transform.position, movePos[i].position) < 0.1f){
            if (waitTime > 0){
                waitTime -= Time.deltaTime;
            }else{
                if(movingRight){
                    transform.eulerAngles = new Vector3(0,-180,0);
                    movingRight = false;
                }else{
                    transform.eulerAngles = new Vector3(0,0,0);
                    movingRight = true;
                }

                if(i==0){
                    i=1;
                }else{
                    i=0;
                }

                waitTime = wait;
            }
        }
    }
   
}*/
}
