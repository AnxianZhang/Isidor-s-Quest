using System.Collections;
using System.Collections.Generic;
using System.Runtime.InteropServices;
using UnityEngine;

public class EnemySnake : Enemy
{
    private void Awake()
    {
        base.walkingSpeed = 5f;
        base.runningSpeed = 1f;
    }

    public new void Update()
    {
        base.Update();
        enemySnakeSound();
    }

    private void enemySnakeSound(){
        float res = target.position.y - transform.position.y;
        if (Vector2.Distance(target.position, transform.position) < 10.0f){
            if(!gm.SnakeSoundIsPlaying()){
                gm.SnakeSound();
            }
        }
    }
    protected override void doEnnemyOnGroundAction() { }
}