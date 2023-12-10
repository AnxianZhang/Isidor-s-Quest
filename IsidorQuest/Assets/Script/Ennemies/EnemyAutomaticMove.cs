using UnityEngine;

public class EnemyAutomaticMove : MonoBehaviour
{
    public float waitTime;
    public Transform[] movePos;

    private Enemy enemy;

    private System.Random random;

    private int i = 0;
    private float wait;
    private float randomTimer = 0f;

    private bool movingRight = true;

    public void Start()
    {
        this.wait = waitTime;
        this.random = new System.Random();
        this.enemy = gameObject.GetComponent<Enemy>();
    }

    public void Update()
    {
        //Debug.Log(Vector2.Distance(movePos[0].position, movePos[1].position));// >3 -> ai
        float resMove0Y = movePos[0].position.y - transform.position.y;
        float resMove1Y = movePos[1].position.y - transform.position.y;
        float resMove0X = movePos[0].position.x - transform.position.x;
        float resMove1X = movePos[1].position.x - transform.position.x;
        if (resMove0Y < -0.2f || resMove0Y > 0.3f || resMove0X < -0.1f)
        {
            movePos[0].position = new Vector3(transform.position.x + 2f, transform.position.y, transform.position.y);
        }
        if (resMove1Y < -0.2f || resMove1Y > 0.3f || resMove1X > 0.1f)
        {
            movePos[1].position = new Vector3(transform.position.x - 2f, transform.position.y, transform.position.y);
        }
        if (Vector2.Distance(movePos[0].position, movePos[1].position) > 3)
        {
            //ai
            //random bool true false //0 right 1 left

            randomTimer -= Time.deltaTime;
            if (Vector2.Distance(transform.position, movePos[0].position) > 0.1f ||
                    Vector2.Distance(transform.position, movePos[1].position) > 0.1f ||
                    Vector2.Distance(transform.position, movePos[0].position) <= 0.1f ||
                    Vector2.Distance(transform.position, movePos[1].position) <= 0.1f)
            {
                if (randomTimer <= 0f)
                {
                    int randomInt = random.Next(2);
                    movingRight = (randomInt == 1);

                    //Debug.Log("right?" + movingRight);
                    if (Vector2.Distance(transform.position, movePos[1].position) <= 0.1f) { movingRight = true; }
                    if (Vector2.Distance(transform.position, movePos[0].position) <= 0.1f) { movingRight = false; }
                    randomTimer = 1.0f;
                }

                if (movingRight)
                {
                    transform.position =
                        Vector2.MoveTowards(transform.position, movePos[0].position, this.enemy.getRunning() * Time.deltaTime);
                    //transform.eulerAngles = new Vector3(0, 0, 0);
                    this.enemy.spriteRenderer.flipX = false;
                }
                if (!movingRight)
                {
                    transform.position =
                            Vector2.MoveTowards(transform.position, movePos[1].position, this.enemy.getRunning() * Time.deltaTime);
                    //transform.eulerAngles = new Vector3(0, -180, 0);
                    this.enemy.spriteRenderer.flipX = true;
                }
                if (Vector2.Distance(transform.position, movePos[0].position) <= 0.1f || Vector2.Distance(transform.position, movePos[1].position) <= 0.1f)
                {
                    if (waitTime > 0)
                    {
                        waitTime -= Time.deltaTime;
                    }
                    waitTime = wait;
                }

            }
        }
        else
        {
            //sans ai
            // Debug.Log(Vector2.Distance(transform.position, movePos[i].position) < 0.1f);
            transform.position =
                Vector2.MoveTowards(transform.position, movePos[i].position, this.enemy.getRunning() * Time.deltaTime);

            if (Vector2.Distance(transform.position, movePos[i].position) < 0.1f)
            {
                if (waitTime > 0)
                {
                    waitTime -= Time.deltaTime;
                }
                else
                {
                    if (movingRight)
                    {
                        /* transform.eulerAngles = new Vector3(0, -180, 0);*/
                        this.enemy.spriteRenderer.flipX = true;
                        movingRight = false;
                    }
                    else
                    {
                        /*transform.eulerAngles = new Vector3(0, 0, 0);*/
                        this.enemy.spriteRenderer.flipX = false;
                        movingRight = true;
                    }

                    if (i == 0)
                    {
                        i = 1;
                    }
                    else
                    {
                        i = 0;
                    }

                    waitTime = wait;
                }
            }
        }

    }
}