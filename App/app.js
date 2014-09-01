define([
    'layout/layout'
], function (l) {

    // the application router
    var router = new kendo.Router({
        init: function () {

            // render the layout first            
            l.layout.render("#applicationHost");            
        },

        routeMissing: function (e) {        
            //Enables dynamic views loading based on naming convention 'views/home/home', 'views/details/details'...

            // assume the view is the same as the route
            var path = e.url.split('?')[0];
            path = path === '/' ? '/home' : path;

            // require it in
            require(['views' + path + path], function (view) { l.layout.showIn('#content', view); });           
        },
        
        change: function (e) {            
            // publish an event whenever the route changes
            $.publish('/router/change', [e]);
        }
    });
    
    return router;
});