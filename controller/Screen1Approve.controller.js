sap.ui.define(["sap/ui/core/mvc/Controller", "sap/ui/core/routing/History", "sap/m/MessageToast",

	"sap/m/MessageBox", "sap/ui/commons/TextField"

], function(Controller, History, MessageToast, MessageBox,

	TextField) {

	"use strict";

	var oModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZHR_144_SRV_01");

	return Controller.extend("ZHR_144.controller.Screen1Approve", {

		onInit: function() {

			var that = this;
			var pernrFilter = sap.ui.getCore().cPernr;
			var pronrFilter = sap.ui.getCore().cPronr;
			var appnrFilter = sap.ui.getCore().cAppnr;
			var oJasonModel = new sap.ui.model.json.JSONModel();
			var filter = "Pernr eq '" + pernrFilter + "' and  Pronr eq '" + pronrFilter + "' and Appnr eq '" + appnrFilter + "'";
			var attachModel = new sap.ui.model.json.JSONModel();
			var perAttachFilter = "IvPernr eq '" + pernrFilter + "'";
			var perFilter = "Pernr eq '" + pernrFilter + "'";
			var oLangModel = new sap.ui.model.json.JSONModel();
			var langtable = that.getView().byId("idLanguageTableApprove");
			var perAbFilter = "Pernr eq '" + pernrFilter + "'";
			var oAbModel = new sap.ui.model.json.JSONModel();
			var zbtable = that.getView().byId("idAbilityTableApprove");

			oModel.read("/ZHROnayciSet", null, ["$filter=" + filter], true,
				function(oData) {
					oJasonModel.setData(oData);
					console.log(oData.results);

				});

			that.getView().setModel(oJasonModel, "JasonModel");
			this.getView().byId("onayciList").setModel(this.getView().getModel("JasonModel"));

			//onaycı goruntuleme ekranına information bilgilerini set etme begin of ycoskun

			var pozisyon, perAlan, perAltAlan, isAlan, isAnahtar, orgBirim, clsGrup, aracPrim, dilPrim, mevPrim, vekPrim;

			var clsAltGrp, skala, ucret, diger, okulTur, okulAd, egitim, adSoyad, dogumTarih, gecerTarih, sirket, tc, sicil, fisKonu;

			sicil = sap.ui.getCore().cPernr;
			oModel.read("/ZHRIseAlimPersonelSet('" + sicil + "')", null, null, true,
				function(oData) {

					pozisyon = oData.Stext;
					perAlan = oData.Pbtxt;
					perAltAlan = oData.Btext;
					isAlan = oData.Gtext;
					isAnahtar = oData.StellTxt;
					orgBirim = oData.OrgehTxt;
					clsGrup = oData.Psgtext;
					clsAltGrp = oData.Psktext;
					skala = oData.Trfgr;
					ucret = oData.Bet01;
					diger = oData.Diger;
					okulTur = oData.SlartTxt;
					okulAd = oData.Insti;
					egitim = oData.Ftext;
					adSoyad = oData.Ename;
					dogumTarih = oData.Gbdat;
					gecerTarih = oData.Begda;
					aracPrim = "";
					dilPrim = "";
					mevPrim = "";
					vekPrim = "";
					sirket = "";
					tc = "";
					fisKonu = "İşe Alım";

					that.getView().byId("adSoyadApprove").setText(adSoyad);
					that.getView().byId("dogumTarihApprove").setText(that.setDateSinavTarihi(dogumTarih));
					that.getView().byId("gecerTarihApprove").setText(that.setDateSinavTarihi(gecerTarih));
					that.getView().byId("posApprove").setValue(pozisyon);
					that.getView().byId("perAlanApprove").setValue(perAlan);
					that.getView().byId("perAltAlanApprove").setValue(perAltAlan);
					that.getView().byId("isAlanApprove").setValue(isAlan);
					that.getView().byId("isAnahApprove").setValue(isAnahtar);
					that.getView().byId("orgBrmApprove").setValue(orgBirim);
					that.getView().byId("clsGrpApprove").setValue(clsGrup);
					that.getView().byId("clsAltGrpApprove").setValue(clsAltGrp);
					that.getView().byId("skalaApprove").setValue(skala);
					that.getView().byId("ucretApprove").setValue(ucret);
					that.getView().byId("digerApprove").setValue(diger);
					that.getView().byId("okulTurApprove").setValue(okulTur);
					that.getView().byId("okulAdApprove").setValue(okulAd);
					that.getView().byId("egitimApprove").setValue(egitim);
					that.getView().byId("sirketApprove").setValue(sirket);
					that.getView().byId("dilPrimApprove").setValue(dilPrim);
					that.getView().byId("aracPrimApprove").setValue(aracPrim);
					that.getView().byId("mevPrimApprove").setValue(mevPrim);
					that.getView().byId("vekPrimApprove").setValue(vekPrim);
					that.getView().byId("tcApprove").setValue(tc);
					that.getView().byId("sicilApprove").setValue(sicil);

				});

			//end of ycoskun

			//Personelinin yabancı dillerini getirme

			oModel.read("/ZHRIseAlimYDSet", null, ["$filter=" + perFilter], false,
				function(oData) {
					for (var c = 0; c < oData.results.length; c++) {
						oData.results[c].SinavTarihi = that.setDateSinavTarihi(oData.results[c].SinavTarihi);

					}
					oLangModel.setData(oData);
					//	console.log(oData);
				});
			that.getView().setModel(oLangModel, "LangModel");
			langtable.setModel(this.getView().getModel("LangModel"));

			//Personelinin zihinsel beceri bilgilerini getirme

			oModel.read("/ZHRIseAlimZBSet", null, ["$filter=" + perAbFilter], false,
				function(oData) {
					for (var r = 0; r < oData.results.length; r++) {
						oData.results[r].SinavTarihi = that.setDateSinavTarihi(oData.results[r].SinavTarihi);

					}
					oAbModel.setData(oData);

				});
			that.getView().setModel(oAbModel, "oAbModel");
			zbtable.setModel(this.getView().getModel("oAbModel"));

			//Personel Attachment Bilgileri begin of ycoskun

			oModel.read("/ZHRAttachDisplaySet", null, ["$filter=" + perAttachFilter], false,
				function(oData) {
					attachModel.setData(oData);
				});
			that.getView().setModel(attachModel, "attachModel");
			//end of ycoskun

		},

		onBack: function() {

			this.getOwnerComponent().getRouter().navTo("screen1");

		},

		_handleMessageBoxOpen: function(sMessage, sMessageBoxType) {

			MessageBox[sMessageBoxType](sMessage, {
				actions: [MessageBox.Action.YES, MessageBox.Action.NO],
				onClose: function(oAction) {
					if (oAction === MessageBox.Action.YES) {
						//that.getOwnerComponent().getRouter().navTo("PersonalActivity");
						//oModel.refresh(true);
						//window.history.go('/sap/bc/ui5_ui5/ui2/ushell/shells/abap/FioriLaunchpad.html?sap-client=100&sap-language=TR&sap-sec_session_created=X#Shell-home');
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
		_handleMessageBox: function(sMessage, sMessageBoxType) {

			var pernrSave = sap.ui.getCore().cPernr;
			var pronrSave = sap.ui.getCore().cPronr;
			var appnrSave = sap.ui.getCore().cAppnr;

			var oEntryWF = {};
			oEntryWF.Pernr = pernrSave;
			oEntryWF.Pronr = pronrSave;
			oEntryWF.Appnr = appnrSave;

			MessageBox[sMessageBoxType](sMessage, {
				actions: [MessageBox.Action.YES, MessageBox.Action.NO],
				onClose: function(oAction) {
					if (oAction === MessageBox.Action.YES) {
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
						//	that.getOwnerComponent().getRouter().navTo("PersonalActivity");
						//	window.location.reload();
						window.open("/sap/bc/ui5_ui5/ui2/ushell/shells/abap/FioriLaunchpad.html", "_self");

					}
				}
			});
		},
		saveInf: function() {
			var oThat = this;
			oThat._handleMessageBox("Formu kaydetmek istediğinize emin misiniz?", "information");

		},
		onBackScreen: function() {
			this.getOwnerComponent().getRouter().navTo("PersonalActivity");
		},
		setDateSinavTarihi: function(value) {
			var gun, yil, ay, tarih;
			yil = value.substring(0, 4);
			ay = value.substring(4, 6);
			gun = value.substring(6, 8);

			tarih = gun + "." + ay + "." + yil;

			return tarih;
		}

	});

}, /* bExport= */ true);