<%@ Import Namespace=System.Data %>

<script runat="server">

   
    Sub LoadRicerca()
        
        Dim DBClass As New LB3TSE.Database()
        Dim GridFunzioni As New LB3TSE.GridFunzioni()
        
        Dim DBRead As Object
        
        DBClass.ApriConn()
                       
       
      
        Try
            Dim TextSearch As String = Request.QueryString("q")
            Dim ColSearch As String = Request.QueryString("ColSearch")
            Dim AppTitle As String = Session("AppTitle")
            

  
            Dim strAppend As StringBuilder = New StringBuilder
            TextSearch = Replace(TextSearch, "'", "''")

            
            
            Dim dt As DataTable = Session("Source" + AppTitle)
            


            If (Session("StrFilter" + AppTitle) IsNot Nothing) Then
                Dim StringaFiltro As String = "", StringaSessione As String = ""
                StringaSessione = Session("StrFilter" + AppTitle).ToString()
                
                If (StringaSessione.IndexOf("§") > 0) Then'Elimino l'eventuale filtro da campo singolo
                    StringaSessione = ""
                Else
                    Dim SplitFiltroSessione() As String = StringaSessione.Split("ƒ")
                    For i As Integer = 0 To i < SplitFiltroSessione.Length - 2
                        StringaFiltro += SplitFiltroSessione(i) + " AND "
                    Next
                End If
                
                dt.DefaultView.RowFilter = StringaFiltro + ColSearch + " LIKE '%" + TextSearch + "%'"
            Else
                dt.DefaultView.RowFilter = ColSearch + " LIKE '%" + TextSearch + "%'"
            End If

            'Ordino i risultati dell'autocomplete
            dt.DefaultView.Sort = ColSearch

            'Rilevo solo i distict
            dt = dt.DefaultView.ToTable(True, ColSearch)
            
            'Response.Write(dt.Rows.Count)
            If dt.Rows.Count > 0 Then
                'Aggiungo le righe
                For i As Integer = 0 To dt.Rows.Count - 1
                
                    If (i = 10) Then 'Record da visualizzare nell'autocomplete
                        Exit For
                    End If
                    strAppend.AppendLine(dt.Rows.Item(i).Item(ColSearch).ToString() + "|txtfilter_" + ColSearch + "|")
                Next
                
            Else
                strAppend.AppendLine(System.Configuration.ConfigurationManager.AppSettings("NoResultsCaption") + "|" + "|txtfilter_" + ColSearch + "|")
            End If
            
            
            Response.Write(strAppend.ToString)
            
        Catch ex As Exception

            Session("Errore") = ex.ToString
            Response.Write(Session("Errore"))
            'Response.Redirect("index.aspx?idpagina=errore", False)

        Finally

            DBRead = Nothing
            DBClass.ChiudiConn()
            DBClass = Nothing

        End Try
        
    End Sub
   
</script>
<%  Call LoadRicerca()%>
