<script runat="server">
    
    Sub LoadRicerca()
        
        Dim DBClass As New LB3TSE.Database()
        Dim GridFunzioni As New LB3TSE.GridFunzioni()
        
        Dim DBRead As Object
        
        DBClass.ApriConn()
                       
       
      
        Try
            Dim TextSearch As String = Request.QueryString("q")
            Dim Table As String = Request.QueryString("Table")
            Dim IDTable As String = Request.QueryString("IDTable")
            Dim JoinTable As String = Request.QueryString("JoinTable")
            Dim IDJoinTable As String = Request.QueryString("IDJoinTable")
            Dim DescrField As String = Request.QueryString("DescrField")
            Dim StrWhere As String = Request.QueryString("StrWhere")
            
            If String.Compare(StrWhere, "") <> 0 And Not String.IsNullOrEmpty(StrWhere) Then
                'Se è presente uno StrWhere, lo considero nella query dell'autocomplete
                StrWhere = " AND " & StrWhere
            End If
            
            Dim DescrField2 As String = ""
			
			
            'Included by Devin to prevent auto-complete showing exception bug (declared empty string, wrapped line 35 with "if")
            Dim OtherFields As String() = New String() {}
            
            If Request.QueryString("OtherFields") IsNot Nothing Then
                OtherFields = Request.QueryString("OtherFields").Split(",")
            End If
            
            
            Dim strAppend As StringBuilder = New StringBuilder
            
            TextSearch = Replace(TextSearch, "'", "''")
            
           
            
            Dim DoubleDescrField As String() = DescrField.Split("$")
            
            If DoubleDescrField.Length > 1 Then
                DescrField = DoubleDescrField(0)
                DescrField2 = DoubleDescrField(1)
            End If
            
           
            DBRead = DBClass.GetRowReader("SELECT TOP 1 * FROM " & JoinTable & " WHERE (" & DescrField & " LIKE '%" & TextSearch & "%'" & StrWhere & ") ORDER BY " & DescrField & " DESC")
         
            
           
            Dim i As Integer = 0
            Dim otherF As String = ""
            Dim SpecialField() As String
            
            If DBRead.hasrows() Then
                While DBRead.read()
                    If OtherFields.Length > 1 Then
                        Dim first As Boolean = False
                        While i < OtherFields.Length
                            If OtherFields(i) <> "" Then
                                If first Then
                                    otherF += "|"
                                End If
                                SpecialField = OtherFields(i + 1).Split("@")
                                
                                If (SpecialField.Length > 1) Then
                            
                                    '/* Campo InsertTabRelation*/

                                    '/*Inserisce l'id*/
                                    Dim Relazioni() As String = System.Configuration.ConfigurationManager.AppSettings("InsertTabRelation").Split(";")
                   
                                    Dim k As Integer = 0
                                    
                                    While (k < Relazioni.Length)
                                
                                        Dim DatiRelazione() As String = Relazioni(k).Split(",")
                                        ' /* Trovo la relazione del campo*/
                                        If ((String.Compare(DatiRelazione(0).ToLower(), JoinTable.ToLower()) = 0) And (String.Compare(DatiRelazione(1).ToLower(), SpecialField(1).ToLower()) = 0)) Then
                                    
                                            '/* in DatiRelazione[2] e DatiRelazione[3] ho la tabella del campo interessato e il suo campo id dal quale prelevare il valore*/
                                       
                                            Dim query As String = "SELECT " & DatiRelazione(2) & "." & DatiRelazione(3) & ", " & DatiRelazione(2) & "." & DatiRelazione(4) & " FROM " & DatiRelazione(2) & " INNER JOIN " & JoinTable & " ON " & DatiRelazione(0) & "." & DatiRelazione(1) & " = " & DatiRelazione(2) & "." & DatiRelazione(3) & " WHERE " & DatiRelazione(0) & "." & IDJoinTable & "=" & DBRead(IDJoinTable)
                                            
                                            'Inserisce l'id nel campo nascosto
                                            otherF += DBClass.GetValore("SELECT " & DatiRelazione(2) & "." & DatiRelazione(3) & " FROM " & DatiRelazione(2) & " INNER JOIN " & JoinTable & " ON " & DatiRelazione(0) & "." & DatiRelazione(1) & " = " & DatiRelazione(2) & "." & DatiRelazione(3) & " WHERE " & DatiRelazione(0) & "." & IDJoinTable & "=" & DBRead(IDJoinTable), DatiRelazione(3)) & "|" & OtherFields(i).ToLower() & "|"
                                            'Inserisce la descrizione
                                            otherF += DBClass.GetValore("SELECT " & DatiRelazione(2) & "." & DatiRelazione(4) & " FROM " & DatiRelazione(2) & " INNER JOIN " & JoinTable & " ON " & DatiRelazione(0) & "." & DatiRelazione(1) & " = " & DatiRelazione(2) & "." & DatiRelazione(3) & " WHERE " & DatiRelazione(0) & "." & IDJoinTable & "=" & DBRead(IDJoinTable), DatiRelazione(4)) & "|" & "Descr_" & OtherFields(i).ToLower()
                                            k = Relazioni.Length
                                        End If
                                        k += 1
                                    End While
                                    i += 2
                                Else
                                    otherF += DBRead(OtherFields(i + 1)) & "|" & OtherFields(i).ToLower()
                                    i += 2
                                    first = True
                                End If
                                        
                            Else
                                i += 1
                            End If
                            
                        End While
                    End If
                    
                    If DescrField2 <> "" Then
                        strAppend.AppendLine(DBRead(DescrField) & " " & DBRead(DescrField2) & "|Descr_" & IDTable.ToLower() & "|" & DBRead(IDJoinTable) & "|" & IDTable.ToLower() & "|" & otherF) '& "|" & DBRead("UnitaMisuraPrincipale") & "|" & DBRead("PrezzoVendita") & "|" & DBRead("PercSconto1") & "|" & DBRead("PercSconto2") & "|" & DBRead("Iva") & "|" & id & "|" & DBRead("IDArticolo")
                    Else
                        strAppend.AppendLine(DBRead(DescrField) & "|Descr_" & IDTable.ToLower() & "|" & DBRead(IDJoinTable) & "|" & IDTable.ToLower() & "|" & otherF) '& "|" & DBRead("UnitaMisuraPrincipale") & "|" & DBRead("PrezzoVendita") & "|" & DBRead("PercSconto1") & "|" & DBRead("PercSconto2") & "|" & DBRead("Iva") & "|" & id & "|" & DBRead("IDArticolo")
                    End If
                    
                    'strAppend.AppendLine(IDTable & "|" & DBRead(IDJoinTable) & "|Descr_" & IDTable & "|" & DBRead(DescrField) & otherF) '& "|" & DBRead("UnitaMisuraPrincipale") & "|" & DBRead("PrezzoVendita") & "|" & DBRead("PercSconto1") & "|" & DBRead("PercSconto2") & "|" & DBRead("Iva") & "|" & id & "|" & DBRead("IDArticolo")
                    'strAppend.AppendLine(DBRead("Titolo") & " (" & Tipo & ", " & Year(DBRead("data")) & ")" & "|" & DBRead("id"))
                End While
                DBRead.close()
            Else
                If OtherFields.Length > 1 Then
                    While i < OtherFields.Length
                        If OtherFields(i) <> "" Then
                            If i <> 0 Then
                                otherF += "|"
                            End If
                            otherF += "|" & OtherFields(i).ToLower()
                            i += 2
                        Else
                            i += 1
                        End If
                    End While
                End If
                
                
                strAppend.AppendLine("No results found|Descr_" & IDTable.ToLower() & "||" & IDTable.ToLower() & "|" & otherF)
            End If
          
            Response.Write(strAppend.ToString)
            
            
        Catch ex As Exception

            Session("Errore") = ex.ToString
            Response.Write(Session("Errore"))
            ' Response.Redirect("index.aspx?idpagina=errore", False)

        Finally

            DBRead = Nothing
            DBClass.ChiudiConn()
            DBClass = Nothing

        End Try
        
    End Sub
   
</script>
<%  Call LoadRicerca()%>
