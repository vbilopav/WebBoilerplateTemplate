define([
    'text!layout/layout.html',
     'user/navItem'
], function (template, usrNavTempl) {

    var nav = null,
        navbrand = null,
        navtoggle = null,
        navcollapse = null,
        usrNav = null,
        usrNavCollapse = null,
        toggleVisible = null;


    var onClickNavigation = function (e) {
        if (e.target.href === window.location.href && navtoggle.is(':visible') && navcollapse.is(':visible')) {
            navtoggle.trigger("click");
        }
    };

    var collapseNavMenu = function () {
        if (navtoggle.is(':visible') && navcollapse.is(':visible')) {
            navtoggle.trigger("click");
        }
    };

    //occurs when toggle button is shown or hidden
    var onNavToggleShow = function (shown) {
        if (shown) {
            usrNav.css('display', 'block');
            usrNavCollapse.css('display', 'none');
        } else {
            usrNav.css('display', 'none');
            usrNavCollapse.css('display', 'block');
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
            }
    };

    // these links populate the navbar
    var viewModel = kendo.observable({
        home: 'Home',
        navclick: onClickNavigation,
        links: [{ title: 'Home', href: '#/', icon: 'home', icon: 'fa fa-home' },
                { title: 'Details', href: '#/details', icon: 'fa fa-ellipsis-h' },
                { title: 'Missing', href: '#/missing', icon: 'fa fa-bug' }]
    });

    $.subscribe('/router/change', function (e) {

        //if toggle nav menu is collapsed, uncollapse it whwn view is shown
        collapseNavMenu();

        nav.find('span').removeClass('lb-color');
        if (e.url === '/') {
            navbrand.children(0).addClass("lb-color");
            nav.find('li').removeClass('active');
        } else {
            navbrand.children(0).removeClass("lb-color");
            var active = nav.find('a[href="#' + e.url + '"]').parent();
            nav.find('li').removeClass('active');
            if (active.length > 0) {
                active.addClass('active');
                active.children(0).children(0).addClass("lb-color");
            }
        }
    });

    $(window).resize(onWinResize);

    // public
    var pub = {};

    pub.layout = new kendo.Layout(template, {
        model: viewModel,
        init: function (e) {

            //cache elements and do initialization
            nav = e.sender.element.find('#nav-links');
            navbrand = e.sender.element.find('.navbar-brand');
            navtoggle = $('.navbar-header .navbar-toggle');
            navcollapse = $('#navbar-collapse');
            toggleVisible = navtoggle.is(':visible');
            usrNav = $('ul#usr-nav').html(usrNavTempl.html);
            usrNavCollapse = $('ul#usr-nav-collapse').html(usrNavTempl.html);
            onNavToggleShow(toggleVisible);
        }
    });

    return pub;
});