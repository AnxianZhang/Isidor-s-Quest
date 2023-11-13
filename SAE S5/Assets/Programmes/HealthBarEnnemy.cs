using System.Collections;
using System.Collections.Generic;
using UnityEngine.UI;
using UnityEngine;

public class HealthBarEnnemy : MonoBehaviour
{
    // Start is called before the first frame update
    [SerializeField] private enemy Enemy;
    [SerializeField] private Image healthBar;
    [SerializeField] private Canvas healthBarCanvas;

    private float posXInitial;
    private float posYInitial;
    void Start()
    {
        posXInitial= Enemy.transform.position.x;
        posYInitial= Enemy.transform.position.y;
    }

    // Update is called once per frame
    void Update()
    {
        healthBar.fillAmount = CalculatePlayerLife();
        inactive();
        HealthBarPosition();
    }

    private void HealthBarPosition()
    {
        float newposXCanvas = Enemy.transform.position.x - posXInitial;
        float newposyCanvas = Enemy.transform.position.y - posYInitial;
        healthBarCanvas.transform.position = new Vector3(newposXCanvas, newposyCanvas, 0f);
    }

    private void inactive(){
        if(Enemy.getLife() <= 0){
            healthBarCanvas.enabled = false;
        }
    }

    private float CalculatePlayerLife()
    {
        int life = Enemy.getLife();
        if (life != 0)
            {
                float lifeActual = life;
                float percentLife = Enemy.getLifeMax() * 0.01f;
                float lifeEnnemy = lifeActual / percentLife;
                float lifeFinal = lifeEnnemy * 0.01f;
                return lifeFinal;
            }
        return 0.0f;
    }
}
