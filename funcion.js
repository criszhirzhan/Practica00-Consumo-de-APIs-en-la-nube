var data;
var overlay;
var popup;
var btnCerrarPopup;
var dataDetalles;
var portada = "";
var titulo = "";
var anio = "";
var nominal = "";
var duracion = "";
var genero = "";
var estreno = "";
var director = "";
var resumen = "";
var numPagina = 1;
var totalResult = 0;

function buscarPorTitulo() {
    numPagina = 1;
    var titulo = document.getElementById("nombreMovie").value;
    var detalles = "";
    if (titulo == "") {
        detalles = "<tr>" +
            "<td colspan='5'>No informacion disponible...</td>" +
            "</tr>";
        document.getElementById("tableDetallesPeliculas").innerHTML = detalles;
    } else {
        if (window.XMLHttpRequest) {
            xmlhttp = new XMLHttpRequest();
        } else {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                data = JSON.parse(this.responseText)
                console.log(Math.round((data.totalResults)/10));
                totalResult = Math.round((data.totalResults)/10);
                desactivar();
                data.Search.forEach(movie => {
                    detalles += "<tr>" +
                        "<td><a href='#'  style='text-decoration:none'     onclick=\"buscarPorID('" + movie.imdbID + "')\">'<i class='fa fa-eye'></i>'</a>" +
                        "<td>" + movie.Title + "</td>" +
                        "<td>" + movie.Year + "</td>" +
                        "<td>" + movie.Type + "</td>" +
                        "<td><img src=" + movie.Poster + "></td" +
                        "</tr>";
                });
                document.getElementById("tableDetallesPeliculas").innerHTML = detalles;
            }
        };

        xmlhttp.open("GET", "https://www.omdbapi.com/?apikey=e38ce2e0&s=" + titulo + "&plot=full", true);
        xmlhttp.send();
    }
}



function paginar(numPaginaAct) {
    var titulo = document.getElementById("nombreMovie").value;
    var detalles = "";
    desactivar();
    if (titulo == "") {
        detalles = "<tr>" +
            "<td colspan='5'>No informacion disponible...</td>" +
            "</tr>";
        document.getElementById("tableDetallesPeliculas").innerHTML = detalles;
    } else {
        if (window.XMLHttpRequest) {
            xmlhttp = new XMLHttpRequest();
        } else {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                data = JSON.parse(this.responseText)
                data.Search.forEach(movie => {
                    detalles += "<tr>" +
                        "<td><a href='#'  style='text-decoration:none'     onclick=\"buscarPorID('" + movie.imdbID + "')\">'<i class='fa fa-eye'></i>'</a>" +
                        "<td>" + movie.Title + "</td>" +
                        "<td>" + movie.Year + "</td>" +
                        "<td>" + movie.Type + "</td>" +
                        "<td><img src=" + movie.Poster + "></td" +
                        "</tr>";
                });
                document.getElementById("tableDetallesPeliculas").innerHTML = detalles;
            }
        };

        xmlhttp.open("GET", "https://www.omdbapi.com/?apikey=e38ce2e0&s=" + titulo + "&plot=full&page=" + numPaginaAct, true);
        xmlhttp.send();
    }
}





function DataFullMuvies(idP) {
    if (idP == "") {
        detalles = "<tr>" +
            "<td colspan='5'>No informacion disponible...</td>" +
            "</tr>";
        document.getElementById("tableDetallesPeliculas").innerHTML = detalles;
    } else {
        if (window.XMLHttpRequest) {
            xmlhttp = new XMLHttpRequest();
        } else {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }

        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                dataDetalles = JSON.parse(this.responseText)
                portada = "<img src=" + dataDetalles.Poster + ">";
                titulo = dataDetalles.Title;
                anio = dataDetalles.Year;
                nominal = dataDetalles.Rated;
                duracion = dataDetalles.Runtime;
                genero = dataDetalles.Genre;
                estreno = dataDetalles.Released;
                director = dataDetalles.Director;
                resumen = dataDetalles.Plot;
                document.getElementById("texto1").innerHTML = titulo;
                document.getElementById("portada").innerHTML = portada;
                document.getElementById("anioM").innerHTML = anio;
                document.getElementById("nomimaM").innerHTML = nominal;
                document.getElementById("estrenoM").innerHTML = estreno;
                document.getElementById("duracionM").innerHTML = duracion;
                document.getElementById("generoM").innerHTML = genero;
                document.getElementById("directorM").innerHTML = director;
                document.getElementById("resumenM").innerHTML = resumen;
            }
        };
        xmlhttp.open("GET", "https://www.omdbapi.com/?i=" + idP + "&apikey=e38ce2e0&s", true);
        xmlhttp.send();
    }

}

function buscarPorID(id) {
    data.Search.forEach(movieB => {
        if (movieB.imdbID == id) {
            DataFullMuvies(id);
        }

    });
    overlay = document.getElementById('overlay');
    popup = document.getElementById('popup');



    overlay.classList.add('active');
    popup.classList.add('active');
}

function cerrarPopup() {
    overlay = document.getElementById('overlay');
    popup = document.getElementById('popup');
    overlay.classList.remove('active');
    popup.classList.remove('active');
}

function siguientePagina() {
    //  console.log(numPagina);
    numPagina = numPagina + 1;
    paginar(numPagina);
}

function anteriorPagina() {
    //  console.log(numPagina);
    numPagina = numPagina - 1;
    paginar(numPagina);
}

function desactivar() {
    var botonAtras = document.getElementById("atrasbtn");
    var botonSiguiente = document.getElementById("siguientebtn");
   
    botonSiguiente.disabled = false;

    if(numPagina==1){
        botonAtras.disabled = true;
    }else {
        botonAtras.disabled = false;
    }

    if(numPagina<totalResult){
        botonSiguiente.disabled = false;
    }else if(numPagina==totalResult){
        botonSiguiente.disabled = true;
    }

    if(totalResult==0){
        botonSiguiente.disabled = true;
        botonAtras.disabled = true;
    }


}
