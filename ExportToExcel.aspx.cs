using System;
using System.Collections.Generic;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using System.Data.OleDb;
using System.Text.RegularExpressions;


public partial class ExportToExcel : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
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

        if (dt.Rows.Count > 0)
        {
            string filename = Session["AppTitle"] + "-" + System.DateTime.Now.ToString("ddMMyyyy") + ".xls";

            Response.Clear();
            Response.AddHeader("content-disposition", "attachment;filename=" + filename + "");
            Response.ContentType = "application/vnd.ms-excel";
            Response.ContentEncoding = System.Text.Encoding.Unicode;
            Response.BinaryWrite(System.Text.Encoding.Unicode.GetPreamble());
            this.EnableViewState = false;

            System.IO.StringWriter tw = new System.IO.StringWriter();
            System.Web.UI.HtmlTextWriter hw = new System.Web.UI.HtmlTextWriter(tw);
            DataGrid dgGrid = new DataGrid();
            dgGrid.DataSource = dt.DefaultView;
            dgGrid.DataBind();
            dgGrid.AlternatingItemStyle.BackColor = System.Drawing.ColorTranslator.FromHtml("#F6F6F6");
            dgGrid.HeaderStyle.BackColor = System.Drawing.ColorTranslator.FromHtml("#FFFF00");
            dgGrid.HeaderStyle.Font.Bold = true;
            //Get the HTML for the control.
            dgGrid.RenderControl(hw);

            
            Response.Write(tw.ToString());
            Response.End();
        }
        } catch (Exception ex){
            ex.ToString();
        }
        finally{
            dt = null;
        }

    }


}