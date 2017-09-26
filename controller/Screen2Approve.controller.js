sap.ui.define(["sap/ui/core/mvc/Controller", "sap/ui/core/routing/History", "sap/m/MessageToast",

	"sap/m/MessageBox", "sap/ui/commons/TextField"

], function(Controller, History, MessageToast, MessageBox,

	TextField) {

	"use strict";

	var oModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZHR_144_SRV_01");

	return Controller.extend("ZHR_144.controller.Screen2Approve", {

		onInit: function() {

			var that = this;
			var pernrFilter = sap.ui.getCore().cPernr;
			var pronrFilter = sap.ui.getCore().cPronr;
			var appnrFilter = sap.ui.getCore().cAppnr;
			var oJasonModel = new sap.ui.model.json.JSONModel();
			var filter = "Pernr eq '" + pernrFilter + "' and  Pronr eq '" + pronrFilter + "' and Appnr eq '" + appnrFilter + "'";

			oModel.read("/ZHROnayciSet", null, ["$filter=" + filter], true,
				function(oData) {
					oJasonModel.setData(oData);
					console.log(oData.results);

				});

			that.getView().setModel(oJasonModel, "JasonModel");

			this.getView().byId("onayciList2").setModel(this.getView().getModel("JasonModel"));

			//onaycı goruntuleme ekranına information bilgilerini set etme begin of ycoskun

			var pozisyon, perAlan, perAltAlan, isAlan, isAnahtar, orgBirim, clsGrup, aracPrim, dilPrim, mevPrim, vekPrim;
			var clsAltGrp, skala, ucret, diger, okulTur, okulAd, egitim, adSoyad, dogumTarih, gecerTarih, sirket, tc, sicil;

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
			
			//split edip kodu backende yollama begin of ycoskun
			var plans = sap.ui.getCore().cPozisyon;
			var arrayPlans = plans.split(" / ");
			pozisyon = arrayPlans[1];

			var gsber = sap.ui.getCore().cIsAlan;
			var arrayGsber = gsber.split(" / ");
			isAlan = arrayGsber[1];

			var stell = sap.ui.getCore().cIsAnahtari;
			var arrayStell = stell.split(" / ");
			isAnahtar = arrayStell[1];

			var orgeh = sap.ui.getCore().cOrgBirim;
			var arrayOrgeh = orgeh.split(" / ");
			orgBirim = arrayOrgeh[1];

			var persg = sap.ui.getCore().cClsGrup;
			var arrayPersg = persg.split(" / ");
			clsGrup = arrayPersg[1];

			var persk = sap.ui.getCore().cClsAltGrp;
			var arrayPersk = persk.split(" / ");
			clsAltGrp = arrayPersk[1];

			var werks = sap.ui.getCore().cPerAlan;
			var arrayWerks = werks.split(" / ");
			perAlan = arrayWerks[1];

			var btrtl = sap.ui.getCore().cPerAltAlan;
			var arrayBtrtl = btrtl.split(" / ");
			perAltAlan = arrayBtrtl[1];

			//end of ycoskun


			this.getView().byId("adSoyadApprove2").setText(adSoyad);
			this.getView().byId("dogumTarihApprove2").setText(dogumTarih);
			this.getView().byId("gecerTarihApprove2").setText(gecerTarih);
			this.getView().byId("posApprove2").setValue(pozisyon);
			this.getView().byId("perAlanApprove2").setValue(perAlan);
			this.getView().byId("perAltAlanApprove2").setValue(perAltAlan);
			this.getView().byId("isAlanApprove2").setValue(isAlan);
			this.getView().byId("isAnahApprove2").setValue(isAnahtar);
			this.getView().byId("orgBrmApprove2").setValue(orgBirim);
			this.getView().byId("clsGrpApprove2").setValue(clsGrup);
			this.getView().byId("clsAltGrpApprove2").setValue(clsAltGrp);
			this.getView().byId("skalaApprove2").setValue(skala);
			this.getView().byId("ucretApprove2").setValue(ucret);
			this.getView().byId("digerApprove2").setValue(diger);
			this.getView().byId("okulTurApprove2").setValue(okulTur);
			this.getView().byId("okulAdApprove2").setValue(okulAd);
			this.getView().byId("egitimApprove2").setValue(egitim);
			this.getView().byId("sirketApprove2").setValue(sirket);
			this.getView().byId("dilPrimApprove2").setValue(dilPrim);
			this.getView().byId("aracPrimApprove2").setValue(aracPrim);
			this.getView().byId("mevPrimApprove2").setValue(mevPrim);
			this.getView().byId("vekPrimApprove2").setValue(vekPrim);
			this.getView().byId("tcApprove2").setValue(tc);
			this.getView().byId("sicilApprove2").setValue(sicil);

			//end of ycoskun

		},

		onBack: function() {

			this.getOwnerComponent().getRouter().navTo("screen2");

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
		}

	});

}, /* bExport= */ true);