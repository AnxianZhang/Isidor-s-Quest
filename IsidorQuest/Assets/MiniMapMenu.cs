using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class MiniMapMenu : MonoBehaviour
{
    [SerializeField]
    private float MinH = 5f;
    [SerializeField]
    private float MaxH = 14f;

    private Camera cam;
    void Start()
    {
        this.cam = GameObject.FindGameObjectWithTag("MainCamera").transform.GetChild(0).GetComponent<Camera>();
        //Debug.Log("jkzbkqbj");
    }

    public void ZoomIn()
    {
/*        Debug.Log("hollo");
*/        cam.orthographicSize -= 2f;
        if (cam.orthographicSize < MinH) { cam.orthographicSize = MinH; }
    }
    public void ZoomOut()
    {
        //Debug.Log("siba");
        cam.orthographicSize += 2f;
        if (cam.orthographicSize > MaxH) { cam.orthographicSize = MaxH; }

    }
}
