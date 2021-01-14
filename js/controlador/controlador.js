/*
 * Controlador
 */


var Controlador = function(modelo) {
  this.modelo = modelo;
};

Controlador.prototype = {
  agregarPregunta: function() {
    var value = $('#pregunta').val();
    var respuestas = [];

    $('[name="option[]"]').each(function() {


      //Completar el agregado de una respuesta
      // pusheandola al arreglo de respuestas
      if($(this).val()){
        var respuesta = new Respuesta($(this).val());
        respuestas.push(respuesta)
      }
      
    })
   
    this.modelo.agregarPregunta(value, respuestas);
  },

  borrarPregunta: function(){
    var idSeleccionado = $('.list-group-item.active').attr('id');
    this.modelo.eliminarPregunta(idSeleccionado)
  },

  editarPregunta: function(){
    let nuevaPregunta = prompt("Edite su pregunta:")
    var idSeleccionado = $('.list-group-item.active').attr('id');
    if(nuevaPregunta){
      this.modelo.editarPregunta(idSeleccionado, nuevaPregunta)
    }
  },
  borrarTodasLasPreguntas: function(){
      this.modelo.borrarTodo();
  },
  agregarVotos: function(){
    var contexto = this;
    $('#preguntas').find('div').each(function(){
      var nombrePregunta = $(this).attr('value')
      var id = $(this).attr('id')
  
      var respuestaSeleccionada = $(`input[name='${id}']:checked`).val()
      $(`input[name='${id}']`).prop('checked',false);
      contexto.agregarVoto(id,respuestaSeleccionada);
    });
  },
  agregarVoto: function(pregunta, respuestaSeleccionada){
    this.modelo.agregarVoto(pregunta, respuestaSeleccionada)
  }

  
};

var Respuesta = function(respuesta){
    this.cantidad = 0
    //Problemas para agregar la cantidad a las respuestas.
    this.textoPregunta = respuesta
}