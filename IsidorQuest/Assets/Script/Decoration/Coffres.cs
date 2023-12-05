using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Coffres : MonoBehaviour
{
    private Animator animator;
    private bool coffreOuvert = false;
    // Start is called before the first frame update
    void Start()
    {
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
            coffreOuvert = true;
        }
    }
}
