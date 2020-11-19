using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SQLite;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core;

namespace Infrastructure
{
    public class TrimestreDB
    {
        public static List<Trimestre> GetTrimestres()
        {
            List<Trimestre> trimestres = new List<Trimestre>();
            try
            {
                using (SQLiteConnection con = new SQLiteConnection("Data Source=oferta.sqlite;Version=3;"))
                {
                    using (SQLiteCommand cmd = new SQLiteCommand(con))
                    {
                        cmd.CommandType = CommandType.Text;

                        cmd.CommandText =
                            "SELECT Oferta.IdOferta, Oferta.Año, Trimestre.Meses, Oferta.IdTrimestre  FROM Oferta " +
                            "INNER JOIN Trimestre ON Trimestre.IdTrimestre = Oferta.IdTrimestre ";


                        con.Open();

                        using (var reader = cmd.ExecuteReader())
                        {
                            while (reader.Read())
                            {
                                var trim = new Trimestre();
                                trim.Año = Convert.ToInt32(reader["Año"]);
                                trim.Meses = reader["Meses"].ToString();
                                trim.IdOferta = Convert.ToInt32(reader["IdOferta"]);
                                trim.IdTrimestre = Convert.ToInt32(reader["IdTrimestre"]);
                                trimestres.Add(trim);

                            }
                        }
                    }
                }
                return trimestres;
            }
            catch
            {
                return null;
            }

        }

    }
}
