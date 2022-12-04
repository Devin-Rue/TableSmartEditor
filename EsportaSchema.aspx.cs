using System;
using System.Data;



public partial class EsportaSchema : System.Web.UI.Page
{
    public string NomeTabella, FKFieldName;

    protected void Page_Load(object sender, EventArgs e)
    {

        LB3TSE.GridFunzioni GridFunzioni = new LB3TSE.GridFunzioni();

        if (GridFunzioni.CheckLogin(null, null, null) == false)
        {
            Response.Redirect("index.aspx");
        }
        else
        {

            LB3TSE.Database DBClass = new LB3TSE.Database();
            LB3TSE.Funzioni Funzioni = new LB3TSE.Funzioni();

            DBClass.ApriConn();

            try
            {
                NomeTabella = Request["table"];
                FKFieldName = Request["FKfieldName"];

                DataTable dt;
                int i= 0;
                string colName, renameColName;

                string PKValue = DBClass.GetPrimaryKey(NomeTabella).Split(".".ToCharArray())[1].ToLower();

                dt = DBClass.GetSchemaOfATable(NomeTabella);

                Response.Clear();
                Response.ClearContent();
                Response.ClearHeaders();
                Response.Buffer = true;
                Response.ContentType = "application/ms-excel";
                Response.Write(@"<!DOCTYPE HTML PUBLIC ""-//W3C//DTD HTML 4.0 Transitional//EN"">");
                Response.AddHeader("Content-Disposition", "attachment;filename=Schema_" + NomeTabella + ".xls");

                Response.Charset = "utf-8";
                Response.ContentEncoding = System.Text.Encoding.GetEncoding("windows-1250");
                //sets font
                Response.Write("<font style='font-size:10.0pt; font-family:Calibri;'>");
                Response.Write("<BR><BR><BR>");
                //sets the table border, cell spacing, border color, font of the text, background, foreground, font height bgColor='#ffffff'"
                Response.Write("<Table border='1' borderColor='#000000' cellSpacing='0' cellPadding='0' " +
                  "style='font-size:10.0pt; font-family:Calibri; background:none;'> <TR>");
                //am getting my grid's column headers
        
                foreach (DataRow row in dt.Rows)
                {
                    colName = row["ColumnName"].ToString();
                    //se il nome della colonna non è nè chiave esterna nè chiave primaria
                    if ((Funzioni.TableFieldInArray("HideFormField", colName, Session["AppTitle"].ToString(), NomeTabella) == false) & (Funzioni.FieldEndWith(colName) == false) &
                        (String.IsNullOrEmpty(FKFieldName) || (String.IsNullOrEmpty(FKFieldName) == false & FKFieldName.ToLower() != colName.ToLower())) & (PKValue != colName.ToLower()))
                    {

                        renameColName = GridFunzioni.CheckLabel(colName, NomeTabella).Replace("&nbsp;", " ");
                                                
                        Response.Write("<Td");
                        if (DBClass.GetAllowDBNullField(colName, NomeTabella) == false)
                        {                            
                            Response.Write(" style='background-color:#ff0000'");                      
                        }
                        //Get column headers  and make it as bold in excel columns
                        Response.Write("><B>");
                        Response.Write(renameColName);
                        Response.Write("</B>");
                        Response.Write("</Td>");
                        i++;
                    }                    
                    
                }

             
                Response.Write("</TR>");
               
                Response.Write("</Table>");
                Response.Write("</font>");
               Response.Flush();
               Response.Close();
                Response.End();


                

            }
            catch (Exception ex)
            {
                Response.Write(ex.ToString());
            }
            finally
            {  
                DBClass.ChiudiConn();
                DBClass = null;
                GridFunzioni = null;
            }
        }
    }

  

   
}

