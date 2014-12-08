RealtorApp.Results = function (params, viewInfo) {
    var isPhone = DevExpress.devices.current().screenSize === "small";
    var customTitle = ko.observable("");

    var ITEM_LIST = "list",
        ITEM_GALLERY = "gallery";

    var loadPanelVisible = ko.observable(true),
        loadPanelMessage = ko.observable(''),
        listData = ko.observableArray([]),
        isLoaded = ko.observable(false),
        mapMarkers = ko.observableArray([]),
        activeItem = ko.observable(ITEM_GALLERY),
        listCount = ko.observable(0),
        selectedItemIndex = ko.observable(0),
        alternateNamesAreVisible = ko.observable(),
        dataSource = ko.observable();

    var avDjela;

    function initializeResult() {
        return function (result) {
            listData(result);
            mapMarkers(markersByCoordinates(result));
            loadPanelVisible(false);
            isLoaded(true);
        }
    }

    function loadData() {
       
       // getList();
  /*      if (params.type === 'searchstring') {
            if (!isPhone) customTitle(params.id);
            RealtorApp.data.getPropertiesByPlaceName(params.id).done(initializeResult());
        } else {
            if (!isPhone) customTitle("My location");
            RealtorApp.data.getPropertiesByCoordinates(params.id).done(initializeResult());
        }*/
        
    }
       
    function markersByCoordinates(array) {
        var markers = [];
        for (var i = 0; i < array.length; i++) {
            markers.push({ location: array[i].Coordinates, clickAction: '#Details/' + array[i].ID });
        }
        return markers;
    }

    function getComputedIcon(itemName) {
        return ko.computed(function() {
            return itemName + (activeItem() == itemName ? '-selected' : '');
        });
    }
   
    function areAlternateNamesVisible()
    {
        if( $(window).height() > 480 )
            return "block";
        else
            return "none";
    }
    function isRedateljVisible() {
        if ($(window).height() > 600)
            return "block";
        else
            return "none";
    }

    function getList()
    {
        loadPanelVisible(true);
        alternateNamesAreVisible(areAlternateNamesVisible());
        loadPanelMessage('Please wait... Loading data');

        console.log("zovem ga :)");
        var list = new DevExpress.data.DataSource({
            store: RealtorApp.db.vwAV_Djelo,
            map: function (item) {
                return new RealtorApp.vwAV_DjeloViewModel(item);
            },
            filter: createFilter(params.id),

        });

        list.loadingChanged.add(function () {
           
            console.log(list.items().length);
            listCount(list.items().length);
            isLoaded(true);
            loadPanelVisible(false);
        });

       return list;
    }

    function createFilter(word) {

        var words = word.split(' ');

        var result = [];

        for (var i = 0; i < words.length; i++) {

            var item = words[i];
            result.push(["HrvatskiNaslov", "contains", item]);
            result.push("or");
            result.push(["IzvorniNaslov", "contains", item]);
          //  result.push("or");
           // result.push(["Redatelj", "contains", item]);
            if (i != words.length - 1) {
                result.push("or");
            }
        }

        return result;
    }


    var viewModel = {
        title: customTitle,
        listData: listData,
        loadPanelVisible: loadPanelVisible,
        loadPanelMessage: loadPanelMessage,
        isLoaded: isLoaded,
        activeItem: activeItem,
        iconList: getComputedIcon(ITEM_LIST),
        mapMarkers: mapMarkers,
        iconGallery: getComputedIcon(ITEM_GALLERY),
        listCount: listCount,
        alternateNamesAreVisible: areAlternateNamesVisible(),
        redateljIsVisible:isRedateljVisible(),
        selectedItemIndex:selectedItemIndex,
        selectedItem: ko.computed(function() {
            return selectedItemIndex + 1;
        }, this),

        resultsItemClick: function (item) {
            RealtorApp.app.navigate({ view: "Details", id: item.model.OID() });
        },
     
        changeFavState:function( item )
        {
            console.log( item.model );
        },

        goToList: function () {
            viewModel.activeItem(ITEM_LIST);
        },
        goToGallery: function () {
            viewModel.activeItem(ITEM_GALLERY);
        },
    
        viewShowing: function (args) {
            $(".footer-arrow").hide();
            if (!args.viewInfo.renderResult) {
               loadData();
            }        
        },

        dataSource: getList()
    };

    return viewModel;
};