sap.ui.define([

	"sap/ui/core/UIComponent",

	"sap/ui/Device",
	"ZHR_144/model/models"

], function(UIComponent, Device, models) {

	"use strict";

	var cPernr;
	var cPronr;
	var cAppnr;
	var cAdSoyad;
	var cDogumTarih;
	var cGecerTarih;
	var cPozisyon;
	var cPerAlan;
	var cPerAltAlan;
	var cIsAlan;
	var cIsAnahtari;
	var cOrgBirim;
	var cClsGrup;
	var cClsAltGrp;
	var cSkala;
	var cUcret;
	var cDiger;
	var cOkulTur;
	var cOkulAd;
	var cEgitim;
	var cTC;
	var cSirket;
	var cDilPrim;
	var cAracPrim;
	var cMevPrim;
	var cVekPrim;
	var cAyrilma;
	var cCikisTip;
	var cCikisNeden1;
	var cCikisNeden2;
	var cCikisNeden3;

	return UIComponent.extend("ZHR_144.Component", {

		metadata: {

				manifest: "json"
		

		},

		init: function() {

			UIComponent.prototype.init.apply(this, arguments);

			this.setModel(models.createDeviceModel(), "device");

			this.getRouter().initialize();

		}

	});

});