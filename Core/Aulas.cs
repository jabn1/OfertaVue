using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core
{
    public class Aulas : List<HorarioAula>
    {
        public bool HasAula(string aula)
        {
            foreach (var element in this)
            {
                if (element.Aula == aula) { return true; }
            }
            return false;
        }
        public int SearchAula(string aula)
        {
            for (int i = 0; i < this.Count; i++)
            {
                if (this[i].Aula == aula) { return i; }
            }
            return -1;
        }
    }
}
