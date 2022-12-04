using System;
using System.Collections.Generic;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.IO;
using System.Net;

public partial class PrintHTML : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {


        String WKHtmlToPdfTempPath;
        string[] SplitPagUrl = Request.ServerVariables["SCRIPT_NAME"].Split('/');
        String TmpFile = Guid.NewGuid().ToString().Substring(0, 8) + ".html";


        if (System.Web.HttpContext.Current.Request.ServerVariables["HTTP_HOST"].ToLower().IndexOf("localhost") > -1)
        {
            WKHtmlToPdfTempPath = System.Web.HttpContext.Current.Request.PhysicalApplicationPath + "\\Public\\WKHtmlToPdf_Temp\\" + TmpFile;
        }
        else if (System.Configuration.ConfigurationManager.AppSettings["DBName"] == "FolderName")//Laboratre Software clause
        {
            WKHtmlToPdfTempPath = Server.MapPath("/" + SplitPagUrl[1] + "/" + System.Configuration.ConfigurationManager.AppSettings["PDFTempFolder"]) + TmpFile;
        }
        else
        {
            WKHtmlToPdfTempPath = Server.MapPath(System.Configuration.ConfigurationManager.AppSettings["PDFTempFolder"]) + TmpFile;
        }

        //Sostituisco i caratteri utilizzati nel web.config per costruire i link
        string url = Request.QueryString["url"].Replace("@@@", "?").Replace("@@", "&");

        string HTMLString = AspTextMerge(url);

        string fname = "";
        string par = "";
        string pdfFolder = "", pdfList = "";

        if(url.IndexOf("?") != -1){
            string parameters = url.Split("?".ToCharArray())[1];
            string[] arrayparameters = parameters.Split("&".ToCharArray());
            string[] arrayparam;
            
            foreach (string parameter in arrayparameters)
            {
                arrayparam = parameter.Split("=".ToCharArray());
                if (arrayparam[0] == "fname")
                {
                    if (arrayparam[1].Contains("["))
                    {
                        //prefisso del filename
                        fname = arrayparam[1].Split("[".ToCharArray())[0];
                        string varname = arrayparam[1].Split("[".ToCharArray())[1].Replace("]", "");
                        //recupero il valore della variabile di sessione
                        fname += (String)Session[varname];
                        fname = fname.Replace(" ", "_").Replace("/", "_").Replace("\\", "_").Replace(":", "_").Replace("*", "_").Replace("?", "_").Replace("\"", "_").Replace("<", "_").Replace(">", "_").Replace("|", "_");
                    }
                    else
                    {
                        fname = arrayparam[1];
                    }
                }
                else if (arrayparam[0] == "parameters")
                {   //Contiene i parametri utili ad impostare la pagina pdf
                    //Manuale http://madalgo.au.dk/~jakobt/wkhtmltoxdoc/wkhtmltopdf-0.9.9-doc.html
                    par = arrayparam[1];
                }
                else if (arrayparam[0] == "pdffolder")
                {   //Contiene il nome cartella contenente i files.pdf da unire
                    pdfFolder = arrayparam[1];
                }
                else if (arrayparam[0] == "pdflist")
                {   //Contiene il nome dei pdf da unire separati da ","
                    pdfList = arrayparam[1];
                }
               
            }
        }
        
        if (fname == "")
            fname = "file";
        
        //Salvo su Server nella cartella Public la pagina richiesta per il PDF
        StreamWriter sw;
        sw = File.CreateText(WKHtmlToPdfTempPath);
        sw.WriteLine(HTMLString);
        sw.Close();
        Response.WriteFile(WKHtmlToPdfTempPath);
        sw = null;

 
        //Salvo i parametri in sessione per rileggerli in HTMLToPdf.aspx
        System.Web.HttpContext.Current.Session["WKparameters"] += par;


        //Avvio la pagina di stampa PDF
        Response.Redirect("HtmlToPdf.aspx?TmpFile=" + TmpFile + "&fname=" + fname + "&pdfFolder=" + pdfFolder + "&pdfList=" + pdfList, true);

    }


    public static string AspTextMerge(string TemplatePageAndQueryString)
    {
        string MergedText = "";

        // *** Save the current request information
        HttpContext Context = HttpContext.Current;

        // *** Fix up the path to point at the templates directory
        //TemplatePageAndQueryString = Context.Request.ApplicationPath + "/templates/" + TemplatePageAndQueryString;
        // *** Now call the other page and load into StringWriter

        StringWriter sw = new StringWriter();
        try
        {
            // *** IMPORTANT: Child page's FilePath still points at current page
            //     QueryString provided is mapped into new page and then reset
            Context.Server.Execute(TemplatePageAndQueryString, sw);
            MergedText = sw.ToString();
        }
        catch (Exception ex)
        {

            System.Diagnostics.Debug.Assert(false, ex.Message);
            MergedText = null;
        }
        finally
        {
            Context = null;
            sw = null;
        }

        return MergedText;

    }

}