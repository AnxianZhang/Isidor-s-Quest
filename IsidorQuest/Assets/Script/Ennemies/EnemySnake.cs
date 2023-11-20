using System.Collections;
using System.Collections.Generic;
using System.Runtime.InteropServices;
using UnityEngine;

public class EnemySnake : Enemy
{
    private Rigidbody2D rb;
    private Animator animation;
    [SerializeField] private Transform target;
    private float speedSnake = 3.0f;
    private Vector2 velocity = Vector2.zero;
    private EnemySnakeMoveAutomatic enSnakeMove;
    // Start is called before the first frame update
    private bool enter = false;
    public new void Start()
    {
        base.Start();
        animation = gameObject.GetComponent<Animator>();
        rb = gameObject.GetComponent<Rigidbody2D>();
        enSnakeMove = gameObject.GetComponent<EnemySnakeMoveAutomatic>();
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
        float res = target.position.y - transform.position.y;
        if (Vector2.Distance(target.position, transform.position) < 10.0f && res < 0.2f)
        {
            enSnakeMove.enabled = false;
            if(!enter){
                this.spriteRenderer.flipX = true;
                enter = true;
            }
            animationSnake();
            moveEnemy();
        }
        else
        {
            rb.velocity = Vector2.zero;
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
}
