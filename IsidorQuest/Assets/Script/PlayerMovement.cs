
using UnityEngine;

public class PlayerMovement : MonoBehaviour
{
    private const float GROUND_CHECK_RADIUS = .5f;

    [Header("Move parameters")]
    [SerializeField] private float moveSpeed;
    [SerializeField] private float jumpForce;

    [Header("Player states")]
    [SerializeField] private bool isJumping;
    [SerializeField] private bool isOnGround;
    [Tooltip("Used for the groundCheck, ignore player rigid body component")]
    [Space(10)]
    [SerializeField] private LayerMask ignoreLayer;
    [SerializeField] private Transform groundCheck;

    private Rigidbody2D rigidBody;

    private Animator animator;
    private SpriteRenderer spriteRenderer;

    private float hMovement;

    void Start()
    {
        this.spriteRenderer = gameObject.GetComponent<SpriteRenderer>();
        this.rigidBody = gameObject.GetComponent<Rigidbody2D>();
        this.animator = gameObject.GetComponent<Animator>();
    }

    private void Update()
    {
        this.hMovement = Input.GetAxis("Horizontal") * moveSpeed;

        //Inputs are always ine uptade function
        if ((Input.GetKeyDown(KeyCode.UpArrow) || Input.GetKeyDown(KeyCode.W)) && isOnGround)
        {
            this.isJumping = true;
        }

        flip();

        this.animator.SetFloat("Speed", Mathf.Abs(this.rigidBody.velocity.x));
    }

    /*
     * Call every 0.02s, usually used for physics calculations
     */
    private void FixedUpdate()
    {
        // create a circle on the groundCheck position, with a radius
        this.isOnGround = Physics2D.OverlapCircle(this.groundCheck.position, GROUND_CHECK_RADIUS, ignoreLayer);

        movePlayer();
    }


    private void movePlayer()
    {
        if (this.isJumping && this.isOnGround)
        {
            this.rigidBody.AddForce(new Vector2(0f, this.jumpForce));
            this.isJumping = false;
        }

        this.rigidBody.velocity = new Vector2(this.hMovement, this.rigidBody.velocity.y); // move a player in a new position
    }

    private void flip()
    {
        if (this.rigidBody.velocity.x < -.25f)
            this.spriteRenderer.flipX = true;
        else if (this.rigidBody.velocity.x > .25f)
            this.spriteRenderer.flipX = false;
    }

    private void OnDrawGizmos()
    {
        Gizmos.color = Color.cyan;
        Gizmos.DrawWireSphere(this.groundCheck.position, GROUND_CHECK_RADIUS);
    }
}