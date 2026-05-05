<%@ Page Language="C#" MasterPageFile="~/Layout.master" AutoEventWireup="true" CodeBehind="Contact.aspx.cs" Inherits="MediaLibrarySystem.Contact" %>
<!-- Written by Brian McCarthy -->
<asp:Content ID="ContentContact" ContentPlaceHolderID="MainContent" runat="server">
    <h2>Contact Us</h2>
    <div class="form-group">
        <label>Name:</label>
        <asp:TextBox ID="txtName" runat="server" CssClass="form-control" />
    </div>
    <div class="form-group">
        <label>Message:</label>
        <asp:TextBox ID="txtMessage" runat="server" CssClass="form-control" TextMode="MultiLine" Rows="5" />
    </div>
    <asp:Button ID="btnSubmit" runat="server" Text="Send Message" CssClass="btn btn-primary" OnClick="btnSubmit_Click" />
</asp:Content>
