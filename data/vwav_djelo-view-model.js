
(function() {
    RealtorApp.vwAV_DjeloViewModel = function(data) {
            this.OID = ko.observable();
            this.IzvorniNaslov = ko.observable();
            this.StraniNaslov = ko.observable();
            this.HrvatskiNaslov = ko.observable();
            this.ImageSource = ko.observable();
            this.Images = ko.observableArray([]);
            this.OpisHrvatski = ko.observable();
            this.OpisStrani = ko.observable();
            this.Trajanje = ko.observable();
            this.Redatelj = ko.observable();
            this.ZemljaPorijekla = ko.observableArray([]);
            this.Zanr = ko.observableArray([]);
            this.Scenarij= ko.observableArray([]);
            this.Producent= ko.observableArray([]);
            this.Fotografija= ko.observableArray([]);
            this.Montaza= ko.observableArray([]);
            this.Zvuk= ko.observableArray([]);
            this.Glazba = ko.observableArray([]);
            this.Kostimografijs = ko.observableArray([]);
            this.Glumci= ko.observableArray([]);
            this.Festivali= ko.observableArray([]);
            this.ProdukcijskaKuca= ko.observableArray([]);
            this.Koproducenti = ko.observableArray([]);
            this.Potpora = ko.observableArray([]);
            this.Test = ko.observable();
            if(data)
                this.fromJS(data);
    };

    $.extend(RealtorApp.vwAV_DjeloViewModel.prototype, {
        toJS: function () {
            return {
                OID: this.OID(),
                IzvorniNaslov: this.IzvorniNaslov(),
                StraniNaslov: this.StraniNaslov(),
                HrvatskiNaslov: this.HrvatskiNaslov(),
                Zanr:this.Zanr(),
            };
        },

        fromJS: function(data) {
            if(data) {
                this.OID(data.OID);
                this.IzvorniNaslov(data.IzvorniNaslov);
                this.StraniNaslov(data.StraniNaslov);
                this.HrvatskiNaslov(data.HrvatskiNaslov);
                this.ImageSource("data/Homes/1a.jpg");
                var random = Math.floor(Math.random() * (RealtorApp.data.movieImages.length));
                this.Images(RealtorApp.data.movieImages[random]);
               //this.Images(["data/Homes/1a.jpg", "data/Homes/1b.jpg"]);
                this.Test("lalalala");
                this.Trajanje(150);
                this.Redatelj("Sanja Marjanovic");
                this.Zanr(["Komedija", "Triler"]);
                this.Zanr.push("Komedija");
                this.ZemljaPorijekla(["Hrvatska", "�kotska"]);
                this.OpisHrvatski( "Neka se prijateljstva odr�e, neka putem gubimo, no svako prijateljstvo ostavlja sna�an utisak i igra va�nu ulogu u tome tko smo danas. Koriste�i arhivske snimke koje su same protagonistice snimile pred deset godina, kao tinejd�erke, BFF govori o prijateljstvu i odrastanju �etiri mlade Rije�anke...");
                this.OpisStrani("BFF is a film about friendship and growing up. Following a story of four girls over the course of 10 years, we question what it is that makes us have friends? What is the cost of growing up and changing?");
                this.Scenarij([ "Sanja Marjanovi�" ,  "Sanja Marjanovi�" ]);
                this.Producent ([ "Sanja Marjanovi�" ,  "Sanja Marjanovi�" ]);
                this.Fotografija ([ "Sanja Marjanovi�" , "Sanja Marjanovi�"]);
                this.Montaza (["Sanja Marjanovi�", "Sanja Marjanovi�" ]);
                this.Zvuk (["Sanja Marjanovi�", "Sanja Marjanovi�"]);
                this.Glazba= (["Sanja Marjanovi�", "Sanja Marjanovi�"]);
                this.Kostimografijs ([ "Sanja Marjanovi�",  "Sanja Marjanovi�" ]);
                this.Glumci ([ "Sanja Marjanovi�",  "Sanja Marjanovi�" ]);
                this.Festivali ([ "Liburnia Film Festival - Glavni program" , "Vox Feminae Festival - Teen" ]);
                this.ProdukcijskaKuca ([ "Udruga filmaktiv" ]);
                this.Koproducenti ([ "Udruga Filmaktiv"]);
                this.Potpora  ([ "" ]);

            }
        }
    });
})();