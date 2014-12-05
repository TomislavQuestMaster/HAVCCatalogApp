window.RealtorApp = $.extend(true, window.RealtorApp, {
  "config": {
    "layoutSet": "navbar",
    "commandMapping": {
      "generic-header-toolbar": {
        "defaults": {
          "showIcon": "true",
          "showText": "false",
          "location": "after"
        },
        "commands": [
          "list",
          "map",
          "gallery"
        ]
      }
    },
    "navigation": [
      {
        "title": "Search",
        "action": "#Home",
        "icon": "home"
      },
      {
        "title": "Favorites",
        "action": "#Favorites",
        "icon": "favorites"
      },
      {
        "title": "About",
        "action": "#About",
        "icon": "info"
      }      
    ],
    "endpoints": {
        "db": {
            "local": "http://localhost:51234/DataService.svc",
            "production": "http://localhost:51234/DataService.svc"
        }
    },
    "services": {
        "db": {
            "entities": {
                "vwAV_Djelo": {
                    "key": "OID",
                    "keyType": "Int32"
                }
            }
        }
    }
  }
});