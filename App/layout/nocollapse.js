define([
    'text!layout/nocollapse.html'
], function (t) {

    var template = kendo.template(t);

    // public
    var pub = {
        html: template({
            href: '#',
            signIn: 'SignIn!'
        })
    };

    return pub;
});