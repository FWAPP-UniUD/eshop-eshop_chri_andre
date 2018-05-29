import $ from 'jquery';
import store from 'store';

const htmlTemplate = (cart) => `
    <table>
        <thead>
            <tr><th>Item</th><th>Quantity</th><tr>
        </thead>
            <tbody>
            ${cart.map(item => `
            <tr><td>${item.item}</td><td>${item.quantity}</td></tr>
            `).join("\n")}
        </tbody>
    </table>
`;

class Cart {
    constructor() {
        this.mainElement = document.createElement('div');
        $(this.mainElement).addClass('ui segment');
    }

    attach(containerElement) {
        $(this.mainElement).html(htmlTemplate(store.get('cart') || []));
        $(this.mainElement).appendTo(containerElement);
    }
}

export default Cart;