using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public abstract class Enemy : MonoBehaviour
{
    private const float GROUND_CHECK_RADIUS = .4f;

    public GameObject dropCoin;
    public SpriteRenderer spriteRenderer { get; set;  }

    [SerializeField] private float flashTime;
    [SerializeField] private int degat;
    [SerializeField] private int life;
    [SerializeField] private LayerMask ignoreLayer;
    [SerializeField] private Transform groundCheck;

    private bool isLadder;
    private bool isOnGround;
    private Vector2 velocity = Vector2.zero;

    protected CircleCollider2D ennemyCollider;
    protected EnemyAutomaticMove enemyMove;
    protected Rigidbody2D rb;
    protected Transform target;
    protected Animator animator;
    protected float walkingSpeed;
    protected float runningSpeed;

    private Player mainPlayer;
    private Color originalColor;
    private int lifeMax;
    private float cooldown = 2f;
    private float lastAttackedAt = 0f;
    protected GameSound gm;
    private bool isAttack;
    private bool isDeath;
    private bool isHit;

    protected abstract void doEnnemyOnGroundAction();

    public void Start()
    {
        this.mainPlayer = GameObject.FindWithTag("Player").GetComponent<Player>(); // get the specific, class witch extends Plqyer
        this.rb = gameObject.GetComponent<Rigidbody2D>();
        this.animator = gameObject.GetComponent<Animator>();
        this.spriteRenderer = gameObject.GetComponent<SpriteRenderer>();
        this.target = mainPlayer.GetComponent<Transform>();
        this.originalColor = spriteRenderer.color;
        this.lifeMax = life;
        this.enemyMove = gameObject.GetComponent<EnemyAutomaticMove>();
        this.ennemyCollider = GetComponent<CircleCollider2D>();
        this.gm = GameObject.FindWithTag("SoundManager").GetComponent<GameSound>();

    }

    public void Update()
    {
        if (isAttack == true)
        {
            if (Time.time > lastAttackedAt + cooldown)
            {
                isHit = true;
                AttackPlayer();
            }
            else{
                isHit = false;
            }
        }
        else{
            isHit = false;
        }
        if (life <= 0 || isDeath)
        {
            Instantiate(dropCoin,transform.position,Quaternion.identity);
            Death();
        }

        float res = target.position.y - transform.position.y;
        if (Vector2.Distance(target.position, transform.position) < 10.0f && res <= 2f && res >= -1f && this.isOnGround)
        {
            this.enemyMove.enabled = false;
            ennemyAnimation();
            this.moveEnemy();
        }

        if (this.isOnGround)
        {
            doEnnemyOnGroundAction();
            this.enemyMove.enabled = true;
        }
        else
        {
            this.enemyMove.enabled = false;
        }
    }

    private void ennemyAnimation()
    {
        flip(rb.velocity.x);
        float _speed = Mathf.Abs(rb.velocity.x);
        animator.SetFloat("speed", _speed);
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

    protected void FixedUpdate()
    {
        CheckLadder();
        // create a circle on the groundCheck position, with a radius
        if (this.isLadder == true)
        {
            this.isOnGround = true;
        }
        else
        {
            this.isOnGround = Physics2D.OverlapCircle(this.groundCheck.position, GROUND_CHECK_RADIUS, ignoreLayer);
        }
    }

    private void CheckLadder()
    {
        isLadder = Physics2D.IsTouchingLayers(ennemyCollider, LayerMask.GetMask("Ladder"));
    }

    private void OnDrawGizmos()
    {
        Gizmos.color = Color.cyan;
        Gizmos.DrawWireSphere(this.groundCheck.position, GROUND_CHECK_RADIUS);
    }

    protected void moveEnemy()
    {
        Vector2 movement = target.position - transform.position;
        movement = movement.normalized;
        rb.velocity = Vector2.SmoothDamp(rb.velocity, movement * walkingSpeed, ref velocity, 0.5f);
    }

    private void FlashColor(float time)
    {
        spriteRenderer.color = Color.red;
        Invoke("ResetColor", time);
    }

    private void ResetColor()
    {
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
        mainPlayer.Attack(degat, transform.position);
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
        life -= degat;
        if(playerPosition.x - transform.position.x <= 2.0f && playerPosition.x - transform.position.x >= -2.0f){
            Vector2 direction = (playerPosition - transform.position) * -1;
            rb.AddForce(new Vector3(direction.x * 200.0f, 100.0f, 0f));
        }
        else{
            Vector2 direction = (playerPosition - transform.position) * -1;
            rb.AddForce(new Vector3(direction.x * 20.0f, 100.0f, 0f));
        }
        FlashColor(flashTime);
    }

    public int getLife()
    {
        return life;
    }

    public int getLifeMax()
    {
        return lifeMax;
    }

    public float getRunning()
    {
        return this.runningSpeed;
    }
}
