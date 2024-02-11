using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Tilemaps;
using UnityEngine.UI;
using UnityEngine.UIElements;

public class DestructibleLayer : MonoBehaviour
{
    private float offsetX = 0.5f;
    private float offsetY = 1f;

    private Tilemap destructibleTilemap;

    private Vector3 pos;

    // Start is called before the first frame update
    void Start()
    {
        destructibleTilemap = GetComponent<Tilemap>();
    }

    // Update is called once per frame
    void Update()
    {
       
    }

    public void Attack(Collider2D col, Vector3 vec)
    {
        /*Debug.Log("DestructibleLayer : Attack - destructibleTilemap - entre");*/
        /*Vector3 hitPos = col.ClosestPoint(col.transform.position);*/

        Vector3 hitPos = col.ClosestPoint(vec);

        Debug.Log("hitPos : " + hitPos);

        pos = new Vector3(hitPos.x + offsetX, hitPos.y - offsetY, 0f);
        Debug.Log("pos : " + pos);

        Vector3Int cellPos = destructibleTilemap.WorldToCell(pos);
        Debug.Log("cellPos : " + cellPos);

        destructibleTilemap.SetTile(cellPos, null);
        cellPos = destructibleTilemap.WorldToCell(new Vector3(hitPos.x + offsetX, hitPos.y, 0f));
        destructibleTilemap.SetTile(cellPos, null);
    }
}
