using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core;

namespace Infrastructure
{


    public class Disponibilidad
    {

        private static Aulas GenerarListaAulas(List<Seccion> secciones)
        {
            List<string> noValidas;
            try
            {
                noValidas = new List<string>(System.IO.File.ReadAllText("noValidas.txt").Split(','));
            }
            catch
            {
                noValidas = new List<string>();
            }
            var aulas = new Aulas();

            foreach (var sec in secciones)
            {
                var aula = sec.Aula;
                var splitParam = ", ";
                var charParam = splitParam.ToCharArray();
                var auls = aula.Split(charParam);
                foreach (var aul in auls)
                {
                    var a = aul.Trim(new char[] { ' ', '\n', '\t' });
                    if (!aulas.HasAula(a) & !ListContains(a, noValidas) & a != "")
                    {
                        aulas.Add(new HorarioAula() { Aula = a });
                    }
                }
            }
            aulas.Sort((x, y) => string.Compare(x.Aula, y.Aula));
            return aulas;
        }
        private static bool ListContains(string str, List<string> strList)
        {
            foreach (var element in strList)
            {
                if (str.Contains(element)) { return true; }
            }
            return false;
        }

        public static Dictionary<string, Aulas> GetDisponibilidad(List<Seccion> secciones)
        {
            string[] dias = new string[] { "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado" };
            Dictionary<string, Aulas> disponibilidadCompleta = new Dictionary<string, Aulas>();
            foreach (var dia in dias)
            {
                disponibilidadCompleta.Add(dia, GenerarListaAulas(secciones));
            }

            foreach (var sec in secciones)
            {
                string busqueda = "";

                foreach (var dia in dias)
                {

                    if (dia == "Lunes") { busqueda = sec.lun; }
                    else if (dia == "Martes") { busqueda = sec.mar; }
                    else if (dia == "Miercoles") { busqueda = sec.mier; }
                    else if (dia == "Jueves") { busqueda = sec.jue; }
                    else if (dia == "Viernes") { busqueda = sec.vie; }
                    else if (dia == "Sabado") { busqueda = sec.sab; }

                    var aulas = disponibilidadCompleta[dia];


                    if (busqueda == "")
                    {
                        continue;
                    }
                    var aula = sec.Aula;
                    var splitParam = ", ";
                    var charParam = splitParam.ToCharArray();
                    var auls = aula.Split(charParam);

                    foreach (var aul in auls)
                    {
                        var a = aul.Trim(new char[] { ' ', '\n', '\t' });
                        int contains = aulas.SearchAula(a);
                        if (contains != -1)
                        {
                            if (!aulas[contains].Horario.Contains(busqueda))
                            {
                                if (aulas[contains].Horario.Count == 0)
                                {
                                    aulas[contains].Horario.Add(busqueda);
                                }
                                else
                                {
                                    for (int i = 0; i <= aulas[contains].Horario.Count; i++)
                                    {
                                        if (aulas[contains].Horario.Count == i)
                                        {
                                            aulas[contains].Horario.Add(busqueda);
                                            break;
                                        }
                                        var existent = Convert.ToInt32(aulas[contains].Horario[i].Split('/')[0]);
                                        var checkthis = Convert.ToInt32(busqueda.Split('/')[0]);
                                        if (existent > checkthis)
                                        {
                                            aulas[contains].Horario.Insert(i, busqueda);
                                            break;
                                        }
                                    }

                                }
                            }
                        }
                    }
                }
            }

            foreach (var dia in dias)
            {
                foreach (var aul in disponibilidadCompleta[dia])
                {
                    for (int i = 0; i < 15; i++)
                    {
                        aul.HorarioDisplay.Add(false);
                    }
                    foreach (var h in aul.Horario)
                    {
                        try
                        {
                            var rango = h.Split('/');
                            for (int i = Convert.ToInt32(rango[0]); i < Convert.ToInt32(rango[1]); i++)
                            {
                                aul.HorarioDisplay[i - 7] = true;
                            }
                        }
                        catch
                        {

                        }

                    }

                }
            }
            return disponibilidadCompleta;
        }
    }
}
