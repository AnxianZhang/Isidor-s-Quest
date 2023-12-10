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

    protected override void doEnnemyOnGroundAction() { }
}