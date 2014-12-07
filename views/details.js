RealtorApp.Details = function (params, viewInfo) {
   

    var MAP_CONTAINER = ".details #map",
        MAP_INNER = ".details .map-inner",
        MAX_MAP_WIDTH = 640;

    var isPhone = DevExpress.devices.current().screenSize === "small",
        homeItem = ko.observable(null),
        images = ko.observableArray(),
        isLoaded = ko.observable(false),
        loadPanelVisible = ko.observable(false),
        loadPanelMessage = ko.observable(""),
        title = ko.observable(""),
        status = ko.observable(""),
        backText = ko.observable(""),
        tmpDetails = ko.observable();

    setupBackText();
    function setupBackText() {
        if (viewInfo.previousViewInfo.viewName == 'Home') {
            backText("Na pretragu");
            return;
        }
        if (viewInfo.previousViewInfo.viewName == 'Results') {
            backText("Na popis");
        }
    }

    function loadData(id) {

        isLoaded(false);
        loadPanelVisible(true);
        loadPanelMessage('Please wait... Loading data');

        getAVDjeloById( id );

        RealtorApp.data.getPropertyInfo(id).done(function (result) {
            $.each(result.Images, function (_, image) {
                images.push("url(" + image + ")");
            });

            result.Price = Globalize.format(result.Price, "c0");
            result.HouseSize = Globalize.format(result.HouseSize, "n0");

            switch (result.Status) {
                case '0': status('Active');
                    break;
                case '1': status('Selling');
                    break;
                case '2': status('Sold');
                    break;
                default: status('Unknown');
            }

            homeItem(result);
            title(result.Address);
            isLoaded(true);
            loadPanelVisible(false);
            //updateMap();
            setupScroll();
        });
    }

    
    function setupScroll() {

        var scrollElement = $(".dx-active-view .tablet-scrollable");
        if (isPhone) {
            scrollElement = $(".dx-active-view .details");
        }
        scrollElement.dxScrollView(
            {
                scrollAction: onScroll
        });

        scrollElement.data("dxScrollView").scrollTo(0);
    }

    function onScroll(scrollEvent) {
        if (scrollEvent.reachedBottom) {
            $(".footer-arrow").hide();
        } else {
            $(".footer-arrow").show();
        }
    }

    function getAVDjeloById(oid) {
        var list = new DevExpress.data.DataSource({
            store: RealtorApp.db.vwAV_Djelo,
            map: function (item) {
                return new RealtorApp.vwAV_DjeloViewModel(item);
            },
            filter: ["OID","=", oid]
        });

        list.changed.add(function () {
            tmpDetails(list.items()[0]);
        });

        list.load();

    }

    function updateMap() {
        var mapHeight = "100%",
            mapWidth = "100%",
            provider = "bing",
            scrollElement = $(".dx-active-view .tablet-scrollable");
        if (isPhone) {
            mapHeight = $(MAP_CONTAINER).height();
            mapWidth = $(MAP_CONTAINER).width();
            provider = "googleStatic";
            mapWidth = (mapWidth > MAX_MAP_WIDTH) ? MAX_MAP_WIDTH : mapWidth;
            scrollElement = $(".dx-active-view .details");
        }

        $(MAP_INNER).dxMap({
            center: homeItem().Coordinates,
            width: mapWidth,
            height: mapHeight,
            zoom: 12,
            provider: provider,
            markers: [{ location: homeItem().Coordinates }],
            markerIconSrc: "http://js.devexpress.com/Demos/RealtorApp/images/map-marker.png"
        });
        scrollElement.dxScrollView({});
        scrollElement.data("dxScrollView").scrollTo(0);
    }

    var viewModel = {
        //  Put the binding properties here
        homeItem: homeItem,
        images: images,

        isLoaded: isLoaded,
        loadPanelVisible: loadPanelVisible,
        loadPanelMessage: loadPanelMessage,
        isPhone: isPhone,
        title: title,
        status: status,
        favButtonText: ko.observable(null),
       
        tmpData: tmpDetails,
        viewShowing: function () {
            $(".footer-arrow").show();
            loadData(Number(params.id));
        },
        backText: backText
    };

    return viewModel;
};