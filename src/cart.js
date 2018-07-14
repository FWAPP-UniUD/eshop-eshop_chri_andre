import $ from 'jquery';
import store from 'store';

const htmlTemplate = (cart) => `
    <form>
        <table class="ui celled striped table">
            <thead>
                <tr><th>Item</th><th>Quantity</th><th>Price</th><tr>
            </thead>
            <tfoot>
                <tr colspan="3"><th></th><th></th><th><div class="ui right floated">Sub-Totale: <i id="total"></i></div></th></tr>
            </tfoot>
            <tbody id="cartBody">
            </tbody>
        </table>
    </form>
`;


    
class Cart {
    constructor() {
        this.mainElement = document.createElement('div');
        $(this.mainElement).addClass('ui segment');
    }

    attach(containerElement) {
        $(this.mainElement).html(htmlTemplate(store.get('cart') || []));
        $(this.mainElement).appendTo(containerElement);
        let cart = store.get('cart') || [];
        
        /**
         * Exercise 3
         */
            let total = 0;
            let i = 0;
            cart.forEach(element => {
                $.ajax({ 
                    type: "GET",
                    url: "/api/products/" + element.item,
                    success: function(data){     
                        console.log(data.name);
                        let price = (data.price).toFixed(2);
                        let row = "<tr><td>" + data.name + "</td>";
                        row += "<td>" + element.quantity + "</td>";  
                        row += "<td>" + price + " " + '\u20AC' + "</td></tr>";
                        row += "<input name=\"product_id" + i + "\" type=\"hidden\" value=\"" + element.item + "\">";
                        row += "<input name=\"product_price" + i++ + "\" type=\"hidden\" value=\"" + price*element.quantity + "\">";
                        $("#cartBody").append(row);
                        total += price * element.quantity;
                        $("#total").text(total.toFixed(2) + " " + '\u20AC');
                    }
                });
            });

        /**
         * Exercise 6
         */
        let state;
        if (store.get('logged_in')) {
            state = "active";
            let user = store.get('user')
            $("table").after("<input type=\"hidden\" value=\"" + user._id + "\" name=\"user\">");
            //console.log(user);
        } else {
            state = "disabled";
        }

        $("table").after("<button type=\"submit\" class=\"ui " + state + " green button\">Checkout</button>");
        console.log($("form").serialize());

        $(this.mainElement).find('button[type="submit"]').click(this.submit.bind(this)); 
        
    }

    submit(event) {
        event.preventDefault();
        const data = {};
        $(this.mainElement).find('form').serializeArray().forEach((field) => { 
            data[field.name] = field.value; 
        }); 
        fetch('/api/orders', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify(data)
        }).then((response) => {
            if (response.ok) {
                return response.json();
            }  else          
                throw Error(response.statusText);
        }).then((data) => {
            console.log(data);
        }).catch((error) => {
            $(this.mainElement).find('form').addClass('error');
            console.log("error");
        });
    }
}

export default Cart;