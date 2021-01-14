
var Modelo = function() {
  this.preguntas = [];
  this.ultimoId = 0;

  //inicializacion de eventos
  this.cargarPreguntas()
  this.preguntaAgregada = new Evento(this);
  this.preguntaEditada = new Evento(this);
  this.votoAgregado = new Evento(this);
  this.preguntaEliminada = new Evento(this);
  this.todasBorradas = new Evento(this);
};

Modelo.prototype = {
  //se obtiene el id más grande asignado a una pregunta
  obtenerUltimoId: function() {
    return this.ultimoId++;
  },

  obtenerPregunta: function(id){
    this.preguntas.forEach(function(pregunta){
      if(pregunta.id == id){
        return pregunta.id
      }
    });
  },

  //se agrega una pregunta dado un nombre y sus respuestas
  agregarPregunta: function(nombre, respuestas) {
    var id = this.obtenerUltimoId();
    id++;
    var nuevaPregunta = {'textoPregunta': nombre, 'id': id, 'cantidadPorRespuesta': respuestas};
    this.preguntas.push(nuevaPregunta);
    this.preguntaAgregada.notificar();
    this.guardar()
  },
  agregarVoto:function(id , respuestaVotada ){
    this.preguntas.forEach((pregunta, i) => {
      if(pregunta.id == id){
this.preguntas[i].cantidadPorRespuesta.forEach((respuesta, j) =>{
if(respuesta.textoPregunta == respuestaVotada){
  this.preguntas[i].cantidadPorRespuesta[j].cantidad++;
  console.log(i,j);
  this.guardar()
  this.votoAgregado.notificar()
}
})
      }
    });
    this.guardar()
  },
  eliminarPregunta: function($id){
    this.preguntas.forEach((pregunta, i) => {
      if(pregunta.id == $id){
        this.preguntas.splice(i, 1);
        this.preguntaEliminada.notificar()
      }
    });
    this.guardar()
  },
  editarPregunta: function(id, nombreNuevo){
    this.preguntas.forEach((pregunta, i) => {
      if(pregunta.id == id){
        this.preguntas[i].textoPregunta = nombreNuevo;
        this.preguntaEditada.notificar()
      }
    });
    this.guardar()
  },
  borrarTodo: function(){
    this.preguntas = [];
    this.ultimoId = 0;
    this.todasBorradas.notificar();
    this.guardar()
  },
  //se guardan las preguntas
  guardar: function(){
    localStorage.setItem('preguntas', JSON.stringify(this.preguntas))
  },
  cargarPreguntas: function(){
    if(localStorage.getItem('preguntas')){
      this.preguntas = JSON.parse(localStorage.getItem('preguntas'));
     
      this.preguntas.forEach( pregunta =>{
        if(this.ultimoId < pregunta.id){
          this.ultimoId = pregunta.id;
        }
      })
    }
  }
};
