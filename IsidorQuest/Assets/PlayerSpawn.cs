using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PlayerSpawn : MonoBehaviour
{
    public StoringData storeData;
    private void Awake()
    {
        GameObject.Find(storeData.CharacterName).gameObject.transform.position = transform.position;
    }
}
