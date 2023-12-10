using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
public class ChargeBarAttack : MonoBehaviour
{
    private Player AttackChargePlayer;

    [SerializeField] private Image ChargeBar;
    [SerializeField] private Canvas chargeBarCanvas;

    private float posXInitial;
    private float posYInitial;

    void Start()
    {
        this.AttackChargePlayer = GameObject.FindWithTag("Player").GetComponent<Player>();
        this.posXInitial = this.AttackChargePlayer.transform.position.x;
        this.posYInitial = this.AttackChargePlayer.transform.position.y;
    }

    void Update()
    {
        ChargeBar.fillAmount = CalculatePlayerLife();
        inactive();
        HealthBarPosition();
    }

    private void HealthBarPosition()
    {
        float newposXCanvas = this.AttackChargePlayer.transform.position.x - this.posXInitial;
        float newposyCanvas = this.AttackChargePlayer.transform.position.y - this.posYInitial;
        this.chargeBarCanvas.transform.position = new Vector3(newposXCanvas, newposyCanvas, 0f);
    }

    private void inactive()
    {
        if (this.AttackChargePlayer.isDeath)
        {
            this.chargeBarCanvas.enabled = false;
        }
    }

    private float CalculatePlayerLife()
    {
        float charge = AttackChargePlayer.getCooldownNow();
        if (charge != 0)
        {
            float chargeActual = this.AttackChargePlayer.cooldown - charge;
            float percentCharge = this.AttackChargePlayer.cooldown * 0.01f;
            float chargePlayer = chargeActual / percentCharge;
            float chargeFinal = chargePlayer * 0.01f;
            return chargeFinal;
        }
        return 1f;
    }
}