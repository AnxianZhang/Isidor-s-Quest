public class InstanteHeal : PotionItem
{
    private int healAmount = 10;

    public override void onUse()
    {
        if(!base.gm.playerDrinkIsPlaying()){
            base.gm.playerDrinkSound();
        }
        base.mainPlayer.addHealth(this.healAmount);
        Destroy(gameObject);
    }
}
