window.RealtorApp = window.RealtorApp || {};

window.realDevice = DevExpress.devices.real();
window.isWin8Phone = realDevice.platform == "win8" && realDevice.phone == true;

$(function () {
    DevExpress.devices.current().platform = "generic";

    function exitApp() {
        if(confirm("Are you sure you want to exit?")) {
            switch (window.realDevice.platform) {
                case "android":
                    navigator.app.exitApp();
                    break;
                case "win8":
                    window.external.Notify("DevExpress.ExitApp");
                    break;
            }
        }
    }

    function onDeviceReady() {        
        document.addEventListener("backbutton", onBackButton, false);
        RealtorApp.app.navigatingBack.add(function (args) {
            if(!RealtorApp.app.canBack()) {
                args.cancel = true;
                exitApp();
            }
        });
    }

    function onBackButton() {
        DevExpress.hardwareBackButton.fire();
    }

    RealtorApp.app = new DevExpress.framework.html.HtmlApplication({
        namespace: RealtorApp,
        layoutSet: DevExpress.framework.html.layoutSets[RealtorApp.config.layoutSet],
        navigation: RealtorApp.config.navigation,
        navigateToRootViewMode: "keepHistory",
        commandMapping: RealtorApp.config.commandMapping
    });
    RealtorApp.app.router.register(":view/:id/:type", { view: "Home", id: undefined, type: undefined });
    RealtorApp.app.viewRendered.add(function(args) {
        var viewInfo = args.viewInfo;
        if(viewInfo.viewTemplateInfo.toolbar === false)
            viewInfo.renderResult.$markup.addClass("hide-toolbar");
    });
   

    var device = DevExpress.devices.current();

    function setScreenSize() {
        if (window.isWin8Phone) {
            device.screenSize = "small";
            $.each(document.styleSheets, function (index, element) {
                if (element.href) {
                    if (element.href.indexOf("index.small.css") >= 0) {
                        for (var i = element.media.length - 1; i >= 0; i--)
                            element.media.deleteMedium(element.media.item(i));
                    }
                    if (element.href.indexOf("index.medium.css") >= 0) {
                        element.disabled = true;
                    }
                }
            });
            return;
        }
        var el = $("<div>").addClass("screen-size").appendTo(".dx-viewport");
        var size = getComputedStyle(el[0], ":after").content.replace(/"/g, "");
        el.remove();
        device.screenSize = size;        
    };
    $(window).bind("resize", setScreenSize);
    setScreenSize();
    RealtorApp.app.navigate();

    document.addEventListener("deviceready", onDeviceReady, false);
});


!function () {
    var FAVES_STORAGE_KEY = 'realtorapp-favorites';

    var loadFavesFromStorage = function () {
        var rawFaves = localStorage.getItem(FAVES_STORAGE_KEY),
            faves = JSON.parse(rawFaves || '[]');
        $.each(faves, function (_, value) {
            value.IsFavorite = ko.observable(true);
        });
        return faves;
    }

    var saveFavesToStorage = function () {
        localStorage.setItem(FAVES_STORAGE_KEY, JSON.stringify(faves()));
    }
    
    var faves = ko.observableArray(loadFavesFromStorage());

    ko.computed(function () {
        saveFavesToStorage();
    });

    var findFavedProperty = function (property) {
        if (!property)
            return null;
        var result = $.grep(faves(), function (item) {
            return item.ID === property.ID;
        });
        return result[0];
    }

    $.extend(RealtorApp, {
        faves: faves,
        findFavedProperty: findFavedProperty,
        loadFavesFromStorage: loadFavesFromStorage,
        saveFavesToStorage: saveFavesToStorage
   });

}();