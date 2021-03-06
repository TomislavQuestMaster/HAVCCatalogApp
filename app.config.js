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
          "gallery",
          "list",
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
            "local": "http://localhost:21372/DataService.svc",
            "production": "http://localhost:21372/DataService.svc"
        }
    },
    "services": {
        "db": {
            "entities": {
                "AVDjelo": {
                    "key": "OID",
                    "keyType": "Int32"
                }
            }
        }
    }
  }
});