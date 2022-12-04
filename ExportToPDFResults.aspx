<%
    Response.ContentType = "text/html"
%>
<script runat="server">
    Dim Stringa As String
    Dim isDisponibilitaArticoli As Boolean = False
    
    Dim Funzioni As New LB3TSE.Funzioni
    
    Protected Sub Page_Load(ByVal sender As Object, ByVal e As EventArgs)

        If New LB3TSE.GridFunzioni().CheckLogin("", "", Nothing) = False Then
            Response.Redirect("index.aspx")
        End If
    End Sub

    
</script>
<html>
<head>
    <title>=Session("AppTitle")</title>
        <link type="text/css" href="../../css/<%="" + Funzioni.getCssFolder()%>/jquery-ui-custom.css"
            rel="stylesheet" />
        <link type="text/css" href="../../css/style.css" rel="stylesheet" />

<style type="text/css" media="screen,print">
.NoBreak{
    page-break-inside: avoid !important;
    /*margin: 4px 0;   to keep the page break from cutting too close to the text in the div */
}
</style>

</head>

<body>

    <h1 style="text-align: left;">
        <%=Session("AppTitle")%></h1>

    <!-- Inserisco il risultato della ricerca-->
    <%=Funzioni.DecodeString(System.Web.HttpContext.Current.Session("Results"))%>
</body>
</html>
