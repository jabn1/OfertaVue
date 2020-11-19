using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core
{
    public class HorarioAula
    {
        public string Aula { get; set; }
        private List<string> horario = new List<string>();
        public List<string> Horario
        {
            get { return horario; }
            set { horario = value; }
        }

        private List<bool> horarioDisplay = new List<bool>();
        public List<bool> HorarioDisplay
        {
            get { return horarioDisplay; }
            set { horarioDisplay = value; }
        }


    }
}
