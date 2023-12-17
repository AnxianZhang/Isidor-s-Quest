using UnityEngine;

public class CameraFollow : MonoBehaviour
{
    private GameObject player;
    [SerializeField] private float offSet;
    [SerializeField] public Vector3 posOffSet;

    private Vector3 velocity;
    public StoringData storeData;
    void Start()
    {
        this.player = GameObject.Find(storeData.CharacterName);
    }

    void Update()
    {
        this.transform.position = Vector3.SmoothDamp(this.transform.position, this.player.transform.position + this.posOffSet, ref this.velocity, this.offSet);
    }
}