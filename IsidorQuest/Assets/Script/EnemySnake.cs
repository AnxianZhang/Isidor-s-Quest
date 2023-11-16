using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class EnemySnake : Enemy
{
    public float speed;
    public float waitTime;
    public Transform[] movePos;

    private int i=0;
    private bool movingRight = true;
    private float wait;
    private System.Random random;
    private float randomTimer = 0f;
    // Start is called before the first frame update
    public new void Start()
    {
        base.Start();
        wait = waitTime;
        random = new System.Random();
    }

    // Update is called once per frame
    public new void Update()
    {
        base.Update();
        //Debug.Log(Vector2.Distance(movePos[0].position, movePos[1].position));// >3 -> ai
        
        if(Vector2.Distance(movePos[0].position, movePos[1].position) > 3){
            //ai
            //random bool true false //0 right 1 left
            
            randomTimer -= Time.deltaTime;
            if (Vector2.Distance(transform.position, movePos[0].position) > 0.1f || 
                    Vector2.Distance(transform.position, movePos[1].position) > 0.1f || 
                    Vector2.Distance(transform.position, movePos[0].position) <= 0.1f||
                    Vector2.Distance(transform.position, movePos[1].position) <= 0.1f){
                if (randomTimer <= 0f){
                    int randomInt = random.Next(2);
                    movingRight = (randomInt == 1);

                    Debug.Log("right?"+movingRight);
                    if(Vector2.Distance(transform.position, movePos[1].position) <= 0.1f){movingRight=true;}
                    if(Vector2.Distance(transform.position, movePos[0].position) <= 0.1f){movingRight=false;}
                    randomTimer = 1.0f;
                }

                if(movingRight){
                    transform.position = 
                        Vector2.MoveTowards(transform.position, movePos[0].position, speed * Time.deltaTime);
                    transform.eulerAngles = new Vector3(0,0,0);
                }if(!movingRight){
                    transform.position = 
                            Vector2.MoveTowards(transform.position, movePos[1].position, speed * Time.deltaTime);
                    transform.eulerAngles = new Vector3(0,-180,0);
                }
                if (Vector2.Distance(transform.position, movePos[0].position) <= 0.1f || Vector2.Distance(transform.position, movePos[1].position) <= 0.1f){
                    if (waitTime > 0){
                        waitTime -= Time.deltaTime;
                    }
                    waitTime = wait;
                }

            }
        }
        else{
            //sans ai
            // Debug.Log(Vector2.Distance(transform.position, movePos[i].position) < 0.1f);
            transform.position = 
                Vector2.MoveTowards(transform.position, movePos[i].position, speed * Time.deltaTime);

            if (Vector2.Distance(transform.position, movePos[i].position) < 0.1f){
                if (waitTime > 0){
                    waitTime -= Time.deltaTime;
                }else{
                    if(movingRight){
                        transform.eulerAngles = new Vector3(0,-180,0);
                        movingRight = false;
                    }else{
                        transform.eulerAngles = new Vector3(0,0,0);
                        movingRight = true;
                    }

                    if(i==0){
                        i=1;
                    }else{
                        i=0;
                    }

                    waitTime = wait;
                }
            }
        }
       
    }
}
