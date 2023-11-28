using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
public class ChargeBarAttack : MonoBehaviour
{
    // Start is called before the first frame update
[SerializeField] private Warrior AttackChargePlayer;
[SerializeField] private Image ChargeBar;

[SerializeField] private Canvas chargeBarCanvas;
private float posXInitial;

private float posYInitial;
void Start()
{
    posXInitial= AttackChargePlayer.transform.position.x;
    posYInitial= AttackChargePlayer.transform.position.y;
}

// Update is called once per frame
void Update()
{
    ChargeBar.fillAmount = CalculatePlayerLife();
    inactive();
    HealthBarPosition();
}
    private void HealthBarPosition()
    {
        float newposXCanvas = AttackChargePlayer.transform.position.x - posXInitial;
        float newposyCanvas = AttackChargePlayer.transform.position.y - posYInitial;
        chargeBarCanvas.transform.position = new Vector3(newposXCanvas, newposyCanvas, 0f);
    }

    private void inactive(){
        if(AttackChargePlayer.getIsDeath()){
            chargeBarCanvas.enabled = false;
        }
    }

    private float CalculatePlayerLife()
    {
        float charge = AttackChargePlayer.getCooldownNow();
        if (charge != 0)
            {
                float chargeActual = AttackChargePlayer.getCooldown() - charge;
                float percentCharge = AttackChargePlayer.getCooldown() * 0.01f;
                float chargePlayer = chargeActual / percentCharge;
                float chargeFinal = chargePlayer * 0.01f;
                return chargeFinal;
            }
        return 1f;
    }
}
