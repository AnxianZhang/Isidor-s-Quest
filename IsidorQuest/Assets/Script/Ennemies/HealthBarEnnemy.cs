using System.Collections;
using System.Collections.Generic;
using UnityEngine.UI;
using UnityEngine;

public class HealthBarEnnemy : MonoBehaviour
{
    [SerializeField] private Enemy enemy;
    [SerializeField] private Image healthBar;
    [SerializeField] private Canvas healthBarCanvas;

    private float posXInitial;
    private float posYInitial;

    void Start()
    {
        posXInitial = enemy.transform.position.x;
        posYInitial = enemy.transform.position.y;
    }

    void Update()
    {
        healthBar.fillAmount = CalculatePlayerLife();
        inactive();
        HealthBarPosition();
    }

    private void HealthBarPosition()
    {
        float newposXCanvas = enemy.transform.position.x - posXInitial;
        float newposyCanvas = enemy.transform.position.y - posYInitial;
        healthBarCanvas.transform.position = new Vector3(newposXCanvas, newposyCanvas, 0f);
    }

    private void inactive()
    {
        if (enemy.getLife() <= 0)
        {
            healthBarCanvas.enabled = false;
        }
    }

    private float CalculatePlayerLife()
    {
        int life = enemy.getLife();
        if (life != 0)
        {
            float lifeActual = life;
            float percentLife = enemy.getLifeMax() * 0.01f;
            float lifeEnnemy = lifeActual / percentLife;
            float lifeFinal = lifeEnnemy * 0.01f;
            return lifeFinal;
        }
        return 0.0f;
    }
}