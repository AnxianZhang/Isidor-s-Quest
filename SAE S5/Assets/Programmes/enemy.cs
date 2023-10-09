using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class enemy : MonoBehaviour
{
    [SerializeField] private GameObject snake;
    [SerializeField] private MainCharacter mainPlayer;
    private int life = 60;
    private int degat = 5;
    private float speed = 5.0f;
    private float posX;
    private float posY;
    private Transform target;
    private bool isAttack = false;
    private bool isDeath = false;
    // Start is called before the first frame update
    void Start()
    {
        target = mainPlayer.transform;
        posX = transform.position.x;
        posY = transform.position.y;
    }

    private void moveEnemy()
    {
        Vector3 displacement = target.position - transform.position;
        displacement = displacement.normalized;
        transform.position += (displacement * speed * Time.deltaTime);
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
        mainPlayer.Attack(degat);
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
