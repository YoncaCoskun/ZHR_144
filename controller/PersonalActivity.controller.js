sap.ui.define(["sap/ui/core/mvc/Controller"], function(Controller) {

	"use strict";

	return Controller.extend("ZHR_144.controller.PersonalActivity", {

		onInit: function() {

			/*	var sUrl = "#" + this.getOwnerComponent().getRouter().getURL("screen1");

				this.byId("link").setHref(sUrl);*/

		},

		onAfterRendering: function() {

		},

		onToNext: function() {

			var oSelectedActivity = this.getView().byId("personalActivity").getSelectedKey();

			//ilk ekranda secilen personel hareketine göre ıkıncı ekrana gecer

			if (oSelectedActivity === "0") {

				this.getOwnerComponent().getRouter().navTo("screen1");

			} else if (oSelectedActivity === "1") {

				this.getOwnerComponent().getRouter().navTo("screen2");

			} else if (oSelectedActivity === "2") {

				this.getOwnerComponent().getRouter().navTo("screen3");

			} else if (oSelectedActivity === "3") {

				this.getOwnerComponent().getRouter().navTo("screen4");

			} else if (oSelectedActivity === "4") {

				this.getOwnerComponent().getRouter().navTo("screen5");

			} else if (oSelectedActivity === "5") {

				this.getOwnerComponent().getRouter().navTo("screen6");

			}

		},

		onHistory: function() {

			this.getOwnerComponent().getRouter().navTo("History");

		}

	});

}, /* bExport= */ true);