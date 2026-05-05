<%@ Page Language="C#" MasterPageFile="~/Layout.master" AutoEventWireup="true" CodeBehind="Main.aspx.cs" Inherits="MediaLibrarySystem.Main" %>
<!-- Written by Brian McCarthy -->
<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">
    <div class="jumbotron">
        <h1>Media Library Pro</h1>
        <p class="lead">Managing digital assets with ASP.NET Web Forms.</p>
    </div>
    <div class="row">
        <div class="col-md-12">
            <asp:GridView ID="gvMedia" runat="server" CssClass="table table-striped" AutoGenerateColumns="true">
            </asp:GridView>
        </div>
    </div>
</asp:Content>
