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
