using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using System;
using Unity.Mathematics;

public class Coffres : MonoBehaviour
{
    private Animator animator;
    public GameObject dropCoin;
    private bool coffreOuvert = false;
    private GameSound gm;  
    // Start is called before the first frame update
    void Start()
    {
      this.gm = GameObject.FindWithTag("SoundManager").GetComponent<GameSound>();
      this.animator = gameObject.GetComponent<Animator>(); 
    }

    // Update is called once per frame
    void Update()
    {
        animationCoffre();
    }

    private void animationCoffre(){
        animator.SetBool("isOpen", coffreOuvert);
    }

    void OnCollisionEnter2D(Collision2D col)
    {
        if (col.gameObject.tag == "Player")
        {
            if(!coffreOuvert){
                gm.chestSoundPlay();
                var rnd = new System.Random();

                var nbPieces = rnd.Next(3,5);

                while(nbPieces != 0){
                    GameObject piece = Instantiate(dropCoin,transform.position,Quaternion.identity);
                    var hMovement = (float)rnd.NextDouble()+0.5f;
                    var vMovement = (float)rnd.NextDouble()*2+3;
                    piece.GetComponent<Rigidbody2D>().velocity = new Vector2(hMovement, vMovement);
                    nbPieces--;
                }

                //Ajout potentiel de nouveaux objets dans le coffre tel que des potions
            }
            coffreOuvert = true;
        }
    }
}
