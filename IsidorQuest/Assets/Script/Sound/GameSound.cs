using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class GameSound : MonoBehaviour
{
    [SerializeField] private AudioSource projectileSound;
    [SerializeField] private AudioSource hitEnnemySound;
    [SerializeField] private AudioSource doorSound;
    // Start is called before the first frame update
    [SerializeField] private AudioSource collectCoin;
    [SerializeField] private AudioSource playerJump;
    [SerializeField] private AudioSource playerDeath;
    [SerializeField] private AudioSource playerWalk;
    [SerializeField] private AudioSource openChest;
    [SerializeField] private AudioSource snakeSound;
    [SerializeField] private AudioSource golemSound;
    [SerializeField] private AudioSource playerDamage;
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        
    }

    public void ProjectileSoundPlay(){
        projectileSound.Play();
    }
    public void hitSoundPlay(){
        hitEnnemySound.Play();
    }

    public bool isHitSoundPlaying(){
        return hitEnnemySound.isPlaying;
    }

    public void PlayerWalkSound(){
        playerWalk.Play();
    }
    public void PlayerWalkPauseSound(){
        playerWalk.Pause();
    }
    public bool isPlayerWalkSoundIsPlaying(){
        return playerWalk.isPlaying;
    }

    public void doorSoundPlay(){
        doorSound.Play();
    }
     public void chestSoundPlay(){
        openChest.Play();
    }

    public void collectCoinPlay(){
        collectCoin.Play();
    }

    public void playerJumpSound(){
        playerJump.Play();
    }
    public void playerDeathSound(){
        playerDeath.Play();
    }
    public void SnakeSound(){
        snakeSound.Play();
    }
    public bool SnakeSoundIsPlaying(){
        return snakeSound.isPlaying;
    }
    public bool playerJumpIsPlaying(){
        return playerJump.isPlaying;
    }

    public void GolemSound(){
        golemSound.Play();
    }
    public bool GolemSoundIsPlaying(){
        return golemSound.isPlaying;
    }

     public void playerDamageSound(){
        playerDamage.Play();
    }
    public bool playerDamageIsPlaying(){
        return playerDamage.isPlaying;
    }
}
