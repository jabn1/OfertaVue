using System.Collections.Generic;
using Core;

namespace API
{
    public class OfertaDTO
    {
        public List<Seccion> Secciones { get; set; }
        public Dictionary<string, List<HorarioAulaDTO>> Disponibilidad { get; set; }
    }
}