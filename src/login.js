import $ from 'jquery';
import page from 'page';
import store from 'store';

const htmlTemplate = () => `
<form class="ui form">
  <div class="field">
    <label>Email</label>
    <input type="text" name="username" placeholder="Email">
  </div>
  <div class="field">
    <label>Password</label>
    <input type="password" name="password" placeholder="Password">
  </div>  
  <div class="ui error message">
    <div class="header">Error</div>
    <p>Placeholder for error message.</p>
  </div>
  <button class="ui button" type="submit">Submit</button>
</form>
`;
class Login {
    constructor() {        
        this.mainElement = document.createElement('div');       
        $(this.mainElement).html(htmlTemplate()).addClass('ui segment');
    }
    attach(containerElement) {
        $(containerElement).append(this.mainElement);
        // these settings should be here, if not they will not work because the DOM is not mounted
        $(this.mainElement).find('.error').hide();
        $(this.mainElement).find('button[type="submit"]').click(this.submit.bind(this));        
    }
    submit(event) {
        event.preventDefault();
        const data = {};
        $(this.mainElement).find('form').serializeArray().forEach((field) => { 
            data[field.name] = field.value; 
        }); 
        fetch('/api/login', {
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
            store.set('logged_in', true);
            store.set('token', data.token);
            store.set('user', data.user);
            $(this.mainElement).find('form input').val("");
            // goes back to the previous URL (i.e., the page where Login was pressed)
            history.go(-1);
        }).catch((error) => {
            $(this.mainElement).find('form').addClass('error');
            $(this.mainElement).find('form .message p').text(error.message);
            $(this.mainElement).find('form .message').show();
        });
    }
    
    logout() {
        store.remove('logged_in');
        store.remove('token');
        store.remove('user');
    }
}

export default Login;