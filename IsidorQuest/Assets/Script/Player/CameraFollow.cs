using UnityEngine;

public class CameraFollow : MonoBehaviour
{
    private GameObject player;
    [SerializeField] private float offSet;
    [SerializeField] public Vector3 posOffSet;

    private Vector3 velocity;

    // Start is called before the first frame update
    void Start()
    {
        this.player = GameObject.FindGameObjectWithTag("Player");
    }

    // Update is called once per frame
    void Update()
    {
        this.transform.position = Vector3.SmoothDamp(this.transform.position, this.player.transform.position + this.posOffSet, ref this.velocity, this.offSet);
    }
}