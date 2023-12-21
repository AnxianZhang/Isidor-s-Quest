public class InstanteHeal : PotionItem
{
    private int healAmount = 10;

    public override void onUse()
    {
        base.mainPlayer.addHealth(this.healAmount);
        Destroy(gameObject);
    }
}
