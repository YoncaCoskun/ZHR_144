jQuery.sap.require("sap.ui.model.odata.AnnotationHelper");
sap.ui.define([
	'jquery.sap.global',
	'sap/ui/core/mvc/Controller',
	'sap/ui/model/json/JSONModel',
	"sap/m/MessageToast",
	"sap/m/MessageBox",
	"sap/ui/model/Filter",
	"sap/ui/commons/TextField"
], function(jQuery, Controller, JSONModel, MessageToast, MessageBox, Filter, TextField) {
	"use strict";

	var oModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZHR_144_SRV_01");
	var vPernr;
	var attachFiles = [];
	var osJson = new sap.ui.model.json.JSONModel();
	var osJsonPerAlan = new sap.ui.model.json.JSONModel();
	var osJsonPerAltAlan = new sap.ui.model.json.JSONModel();
	var osJsonClsALtGrb = new sap.ui.model.json.JSONModel();
	var osJsonSkala = new sap.ui.model.json.JSONModel();
	var osJsonIsAlan = new sap.ui.model.json.JSONModel();
	var osJsonOkulTur = new sap.ui.model.json.JSONModel();
	var osJsonOkulAd = new sap.ui.model.json.JSONModel();
	var osJsonEgitim = new sap.ui.model.json.JSONModel();
	var osJsonDil = new sap.ui.model.json.JSONModel();
	var osJsonSinavTur = new sap.ui.model.json.JSONModel();
	var osJsonPos = new sap.ui.model.json.JSONModel();

	var vSlart;
	var vWerks;
	var oLang;
	var oExam;
	var oLanguage;

	var WizardController = Controller.extend("ZHR_144.controller.Screen1", {
		onInit: function() {
			this._wizard = this.getView().byId("CreateProductWizard");
			this._oNavContainer = this.getView().byId("wizardNavContainer");
			this._oWizardContentPage = this.getView().byId("wizardContentPage");
			this._oWizardReviewPage = sap.ui.xmlfragment("ZHR_144.view.Screen1ReviewPage", this);

			this._oNavContainer.addPage(this._oWizardReviewPage);
			this.model = new sap.ui.model.json.JSONModel();

			var oModelMetadata = new JSONModel("ZHR_144/Clothing.json");
			this.getView().setModel(oModelMetadata);

			this.model.setData({
				posAdState: "Error",
				calisanGrbState: "Error",
				perAlanState: "Error",
				calisanAltGrbState: "Error",
				skalaState: "Error",
				isAlanState: "Error",
				okulTurState: "Error",
				okulAdState: "Error",
				egitimState: "Error",
				perAltAlanState: "Error"
					//productWeightState: "Error",
					//perAlanState: "Error",
					/*perAltAlanState: "Error",
				isAlanState: "Error",
			
				calisanAltGrbState: "Error"*/
			});
			this.getView().setModel(this.model);
			this.model.setProperty("/productType", "Mobile");
			this.model.setProperty("/navApiEnabled", true);
			this.model.setProperty("/productVAT", false);
			this._setEmptyValue("/productManufacturer");
			this._setEmptyValue("/productDescription");
			this._setEmptyValue("/productPrice");

			oModel.setSizeLimit(99999);
			oModel.read("/CalisanGrSet", null, null, true,

				function(oData, response) {
					osJson.setData(oData);
				},
				function(oEvent) {

				});
			oModel.read("/PerAlanSet", null, null, true,

				function(oData) {
					osJsonPerAlan.setData(oData);
				},
				function() {

				});
			oModel.read("/CalisanAltGrSet", null, null, true,

				function(oData) {
					osJsonClsALtGrb.setData(oData);
				},
				function() {

				});
			oModel.read("/SkalaKoduSet", null, null, true,

				function(oData) {
					osJsonSkala.setData(oData);
				},
				function() {

				});
			oModel.read("/IsAlaniSet", null, null, true,

				function(oData) {
					osJsonIsAlan.setData(oData);
				},
				function() {

				});
			oModel.read("/OkulTurSet", null, null, true,

				function(oData) {
					osJsonOkulTur.setData(oData);
				},
				function() {

				});
			oModel.read("/EgitimDalSet", null, null, true,

				function(oData) {
					osJsonEgitim.setData(oData);
				},
				function() {

				});
			oModel.read("/YabanciDilSet", null, null, true,

				function(oData) {
					osJsonDil.setData(oData);
				},
				function() {

				});
			oModel.read("/SinavTuruSet", null, null, true,

				function(oData) {
					osJsonSinavTur.setData(oData);
				},
				function() {

				});
			oModel.read("/PozisyonSet", null, null, true,

				function(oData) {
					osJsonPos.setData(oData);
				},
				function() {

				});

			this.getView().setModel(oModel);

		},
		handleValueHelp: function(oEvent) {
			var that = this;
			var handleClose = function(oEvent) {
				var oSelectedItem = oEvent.getParameter("selectedItem");
				if (oSelectedItem) {
					that.getView().byId("cls1").setValue(oSelectedItem.getDescription() + " / " + oSelectedItem.getTitle());
					that.additionalInfoValidation();
				}
			};
			if (!this._valueHelpSelectDialog) {
				this._valueHelpSelectDialog = new sap.m.SelectDialog("valueHelpSelectDialog", {
					title: "Çalışan Grubu",
					items: {
						path: "/results",
						sorter: "Ptext",
						template: new sap.m.StandardListItem({
							title: "{Ptext}",
							description: "{Persg}",
							active: true
						})
					},
					search: function(oEvent) {
						var sValue = oEvent.getParameter("value");
						var oFilter = new sap.ui.model.Filter(
							"Ptext",
							sap.ui.model.FilterOperator.Contains, sValue
						);
						oEvent.getSource().getBinding("items").filter([oFilter]);
					},
					confirm: handleClose
				});

				this._valueHelpSelectDialog.setModel(osJson);

			} else {
				this._valueHelpSelectDialog.setModel(osJson);
			}
			this._valueHelpSelectDialog.open();

		},
		handleValueHelpPoz: function() {
			var onAddMessageDialogPress = this.getDialogMessage();
			this.bIsReseted = false;

			onAddMessageDialogPress.open();
		},
		getDialogMessage: function() {
			this.oMessageDialog = sap.ui.xmlfragment("ZHR_144.view.Screen1Position", this);
			this.getView().addDependent(this.oMessageDialog);

			// 			var oModel = new JSONModel(jQuery.sap.getModulePath("zn11_expense/mockserver", "/Products.json"));
			// 			this.getView().setModel(oModel);

			return this.oMessageDialog;
		},
		onExit: function() {
			if (this.oMessageDialog) {
				this.oMessageDialog.destroy();
			}
		},
		handleValueHelpOkulTur: function() {

			var that = this;
			var handleClose = function(oEvent) {
				var oSelectedItem = oEvent.getParameter("selectedItem");
				if (oSelectedItem) {
					that.getView().byId("okul1").setValue(oSelectedItem.getDescription() + " / " + oSelectedItem.getTitle());
					vSlart = oSelectedItem.getDescription();
					var filterSlart = "IvSlart eq '" + vSlart + "'";
					oModel.read("/OkulAdSet", null, ["$filter=" + filterSlart], true,
						function(oData) {
							osJsonOkulAd.setData(oData);
						});
					that.getView().setModel(oModel);
					that.additionalInfoValidation();
				}
			};
			if (!this._valueHelpSelectDialogOkulTur) {
				this._valueHelpSelectDialogOkulTur = new sap.m.SelectDialog("valueHelpSelectDialogOkulTur", {
					title: "Okul Türü",
					items: {
						path: "/results",
						sorter: "Stext",
						template: new sap.m.StandardListItem({
							title: "{Stext}",
							description: "{Slart}",
							active: true
						})
					},
					search: function(oEvent) {
						var sValue = oEvent.getParameter("value");
						var oFilter = new sap.ui.model.Filter(
							"Stext",
							sap.ui.model.FilterOperator.Contains, sValue
						);
						oEvent.getSource().getBinding("items").filter([oFilter]);
					},
					confirm: handleClose
				});

				this._valueHelpSelectDialogOkulTur.setModel(osJsonOkulTur);

			} else {
				this._valueHelpSelectDialogOkulTur.setModel(osJsonOkulTur);
			}
			this._valueHelpSelectDialogOkulTur.open();

		},
		handleValueHelpOkulAd: function() {

			var that = this;
			var handleClose = function(oEvent) {
				var oSelectedItem = oEvent.getParameter("selectedItem");
				if (oSelectedItem) {
					that.getView().byId("okulAd1").setValue(oSelectedItem.getDescription() + " / " + oSelectedItem.getTitle());
					that.additionalInfoValidation();
				}
			};
			if (!this._valueHelpSelectDialogOkulAd) {
				this._valueHelpSelectDialogOkulAd = new sap.m.SelectDialog("valueHelpSelectDialogOkulAd", {
					title: "Okul Adı",
					items: {
						path: "/results",
						sorter: "Insti",
						template: new sap.m.StandardListItem({
							title: "{Insti}",
							description: "{Schcd}",
							active: true
						})
					},
					search: function(oEvent) {
						var sValue = oEvent.getParameter("value");
						var oFilter = new sap.ui.model.Filter(
							"Insti",
							sap.ui.model.FilterOperator.Contains, sValue
						);
						oEvent.getSource().getBinding("items").filter([oFilter]);
					},
					confirm: handleClose
				});

				this._valueHelpSelectDialogOkulAd.setModel(osJsonOkulAd);

			} else {
				this._valueHelpSelectDialogOkulAd.setModel(osJsonOkulAd);
			}
			this._valueHelpSelectDialogOkulAd.open();

		},
		handleValueHelpEgitim: function() {

			var that = this;
			var handleClose = function(oEvent) {
				var oSelectedItem = oEvent.getParameter("selectedItem");
				if (oSelectedItem) {
					that.getView().byId("egitim1").setValue(oSelectedItem.getDescription() + " / " + oSelectedItem.getTitle());
					that.additionalInfoValidation();
				}
			};
			if (!this._valueHelpSelectDialogEgitim) {
				this._valueHelpSelectDialogEgitim = new sap.m.SelectDialog("valueHelpSelectDialogEgitim", {
					title: "Eğitim Dalı",
					items: {
						path: "/results",
						sorter: "Ftext",
						template: new sap.m.StandardListItem({
							title: "{Ftext}",
							description: "{Faart}",
							active: true
						})
					},
					search: function(oEvent) {
						var sValue = oEvent.getParameter("value");
						var oFilter = new sap.ui.model.Filter(
							"Ftext",
							sap.ui.model.FilterOperator.Contains, sValue
						);
						oEvent.getSource().getBinding("items").filter([oFilter]);
					},
					confirm: handleClose
				});

				this._valueHelpSelectDialogEgitim.setModel(osJsonEgitim);

			} else {
				this._valueHelpSelectDialogEgitim.setModel(osJsonEgitim);
			}
			this._valueHelpSelectDialogEgitim.open();

		},
		handleValueHelpSkala: function() {
			var that = this;
			var handleClose = function(oEvent) {
				var oSelectedItem = oEvent.getParameter("selectedItem");
				if (oSelectedItem) {
					that.getView().byId("skala1").setValue(oSelectedItem.getDescription() + " / " + oSelectedItem.getTitle());
					that.additionalInfoValidation();
				}
			};
			if (!this._valueHelpSelectDialogSkala) {
				this._valueHelpSelectDialogSkala = new sap.m.SelectDialog("valueHelpSelectDialogSkala", {
					title: "Skala Kodu",
					items: {
						path: "/results",
						sorter: "Trfgr",
						template: new sap.m.StandardListItem({
							title: "{Trfgr}",
							description: "{Trfgr}",
							active: true
						})
					},
					search: function(oEvent) {
						var sValue = oEvent.getParameter("value");
						var oFilter = new sap.ui.model.Filter(
							"Trfgr",
							sap.ui.model.FilterOperator.Contains, sValue
						);
						oEvent.getSource().getBinding("items").filter([oFilter]);
					},
					confirm: handleClose
				});

				this._valueHelpSelectDialogSkala.setModel(osJsonSkala);

			} else {
				this._valueHelpSelectDialogSkala.setModel(osJsonSkala);
			}
			this._valueHelpSelectDialogSkala.open();

		},
		handleValueHelpIsAlan: function(oEvent) {
			var that = this;
			var handleClose = function(oEvent) {
				var oSelectedItem = oEvent.getParameter("selectedItem");
				if (oSelectedItem) {
					that.getView().byId("isAlan1").setValue(oSelectedItem.getDescription() + " / " + oSelectedItem.getTitle());
					that.additionalInfoValidation();
				}
			};
			if (!this._valueHelpSelectDialogIsAlan) {
				this._valueHelpSelectDialogIsAlan = new sap.m.SelectDialog("valueHelpSelectDialogIsAlan", {
					title: "İş Alanı",
					items: {
						path: "/results",
						sorter: "Gtext",
						template: new sap.m.StandardListItem({
							title: "{Gtext}",
							description: "{Gsber}",
							active: true
						})
					},
					search: function(oEvent) {
						var sValue = oEvent.getParameter("value");
						var oFilter = new sap.ui.model.Filter(
							"Gtext",
							sap.ui.model.FilterOperator.Contains, sValue
						);
						oEvent.getSource().getBinding("items").filter([oFilter]);
					},
					confirm: handleClose
				});

				this._valueHelpSelectDialogIsAlan.setModel(osJsonIsAlan);

			} else {
				this._valueHelpSelectDialogIsAlan.setModel(osJsonIsAlan);
			}
			this._valueHelpSelectDialogIsAlan.open();

		},
		handleValueHelpPerA: function(oEvent) {
			var that = this;
			var handleClose = function(oEvent) {
				var oSelectedItem = oEvent.getParameter("selectedItem");
				if (oSelectedItem) {
					that.getView().byId("perAlan1").setValue(oSelectedItem.getDescription() + " / " + oSelectedItem.getTitle());
					vWerks = oSelectedItem.getDescription();
					var filterWerks = "IvWerks eq '" + vWerks + "'";
					oModel.read("/PerAltAlanSet", null, ["$filter=" + filterWerks], true,
						function(oData) {
							osJsonPerAltAlan.setData(oData);
						});
					that.getView().setModel(oModel);
					that.additionalInfoValidation();
				}
			};
			if (!this._valueHelpSelectDialogPerAlan) {
				this._valueHelpSelectDialogPerAlan = new sap.m.SelectDialog("valueHelpSelectDialogPerAlan", {
					title: "Personel Alanı",
					items: {
						path: "/results",
						sorter: "Name1",
						template: new sap.m.StandardListItem({
							title: "{Name1}",
							description: "{Persa}",
							active: true
						})
					},
					search: function(oEvent) {
						var sValue = oEvent.getParameter("value");
						var oFilter = new sap.ui.model.Filter(
							"Name1",
							sap.ui.model.FilterOperator.Contains, sValue
						);
						oEvent.getSource().getBinding("items").filter([oFilter]);
					},
					confirm: handleClose
				});

				this._valueHelpSelectDialogPerAlan.setModel(osJsonPerAlan);

			} else {
				this._valueHelpSelectDialogPerAlan.setModel(osJsonPerAlan);
			}
			this._valueHelpSelectDialogPerAlan.open();

		},
		handleValueHelpPerAltA: function() {

			var that = this;
			var handleClose = function(oEvent) {
				var oSelectedItem = oEvent.getParameter("selectedItem");
				if (oSelectedItem) {
					that.getView().byId("perAltAlan1").setValue(oSelectedItem.getDescription() + " / " + oSelectedItem.getTitle());
					that.additionalInfoValidation();
				}
			};
			if (!this._valueHelpSelectDialogPerAltAlan) {
				this._valueHelpSelectDialogPerAltAlan = new sap.m.SelectDialog("valueHelpSelectDialogPerAltAlan", {
					title: "Personel ALt Alanı",
					items: {
						path: "/results",
						sorter: "Btext",
						template: new sap.m.StandardListItem({
							title: "{Btext}",
							description: "{Btrtl}",
							active: true
						})
					},
					search: function(oEvent) {
						var sValue = oEvent.getParameter("value");
						var oFilter = new sap.ui.model.Filter(
							"Btext",
							sap.ui.model.FilterOperator.Contains, sValue
						);
						oEvent.getSource().getBinding("items").filter([oFilter]);
					},
					confirm: handleClose
				});

				this._valueHelpSelectDialogPerAltAlan.setModel(osJsonPerAltAlan);

			} else {
				this._valueHelpSelectDialogPerAltAlan.setModel(osJsonPerAltAlan);
			}
			this._valueHelpSelectDialogPerAltAlan.open();

		},
		handleValueHelpClsAlt: function() {

			var that = this;
			var handleClose = function(oEvent) {
				var oSelectedItem = oEvent.getParameter("selectedItem");
				if (oSelectedItem) {
					that.getView().byId("clsAlt1").setValue(oSelectedItem.getDescription() + " / " + oSelectedItem.getTitle());
					that.additionalInfoValidation();
				}
			};
			if (!this._valueHelpSelectDialogClsAltGrb) {
				this._valueHelpSelectDialogClsAltGrb = new sap.m.SelectDialog("valueHelpSelectDialogClsAltGrb", {
					title: "Çalışan ALt Grubu",
					items: {
						path: "/results",
						sorter: "Ptext",
						template: new sap.m.StandardListItem({
							title: "{Ptext}",
							description: "{Persk}",
							active: true
						})
					},
					search: function(oEvent) {
						var sValue = oEvent.getParameter("value");
						var oFilter = new sap.ui.model.Filter(
							"Ptext",
							sap.ui.model.FilterOperator.Contains, sValue
						);
						oEvent.getSource().getBinding("items").filter([oFilter]);
					},
					confirm: handleClose
				});

				this._valueHelpSelectDialogClsAltGrb.setModel(osJsonClsALtGrb);

			} else {
				this._valueHelpSelectDialogClsAltGrb.setModel(osJsonClsALtGrb);
			}
			this._valueHelpSelectDialogClsAltGrb.open();

		},
		handlePressMenu: function() {

			var oSplitApp = this.getView().byId("SplitAppDemo");
			oSplitApp.setMode(sap.m.SplitAppMode.ShowHideMode);
		},
		setProductType: function(evt) {
			var productType = evt.getSource().getTitle();
			this.model.setProperty("/productType", productType);
			this.getView().byId("ProductStepChosenType").setText("Chosen product type: " + productType);
			this._wizard.validateStep(this.getView().byId("ProductTypeStep"));
		},
		setProductTypeFromSegmented: function(evt) {
			var productType = evt.mParameters.button.getText();
			this.model.setProperty("/productType", productType);
			this._wizard.validateStep(this.getView().byId("ProductTypeStep"));
		},
		additionalInfoValidation: function() {
			var cls1 = this.getView().byId("cls1").getValue();
			var perAlan1 = this.getView().byId("perAlan1").getValue();
			var clsAlt1 = this.getView().byId("clsAlt1").getValue();
			var skala = this.getView().byId("skala1").getValue();
			var isAlan1 = this.getView().byId("isAlan1").getValue();


			if (cls1.length < 1 || perAlan1.length < 4 || clsAlt1.length < 2 || skala.length < 8 || isAlan1.length < 4) {
				this._wizard.invalidateStep(this.getView().byId("YeniStep1"));
			} else {
				this._wizard.validateStep(this.getView().byId("YeniStep1"));

			}


		},
		optionalStepActivation: function() {

		},
		optionalStepCompletion: function() {

		},
		listLanguage: function() {

		},
		stepLanguage: function() {
			//begin of ycoskun  Personel Verilerini erp tabloya atma 

			var that = this;

			var oEntryPersonel = {};
			var entryadSoyad1 = "adSoyad1";
			var entrydogumTarih1 = "dogumTarih1";
			var entrygecerTarih1 = "gecerTarih1";
			var entryPosAd1 = "PosAd1";
			var entryisAlan1 = "isAlan1";
			var entryisAnahtar1 = "isAnah1";
			var entryorgBirim1 = "orgBir1";
			var entryclsGrup1 = "cls1";
			var entryclsAltGrup1 = "clsAlt1";
			var entryskalaKod1 = "skala1";
			var entryucret1 = "ucret1";
			var entrydiger1 = "diger1";
			var entryokul1 = "okul1";
			var entryokulAd1 = "okulAd1";
			var entryegitim1 = "egitim1";
			var entryperAlan1 = "perAlan1";
			var entryperAltAlan1 = "perAltAlan1";

			var splitArrayDogumT, array, dogumTarih;
			var splitArrayGecerT, arrayGecer, gecerTarih;
			var count;
			var countGecer;
			try {
				splitArrayDogumT = that.getView().byId(entrydogumTarih1).getValue();
				array = splitArrayDogumT.split(".");
				count = array[0].length;
				if (count === 1) {
					array[0] = "0" + array[0];
				}
				dogumTarih = array[2] + array[1] + array[0];

				splitArrayGecerT = that.getView().byId(entrygecerTarih1).getValue();
				arrayGecer = splitArrayGecerT.split(".");
				countGecer = arrayGecer[0].length;
				if (countGecer === 1) {
					arrayGecer[0] = "0" + arrayGecer[0];
				}
				gecerTarih = arrayGecer[2] + arrayGecer[1] + arrayGecer[0];
			} catch (err) {
				splitArrayDogumT = that.getView().byId(entrydogumTarih1).getValue();
				array = splitArrayDogumT.split("/");
				count = array[0].length;
				if (count === 1) {
					array[0] = "0" + array[0];
				}
				dogumTarih = array[2] + array[1] + array[0];

				splitArrayGecerT = that.getView().byId(entrygecerTarih1).getValue();
				arrayGecer = splitArrayGecerT.split("/");
				countGecer = arrayGecer[0].length;
				if (countGecer === 1) {
					arrayGecer[0] = "0" + arrayGecer[0];
				}
				gecerTarih = arrayGecer[2] + arrayGecer[1] + arrayGecer[0];
			}
			oEntryPersonel.Ename = that.getView().byId(entryadSoyad1).getValue();
			oEntryPersonel.Gbdat = dogumTarih;
			oEntryPersonel.Begda = gecerTarih;
			oEntryPersonel.Plans = that.getView().byId(entryPosAd1).getValue();
			oEntryPersonel.Stell = that.getView().byId(entryisAnahtar1).getValue();
			oEntryPersonel.Orgeh = that.getView().byId(entryorgBirim1).getValue();
			oEntryPersonel.Bet01 = that.getView().byId(entryucret1).getValue();
			oEntryPersonel.Diger = that.getView().byId(entrydiger1).getValue();

			//split edip kodu backende yollama begin of ycoskun
			var werks = that.getView().byId(entryperAlan1).getValue();
			var arrayWerks = werks.split(" / ");
			oEntryPersonel.Werks = arrayWerks[0];

			var btrtl = that.getView().byId(entryperAltAlan1).getValue();
			var arrayBtrtl = btrtl.split(" / ");
			oEntryPersonel.Btrtl = arrayBtrtl[0];

			var gsber = that.getView().byId(entryisAlan1).getValue();
			var arrayGsber = gsber.split(" / ");
			oEntryPersonel.Gsber = arrayGsber[0];

			var persg = that.getView().byId(entryclsGrup1).getValue();
			var arrayPersg = persg.split(" / ");
			oEntryPersonel.Persg = arrayPersg[0];

			var persk = that.getView().byId(entryclsAltGrup1).getValue();
			var arrayPersk = persk.split(" / ");
			oEntryPersonel.Persk = arrayPersk[0];

			var trfgr = that.getView().byId(entryskalaKod1).getValue();
			var arrayTrfgr = trfgr.split(" / ");
			oEntryPersonel.Trfgr = arrayTrfgr[0];

			var insti = that.getView().byId(entryokulAd1).getValue();
			var arrayInsti = insti.split(" / ");
			oEntryPersonel.Insti = arrayInsti[0];

			var slart = that.getView().byId(entryokul1).getValue();
			var arraySlart = slart.split(" / ");
			oEntryPersonel.Slart = arraySlart[0];

			var fach1 = that.getView().byId(entryegitim1).getValue();
			var arrayFach1 = fach1.split(" / ");
			oEntryPersonel.Fach1 = arrayFach1[0];
			
			var plans = that.getView().byId(entryPosAd1).getValue();
			oEntryPersonel.Plans = (plans.split("/"))[0];
			//end of ycoskun

			oEntryPersonel.Tarih = "";
			oEntryPersonel.Onayci = "";
			oEntryPersonel.Statu = "";
			oEntryPersonel.Appnr = "01";
			oEntryPersonel.Pronr = "01";
			oEntryPersonel.Pernr = vPernr;

			// onaycılar ekranına genel bilgilerin getirilmesi için bilgilerin global olarak doldurulması begin of ycoskun
			sap.ui.getCore().cAdSoyad = that.getView().byId(entryadSoyad1).getValue();
			sap.ui.getCore().cDogumTarih = that.getView().byId(entrydogumTarih1).getValue();
			sap.ui.getCore().cGecerTarih = that.getView().byId(entrygecerTarih1).getValue();
			sap.ui.getCore().cPozisyon = that.getView().byId(entryPosAd1).getValue();
			sap.ui.getCore().cPerAlan = arrayWerks[0];
			sap.ui.getCore().cPerAltAlan = arrayBtrtl[0];
			sap.ui.getCore().cIsAlan = arrayGsber[0];
			sap.ui.getCore().cIsAnahtari = that.getView().byId(entryisAnahtar1).getValue();
			sap.ui.getCore().cOrgBirim = that.getView().byId(entryorgBirim1).getValue();
			sap.ui.getCore().cClsGrup = arrayPersg[0];
			sap.ui.getCore().cClsAltGrp = arrayPersk[0];
			sap.ui.getCore().cSkala = arrayTrfgr[0];
			sap.ui.getCore().cUcret = that.getView().byId(entryucret1).getValue();
			sap.ui.getCore().cDiger = that.getView().byId(entrydiger1).getValue();
			sap.ui.getCore().cOkulTur = arraySlart[0];
			sap.ui.getCore().cOkulAd = arrayInsti[0];
			sap.ui.getCore().cEgitim = arrayFach1[0];
			//end of ycoskun

			oModel.create("/ZHRPersonelBilgiSet", oEntryPersonel, {
				method: "POST",
				success: function(oData, oThat) {
					console.log("SUCCESS");
					vPernr = oData.Pernr;
				},
				error: function(oData) {
					console.log("ERROR");
					console.log(oData);
				}
			});
			oModel.refresh(true);
			//end of ycoskun
			console.log(vPernr);

			//begin of ycoskun yabancı dilleri getir
			var oLangModel = new sap.ui.model.json.JSONModel();
			var perFilter = "Pernr eq '" + vPernr + "'";
			var oThat = this;

			oModel.read("/ZHRIseAlimYDSet", null, ["$filter=" + perFilter], true,
				function(oData) {
					oLangModel.setData(oData);
				});
			oThat.getView().setModel(oLangModel, "LangModel");
			var langtable = oThat.getView().byId("idLanguageTable");
			langtable.setModel(this.getView().getModel("LangModel"));
			//end of ycoskun

			this._wizard.validateStep(this.getView().byId("idAbility"));

		},
		stepAbility: function() {
			//begin of ycoskun yabancı dilleri getir
			var pernr = vPernr;
			var oAbModel = new sap.ui.model.json.JSONModel();
			var perAbFilter = "Pernr eq '" + pernr + "'";
			var oThat = this;

			oModel.read("/ZHRIseAlimZBSet", null, ["$filter=" + perAbFilter], true,
				function(oData) {
					oAbModel.setData(oData);

				});
			oThat.getView().setModel(oAbModel, "oAbModel");
			var langtable = oThat.getView().byId("idAbilityTable");
			langtable.setModel(this.getView().getModel("oAbModel"));
			//end of ycoskun

			this._wizard.validateStep(this.getView().byId("PricingStep"));
		},
		pricingActivate: function() {
			this.model.setProperty("/navApiEnabled", true);
		},
		pricingComplete: function() {
			this.model.setProperty("/navApiEnabled", false);
		},
		scrollFrom4to2: function() {
			this._wizard.goToStep(this.getView().byId("YeniStep1"));
		},
		goFrom4to3: function() {
			if (this._wizard.getProgressStep() === this.getView().byId("PricingStep")) {
				this._wizard.previousStep();
			}
		},
		goFrom4to5: function() {
			if (this._wizard.getProgressStep() === this.getView().byId("PricingStep")) {
				this._wizard.nextStep();
			}
		},
		getElement: function(id) {
			return sap.ui.getCore().byId(id);
		},
		backToWizardContent: function() {
			this._oNavContainer.backToPage(this._oWizardContentPage.getId());
		},
		editStepOne: function() {
			this._handleNavigationToStep(0);
		},
		editStepTwo: function() {
			this._handleNavigationToStep(1);
		},
		editStepThree: function() {
			this._handleNavigationToStep(2);
		},
		editStepFour: function() {
			this._handleNavigationToStep(3);
		},
		_handleNavigationToStep: function(iStepNumber) {
			var that = this;

			function fnAfterNavigate() {
				that._wizard.goToStep(that._wizard.getSteps()[iStepNumber]);
				that._oNavContainer.detachAfterNavigate(fnAfterNavigate);
			}

			this._oNavContainer.attachAfterNavigate(fnAfterNavigate);
			this.backToWizardContent();
		},
		_handleMessageBoxOpen: function(sMessage, sMessageBoxType) {
			var that = this;
			MessageBox[sMessageBoxType](sMessage, {
				actions: [MessageBox.Action.YES, MessageBox.Action.NO],
				onClose: function(oAction) {
					if (oAction === MessageBox.Action.YES) {
						that._handleNavigationToStep(0);
						that._wizard.discardProgress(that._wizard.getSteps()[0]);
					}
				}
			});
		},
		backOnayPage: function() {
			attachFiles = [];
			var that = this;
			that._handleNavigationToStep(0);
			that._wizard.discardProgress(that._wizard.getSteps()[0]);
		},
		_setEmptyValue: function(sPath) {
			this.model.setProperty(sPath, "n/a");
		},
		handleWizardCancel: function() {
			this._handleMessageBoxOpen("Are you sure you want to cancel your report?", "warning");
		},
		handleWizardSubmit: function() {
			this._handleMessageBoxOpen("Are you sure you want to submit your report?", "confirm");
		},
		productWeighStateFormatter: function(val) {
			return isNaN(val) ? "Error" : "None";
		},
		discardProgress: function() {
			this._wizard.discardProgress(this.getView().byId("ProductTypeStep"));

			var clearContent = function(content) {
				for (var i = 0; i < content.length; i++) {
					if (content[i].setValue) {
						content[i].setValue("");
					}

					if (content[i].getContent) {
						clearContent(content[i].getContent());
					}
				}
			};
			this.model.setProperty("/calisanGrbState", "Error");
			this.model.setProperty("/perAlanState", "Error");
			this.model.setProperty("/calisanAltGrbState", "Error");
			this.model.setProperty("/skalaState", "Error");
			this.model.setProperty("/isAlanState", "Error");
			this.model.setProperty("/adSoyadState", "Error");
			clearContent(this._wizard.getSteps());
		},
		onAddLanguage: function() {
			var pernr = vPernr;

			var oDialog;
			var itemTemplate;
			var selectLang;

			itemTemplate = new sap.ui.core.ListItem({
				key: "{Sprsl}",
				text: "{Sptxt}",
				additionalText: "{Sprsl}"
			});

			oLang = new sap.m.ComboBox("box_default", {
				items: {
					path: "/results",
					template: itemTemplate
				},
				selectionChange: function(oEvent) {
					selectLang = oEvent.oSource.getSelectedKey();
					sap.ui.getCore().byId("oLanguage").setValue(selectLang);

				}
			});
			sap.ui.getCore().byId("box_default").setModel(osJsonDil);

			oLanguage = new sap.ui.commons.TextField("oLanguage", {
				value: selectLang,
				enabled: false
			});
			var oTarih = new sap.ui.commons.DatePicker({
				value: "",
				enabled: true
			});
			var oYazma = new sap.ui.commons.TextField({
				value: "",
				enabled: true
			});
			var oOkuma = new sap.ui.commons.TextField({
				value: "",
				enabled: true

			});
			var oDinleme = new sap.ui.commons.TextField({
				value: "",
				enabled: true

			});
			var oKonusma = new sap.ui.commons.TextField({
				value: "",
				enabled: true

			});
			var oGenel = new sap.ui.commons.TextField({
				value: "",
				enabled: true

			});
			var oPuan = new sap.ui.commons.TextField({
				value: "",
				enabled: true

			});
			var oForm = new sap.ui.layout.form.SimpleForm({
				editable: true,
				content: [
					new sap.ui.commons.Label({
						text: "Dil Türü"
					}), oLanguage,
					new sap.ui.commons.Label({
						text: "Yabancı Dil"
					}), oLang,
					new sap.ui.commons.Label({
						text: "Puan"
					}), oPuan,
					new sap.ui.commons.Label({
						text: "Sınav Tarihi"
					}), oTarih,
					new sap.ui.commons.Label({
						text: "Yazma"
					}), oYazma,
					new sap.ui.commons.Label({
						text: "Okuma"
					}), oOkuma,
					new sap.ui.commons.Label({
						text: "Dinleme"
					}), oDinleme,
					new sap.ui.commons.Label({
						text: "Konuşma"
					}), oKonusma,
					new sap.ui.commons.Label({
						text: "Genel"
					}), oGenel
				]
			});

			var oView = this.getView();
			oDialog = new sap.m.Dialog({
				title: "Yabancı Dil Bilgisi",
				rightButton: new sap.m.Button({
					text: "Ekle",
					type: sap.m.ButtonType.Emphasized,
					icon: "sap-icon://add",
					press: function() {
						/* buraya yabancı dil ekleyebilmek için servis eklenecek*/
						var oEntry = {};
						var yil, gun, ay;
						var format = oTarih.getYyyymmdd();

						yil = format.substring(0, 4);
						ay = format.substring(4, 6);
						gun = format.substring(6, 8);

						var tarih = yil + ay + gun;

						oEntry.Sptxt = sap.ui.getCore().byId("box_default").getValue();
						oEntry.Puan = oPuan.getValue();
						oEntry.SinavTarihi = tarih;
						oEntry.Yazma = oYazma.getValue();
						oEntry.Okuma = oOkuma.getValue();
						oEntry.Dinleme = oDinleme.getValue();
						oEntry.Konusma = oKonusma.getValue();
						oEntry.Genel = oGenel.getValue();
						oEntry.Pernr = pernr;
						oEntry.Spras = oLanguage.getValue();

						// begin of ycoskun yabancı dilleri kaydet
						oModel.create("/ZHRIseAlimYDSet", oEntry, {
							method: "POST",
							success: function() {
								console.log("SUCCESS");

							},
							error: function() {
								console.log("ERROR");
							}
						});
						// end of ycoskun
						oModel.refresh(true);

						//begin of ycoskun yabancı dilleri listele 
						var oLangModel = new sap.ui.model.json.JSONModel();
						var perFilter = "Pernr eq '" + pernr + "'";

						oModel.read("/ZHRIseAlimYDSet", null, ["$filter=" + perFilter], true,
							function(oData) {
								oLangModel.setData(oData);
							});
						oView.setModel(oLangModel, "LangModel");
						var langtable = oView.byId("idLanguageTable");
						langtable.setModel(oView.getModel("LangModel"));
						//end of ycoskun
						this.oParent.close();
						oDialog.destroy();

					}
				}),
				leftButton: new sap.m.Button({
					text: "Kapat",
					type: sap.m.ButtonType.Emphasized,
					icon: "sap-icon://decline",
					press: function() {
						//begin of ycoskun yabancı dilleri listele 
						var oLangModel = new sap.ui.model.json.JSONModel();
						var perFilter = "Pernr eq '" + pernr + "'";

						oModel.read("/ZHRIseAlimYDSet", null, ["$filter=" + perFilter], true,
							function(oData) {
								oLangModel.setData(oData);
							});
						oView.setModel(oLangModel, "LangModel");
						var langtable = oView.byId("idLanguageTable");
						langtable.setModel(oView.getModel("LangModel"));
						//end of ycoskun
						this.oParent.close();
						oDialog.destroy();

					}
				}),
				content: [oForm]
			});
			oDialog.open();

		},
		onAddAbility: function() {
			var pernr = vPernr;
			var oDialogAbility;
			var itemTemplate;
			var selectAbility;

			itemTemplate = new sap.ui.core.ListItem({
				key: "{Extyp}",
				text: "{Extxt}",
				additionalText: "{Extyp}"
			});

			oExam = new sap.m.ComboBox("idAbility", {
				items: {
					path: "/results",
					template: itemTemplate
				},
				selectionChange: function(oEvent) {
					selectAbility = oEvent.oSource.getSelectedKey();

				}
			});
			sap.ui.getCore().byId("idAbility").setModel(osJsonSinavTur);

			var oPuanExam = new sap.ui.commons.TextField({
				value: "",
				enabled: true
			});
			var oTarih = new sap.ui.commons.DatePicker({
				value: "",
				enabled: true
			});
			var oFormAbility = new sap.ui.layout.form.SimpleForm({
				editable: true,
				content: [
					new sap.ui.commons.Label({
						text: "Sınav Türü"
					}), oExam,
					new sap.ui.commons.Label({
						text: "Puan"
					}), oPuanExam,
					new sap.ui.commons.Label({
						text: "Sınav Tarihi"
					}), oTarih
				]
			});
			var oView = this.getView();
			oDialogAbility = new sap.m.Dialog({
				title: "Zihinsel Beceri",
				rightButton: new sap.m.Button({
					text: "Ekle",
					type: sap.m.ButtonType.Emphasized,
					icon: "sap-icon://add",
					press: function() {
						/* buraya beceri ekleyebilmek için servis eklenecek*/
						var oEntryBeceri = {};
						var yil, gun, ay;
						var format = oTarih.getYyyymmdd();

						yil = format.substring(0, 4);
						ay = format.substring(4, 6);
						gun = format.substring(6, 8);

						var tarih = yil + ay + gun;

						oEntryBeceri.SinavTuru = selectAbility;
						oEntryBeceri.SinavTarihi = tarih;
						oEntryBeceri.Puan = oPuanExam.getValue();
						oEntryBeceri.Pernr = pernr;

						// begin of ycoskun zihinsel beceri kaydet
						oModel.create("/ZHRIseAlimZBSet", oEntryBeceri, {
							method: "POST",
							success: function() {
								console.log("SUCCESS");

							},
							error: function() {
								console.log("ERROR");
							}
						});
						// end of ycoskun
						oModel.refresh(true);

						//begin of ycoskun yabancı dilleri listele 
						var oAbilityModel = new sap.ui.model.json.JSONModel();
						var perAbFilter = "Pernr eq '" + pernr + "'";

						oModel.read("/ZHRIseAlimZBSet", null, ["$filter=" + perAbFilter], true,
							function(oData, response) {
								oAbilityModel.setData(oData);

							});
						oView.setModel(oAbilityModel, "oAbilityModel");
						var abtable = oView.byId("idAbilityTable");
						abtable.setModel(oView.getModel("oAbilityModel"));
						//end of ycoskun

						this.oParent.close();
						oDialogAbility.destroy();

					}
				}),
				leftButton: new sap.m.Button({
					text: "Kapat",
					type: sap.m.ButtonType.Emphasized,
					icon: "sap-icon://decline",
					press: function() {
						this.oParent.close();
						oDialogAbility.destroy();
					}
				}),
				content: [oFormAbility]
			});
			oDialogAbility.open();
		},
		nextOnayPage: function() {
			this.getOwnerComponent().getRouter().navTo("screen1Approve");
		},
		onBackScreen: function() {
			this.getOwnerComponent().getRouter().navTo("PersonalActivity");
			window.location.reload();
		},
		uploadFile: function() {
			// begin of ycoskun dosyaların sisteme upload edilmesi
			var oFileUploader = sap.ui.getCore().byId("fileupload");
			var file = jQuery.sap.domById(oFileUploader.getId() + "-fu").files[0];
			var form = this.getView().byId("simpleFormAttaches");

			try {
				if (file) {
					this._bUploading = true;
					var that = this;
					var a = "/sap/opu/odata/sap/ZHR_144_SRV_01/";
					var f = {
						headers: {
							"X-Requested-With": "XMLHttpRequest",
							"Content-Type": "application/atom + xml",
							DataServiceVersion: "2.0",
							"x-csrf-token": "Fetch"
						},
						requestUri: a,
						method: "GET"
					};
					var oHeaders;
					var sUrl = "/sap/opu/odata/sap/ZHR_144_SRV_01/";
					var omModel = new sap.ui.model.odata.ODataModel(sUrl, true);
					var pernr = vPernr;
					this.getView().setModel(omModel);
					OData.request(f, function(data, oSuccess) {
						var oToken = oSuccess.headers['x-csrf-token'];
						oHeaders = {
							"x-csrf-token": oToken,
							"slug": "QF"
						};

						var oURL = "/sap/opu/odata/sap/ZHR_144_SRV_01" + "/ZHRIseAlimFileSet('" + file.name + "," + pernr + "')/$value";
						jQuery.ajax({
							type: 'PUT',
							url: oURL,
							headers: oHeaders,
							cache: false,
							contentType: file.type,
							processData: false,
							data: file,
							success: function() {
								sap.m.MessageToast.show("Dosya Başarıyla yüklendi");
								oFileUploader.setValue("");

								attachFiles.push(file);

								//attach butonları yaratma
								var oButton = new sap.ui.commons.Button({
									text: file.name,
									icon: "sap-icon://attachment",
									lite: true,
									width: "40%",
									press: function(oEvent) {
										var ogetURL = "/sap/opu/odata/sap/ZHR_144_SRV_01" + "/ZHRIseAlimFileSet('" + file.name + "," + pernr + "')/$value";

										sap.m.URLHelper.redirect(ogetURL, true);

									}
								});
								form.addContent(oButton);
								that.oAttachAddDialog.close();

							},
							error: function() {
								sap.m.MessageToast.show("File Upload Error!");
							}
						});
					});
				}
			} catch (oException) {
				jQuery.sap.log.error("File upload failed: \n" + oException.message);
			}
			//end of ycoskun
		},
		onAttachAdd: function() {
			var oAttachAddDialog = this.getDialogAttach();
			oAttachAddDialog.open();

		},
		getDialogAttach: function() {
			if (!this.oAttachAddDialog) {
				this.oAttachAddDialog = sap.ui.xmlfragment("ZHR_144.view.Attach", this);
				this.getView().addDependent(this.oAttachAddDialog);
			}

			return this.oAttachAddDialog;
		},
		onCloseAttachDialog: function(oEvent) {
			if (!this.oAttachAddDialog) {
				this.oAttachAddDialog = sap.ui.xmlfragment("ZHR_144.view.Attach", this.getView().getController());

			}
			var oFileUploader = sap.ui.getCore().byId("fileupload");
			oFileUploader.setValue("");
			this.oAttachAddDialog.close();

		},
		wizardCompletedHandler: function() {

			var that = this;
			var oEntry = [];

			var entryfisKonu1 = "fisKonu1";
			var entryadSoyad1 = "adSoyad1";
			var entrydogumTarih1 = "dogumTarih1";
			var entrygecerTarih1 = "gecerTarih1";
			var entryPosAd1 = "PosAd1";
			var entryisAlan1 = "isAlan1";
			var entryisAnahtar1 = "isAnah1";
			var entryorgBirim1 = "orgBir1";
			var entryclsGrup1 = "cls1";
			var entryclsAltGrup1 = "clsAlt1";
			var entryskalaKod1 = "skala1";
			var entryucret1 = "ucret1";
			var entrydiger1 = "diger1";
			var entryokul1 = "okul1";
			var entryokulAd1 = "okulAd1";
			var entryegitim1 = "egitim1";

			var entryperAlan1 = "perAlan1";
			var entryperAltAlan1 = "perAltAlan1";

			var pernr = vPernr;
			var arrayFile = attachFiles;

			oEntry[entryfisKonu1] = that.getView().byId(entryfisKonu1).getValue();
			oEntry[entryadSoyad1] = that.getView().byId(entryadSoyad1).getValue();
			oEntry[entrydogumTarih1] = that.getView().byId(entrydogumTarih1).getValue();
			oEntry[entrygecerTarih1] = that.getView().byId(entrygecerTarih1).getValue();
			oEntry[entryPosAd1] = that.getView().byId(entryPosAd1).getValue();
			oEntry[entryisAlan1] = that.getView().byId(entryisAlan1).getValue();
			oEntry[entryisAnahtar1] = that.getView().byId(entryisAnahtar1).getValue();
			oEntry[entryorgBirim1] = that.getView().byId(entryorgBirim1).getValue();
			oEntry[entryclsGrup1] = that.getView().byId(entryclsGrup1).getValue();
			oEntry[entryclsAltGrup1] = that.getView().byId(entryclsAltGrup1).getValue();
			oEntry[entryskalaKod1] = that.getView().byId(entryskalaKod1).getValue();
			oEntry[entryucret1] = that.getView().byId(entryucret1).getValue();
			oEntry[entrydiger1] = that.getView().byId(entrydiger1).getValue();
			oEntry[entryokul1] = that.getView().byId(entryokul1).getValue();
			oEntry[entryokulAd1] = that.getView().byId(entryokulAd1).getValue();
			oEntry[entryegitim1] = that.getView().byId(entryegitim1).getValue();
			oEntry[entryperAlan1] = that.getView().byId(entryperAlan1).getValue();
			oEntry[entryperAltAlan1] = that.getView().byId(entryperAltAlan1).getValue();

			//console.log(oEntry);

			that.getElement("fisKonuRew1").setValue(oEntry.fisKonu1);
			that.getElement("adSoyadRew1").setValue(oEntry.adSoyad1);
			that.getElement("dogumTarihRew1").setValue(oEntry.dogumTarih1);
			that.getElement("gecerTarihRew1").setValue(oEntry.gecerTarih1);
			that.getElement("PosAdRew1").setValue(oEntry.PosAd1);
			that.getElement("isAlanRew1").setValue(oEntry.isAlan1);
			that.getElement("isAnahRew1").setValue(oEntry.isAnah1);
			that.getElement("orgBirRew1").setValue(oEntry.orgBir1);
			that.getElement("clsRew1").setValue(oEntry.cls1);
			that.getElement("clsAltRew1").setValue(oEntry.clsAlt1);
			that.getElement("skalaRew1").setValue(oEntry.skala1);
			that.getElement("ucretRew1").setValue(oEntry.ucret1);
			that.getElement("digerRew1").setValue(oEntry.diger1);
			that.getElement("okulRew1").setValue(oEntry.okul1);
			that.getElement("okulAdRew1").setValue(oEntry.okulAd1);
			that.getElement("egitimRew1").setValue(oEntry.egitim1);
			that.getElement("perAlanRew1").setValue(oEntry.perAlan1);
			that.getElement("perAltAlanRew1").setValue(oEntry.perAltAlan1);

			//begin of ycoskun yabancı dilleri listele 
			var oThat = this;
			var oLangModel = new sap.ui.model.json.JSONModel();
			var perFilter = "Pernr eq '" + pernr + "'";

			oModel.read("/ZHRIseAlimYDSet", null, ["$filter=" + perFilter], true,
				function(oData) {
					oLangModel.setData(oData);
				});
			oThat.getView().setModel(oLangModel, "LangModel");
			var langtable = sap.ui.getCore().byId("idDil");
			langtable.setModel(this.getView().getModel("LangModel"));
			//end of ycoskun

			//begin of ycoskun zihinsel beceri review gösterme 
			var oAbModel = new sap.ui.model.json.JSONModel();
			var perAbFilter = "Pernr eq '" + pernr + "'";

			oModel.read("/ZHRIseAlimZBSet", null, ["$filter=" + perAbFilter], true,
				function(oData) {
					oAbModel.setData(oData);
				});
			oThat.getView().setModel(oAbModel, "oAbModel");
			var zihintable = sap.ui.getCore().byId("idZihinsel");
			zihintable.setModel(this.getView().getModel("oAbModel"));
			//end of ycoskun

			//begin of ycoskun Son kontrol Personel Verilerini atma

			var splitArrayDogumT, array, dogumTarih;
			var splitArrayGecerT, arrayGecer, gecerTarih;
			var count;
			var countGecer;
			try {
				splitArrayDogumT = that.getView().byId(entrydogumTarih1).getValue();
				array = splitArrayDogumT.split(".");
				count = array[0].length;
				if (count === 1) {
					array[0] = "0" + array[0];
				}
				dogumTarih = array[2] + array[1] + array[0];

				splitArrayGecerT = that.getView().byId(entrygecerTarih1).getValue();
				arrayGecer = splitArrayGecerT.split(".");
				countGecer = arrayGecer[0].length;
				if (countGecer === 1) {
					arrayGecer[0] = "0" + arrayGecer[0];
				}
				gecerTarih = arrayGecer[2] + arrayGecer[1] + arrayGecer[0];
			} catch (err) {
				splitArrayDogumT = that.getView().byId(entrydogumTarih1).getValue();
				array = splitArrayDogumT.split("/");
				count = array[0].length;
				if (count === 1) {
					array[0] = "0" + array[0];
				}
				dogumTarih = array[2] + array[1] + array[0];

				splitArrayGecerT = that.getView().byId(entrygecerTarih1).getValue();
				arrayGecer = splitArrayGecerT.split("/");
				countGecer = arrayGecer[0].length;
				if (countGecer === 1) {
					arrayGecer[0] = "0" + arrayGecer[0];
				}
				gecerTarih = arrayGecer[2] + arrayGecer[1] + arrayGecer[0];
			}

			var oPersonel = {};

			oPersonel.Ename = that.getView().byId(entryadSoyad1).getValue();
			oPersonel.Gbdat = dogumTarih;
			oPersonel.Begda = gecerTarih;
			oPersonel.Plans = that.getView().byId(entryPosAd1).getValue();
			oPersonel.Stell = that.getView().byId(entryisAnahtar1).getValue();
			oPersonel.Orgeh = that.getView().byId(entryorgBirim1).getValue();
			oPersonel.Bet01 = that.getView().byId(entryucret1).getValue();
			oPersonel.Diger = that.getView().byId(entrydiger1).getValue();

			//split edip kodu backende yollama begin of ycoskun
			var werks = that.getView().byId(entryperAlan1).getValue();
			var arrayWerks = werks.split(" / ");
			oPersonel.Werks = arrayWerks[0];

			var btrtl = that.getView().byId(entryperAltAlan1).getValue();
			var arrayBtrtl = btrtl.split(" / ");
			oPersonel.Btrtl = arrayBtrtl[0];

			var gsber = that.getView().byId(entryisAlan1).getValue();
			var arrayGsber = gsber.split(" / ");
			oPersonel.Gsber = arrayGsber[0];

			var persg = that.getView().byId(entryclsGrup1).getValue();
			var arrayPersg = persg.split(" / ");
			oPersonel.Persg = arrayPersg[0];

			var persk = that.getView().byId(entryclsAltGrup1).getValue();
			var arrayPersk = persk.split(" / ");
			oPersonel.Persk = arrayPersk[0];

			var trfgr = that.getView().byId(entryskalaKod1).getValue();
			var arrayTrfgr = trfgr.split(" / ");
			oPersonel.Trfgr = arrayTrfgr[0];

			var insti = that.getView().byId(entryokulAd1).getValue();
			var arrayInsti = insti.split(" / ");
			oPersonel.Insti = arrayInsti[0];

			var slart = that.getView().byId(entryokul1).getValue();
			var arraySlart = slart.split(" / ");
			oPersonel.Slart = arraySlart[0];

			var fach1 = that.getView().byId(entryegitim1).getValue();
			var arrayFach1 = fach1.split(" / ");
			oPersonel.Fach1 = arrayFach1[0];
			
			var plans = that.getView().byId(entryPosAd1).getValue();
			oPersonel.Plans = (plans.split("/"))[0];
			
			//end of ycoskun

			oPersonel.Tarih = "";
			oPersonel.Onayci = "";
			oPersonel.Statu = "";
			oPersonel.Appnr = "01";
			oPersonel.Pronr = "01";
			oPersonel.Pernr = vPernr;

			sap.ui.getCore().cPernr = vPernr;
			sap.ui.getCore().cPronr = "01";
			sap.ui.getCore().cAppnr = "01";

			// onaycılar ekranına genel bilgilerin getirilmesi için bilgilerin global olarak doldurulması begin of ycoskun
			sap.ui.getCore().cAdSoyad = that.getView().byId(entryadSoyad1).getValue();
			sap.ui.getCore().cDogumTarih = that.getView().byId(entrydogumTarih1).getValue();
			sap.ui.getCore().cGecerTarih = that.getView().byId(entrygecerTarih1).getValue();
			sap.ui.getCore().cPozisyon = that.getView().byId(entryPosAd1).getValue();
			sap.ui.getCore().cPerAlan = arrayWerks[0];
			sap.ui.getCore().cPerAltAlan = arrayBtrtl[0];
			sap.ui.getCore().cIsAlan = arrayGsber[0];
			sap.ui.getCore().cIsAnahtari = that.getView().byId(entryisAnahtar1).getValue();
			sap.ui.getCore().cOrgBirim = that.getView().byId(entryorgBirim1).getValue();
			sap.ui.getCore().cClsGrup = arrayPersg[0];
			sap.ui.getCore().cClsAltGrp = arrayPersk[0];
			sap.ui.getCore().cSkala = arrayTrfgr[0];
			sap.ui.getCore().cUcret = that.getView().byId(entryucret1).getValue();
			sap.ui.getCore().cDiger = that.getView().byId(entrydiger1).getValue();
			sap.ui.getCore().cOkulTur = arraySlart[0];
			sap.ui.getCore().cOkulAd = arrayInsti[0];
			sap.ui.getCore().cEgitim = arrayFach1[0];
			//end of ycoskun

			oModel.create("/ZHRPersonelBilgiSet", oPersonel, {
				method: "POST",
				success: function(oData, oThat) {
					console.log("SUCCESS");
					console.log(oData);

				},
				error: function(oData) {
					console.log("ERROR");
					console.log(oData);
				}
			});
			oModel.refresh(true);
			//end of ycoskun

			//begin of ycoskun eklenen dosyaları görüntüleme
			var formAttach = sap.ui.getCore().byId("formAttachDisplay");
			for (var i = 0; i < arrayFile.length; i++) {
				var oButton = new sap.ui.commons.Button({
					text: arrayFile[i].name,
					icon: "sap-icon://attachment",
					lite: true,
					width: "40%",
					press: function() {
						//var ogetURL = "/sap/opu/odata/sap/ZHR_144_SRV_01" + "/ZHRIseAlimFileSet('" + file.name + "," + pernr + "')/$value";
						//sap.m.URLHelper.redirect(ogetURL, true);
					}
				});
				formAttach.addContent(oButton);
			}
			//end of ycoskun eklenen dosyaları görüntüleme

			this._oNavContainer.to(this._oWizardReviewPage);

		},
		onPressLang: function() {
			var pernr = vPernr;
			var oView = this.getView();
			var oList = oView.byId("idLanguageTable");
			var oSelectedItem = oList.getSelectedItem();
			var oDialogDil;

			//secilenin verileri tablodan alma
			var vDilTur = oSelectedItem.getCells()[0].getText();
			var vDil = oSelectedItem.getCells()[1].getText();
			var vPuan = oSelectedItem.getCells()[2].getText();
			var vTarih = oSelectedItem.getCells()[3].getText();
			var vYazma = oSelectedItem.getCells()[4].getText();
			var vOkuma = oSelectedItem.getCells()[5].getText();
			var vDinleme = oSelectedItem.getCells()[6].getText();
			var vGenel = oSelectedItem.getCells()[7].getText();

			var oDilTur = new sap.ui.commons.TextField({
				value: vDilTur,
				enabled: false
			});
			var oDil = new sap.ui.commons.TextField({
				value: vDil,
				enabled: false
			});
			var oPuan = new sap.ui.commons.TextField({
				value: vPuan,
				enabled: false
			});
			var oTarih = new sap.ui.commons.TextField({
				value: vTarih,
				enabled: false
			});
			var oYazma = new sap.ui.commons.TextField({
				value: vYazma,
				enabled: false

			});
			var oOkuma = new sap.ui.commons.TextField({
				value: vOkuma,
				enabled: false

			});
			var oDinleme = new sap.ui.commons.TextField({
				value: vDinleme,
				enabled: false

			});
			var oGenel = new sap.ui.commons.TextField({
				value: vGenel,
				enabled: false

			});

			var oFormDil = new sap.ui.layout.form.SimpleForm({
				editable: false,
				content: [
					new sap.ui.commons.Label({
						text: "Dil Türü"
					}), oDilTur,
					new sap.ui.commons.Label({
						text: "Yabancı Dil"
					}), oDil,
					new sap.ui.commons.Label({
						text: "Puan"
					}), oPuan,
					new sap.ui.commons.Label({
						text: "Sınav Tarihi"
					}), oTarih,
					new sap.ui.commons.Label({
						text: "Yazma"
					}), oYazma,
					new sap.ui.commons.Label({
						text: "Okuma"
					}), oOkuma,
					new sap.ui.commons.Label({
						text: "Dinleme"
					}), oDinleme,
					new sap.ui.commons.Label({
						text: "Genel"
					}), oGenel
				]
			});

			oDialogDil = new sap.m.Dialog({
				title: "Yabancı Dil Bilgisi",
				rightButton: new sap.m.Button({
					text: "Sil",
					type: sap.m.ButtonType.Emphasized,
					icon: "sap-icon://delete",
					press: function() {
						/* buraya yabancı dil ekleyebilmek için servis eklenecek*/
						var oEntryDil = {};

						oEntryDil.Sptxt = vDil;
						oEntryDil.Spras = vDilTur;
						oEntryDil.Puan = vPuan;
						oEntryDil.SinavTarihi = vTarih;
						oEntryDil.Yazma = vYazma;
						oEntryDil.Okuma = vOkuma;
						oEntryDil.Dinleme = vDinleme;
						oEntryDil.Genel = vGenel;
						oEntryDil.Pernr = pernr;

						// begin of ycoskun yabancı dilleri silme
						var sReadURL = "/ZHRIseAlimYDSet(Pernr='" + oEntryDil.Pernr + "',Spras='" + oEntryDil.Spras + "')";
						var mParameters = {
							async: false,
							filters: null,
							urlParameters: null,
							success: function() {
								var Message = "Yabancı Dil Silindi.";
								sap.m.MessageToast.show(Message);

							},
							error: function() {
								var Message = "Bağlantı Hatası!";
								sap.m.MessageToast.show(Message);
							}
						};
						oModel.remove(sReadURL, mParameters);
						oModel.refresh(true);
						// end of ycoskun

						//begin of ycoskun yabancı dilleri listele 
						var oLangModel = new sap.ui.model.json.JSONModel();
						var perFilter = "Pernr eq '" + pernr + "'";

						oModel.read("/ZHRIseAlimYDSet", null, ["$filter=" + perFilter], true,
							function(oData) {
								oLangModel.setData(oData);
							});
						oView.setModel(oLangModel, "LangModel");
						var langtable = oView.byId("idLanguageTable");
						langtable.setModel(oView.getModel("LangModel"));
						//end of ycoskun
						this.oParent.close();

					}
				}),
				leftButton: new sap.m.Button({
					text: "Kapat",
					type: sap.m.ButtonType.Emphasized,
					icon: "sap-icon://decline",
					press: function() {
						this.oParent.close();

					}
				}),
				content: [oFormDil]
			});

			oDialogDil.open();

		},
		onPressZihin: function() {
			var pernr = vPernr;
			var oView = this.getView();
			var oList = oView.byId("idAbilityTable");
			var oSelectedItem = oList.getSelectedItem();
			var oDialogZihin;

			//secilenin verileri tablodan alma
			var vSinavTur = oSelectedItem.getCells()[0].getText();
			var vPuan = oSelectedItem.getCells()[1].getText();
			var vTarih = oSelectedItem.getCells()[2].getText();

			var oSinavTur = new sap.ui.commons.TextField({
				value: vSinavTur,
				enabled: false
			});
			var oPuan = new sap.ui.commons.TextField({
				value: vPuan,
				enabled: false
			});
			var oTarih = new sap.ui.commons.TextField({
				value: vTarih,
				enabled: false
			});

			var oFormZihin = new sap.ui.layout.form.SimpleForm({
				editable: false,
				content: [
					new sap.ui.commons.Label({
						text: "Sınav Türü"
					}), oSinavTur,
					new sap.ui.commons.Label({
						text: "Puan"
					}), oPuan,
					new sap.ui.commons.Label({
						text: "Sınav Tarihi"
					}), oTarih
				]
			});

			oDialogZihin = new sap.m.Dialog({
				title: "Zihinsel Beceri Bilgisi",
				rightButton: new sap.m.Button({
					text: "Sil",
					type: sap.m.ButtonType.Emphasized,
					icon: "sap-icon://delete",
					press: function() {
						/* buraya yabancı dil ekleyebilmek için servis eklenecek*/
						var oEntryZihin = {};

						oEntryZihin.SinavTuru = vSinavTur;
						oEntryZihin.Puan = vPuan;
						oEntryZihin.SinavTarihi = vTarih;
						oEntryZihin.Pernr = pernr;

						// begin of ycoskun yabancı dilleri silme
						var sReadURL = "/ZHRIseAlimZBSet(Pernr='" + oEntryZihin.Pernr + "',SinavTuru='" + oEntryZihin.SinavTuru + "')";
						var mParameters = {
							async: false,
							filters: null,
							urlParameters: null,
							success: function() {
								var Message = "Zihinsel Beceri Silindi.";
								sap.m.MessageToast.show(Message);

							},
							error: function() {
								var Message = "Bağlantı Hatası!";
								sap.m.MessageToast.show(Message);
							}
						};
						oModel.remove(sReadURL, mParameters);
						oModel.refresh(true);
						// end of ycoskun

						var oZihinModel = new sap.ui.model.json.JSONModel();
						var perFilter = "Pernr eq '" + pernr + "'";

						oModel.read("/ZHRIseAlimZBSet", null, ["$filter=" + perFilter], true,
							function(oData) {
								oZihinModel.setData(oData);
							});
						oView.setModel(oZihinModel, "oZihinModel");
						var zihintable = oView.byId("idAbilityTable");
						zihintable.setModel(oView.getModel("oZihinModel"));
						//end of ycoskun

						this.oParent.close();

					}
				}),
				leftButton: new sap.m.Button({
					text: "Kapat",
					type: sap.m.ButtonType.Emphasized,
					icon: "sap-icon://decline",
					press: function() {
						this.oParent.close();

					}
				}),
				content: [oFormZihin]
			});

			oDialogZihin.open();

		},
		onCollapseAll: function() {
			var oTreeTable = this.getView().byId("TreeTableBasic");
			oTreeTable.collapseAll();
		},

		onExpandFirstLevel: function() {
			var oTreeTable = this.getView().byId("TreeTableBasic");
			oTreeTable.expandToLevel(1);
		},
		onSelect: function() {
			var that = this;
			var osJsonStelOrg = new sap.ui.model.json.JSONModel();
			var vStell, vOrg;
			var vPosition = sap.ui.getCore().cPosition;
			var arrayPos = vPosition.split("/");
			var vPos = arrayPos[0];
			that.getView().byId("PosAd1").setValue(sap.ui.getCore().cPosition);
			that.oMessageDialog.close();
			that.oMessageDialog.destroy();

			oModel.read("/StelOrgGetirSet('" + vPos + "')", null, null, false,
				function(oData) {
					osJsonStelOrg.setData(oData);
					vStell = oData.Stell;
					vOrg = oData.Orgeh;

					that.getView().byId("isAnah1").setValue(vStell);
					that.getView().byId("isAnah1").setEnabled(false);
					that.getView().byId("orgBir1").setValue(vOrg);
					that.getView().byId("orgBir1").setEnabled(false);

				});

		},
		onClose: function() {
			var that = this;
			that.oMessageDialog.close();
			that.oMessageDialog.destroy();
		}
	});

	return WizardController;
});