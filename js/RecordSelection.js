$(document).ready(function () {

    //cookie contentente gli id dei record selezionati
    $.cookie("idSelected", "");
    $("#TabellaDati td input").click(function () {
        var parentCheck

        parentCheck = $(this).parent().parent().parent();

        var myID = $(this).attr("name").split("check_")[1];
        var newCookie, oldCookie;
        var arrayIDSel;
        oldCookie = $.cookie("idSelected");
        if (oldCookie != null)
            arrayIDSel = oldCookie.split("&");


        if ($(this).is(":checked")) {
            parentCheck.addClass('GridViewHighlightRowStyle');
            if (oldCookie != null)
                newCookie = oldCookie + myID;
            else
                newCookie = myID;
        }
        else {
            parentCheck.removeClass('GridViewHighlightRowStyle');
            var IDsel;
            newCookie = "";
            for (var i = 0; i < arrayIDSel.length; i++) {
                if (arrayIDSel[i] != "") {
                    IDsel = arrayIDSel[i] + "&";
                    if (IDsel != myID) {
                        newCookie += IDsel
                    }
                }
            }

        }

        $.cookie("idSelected", newCookie);

    });

    $("#selectAll").click(function () {
		
        $.cookie("idSelected", "");
		
		if ($(this).is(":checked")) {
			var newCookie="";

			$("#TabellaDati tr").each(function(){				
				if (($(this).attr("class")!="Pager") && ($(this).attr("class")!="GridViewHeaderStyle") && ($(this).attr("class")!="GridViewFooterStyle") && ($(this).attr("class")!="GridViewPagerStyle") && ($(this).attr("class")!=null)){
					$(this).addClass('GridViewHighlightRowStyle');
					$element = $(this).children().children().children();

					if($element.attr("name").length){
						$element.attr("checked", true);
						newCookie += $element.attr("name").split("check_")[1];
					}
				}		
				
			})
			 $.cookie("idSelected", newCookie);


        
        }
        else {

			$("#TabellaDati tr").each(function(){				
				if (($(this).attr("class")!="Pager") && ($(this).attr("class")!="GridViewHeaderStyle") && ($(this).attr("class")!="GridViewFooterStyle") && ($(this).attr("class")!="GridViewPagerStyle") && ($(this).attr("class")!=null)){
					$(this).removeClass('GridViewHighlightRowStyle');
					$element = $(this).children().children().children();

					if($element.attr("name").length){
						$element.attr("checked", false);
					}
				}
			
				
			})       
        }
    });

    //pulsante menu operazioni tabella
    $("#PanelAddOtherButton a").first().click(function () {
        $('ul.nav').slideToggle("slow");
    });
    $("#PanelAddOtherButton ul.nav li").click(function () {
        if ($(this).children("ul").length > 0) {
            if (!$(this).children("ul").is(":visible")) {
                $("#PanelAddOtherButton ul.nav li ul").slideUp("slow")
            }
            $(this).children("ul").slideToggle("slow");
        }        
    });

});


function btnConfermaQuery(operation,ripristino) {

    var cookieIdSelected = $.cookie("idSelected");
    if ((cookieIdSelected != null) && (cookieIdSelected != "")) {
        var arrayIDSel = cookieIdSelected.split("&");
        var numRecord = arrayIDSel.length - 1
        var textMsg;
        if (numRecord == 1) {
            textMsg = SelectedRecordCaption;
        } else {
            textMsg = MoreSelectedRecordCaption.replace("[numberRecord]", numRecord);
        }


        if (ripristino == "1") {
            ripristino = "";
        } else {
            ripristino = "\n" + DateNotRestoredCaption;
        }

        if (confirm(ValidateSelectedCaption + ' ' + operation + ' ' + textMsg + "?" + ripristino)) {
            return true;
        }else{
            return false;
        }


    }
    else {
        OpenDialog_Message(AlertRecordSelectedCaption, "<div>" + RecordToSelectedCaption + " " + operation + "</div>", 350, 180);
        return false;
    }
}


function moreThen50RecordSelected() {    
    var numRecord = 0;
    var cookieIdSelected = $.cookie("idSelected");
    if ((cookieIdSelected != null) && (cookieIdSelected != "")) {
        var arrayIDSel = cookieIdSelected.split("&");
        numRecord = arrayIDSel.length - 1        
    }
    else {
        numRecord = parseInt($("#totalerecord").html());
    }

    if (numRecord > 50) {
        alert("Non e' possibile stampare piu' di 50 tessere contemporaneamente. \nFiltrare i record da stampare o selezionarli spuntando la casella di \nselezione a sinistra del record");
        return false;
    }
    else {
        return true;
    }
   

}

function NoRecordSelected() {
    var numRecord = 0;
    var cookieIdSelected = $.cookie("idSelected");
    if (!((cookieIdSelected != null) && (cookieIdSelected != ""))) {
        alert(NoRecordSelectedCaption);
        return false;
    }
    else {
        return true;
    }


}