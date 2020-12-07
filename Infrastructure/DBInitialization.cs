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
    public class DBInitialization
    {
        public static void Initialize()
        {
            if (!System.IO.File.Exists("oferta.sqlite"))
            {
                try
                {
                    SQLiteConnection.CreateFile("oferta.sqlite");
                    using (SQLiteConnection con = new SQLiteConnection("Data Source=oferta.sqlite;Version=3;"))
                    {
                        using (SQLiteCommand cmd = new SQLiteCommand(con))
                        {
                            cmd.CommandType = CommandType.Text;

                            cmd.CommandText = @"
                            CREATE TABLE Trimestre(
                                IdTrimestre INTEGER PRIMARY KEY,
                                Meses TEXT NOT NULL
                            );

                            CREATE TABLE Oferta(
                                IdOferta INTEGER PRIMARY KEY,
                                IdTrimestre INTEGER NOT NULL,
                                Año INTEGER NOT NULL,
                                FOREIGN KEY (IdTrimestre) REFERENCES Trimestre(IdTrimestre)
                            );


                            CREATE TABLE Seccion(
                                IdSeccion INTEGER PRIMARY KEY,
                                IdOferta INTEGER NOT NULL,
                                tipo TEXT,
                                idSec  TEXT,
                                aula  TEXT,
                                profesor  TEXT,
                                lun  TEXT,
                                mar  TEXT,
                                mier  TEXT,
                                jue  TEXT,
                                vie  TEXT,
                                sab  TEXT,
                                asignatura  TEXT,
                                area  TEXT,
                                FOREIGN KEY (IdOferta) REFERENCES OFERTA(IdOferta)
                            );


                            INSERT INTO Trimestre VALUES
                                (1,'FEBRERO - ABRIL'),
                                (2,'MAYO - JULIO'),
                                (3,'AGOSTO - OCTUBRE'),
                                (4,'NOVIEMBRE - ENERO');
                            ";

                            con.Open();
                            cmd.ExecuteNonQuery();

                        }
                    }

                }
                catch
                {
                    Console.WriteLine("Error while creating database.");
                }
            }

        }
    }
}