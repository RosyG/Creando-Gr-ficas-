console.log(data);

var selecSprint=document.getElementById("selecSprint");//Por medio de DOM guardo en una variable las opciones del sprint que puede seleccionar del user.
selecSprint.addEventListener("change", selectionSprint);//Creando el evento cambio, para detectar lo que el user selecciona.

function selectionSprint(event) {

  var selectIndex = event.target.selectedIndex;//Me arroja el indice empezando en 0 y hasta 10
  //selectIndex es un comando de JS que me devuelve el indice del elemento que detoma el evento.
  var option = event.target[selectIndex];//Se muestra el tag option que fue seleccionado, sirve para saber que cambio u option es el que se esta seleccionando.
  var sprint = option.dataset.sprint;//Accediendo al data-sprint del tag option, puede ser 1, 2, 3 o 4.
  console.log(sprint);
  //Hasta aquí se tienen como variables al sprint y un dato fijo es students y ratings.

  var studentsSprint = data["AQP"]["2016-2"]["students"][0]["sprints"][sprint];
  //console.log(studentsSprint);

  var ratingsSprint= data["AQP"]["2016-2"]["ratings"][sprint];
  console.log(ratingsSprint);

  //Puntuación a l@s Jedi Master.
  var scoreJedi = ratingsSprint["jedi"];
  //Puntuación a l@s profesoes
  var scoreTeacher = ratingsSprint["teacher"];
  //Satisfacción de las estudiantes por su experiencia en Laboratoria.
  var unSatisfiedSprint = ratingsSprint["student"]["no-cumple"];

  var satisfiedSprint = 100- unSatisfiedSprint;

  //NPS
  var promoterSprint = ratingsSprint["nps"]["promoters"];
  var detractorSprint = ratingsSprint["nps"]["detractors"];
  var npsSprint= promoterSprint - detractorSprint;
  //Promedio mayor al 70% en tech.

  //Promedio mayor al 70% en hse.


  //Gráfica de la satisfación de las estudiantes.
  google.charts.load("current", {packages:["corechart"]});
  google.charts.setOnLoadCallback(drawChartSatisfiedSprint);
  function drawChartSatisfiedSprint() {
    var data = google.visualization.arrayToDataTable([
      ['aprobación', 'promedio por sprint'],
      ['Satisfechas', satisfiedSprint],
      ['Insatisfechas', unSatisfiedSprint],
    ]);
    var options = {
      title: 'Porcentaje por Sprint de las estudiantes satisfechas por su experiencia en Laboratoria',
      pieHole: 0.4,
      slices: {
       0: { color: '#27d5db' },
       1: { color: '#1835a5' }
      }
   }

    var chart = new google.visualization.PieChart(document.getElementById('satisfied'));
    chart.draw(data, options);
  } //Fin de la función drawChartSatisfiedSprint.

  //Gráfica de las puntuaciones de los teachers en promedio.
  google.charts.load('current', {'packages':['corechart']});
  google.charts.setOnLoadCallback(drawCharTeacher);
  function drawCharTeacher() {
    var data = google.visualization.arrayToDataTable([
      ['Teacher', 'PromedioTeacher', { role: 'style' }],
      ['Teacher', scoreTeacher, 'stroke-color: #871B47; stroke-opacity: 0.6; stroke-width: 8; fill-color: #BC5679; fill-opacity: 0.2']

    ]);

    var options = {
        title: 'Puntuación promedio de l@s profesores'
         }
    var chart = new google.visualization.ColumnChart(document.getElementById("teacher"));
    chart.draw(data, options);
  }//Fin de la función drawCharTeacher.
  //Gráfica de las puntuaciones de los Jedi en promedio.
  google.charts.load('current', {'packages':['corechart']});
  google.charts.setOnLoadCallback(drawCharJedi);
  function drawCharJedi() {
    var data = google.visualization.arrayToDataTable([
      ['Jedi', 'PromedioJedi', { role: 'style' }],
      ['Jedi', scoreJedi, 'stroke-color: #459A81; stroke-opacity: 0.6; stroke-width: 8; fill-color: #BC5679; fill-opacity: 0.2']
    ]);

    var options = {
        title: 'Puntuación promedio de l@s Jedi Master',
        }
    var chart = new google.visualization.ColumnChart(document.getElementById("jedi"));
    chart.draw(data, options);
  }//Fin de la función drawCharJedi.
}//Fin de la función selectionSprint().
