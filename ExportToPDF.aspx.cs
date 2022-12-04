using System;
using System.Collections.Generic;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using System.Data.OleDb;
using System.Text;



public partial class ExportToPDF : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        LB3TSE.Funzioni Funzioni = new LB3TSE.Funzioni();
        DataTable dt;
        
        try{
        dt = (DataTable)Session["Source" + Session["AppTitle"]];


        String StrFilter = "";

        HttpCookie myCookie = new HttpCookie("idSelected");
        myCookie = Request.Cookies["idSelected"];

        // Read the cookie information 
        if (myCookie.Value != "")
        {
            StrFilter = System.Web.HttpUtility.UrlDecode(myCookie.Value).Replace("&", " OR ");
            //Elimino l'ultimo " OR "
            if (StrFilter.IndexOf(" OR ") != -1)
            {
                StrFilter = StrFilter.Substring(0, StrFilter.Length - 4);
            }
        }
        else
        {

            //Se esiste filtro di sessione 
            if (Session["StrFilter" + Session["AppTitle"]] != null)
            {

                string[] SplitFiltroSessione;
                String AppTitle = Session["AppTitle"].ToString();

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
                    StrFilter += SplitFiltroSessione[i];
                    if (SplitFiltroSessione.Length - 1 > i + 1)
                    {
                        StrFilter += " AND ";
                    }
                }

            }


        }


        dt.DefaultView.RowFilter = StrFilter;

        //Creo nuovo datatable filtrato
        dt = dt.DefaultView.ToTable();


        if (dt.Rows.Count > 200){
            Session["ClientAlert"] = System.Configuration.ConfigurationManager.AppSettings["MaxRecordForPDFPrint"];
            Response.Redirect("index.aspx?name=" + Request["name"] + "&mode=" + Request["mode"] + "&tab=" + Request["tab"] + "&rpt=" + Request["rpt"]);
        }
        else if (dt.Rows.Count > 0)
        {
            System.Web.HttpContext.Current.Session["Results"] = Funzioni.EncodeString(ConvertDataTableToHtml(dt, "", ""));
            System.Web.HttpContext.Current.Session["WKparameters"] = ("--orientation Landscape ");//Parametro di Stampa PDF

            String fname;
            if (Request["rpt"] != "") { 
                fname = Request["rpt"]; 
            } else { 
                fname = Session["AppTitle"].ToString(); 
            }

            Response.Redirect("Print.aspx?url=ExportToPDFResults.aspx?@@fname=" + fname);
        }
        } catch (Exception ex){
            ex.ToString();
        }
        finally{
            dt = null;
            Funzioni = null;

        }

    }




    private string ConvertDataTableToHtml(DataTable targetTable, string Header, string Footer)
    {
        string htmlString = "";

        if (targetTable == null)
        {
            throw new System.ArgumentNullException("targetTable");
        }

        StringBuilder htmlBuilder = new StringBuilder();

        //Create Top Portion of HTML Document
        //htmlBuilder.Append("<html>");
        //htmlBuilder.Append("<head>");
        //htmlBuilder.Append("<title>");
        //htmlBuilder.Append("Page-");
        //htmlBuilder.Append(Guid.NewGuid().ToString());
        //htmlBuilder.Append("</title>");
        //htmlBuilder.Append("</head>");
        //htmlBuilder.Append("<body>");
        htmlBuilder.Append("<table class='GridViewStyle' width='100%' cellspacing='0' border='1' style='border-collapse:collapse;margin-bottom:25px;'>");

        //inserisco la riga prima dell'header se presente (per MovMag)
        if (Header != "")
        {
            //Create Header Row
            htmlBuilder.Append("<tr class='GridViewHeaderStyle'>");
            htmlBuilder.Append(Header);
            htmlBuilder.Append("</tr>");
        }


        //Create Header Row
        htmlBuilder.Append("<tr class='GridViewHeaderStyle'>");

        foreach (DataColumn targetColumn in targetTable.Columns)
        {
            htmlBuilder.Append("<th>");
            htmlBuilder.Append(targetColumn.ColumnName);
            htmlBuilder.Append("</th>");
        }

        htmlBuilder.Append("</tr>");

        //Create Data Rows
        int i = 0;
        foreach (DataRow myRow in targetTable.Rows)
        {
            if (i % 2 == 0)
            {
                // It's even
                htmlBuilder.Append("<tr class='GridViewRowStyle'>");
            }
            else
            {
                // It's odd
                htmlBuilder.Append("<tr class='GridViewAlternatingRowStyle'>");
            }


            foreach (DataColumn targetColumn in targetTable.Columns)
            {
                htmlBuilder.Append("<td style='color:black;'><div class=\"NoBreak\">");
                htmlBuilder.Append(myRow[targetColumn.ColumnName].ToString());
                htmlBuilder.Append("</div></td>");
            }
            i++;
            htmlBuilder.Append("</tr>");
        }

        //inserisco il footer se presente (per MovMag)
        if (Footer != "")
        {
            //Create Header Row
            htmlBuilder.Append("<tr class='GridViewHeaderStyle'>");
            htmlBuilder.Append(Footer);
            htmlBuilder.Append("</tr>");
        }

        //Create Bottom Portion of HTML Document
        htmlBuilder.Append("</table>");
        //htmlBuilder.Append("</body>");
        //htmlBuilder.Append("</html>");

        //Create String to be Returned
        htmlString = htmlBuilder.ToString();
        return ReplaceCaratteriSpeciali(htmlString);
    }

    private string ReplaceCaratteriSpeciali(string s)
    {
        s = s.Replace("à", "&#224;");
        s = s.Replace("€", "&#8364;");

        return s; ;
    }

}