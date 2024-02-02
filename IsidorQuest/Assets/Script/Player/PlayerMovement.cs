
using UnityEngine;
using UnityEngine.SceneManagement;

public abstract class PlayerMovement : MonoBehaviour
{
    private const float GROUND_CHECK_RADIUS = .5f;

    [Header("Move parameters")]
    [SerializeField] private float moveSpeed;
    [SerializeField] private float jumpForce;
    [SerializeField] private float climbSpeed;

    [Tooltip("Used for the groundCheck, ignore player rigid body component")]
    [Space(10)]
    [SerializeField] private LayerMask ignoreLayer;
    [SerializeField] private Transform groundCheck;

    [Header("Player states")]

    private bool isJumping;
    private bool isOnGround;
    private bool isLadder;
    private bool climbing;
    private bool isClimbing;
    private bool isUnmoveble;


    protected Rigidbody2D rigidBody { get; set; }
    private CapsuleCollider2D playerCollider;

    protected Animator animator;
    protected SpriteRenderer spriteRenderer;
    private float hMovement;
    private float vMovement;
    protected GameSound gm;
    private float originalGravityScale;

    private WebSocketWorker webSocketWorker;

    public void Start()
    {
        this.webSocketWorker = new WebSocketWorker();

        this.spriteRenderer = gameObject.GetComponent<SpriteRenderer>();
        this.rigidBody = gameObject.GetComponent<Rigidbody2D>();
        this.animator = gameObject.GetComponent<Animator>();
        this.playerCollider = GetComponent<CapsuleCollider2D>();
        this.originalGravityScale = this.rigidBody.gravityScale;
        this.gm = GameObject.FindWithTag("SoundManager").GetComponent<GameSound>();
    }

    public void Update()
    {
        float [] playerCurrentPosition = new float[] { transform.position.x, transform.position.y };
        Position p = new ("", gameObject.name, playerCurrentPosition, SceneManager.GetActiveScene().name);
        this.webSocketWorker.sendPosition(JsonUtility.ToJson(p));

        this.hMovement = Input.GetAxis("Horizontal") * moveSpeed;

        this.vMovement = 0f;
        if (this.isClimbing)
            this.vMovement = Input.GetAxis("Vertical") * moveSpeed;

        //Inputs are always ine uptade function
        if (Input.GetKeyDown(KeyCode.UpArrow) && isOnGround && !PauseMenu.getIsPaused())
        {
            this.isJumping = true;
        }

        flip();

        this.animator.SetFloat("Speed", Mathf.Abs(this.rigidBody.velocity.x));
        CheckLadder();
        Climb();
        CheckStatus();
    }

    protected void FixedUpdate()
    {
        // create a circle on the groundCheck position, with a radius
        this.isOnGround = Physics2D.OverlapCircle(this.groundCheck.position, GROUND_CHECK_RADIUS, ignoreLayer);

        movePlayer();
    }


    private void movePlayer()
    {
        if (!this.isClimbing)
        {
            if (this.isJumping && this.isOnGround)
            {
                gm.playerJumpSound();
                this.rigidBody.AddForce(new Vector2(0f, this.jumpForce));
                this.isJumping = false;
            }
            if(!gm.isPlayerWalkSoundIsPlaying() && this.rigidBody.velocity.x != 0 && this.isOnGround){
                gm.PlayerWalkSound();
            }
            this.rigidBody.velocity = new Vector2(this.hMovement, this.rigidBody.velocity.y); // move a player in a new position
        }
        else
        {
            this.isJumping = false;
            this.rigidBody.velocity = new Vector2(this.hMovement, this.vMovement);
        }
    }

    private void flip()
    {
        if (this.rigidBody.velocity.x < -.25f)
            this.spriteRenderer.flipX = true;
        else if (this.rigidBody.velocity.x > .25f)
            this.spriteRenderer.flipX = false;
    }

    public void setIsClimbing(bool isClimbing)
    {
        this.isClimbing = isClimbing;
    }

    protected void OnDrawGizmos()
    {
        Gizmos.color = Color.cyan;
        Gizmos.DrawWireSphere(this.groundCheck.position, GROUND_CHECK_RADIUS);
    }

    private void CheckLadder()
    {
        isLadder = Physics2D.IsTouchingLayers(playerCollider, LayerMask.GetMask("Ladder"));
    }

    void Climb()
    {
        if (isLadder)
        {
            float moveY = Input.GetAxis("Vertical");
            if (moveY > 0.5f || moveY < -0.5f)
            {
                animator.SetBool("isLander", true);
                rigidBody.gravityScale = originalGravityScale;
                rigidBody.velocity = new Vector2(rigidBody.velocity.x, moveY * climbSpeed);
            }
            else
            {
                animator.SetBool("isLander", false);
                rigidBody.gravityScale = 0.0f;
                rigidBody.velocity = new Vector2(rigidBody.velocity.x, 0.0f);
            }
        }
        else
        {
            animator.SetBool("isLander", false);
            rigidBody.gravityScale = originalGravityScale;
        }
    }

    public float getMoveSpeed()
    {
        return this.moveSpeed;
    }

    protected void setMoveSpeed(float value)
    {
        this.moveSpeed = value;
    }

    public void jumpBoost(float amount, char myOperator)
    {
        if (myOperator.Equals('*'))
            this.jumpForce *= amount;
        else
            this.jumpForce /= amount;
    }

    void CheckStatus()
    {
        climbing = animator.GetBool("isLander");
    }
}