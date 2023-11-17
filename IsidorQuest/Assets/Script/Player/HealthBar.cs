using System.Collections;
using System.Collections.Generic;
using System.Reflection;
using UnityEngine.UI;
using UnityEngine;

public class HealthBar : MonoBehaviour
{
    // Start is called before the first frame update
    [SerializeField] private Warrior lifePlayer;
    [SerializeField] private Image healthBar;


    void Start()
    {
        //transform.position = camera.GetComponent<Camera>().ViewportToWorldPoint(new Vector3(0,1,0));        
    }

    // Update is called once per frame
    void Update()
    {
        //transform.position = camera.main.ViewportToWorldPoint(new Vector3(0,1,0));
        healthBar.fillAmount = CalculatePlayerLife();
    }

    private float CalculatePlayerLife()
    {
        int life = lifePlayer.getLife();
        if (life != 0)
            {
                float lifeActual = life;
                float percentLife = lifePlayer.getLifeMax() * 0.01f;
                float lifeMainPlayer = lifeActual / percentLife;
                float lifeFinal = lifeMainPlayer * 0.01f;
                return lifeFinal;
            }
        return 0.0f;
    }

    
}
