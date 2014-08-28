/*
    >node Scripts/r.js -o App/config.js

    https://github.com/jrburke/r.js/blob/master/build/example.build.js

    http://requirejs.org/docs/api.html#config-shim:
    Do not mix CDN loading with shim config in a build. 
*/
({
    paths: {
        pubsub: '../Scripts/pubsub.min',
        debug: '../Scripts/debug.min',
        text: '../Scripts/text.2.0.7.min',
        k: '../Scripts/kendo/2014.1.416/',
        kendo: 'vendor/kendo'
    },
    shim: {
        main: {
            deps: ['app']
        },
        app: {
            deps: ['views/home/home', 'views/details/details']
        }
    },
    
    name: 'main',
    preserveLicenseComments: false,
    /*optimize: 'none',*/
    out: 'build/main.js'
})