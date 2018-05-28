import Login from './login';
import 'semantic-ui-css/semantic.css';
import 'semantic-ui-css/semantic';
import page from 'page';

const container = document.querySelector(".my-component");

page('/', index);
page('/login', login);
page('/logout', logout);
page('*', notfound);

const loginComponent = new Login();

function check_login() {
    if (localStorage.getItem('logged_in')) {
        $('#my-navbar a[href="/login"]').hide();
        $('#my-navbar a[href="/logout"]').show();
    } else {
        $('#my-navbar a[href="/login"]').show();
        $('#my-navbar a[href="/logout"]').hide();
    }
}

check_login();

function index() {
    $(container).empty();
    $('#my-navbar a').removeClass('active');
    $('#my-navbar a[href="/"]').addClass('active');
}

function login() {
    if (localStorage.getItem('logged_in')) {
        page.redirect('/play');
    } else {
        $(container).empty();
        loginComponent.attach(container);
        $('#my-navbar a').removeClass('active');
        $('#my-navbar a[href="/login"]').addClass('active');
    }
    check_login();
}

function logout() {
    $(container).empty();
    loginComponent.logout();        
    page.redirect('/');
    check_login();
}

function notfound() {
    $(container).empty();
    check_login();
}

page.start();