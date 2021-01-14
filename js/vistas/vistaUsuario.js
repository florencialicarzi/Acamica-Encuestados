/*
 * Vista usuario
 */
var VistaUsuario = function(modelo, controlador, elementos) {
  this.modelo = modelo;
  this.controlador = controlador;
  this.elementos = elementos;
  var contex = this;

  //suscripcion a eventos del modelo
  this.modelo.preguntaAgregada.suscribir(function() {
    contex.reconstruirLista();
    contex.reconstruirGraf()
  });
  this.modelo.votoAgregado.suscribir(function(){
    contex.reconstruirGraf()
  })

  this.modelo.preguntaEliminada.suscribir(function() {
    contex.reconstruirLista();
    contex.reconstruirGraf()
  });

  this.modelo.preguntaEditada.suscribir(function() {
    contex.reconstruirLista();
    contex.reconstruirGraf()
  });

  this.modelo.todasBorradas.suscribir(function() {
    contex.reconstruirLista();
    contex.reconstruirGraf()
  });
};

VistaUsuario.prototype = {
  //muestra la lista por pantalla y agrega el manejo del boton agregar
  inicializar: function() {
    this.modelo.cargarPreguntas()
    this.reconstruirLista();
    var elementos = this.elementos;
    var contex = this;
    
    elementos.botonAgregar.click(function() {
      contex.controlador.agregarVotos();  
    });
      
    this.reconstruirGraf();
  },

  //reconstruccion de los graficos de torta
  reconstruirGraf: function(){
    var contex = this;
    //obtiene las preguntas del local storage
    var preguntas = this.modelo.preguntas;
    preguntas.forEach(function(clave){
      var listaParaGrafico = [[clave.textoPregunta, 'Cantidad']];
      var respuestas = clave.cantidadPorRespuesta;
      respuestas.forEach (function(elemento) {
        listaParaGrafico.push([elemento.textoPregunta,elemento.cantidad]);
      });
      contex.dibujarGrafico(clave.textoPregunta, listaParaGrafico);
    })
  },


  reconstruirLista: function() {
    var listaPreguntas = this.elementos.listaPreguntas;
    listaPreguntas.html('');
    var contex = this;
    var preguntas = this.modelo.preguntas;
    preguntas.forEach(function(clave){
      //completar
 //agregar a listaPreguntas un elemento div con valor "clave.textoPregunta", texto "clave.textoPregunta", id "clave.id"
      $('<div>', {'id': clave.id, 'text': clave.textoPregunta, 'value': clave.textoPregunta}).appendTo(listaPreguntas)     
      var respuestas = clave.cantidadPorRespuesta;
      contex.mostrarRespuestas(listaPreguntas,respuestas, clave);
    })
  },

  //muestra respuestas
  mostrarRespuestas:function(listaPreguntas,respuestas, clave){
    respuestas.forEach (function(elemento) {
      listaPreguntas.append($('<input>', {
        type: 'radio',
        value: elemento.textoPregunta,
        name: clave.id,
      }));
      listaPreguntas.append($("<label>", {
        for: elemento.textoPregunta,
        text: elemento.textoPregunta
      }));
    });
  },

  dibujarGrafico: function(nombre, respuestas){
    var yaVotada = false;
    for(var i=1;i<respuestas.length;++i){
      if(respuestas[i][1]>0){
        yaVotada = true;
      }
    }
    var contex = this;
    google.charts.load("current", {packages:["corechart"]});
    google.charts.setOnLoadCallback(drawChart);
    function drawChart() {
      var data = google.visualization.arrayToDataTable(respuestas);

      var options = {
        title: nombre,
        is3D: true,
      };
      var ubicacion = contex.elementos.graficosDeTorta;
      var id = (nombre.replace(/\W/g, '')).split(' ').join('')+'_grafico';
      if($('#'+id).length){$('#'+id).remove()}
      var div = document.createElement('div');
      ubicacion.append(div);
      div.id = id;
      div.style.width = '400';
      div.style.height = '300px';
      var chart = new google.visualization.PieChart(div);
      if(yaVotada){
        chart.draw(data, options);
      }
    }
  },
};
