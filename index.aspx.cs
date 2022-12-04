/*
 * Table Smart Editor
 * Copyright 2012, (http://www.laboratre.com)
 * Licensed under the GPL Version 2 licenses.
 * http://www.tablesmarteditor.com
 */
using System;
using System.Collections;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.OleDb;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Drawing;
using LB3TSE;
using Microsoft.VisualBasic;
using System.Globalization;
using System.Text;
using System.Xml;
using System.IO;
using System.Net.Mail;
using System.Net.Configuration;
using System.Web.Configuration;
using AjaxControlToolkit;
using System.Data.SqlClient;



public partial class index : System.Web.UI.Page
{

    public String FormatoDatePicker, TableTitle = "", SWImg = System.Configuration.ConfigurationManager.AppSettings["AppImage"];
    public int ColumnIDPosition;
    public string linkBtnDescr, testoBtnDescr, linkBtnDescrColor, BookmarkText, TitoloLogin;
    public string IDGuidaFirstAccess = "";
    public bool MostraBannerGoogle= false;



    public void WriteCssLink()
    {
        LB3TSE.Database Database = new LB3TSE.Database();
        Database.ApriConn();

        try
        {
            string cssFolder, cssSfondo;
            cssFolder = new LB3TSE.Funzioni().getCssFolder();
            Response.Write("<link type=\"text/css\" href=\"css/" + cssFolder + "/jquery-ui-custom.css\" rel=\"stylesheet\" />" + Environment.NewLine);
            Response.Write("<link type=\"text/css\" href=\"css/style.css\" rel=\"stylesheet\" />" + Environment.NewLine);
            //Response.Write("<link type=\"text/css\" href=\"css/" + cssFolder + "/style.css\" rel=\"stylesheet\" />" + Environment.NewLine);

            //Immagine Sfondo Home
            cssSfondo = Database.GetValore("SELECT LoginPageImg FROM TSESettings;", "LoginPageImg");

            /* In caso di browser IE Inserisco il relativo CSS*/
            if (Request.Browser.Browser == "IE")
                Response.Write("<link type=\"text/css\" href=\"css/styleIE" + ((Request.Browser.Version.Split('.').Length > 0) ? ((Request.Browser.Version.Split('.')[1] == "0") ? Request.Browser.Version.Split('.')[0] : Request.Browser.Version) : Request.Browser.Version.Split('0')[0]) + ".css\" rel=\"stylesheet\" />" + Environment.NewLine);

            if (FormLogin.Visible)
            {
                /* Nascondo l'Header e il Footer dell'area riservata*/
                footer.Visible = false;
                top.Visible = false;
                string BGDescriptionColor = "", TextDescriptionColor = "", testo = "";
                /* Leggo le informazioni del file InfoLogin.xml per le immagini e le descrizioni del Login*/
                // Create an XmlReader
                if (System.Configuration.ConfigurationManager.AppSettings["LoginInfoXml"].ToString() != "")
                {
                    StringBuilder output = new StringBuilder();
                    XmlTextReader reader = null;

                    string[] InfoLogin = System.Configuration.ConfigurationManager.AppSettings["LoginInfoXml"].ToString().Split(',');
                    if (InfoLogin[1] == "1")
                        /* Se 1, InfoLogin è online*/
                        reader = new XmlTextReader(InfoLogin[0]);
                    else
                        /* InfoLogin Locale*/
                        reader = new XmlTextReader(Server.MapPath("index.aspx").Replace("index.aspx","") + "/" + InfoLogin[0]);

                    using (reader)
                    {
                        /* Ignora i nodi vuoti*/
                        reader.WhitespaceHandling = WhitespaceHandling.None;

                        while (reader.Read())
                        {
                            switch (reader.NodeType)
                            {
                                case XmlNodeType.Element:
                                    switch (reader.Name.ToLower())
                                    {
                                        case "immagine":
                                            bool ReadXmlImage = true;
                                            /* Controllo se è presente valore nella chiave DBPathLicenza nel Web.config*/
                                            if (System.Configuration.ConfigurationManager.AppSettings["DBPathLicenza"] != "")
                                            {
                                                MostraBannerGoogle = true;

                                                LB3TSE.GridFunzioni GridFunzioni = new LB3TSE.GridFunzioni();
                                                /* Se licenza attiva su software acquistato*/
                                                if (Session["LicenzaOk"].ToString() == "True")
                                                {
                                                    //Se la licenza è attiva il banner è nascosto
                                                    MostraBannerGoogle = false;

                                                    /* Verifico se l'utente ha modificato l'immagine di Login*/
                                                    string imgUtente = Database.GetValore("SELECT LoginPageImg FROM TSESettings", "LoginPageImg");
                                                    if (imgUtente != "")
                                                    {
                                                        /* Visualizzo Immagine Utente*/
                                                        ImgLogin.ImageUrl = "public/LoginPage/" + imgUtente;
                                                        /* Non carico l'immagine da xml*/
                                                        ReadXmlImage = false;
                                                    }

                                                }
                                            }
                                            /* Se deve essere inserita l'immagine da xml. Caso di Modalità TSE senza alcun Path licenza impostato*/
                                            if (ReadXmlImage)
                                            {
                                                ImgLogin.ImageUrl = reader.ReadElementContentAsString();
                                            }
                                            else
                                            {
                                                reader.ReadElementContentAsString();
                                            }
                                            break;
                                        case "testo":
                                            LoginText.Controls.Add(new LiteralControl(reader.ReadElementContentAsString()));
                                            break;
                                        case "testobottone":
                                            testo = reader.ReadElementContentAsString();
                                            if (testo != "")
                                            {
                                                PanelBtnDescr.Visible = true;
                                                testoBtnDescr = testo;
                                            }
                                            break;
                                        case "linkbottone":
                                            testo = reader.ReadElementContentAsString();
                                            if (testo != "")
                                            {
                                                PanelBtnDescr.Visible = true;
                                                linkBtnDescr = testo;
                                            }
                                            break;
                                        case "swimagelogin":
                                            SwImageLogin.ImageUrl = reader.ReadElementContentAsString();
                                            break;
                                        case "bgdescriptioncolor":
                                            BGDescriptionColor = reader.ReadElementContentAsString();
                                            break;
                                        case "textdescriptioncolor":
                                            TextDescriptionColor = reader.ReadElementContentAsString();
                                            break;
                                    }
                                    break;
                                case XmlNodeType.Text:
                                    Console.Write(reader.Value);
                                    break;
                                case XmlNodeType.CDATA:
                                    Console.Write(reader.Value);
                                    break;
                                case XmlNodeType.ProcessingInstruction:
                                    Console.Write("<?{0} {1}?>", reader.Name, reader.Value);
                                    break;
                                case XmlNodeType.Comment:
                                    Console.Write("<!--{0}-->", reader.Value);
                                    break;
                                case XmlNodeType.XmlDeclaration:
                                    Console.Write("<?xml version='1.0'?>");
                                    break;
                                case XmlNodeType.Document:
                                    break;
                                case XmlNodeType.DocumentType:
                                    Console.Write("<!DOCTYPE {0} [{1}]", reader.Name, reader.Value);
                                    break;
                                case XmlNodeType.EntityReference:
                                    Console.Write(reader.Name);
                                    break;
                                case XmlNodeType.EndElement:
                                    Console.Write("</{0}>", reader.Name);
                                    break;
                            }
                        }
                    }

                    /* Imposto il Titolo Login*/
                    if (System.Configuration.ConfigurationManager.AppSettings["PositionOfApplicationNameInUrl"].ToString() == "1")
                        TitoloLogin = HomeAppTitle;
                    else
                    {
                        try
                        {
                            string[] urlpar = HttpContext.Current.Request.Url.ToString().Split('.');
                            if (urlpar[0].ToLower() == "http://www")
                                TitoloLogin = urlpar[1];
                            else
                                TitoloLogin = urlpar[0].Replace("http://", "");
                        }
                        catch
                        {
                            TitoloLogin = HttpContext.Current.Request.Url.Host;
                        }

                    }

                    /* Imposto i colori nel LoginDescription*/
                    linkBtnDescrColor = BGDescriptionColor;
                    PanelBtnDescr.Attributes["style"] = "background: #FFFFFF;";
                    PanelLoginButton.Attributes["style"] = "background:" + BGDescriptionColor + "; margin: 10px 0;";
                    PanelEmailRecuperoDati.Attributes["style"] = "background:" + BGDescriptionColor + ";";
                    LoginDescription.Attributes["style"] = "background: " + BGDescriptionColor + "; color: " + TextDescriptionColor + ";";

                    /* Controllo se attivo il link aggiungi ai preferiti*/
                    if (System.Configuration.ConfigurationManager.AppSettings["LoginBookmarkLink"].ToString() != "")
                    {
                        string[] data = System.Configuration.ConfigurationManager.AppSettings["LoginBookmarkLink"].ToString().Split(',');
                        BookmarkPanel.Visible = true;
                        BookmarkPanel.Attributes["style"] = "color:" + BGDescriptionColor + ";";
                        BookmarkText = data[0];
                        /* Se presente immagine*/
                        if (data[1] != "")
                        {
                            BookmarkImg.Visible = true;
                            BookmarkImg.ImageUrl = "images/icons/" + data[1];
                        }
                    }

                    /* controllo se il Recupero Dati è attivato da Web.config*/
                    if (System.Configuration.ConfigurationManager.AppSettings["LostLoginPanel"].ToString() != "")
                    {
                        string[] data = System.Configuration.ConfigurationManager.AppSettings["LostLoginPanel"].ToString().Split(';');
                        DatiAccesso.Controls.Add(new LiteralControl("<p>" + data[0] + " <span style=\"color:" + BGDescriptionColor + "; cursor:pointer;\" onclick=\"$('#RecuperoDati').css('display','block');\">" + data[1] + "</span></p>"));
                    }

                    /* Inserisco i caption nell'User e Password e Email*/
                    usernameLoginTSE.Attributes["placeholder"] = System.Configuration.ConfigurationManager.AppSettings["YourUsernameCaption"];
                    passwordLoginTSE.Attributes["placeholder"] = System.Configuration.ConfigurationManager.AppSettings["YourPasswordCaption"];
                    UserEmail.Attributes["placeholder"] = System.Configuration.ConfigurationManager.AppSettings["YourEmailCaption"];
                    /* In caso di browser IE disabilito l'autocomplete su User e Email*/
                    if (Request.Browser.Browser == "IE")
                    {
                        usernameLoginTSE.Attributes["AutoCompleteType"] = "Disabled";
                        UserEmail.Attributes["AutoCompleteType"] = "Disabled";
                    }
                }
            }
        }
        catch (Exception ex)
        {
            new LB3TSE.GridFunzioni().StampaErrore(ex.ToString());
        }
        finally
        {
            Database.ChiudiConn();
            Database = null;
        }
    }

    protected void RecuperoDati_Click(object sender, System.EventArgs e)
    {
        /* Verifico se esiste il DBSoftware oppure se è un sito*/
        if (System.Configuration.ConfigurationManager.AppSettings["DBPathLicenza"].ToString() != "")
        {
            LB3TSE.Funzioni Funzioni = new LB3TSE.Funzioni();
            string[] UsrPsw = Funzioni.CheckRegisteredUsers(UserEmail.Text);

            if (UsrPsw.Length > 1)
            {
                /* Utente registrato invio email con credenziali, invio Email Dati Accesso*/
                Funzioni.InviaEmail(UsrPsw[0], UsrPsw[1], UserEmail.Text, "", "");

                /* Messagio Email inviata con successo*/
                LabelRecuperoDati.Controls.Add(new LiteralControl("<div class='ui-state-highlight ui-corner-all' style='padding: 0 .7em;'><p><span class='ui-icon ui-icon-info' style='float: left; margin-right: .3em;'></span>" + System.Configuration.ConfigurationManager.AppSettings["LoginDataSent"] + "</p></div>"));
            }
            else
            {
                /* Email Utente non presente: messaggio errore */
                LabelRecuperoDati.Controls.Add(new LiteralControl("<div class='ui-state-highlight ui-corner-all' style='padding: 0 .7em;'><p><span class='ui-icon ui-icon-info' style='float: left; margin-right: .3em;'></span>" + System.Configuration.ConfigurationManager.AppSettings["LoginDataNotSent"] + "</p></div>"));
            }

            Funzioni = null;
        }
    }

   
public void CheckClientAlert() {
        String ClientAlert = Request["ClientAlert"];
        if (ClientAlert != null && ClientAlert != "")
        {
        LB3TSE.Funzioni Funzioni = new LB3TSE.Funzioni();
        LB3TSE.GridFunzioni GridFunzioni = new LB3TSE.GridFunzioni();
        Response.Write("<br>");
        GridFunzioni.StampaErrore(HttpUtility.UrlDecode(ClientAlert));//Funzioni.DecodeString(ClientAlert));
        Funzioni = null;
        GridFunzioni = null;
    }

}


public string TitoloPagina()
{
    LB3TSE.GridFunzioni GridFunzioni = new LB3TSE.GridFunzioni();
    String TitoloPagina="";

    if (Request["mode"] == "6") { //Caso di Report
        TitoloPagina = GridFunzioni.SeparaStringaUpperCase(Request["rpt"]);
    }else{
        TitoloPagina = GridFunzioni.SeparaStringaUpperCase(AppTitle);
    }

    GridFunzioni = null;
    return TitoloPagina;
}



    public void WriteJSLink()
    {
        if (System.Configuration.ConfigurationManager.AppSettings["WriteJSLink"] != "")
        {

            string[] WriteJSLink = System.Configuration.ConfigurationManager.AppSettings["WriteJSLink"].Split(';'); ;

            string ris = "";
            for (int k = 0; k < WriteJSLink.Length; k++)
            {
                        if (WriteJSLink[k] != "")
                        {
                            ris += "<script type=\"text/javascript\" src=\"" + WriteJSLink[k] + "\"></script>" + Environment.NewLine;
                        }
            }

            Response.Write(ris);
        }
        if (System.Configuration.ConfigurationManager.AppSettings["JSFunctionOnDelete"] != "")
        {
            Response.Write("<script type=\"text/javascript\" src=\"js/Funzioni.js\"></script>");
        }
    }

    public string AppTitle
    {
        get { return Session["AppTitle"] != null ? Convert.ToString(Session["AppTitle"]) : HomeAppTitle; }
        set
        {
            Response.Write(value);
            Session["AppTitle"] = value;
        }
    }

    public string HomeAppTitle
    {
        get { return Session["HomeAppTitle"] != null ? Convert.ToString(Session["HomeAppTitle"]) : ""; }
        set
        {
            Response.Write(value);
            Session["HomeAppTitle"] = value;
        }
    }

    public string RequestName
    {
        get { return Session["RequestName"] != null ? Session["RequestName"].ToString() : ""; }
        set
        {
            Session["RequestName"] = value;
        }
    }
    //mode 0 Visualizzazione Classica Tabella
    //mode 1 inserimento record
    //mode 2 modifica del record
    //mode 3 eliminazione del record
    //mode 4 InsertTabRelation
    //mode 5 load control

    protected void Page_Load(object sender, EventArgs e)
    {



        LabelRecuperoDati.Text = "";
        Required_UserEmail.Text = System.Configuration.ConfigurationManager.AppSettings["LoginDataNotSent"];
        SearchValidator.ErrorMessage = System.Configuration.ConfigurationManager.AppSettings["SearchStringFormatNotValid"];


        LB3TSE.GridFunzioni GridFunzioni = new LB3TSE.GridFunzioni();
        LB3TSE.Funzioni Funzioni = new LB3TSE.Funzioni();


        /* Laboratre Key. Retrieve features from extra XML file
        /*******************************************************************************************************************/
        if (System.Configuration.ConfigurationManager.AppSettings["FunctionsActivatedFromXml"] != null)
        {
            if ((System.Configuration.ConfigurationManager.AppSettings["FunctionsActivatedFromXml"].ToString() != "") && (System.Web.HttpContext.Current.Session["FunctionsActivated"] == null))
            {
                Funzioni.FunctionsFromXml("");
            }
        }
        /*******************************************************************************************************************/

        try
        {
            if (Request.QueryString["logout"] == "true") GridFunzioni.LogOut();

            if ((Request.QueryString["name"] != RequestName) && (Request.QueryString["DetailTable"] != "1") && (Request.QueryString["NoHeader"] != "1"))
            {
                RequestName = Request.QueryString["name"];
                Session["StrFilter" + AppTitle] = null;
                Session["FilterText" + AppTitle] = null;
            }

            String modalita = Request.QueryString["mode"];

            if (GridFunzioni.CheckLogin("", "", null) == false) modalita = "";

            GridFunzioni.CreaHeaderLinks(HeaderLinks);

            GridSearchButton.Text = System.Configuration.ConfigurationManager.AppSettings["SearchCaption"];
            GridSearchResetButton.Text = System.Configuration.ConfigurationManager.AppSettings["ShowAllCaption"];
            SaveBtn.Text = System.Configuration.ConfigurationManager.AppSettings["SaveBtnCaption"];
            DelBtn.Text = System.Configuration.ConfigurationManager.AppSettings["DelBtnCaption"];
            CancBtn.Text = System.Configuration.ConfigurationManager.AppSettings["CancBtnCaption"];

            //FormatoData per il DatePicker
            FormatoDatePicker = GridFunzioni.GetFormatoData().ToLower().Replace("yyyy", "yy");

            switch (modalita)
            {

                case "4"://InsertTabRelation
                case "0"://Visualizzazione Tabella
                case "6"://Reports

                    //In caso di DetailTable o PopUp vari di inserimento è escluso il caricamento del menù
                    if (Request.QueryString["NoHeader"] != "1" && Request.QueryString["NoMenu"] != "1")
                    {
                        //visualizzazione classica tabella
                        ElencoTabelle.Visible = true;
                        GridFunzioni.ElencoTabelle_Load(ElencoTabelle);
                    }


                    PanelSingolaTabella.Visible = true;

                    if (Request.QueryString["mode"] == "4")
                    {
                        //InsertTabRelation
                        //Nascondo i campi Modifica/Elimina nel caso InsertTabRelation
                        TabellaDati.Columns[0].HeaderText = System.Configuration.ConfigurationManager.AppSettings["InsCaption"];
                        TabellaDati.Columns[1].Visible = false;
                        TabellaDati.Columns[2].Visible = false;
                    }
                    else
                    {
                        if (Request.QueryString["noHeader"] != "1" && Request.QueryString["mode"] != "6")//6 = Report
                        {
                            TabellaDati.Columns[0].HeaderText = "<span title=\"" + System.Configuration.ConfigurationManager.AppSettings["SelAllCaption"] + "\" class=\"CheckBox\"><input type=\"checkbox\" id=\"selectAll\"></span>";
                        }
                        else{
                            TabellaDati.Columns[0].Visible = false;
                        }


                        if (Request.QueryString["mode"] == "6")
                        {
                            TabellaDati.Columns[1].HeaderText = ""; //Colonna visibile per inserire in Header il pulsante di Filtro Composto
                            TabellaDati.Columns[2].Visible = false;
                        }
                        else {
                            TabellaDati.Columns[1].HeaderText = System.Configuration.ConfigurationManager.AppSettings["EditCaption"];
                            TabellaDati.Columns[2].HeaderText = System.Configuration.ConfigurationManager.AppSettings["DelCaption"];
                        }

                        //Vado alla pagina memorizzata in sessione solo se tabella corrisponde e se
                        //la pagina è caricata dopo salvataggio, modifica, cancellazione, annulla record
                        if (Session["RecordPerPage" + AppTitle] != null && Request.QueryString["ClickForm"] == "1")
                        {
                            TabellaDati.PageSize = Convert.ToInt32(Session["RecordPerPage" + AppTitle]);
                        }
                        else
                        {
                            Session["RecordPerPage" + AppTitle] = null;
                        }

                        if (Session["PageIndex" + AppTitle] != null && Request.QueryString["ClickForm"] == "1")
                        {
                            TabellaDati.PageIndex = Convert.ToInt32(Session["PageIndex" + AppTitle]);
                        }
                        else
                        {
                            Session["PageIndex" + AppTitle] = null;
                        }
                    }

                    string NomeTabella = null;
                    NomeTabella = Request.QueryString["name"];

                    // Richiamo i dati solo al primo load pagina
                    if (!IsPostBack)
                    {

                        TableTitle = GridFunzioni.TableTitle;


                        if (Request.QueryString["mode"] == "6")
                        {
                            //---------------- CreateDataSourceReport -------------------
                            GridFunzioni.CreateDataSourceReport(TabellaDati, Request.QueryString["name"], Request.QueryString["rpt"]);
                        }
                        else
                        {
                            //---------------- CreateDataSourceGrid -------------------
                            //La funzione crea la sorgente dati per il TabellaDati una sola volta e la tiene in sessione per paginazione e ricerca
                            GridFunzioni.CreateDataSourceGrid(TabellaDati, Request.QueryString["name"]);
                        }//Fine mode 0


                            ColumnIDPosition = GridFunzioni.ColumnIDPosition;
                            string[] DeleteBut = (System.Configuration.ConfigurationManager.AppSettings["HideDeleteButtonGrid"] + GridFunzioni.CheckKeyUpdatesFromXml("HideDeleteButtonGrid")).Split(';');
                            bool fine = false;
                            for (int i = 0; (i < DeleteBut.Length) && (!fine); i++)
                            {
                                if (DeleteBut[i].ToLower() == NomeTabella.ToLower() || DeleteBut[0].ToLower() == AppTitle.ToLower())
                                {
                                    ColumnIDPosition--;
                                    fine = true;
                                }
                            }

                            string[] EditBut = (System.Configuration.ConfigurationManager.AppSettings["HideEditButtonGrid"] + GridFunzioni.CheckKeyUpdatesFromXml("HideEditButtonGrid")).Split(';');
                            fine = false;
                            for (int i = 0; (i < EditBut.Length) && (!fine); i++)
                            {
                                if (EditBut[i].ToLower() == NomeTabella.ToLower() || EditBut[0].ToLower() == AppTitle.ToLower())
                                {
                                    ColumnIDPosition--;
                                    fine = true;
                                }
                            }

                            string[] CustomLink = (System.Configuration.ConfigurationManager.AppSettings["CustomRowLink"] + GridFunzioni.CheckKeyUpdatesFromXml("CustomRowLink")).Split(';');
                            string[] DatiCustomLink;
                            for (int i = 0; i < CustomLink.Length; i++)
                            {
                                DatiCustomLink = CustomLink[i].Split(',');
                                if (DatiCustomLink[0].ToLower() == NomeTabella.ToLower() || DatiCustomLink[0].ToLower() == AppTitle.ToLower())
                                    ColumnIDPosition++;
                            }




                        DataTable dt = (DataTable)Session["Source" + AppTitle];


                        if (Session["PageSort" + AppTitle] != null && Request.QueryString["ClickForm"] == "1")
                        {

                            dt.DefaultView.Sort = Session["PageSort" + AppTitle].ToString();
                            TabellaDati.DataSource = dt;
                            TabellaDati.DataBind();
                        }
                        //else if (Request.QueryString["ClickForm"] != "1" && Request.QueryString["mode"] == "0" && PanelSingolaTabella.Visible == true)
                        //{
                        //((System.Web.UI.Page)System.Web.HttpContext.Current.Handler).ClientScript.RegisterClientScriptBlock(this.GetType(), "Alert", "<script type = 'text/javascript'>alert('->Cancellato');</script>");
                        //Session["SortDirection"] = null;
                        //Session["SortExpression"] = null;
                        //}

                        
                        if (Session["StrFilter" + AppTitle] != null && Request.QueryString["ClickForm"] == "1")
                        {



                            String StringaFiltro = "";
                            string[] SplitFiltroSessione;

                            if (Session["StrFilter" + AppTitle].ToString().IndexOf("§") > 0)
                            {//Filtro da campo ricerca unico
                                SplitFiltroSessione = Session["StrFilter" + AppTitle].ToString().Split("§".ToCharArray());
                            }
                            else
                            {//filtro multiplo
                                SplitFiltroSessione = Session["StrFilter" + AppTitle].ToString().Split("ƒ".ToCharArray());
                            }

                            for (int i = 0; i < SplitFiltroSessione.Length - 1; i++)
                            {
                                StringaFiltro += SplitFiltroSessione[i];
                                if (SplitFiltroSessione.Length - 1 > i + 1)
                                {
                                    StringaFiltro += " AND ";
                                }
                            }


                            dt.DefaultView.RowFilter = StringaFiltro;
                            TabellaDati.DataSource = dt;
                            TabellaDati.DataBind();


                            UpdateFilterValues();

                        }


                        if (dt != null)
                        {
                            if (dt.Rows.Count == 0)
                            {
                                NoRecords.Text = GridFunzioni.GetTestoInfo(System.Configuration.ConfigurationManager.AppSettings["NoRecordsCaption"]);
                            }
                        }

                        dt = null;

                    }


                        GridFunzioni.CheckHideNewButton(AddNewButton, NomeTabella);
                        GridFunzioni.CheckOtherButton(AddOtherButton, NomeTabella);


                    break;

                //ControlPanel
                case "5":
                    ElencoTabelle.Visible = true;
                    GridFunzioni.ElencoTabelle_Load(ElencoTabelle);
                    PanelSingolaTabella.Visible = false;
                    PanelFormDati.Visible = false;

                    if (Request.QueryString["control"] != null)
                    {
                        UserControl uc = (UserControl)Page.LoadControl("" + Request.QueryString["control"]);
                        ControlPanel.Controls.Add(uc);
                    }

                    break;


                case "1":
                case "2":
                case "3":
                    //inserimento nuovo record
                    ElencoTabelle.Visible = false;
                    PanelFormDati.Visible = true;

                    //richiamo funzione per creazione,modifica o eliminazione record
                    GridFunzioni.CreaFormDati(Request.QueryString["name"], Request.QueryString["mode"], RecordTable);

                    break;


                //Caso Home Page ---------------
                default:


                    if (GridFunzioni.CheckLogin("", "", null) == true)
                    {
                        GridFunzioni.ElencoTabelle_Load(ElencoTabelle);

                    }
                    else
                    {   /* Login*/
                        Login.Visible = true;
                        /* Inserisco i testi dei bottoni da web.config*/
                        LoginButton.Text = System.Configuration.ConfigurationManager.AppSettings["LoginBtnCaption"].ToString();
                        EmailRecuperoDati.Text = System.Configuration.ConfigurationManager.AppSettings["CheckEmailCaption"].ToString();

                        Session["LicenzaOk"] = GridFunzioni.CheckLicenza(LicenzaMessage, FormFieldLogin, PanelLicenzaMessage);

                    }

                    break;
            }

            if (!Login.Visible)
                /* Controllo se primo accesso per attivare la guida*/
                IDGuidaFirstAccess = Funzioni.FirstAccessGuide(Request["name"]);

            //se browser utilizzato è IE5, IE6, IE7 disabilito utilizzo del programma                 
            if (Request.UserAgent.IndexOf("MSIE 6.0", 0) > 0 || Request.UserAgent.IndexOf("MSIE 7.0", 0) > 0 || Request.UserAgent.IndexOf("MSIE 5.5", 0) > 0)
            {
                FormLogin.Visible = false;
                AggiornaBrowser.Visible = true;
            }


        }
        catch (Exception ex)
        {
            GridFunzioni.StampaErrore(ex.ToString());
        }
        finally
        {
            GridFunzioni = null;
        }

        // added by Devin so custom code runs on page load
        AddAsyncControls();
    }

    //protected void Page_Init(object sender, EventArgs e)
    //{
        
    //}

    protected void UpdateFilterValues() {

        //Aggiorno i valori di ricerca nei campi di Filtro Composto
        if (Session["FilterText" + AppTitle] != null)
        {
            String FilterText = Session["FilterText" + AppTitle].ToString();


            if (FilterText.IndexOf("§") > 0)//Trattasi di filterText da campo singolo
            {
                txtSearch.Text = FilterText.Remove(FilterText.Length - 1);
                ApplyHighlight();
            }
            else
            {
                Page page = (Page)System.Web.HttpContext.Current.Handler;
                Dictionary<string, string> ValoriRicerca = (Dictionary<string, string>)Session["FilterText" + AppTitle];
                foreach (KeyValuePair<string, string> pair in ValoriRicerca)
                {
                    if (pair.Value == "☐" || pair.Value == "✔")
                    {
                        DropDownList BitFilter = (DropDownList)Funzioni.FindControl(page, "bitfilter_" + pair.Key);
                        BitFilter.Text = pair.Value;
                    }
                    else
                    {
                        TextBox TextControl = (TextBox)Funzioni.FindControl(page, "txtfilter_" + pair.Key);
                        TextControl.Text = pair.Value;
                    }
                }

            }

        }

    
    }


    protected void GridSearchButton_Click(object sender, EventArgs e)
    {

        LB3TSE.Funzioni Funzioni = new LB3TSE.Funzioni();
        LB3TSE.GridFunzioni GridFunzioni = new LB3TSE.GridFunzioni();

        //Reset pagine prima del filtro
        Page page = (Page)System.Web.HttpContext.Current.Handler;
        DropDownList ddlPager = (DropDownList)Funzioni.FindControl(page, "ddlPager");
        ddlPager.Items.Clear();

        DropDownList ddlFooterPager = (DropDownList)Funzioni.FindControl(page, "ddlFooterPager");
        if (ddlFooterPager != null){
        ddlFooterPager.Items.Clear();
        }

        DataTable dt = (DataTable)Session["Source" + AppTitle];

        try
        {
            if (dt != null)
            {
                if (!string.IsNullOrEmpty(txtSearch.Text))
                {
                    string StrFilter = null;
                    string TempFilter = null;
                    string SearchText = null;
                    SearchText = txtSearch.Text.Replace("'", "''");

                    String[] TestoRicerca = SearchText.Split(" ".ToCharArray());
                    for (int z = 0; z < TestoRicerca.Length; z++)
                    {

                        foreach (DataColumn dc in dt.Columns)
                        {
                            
                            //Response.Write("tipo campo: " + dc.ColumnName + " - " + dc.DataType.ToString() + "<br>");
                            
                            //se la colonna è abilitata nel web.config effettuo la ricerca
                            if (Funzioni.TableFieldInArray("HideTableField", dc.ColumnName.ToString(), Request.QueryString["name"], System.Web.HttpContext.Current.Session["AppTitle"].ToString()) == false)
                            {

                                if (dc.DataType.ToString() == "System.String")
                                {
                                    TempFilter += dc.ColumnName + " LIKE '%" + TestoRicerca[z] + "%' OR ";
                                }
                                else if (dc.DataType.ToString() == "System.DateTime")
                                {

                                    TempFilter += "SUBSTRING((CONVERT(" + dc.ColumnName + ",System.String)),1,10) LIKE '%" + TestoRicerca[z] + "%' OR ";

                                }
                                else if (dc.DataType.ToString() == "System.Int32")
                                { 
                                    Int32 result;
                                    if (Int32.TryParse(TestoRicerca[z], out result))
                                    {// The string was a valid integer
                                        TempFilter += dc.ColumnName + " = " + TestoRicerca[z] + " OR ";
                                    }

                                }
                                else if (dc.DataType.ToString() == "System.Double")
                                {
                                    Double result;
                                    if (Double.TryParse(TestoRicerca[z], out result))
                                    {// The string was a valid integer
                                        TempFilter += dc.ColumnName + " = '" + TestoRicerca[z] + "' OR ";
                                    }

                                }
                            }
                        }

                        //Elimino l'ultimo Or e aggiungo parentesi
                        TempFilter = " (" + TempFilter.Substring(0, TempFilter.Length - 3) + ") ";
                        StrFilter += TempFilter;
                        TempFilter = null;


                        if (z < TestoRicerca.Length - 1)
                        {
                            StrFilter += " AND ";
                        }

                    }

                    //Response.Write("StrFilter: " + StrFilter + "<br>");

                    //Aggiungo il filtro di sessione se esite per le combo
                    String StringaSessione = "";

                    //Se esiste filtro di sessione precedente
                    if (Session["StrFilter" + AppTitle] != null)
                    {

                        string[] SplitFiltroSessione = Session["StrFilter" + AppTitle].ToString().Split("§".ToCharArray());
                        for (int i = 0; i < SplitFiltroSessione.Length - 1; i++)
                        {
                            //Aggiorno il filtro con la nuova stringa di filtro inserita
                            if (SplitFiltroSessione[i].IndexOf(" (") == -1)
                            {
                                StringaSessione += SplitFiltroSessione[i] + "§";
                            }
                        }

                    }


                    Session["StrFilter" + AppTitle] = StringaSessione + StrFilter + "§";
                    Session["FilterText" + AppTitle] = txtSearch.Text + "§";

                    StrFilter = StringaSessione.Replace("§", " AND ") + StrFilter;

                    //Response.Write("StrFilter: " + StrFilter + "<br><br> StringaSessione: " + StringaSessione + "<br>");

                    dt.DefaultView.RowFilter = StrFilter;

                    ApplyHighlight();
                    Funzioni = null;


                }
                else
                {
                    //Resetto i parametri di ricerca
                    dt.DefaultView.RowFilter = "";
                    Session["StrFilter" + AppTitle] = null;
                    Session["FilterText" + AppTitle] = null;
                }

            }

            TabellaDati.DataSource = Session["Source" + AppTitle];
            TabellaDati.DataBind();

            if (TabellaDati.Rows.Count == 0)
            {
                NoRecords.Text = GridFunzioni.GetTestoInfo(System.Configuration.ConfigurationManager.AppSettings["NoRecordsCaption"]);
            }
            else
            {
                NoRecords.Text = "";
            }
        }
        catch (Exception ex)
        {
            GridFunzioni.StampaErrore(ex.ToString());
        }
        finally
        {
            Funzioni = null;
            GridFunzioni = null;
        }
    }



    protected void ApplyHighlight()
    {

        if (!string.IsNullOrEmpty(txtSearch.Text))
        {
            //Seleziono il testo di ricerca se abilitato
            String[] TestoRicerca = txtSearch.Text.Split(" ".ToCharArray());

            String SearchText = "";
            for (int z = 0; z < TestoRicerca.Length; z++)
            {
                SearchText += ".highlight('" + TestoRicerca[z] + "')";
            }

            ClientScript.RegisterStartupScript(this.GetType(), "ClientScript", "javascript:void($('.GridViewRowStyle td,.GridViewAlternatingRowStyle td').removeHighlight('')" + SearchText + ");", true);

        }
    }


    protected void GridSearchResetButton_Click(object sender, EventArgs e)
    {


        Session["StrFilter" + AppTitle] = null;
        Session["FilterText" + AppTitle] = null;
        txtSearch.Text = null;

        DataTable dt = Session["Source" + AppTitle] as DataTable;
        dt.DefaultView.RowFilter = null;
        TabellaDati.DataSource = dt;
        TabellaDati.DataBind();

        if (TabellaDati.Rows.Count == 0)
        {
            LB3TSE.GridFunzioni GridFunzioni = new LB3TSE.GridFunzioni();
            NoRecords.Text = GridFunzioni.GetTestoInfo(System.Configuration.ConfigurationManager.AppSettings["NoRecordsCaption"]);
            GridFunzioni = null;
        }
        else
        {
            NoRecords.Text = "";
        }


    }


    protected void Login_Click(object sender, System.EventArgs e)
    {
        LB3TSE.GridFunzioni GridFunzioni = new LB3TSE.GridFunzioni();
        GridFunzioni.CheckLogin(usernameLoginTSE.Text, passwordLoginTSE.Text, LoginMessage);
        GridFunzioni.CheckNumeroAccessi();
        GridFunzioni = null;

    }


    //cambio pagina del gridview
    protected void TabellaDati_PageIndexChanging(object sender, System.Web.UI.WebControls.GridViewPageEventArgs e)
    {


        if (e.NewPageIndex > -1)
        {
            TabellaDati.PageIndex = e.NewPageIndex;
            Session["PageIndex" + AppTitle] = e.NewPageIndex;
        };


        DataTable dt = (DataTable)Session["Source" + AppTitle];
        TabellaDati.DataSource = dt;
        TabellaDati.DataBind();

        UpdateFilterValues();
        //ApplyHighlight();

    }


    protected void TabellaDati_PageSizeChange(object sender, PageSizeChangeEventArgs e)
    {

        Session["RecordPerPage" + AppTitle] = e.NewPageSize;
        TabellaDati.PageSize = e.NewPageSize;

        TabellaDati.PageIndex = 0;
        Session["PageIndex" + AppTitle] = 0;



        DataTable dt = (DataTable)Session["Source" + AppTitle];
        TabellaDati.DataSource = dt;
        TabellaDati.DataBind();

        UpdateFilterValues();
        //ApplyHighlight();


    }




    protected void SortGrid(object sender, GridViewSortEventArgs e)
    {
        LB3TSE.GridFunzioni GridFunzioni = new LB3TSE.GridFunzioni();

        try
        {
            Session["StartSorting"] = "1";

            DataTable dt = Session["Source" + AppTitle] as DataTable;
            if (dt != null)
            {
                //Ordino i dati
                Session["PageSort" + AppTitle] = e.SortExpression + " " + GridFunzioni.GetSortDirection(e.SortExpression);
                dt.DefaultView.Sort = Session["PageSort" + AppTitle].ToString();

                TabellaDati.DataSource = dt;
                TabellaDati.DataBind();

                //ApplyHighlight();
                UpdateFilterValues();

                Session["StartSorting"] = null;
            }
        }
        catch (Exception ex)
        {
            GridFunzioni.StampaErrore(ex.ToString());
        }
        finally
        {
            GridFunzioni = null;
        }

    }


    //personalizzazione cella gridview
    protected void TabellaDati_RowDataBound(object sender, System.Web.UI.WebControls.GridViewRowEventArgs e)
    {

        LB3TSE.GridFunzioni GridFunzioni = new LB3TSE.GridFunzioni();

        try
        {

            if (PanelSingolaTabella.Visible == true)
            {

                if ((e.Row.RowType == DataControlRowType.DataRow))
                {

                    if (Request["mode"] != "6")//Report
                    {
                        GridFunzioni.FormatGriglia(TabellaDati, e.Row, 35, Request.QueryString["name"]);
                        GridFunzioni.CreateTableLinks(TabellaDati, Request.QueryString["name"], e.Row);
                    }

                }

            }

        }
        catch (Exception ex)
        {
            GridFunzioni.StampaErrore(ex.ToString());

        }
        finally
        {
            GridFunzioni = null;

        }
    }



    //-----------------------------------------------------------------------
    protected void Salva_Click(object sender, System.EventArgs e)
    {
        LB3TSE.GridFunzioni GridFunzioni = new LB3TSE.GridFunzioni();
        String NomeTabella = Request["name"];

        try
        {
            
            if (Request.QueryString["mode"] != "3")
            {
                string Errore = null;
                Errore = GridFunzioni.CreaQuerySql(RecordTable, NomeTabella, Request["mode"]);
                if (!string.IsNullOrEmpty(Errore)) GridFunzioni.StampaErrore(Errore);
                SaveFile(); // Added by Devin, this will get called when the Save button is clicked
            }
            GridFunzioni.EseguiQuerySql(NomeTabella, Request["mode"]);
        }
        catch (Exception ex)
        {
            Response.Write(ex.ToString());

        }
        finally
        {
            GridFunzioni = null;
        }
    }




    protected void Annulla_Click(object sender, System.EventArgs e)
    {

        LB3TSE.GridFunzioni GridFunzioni = new LB3TSE.GridFunzioni();
        GridFunzioni.AnnullaClick();
        GridFunzioni = null;
    }



    protected override void InitializeCulture()
    {
        System.Threading.Thread.CurrentThread.CurrentCulture =
        System.Globalization.CultureInfo.CreateSpecificCulture(System.Configuration.ConfigurationManager.AppSettings["Language"]);
        System.Threading.Thread.CurrentThread.CurrentUICulture = new System.Globalization.CultureInfo(System.Configuration.ConfigurationManager.AppSettings["Language"]);
    }

    // Various methods added by Devin

    // method i set to run on page load after everything else, so it can work with whatever table TSE generated
    protected void AddAsyncControls()
    {
        // have to use try with an empty catch, because sometimes TSE mysteriously sets mode incorrectly (like when you hit Cancel from a form, mode sometimes stays 1 or 2)
        // empty catch makes it so if anything in the try fails, it just gives up and stops, which is what we want
        // mode being set incorrectly may still have unforseen consequences if code is executed on the wrong page without causing an error, but no issues i'm aware of yet
        try
        {
            // modes: 0 = table, 1 = new record form, 2 = edit record form, 3 = delete record form
            string mode = Request.QueryString["mode"];

            // if new or edit record
            if (mode == "1" || mode == "2")
            {
                // get table name from the url (note, this deals with the name of the table in the db, not what is displayed in TSE, ie BoardMeetingsCMS not Board Meetings)
                // ToLower for consistency, make sure you only compare to lowercase strings
                string tableName = Request.QueryString["name"].ToLower();

                // cannot simply put a runat=server AsyncFileUpload in index.aspx, so it must be created manually in code with necessary properties/attributes applied
                // refer to https://github.com/DevExpress/AjaxControlToolkit/wiki/AsyncFileUpload for AsyncFileUpload documentation
                AsyncFileUpload asyncControl = PremadeAsyncFileUpload();

                if (tableName == "contacts")
                {
                    // for contacts, the row where "Photo" is located is at index 2 (0 for hidden pk, 1 for all the tabbed columns)
                    TableRow editRow = RecordTable.Rows[2];
                    // cells 0 = label, cells 1 = textbox. this will append an AsyncFileUpload control to the end of the textbox
                    editRow.Cells[1].Controls.Add(asyncControl);
                    // find the textbox itself and make it read-only so only our code can alter its value
                    TextBox field = (TextBox)FindControl("photo");
                    field.Attributes.Add("readonly", "readonly");

                    // for reasons unknown, this fixes a weird css occurance where format goes all over the place (doesn't have to be 800, seemingly just needs to be "big")
                    editRow.Cells[1].Attributes.Add("style", "max-width: 800px");
                }

                if (tableName == "worksheetscms")
                {
                    // make a new table cell that holds the async control
                    TableCell newCell = new TableCell();
                    newCell.Controls.Add(asyncControl);

                    // find the right row and give it that cell (can't do this with tabbed panels due to formatting quirk)
                    TableRow editRow = RecordTable.Rows[3];
                    editRow.Cells.Add(newCell);
                    // make textbox read-only
                    TextBox field = (TextBox)FindControl("sheetfilename");
                    field.Attributes.Add("readonly", "readonly");
                }

                if (tableName == "boardmeetingscms")
                {
                    // number the different asyncControls so we can tell them apart
                    AsyncFileUpload asyncControl1 = PremadeAsyncFileUpload();
                    AsyncFileUpload asyncControl2 = PremadeAsyncFileUpload();
                    AsyncFileUpload asyncControl3 = PremadeAsyncFileUpload();
                    AsyncFileUpload asyncControl4 = PremadeAsyncFileUpload();

                    // use custom method to assign custom IDs to the controls, as well as insert them where they belong on the form
                    AddAsyncFileUploadTabbedPanels(asyncControl1, 1);
                    AddAsyncFileUploadTabbedPanels(asyncControl2, 2);
                    AddAsyncFileUploadTabbedPanels(asyncControl3, 3);
                    AddAsyncFileUploadTabbedPanels(asyncControl4, 4);

                    // make all necessary textboxes read-only
                    TextBox field1 = (TextBox)FindControl("agenda");
                    field1.Attributes.Add("readonly", "readonly");
                    TextBox field2 = (TextBox)FindControl("minutes");
                    field2.Attributes.Add("readonly", "readonly");
                    TextBox field3 = (TextBox)FindControl("notice");
                    field3.Attributes.Add("readonly", "readonly");
                    TextBox field4 = (TextBox)FindControl("packet");
                    field4.Attributes.Add("readonly", "readonly");
                }
            }
        }
        catch
        {

        }
    }


    // method to streamline the addition of AsyncFileUpload controls when tabbed panels are used
    // preferably only use this when multiple AsyncControls are needed (because it forces numbered IDs, which is only necessary when there are multiple controls)
    // currently, this only applies to the board meetings table
    // pass in an already existing and numbered AsyncFileUpload control, followed by a number that matches the number of the AsyncFileUpload control you pass in (see where this method is called for examples)
    private void AddAsyncFileUploadTabbedPanels(AsyncFileUpload asyncControl, int number)
    {
        // assign an appropriate ID based on number passed in
        asyncControl.ID = "asyncControl" + number;
        // TSE layout will generally be row[0] = hidden pk field, row[1] = tabbed pannels, row[2] and onward are remaining rows
        // for example, the first async control will be 1, therefore 1+1, row[2] (which will generally be where you want the first control, but you can plan around that)
        TableRow editRow = RecordTable.Rows[number + 1];
        // cell[0] is the label, cell[1] is the textbox, this appends the control after the textbox
        editRow.Cells[1].Controls.Add(asyncControl);
        // for reasons unknown, setting a large max-width prevents the table layout from becoming a mess, even though it doesn't utilize this max-width
        editRow.Cells[1].Attributes.Add("style", "max-width: 800px; padding-bottom: 10px");
    }

    // all the async controls will behave the same way, but there can be multiple at once. this method just helps keep things clean and less repetitive by returning a premade AsyncFileUpload object
    private AsyncFileUpload PremadeAsyncFileUpload()
    {
        // cannot simply put a runat=server AsyncFileUpload in index.aspx, so it must be created manually in code with necessary properties/attributes applied
        // refer to https://github.com/DevExpress/AjaxControlToolkit/wiki/AsyncFileUpload for AsyncFileUpload documentation
        AsyncFileUpload asyncControl = new AsyncFileUpload();
        // good chance that it's important for ID and variable name to match. if i get time i'll test it
        // even if they don't need to match, it's good practice anyway because the ID of a runat server element is how you refer to it in .cs code anyway
        asyncControl.ID = "asyncControl"; 
        asyncControl.OnClientUploadComplete = "PopulateFileNameField";
        asyncControl.OnClientUploadStarted = "CheckUpload";
        asyncControl.OnClientUploadError = "UploadError";
        asyncControl.Attributes.Add("runat", "server");
        asyncControl.UploaderStyle = AsyncFileUploaderStyle.Traditional; // "Modern" looks weird to me, play with it if you want
        asyncControl.ClientIDMode = ClientIDMode.AutoID; // i don't fully understand this but i'm pretty sure it's important
        asyncControl.UploadedComplete += new EventHandler<AsyncFileUploadEventArgs>(this.asyncControl_UploadedComplete);

        return asyncControl;
    }

    private void asyncControl_UploadedComplete(object sender, AsyncFileUploadEventArgs e)
    {
        // try catch cause dealing with files
        try
        {
            // "sender" in this context is the specific AsyncFileUpload control that triggered the event, so cast sender as such so we can work with it
            AsyncFileUpload asyncControl = (AsyncFileUpload)sender;
            // details are foggy for me, but the jist of it is that AsyncFileUpload uses iframes, and window.parent.$find accesses the iframe it uses
            // this will give the iframe a string to hold a custom "fileName" property, which will be whatever the uploaded file's name is
            // js function PopulateFileNameField in index.aspx will use this stored string
            ScriptManager.RegisterClientScriptBlock(this, this.GetType(), "newfile"
            , "window.parent.$find('" + asyncControl.ClientID + "').fileName='" + e.FileName + "';", true);

            // old code used to store binary data instead of file+url. leaving code behind just in case
            //Stream fs = asyncControl.PostedFile.InputStream;
            //BinaryReader br1 = new BinaryReader(fs);
            ////fs.Position = 0;
            ////byte[] fileData = br1.ReadBytes((int)fs.Length);
            //byte[] fileData = br1.ReadBytes(asyncControl.PostedFile.ContentLength);
            //UpdateRowBinary("spTestAsyncUpload", 1, fileData);
        }
        catch (Exception ex)
        {
            throw new Exception(ex.Message);
        }
    }

    // actually saves the file to the server, called once the "Save" button on the form is clicked (not when the upload finishes client-side)
    private void SaveFile()
    {
        // always try catch when dealing with IO, never know how something can go wrong
        try
        {
            // get table name from the url (note, this deals with the name of the table in the db, not what is displayed in TSE, ie BoardMeetingsCMS not Board Meetings)
            // ToLower for consistency, make sure you only compare to lowercase strings
            string tableName = Request.QueryString["name"].ToLower();
            // IMPORTANT: Make sure the date format used here is the exact same as the date format used in the .aspx file or the file names will not match up
            string dateAppend = DateTime.Now.ToString("M-d-yyyy_h-mmtt") + "_";

            // save file to specific directory based on the table we're at
            if (tableName == "contacts")
            {
                string filePath = MapPath("/TSE/uploadedFiles/Contacts/");
                // "asyncControl" is the ID of the control on the page, for FindControl to look for
                AsyncFileUpload asyncControl = (AsyncFileUpload)this.FindControl("asyncControl");

                // only save if the control has a file in it
                if (asyncControl.HasFile)
                    // keep original file name, appending our formatted datetime from earlier to make the name unique, saving on the location on the server specified earlier
                    asyncControl.SaveAs(filePath + dateAppend + asyncControl.FileName);
            }

            else if (tableName == "worksheetscms")
            {
                string filePath = MapPath("/TSE/uploadedFiles/RAP WorkSheets/");
                AsyncFileUpload asyncControl = (AsyncFileUpload)this.FindControl("asyncControl");

                if (asyncControl.HasFile)
                    asyncControl.SaveAs(filePath + dateAppend + asyncControl.FileName);
            }

            // for board meetings, since it has multiple controls, make sure to differentiate between them. we numbered them appropriately in AddAsyncControls()
            else if (tableName == "boardmeetingscms")
            {
                string filePath = MapPath("/TSE/uploadedFiles/Board Meetings/");
                AsyncFileUpload asyncControl1 = (AsyncFileUpload)this.FindControl("asyncControl1");
                AsyncFileUpload asyncControl2 = (AsyncFileUpload)this.FindControl("asyncControl2");
                AsyncFileUpload asyncControl3 = (AsyncFileUpload)this.FindControl("asyncControl3");
                AsyncFileUpload asyncControl4 = (AsyncFileUpload)this.FindControl("asyncControl4");

                if (asyncControl1.HasFile)
                    asyncControl1.SaveAs(filePath + dateAppend + asyncControl1.FileName);
                if (asyncControl2.HasFile)
                    asyncControl2.SaveAs(filePath + dateAppend + asyncControl2.FileName);
                if (asyncControl3.HasFile)
                    asyncControl3.SaveAs(filePath + dateAppend + asyncControl3.FileName);
                if (asyncControl4.HasFile)
                    asyncControl4.SaveAs(filePath + dateAppend + asyncControl4.FileName);
            }
        }
        catch (Exception ex)
        {
            throw new Exception(ex.Message);
        }
    }

    // if you choose to use this, as it implies, you need stored procedures setup in a particular way
    // refer to spTestAsyncUpload in the database shown in the connection string
    //private void UpdateRowBinary(string sp, int idField, byte[] binaryData)
    //{
    //    using (SqlConnection connection =
    //        new SqlConnection(@"Data Source=CRABDEV2\SQL2017;Initial Catalog=WebAdmin;User ID=cmsTest;Password=cmsTest"))
    //    {
    //        SqlCommand cmd = new System.Data.SqlClient.SqlCommand();
    //        cmd.Connection = connection;
    //        cmd.CommandText = sp;
    //        cmd.CommandType = CommandType.StoredProcedure;
    //        cmd.Parameters.AddWithValue("@testId", idField);
    //        cmd.Parameters.AddWithValue("@binaryData", binaryData);

    //        try
    //        {
    //            cmd.Connection.Open();
    //            cmd.ExecuteNonQuery();
    //        }
    //        catch (Exception ex)
    //        {
    //            throw new Exception(ex.Message);
    //        }
    //        finally
    //        {
    //            cmd.Connection.Close();
    //        }
    //    }
    //}
}
