using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class ProjecfileShot : MonoBehaviour
{
    private SpriteRenderer spriteRenderer;
    private PlayerMovement mainPlayer;
    private Animator animationAttack;
    [SerializeField] private float Speed;
    public StoringData storeData;
    void Start()
    {
        this.mainPlayer = GameObject.Find(storeData.CharacterName).GetComponent<Player>();
        this.spriteRenderer = gameObject.GetComponent<SpriteRenderer>();
        this.animationAttack = gameObject.GetComponent<Animator>();
    }

    // Update is called once per frame
    void Update()
    {
        animationProjectile();
        moveProjectile();
    }

    private void moveProjectile()
    {
        if (transform.position.z == 1.0f)
        {
            transform.position += -transform.right * Time.deltaTime * Speed;
        }
        else
        {
            transform.position += transform.right * Time.deltaTime * Speed;
        }
    }

    private void animationProjectile()
    {
        flip();
        this.animationAttack.SetBool("isDisplace", true);
    }

    private void flip()
    {
        if (transform.position.z == 1.0f)
        {
            this.spriteRenderer.flipX = true;
        }
        else
        {
            this.spriteRenderer.flipX = false;
        }
    }

    void OnCollisionEnter2D(Collision2D col)
    {
        if (col.gameObject.CompareTag("Enemy"))
        {
            ((Archer)mainPlayer).AttackEnemy(GameObject.Find(col.gameObject.name));
            Destroy(gameObject);
        }
        else if (col.gameObject.CompareTag("DestructibleLayer"))
        {
            Debug.Log("ProjectfileShot : OnCollisionEnter2D :" + this.transform.position);
            ((Archer)mainPlayer).AttackLayer(GameObject.Find(col.gameObject.name), col.collider, this.transform.position);
            Destroy(gameObject);
        }
        else
        {
            Destroy(gameObject);
        }
    }
}