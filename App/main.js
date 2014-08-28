require.config({
    paths: {
        pubsub: '../Scripts/pubsub.min',
        debug: '../Scripts/debug.min',
        text: '../Scripts/text.2.0.7.min',
        kendo: 'vendor/kendo'
    }
});
define([
    'pubsub',
    'debug',
    'kendo'
], function () {
    require(['app'], function (app) {
        app.start();
    });
});