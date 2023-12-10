using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class EnemyGolem : Enemy
{
    private void Awake()
    {
        base.walkingSpeed = 3f;
        base.runningSpeed = 2f;
    }

    public new void Update()
    {
        base.Update();
        enemySnakeSound();
    }

    private void enemySnakeSound(){
        float res = target.position.y - transform.position.y;
        if (Vector2.Distance(target.position, transform.position) < 10.0f){
            if(!gm.GolemSoundIsPlaying()){
                gm.GolemSound();
            }
        }
    }

    protected override void doEnnemyOnGroundAction() 
    {
        if (base.rb.velocity.y != 0f)
        {
            base.animator.SetFloat("speed", 0.51f);
        }
        else
        {
            base.animator.SetFloat("speed", 0.49f);
        }
    }
}
