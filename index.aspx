<!--
 * Table Smart Editor
 * Copyright 2011, (http://www.laboratre.com)
 * Licensed under the GPL Version 2 licenses.
 * http://www.tablesmarteditor.com
 *-->

<%@ Page Language="C#" AutoEventWireup="true" CodeFile="index.aspx.cs" Inherits="index" %>

<%@ Register Assembly="LB3TSE" Namespace="LB3TSE" TagPrefix="LB3TSE" %>
<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="ajaxToolkit" %>

<!--User Control-->
<%@ Register TagPrefix="uc" TagName="Page" Src="WelcomePage.ascx" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<%if (Request.QueryString["DetailTable"] != "1")
  {%>
<head>
    <meta content="IE=Edg" http-equiv="X-UA-Compatible" />
    <link rel="icon" type="image/ico" href="http://<%=HttpContext.Current.Request.ServerVariables["HTTP_host"] %>/images/favicon.ico" />
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>
        <%if (TableTitle == "")
          {%>
        <%= AppTitle%>
        <%}
          else
          { %>
        <%= TableTitle%>
        <%}%>
        -
        <%=System.Configuration.ConfigurationManager.AppSettings["AppDescription"] %>
    </title>
    <!--Javascript-->
    <script type="text/javascript" src="js/jquery-min.js"></script>
    <script type="text/javascript" src="js/jquery-ui-custom.min.js"></script>
    <script type="text/javascript" src="js/jquery.ui.datepicker.range.js"></script>
    <script type="text/javascript" src="<%=System.Configuration.ConfigurationManager.AppSettings["DatePickerLangFile"]%>"></script>
    <script type="text/javascript" src="js/timepicker.js"></script>
    <script type="text/javascript" src="js/jpicker/jpicker-1.1.6.min.js"></script>
    <script type="text/javascript" src="js/jquery-framedialog-1.1.2.js"></script>
    <script type="text/javascript" src="js/jquery.autocomplete.js"></script>
    <script type="text/javascript" src="js/Guiders/guiders-1.3.0.js"></script>
    <script type="text/javascript" src="<%=System.Configuration.ConfigurationManager.AppSettings["AppDescription"] %>/Guiders/guidersSettings.js"></script>

    <!--<script src="js/jquery.maskedinput-1.3.js" type="text/javascript"></script>-->
    <script type="text/javascript" src="js/jquery.highlight-3.js"></script>
    <script type="text/javascript" src="js/date-en-US.js"></script> <!-- Added by Devin -->


    <!--Javascript Included from Web.config-->
    <%WriteJSLink();%>

    <!--CSS-->
    <link rel="stylesheet" href="css/timepicker.css" type="text/css" />
    <link rel="stylesheet" href="css/jquery.autocomplete.css" type="text/css" />
    <link rel="stylesheet" href="js/jpicker/css/jPicker-1.1.6.css" type="text/css" />
    <link rel="stylesheet" href="js/jpicker/jPicker.css" type="text/css" />
    <link rel="stylesheet" href="css/Guiders/guiders-1.3.0.css" type="text/css" />
    <link rel="stylesheet" href="css/Guiders/GuidersSettings.css" type="text/css" />
	<link rel="stylesheet" href="css/cms.css" type="text/css" /> <!-- Added by Devin -->

    

    <!--CSS and Bg image for home -->
    <%WriteCssLink();%>
    <script type="text/javascript">
        var DateNotRestoredCaption="<%=System.Configuration.ConfigurationManager.AppSettings["DateNotRestoredCaption"]%>";
        var SelectedRecordCaption="<%=System.Configuration.ConfigurationManager.AppSettings["SelectedRecordCaption"]%>";
        var AlertRecordSelectedCaption="<%=System.Configuration.ConfigurationManager.AppSettings["AlertRecordSelectedCaption"]%>";
        var NoRecordSelectedCaption="<%=System.Configuration.ConfigurationManager.AppSettings["NoRecordSelectedCaption"]%>"
        var RecordToSelectedCaption="<%=System.Configuration.ConfigurationManager.AppSettings["RecordToSelectedCaption"]%>"
        var ValidateSelectedCaption="<%=System.Configuration.ConfigurationManager.AppSettings["ValidateSelectedCaption"]%>"
        var MoreSelectedRecordCaption="<%=System.Configuration.ConfigurationManager.AppSettings["MoreSelectedRecordCaption"]%>"


    function OpenDialog_Message(Title,Message,Larghezza,Altezza){
        $(Message).dialog({
        modal: true,
        title:Title,
        width: Larghezza,
        height: Altezza,
        buttons: {
        Ok: function() {
        $( this ).dialog( "close" );
        }
        }
        });
        ;}


    function NoDoubleClick(ID){
        //Evito Doppio click
        if ($('#'+ID).attr("disabled")=="disabled"){
            return false;
        }else{
            //Lock sul pulsante Cancella
            $('#'+ID).attr("disabled", "disabled");
            if (ID=="SaveBtn"){
                $('#'+ID).text("<%=System.Configuration.ConfigurationManager.AppSettings["SavingBtnCaption"]%>");
            }else{
                $('#'+ID).text("<%=System.Configuration.ConfigurationManager.AppSettings["DeletingBtnCaption"]%>");
            }
            //Nascondo pulsante annulla
            $(".annulla_button").hide();

            return true;
            }
        }

    function OpenDialog_TabRelation(Url, Title, Larghezza, Altezza) {

        //Relation depending from an Id taken from form view stated in InsertTabRelation
        if (Url.indexOf("[") != -1) {
            var SplitId = Url.split("[");
            var NomeCampo = SplitId[1].replace("[", "").replace("]", "");
            element = $(this.document).find('#RecordTable input#' + NomeCampo);
            if (element != null) {
                if (element.val() != "") {
                    Url = SplitId[0] + element.val();
                } else {
                    Url = Url.substring(0, SplitId[0].indexOf("&StrWhere="));
                }
            }
        }

        if (Larghezza == "") {
            if (navigator.userAgent.toLowerCase().indexOf('msie') > -1)
                Larghezza = screen.width - 50;
            else
                Larghezza = $(window).width() - 30;

        }
        else if (navigator.userAgent.toLowerCase().indexOf('msie') > -1) {
            Larghezza = screen.width - 50;
        }
        if (Altezza == "") {
            if (navigator.userAgent.toLowerCase().indexOf('msie') > -1)
                Altezza = screen.height - 140;
            else
                Altezza = $(window).height() - 30;
        }
        else if (navigator.userAgent.toLowerCase().indexOf('msie') > -1) {
            Altezza = screen.height - 140;
        }

          
        var $dialog =
                    jQuery.FrameDialog.create({
                        url: Url,
                        loadingClass: 'loading-image',
                        title: Title,
                        width: Larghezza,
                        height: Altezza,
                        position: 'left,top',
                        autoOpen: false,
                        buttons: {
                            '<%=System.Configuration.ConfigurationManager.AppSettings["CloseFrameBtnCaption"]%>': function () {
                                $(this).dialog('close');
                            }
                        }                        
                    });
                        
        $dialog.dialog('open');
              
        return false;

    }

        function OpenDialog_Frame(Url, Title, Larghezza, Altezza,refreshPage) {

            if (Larghezza == "") {
                if (navigator.userAgent.toLowerCase().indexOf('msie') > -1)
                    Larghezza = screen.width - 50;
                else
                    Larghezza = $(window).width() - 30;

            }
            else if (navigator.userAgent.toLowerCase().indexOf('msie') > -1) {
                Larghezza = screen.width - 50;
            }
            if (Altezza == "") {
                if (navigator.userAgent.toLowerCase().indexOf('msie') > -1)
                    Altezza = screen.height - 140;
                else
                    Altezza = $(window).height() - 30;
            }
            else if (navigator.userAgent.toLowerCase().indexOf('msie') > -1) {
                Altezza = screen.height - 140;
            }

            var $dialog =
                        jQuery.FrameDialog.create({
                            url: Url,
                            loadingClass: 'loading-image',
                            width: Larghezza,
                            height: Altezza,
                            title: Title,
                            position: 'center,center',
                            autoOpen: false,
                            buttons: {
                                '<%=System.Configuration.ConfigurationManager.AppSettings["CloseFrameBtnCaption"]%>': function () {
                                    $(this).dialog('close');
                                    if (!(refreshPage === undefined))
                                    {
                                        if (refreshPage)
                                            window.location.href=window.location.href;
                                    }
                                }
                            }
                        });
                        
            $dialog.dialog('open');
                              
         
            return false;
        }

        function FiltersInsertTabRelation(NomeCampo, Valore, Descrizione, OtherFields) {
            element = $(window.parent.document).find("[id$=" + NomeCampo.toLowerCase() + "]");

            if (element != null) {
                element.val(Valore);
                if (navigator.userAgent.toLowerCase().indexOf('msie') > -1) //Fix for IE
                    element.change();
                else
                    element.trigger('change');
            }

            element = $(window.parent.document).find("[id$=" + NomeCampo.toLowerCase() + "_Descr]");
            if (element != null) element.val(Descrizione);

            if (OtherFields != "") {
                var espr = /[a-zA-Z]+/;
                var index = NomeCampo.split(espr);
                var OFields = OtherFields.split(";");
                var campoValore;
                for (var i = 0; i < OFields.length; i++) {
                    //campoValore[0]:destination field; campoValore[1]:value
                    campoValore = OFields[i].split(",");

                    /* Check if Description value is needed*/
                    if((campoValore[0].split("Descr_")).length > 1)
                        element = $(window.parent.document).find('#RecordTable input#Descr_' + index[0] + campoValore[0].replace("Descr_","").toLowerCase());
                    else
                        element = $(window.parent.document).find('#RecordTable input#' + index[0] + campoValore[0].toLowerCase());

                    element = $(window.parent.document).find("[id$=_" + index[0] + campoValore[0].toLowerCase() + "]");
                    if (element != null) {
                        if (navigator.userAgent.toLowerCase().indexOf('msie') > -1) //Fix for IE
                            element.change();
                        else
                            element.val(campoValore[1]).trigger('change');
                    }
                }
            }

            jQuery.FrameDialog.closeDialog();
        }

        function InsertTabRelation(NomeCampo, Valore, Descrizione, OtherFields) {
            if((element = $(window.parent.document).find('#RecordTable input#' + NomeCampo.toLowerCase())).length == 0)
                element = $(window.parent.document).find("[id$=_"+ NomeCampo.toLowerCase() + "]");
           
            if (element != null) {
                element.val(Valore);

                if (navigator.userAgent.toLowerCase().indexOf('msie') > -1) //Fix for IE
                    element.change();
                else
                    element.trigger('change');
            }

            if((element = $(window.parent.document).find('#RecordTable input#Descr_' + NomeCampo.toLowerCase())).length == 0)
                element = $(window.parent.document).find("[id$=Descr_"+ NomeCampo.toLowerCase() + "]");
            if (element != null) element.val(Descrizione);


            <% if (System.Configuration.ConfigurationManager.AppSettings["AppDescription"] == "Software Semplice")
                    {%>
            /*Software Semplice: GRID - Code For Laboratre.
             ---------------------------------*/
            var espr = /[a-zA-Z]+/;
            var index = NomeCampo.split(espr);
            espr = /[0-9]+/;
            var field = NomeCampo.split(espr);
            /*--------------------------------*/
            <%}%>

            if(OtherFields != ""){
                var espr = /[a-zA-Z]+/;
                var index = NomeCampo.split(espr);
                index[0] = (((index[0] != undefined) || (index[0] != null)) ? index[0] : ""); //FIX IE

                var OFields = OtherFields.split(";");
                var campoValore;
                for(var i = 0; i<OFields.length; i++){
                    //campoValore[0]:destination field; campoValore[1]:value
                    campoValore = OFields[i].split(",");

                                        
                    if(campoValore[0].length > 1){
                        /*If checkbox*/
                        if (campoValore[1]=="Bit_TRUE" || campoValore[1]=="Bit_FALSE"){//Se tipo BIT
                            if((element = $(window.parent.document).find('#' + index[0] + campoValore[0].toLowerCase())).length > 0){//Se esiste il controllo
                                
                                if (campoValore[1]=="Bit_TRUE"){
                                    element.attr('checked', true);
                                }else if (campoValore[1]=="Bit_FALSE"){
                                    element.attr('checked', false);
                                }
                            }
                        }
                    }

                    if((campoValore[0].split("Descr_")).length > 1){
                        element = $(window.parent.document).find('#RecordTable input#Descr_' + index[0] + campoValore[0].replace("Descr_","").toLowerCase());
                        element.val(campoValore[1].replace("§§",","));

                        if (navigator.userAgent.toLowerCase().indexOf('msie') > -1) //Fix for IE
                            element.change();
                        else
                            element.trigger('change');
                    }

                    if((element = $(window.parent.document).find('#RecordTable input#' + index[0] + campoValore[0].toLowerCase())).length == 0){
                        element = $(window.parent.document).find("[id$=_"+ index[0] + campoValore[0].toLowerCase() + "]");
                    }
                    else{
                        //campo immagine
                        if (element.attr("class")== "FileUpload") {
                            var image = $(window.parent.document).find('img[id^=ThumbImage' + index[0] + campoValore[0].toLowerCase() + ']')                        
                        
                            if(image.length > 0) { 
                                image.css({ 'display': 'block' });
                                var startSrc = image.attr('src').substring(0,image.attr('src').lastIndexOf("/")) + "/" + campoValore[1].replace(/§§/g, ",") + "&w=50" ;                               
                                image.attr('src',startSrc)                                 
                            }
                            else{
                                element.after("<img src='thumbnailimage.aspx?filename=../public/offerte/" + campoValore[1].replace(/§§/g, ",") +"&w=50' class='ThumbImage' id='ThumbImage" + index[0] + campoValore[0].toLowerCase() + "'>");
                            }
                        }
                            
                    }

                    //campi memo
                    if (element.length == 0){                                                   
                        element = $(window.parent.document).find('#' + index[0] + campoValore[0].toLowerCase() +'_ifr').contents().find("body").html(campoValore[1].replace(/§§/g, ","));
                    }


                        
                        if (element != null) {

                            if (navigator.userAgent.toLowerCase().indexOf('msie') > -1) //Fix for IE
                                element.val(campoValore[1].replace("§§",",")).change();
                            else
                                element.val(campoValore[1].replace("§§",",")).trigger('change');

                    }
                }
            }
                    

            <% if (System.Configuration.ConfigurationManager.AppSettings["AppDescription"] == "Software Semplice"){%>
            /*Software Semplice - Laboratre code
           --------------------------------------------------------*/
            //Se CodIva, CodArt applica Formula
            var fieldToCheck="";
            if (($.browser.msie) && ($.browser.version == "8.0")) //Fix for IE
                fieldToCheck = field[0];
            else
                fieldToCheck = field[1];

            if((fieldToCheck == "CodIva") || (fieldToCheck == "CodArt")){
                Formula(index[0],true);
                checkRow(index[0]);
            }
                    
            /*------------------------------------------------------*/
            <%}%>

            jQuery.FrameDialog.closeDialog();

        
        }

        function ClearField(NomeCampo) {
            element = $(this.document).find("[id$="+ NomeCampo.toLowerCase() + "]");
            if (element != null) element.val("");

            element = $(this.document).find("[id$=Descr_"+ NomeCampo.toLowerCase() + "]");
            if (element != null) element.val("");

        }

        function AllowButtonFolder(NomeCampo, NomeTabella) {
            inputelement = $(this.document).find('#RecordTable input#' + NomeCampo);
            var text = inputelement.val();

            linkelement = $(this.document).find('#RecordTable a#btnCreateFolder' + NomeCampo + NomeTabella)
            linkelement2 = $(this.document).find('#RecordTable a#btnViewFolder' + NomeCampo + NomeTabella)
            if (text == '') {
                linkelement.css({ 'display': 'none' });
                linkelement2.css({ 'display': 'none' });
            }
            else {
                linkelement.css({ 'display': '' });
                linkelement2.css({ 'display': '' });
            }
        }

        function ExecOperation(CampoTotale,Calcolo){            
            Calcolo = Calcolo.replace(/{/g,"(parseFloat($('#");
            Calcolo = Calcolo.replace(/}/g,"').val().replace(',','.')) || 0)");

            
            $("#" + CampoTotale).val(eval(Calcolo).toFixed(2).toString().replace(".",",")).change();            
        }

        function UpdateFileLinks(NomeCampo, NomeTabella, Path, Width, Height) {
            inputelement = $(this.document).find('#RecordTable input#' + NomeCampo);
            var text = inputelement.val();

            //Update image thumb
            image = $(this.document).find('#RecordTable #ThumbImage' + NomeCampo + NomeTabella)
            if(image.length) { /* if control found */ 
                if (text == '') {
                    image.css({ 'display': 'none' });
                }
                else {
                    //If image
                    if (text.toLowerCase().indexOf(".jpg") != -1 || text.toLowerCase().indexOf(".png") != -1 || text.toLowerCase().indexOf(".gif") != -1) {
                        image.css({ 'display': 'block' });
                        image.attr('src', 'thumbnailimage.aspx?filename=' + Path + text + '&w=' + Width + '&h=' + Height);
                    } else { image.css({ 'display': 'none' }); }
                }
            }

            //Update image link
            LinkDownload = $(this.document).find('#RecordTable #btnDownloadFile' + NomeCampo + NomeTabella)
            if (text != '') {
                LinkDownload.attr('onclick', 'javascript:window.open(\'' + Path + text + '\',\'Download\')');
                LinkDownload.attr('title', 'Download ' + text);
            }

        }

        function LoadDetailTable(NomeTabella, StrWhere) {
            $('#DetailTable #DetailTableSection').remove();

            //randomNum for browser cache update
            var randomNum = Math.floor(Math.random() * 1234567898)
            $('#DetailTable').load('index.aspx?name=' + NomeTabella + '&mode=0&NoHeader=1&StrWhere=' + StrWhere + '&StrOrderBy=&DetailTable=1&rnd=' + randomNum + ' #DetailTableSection', function () {
                frame = $(this.document).find('.ui-dialog');
                if (frame != null) {
                    $('.ui-dialog').remove();
                    $('.ui-widget-overlay').remove();
                }
                $('#DetailTable').css({ padding: '10px 0' });

            });
        }

        // commented out by Devin
        // no idea why this is here honesetly, lets anyone instantly change bit fields without confirmation regardless of permissions
        //function CheckBoxClick(Table, fieldName, PKFieldName, PKFieldValue) {
        //    var active;            
        //    if (Cell.find("span").attr('class') == 'ui-icon ui-icon-check') {
        //        /* Remove CheckBox tick*/
        //        Cell.find("span").attr('class', 'ui-icon ui-icon-grip-dotted-horizontal');
        //        active = 0;
        //    }
        //    else {
        //        /* tick CheckBox*/
        //        Cell.find("span").attr('class', 'ui-icon ui-icon-check');
        //        active = 1;
        //    }

        //        /* save on DB*/
        //        $(function () {
        //            $.ajax({
        //                url: "Funzioni.aspx",
        //                type: "GET", // POST or GET
        //                dataType: "json", // Tell it we're retrieving JSON
        //                data: {
        //                    op: "CheckBoxClick",                        
        //                    table: Table,
        //                    fieldNameToCheck: PKFieldName,
        //                    valueToCheck: PKFieldValue,                        
        //                    fieldNameToUpdate: fieldName,
        //                    valueToUpdate: active
        //                }
        //            }); // fine ajax
        //        });
        //}


        /* Add Bookmark*/
        function addBookmark() {
            url = document.URL;
            title = document.title;

            if (!url) {url = window.location}
            if (!title) {title = document.title}
            var browser=navigator.userAgent.toLowerCase();

          
            if (window.sidebar) { // Mozilla, Firefox, Netscape
                //window.sidebar.addPanel(title, url,"");
                alert('<%=System.Configuration.ConfigurationManager.AppSettings["MessageAddToFavoritesCaption"]%>');
            } else if( window.external) { // IE or chrome
                if (browser.indexOf('chrome')==-1){ // ie
                    window.external.AddFavorite( url, title); 
                } else { // chrome
                    alert('<%=System.Configuration.ConfigurationManager.AppSettings["MessageAddToFavoritesCaption"]%>');
                }
            }
            else if(window.opera && window.print) { // Opera - automatically adds to sidebar if rel=sidebar in the tag
                return true;
            }
            else if (browser.indexOf('konqueror')!=-1) { // Konqueror
                alert('<%=System.Configuration.ConfigurationManager.AppSettings["MessageAddToFavoritesWebkitCaption"]%>');
            }
            else if (browser.indexOf('webkit')!=-1){ // safari
                alert('<%=System.Configuration.ConfigurationManager.AppSettings["MessageAddToFavoritesWebkitCaption"]%>');
            } else {
                alert('Il tuo browser non può aggiungere la pagina attraverso questo link. Aggiungere la pagina manualmente.')
            }
        }


        function OpenDialog_Upload(nomeTabella,maxsize,field,mode,path,saveFileCaption,width,height,extension){
            if(path.indexOf("{") >= 0 && path.indexOf("}") >= 0){
                var slicePath = path.split("/");
                var newPath = "";
                if(slicePath.length > 0){
                    for(var i = 0;i < slicePath.length;i++){
                        if(slicePath[i].indexOf("{") >= 0 && slicePath[i].indexOf("}") >= 0){
                            var newNomeCartella = $(this.document).find('#RecordTable input#Descr_' + (slicePath[i].replace("{","")).replace("}","")).val();
                            newPath += newNomeCartella + "/"
                        }else{
                            if(slicePath[i].length > 0){
                                newPath += slicePath[i] + "/"
                            } 
                        }
                    }
                }
                path = newPath;
            }

            if(mode === 1){
                inputelement = $(this.document).find('#RecordTable input#' + field);
                var nomeCartella = inputelement.val();
                var expr = new RegExp("^([_a-z0-9-éèòàìù]+[ ]*[_a-z0-9-éèòàìù]+)+$");
                if (expr.test(nomeCartella)) {
                    //caricamento cartella 
                   //alert('FileManager/index.aspx?case=1&select=folder&noheader=1&maxsize=' + maxsize + '&field=' + field + '&mode=' + mode + '&childroot=../' + path + '&folder=../' + path + nomeCartella + '/'+ "&ext=" + extension);              
              
                    OpenDialog_TabRelation('FileManager/index.aspx?case=1&select=folder&noheader=1&maxsize=' + maxsize + '&field=' + field + '&mode=' + mode + '&childroot=../' + path + '&folder=../' + path + nomeCartella + '/'+ "&ext=" + extension,saveFileCaption,'','');              
                }else{
                    var nomeClear = ((nomeCartella.replace(/[|!\"£\$%&\/\(\)=?\'\^\*\+\[\]ç@°§\.:,;\/\\]/gi,"")).replace(/^[ ]*/gi,"")).replace(/[ ]*$/gi,"");
                    inputelement.val(nomeClear);
                 //   alert('FileManager/index.aspx?case=1&select=folder&noheader=1&maxsize=' + maxsize + '&field=' + field + '&mode=' + mode + '&childroot=../' + path + '&folder=../' + path + nomeClear + '/'+ "&ext=" + extension);              
              
                    OpenDialog_TabRelation('FileManager/index.aspx?case=1&select=folder&noheader=1&maxsize=' + maxsize + '&field=' + field + '&mode=' + mode + '&childroot=../' + path + '&folder=../' + path + nomeClear + '/'+ "&ext=" + extension,saveFileCaption,'','');              
              
                }
            }
            else{
               // alert('FileManager/index.aspx?case=1&noheader=1&select=file&w=' + width + '&h=' + height + '&name=' + nomeTabella + '&maxsize=' + maxsize + '&field=' + field + '&mode=' + mode + '&folder=../' + path + "&childroot=../" + path + "&ext=" + extension);              
          
                //caricamento file               
                OpenDialog_TabRelation('FileManager/index.aspx?case=1&noheader=1&select=file&w=' + width + '&h=' + height + '&name=' + nomeTabella + '&maxsize=' + maxsize + '&field=' + field + '&mode=' + mode + '&folder=../' + path + "&childroot=../" + path + "&ext=" + extension,saveFileCaption,'','');              
          }

        }
       
        


        function ClearSession(linktoredirect) {
            $(function () {
                $.ajax({
                    url: "Funzioni.aspx",
                    type: "GET", // POST or GET
                    dataType: "json", // Tell it we're retrieving JSON
                    async: false,
                    data: {
                        op: "ClearSession"
                    },
                    success:function (data, status) {
                        window.location= linktoredirect;
                    } // fine success
                }); // fine ajax
            }); // fine function
        }

        $(function () {

            $(".ac_input").result(function (event, data, formatted) {
                for( var i = 0; i < data.length; i += 2 )
                    //$("[id$="+ data[ i + 1 ] + "]").val(data[ i ]);
                    $("#" + data[ i + 1 ]).val(data[ i ]);
            });

            $(".ColFilterField").result(function (event, data, formatted) {
                for( var i = 0; i < data.length; i += 2 )
                    //$("[id$="+ data[ i + 1 ] + "]").val(data[ i ]);
                    $("#" + data[ i + 1 ]).val(data[ i ]);
            });
            $(".cerca_button").button({
                icons: {
                    primary: "ui-icon-search"
                }

            });

            $(".mostratutto_button").button({
                icons: {
                    primary: "ui-icon-refresh"
                }
            });
            $(".salva_button").button({
                icons: {
                    primary: "ui-icon-disk"
                }
            });
            $(".annulla_button").button({
                icons: {
                    primary: "ui-icon-close"
                }
            });
            $(".elimina_button").button({
                icons: {
                    primary: "ui-icon-trash"
                }
            });


            $("a.apridialog_button").button({
                icons: {
                    primary: "ui-icon-newwin"
                },
                text: false
            });
            $("a.clearfield_button").button({
                icons: {
                    primary: "ui-icon-minus"
                },
                text: false
            });
            $(".UploadFile_button").button({
                icons: {
                    primary: "ui-icon-image"
                },
                text: false
            });
            $(".CreateFolder_button").button({
                icons: {
                    primary: "ui-icon-folder-collapsed "
                },
                text: false
            });
            $(".ViewFolder_button").button({
                icons: {
                    primary: "ui-icon-folder-open "
                },
                text: false
            });
            $(".DownloadFile_button").button({
                icons: {
                    primary: "ui-icon-arrowthickstop-1-s"
                },
                text: false
            });
            
            $(function () {
                $(".DatePicker").datepicker({ dateFormat: '<%=FormatoDatePicker%>', changeMonth: true, changeYear: true, yearRange: "1910:2020" });
                $(".DatePicker").attr('readonly', 'true');
                $(".DatePicker").datepicker($.datepicker.regional['<%=System.Configuration.ConfigurationManager.AppSettings["tinymce-language"]%>']);
                //$("#testtexttime").timepicker(); id for field named after column name. use jquery to call timepicker selecting every id you want it on
                // Added by Devin to include a working timepicker for starttime and endtime fields (works across multiple tables because column name is same)
                $("#starttime").timepicker();
                $("#endtime").timepicker();
				
                // was here by default, .TimePicker not utilized?
                $(".TimePicker").timepicker();
                $(".TimePicker").attr('readonly', 'true');
                $('.ColorPicker').jPicker();
                $("#usernameLoginTSE").focus();

                //$("#tabs").tabs();
                var activeTabNum
                var activeTab= "<%=System.Web.HttpContext.Current.Session["Tab"]%>";
                if (activeTab == "")                   
                    activeTabNum=0;
                else
                    activeTabNum=activeTab.split("-")[1];
               
                $("#accordion").accordion({
                    autoHeight: false,
                    navigation: true,
                    active: parseInt(activeTabNum, 10)                  
                });
            });

        });

                
        function PageDescription(Table,CloseCaption,OpenCaption) {

            var tipo;
            if ($('#Page_Description').is(':visible')) {
                // se è visibile 
                $("#Page_Description").slideUp();
                $(".text-btn-open-close-pd").html(OpenCaption);
                tipo = 'chiudi';
            }
            else {
                // se non è visibile 
                $("#Page_Description").slideDown();
                $(".text-btn-open-close-pd").html(CloseCaption);
                tipo = 'apri';
            }
    

            $(function () {
                $.ajax({
                    url: "Funzioni.aspx",
                    type: "GET", // POST or GET
                    dataType: "json", // Tell it we're retrieving JSON
                    async: false,
                    data: {
                        op: "SetPageDescription",
                        table: Table,
                        type: tipo
                    },
                    success: function (data, status) {
                        //  window.location = linktoredirect;
                    } // fine success
                }); // fine ajax
            }); // fine function

        }
    </script>
    <script type="text/javascript" src="js/jquery.cookie.js"></script>
    <script type="text/javascript" src="js/RecordSelection.js"></script>
    <script type="text/javascript">
        window.history.forward();
        function noBack() { window.history.forward(); }
    </script>

    <!-- TinyMCE -->

    <script  type="text/javascript" src="js/tinymce/tinymce.min.js"></script>
  <script type="text/javascript">
   
      tinymce.init({
          selector: "textarea.mceEditor",
          theme: "modern",
          language: '<%=System.Configuration.ConfigurationManager.AppSettings["tinymce-language"]%>',
        width: 630,
        height: 100,
        plugins: [
             "advlist autolink link image lists charmap print preview hr anchor pagebreak spellchecker",
             "searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking",
             "save table contextmenu directionality emoticons template paste textcolor lb3filemanager "
        ],
        image_advtab: true ,        
        relative_urls: true,
        external_filemanager_path:"filemanager/",
        filemanager_title:"File Manager", 
        /*
       external_plugins: { "filemanager" : "filemanager/plugin.min.js"},
      */
        file_browser_callback: function(field_name, url, type, win) {

            //tinymce.activeEditor.windowManager.close();
            //console.log(field_name);

            tinymce.activeEditor.windowManager.open({
                title: 'File Manager',
                file: "filemanager/index.aspx?noheader=1&amp;case=2&amp;select=file&amp;field=" + field_name + "&url=" + url,
                width: 950,
                height: 600,
                resizable : "no",
                inline : "yes",
                close_previous : "no",
                buttons: [{
                    /*  text: 'Insert',
                      classes: 'widget btn primary first abs-layout-item',
                      disabled: true,
                      onclick: 'close'
                  }, {*/
                    text: 'Close',
                    onclick: 'close',
                    window : win,
                    input : field_name
                }]
            });

            return false;
        },
       
        content_css: "css/content.css",
        
        //toolbar1: "insertfile undo redo | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | pagebreak | styleselect | fontsizeselect", 
        // toolbar2: " image | link unlink anchor | print preview media fullpage | forecolor backcolor", 
       
        toolbar1: "fullpage | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | formatselect fontsizeselect",
        toolbar2: "cut copy paste pastetext | searchreplace | bullist numlist | outdent indent blockquote | undo redo | preview | forecolor backcolor",
        toolbar3: " image media | link unlink anchor | table | hr | fullscreen | pagebreak | code ",
       
        menubar: false,
        toolbar_items_size: 'big', //small

        style_formats: [
             {title: 'Bold text', inline: 'b'},
             {title: 'Red text', inline: 'span', styles: {color: '#ff0000'}},
             {title: 'Red header', block: 'h1', styles: {color: '#ff0000'}},
             {title: 'Example 1', inline: 'span', classes: 'example1'},
             {title: 'Example 2', inline: 'span', classes: 'example2'},
             {title: 'Table styles'},
             {title: 'Table row 1', selector: 'tr', classes: 'tablerow1'}
        ],
        
    }); 
</script>

    <!-- /TinyMCE -->



    <script type="text/javascript">
        /* Variabili per spunta checkbox da tabella*/
        var Row, Cell; 


        jQuery(document).ready(function () {  
            /* Verifico se è attiva una guida*/
            var GuideID = "<%=(System.Web.HttpContext.Current.Session["GuideID"] != null) ? System.Web.HttpContext.Current.Session["GuideID"].ToString() : "" %>";
            if(GuideID != "")
                GuidersTutorials(GuideID); 

            /* Login Js*/
            $("#usernameLoginTSE").val("");    
            $("#passwordLoginTSE").val("");
            $("#UserEmail").val("");
            /* Se browser NON è IE*/
            if(!($.browser.msie))
                $.fn.placeholder();
            
            /* Per IE*/
            if(($.browser.msie) && ($.browser.version != "8.0")){
                $('#usernameLoginTSE').keyup(function () {
                    if($('#usernameLoginTSE').val() != "")
                        $("#usernameLogin").css("display","none");
                    else{
                        $("#usernameLogin").css("display","block");
                    }
                });   

                $('#passwordLoginTSE').keyup(function () {
                    if($('#passwordLoginTSE').val() != "")
                        $("#passwordLogin").css("display","none");
                    else{
                        $("#passwordLogin").css("display","block");
                    }
                });  

                $('#UserEmail').keyup(function () {
                    if($('#UserEmail').val() != "")
                        $("#EmailLogin").css("display","none");
                    else{
                        $("#EmailLogin").css("display","block");
                    }
                }); 
            }
            /* Fine Login*/

            //Check per redirect su Session Timeout
            setTimeout(function () { 
                window.alert('<%=System.Configuration.ConfigurationManager.AppSettings["SessionExpiredCaption"]%>');
                window.location.href='index.aspx';
            }, <%=this.Session.Timeout * 60 * 1000%> );

            //Alert con avviso di 15 minuti di inattività
            setTimeout(function () { 
                OpenDialog_Message("Session expiring", "<div><%=DateTime.Now.ToShortTimeString()%></br><%=System.Configuration.ConfigurationManager.AppSettings["SessionExpiringMessage"]%></div>", 550, 200);
            return false;}, <%= 15 * 60 * 1000%> );


            //TabellaDati in linea al Men  Principale per Chrome e Safari
            if((navigator.userAgent.toLowerCase().indexOf('chrome') > -1) || (navigator.userAgent.toLowerCase().indexOf('safari') > -1))
                $("#TabellaDati").css('margin-left',$("#MainMenu").css('width'));
            else if(($.browser.msie) && ($.browser.version == "8.0"))
                $("#TabellaDati").css('margin-left',$("#MainMenu").css('width') - 120);

            $("#TabellaDati tr").mouseover(function(){
                Row = $(this);
            });
            $("#TabellaDati td").mouseover(function(){
                Cell = $(this);
            });

            /* Guiders: plugin per tutorial interattivo*/
         <%if ((IDGuidaFirstAccess != "") && (!FormLogin.Visible))
           {%>
            GuidersTutorials("<%=IDGuidaFirstAccess %>");
            <%} %>


            /* Messaggio all'utente
            ******************************************************************/
            //ClientAlert
            <%

            if (Session["ClientAlert"] != null)
            {
                AlertMessage.Text = Session["ClientAlert"].ToString();
                %>
                OpenDialog_Message("<%=AppTitle%>","#PanelMessage",550,210)
                <%
                Session["ClientAlert"] = null;

           }
           %>
           
            //ClientAlert per TableReader
            <%
            String SQLEx = Request["SQLEx"];
            String Message="";
            if ( SQLEx != null && SQLEx != "")
            {
             
             switch (SQLEx){
             case "547":
                Message = "Non è possibile cancellare alcuni dati poichè sono collegati ad altre tabelle.";
             break;
             case "Del":
                Message = "Non è possibile cancellare alcuni dati poichè sono collegati ad altre tabelle.";
             break;
             case "Ex":
                Message = "Eccezione generica in SalvaEliminaSemplice";
             break;
             default:
                Message = "Eccezione generica SQL: " + SQLEx;
             break;
             }
            
                AlertMessage.Text = Message;

                %>
                OpenDialog_Message("<%=AppTitle%>","#PanelMessage",450,180);
                <%

           }
           %>



        });

        (function($) {
            $.fn.placeholder = function() {
                if(typeof document.createElement("input").placeholder == 'undefined') {
                    $('[placeholder]').focus(function() {
                        var input = $(this);
                        if (input.val() == input.attr('placeholder')) {
                            input.val('');
                            input.removeClass('placeholder');
                        }
                    }).blur(function() {
                        var input = $(this);
                        if (input.val() == '' || input.val() == input.attr('placeholder')) {
                            input.addClass('placeholder');
                            input.val(input.attr('placeholder'));
                        }
                    }).blur().parents('form').submit(function() {
                        $(this).find('[placeholder]').each(function() {
                            var input = $(this);
                            if (input.val() == input.attr('placeholder')) {
                                input.val('');
                            }
                        })
                    });
                }
            }
        })(jQuery);

        // handful of js functions added by Devin

        // checks AsyncFileUpload's file before it is passed to the server
        // if it fails, the file never makes it to the server
        // currently only checks for file extensions, but you can check file size as well
        function CheckUpload (sender, args) {
            // args in this context has info on the file being uploaded
            var fileName = args.get_fileName();
            // use substring to get file extension (+1 makes it so "." isn't included)
            var ext = fileName.substring(fileName.lastIndexOf(".") + 1).toLowerCase();
            // $.urlParam = custom function, see below. gets table name from url
            var tableName = $.urlParam('name').toLowerCase();
            var flag = false;

            // each table has its own file extensions it will accept
            // (if you end up with a table with multiple AsyncFileUpload controls, where different file types are accepted between them, you'll need to make this more complex
            // TO DO: CLEAR UPLOAD TEXTBOX HERE (how to do this for board meetings where there are multiple?)
            if (tableName == "boardmeetingscms" && (ext == "pdf" || ext == "xls" || ext == "xlsx"))
                flag = true;
            else if (tableName == "worksheetscms" && (ext == "xls" || ext == "xlsx"))
                flag = true;
            else if (tableName == "contacts" && (ext == "jpg" || ext == "jpeg" || ext == "png" || ext == "gif"))
                flag = true;
            else {
                var err = new Error();
                throw(err);
            }
            
            // as far as i can tell, return isn't doing anything ("throw(err)" seems to be what puts a stop to things). leaving it here for good measure
            // flag here will be changed to true if a valid file type is found, but stay false otherwise
            return flag; 
        }

        // intended to go off when the user uploads a file with an invalid file extentions
        // this will trigger regardless of the reason the upload failed. may confuse user, but it should be rare enough to be low priority
        function UploadError (sender, args) {
            // file name exists after the last backslash in args (args being the uploaded file in this case)
            var fileName = args._fileName.substring(args._fileName.lastIndexOf("\\") + 1);
            // get table name, lower case to avoid issues (that said, make sure you compare it to a lowercase string too)
            var tableName = $.urlParam('name').toLowerCase();
            // construct a dynamic error message then send it out
            var errorMsg = fileName + " error: \nFile extension must be ";

            if (tableName == "contacts")
                errorMsg += ".jpg, .jpeg, .png, or .gif";
            else if (tableName == "worksheetscms")
                errorMsg += ".xls or .xlsx";
            else if (tableName == "boardmeetingscms")
                errorMsg += ".pdf, .xls, or .xlsx";
            else
                errorMsg += "*valid file extensions not found*";

            alert(errorMsg); // alert is a bit archaic these days i think? you can come up with another way of informing the user if you want
        }

        // function to find the right textbox that TSE will use, based on the table we're on, and give it the file name of the uploaded file
        // what you need to know about sender here, is that it's holding the file name passed into it by asyncControl_UploadedComplete in index.aspx.cs
        function PopulateFileNameField (sender, args) {
            // get table name, lower case to avoid issues (that said, make sure you compare it to a lowercase string too)
            var tableName = $.urlParam('name').toLowerCase();
            // IMPORTANT: Make sure the date format used here is the exact same as the date format used in the .cs file or the file names will not match up
            var nameToSave = new Date().toString("M-d-yyyy_h-mmtt") + "_" + sender.fileName

            if (tableName == "contacts") {
                var fieldNode = document.getElementById("photo");
                fieldNode.value = nameToSave;
            }

            if (tableName == "worksheetscms") {
                var fieldNode = document.getElementById("sheetfilename");
                fieldNode.value = nameToSave;
            }

            if (tableName == "boardmeetingscms") {
                // when there are multiple async controls, you need to be able to tell them apart
                // ._iframeName property contains the ID you set in the .cs file, followed by _iframe, so this is an easy way
                // "sender" in this case refers to whatever asynccontrol that triggered this method
                if (sender._iframeName == "asyncControl1_iframe") {
                    // get the textbox by its id, then set the value of it to the filename of whatever got uploaded (from a property set by asyncControl_UploadedComplete in index.aspx.cs)
                    var fieldNode = document.getElementById("agenda");
                    fieldNode.value = nameToSave;
                }

                if (sender._iframeName == "asyncControl2_iframe") {
                    var fieldNode = document.getElementById("minutes");
                    fieldNode.value = nameToSave;
                }

                if (sender._iframeName == "asyncControl3_iframe") {
                    var fieldNode = document.getElementById("notice");
                    fieldNode.value = nameToSave;
                }

                if (sender._iframeName == "asyncControl4_iframe") {
                    var fieldNode = document.getElementById("packet");
                    fieldNode.value = nameToSave;
                }
            }
        };

        // Code from https://stackoverflow.com/a/45760894 , replicates URLSearchParams in a way that's compatible with IE
        $.urlParam = function(name){
            var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
            if (results==null){
                return null;
            }
            else{
                return decodeURI(results[1]) || 0;
            }
        }

        // global variables for the purpose of how i went about clearing fields with upload controls associated with them
        // these work since the upload feature is async, so the variables hold until the page is actually updated
        uploadField = "";
        flag = true;

        // numbered ones used when a table has multiple asyncControls (only board meetings at the time of writing)
        // unfortunately messy, but i do not currently know if there is anyway to compare a variable's NAME to a string
        uploadField1 = "";
        flag1 = true;

        uploadField2 = "";
        flag2 = true;

        uploadField3 = "";
        flag3 = true;

        uploadField4 = "";
        flag4 = true;

        // jquery that gives the async control an onchange event (which will fire off whenever the control itself gets or loses a file
        // note that the upload finishing isn't directly related to the "input type=file" part of the control, so a finished upload won't trigger the event (which is intended, otherwise we'd always clear the textbox)
        // to summarize what this event will do: any time a file is selected for upload or Cancel is clicked (removing the file from the control), the textbox associated with it will be cleared
        // this prevents cases where the textbox is populated with a proper file name, but then the user tries to upload something else and either hits Cancel or uploads something invalid, which makes the control hold nothing while the textbox still has a filename
        // the "asyncControl" part of the ID is based on the ID of the actual async control, and ctl02 (l = L, not 'one') represents the "input type=file" portion of the control
        $(document).on('change', '#asyncControl_ctl02', function() {
            // grab table name
            var tableName = $.urlParam('name').toLowerCase();

            // run my method with a specific field (using its ID on the webpage, which should be the same as the column name all lower-case)
            if (tableName == "contacts") 
                SingleControlUploadFieldClear("photo");

            if (tableName == "worksheets") 
                SingleControlUploadFieldClear("sheetfilename");
        });

        // i just made this method to make things a bit neater (to at least try to follow "only changing code in one place")
        // it accepts a field as an argument, represented by its ID on the webpage, which is the same as the column's name in the db
        function SingleControlUploadFieldClear(field) {
            // target the textbox element using the field argument
            var fieldNode = document.getElementById(field);
            // figure out what mode we're on (reminder: 0 = table, 1 = new, 2 = edit, 3 = delete)
            var mode = $.urlParam('mode');

            // if we're making a new row, then we'll only ever want to clear the textbox completely between file selections
            if (mode == "1")
                fieldNode.value = "";

            // if we're editing however, then it would make sense to default back to whatever the original value of the field was
            if (mode == "2") {
                // if our global flag variable is true (it is by default), then set our other global variable to hold the textbox value associated with the upload control
                if (flag) {
                    uploadField = fieldNode.value;
                    // then set the flag to false so we never end up in here again and overwrite the global variable with something invalid
                    flag = false;
                }
                // then regardless of flag's value, set the textbox's value to our global variable's value
                fieldNode.value = uploadField;
            }       
        }

        // then there are essentially 4 unfortunate duplicates of the event, because i presently do not know of a way to compare variable names to strings (and don't have time to learn)
        // one for each upload control on board meetings, changing the control's number (ie. asyncControl1), and associated field name (agenda, minutes, etc)
        $(document).on('change', '#asyncControl1_ctl02', function() {
            var tableName = $.urlParam('name').toLowerCase();
            var mode = $.urlParam('mode');

            if (tableName == "boardmeetingscms") {
                var fieldNode = document.getElementById("agenda");

                if (mode == "1")
                    fieldNode.value = "";

                if (mode == "2") {
                    if (flag1) {
                        uploadField1 = fieldNode.value;
                        flag1 = false;
                    }
                    fieldNode.value = uploadField1;
                }
            }
        });

        $(document).on('change', '#asyncControl2_ctl02', function() {
            var tableName = $.urlParam('name').toLowerCase();
            var mode = $.urlParam('mode');

            if (tableName == "boardmeetingscms") {
                var fieldNode = document.getElementById("minutes");

                if (mode == "1")
                    fieldNode.value = "";

                if (mode == "2") {
                    if (flag2) {
                        uploadField2 = fieldNode.value;
                        flag2 = false;
                    }
                    fieldNode.value = uploadField2;
                }
            }
        });

        $(document).on('change', '#asyncControl3_ctl02', function() {
            var tableName = $.urlParam('name').toLowerCase();
            var mode = $.urlParam('mode');

            if (tableName == "boardmeetingscms") {
                var fieldNode = document.getElementById("notice");

                if (mode == "1")
                    fieldNode.value = "";

                if (mode == "2") {
                    if (flag3) {
                        uploadField3 = fieldNode.value;
                        flag3 = false;
                    }
                    fieldNode.value = uploadField3;
                }
            }
        });

        $(document).on('change', '#asyncControl4_ctl02', function() {
            var tableName = $.urlParam('name').toLowerCase();
            var mode = $.urlParam('mode');

            if (tableName == "boardmeetingscms") {
                var fieldNode = document.getElementById("packet");

                if (mode == "1")
                    fieldNode.value = "";

                if (mode == "2") {
                    if (flag4) {
                        uploadField4 = fieldNode.value;
                        flag4 = false;
                    }
                    fieldNode.value = uploadField4;
                }
            }
        });

    </script>
    <!--[if IE 7]>
    <script type="text/javascript">
        $(document).ready(function() {
        var wScreen =$(window).width();
         var wMenu =$("#MainMenu").width();
         var wTabella = $("#TabellaDati").width()


         if ((wMenu+wTabella)>wScreen)
            $("#DetailTableSection").width(wMenu+wTabella+20);
        else
            $("#DetailTableSection").width(wScreen-20);
        });
    </script>
    <![endif]-->

</head>
<%}; %>
<body onload="noBack();" onpageshow="if (event.persisted) noBack();" onunload="">
    <form id="form1" runat="server">

        <asp:ScriptManager ID="ScriptManger1" runat="Server"></asp:ScriptManager>

    <div id="DetailTableSection">
        <% if (Request.QueryString["NoHeader"] != "1")
           {%>
        <asp:Panel ID="top" class="ui-corner-all" runat="server">            
            <h1 style="text-transform: capitalize;">
                <img id="SWLogo" src="images/icons/<%=SWImg %>" alt="" class="icons-tab-images" />
                <%=Request.ServerVariables["SCRIPT_NAME"].Split('/')[1]%></h1>
            <asp:PlaceHolder ID="HeaderLinks" runat="server"></asp:PlaceHolder>
        </asp:Panel>
        <%;
               }%>
        <!-- LOGIN -->
        <asp:Panel DefaultButton="LoginButton" ID="Login" runat="server" Visible="false">
            <asp:Panel ID="AggiornaBrowser" runat="server" Visible="false">
                <div class="ui-state-highlight ui-corner-all" style="padding: 0 .7em;">
                    <%if (System.Configuration.ConfigurationManager.AppSettings["tinymce-language"].ToLower() == "it")
                      {%>
                    <p>
                        <span class="ui-icon ui-icon-info" style="float: left; margin-right: .3em;"></span>
                        Questo software é ottimizzato per <b>Internet Explorer 8 o successivi</b><br />
                        <br />
                        Se hai visualizzato questa pagina <b>devi aggiornare la versione di Internet Explorer</b>
                        o scaricare i browser gratuiti <b>Mozilla Firefox</b> oppure <b>Google Chrome</b>
                    </p>
                    <p>
                        Scarica uno dei seguenti browser:
                    </p>
                    <p>
                        <%}
                      else
                      {%>
                        <p>
                            <span class="ui-icon ui-icon-info" style="float: left; margin-right: .3em;"></span>
                            This software is optimized for <b>Internet Explorer 8 or later</b><br />
                            <br />
                            <b>You need to update Microsoft Explorer</b> Alternatively you can download <b>Mozilla Firefox</b> or <b>Google Chrome</b>
                        </p>
                        <p>
                            Download a web browser:
                        </p>
                        <p>
                            <%} %>
                            <a href="http://windows.microsoft.com/it-IT/windows/upgrade-your-browser"><img src="css/images/explorer.png" alt="Download Internet Explorer" border="0" /></a>&nbsp;&nbsp;&nbsp;&nbsp;
                            <a href="http://www.mozilla-europe.org/it/firefox/"><img src="css/images/firefox.png" alt="Download Firefox" border="0" /></a>&nbsp;&nbsp;&nbsp;&nbsp;
                            <a href="https://www.google.com/intl/it/chrome/browser/"><img src="css/images/chrome.png" alt="Download Chrome" border="0" /></a>
                        </p>
                </div>
            </asp:Panel>
            <asp:Panel ID="FormLogin" runat="server" Visible="true">
                <table id="general_Login" align="center">
                    <tr>
                        <td>
                            <div id="LoginLeft">
                                <div id="ImgLoginLeft">
                                    <asp:Image ID="ImgLogin" runat="server" />
                                </div>
                                <asp:Panel ID="LoginDescription" runat="server">
                                    <asp:Panel ID="LoginText" runat="server">
                                    </asp:Panel>
                                    <asp:Panel ID="PanelBtnDescr" class="login_button" runat="server" Visible="false">
                                        <a href="<%=linkBtnDescr %>" target="_blank" style="color: <%=linkBtnDescrColor%>;">
                                            <%=testoBtnDescr%></a>
                                    </asp:Panel>
                                </asp:Panel>
                            </div>
                        </td>
                        <td>
                            <table class="login_table" cellspacing="0" cellpadding="2">
                                <tr>
                                    <td colspan="2" style="padding: 15px 0;">
                                        <asp:Image ID="SwImageLogin" alt="" runat="server" class="" Style="float: left;" />
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="2" style="padding: 25px 0 0;">
                                        <h1 style="text-transform: capitalize; color: #444444; margin-top: 0; font-size: 2em;
                                            font-weight: normal;">
                                            <%=TitoloLogin%></h1>
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="2">
<asp:Panel ID="FormFieldLogin" runat="server" Visible="True">
    <table> 

 <tr>
                                    <!--<td valign="bottom" align="left">
                                        <span>User</span>
                                    </td>-->
                                    <td align="left" colspan="2">
                                        <div style="position: relative; width: 100%;">
                                            <asp:TextBox ID="usernameLoginTSE" class="LoginInput" runat="server" Style="height: 30px;" />
                                            <%/* In caso di browser IE creo il placeolder alternativo*/
                                                if (Request.Browser.Browser == "IE")
                                                { %>
                                            <div id="usernameLogin" class="placeholder">
                                                <%=System.Configuration.ConfigurationManager.AppSettings["YourUsernameCaption"]%>
                                            </div>
                                            <%} %>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <!--<td valign="bottom" align="left">
                                        <span>Password</span>
                                    </td>-->
                                    <td align="left" colspan="2">
                                        <div style="position: relative; width: 100%;">
                                            <asp:TextBox TextMode="Password" ID="passwordLoginTSE" class="LoginInput" runat="server"
                                                Style="height: 30px;" />
                                            <%/* In caso di browser IE creo il placeolder alternativo*/
                                                if (Request.Browser.Browser == "IE")
                                                { %>
                                            <div id="passwordLogin" class="placeholder">
                                                <%=System.Configuration.ConfigurationManager.AppSettings["YourPasswordCaption"]%>
                                            </div>
                                            <%} %>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="2">
                                        <asp:Panel ID="PanelLoginButton" class="login_button" runat="server">
                                            <asp:LinkButton ID="LoginButton" runat="server" Style="margin: 10px auto;" OnClick="Login_Click" />
                                        </asp:Panel>
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="2">
                                        <asp:Label ID="LoginMessage" runat="server"></asp:Label>
                                    </td>
                                </tr>
                                
                                <tr>
                                    <td colspan="2">
                                        <asp:Panel ID="BookmarkPanel" Visible="false" runat="server">
                                            <asp:Image ID="BookmarkImg" class="icons-tab-images" Visible="false" runat="server" />
                                            <span style="cursor: pointer;" onclick="javascript:addBookmark();">
                                                <%=BookmarkText %></span>
                                        </asp:Panel>
                                        <asp:Panel ID="DatiAccesso" runat="server">
                                        </asp:Panel>
                                    </td>
                                </tr>
    </table>

</asp:Panel>

                                    </td></tr>
                                
                               
<tr>
                                    <td colspan="2">
                                          <asp:Panel ID="PanelLicenzaMessage" runat="server" Visible="False">
                
                            <asp:Label ID="LicenzaMessage" runat="server" Visible="false"></asp:Label>
                       <br />
            </asp:Panel>

                                    </td>
                                </tr>

                                <tr>
                                    <td colspan="2">
                                        <asp:Panel ID="RecuperoDati" runat="server" Style="display: none;">
                                            <div style="position: relative; width: 100%; overflow: hidden;">
                                                <asp:TextBox ID="UserEmail" class="LoginInput" runat="server" Style="height: 30px;" />
                                                <%/* In caso di browser IE creo il placeolder alternativo*/
                                                    if (Request.Browser.Browser == "IE")
                                                    { %>
                                                <div id="EmailLogin" class="placeholder">
                                                    <%=System.Configuration.ConfigurationManager.AppSettings["YourEmailCaption"]%>
                                                </div>
                                                <%} %>
                                            </div>
                                            <p style="overflow: hidden; margin-top: 0;">
                                                <asp:RequiredFieldValidator CssClass="_textRequired" ID="Required_UserEmail" ControlToValidate="UserEmail"
                                                    ValidationGroup="OnCheck" runat="server"></asp:RequiredFieldValidator>
                                            </p>
                                            <asp:Panel ID="PanelEmailRecuperoDati" class="login_button" runat="server">
                                                <asp:LinkButton ID="EmailRecuperoDati" runat="server" OnClick="RecuperoDati_Click"
                                                    ValidationGroup="OnCheck" />
                                            </asp:Panel>
                                        </asp:Panel>
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="2">
                                        <asp:Label ID="LabelRecuperoDati" runat="server"></asp:Label>
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="2">
                                        <asp:Label ID="RecuperoDatiMessage" runat="server"></asp:Label>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2" style="padding-top: 20px;">
                            <div id="footerLogin">
                                &copy
                                <%=DateTime.Now.Year %>
                                Laboratre - All Rights Reserved
                                <asp:Label ID="AppVersionLogin" runat="server"></asp:Label>
                            </div>

                            <br />

<%if(MostraBannerGoogle==true){
string userbuylink = "http://" + HttpContext.Current.Request.Url.Host + "/acquistolicenza" + HttpContext.Current.Request.Url.AbsolutePath.ToLower().Replace("/index.aspx","");
%>

<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
<!-- LOGIN SOFTWARE -->
<ins class="adsbygoogle"
     style="display:inline-block;width:970px;height:90px"
     data-ad-client="ca-pub-1020143039739302"
     data-ad-slot="8385854704"></ins>
<script>
    (adsbygoogle = window.adsbygoogle || []).push({});
</script>


<p align="center"><a style="font-size:0.9em;font-weight:bold" href="<%=userbuylink%>">Non visualizzare più annunci pubblicitari </a></p>


<%}%>

                        </td>
                    </tr>
                </table>
            </asp:Panel>



          
        </asp:Panel>

        <%CheckClientAlert();%>

        <!---ELENCO TABELLE-->
        <asp:PlaceHolder ID="ElencoTabelle" runat="server"></asp:PlaceHolder>
        <asp:Panel ID="ControlPanel" runat="server">
        </asp:Panel>
        <%if (Request.QueryString["page"] == "WelcomePage")
          {%>
        <uc:Page ID="WelcomePage" runat="server" />
        <%} %>
        <!--SINGOLA TABELLA-->
        <asp:Panel ID="PanelSingolaTabella" runat="server" Visible="false">
            <div id="TableName">
                <%if (Request.QueryString["NoHeader"] != "1")
                  { %>
                <h1>
                    <%if (TableTitle == "")
                      {%>
                    <%=TitoloPagina()%>
                    <%}
                      else
                      { %>
                    <%=TableTitle%>
                    <%}%>
                </h1>
                <asp:Literal ID="LinkPageDescription" runat="server"></asp:Literal>
            </div>
            
            <asp:Literal ID="PageDescription" runat="server"></asp:Literal>
            <asp:Label ID="StrQuery" runat="server"></asp:Label>
            
            <%}%>
            <%if (Request.QueryString["DetailTable"] == "1")
              {   /* Assegno il titolo alla DetailTable*/
                  Response.Write("<h2>" + ((System.Web.HttpContext.Current.Session["DetailTableName"] == null) ? Request["name"] : System.Web.HttpContext.Current.Session["DetailTableName"].ToString()) + "</h2>");
              } %>
            <div id="TopTabella">

               <asp:Panel ID="PanelAddOtherButton" runat="server">                    
                    <asp:Literal ID="AddOtherButton" runat="server"></asp:Literal>
                </asp:Panel>

                <% if(Request.QueryString["mode"] != "6"){%>
                <asp:Panel ID="PanelAddNewButton" runat="server">
                    <asp:Literal ID="AddNewButton" runat="server"></asp:Literal>                
                </asp:Panel>
                <%}%>

                <%if (Request.QueryString["DetailTable"] != "1")
                  { %>
                <div id="Ricerca">
                    <asp:TextBox ID="txtSearch" runat="server" />
                    <span class="cerca_button">
                        <asp:Button ID="GridSearchButton" runat="server" OnClick="GridSearchButton_Click"
                            Text="Cerca" ValidationGroup="cerca" />
                    </span><span class="mostratutto_button">
                        <asp:Button ID="GridSearchResetButton" runat="server" OnClick="GridSearchResetButton_Click"
                            Text="Mostra tutto" />
                    </span>
                    <asp:RegularExpressionValidator runat="server" ID="SearchValidator" ControlToValidate="txtSearch" 
                        ValidationExpression="^[a-zA-Z\d\-æÆøØåÅéÉöÖäÄüÜ-ñÑõÕéÉáÁóÓôÔ]{1,}$"  ValidationGroup="cerca" />
                </div>
                <%}; %>
                
            </div>
            <asp:Label ID="NoRecords" runat="server"></asp:Label>
            <LB3TSE:GridPager ID="TabellaDati" OnRowDataBound="TabellaDati_RowDataBound" CssClass="GridViewStyle"
                runat="server" AllowSorting="true" AutoGenerateColumns="false" CustomPagerCssClass="Pager"
                GridLines="Both" ShowLB3CustomPaging="ontopandbottom" OnPageIndexChanging="TabellaDati_PageIndexChanging"
                OnSorting="SortGrid" OnOnPageSizeChanged="TabellaDati_PageSizeChange">
                <FooterStyle CssClass="GridViewFooterStyle" />
                <RowStyle CssClass="GridViewRowStyle" />
                <SelectedRowStyle CssClass="GridViewSelectedRowStyle" />
                <PagerStyle CssClass="GridViewPagerStyle" />
                <AlternatingRowStyle CssClass="GridViewAlternatingRowStyle" />
                <HeaderStyle CssClass="GridViewHeaderStyle" />
                <Columns>
                    <asp:TemplateField HeaderText="Inserisci" ShowHeader="False" HeaderStyle-HorizontalAlign="Left"></asp:TemplateField>
                    <asp:TemplateField HeaderText="Modifica" ShowHeader="False" HeaderStyle-HorizontalAlign="Left"></asp:TemplateField>
                    <asp:TemplateField HeaderText="Elimina" ShowHeader="False" HeaderStyle-HorizontalAlign="Left"></asp:TemplateField>
                    <asp:TemplateField HeaderText="" Visible="False" ShowHeader="False" HeaderStyle-HorizontalAlign="Left"></asp:TemplateField>
                </Columns>
            </LB3TSE:GridPager>
        </asp:Panel>
        <!--MODE 1 NEW RECORD-->
        <!--MODE 2 EDIT RECORD-->
        <!--MODE 3 DELETE RECORD-->
        <asp:Panel ID="PanelFormDati" runat="server" Visible="false">
            <h1>
                <%=TitoloPagina()%>
                &nbsp;/&nbsp;
                <%switch (Request.QueryString["mode"])
                  {
                      case "2":
                          Response.Write(System.Configuration.ConfigurationManager.AppSettings["EditCaption"]); %>
                Record<%
                          break;
                      case "1":
                          Response.Write(System.Configuration.ConfigurationManager.AppSettings["AddNewCaption"]); %>Record<%
                          break;
                      case "3":
                          Response.Write(System.Configuration.ConfigurationManager.AppSettings["DelCaption"]); %>Record
                <%break;
                  } %></h1>
            <asp:Table ID="RecordTable" runat="server"></asp:Table>
            <div id="Btn">
                <%switch (Request.QueryString["mode"])
                  {
                      case "1":
                      case "2":
                %><span class="salva_button"><asp:LinkButton ID="SaveBtn" runat="server" OnClick="Salva_Click"  OnClientClick="if(!Page_ClientValidate()) return false;if(!NoDoubleClick('SaveBtn')) return false;" ValidationGroup="OnSave" /></span><%
                              break;
                          case "3":
                    %><span class="elimina_button"><asp:LinkButton ID="DelBtn" runat="server" OnClick="Salva_Click"  OnClientClick="if(!NoDoubleClick('DelBtn')) return false;"/></span>
                <%break;
                      }%>
                <span class="annulla_button">
                    <asp:LinkButton ID="CancBtn" runat="server" OnClick="Annulla_Click"  OnClientClick="$('.elimina_button').hide();"/></span>
            </div>
            <div id="DetailTable">
            </div>
            <script type="text/javascript">
                jQuery(document).ready(function () {
                    $("#subfield_tabs").tabs();
                });
            </script>
        </asp:Panel>
        <%if (Request.QueryString["mode"] != "4" && (string.IsNullOrEmpty(Request.QueryString["IdTextBox"])))
          {%>
        <%if (Request.QueryString["DetailTable"] != "1")
          { %>

        <asp:Panel ID="PanelMessage" runat="server"><asp:Literal ID="AlertMessage" runat="server"></asp:Literal></asp:Panel>
        <asp:Panel ID="footer" CssClass="ui-corner-all" runat="server">
            &copy
            <%=DateTime.Now.Year %>
            Laboratre - All rights Reserved -
            <asp:Label ID="AppVersion" runat="server"></asp:Label>
        </asp:Panel>
        <%};%>
        <%};%>
    </div>
    </form>
</body>
</html>
