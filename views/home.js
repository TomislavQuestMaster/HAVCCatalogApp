﻿
RealtorApp.Home = function (params) {
    var isPhone = DevExpress.devices.current().screenSize === "small",
        watchToken = null,
        loadPanelMessage = ko.observable(""),
        loadPanelVisible = ko.observable(false),
        listData = ko.observableArray([]),
        errorMessage = ko.observable(""),
        isSearchActive = ko.observable(false),
        locationHandled = false,
        randomMovies = ko.observableArray([]);

    function loadData() {
        loadPanelVisible(true);
        loadPanelMessage("Please wait... Loading data");
        getList();
  /*      RealtorApp.data.getBestOffers(isPhone ? 3 : 5).done(function (result) {
            $.each(result, function(index, item) {
                listData.push({
                    image: "url(" + item.Images[0] + ")",
                    price: Globalize.format(item.Price, "c0"),
                    priceCss: "price" + index,
                    doubleCss: index ? "item" + index : "double",
                    ID: item.ID
                });
            });           
            loadPanelVisible(false);
        });*/
    }
    
    function getCurrentPositionSuccess(position) {
        if (locationHandled) return;
        locationHandled = true;
        navigator.geolocation.clearWatch(watchToken);
        loadPanelVisible(false);
        RealtorApp.app.navigate(
            "Results/" +
            position.coords.latitude + "," +
            position.coords.longitude + 
            "/coordinates");
    }

    function getCurrentPositionFail(error) {
        if (locationHandled) return;
        locationHandled = true;
        navigator.geolocation.clearWatch(watchToken);
        switch (error.code) {
            case 1:
                errorMessage("The use of location is currently disabled.");
                break;
            default:
                errorMessage("Unable to detect current location. Please ensure location is turned on in your phone settings and try again.");
        }
        loadPanelVisible(false);
    }
    
    function getList() {
        var list = new DevExpress.data.DataSource({
            store: RealtorApp.db.AVDjelo,
            map: function (item) {
                return new RealtorApp.vwAV_DjeloViewModel(item);
            },
        });

        list.changed.add(function () {
           
            var random1 = Math.floor(Math.random() * (list.items().length));
            var random2 = Math.floor(Math.random() * (list.items().length));
            var random3 = Math.floor(Math.random() * (list.items().length));
            var random4 = Math.floor(Math.random() * (list.items().length));
            var random5 = Math.floor(Math.random() * (list.items().length));
            var rm = [list.items()[random1], list.items()[random2], list.items()[random3], list.items()[random4], list.items()[random5]];

            $.each(rm, function (index, item) {
             
                listData.push({
<<<<<<< HEAD
                    image: "url(" + item.Images()[0] + ")",
                    price: Globalize.format(item.OriginalniNaslov, "c0"),
=======
                    OID:item.OID(),
                    image: item.Images()[0],
                    price: Globalize.format(item.IzvorniNaslov, "c0"),
>>>>>>> 592e62c4b779cdf3a6c1ea78150a83f33913f915
                    priceCss: "price" + index,
                    doubleCss: index ? "item" + index : "double",
                    ID: item.ID
                });
            });
            loadPanelVisible(false);
            
        });

        list.load();

    }

    var viewModel = {
        listData: listData,
        loadPanelVisible: loadPanelVisible,
        loadPanelMessage: loadPanelMessage,
        errorMessage: errorMessage,
        isSearchActive: isSearchActive,
        errorVisible: ko.computed(function() {
            return errorMessage().length != 0;
        }),
        randomMovies:randomMovies,
        hideError: function() {
            errorMessage("");
        },
        text: ko.observable(""),
        homeItemClick: function (object) {
            console.log(object);
            RealtorApp.app.navigate("Details/" + object.model.OID);
        },
        searchItemClick: function () {
            if (!this.text()) {
                errorMessage("Please enter the search string.");
                return;
            };
            RealtorApp.app.navigate("Results/" + this.text() + "/searchstring");
        },
        locationItemClick: function () {
            locationHandled = false;
            loadPanelVisible(true);
            errorMessage("");
            loadPanelMessage("Getting coordinates. Please wait...");
            if (navigator.geolocation)
                watchToken = navigator.geolocation.watchPosition(getCurrentPositionSuccess, getCurrentPositionFail);
            else {
                errorMessage("Geolocation is not supported by this device.");
            }
            setTimeout(function () {
                getCurrentPositionFail({ code: 3 });
            }, 5000);
        },
        viewShowing: function (args) {
            $(".footer-arrow").hide();

            if (args.viewInfo.renderResult)
                isSearchActive(false);
            else
                loadData();
        },
        showSearchControls: function() {
            if (!isSearchActive()) {
                isSearchActive(true);
                setTimeout(function () {
                    $(".search-text").data("dxTextBox").focus();
                }, 500);  
            }
        }
        
    };

    return viewModel;
};