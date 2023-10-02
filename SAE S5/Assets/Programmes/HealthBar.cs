using System.Collections;
using System.Collections.Generic;
using System.Reflection;
using UnityEngine.UI;
using UnityEngine;

public class HealthBar : MonoBehaviour
{
    // Start is called before the first frame update
    private int lifeMax = 100;
    [SerializeField] private MainCharacter lifePlayer;
    [SerializeField] private Image healthBar;
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        healthBar.fillAmount = CalculatePlayerLife();
    }

    private float CalculatePlayerLife()
    {
        int life = lifePlayer.getLife();
            if (life != 0)
            {
                float lifeActual = life / life;
                print(lifeActual);
                return lifeActual;
            }
        return 0.0f;
    }

    
}
