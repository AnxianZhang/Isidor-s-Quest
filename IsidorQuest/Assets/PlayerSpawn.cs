using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PlayerSpawn : MonoBehaviour
{
    private void Start()
    {
        GameObject.FindGameObjectWithTag("Player").gameObject.transform.position = transform.position;
    }
}
