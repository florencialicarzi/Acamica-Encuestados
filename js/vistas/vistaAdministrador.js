/*
 * Vista administrador
 */
var VistaAdministrador = function(modelo, controlador, elementos) {
  this.modelo = modelo;
  this.controlador = controlador;
  this.elementos = elementos;
  var contex = this;

  // suscripción de observadores
  this.modelo.preguntaAgregada.suscribir(function() {
    contex.reconstruirLista();
  });

  this.modelo.preguntaEliminada.suscribir(function() {
    contex.reconstruirLista();
  });

  this.modelo.preguntaEditada.suscribir(function() {
    contex.reconstruirLista();
  });

  this.modelo.todasBorradas.suscribir(function() {
    contex.reconstruirLista();
  });
};


VistaAdministrador.prototype = {
  //lista
  inicializar: function() {
    this.reconstruirLista();
    this.configuracionDeBotones();
    validacionDeFormulario();
    //llamar a los metodos para reconstruir la lista, configurar botones y validar formularios
  },

  construirElementoPregunta: function(pregunta){
    var contex = this;
    var nuevoItem;
    //completar
    //asignar a nuevoitem un elemento li con clase "list-group-item", id "pregunta.id" y texto "pregunta.textoPregunta"
    nuevoItem = $("<li>", {class:'list-group-item', id: pregunta.id}).text(pregunta.textoPregunta);
    var interiorItem = $('.d-flex');
    var titulo = interiorItem.find('h5');
    titulo.text(pregunta.textoPregunta);
    interiorItem.find('small').text(pregunta.cantidadPorRespuesta.map(function(resp){
      return " " + resp.textoPregunta;
    }));
    nuevoItem.html($('.d-flex').html());
    return nuevoItem;
  },

  reconstruirLista: function() {
    var lista = this.elementos.lista;
    lista.html('');
    var preguntas = this.modelo.preguntas;
    for (var i=0;i<preguntas.length;++i){
      lista.append(this.construirElementoPregunta(preguntas[i]));
    }
  },

  configuracionDeBotones: function(){
    var e = this.elementos;
    var contex = this;

    //asociación de eventos
    e.botonAgregarPregunta.click(function() {
      contex.controlador.agregarPregunta(); 
      contex.limpiarFormulario();
    });
    // Completar la asociación de de eventos a los botones editarPregunta, borrarPregunta y borrarTodo

    e.botonBorrarPregunta.click(function() {
      contex.controlador.borrarPregunta();
    });

    e.botonEditarPregunta.click(function() {
      contex.controlador.editarPregunta();
    });
   
    
    e.borrarTodo.click(function() {
      contex.controlador.borrarTodasLasPreguntas();
    });
  },


  limpiarFormulario: function(){
    $('.form-group.answer.has-feedback.has-success').remove();
  },
};
