sap.ui.define(["sap/ui/core/mvc/Controller", "sap/ui/core/routing/History", "sap/m/MessageToast",

	"sap/m/MessageBox", "sap/ui/commons/TextField"

], function(Controller, History, MessageToast, MessageBox,

	TextField) {

	"use strict";

	var oModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZHR_144_SRV_01");

	return Controller.extend("ZHR_144.controller.Screen4Approve", {

		onInit: function() {

			// var sUrl = "#" + this.getOwnerComponent().getRouter().getURL("login");

			// this.byId("link").setHref(sUrl);

			var that = this;
			var pernrFilter = sap.ui.getCore().cPernr;
			var pronrFilter = sap.ui.getCore().cPronr;
			var appnrFilter = sap.ui.getCore().cAppnr;
			var oJasonModel = new sap.ui.model.json.JSONModel();
			var filter = "Pernr eq '" + pernrFilter + "' and  Pronr eq '" + pronrFilter + "' and Appnr eq '" + appnrFilter + "'";

			var perFilterDil = "Pernr eq '" + pernrFilter + "'";
			var oLangModel = new sap.ui.model.json.JSONModel();
			var langtable = that.getView().byId("idLanguageTableApprove4");

			var perAbFilterZB = "Pernr eq '" + pernrFilter + "'";
			var oAbModel = new sap.ui.model.json.JSONModel();
			var zbtable = that.getView().byId("idAbilityTableApprove4");

			var perFilterPD = "Pernr eq '" + pernrFilter + "'";
			var pdtable = that.getView().byId("idPDTableApprove4");
			var oPDModel = new sap.ui.model.json.JSONModel();

			oModel.read("/ZHROnayciSet", null, ["$filter=" + filter], true,
				function(oData) {
					oJasonModel.setData(oData);
					console.log(oData.results);

				});

			that.getView().setModel(oJasonModel, "JasonModel");

			this.getView().byId("onayciList4").setModel(this.getView().getModel("JasonModel"));

			//onaycı goruntuleme ekranına information bilgilerini set etme begin of ycoskun

			var pozisyon, perAlan, perAltAlan, isAlan, isAnahtar, orgBirim, clsGrup, aracPrim, dilPrim, mevPrim, vekPrim;

			var clsAltGrp, skala, ucret, diger, okulTur, okulAd, egitim, adSoyad, dogumTarih, gecerTarih, sirket, tc, sicil;
			
					pozisyon = sap.ui.getCore().cPozisyon;
					perAlan = sap.ui.getCore().cPerAlan;
					perAltAlan = sap.ui.getCore().cPerAltAlan;
					isAlan = sap.ui.getCore().cIsAlan;
					isAnahtar = sap.ui.getCore().cIsAnahtari;
					orgBirim = sap.ui.getCore().cOrgBirim;
					clsGrup = sap.ui.getCore().cClsGrup;
					clsAltGrp = sap.ui.getCore().cClsAltGrp;
					skala = sap.ui.getCore().cSkala;
					ucret = sap.ui.getCore().cUcret;
					diger = sap.ui.getCore().cDiger;
					okulTur = sap.ui.getCore().cOkulTur;
					okulAd = sap.ui.getCore().cOkulAd;
					egitim = sap.ui.getCore().cEgitim;
					adSoyad = sap.ui.getCore().cAdSoyad;
					dogumTarih = sap.ui.getCore().cDogumTarih;
					gecerTarih = sap.ui.getCore().cGecerTarih;
					aracPrim = sap.ui.getCore().cAracPrim;
					dilPrim = sap.ui.getCore().cDilPrim;
					mevPrim = sap.ui.getCore().cMevPrim;
					vekPrim = sap.ui.getCore().cVekPrim;
					sirket = sap.ui.getCore().cSirket;
					tc = sap.ui.getCore().cTC;
					sicil = sap.ui.getCore().cPernr;

					this.getView().byId("adSoyadApprove4").setText(adSoyad);
					this.getView().byId("dogumTarihApprove4").setText(this.vDate(dogumTarih));
					this.getView().byId("gecerTarihApprove4").setText(this.vDate(gecerTarih));
					this.getView().byId("posApprove4").setValue(pozisyon);
					this.getView().byId("perAlanApprove4").setValue(perAlan);
					this.getView().byId("perAltAlanApprove4").setValue(perAltAlan);
					this.getView().byId("isAlanApprove4").setValue(isAlan);
					this.getView().byId("isAnahApprove4").setValue(isAnahtar);
					this.getView().byId("orgBrmApprove4").setValue(orgBirim);
					this.getView().byId("clsGrpApprove4").setValue(clsGrup);
					this.getView().byId("clsAltGrpApprove4").setValue(clsAltGrp);
					this.getView().byId("skalaApprove4").setValue(skala);
					this.getView().byId("ucretApprove4").setValue(ucret);
					this.getView().byId("digerApprove4").setValue(diger);
					this.getView().byId("okulTurApprove4").setValue(okulTur);
					this.getView().byId("okulAdApprove4").setValue(okulAd);
					this.getView().byId("egitimApprove4").setValue(egitim);
					this.getView().byId("sirketApprove4").setValue(sirket);
					this.getView().byId("dilPrimApprove4").setValue(dilPrim);
					this.getView().byId("aracPrimApprove4").setValue(aracPrim);
					this.getView().byId("mevPrimApprove4").setValue(mevPrim);
					this.getView().byId("vekPrimApprove4").setValue(vekPrim);
					this.getView().byId("tcApprove4").setValue(tc);
					this.getView().byId("sicilApprove4").setValue(sicil);

			//end of ycoskun

			//end of ycoskun

			//begin of ycoskun terfi yabancı dilleri getiR

			oModel.read("/ZHRTerfiYDSet", null, ["$filter=" + perFilterDil], true,
				function(oData) {
					oLangModel.setData(oData);

				});
			that.getView().setModel(oLangModel, "LangModel");
			langtable.setModel(that.getView().getModel("LangModel"));

			//end of ycoskun
			//begin of ycoskun  zihinsel beceri bilgileri getir
			oModel.read("/ZHRTerfiZBSet", null, ["$filter=" + perAbFilterZB], true,
				function(oData) {
					oAbModel.setData(oData);

				});
			that.getView().setModel(oAbModel, "oAbModel");
			zbtable.setModel(that.getView().getModel("oAbModel"));

			//end of ycoskun

			//Personelinin pd sonuc  bilgilerini getirme
			oModel.read("/ZHRTerfiPDSet", null, ["$filter=" + perFilterPD], true,
				function(oData) {
					oPDModel.setData(oData);

				});
			that.getView().setModel(oPDModel, "PDModel");
			pdtable.setModel(this.getView().getModel("PDModel"));

		},

		onBack: function() {

			this.getOwnerComponent().getRouter().navTo("screen4");

		},

		_handleMessageBoxOpen: function(sMessage, sMessageBoxType) {

			var that = this;

			MessageBox[sMessageBoxType](sMessage, {
				actions: [MessageBox.Action.YES, MessageBox.Action.NO],
				onClose: function(oAction) {
					if (oAction === MessageBox.Action.YES) {
						//that.getOwnerComponent().getRouter().navTo("PersonalActivity");
						//window.location.reload();
						setTimeout(function() {
							window.open("/sap/bc/ui5_ui5/ui2/ushell/shells/abap/FioriLaunchpad.html", "_self");
						}, 1000);

					}
				}
			});

		},

		handleWizardCancel: function() {
			this._handleMessageBoxOpen("Çıkmak istediğine emin misin?", "warning");

		},

		saveInf: function() {

			var oThat = this;
			oThat._handleMessageBox("Formu kaydetmek istediğinize emin misiniz?", "information");

		},
		_handleMessageBox: function(sMessage, sMessageBoxType) {

			var pernrSave = sap.ui.getCore().cPernr;
			var pronrSave = sap.ui.getCore().cPronr;
			var appnrSave = sap.ui.getCore().cAppnr;

			var oEntryWF = {};
			oEntryWF.Pernr = pernrSave;
			oEntryWF.Pronr = pronrSave;
			oEntryWF.Appnr = appnrSave;

			var that = this;

			MessageBox[sMessageBoxType](sMessage, {
				actions: [MessageBox.Action.YES, MessageBox.Action.NO],
				onClose: function(oAction) {
					if (oAction === MessageBox.Action.YES) {
						//ycoskun asagıdaki service hem işe alım,işten cıkıs ve terfi için calısmakta
						oModel.create("/ZHRIseAlimWFSet", oEntryWF, {
							method: "POST",
							success: function(oData) {
								sap.m.MessageToast.show("Form Kaydedildi");
								setTimeout(function() {
									window.open("/sap/bc/ui5_ui5/ui2/ushell/shells/abap/FioriLaunchpad.html", "_self");
								}, 1000);
							},
							error: function(oData) {
								sap.m.MessageToast.show("Bağlantı Hatası");

							}

						});

						oModel.refresh(true);
						that.getOwnerComponent().getRouter().navTo("PersonalActivity");
						window.location.reload();

					}
				}
			});
		},
		onBackScreen: function() {
			this.getOwnerComponent().getRouter().navTo("PersonalActivity");
		},
		vDate: function(value) {
			if (value) {
				var yil = value.substring(0, 4);
				var ay = value.substring(4, 6);
				var gun = value.substring(6, 8);
				var tarih = gun + "." + ay + "." + yil;
				return tarih;
			} else {
				return value;
			}
		}

	});

}, /* bExport= */ true);