using System;
using System.Collections.Generic;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Diagnostics;
using System.IO;
using System.Net;

using System.Data;


public partial class HtmlToPdf : System.Web.UI.Page
{
    //Variabile peer cancellare il file temporaneo sul server
    String WKHtmlToPdfTempFile;
    String TmpFile;
    int returnCode;

    protected void Page_Load(object sender, EventArgs e)
    {

        string[] SplitPagUrl = Request.ServerVariables["SCRIPT_NAME"].Split('/');
        
        TmpFile = Request.QueryString["TmpFile"];
        if (System.Web.HttpContext.Current.Request.ServerVariables["HTTP_HOST"].ToLower().IndexOf("localhost") > -1)
        {
            WKHtmlToPdfTempFile = System.Web.HttpContext.Current.Request.PhysicalApplicationPath + "\\Public\\WKHtmlToPdf_Temp\\";
        }
        else if (System.Configuration.ConfigurationManager.AppSettings["DBName"] == "FolderName")//Laboratre Software clause
        {

            WKHtmlToPdfTempFile = Server.MapPath("/" + SplitPagUrl[1] + "/" + System.Configuration.ConfigurationManager.AppSettings["PDFTempFolder"]);
        }
        else
        {
            WKHtmlToPdfTempFile = Server.MapPath(System.Configuration.ConfigurationManager.AppSettings["PDFTempFolder"]);
        }



        String UrlPath;

        if (System.Web.HttpContext.Current.Request.ServerVariables["HTTP_HOST"].ToLower().IndexOf("localhost") > -1) //locale
        {
            UrlPath = Request.ServerVariables["HTTP_host"] + "/" + SplitPagUrl[1] + "/";
        }
        else if (System.Configuration.ConfigurationManager.AppSettings["DBName"] == "FolderName")//Laboratre Software clause
        {
            UrlPath = Request.ServerVariables["HTTP_host"] + "/" + SplitPagUrl[1] + "/";
        }
        else
        {
            UrlPath = Request.ServerVariables["HTTP_host"] + "/";
        }
        SplitPagUrl = null;


        //Attendo la scrittura del file
        //System.Threading.Thread.Sleep(500);

        //In locale lo spazio genera errore, sostituisco con %20
        //DoDownload("http://" + (UrlPath.Replace(" ", "%20") + System.Configuration.ConfigurationManager.AppSettings["PDFTempFolder"] + Request.QueryString["TmpFile"]).Replace("//", "/"));
        // changed by Devin to fix 404 error
		DoDownload("https://" + (UrlPath.Replace(" ", "%20") + "TSE/" + System.Configuration.ConfigurationManager.AppSettings["PDFTempFolder"] + Request.QueryString["TmpFile"]).Replace("//", "/"));


    }

    protected void Page_Unload(object sender, EventArgs e)
    {
        FileInfo TheFile = new FileInfo(WKHtmlToPdfTempFile + TmpFile);
        if (TheFile.Exists)
        {
            try
            {
                File.Delete(WKHtmlToPdfTempFile + TmpFile);

            }
            catch (Exception err)
            {
                Response.Write(err.ToString());
            }
        }

    }



    private void DoDownload(String url)
    {
        byte[] file = WKHtmlToPdf(url);

        System.Threading.Thread.Sleep(500);

        if (file != null)
        {
            Response.ContentType = "Application/pdf";
            Response.AddHeader("Content-Disposition", "attachment; filename=" + Request.QueryString["fname"] + ".pdf");
            Response.BinaryWrite(file);
            Response.End();

        }


    }




    public byte[] WKHtmlToPdf(string url)
    {
        string fileName = " - ";


        //New 64 bit
        //string wkhtmldir = "C:\\Program Files\\wkhtmltopdf\\bin";//server.mappath("~/bin/wkhtmltopdf/");
        string wkhtml = "C:\\Program Files\\wkhtmltopdf\\bin\\wkhtmltopdf.exe";// server.mappath("~/bin/wkhtmltopdf/") + "wkhtmltopdf.exe";
        //string pdftk = "C:\\Program Files\\wkhtmltopdf\\lib\\wkhtmltox.lib"; // Programma che effettua il Merge e Split di files pdf

        //Impostazioni stampa default
            string switches = "";
            switches += "--print-media-type ";
            switches += "--margin-top 10mm --margin-bottom 10mm --margin-right 10mm --margin-left 10mm ";
            switches += "--page-size A4 ";
            switches += "--footer-font-size 9 ";
            //switches += "--footer-left \"Data e ora stampa " + DateTime.Now.ToString("dd/MM/yyyy") + " | " + (Convert.ToInt16(DateTime.Now.ToString("HH")) + 1) + ":" + DateTime.Now.ToString("mm") + "\" ";
			switches += "--footer-left \"" + DateTime.Now.ToString("MM/dd/yyyy") + " | " + DateTime.Now.ToString("h:mm tt") + "\" ";
            //switches += "--footer-right \"Pagina [page] di [toPage]\" ";
			switches += "--footer-right \"Page [page] of [toPage]\" ";
			// above switches localized by Devin


        //Lettura parametri personalizzati
            if (System.Web.HttpContext.Current.Session["WKparameters"] != null) {

                switches += System.Web.HttpContext.Current.Session["WKparameters"];
            }

        //Reset dei parametri di stampa di sessione
         System.Web.HttpContext.Current.Session["WKparameters"] = null;


        //Scelta stampa
        String pdfFolder = Request.QueryString["pdfFolder"];
        String pdfList = Request.QueryString["pdfList"];
        //if ((pdfFolder != null) && (pdfFolder != "") && (pdfList != "")) //Stampa da pdf a html con merge di altri pdf
        //{
        //    String fname = Request.QueryString["fname"] + ".pdf";

        //    String percorso = "";
        //    percorso = Server.MapPath("public");

        //    ////Modificare!!
        //    //String[] path = url.Split('/');
        //    //percorso = "";
        //    //for (int i = 0; i < (path.Length - 1); i++)
        //    //    if (path[i] != "")
        //    //        percorso += path[i] + "//";
        //    //    else
        //    //        percorso += "/";

        //    String firstPercorso = percorso + "\\WKHtmlToPdf_Temp";

        //    //percorso = wkhtmlDir + "\\firstPdf.pdf";
        //    //percorso = "D:\\LB3\\27-09-2012 TSE\\SoftwareAssistenza\\public\\WKHtmlToPdf_Temp\\firstPdf.pdf";
        //    // Use ProcessStartInfo class
        //    ProcessStartInfo startInfo = new ProcessStartInfo();
        //    startInfo.CreateNoWindow = true;
        //    startInfo.UseShellExecute = false;
        //    startInfo.FileName = wkhtml;
        //    startInfo.WorkingDirectory = wkhtmldir;
        //    startInfo.WindowStyle = ProcessWindowStyle.Hidden;
        //    startInfo.Arguments = switches + url + " " + percorso + "\\WKHtmlToPdf_Temp\\firstPdf.pdf";

        //    try
        //    {
        //        // Start the process with the info we specified.
        //        // Call WaitForExit and then the using statement will close.
        //        using (Process exeProcess = Process.Start(startInfo))
        //        {
        //            exeProcess.WaitForExit();
        //            exeProcess.Close();

        //            //Stampa da pdf a html con merge di altri pdf

        //            //path = url.Split('/');
        //            //percorso = "";
        //            //for (int i = 0; i < (path.Length - 2); i++)
        //            //    if (path[i] != "")
        //            //        percorso += path[i] + "//";
        //            //    else
        //            //        percorso += "/";

        //            ////percorso += "firstPdf.pdf";
        //            String[] Pdf = pdfList.Split(',');
        //            int count = 0;
        //            String pdfToMerge = "";
        //            while (count < Pdf.Length)
        //            {
        //                pdfToMerge += percorso + "//" + pdfFolder + "//" + Pdf[count] + " ";
        //                count++;
        //            }



        //            ProcessStartInfo startMerge = new ProcessStartInfo();
        //            startMerge.CreateNoWindow = true;
        //            startMerge.UseShellExecute = false;
        //            startMerge.FileName = pdftk;
        //            startMerge.WorkingDirectory = wkhtmldir;
        //            startMerge.WindowStyle = ProcessWindowStyle.Hidden;
        //            startMerge.Arguments = firstPercorso + "\\firstPdf.pdf " + pdfToMerge + "cat output " + firstPercorso + "\\" + fname;

        //            try
        //            {
        //                // Start the process with the info we specified.
        //                // Call WaitForExit and then the using statement will close.
        //                using (Process exeProcessMerge = Process.Start(startMerge))
        //                {
        //                    exeProcessMerge.WaitForExit();
        //                    exeProcessMerge.Close();

        //                }
        //            }
        //            catch
        //            {
        //                // Log error.
        //            }

        //            Response.ContentType = "Application/pdf";
        //            Response.AddHeader("Content-Disposition", "attachment; filename=" + fname);
        //            //Write the file directly to the HTTP content output stream.
        //            Response.WriteFile(firstPercorso + "\\" + fname);
        //            Response.Flush();
        //            File.Delete(firstPercorso + "\\" + fname);
        //            File.Delete(firstPercorso + "\\" + "firstPdf.pdf");
        //            Response.End();

        //        }

        //    }
        //    catch
        //    {
        //        // Log error.
        //    }
        //    return null;
        //}//Fine if stampa html to pdf con merge di altri pdf
        //else //Crea pdf da html
        //{
            Process p = new Process();

            try
            {

                p.StartInfo.CreateNoWindow = true;
                p.StartInfo.RedirectStandardOutput = true;
                p.StartInfo.RedirectStandardError = true;
                p.StartInfo.RedirectStandardInput = true;
                p.StartInfo.UseShellExecute = false;
                p.StartInfo.FileName = wkhtml;
                p.StartInfo.WorkingDirectory = WKHtmlToPdfTempFile;// wkhtmldir;
                p.StartInfo.Arguments = switches + " " + url + " " + fileName;




                p.Start();

                //read output
                byte[] buffer = new byte[32768];
                byte[] file;
                using (MemoryStream ms = new MemoryStream())
                {
                    while (true)
                    {
                        int read = p.StandardOutput.BaseStream.Read(buffer, 0, buffer.Length);

                        if (read <= 0)
                        {
                            break;
                        }
                        ms.Write(buffer, 0, read);
                    }
                    file = ms.ToArray();
                }

                String errorOutput = p.StandardError.ReadToEnd();

                // wait or exit
                p.WaitForExit(60000);

                // read the exit code, close process
                returnCode = p.ExitCode;
                p.Close();

                //return returnCode == 0 ? file : null;

                /*
                EditCode 	Explanation
                0 	All OK
                1 	PDF generated OK, but some request(s) did not return HTTP 200
                2 	Could not something something
                X 	Could not write PDF: File in use
                Y 	Could not write PDF: No write permission
                Z 	PDF generated OK, but some JavaScript requests(s) timeouted
                A 	Invalid arguments provided
                B 	Could not find input file(s)
                C 	Process timeout
                */

                // if 0, 1 or 2, it worked so return path of pdf
                if ((returnCode == 0) || (returnCode == 1) || (returnCode == 2))
                { return file; }
                else
                {
                    throw new Exception(errorOutput + "<br>Switches:<br>" + switches);
                }


            }
            catch (Exception exc)
            {
                throw new Exception("Problem generating PDF from HTML, URLs: " + url + "<br/>ExitCode=" + returnCode, exc);
            }
        //}//fine
    }
}
