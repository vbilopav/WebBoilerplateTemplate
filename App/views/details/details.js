define([
    'text!views/details/details.html'
], function (detailsTemplate) {

    var viewModel = kendo.observable({
        title: 'Details'
    });

    var view = new kendo.View(detailsTemplate, {
        model: viewModel,
        show: function (e) {
            kendo.fx(this.element).fade('in').duration(500).play();
        }
    });

    return view;

});
