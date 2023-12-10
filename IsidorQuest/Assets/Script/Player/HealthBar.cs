using System.Collections;
using System.Collections.Generic;
using System.Reflection;
using UnityEngine.UI;
using UnityEngine;

public class HealthBar : MonoBehaviour
{
    [SerializeField] private Image healthBar;
    
    private Player lifePlayer;

    void Start()
    {
        this.lifePlayer = GameObject.FindWithTag("Player").GetComponent<Player>();
        //transform.position = camera.GetComponent<Camera>().ViewportToWorldPoint(new Vector3(0,1,0));        
    }

    // Update is called once per frame
    void Update()
    {
        //transform.position = camera.main.ViewportToWorldPoint(new Vector3(0,1,0));
        this.healthBar.fillAmount = CalculatePlayerLife();
    }

    private float CalculatePlayerLife()
    {
        int life = this.lifePlayer.currentLife;
        if (life != 0)
        {
            float lifeActual = life;
            float percentLife = this.lifePlayer.maxLife * 0.01f;
            float lifeMainPlayer = lifeActual / percentLife;
            float lifeFinal = lifeMainPlayer * 0.01f;
            return lifeFinal;
        }
        return 0.0f;
    }
}