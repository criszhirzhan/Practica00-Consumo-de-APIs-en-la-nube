var data;
var overlay;
var popup;
var btnCerrarPopup;



function buscarPorTitulo() {
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
                data.Search.forEach(movie => {
                    detalles += "<tr>" +
                        "<td><a href='#' onclick=\"buscarPorID('" + movie.imdbID + "')\">Ver Detalles</a>" +
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

function buscarPorID(id) {
    var portada = "";
    var titulo = "";
    var anio = "";
    data.Search.forEach(movieB => {
        if (movieB.imdbID == id) {
            console.log(movieB.Title);
            portada = "<img src=" + movieB.Poster + ">";
            titulo = movieB.Title;
            anio = movieB.Year;
        }

    });


    document.getElementById("texto1").innerHTML = titulo;
    document.getElementById("portada").innerHTML = portada;
    document.getElementById("anioP").innerHTML = anio;
    overlay = document.getElementById('overlay');
    popup = document.getElementById('popup');



    overlay.classList.add('active');
    popup.classList.add('active');




    // document.getElementById("venInformacion").innerHTML = portada;


}

function cerrarPopup(){
    overlay = document.getElementById('overlay');
    popup = document.getElementById('popup');
    overlay.classList.remove('active');
    popup.classList.remove('active');
}
