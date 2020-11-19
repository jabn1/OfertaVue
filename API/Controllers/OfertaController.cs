using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using Core;
using Infrastructure;
using System;
using Microsoft.AspNetCore.Http;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OfertaController : ControllerBase
    {
        [HttpPost("oferta")]
        public ActionResult CreateOferta([FromBody] string[] html,[FromQuery] int idTrimestre,[FromQuery] int año)
        {
            List<Seccion> secciones = null;
            var trimestre = new Trimestre { IdTrimestre = idTrimestre, Año = año };
            try
            {
                secciones = HtmlParser.HtmlParse(html);
            }
            catch (Exception e)
            {
                Console.WriteLine($"Error while parsing html: {e}");
                return StatusCode(StatusCodes.Status400BadRequest, "Error while parsing html");
            }
            if (SeccionDB.SaveSecciones(secciones, trimestre))
            {
                return Ok();
            }
            else
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error while storing data");
            }
        }

        [HttpGet("oferta")]
        public ActionResult<dynamic> GetOferta([FromQuery] int id)
        {
            var oferta = new OfertaDTO();
            var secciones = SeccionDB.GetSecciones(id);
            if (secciones == null)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error while retrieving data");
            }
            Dictionary<string, Aulas> disponibilidad = null;
            try
            {
                disponibilidad = Disponibilidad.GetDisponibilidad(secciones);
            }
            catch (Exception e)
            {
                Console.WriteLine($"Error while processing data: {e}");
                return StatusCode(StatusCodes.Status400BadRequest, "Error while processing data");
            }
            var ofertaDTO = new OfertaDTO { Secciones = secciones };
            var disponibilidadDTO = new Dictionary<string, List<HorarioAulaDTO>>();
            foreach (var item in disponibilidad)
            {
                var horarios = new List<HorarioAulaDTO>();
                foreach (var horario in item.Value)
                {
                    horarios.Add(new HorarioAulaDTO { Aula = horario.Aula, Horario = horario.HorarioDisplay });
                }
                disponibilidadDTO.Add(item.Key, horarios);
            }
            ofertaDTO.Disponibilidad = disponibilidadDTO;
            return ofertaDTO;
        }

        [HttpGet("trimestres")]
        public ActionResult<List<Trimestre>> GetTrimestres()
        {
            var trimestres = TrimestreDB.GetTrimestres();
            if (trimestres == null)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error while retrieving data");
            }
            return trimestres;
        }
    }
}