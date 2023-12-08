using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class ProjecfileShot : MonoBehaviour
{
    private SpriteRenderer spriteRenderer;
    private PlayerMovement mainPlayer;
    private Animator animationAttack;
    [SerializeField] private float Speed;
    void Start()
    {
        this.mainPlayer = GameObject.Find("Player") ? GameObject.FindWithTag("Player").GetComponent<Warrior>() : GameObject.FindWithTag("Player").GetComponent<Archer>();
        this.spriteRenderer = gameObject.GetComponent<SpriteRenderer>();
        this.animationAttack = gameObject.GetComponent<Animator>();
    }

    // Update is called once per frame
    void Update()
    {
        animationProjectile();
        moveProjectile();
    }

    private void moveProjectile(){
        if(transform.position.z == 1.0f){
            transform.position += -transform.right  * Time.deltaTime * Speed;
        }
        else{
            transform.position += transform.right  * Time.deltaTime * Speed;
        }
    }

    private void animationProjectile(){
        flip();
        this.animationAttack.SetBool("isDisplace", true);
    }

    private void flip(){
        if(transform.position.z == 1.0f){
             this.spriteRenderer.flipX = true;
        }
        else{
             this.spriteRenderer.flipX = false;
        }
    }

    void OnCollisionEnter2D(Collision2D col)
    {
        if (col.gameObject.tag == "Enemy")
        {
            ((Archer) mainPlayer).AttackEnemy(GameObject.Find(col.gameObject.name));
            Destroy(gameObject);
        }
        else{
           Destroy(gameObject);
        }
    }


     
}
