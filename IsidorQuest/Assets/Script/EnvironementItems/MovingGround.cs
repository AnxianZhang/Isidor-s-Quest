using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class MovingGround : MonoBehaviour
{
    [SerializeField] private float speed;
    [SerializeField] private float waitTime;
    [SerializeField] private Transform[] movePos;

    private int i;
    private Transform playerParent;

    // Start is called before the first frame update
    void Start()
    {
        this.i = 1;
        this.playerParent = GameObject.FindGameObjectWithTag("Player").transform.parent;
    }

    // Update is called once per frame
    void Update()
    {
        transform.position = Vector2.MoveTowards(transform.position, this.movePos[i].position, this.speed * Time.deltaTime);
        if (Vector2.Distance(transform.position, this.movePos[i].position) < 0.1f)
        {
            if (this.waitTime < 0.0f)
            {
                if (this.i == 0)
                {
                    this.i = 1;
                }
                else
                {
                    this.i = 0;
                }

                this.waitTime = 0.5f;
            }
            else
            {
                this.waitTime -= Time.deltaTime;
            }
        }
    }

    void OnCollisionEnter2D(Collision2D other)
    {
        if (other.gameObject.tag == "Player")
        {
            other.gameObject.transform.parent = gameObject.transform;
        }
    }
    private void OnCollisionExit2D(Collision2D other)
    {
        if (other.gameObject.tag == "Player")
        {
            other.gameObject.transform.parent = this.playerParent;
            DontDestroy.reAddToDontDestroy(other.gameObject);
        }
    }
}