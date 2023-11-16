
using UnityEngine;

public class PlayerMovement : MonoBehaviour
{
    private const float GROUND_CHECK_RADIUS = .5f;
    private Animator animation;
    private SpriteRenderer spriteRenderer;
    private Rigidbody2D rb;
    [SerializeField]  private float speed;
    [SerializeField]  private float jumpForce;
    private Vector3 jump;
    [SerializeField] private LayerMask ignoreLayer;
    [SerializeField] private bool isGround;
    [SerializeField] private bool isJump = false;
    private bool isLander = false;
    private bool isDeath = false;
    private bool isAttackSnake = false;
    private bool isLanderUp = false;
    private bool isLanderDown = false;
    [SerializeField] private Transform GroundCheck;
    private Vector2 velocity = Vector2.zero;

    // Start is called before the first frame update
    void Start()
    {
        animation = gameObject.GetComponent<Animator>();
        rb = gameObject.GetComponent<Rigidbody2D>();
        spriteRenderer = gameObject.GetComponent<SpriteRenderer>();
        jump = new Vector3(0.0f, 2.0f, 0.0f);
    }

    // Update is called once per frame
    void Update()
    {
        float directionH = Input.GetAxisRaw("Horizontal");
        float directionV = Input.GetAxisRaw("Vertical");
        movePlayer(directionH, directionV);
        animationPlayer();
        if (Input.GetKeyDown(KeyCode.Space) && isGround)
        {
            isJump = true;
        }
        if (Input.GetKey(KeyCode.UpArrow) && isLander)
        {
            isLanderUp = true;
        }
        else
        {
            isLanderUp = false;
        }
        if (Input.GetKey(KeyCode.DownArrow) && isLander)
        {
            isLanderDown = true;
        }
        else
        {
            isLanderDown = false;
        }
    }

    private void FixedUpdate()
    {
        // create a circle on the groundCheck position, with a radius
        this.isGround = Physics2D.OverlapCircle(this.GroundCheck.position, GROUND_CHECK_RADIUS, ignoreLayer);
    }
    private void animationPlayer()
    {
        flip(rb.velocity.x);
        if (isGround)
        {
            float speed = Mathf.Abs(rb.velocity.x);
            animation.SetFloat("Speed", speed);
        }
        else
        {
            animation.SetFloat("Speed", 0.0f);
        }
        if (isLanderUp || isLanderDown)
        {
            animation.SetBool("isLander", true);
        }
        else
        {
            animation.SetBool("isLander", false);
        }
        animation.SetBool("isJump", isJump);
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

    private void movePlayer(float directionH, float directionV)
    {
        this.rb.velocity = new Vector2(directionH * speed, this.rb.velocity.y); // move a player in a new position
        if (isJump && isGround)
        {
            rb.AddForce(jump * jumpForce, UnityEngine.ForceMode2D.Impulse);
            isJump = false;
        }
        if (isLanderUp)
        {
            transform.Translate(Vector2.up * 25.0f * Time.deltaTime, Space.World);
        }
        if (isLanderDown)
        {
            transform.Translate(Vector2.down * 25.0f * Time.deltaTime, Space.World);
        }
    }

    void OnCollisionEnter2D(Collision2D col)
    {
        if (col.gameObject.tag == "Enemy")
        {
            isAttackSnake = true;
        }

    }

    void OnCollisionExit2D(Collision2D col)
    {
        if (col.gameObject.tag == "Enemy")
        {
            isAttackSnake = false;
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
            isLanderDown = false;
            isLanderUp = false;
        }
    }

    private void OnDrawGizmos()
    {
        Gizmos.color = Color.cyan;
        Gizmos.DrawWireSphere(this.GroundCheck.position, GROUND_CHECK_RADIUS);
    }
}