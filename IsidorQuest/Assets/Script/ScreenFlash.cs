using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class ScreenFlash : MonoBehaviour
{
    public Image hurtImage; 
    public float time;
    private Color flashColor = new Color(1f, 0f, 0f, 1f);
    private Color defaultColor;
    // Start is called before the first frame update
    void Start()
    {
        defaultColor = hurtImage.color;
    }

    // Update is called once per frame
    void Update()
    {
        
    }

    public void FlashScreen(){
        StartCoroutine(Flash());
    }

    IEnumerator Flash(){
        hurtImage.color=flashColor;
        yield return new WaitForSeconds(time);
        hurtImage.color=defaultColor;
    }
}
