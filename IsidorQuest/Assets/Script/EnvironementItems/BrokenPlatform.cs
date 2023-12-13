using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class BrokenPlatform : MonoBehaviour
{
    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        
    }

    void OnCollisionEnter2D(Collision2D other)
    {
        if (other.gameObject.tag == "Player")
        {
            StartCoroutine(BlinkAndDestroy());
        }
    }

    private IEnumerator BlinkAndDestroy()
    {
        // Blinking effect
        for (int i = 0; i < 3; i++)
        {
            GetComponent<SpriteRenderer>().color = new Color(1f, 1f, 1f, 0.5f); // Set transparency
            yield return new WaitForSeconds(0.1f); // Wait for 1 second

            GetComponent<SpriteRenderer>().color = new Color(255, 255, 255, 255); // Set back to opaque
            yield return new WaitForSeconds(0.2f); // Wait for 1 second
        }

        // Destroy the platform
        Destroy(gameObject);
    }

}
