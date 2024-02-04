using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

[Serializable]
public class Position
{
    public string pseudo;
    public string characterClass;
    public float[] position;
    public string currentScene;

    public Position(string pseudo, string characterClass, float [] position, string currentScene)
    {
        this.pseudo = pseudo;
        this.characterClass = characterClass;
        this.position = position;
        this.currentScene = currentScene;
    }
}
