using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using Core;
using Infrastructure;
using System;
using Microsoft.AspNetCore.Http;
using System.IO;
using System.Threading.Tasks;
using System.Text;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OfertaController : ControllerBase
    {
        [HttpPost("oferta")]
        public async Task<ActionResult<List<Trimestre>>> CreateOferta(int idTrimestre, int año)
        {
            if (!Request.ContentType.Contains("multipart/form-data"))
            {
                Console.WriteLine("Invalid content format, must be multipart/form-data");
                return BadRequest("Invalid content format, must be multipart/form-data");
            }
            if (idTrimestre == 0 || año == 0)
            {
                Console.WriteLine("Missing parameters año or trimestre");
                return BadRequest("Missing parameters año or trimestre");
            }
            if (Request.Form.Files.Count != 1)
            {
                Console.WriteLine("Exactly one file is needed.");
                return BadRequest("Exactly one file is needed.");
            }
            var file = Request.Form.Files[0];

            if (file == null || file.ContentType != "text/html")
            {
                return BadRequest("Wrong file extension.");
            }
            var html = new List<string>();
            try
            {
                var streamTemp = file.OpenReadStream();

                using (var stream = new MemoryStream())
                {
                    await streamTemp.CopyToAsync(stream);
                    stream.Position = 0;

                    using (var reader = new StreamReader(stream, Encoding.UTF8))
                    {
                        string line;
                        while ((line = reader.ReadLine()) != null)
                        {
                            html.Add(line);
                        }
                    }
                }
            }
            catch (Exception e)
            {
                Console.WriteLine($"Error while reading file: {e}");
                return BadRequest("Error while reading file.");
            }


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
                return GetTrimestres();
            }
            else
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error while storing data");
            }
        }

        [HttpGet("oferta")]
        public ActionResult<OfertaDTO> GetOferta(int id)
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