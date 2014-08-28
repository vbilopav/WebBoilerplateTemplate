require.config({
    paths: {
        'k': '../Scripts/kendo/2014.1.416/'
    }
});
define([
    'k/kendo.router.min',
    'k/kendo.view.min',
    'k/kendo.fx.min'
], function () {
    return kendo;
})