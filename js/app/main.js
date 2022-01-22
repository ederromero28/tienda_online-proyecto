$(window).on("load",function () {
    /* PRELOADER */
    $(".preloader").fadeOut("slow");
})

$(document).ready(function() {
    // NAVBAR SHRINK
    $(window).on("scroll", function(){
        if($(this).scrollTop() > 90){
            $(".navbar").addClass("navbar-shrink");
        }
        else{
            $(".navbar").removeClass("navbar-shrink");
        }
    });
    // VIDEO POPUP
    const videoSrc = $("#player-1").attr("src");
    $(".video-play-btn, .video-popup").on('click', function(){
        if($(".video-popup").hasClass("open")){
            $(".video-popup").removeClass("open");
            $("#player-1").attr("src","");
        }
        else{
            $(".video-popup").addClass("open");
            if ($("#player-1").attr("src")==''){
                $("#player-1").attr("src", videoSrc);
            }
        }
    });

    /*----PRODUCTOS TOP CAROUSEL--------*/
    $('.productos-carousel').owlCarousel({
        loop: true,
        margin: 0,
        autoplay:true,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
            },
            600: {
                items: 2,
            },
            1000: {
                items: 4,
            }
        }
    })

    /* PAGINA SCROLL - SCROLLIT */
    $.scrollIt({
        topOffset: -50
    });

    /* NAVBAR COLLAPSE */
    $(".nav-link").on("click", function() {
        $(".navbar-collapse").collapse("hide");
    });

    /* CAMBIO DE TEMA - Modo Normal & Oscuro */
    function toggleTheme() {
        if(localStorage.getItem("cambiar__tema") !==null ){
            if (localStorage.getItem("cambiar__tema") === "dark"){
                $("body").addClass("dark");
            }
            else{
                $("body").removeClass("dark");
            }
        }
        updateIcon();
    }
    toggleTheme();

    $(".modo-oscuro").on("click", function () {
        $("body").toggleClass("dark");
        if($("body").hasClass("dark")){
            localStorage.setItem("cambiar__tema", "dark");
        }
        else{
            localStorage.setItem("cambiar__tema", "light");
        }
        updateIcon();
    });

    function updateIcon() {
        if($("body").hasClass("dark")){
            $(".modo-oscuro i").removeClass("fa-moon");
            $(".modo-oscuro i").addClass("fa-sun");
        }
        else{
            $(".modo-oscuro i").removeClass("fa-sun");
            $(".modo-oscuro i").addClass("fa-moon");
        }
    }
});

/* FORMULARIO - BOTON PARA ENVIAR MENSAJE VIA WHATSAPP */
// Ayuda de youtube
document.querySelector("#submit").addEventListener("click", e => {
    e.preventDefault();

    //INGRESE UN NUMERO DE WHATSAPP VALIDO AQUI:
    let telefono = "51946502602";

    let cliente = document.querySelector("#cliente").value;
    let celular = document.querySelector("#celular").value;
    let email = document.querySelector("#email").value;
    let asunto = document.querySelector("#asunto").value;
    let mensaje = document.querySelector("#mensaje").value;
    let resp = document.querySelector("#respuesta");

    resp.classList.remove("fail");
    resp.classList.remove("send");

    let url = `https://api.whatsapp.com/send?phone=${telefono}&text=
		*_ELECTRO-PLUS ONLINE_*%0A
		*AYUDA AL CLIENTE*%0A%0A
		*NOMBRE DEL CLIENTE*%0A
		${cliente}%0A
		*NÚMERO DE CELULAR*%0A
		${celular}%0A
		*CORREO DEL CLIENTE*%0A
		${email}%0A
		*ASUNTO*%0A
		${asunto}%0A
		*LO QUE INDICA EL CLIENTE*%0A
		${mensaje}`;

    if (cliente === "" || celular === "" || email === "") {
        resp.classList.add("fail");
        resp.innerHTML = `Faltan algunos datos`;
        return false;
    }
    resp.classList.remove("fail");
    resp.classList.add("send");
    resp.innerHTML = `Se ha enviado tu reserva`;

    window.open(url);
});