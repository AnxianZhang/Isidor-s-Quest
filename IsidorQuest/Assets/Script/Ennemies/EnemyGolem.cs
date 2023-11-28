using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class EnemyGolem : Enemy
{
    private const float GROUND_CHECK_RADIUS = .4f;
    [SerializeField] private LayerMask ignoreLayer;
    [SerializeField] private Transform groundCheck;
    private CircleCollider2D ennemyCollider;
    private bool isLadder = false;
    private bool isOnGround;
    [SerializeField] private float speedGolem;
    private Vector2 velocity = Vector2.zero;
    private EnemySnakeMoveAutomatic enGolemMove;
    // Start is called before the first frame update
    public new void Start()
    {
        base.Start();
        enGolemMove = gameObject.GetComponent<EnemySnakeMoveAutomatic>();
        this.ennemyCollider= GetComponent<CircleCollider2D>();
    }

    private void moveEnemy()
    {
        Vector2 displacement = target.position - transform.position;
        displacement = displacement.normalized;
        rb.velocity = Vector2.SmoothDamp(rb.velocity, displacement * speedGolem, ref velocity, 0.5f);
    }

    private void FixedUpdate()
    {
        CheckLadder();
        // create a circle on the groundCheck position, with a radius
        if(this.isLadder == true){
            this.isOnGround = true;
        }
        else{
            this.isOnGround = Physics2D.OverlapCircle(this.groundCheck.position, GROUND_CHECK_RADIUS, ignoreLayer);
        }
    }

     private void OnDrawGizmos()
    {
        Gizmos.color = Color.cyan;
        Gizmos.DrawWireSphere(this.groundCheck.position, GROUND_CHECK_RADIUS);
    }

    // Update is called once per frame
    public new void Update()
    {
        base.Update();
        float res = target.position.y - transform.position.y;
        if (Vector2.Distance(target.position, transform.position) < 10.0f && res <= 2f && res >= -1f && this.isOnGround)
        {
            enGolemMove.enabled = false;
            animationGolem();
            moveEnemy();
        }
        else if(this.isOnGround){
           if(this.rb.velocity.y != 0f){
                animator.SetFloat("speed", 0.51f);
           }
           else{
                animator.SetFloat("speed", 0.49f);
           }
            enGolemMove.enabled = true;
        }
        else if(!this.isOnGround){
            enGolemMove.enabled = false;
        }
       
       
    }

    private void CheckLadder(){
        isLadder=Physics2D.IsTouchingLayers(ennemyCollider, LayerMask.GetMask("Ladder"));
    }

    private void animationGolem()
    {
        flip(rb.velocity.x);
        float speed = Mathf.Abs(rb.velocity.x);
        animator.SetFloat("speed", speed);
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
