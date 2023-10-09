using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class enemy : MonoBehaviour
{
    [SerializeField] private GameObject snake;
    [SerializeField] private MainCharacter mainPlayer;
    private Rigidbody2D rb;
    private int life = 60;
    private int degat = 5;
    private float posX;
    private float posY;
    private Transform target;
    private bool isAttack = false;
    private bool isDeath = false;
    private float speedSnake = 7.0f;
    private Vector2 velocity = Vector2.zero;
    // Start is called before the first frame update
    void Start()
    {
        rb = snake.GetComponent<Rigidbody2D>();
        target = mainPlayer.transform;
        posX = transform.position.x;
        posY = transform.position.y;
    }

    private void moveEnemy()
    {
        Vector2 displacement = target.position - transform.position;
        displacement = displacement.normalized;
        rb.velocity = Vector2.SmoothDamp(rb.velocity, displacement*speedSnake, ref velocity, 0.5f);
    }

    // Update is called once per frame
    void Update()
    {
        float res = target.position.y - transform.position.y;
        if (Vector2.Distance(target.position, transform.position) < 10.0f && res < 0.2f)
        {
            moveEnemy();
        }
        if(isAttack == true){
            print("attaquer");
            AttackPlayer();
        }
        /*if(mainPlayer.getLife() <= 0){
            print("mort");
            ReBorn();
        }*/
        if(isDeath == true){
            Death();
        }
    }

    private void Death()
    {
        life = life - life;
        snake.SetActive(false);
    }

     private void ReBorn()
    {
        life = 60;
        transform.position = new Vector3(posX, posY, 0f);
        isDeath = false;
        snake.SetActive(true);
    }

    public void AttackPlayer()
    {
        mainPlayer.Attack(degat,transform.position);
        isAttack = false;
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
}
