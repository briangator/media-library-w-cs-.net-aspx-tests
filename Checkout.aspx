<%@ Page Language="C#" MasterPageFile="~/Layout.master" AutoEventWireup="true" CodeBehind="Checkout.aspx.cs" Inherits="MediaLibrarySystem.Checkout" %>
<!-- Written by Brian McCarthy -->
<asp:Content ID="ContentCheckout" ContentPlaceHolderID="MainContent" runat="server">
    <h2>Secure Checkout</h2>
    <div class="cart-summary">
        <asp:Repeater ID="rptCart" runat="server">
            <ItemTemplate>
                <div class="item"><%# Eval("Title") %> - $<%# Eval("Value") %></div>
            </ItemTemplate>
        </asp:Repeater>
    </div>
    <hr />
    <h4>Payment Method</h4>
    <asp:RadioButtonList ID="rblPayment" runat="server">
        <asp:ListItem Text="Visa / Mastercard" Value="Card" Selected="True" />
        <asp:ListItem Text="PayPal" Value="PayPal" />
    </asp:RadioButtonList>
    <asp:Button ID="btnConfirm" runat="server" Text="Order Now" CssClass="btn btn-success" />
</asp:Content>
