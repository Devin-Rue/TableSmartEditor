<script runat="server">
    
    Sub Funzioni()                     
        Try
            Dim op As String = Request.QueryString("op")
            Select Case (op)
                Case "CheckBoxClick"
                    Dim DBClass As New LB3TSE.Database()
                    Dim GridFunzioni As New LB3TSE.GridFunzioni()
        
                    Dim DBRead As Object
        
                    DBClass.ApriConn()
                    
                    Dim table As String = Request.QueryString("table")
                    Dim fieldNameToCheck As String = Request.QueryString("fieldNameToCheck")
                    Dim valueToCheck As String = Request.QueryString("valueToCheck")
                    Dim fieldNameToUpdate As String = Request.QueryString("fieldNameToUpdate")
                    Dim valueToUpdate As String = Request.QueryString("valueToUpdate")
                
                    DBClass.EseguiQuery("UPDATE " & table & " SET " & fieldNameToUpdate & "=" & valueToUpdate & " WHERE " & fieldNameToCheck & "=" & valueToCheck)
                
                    DBRead = Nothing
                    DBClass.ChiudiConn()
                    DBClass = Nothing
                    
                Case "ClearSession"
                    System.Web.HttpContext.Current.Session("AppTitle") = Nothing
                Case "SetPageDescription"
                    
                    Dim DBClass As New LB3TSE.Database()
                    Dim str As String
                    Dim table As String = Replace(Request("table"), "&quot;", "'")
                    DBClass.ApriConn()
                    
                    str = DBClass.GetValore("SELECT PageDescriptionClose FROM TSESETTings", "PageDescriptionClose")
                    
                    If Request("type") = "apri" Then
                        'cancello valore da db
                        str = Replace(str, table & ",", "")
                        
                    Else
                        str &= table & ","
                    End If
                   
                     str = Replace(str, "'", "''")
                    DBClass.EseguiQuery("UPDATE TSESettings SET PageDescriptionClose='" & str & "'")
                    
                    DBClass.ChiudiConn()
                    DBClass = Nothing
                    
                Case "SetGuideID"
                    Dim GuideId As String = Request.QueryString("GuideID")
                    If String.Compare(GuideId, "") <> 0 Then
                        'imposta la variabile di sessione delle guide con l'ID della guida da eseguire
                        System.Web.HttpContext.Current.Session("GuideID") = GuideId
                    Else
                        'cancella la variabile di sessione delle guide
                        System.Web.HttpContext.Current.Session("GuideID") = Nothing
                    End If
                    
            End Select
                                    
        Catch ex As Exception

            Session("Errore") = ex.ToString
            Response.Write(Session("Errore"))
            
        End Try
        
    End Sub
   
</script>
<%  Call Funzioni()%>
