define([
    'text!layout/layout.html'
], function (template) {

    var nav = null,
        navmain = null,
        navbrand = null,
        navtoggle = null,
        navcollapse = null,
        toggleVisible = null;

    var onClickNavigation = function (e) {
        if (e.target.href === window.location.href && navtoggle.is(':visible')) {
            navtoggle.trigger("click");
        } else {
            if (e.target.href === undefined && navtoggle.is(':visible') && navcollapse.is(':visible')) {
                navtoggle.trigger("click");
            }
        }
    };

    var collapseNavMenu = function () {
        if (navtoggle.is(':visible') && navcollapse.is(':visible')) {
            navtoggle.trigger("click");
        }
    };

    var onNavToggleShow = function (shown) {
        if (shown) {
            nav.show();
            navmain.hide();
        } else {
            nav.hide();
            navmain.show();
        }
    };

    var onWinResize = function () {
        if (navtoggle.is(':visible') && !toggleVisible) {
            toggleVisible = true;
            onNavToggleShow(toggleVisible);
        } else
            if (!navtoggle.is(':visible') && toggleVisible) {
                toggleVisible = false;
                onNavToggleShow(toggleVisible);
                //navcollapse.hide();
            }
    };

    // these links populate the navbar
    var viewModel = kendo.observable({
        home: 'Kendo UI By Telerik',
        signIn: 'SignIn!',
        navclick: onClickNavigation,
        links: [{ title: 'Home', href: '#/', icon: 'home', icon: 'fa fa-home' },
                { title: 'Details', href: '#/details', icon: 'fa fa-ellipsis-h' },
                { title: 'Missing', href: '#/missing', icon: 'fa fa-bug' }]
    });

    var activeteSelectedNav = function (el, url) {
        var active = el.find('a[href="#' + url + '"]').parent();
        el.find('li').removeClass('active');
        if (active.length > 0) {
            active.addClass('active');
            active.children(0).children(0).addClass("lb-color");
        }
    }

    $.subscribe('/router/change', function (e) {
        collapseNavMenu();
        activeteSelectedNav(nav, e.url);
        activeteSelectedNav(navmain, e.url);
    });

    $(window).resize(onWinResize);

    // public
    var pub = {};

    pub.layout = new kendo.Layout(template, {
        model: viewModel,
        init: function (e) {

            //cache elements and do initialization
            var h = $('#navbar-header');
            nav = e.sender.element.find('#nav-links', h);
            navmain = e.sender.element.find('#nav-links-main', h);
            navbrand = e.sender.element.find('.navbar-brand', h);
            navtoggle = $('#navbar-toggle', h);
            navcollapse = $('#navbar-collapse');

            toggleVisible = navtoggle.is(':visible');
            onNavToggleShow(toggleVisible);        
        }
    });

    return pub;
});