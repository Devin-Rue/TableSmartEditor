function Init() {
 /*   $(function() {
    $('#originalImage').Jcrop({
            onChange: showCoords,
            onSelect: showCoords
        });
    });*/
    var jcrop_api;
    $(function() {
    //assegno ai campi dimensioni originali immagine
    $("#WNuovo").val($("#originalImage").width());
    $("#HNuovo").val($("#originalImage").height());
    $("#Woriginale").val($("#originalImage").width());
    $("#Horiginale").val($("#originalImage").height());
});

$("#ridimensiona").click(function () {
    //creo oggetto resize
    $("#originalImage").resizable({
        ghost: true,
        stop: function (event, ui) {
            var width = $(event.target).width();
            var height = $(event.target).height();
            $("#WNuovo").val(width);
            $("#HNuovo").val(height);
            $("#SeRidimensionato").val('1');

        }
    });

    //elimino oggetto crop
    if (jcrop_api != undefined) {
        jcrop_api.destroy();
        $(".ritaglia_button").removeClass("active");
        $(".SizeCrop").css("display", "none");
    }

    $(".DescrizioneRidimesiona").css("display", "");

    //assegno classi
    $(".ridimensiona_button").addClass("active");
    $(".ritaglia_button").removeClass("active");

    //vedo titoli
    $(".title-ridimensiona").show();
    $(".title-default").hide();
    $(".title-ritaglia").hide();
});
$("#AttivaProporzioni").click(function () {
    
    if ($("#ProporzioniAttive").val() == "1") {
        //disattivo proporzioni
        $("#ProporzioniAttive").val("0");
        $("#AP").hide();
        $("#AP2").show();
    } else {
        //attivo proporzioni
        $("#ProporzioniAttive").val("1");
        $("#AP").show();
        $("#AP2").hide();
    }

});
$("#WNuovo").change(function () {
    if (isNaN($("#WNuovo").val())) {
        alert("ATTENZIONE! Non hai inserito un numero");
        $("#WNuovo").val($("#originalImage").width());

    } else {
        SetSizeImage($("#WNuovo").val(), $("#HNuovo").val(), "width")
    }
   
});

$("#HNuovo").change(function () {
    if (isNaN($("#HNuovo").val())) {
        alert("ATTENZIONE! Non hai inserito un numero");
        $("#HNuovo").val($("#originalImage").height());

    } else {
        SetSizeImage($("#WNuovo").val(), $("#HNuovo").val(), "height")
    }

});

function arrotonda(numero) {
    var mySplitResult = String(numero).split(".");

    if (mySplitResult[1] != undefined) {
        numero = parseInt(mySplitResult[0]) + 1;
    }

    return numero
}
function SetSizeImage(w, h,tipo) {
    var new_w;
    var new_h;

    if ($("#ProporzioniAttive").val() == "1") {
        //se  ho bloccato proporzioni
         //cambio dimensioni se inseriti manualmente da utente
            var or_w = $("#Woriginale").val();
            var or_h = $("#Horiginale").val();
          
            
            //modificato width
            if (tipo == "width") {
                new_w = w;
                new_h = (or_h * w) / or_w;
            }

            //modificato height
            if (tipo == "height") {
                new_h = h;
                new_w = (or_w * h) / or_h;
            }
    
            //arrotondo cifra per accesso    
            new_w = arrotonda(new_w);
            new_h = arrotonda(new_h);
        } else {
            //se non ho bloccato proporzioni
            new_w = w;
            new_h = h;
    }

     


    $("#originalImage").width(new_w);
    $("#originalImage").height(new_h);
    $(".ui-wrapper").width(new_w);
    $(".ui-wrapper").height(new_h);
    $("#WNuovo").val(new_w);
    $("#HNuovo").val(new_h);


    /*
    $("#originalImage").width(w);
    $("#originalImage").height(h);
    $(".ui-wrapper").width(w);
    $(".ui-wrapper").height(h);*/


    $("#SeRidimensionato").val('1');
    
}
$("#ritaglia").click(function () {

    //elimino oggetto resize
    $("#originalImage").resizable("destroy");

    if ($("#ritaglia").attr("class") == '') {
        //creo oggetto crop
        jcrop_api = $.Jcrop('#originalImage', {
            onChange: showCoords,
            onSelect: showCoords
        });
        $(".ritaglia_button").addClass("active");

        $(".SizeCrop").css("display", "");
        $(".DescrizioneRidimesiona").css("display", "none");
    }
    //assegno classi
    $(".ridimensiona_button").removeClass("active");
    $(".ritaglia_button").addClass("active");

    //vedo titoli
    $(".title-ritaglia").show();
$(".title-ridimensiona").hide();
    $(".title-default").hide();

});

// Patch for IE to force "overflow: auto;"
if (document.getElementById("imgContainer") != null) {
    document.getElementById("imgContainer").style["position"] = "relative";
}
    
}

function showCoords(c) {
    $('#x1').val(c.x);
    $('#y1').val(c.y);
    $('#x2').val(c.x2);
    $('#y2').val(c.y2);
    $('#wcrop').val(c.w);
    $('#hcrop').val(c.h);
};

function ValidateSelected() {
    if (document.getElementById("wcrop").value == "" || document.getElementById("wcrop").value == "0"
        || document.getElementById("hcrop").value == "" || document.getElementById("hcrop").value == "0") {
        alert("Non hai selezionato nessun area di ritaglio");
        return false;
    }
}