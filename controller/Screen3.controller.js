sap.ui.define([
	'jquery.sap.global',
	'sap/ui/core/mvc/Controller',
	'sap/ui/model/json/JSONModel',
	"sap/m/MessageToast",
	"sap/m/MessageBox",
	"sap/ui/commons/TextField"

], function(jQuery, Controller, JSONModel, MessageToast, MessageBox, TextField) {

	"use strict";

	var oModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZHR_144_SRV_01");
	var vPernr;
	var osJson = new sap.ui.model.json.JSONModel();
	var osJsonPerAlan = new sap.ui.model.json.JSONModel();
	var osJsonClsALtGrb = new sap.ui.model.json.JSONModel();
	var osJsonSkala = new sap.ui.model.json.JSONModel();
	var osJsonIsAlan = new sap.ui.model.json.JSONModel();
	var osJsonYabanciDil = new sap.ui.model.json.JSONModel();
	var osJsonSinavTur = new sap.ui.model.json.JSONModel();
	var osJsonPerAltAlan = new sap.ui.model.json.JSONModel();
	var oLang;
	var oExam;
	var oLanguage;
	var vWerks;

	var WizardController = Controller.extend("ZHR_144.controller.Screen3", {

		onInit: function() {

			this._wizard = this.getView().byId("CreateProductWizard");
			this._oNavContainer = this.getView().byId("wizardNavContainer");
			this._oWizardContentPage = this.getView().byId("wizardContentPage3");
			this._oWizardReviewPage = sap.ui.xmlfragment("ZHR_144.view.Screen3ReviewPage", this);
			this._oNavContainer.addPage(this._oWizardReviewPage);
			this.model = new sap.ui.model.json.JSONModel();
			this.model.setData({
				//	isAlanState: "Error"
			});

			this.getView().setModel(this.model);
			this.model.setProperty("/productType", "Mobile");
			this.model.setProperty("/navApiEnabled", true);
			this.model.setProperty("/productVAT", false);
			this._setEmptyValue("/productManufacturer");
			this._setEmptyValue("/productDescription");
			this._setEmptyValue("/productPrice");

			var osModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZHR_144_SRV_01");
			//osModel.setSizeLimit(99999);
			osModel.read("/PerAlanSet", null, null, true,

				function(oData, response) {
					osJsonPerAlan.setData(oData);
				},
				function(oEvent) {

				});
			osModel.read("/IsAlaniSet", null, null, true,

				function(oData, response) {
					osJsonIsAlan.setData(oData);
				},
				function(oEvent) {

				});
			osModel.read("/CalisanGrSet", null, null, true,

				function(oData, response) {
					osJson.setData(oData);
				},
				function(oEvent) {

				});

			osModel.read("/CalisanAltGrSet", null, null, true,

				function(oData, response) {
					osJsonClsALtGrb.setData(oData);
				},
				function(oEvent) {

				});
			osModel.read("/SkalaKoduSet", null, null, true,

				function(oData, response) {
					osJsonSkala.setData(oData);
				},
				function(oEvent) {

				});
			oModel.read("/YabanciDilSet", null, null, true,

				function(oData) {
					osJsonYabanciDil.setData(oData);
				},
				function() {

				});
			oModel.read("/SinavTuruSet", null, null, true,

				function(oData) {
					osJsonSinavTur.setData(oData);
				},
				function() {

				});

		},
		handleValueHelpIsAlan: function(oEvent) {
			var that = this;
			var handleClose = function(oEvent) {
				var oSelectedItem = oEvent.getParameter("selectedItem");
				if (oSelectedItem) {
					that.getView().byId("InputIsAlan3").setValue(oSelectedItem.getDescription() + " / " + oSelectedItem.getTitle());
					that.additionalInfoValidation();
				}
			};
			if (!this._valueHelpSelectDialogIsAlan3) {
				this._valueHelpSelectDialogIsAlan3 = new sap.m.SelectDialog("valueHelpSelectDialogIsAlan3", {
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

				this._valueHelpSelectDialogIsAlan3.setModel(osJsonIsAlan);

			} else {
				this._valueHelpSelectDialogIsAlan3.setModel(osJsonIsAlan);
			}
			this._valueHelpSelectDialogIsAlan3.open();

		},
		handleValueHelpSkala: function() {
			var that = this;
			var handleClose = function(oEvent) {
				var oSelectedItem = oEvent.getParameter("selectedItem");
				if (oSelectedItem) {
					that.getView().byId("InputSkala3").setValue(oSelectedItem.getDescription() + " / " + oSelectedItem.getTitle());
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
		handleValueHelpClsAlt: function() {
			var that = this;
			var handleClose = function(oEvent) {
				var oSelectedItem = oEvent.getParameter("selectedItem");
				if (oSelectedItem) {
					that.getView().byId("InputCalisanAlt3").setValue(oSelectedItem.getDescription() + " / " + oSelectedItem.getTitle());
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
		handleValueHelp: function(oEvent) {
			var that = this;
			var handleClose = function(oEvent) {
				var oSelectedItem = oEvent.getParameter("selectedItem");
				if (oSelectedItem) {
					that.getView().byId("InputCalisanGrp3").setValue(oSelectedItem.getDescription() + " / " + oSelectedItem.getTitle());
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
		handleValueHelpPerA: function() {
			var that = this;
			var handleClose = function(oEvent) {
				var oSelectedItem = oEvent.getParameter("selectedItem");
				if (oSelectedItem) {
					that.getView().byId("InputPerAlan3").setValue(oSelectedItem.getDescription() + " / " + oSelectedItem.getTitle());
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
					that.getView().byId("InputPerAltAlan3").setValue(oSelectedItem.getDescription() + " / " + oSelectedItem.getTitle());
					that.additionalInfoValidation();
				}
			};
			if (!this._valueHelpSelectDialogPerAltAlan) {
				this._valueHelpSelectDialogPerAltAlan = new sap.m.SelectDialog("valueHelpSelectDialogPerAltAlan", {
					title: "Personel Alt Alanı",
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
			var cls1 = this.getView().byId("InputCalisanGrp3").getValue();
			var perAlan1 = this.getView().byId("InputPerAlan3").getValue();
			var clsAlt1 = this.getView().byId("InputCalisanAlt3").getValue();
			var isAlan1 = this.getView().byId("InputIsAlan3").getValue();

			if (perAlan1.length < 4 || isAlan1.length < 4 || cls1.length < 1 || clsAlt1.length < 2) {
				this._wizard.invalidateStep(this.getView().byId("YeniStep3"));
			} else {
				this._wizard.validateStep(this.getView().byId("YeniStep3"));

			}
		},

		optionalStepActivation: function() {},

		optionalStepCompletion: function() {},

		stepLanguage: function() {
			//begin of ycoskun  Personel Verilerini erp tabloya atma 

			var that = this;
			var oEntryTerfiPersonel = {};

			var entryPosAd3 = "InputPosAd3";
			var entryPerAlan3 = "InputPerAlan3";
			var entryPerAltAlan3 = "InputPerAltAlan3";
			var entryisAlan3 = "InputIsAlan3";
			var entrySirket3 = "InputSirket3";
			var entryisAnahtar3 = "InputIsAnahtari3";
			var entryorgBirim3 = "InputOrgBirim3";
			var entryclsGrup3 = "InputCalisanGrp3";
			var entryclsAltGrup3 = "InputCalisanAlt3";
			var entryskalaKod3 = "InputSkala3";
			var entryucret3 = "InputUcret3";
			var entryDilPrim3 = "InputDilPrim3";
			var entryAracPrim3 = "InputAracPrim3";
			var entryMevPrim3 = "InputMevPrim3";
			var entryVekPrim3 = "InputVekPrim3";
			var entryDiger3 = "InputDiger3";
			var entrySicilNo = "sicilNo3";
			var entryAdSoyad3 = "adSoyad3";
			var entrydogumTarih3 = "dogumTarih3";
			var entryTckno3 = "idTC3";
			var entrygecerTarih3 = "gecerTarih3";
			var entryOkulTur = "okulTur3";
			var entryOkulAdi = "okulAd3";
			var entryEgitim = "egitim3";

			oEntryTerfiPersonel.Appnr = "01";
			oEntryTerfiPersonel.Pronr = "03";
			oEntryTerfiPersonel.Pernr = that.getView().byId(entrySicilNo).getValue();
			oEntryTerfiPersonel.Ename = that.getView().byId(entryAdSoyad3).getValue();
			oEntryTerfiPersonel.Tckno = that.getView().byId(entryTckno3).getValue();
			oEntryTerfiPersonel.Gbdat = that.getView().byId(entrydogumTarih3).getValue();
			oEntryTerfiPersonel.Begda = that.getView().byId(entrygecerTarih3).getValue();
			oEntryTerfiPersonel.Bukrs = that.getView().byId(entrySirket3).getValue();
			oEntryTerfiPersonel.Bet01 = that.getView().byId(entryucret3).getValue();
			oEntryTerfiPersonel.Diger = that.getView().byId(entryDiger3).getValue();
			oEntryTerfiPersonel.Dilpr = that.getView().byId(entryDilPrim3).getValue();
			oEntryTerfiPersonel.Arcpr = that.getView().byId(entryAracPrim3).getValue();
			oEntryTerfiPersonel.Mvspr = that.getView().byId(entryMevPrim3).getValue();
			oEntryTerfiPersonel.Vklpr = that.getView().byId(entryVekPrim3).getValue();
			oEntryTerfiPersonel.Insti = that.getView().byId(entryOkulAdi).getValue();

			//split edip kodu backende yollama begin of ycoskun
			var plans = that.getView().byId(entryPosAd3).getValue();
			var arrayPlans = plans.split(" / ");
			oEntryTerfiPersonel.Plans = arrayPlans[0];

			var fach1 = that.getView().byId(entryEgitim).getValue();
			var arrayFach1 = fach1.split(" / ");
			oEntryTerfiPersonel.Fach1 = arrayFach1[0];

			var orgeh = that.getView().byId(entryorgBirim3).getValue();
			var arrayOrgeh = orgeh.split(" / ");
			oEntryTerfiPersonel.Orgeh = arrayOrgeh[0];

			var slart = that.getView().byId(entryOkulTur).getValue();
			var arraySlart = slart.split(" / ");
			oEntryTerfiPersonel.Slart = arraySlart[0];

			var stell = that.getView().byId(entryisAnahtar3).getValue();
			var arrayStell = stell.split(" / ");
			oEntryTerfiPersonel.Stell = arrayStell[0];

			var werks = that.getView().byId(entryPerAlan3).getValue();
			var arrayWerks = werks.split(" / ");
			oEntryTerfiPersonel.Werks = arrayWerks[0];

			var btrtl = that.getView().byId(entryPerAltAlan3).getValue();
			var arrayBtrtl = btrtl.split(" / ");
			oEntryTerfiPersonel.Btrtl = arrayBtrtl[0];

			var gsber = that.getView().byId(entryisAlan3).getValue();
			var arrayGsber = gsber.split(" / ");
			oEntryTerfiPersonel.Gsber = arrayGsber[0];

			var persg = that.getView().byId(entryclsGrup3).getValue();
			var arrayPersg = persg.split(" / ");
			oEntryTerfiPersonel.Persg = arrayPersg[0];

			var persk = that.getView().byId(entryclsAltGrup3).getValue();
			var arrayPersk = persk.split(" / ");
			oEntryTerfiPersonel.Persk = arrayPersk[0];

			var trfgr = that.getView().byId(entryskalaKod3).getValue();
			var arrayTrfgr = trfgr.split(" / ");
			oEntryTerfiPersonel.Trfgr = arrayTrfgr[0];

			//end of ycoskun

			oModel.create("/ZHRTerfiPersonelBilgiSet", oEntryTerfiPersonel, {
				method: "POST",
				success: function(oData, oThat) {
					console.log("SUCCESS");
				},

				error: function(oData) {
					console.log("ERROR");
				}

			});
			oModel.refresh(true);
			//end of ycoskun

			//begin of ycoskun terfi yabancı dilleri getir
			var olangModel = new sap.ui.model.json.JSONModel();
			vPernr = that.getView().byId(entrySicilNo).getValue();
			var perFilter = "Pernr eq '" + vPernr + "'";
			var oThat = this;

			oModel.read("/ZHRTerfiYDSet", null, ["$filter=" + perFilter], true,
				function(oData) {
					olangModel.setData(oData);

				});
			oThat.getView().setModel(olangModel, "LangModel");
			var langtable = oThat.getView().byId("idLanguageTable3");
			langtable.setModel(this.getView().getModel("LangModel"));
			//end of ycoskun

			this._wizard.validateStep(this.getView().byId("idAbility"));

		},
		stepAbility: function() {
			//begin of ycoskun  zihinsel beceri bilgileri getir
			var pernr = vPernr;
			var oAbModel = new sap.ui.model.json.JSONModel();
			var perAbFilter = "Pernr eq '" + pernr + "'";
			var oThat = this;

			oModel.read("/ZHRTerfiZBSet", null, ["$filter=" + perAbFilter], true,
				function(oData) {
					oAbModel.setData(oData);

				});
			oThat.getView().setModel(oAbModel, "oAbModel");
			var langtable = oThat.getView().byId("idAbilityTable3");
			langtable.setModel(this.getView().getModel("oAbModel"));
			//end of ycoskun

			this._wizard.validateStep(this.getView().byId("PricingStep"));

		},

		pricingActivate: function() {
			var that = this;
			var sicilNo = "sicilNo3";
			var oPDModel = new sap.ui.model.json.JSONModel();
			vPernr = that.getView().byId(sicilNo).getValue();
			var perFilter = "Pernr eq '" + vPernr + "'";
			var oThat = this;

			oModel.read("/ZHRTerfiPDSet", null, ["$filter=" + perFilter], true,
				function(oData) {
					oPDModel.setData(oData);

				});
			oThat.getView().setModel(oPDModel, "PDModel");
			var pdtable = oThat.getView().byId("idPDTable3");
			pdtable.setModel(this.getView().getModel("PDModel"));

			this.model.setProperty("/navApiEnabled", true);

		},

		pricingComplete: function() {
			this.model.setProperty("/navApiEnabled", false);

		},

		scrollFrom4to2: function() {
			this._wizard.goToStep(this.getView().byId("ProductInfoStep"));
		},

		goFrom4to3: function() {
			if (this._wizard.getProgressStep() === this.getView().byId("PricingStep"))
				this._wizard.previousStep();
		},

		goFrom4to5: function() {
			if (this._wizard.getProgressStep() === this.getView().byId("PricingStep"))
				this._wizard.nextStep();
		},

		wizardCompletedHandler: function() {

			var that = this;
			var oEntry = [];
			var oTerfiPersonel = [];

			var entryfisKonu3 = "fisKonu3";
			var entrysicilNo3 = "sicilNo3";
			var entryadSoyad3 = "adSoyad3";
			var entrytc3 = "idTC3";
			var entrydogumTarih3 = "dogumTarih3";
			var entrygecerTarih3 = "gecerTarih3";
			var entryPosAd3 = "PosAd3";
			var entryperAlan3 = "perAlan3";
			var entryperAltAlan3 = "perAltAlan3";
			var entryisAlan3 = "isAlan3";
			var entrysirket3 = "sirket3";
			var entryisAnahtar3 = "isAnahtari3";
			var entryorgBirim3 = "orgBirim3";
			var entryclsGrup3 = "calisanGrp3";
			var entryclsAltGrup3 = "calisanAlt3";
			var entryskalaKod3 = "skala3";
			var entryucret3 = "ucret3";
			var entrydilPrim3 = "dilPrim3";
			var entryaracPrim3 = "aracPrim3";
			var entrymevPrim3 = "mevPrim3";
			var entryvekPrim3 = "vekPrim3";
			var entrydiger3 = "diger3";

			var entryinputPosAd3 = "InputPosAd3";
			var entryinputPerAlan3 = "InputPerAlan3";
			var entryinputPerAltAlan3 = "InputPerAltAlan3";
			var entryinputIsAlan3 = "InputIsAlan3";
			var entryinputSirket3 = "InputSirket3";
			var entryinputIsAnahtar3 = "InputIsAnahtari3";
			var entryinputOrgBirim3 = "InputOrgBirim3";
			var entryinputClsGrup3 = "InputCalisanGrp3";
			var entryinputClsAltGrup3 = "InputCalisanAlt3";
			var entryinputSkalaKod3 = "InputSkala3";
			var entryinputUcret3 = "InputUcret3";
			var entryinputDilPrim3 = "InputDilPrim3";
			var entryinputAracPrim3 = "InputAracPrim3";
			var entryinputMevPrim3 = "InputMevPrim3";
			var entryinputVekPrim3 = "InputVekPrim3";
			var entryinputDiger3 = "InputDiger3";
			var entryokul3 = "okulTur3";
			var entryokulAd3 = "okulAd3";
			var entryegitim3 = "egitim3";

			var pernr = vPernr;

			oEntry[entryfisKonu3] = that.getView().byId(entryfisKonu3).getValue();
			oEntry[entrysicilNo3] = that.getView().byId(entrysicilNo3).getValue();
			oEntry[entryadSoyad3] = that.getView().byId(entryadSoyad3).getValue();
			oEntry[entrytc3] = that.getView().byId(entrytc3).getValue();
			oEntry[entrydogumTarih3] = that.getView().byId(entrydogumTarih3).getValue();
			oEntry[entrygecerTarih3] = that.getView().byId(entrygecerTarih3).getValue();
			oEntry[entryPosAd3] = that.getView().byId(entryPosAd3).getValue();
			oEntry[entryperAlan3] = that.getView().byId(entryperAlan3).getValue();
			oEntry[entryperAltAlan3] = that.getView().byId(entryperAltAlan3).getValue();
			oEntry[entryisAlan3] = that.getView().byId(entryisAlan3).getValue();
			oEntry[entrysirket3] = that.getView().byId(entrysirket3).getValue();
			oEntry[entryisAnahtar3] = that.getView().byId(entryisAnahtar3).getValue();
			oEntry[entryorgBirim3] = that.getView().byId(entryorgBirim3).getValue();
			oEntry[entryclsGrup3] = that.getView().byId(entryclsGrup3).getValue();
			oEntry[entryclsAltGrup3] = that.getView().byId(entryclsAltGrup3).getValue();
			oEntry[entryskalaKod3] = that.getView().byId(entryskalaKod3).getValue();
			oEntry[entryucret3] = that.getView().byId(entryucret3).getValue();
			oEntry[entrydilPrim3] = that.getView().byId(entrydilPrim3).getValue();
			oEntry[entryaracPrim3] = that.getView().byId(entryaracPrim3).getValue();
			oEntry[entrymevPrim3] = that.getView().byId(entrymevPrim3).getValue();
			oEntry[entryvekPrim3] = that.getView().byId(entryvekPrim3).getValue();
			oEntry[entrydiger3] = that.getView().byId(entrydiger3).getValue();
			oEntry[entryinputPosAd3] = that.getView().byId(entryinputPosAd3).getValue();
			oEntry[entryinputPerAlan3] = that.getView().byId(entryinputPerAlan3).getValue();
			oEntry[entryinputPerAltAlan3] = that.getView().byId(entryinputPerAltAlan3).getValue();
			oEntry[entryinputIsAlan3] = that.getView().byId(entryinputIsAlan3).getValue();
			oEntry[entryinputSirket3] = that.getView().byId(entryinputSirket3).getValue();
			oEntry[entryinputIsAnahtar3] = that.getView().byId(entryinputIsAnahtar3).getValue();
			oEntry[entryinputOrgBirim3] = that.getView().byId(entryinputOrgBirim3).getValue();
			oEntry[entryinputClsGrup3] = that.getView().byId(entryinputClsGrup3).getValue();
			oEntry[entryinputClsAltGrup3] = that.getView().byId(entryinputClsAltGrup3).getValue();
			oEntry[entryinputSkalaKod3] = that.getView().byId(entryinputSkalaKod3).getValue();
			oEntry[entryinputUcret3] = that.getView().byId(entryinputUcret3).getValue();
			oEntry[entryinputDilPrim3] = that.getView().byId(entryinputDilPrim3).getValue();
			oEntry[entryinputAracPrim3] = that.getView().byId(entryinputAracPrim3).getValue();
			oEntry[entryinputMevPrim3] = that.getView().byId(entryinputMevPrim3).getValue();
			oEntry[entryinputVekPrim3] = that.getView().byId(entryinputVekPrim3).getValue();
			oEntry[entryinputDiger3] = that.getView().byId(entryinputDiger3).getValue();
			oEntry[entryokul3] = that.getView().byId(entryokul3).getValue();
			oEntry[entryokulAd3] = that.getView().byId(entryokulAd3).getValue();
			oEntry[entryegitim3] = that.getView().byId(entryegitim3).getValue();

			//console.log(oEntry);

			//terfi verilerini güncelleme ycoskun

			oTerfiPersonel.Appnr = "01";
			oTerfiPersonel.Pronr = "03";
			oTerfiPersonel.Pernr = that.getView().byId(entrysicilNo3).getValue();
			oTerfiPersonel.Ename = that.getView().byId(entryadSoyad3).getValue();
			oTerfiPersonel.Tckno = that.getView().byId(entrytc3).getValue();
			oTerfiPersonel.Gbdat = that.getView().byId(entrydogumTarih3).getValue();
			oTerfiPersonel.Begda = that.getView().byId(entrygecerTarih3).getValue();
			oTerfiPersonel.Bukrs = that.getView().byId(entryinputSirket3).getValue();
			oTerfiPersonel.Bet01 = that.getView().byId(entryinputUcret3).getValue();
			oTerfiPersonel.Diger = that.getView().byId(entryinputDiger3).getValue();
			oTerfiPersonel.Dilpr = that.getView().byId(entryinputDilPrim3).getValue();
			oTerfiPersonel.Arcpr = that.getView().byId(entryinputAracPrim3).getValue();
			oTerfiPersonel.Mvspr = that.getView().byId(entryinputMevPrim3).getValue();
			oTerfiPersonel.Vklpr = that.getView().byId(entryinputVekPrim3).getValue();
			oTerfiPersonel.Insti = that.getView().byId(entryokulAd3).getValue();

			//split edip kodu backende yollama begin of ycoskun
			var plans = that.getView().byId(entryinputPosAd3).getValue();
			var arrayPlans = plans.split(" / ");
			oTerfiPersonel.Plans = arrayPlans[0];

			var fach1 = that.getView().byId(entryegitim3).getValue();
			var arrayFach1 = fach1.split(" / ");
			oTerfiPersonel.Fach1 = arrayFach1[0];

			var orgeh = that.getView().byId(entryinputOrgBirim3).getValue();
			var arrayOrgeh = orgeh.split(" / ");
			oTerfiPersonel.Orgeh = arrayOrgeh[0];

			var slart = that.getView().byId(entryokul3).getValue();
			var arraySlart = slart.split(" / ");
			oTerfiPersonel.Slart = arraySlart[0];

			var stell = that.getView().byId(entryinputIsAnahtar3).getValue();
			var arrayStell = stell.split(" / ");
			oTerfiPersonel.Stell = arrayStell[0];

			var werks = that.getView().byId(entryinputPerAlan3).getValue();
			var arrayWerks = werks.split(" / ");
			oTerfiPersonel.Werks = arrayWerks[0];

			var btrtl = that.getView().byId(entryinputPerAltAlan3).getValue();
			var arrayBtrtl = btrtl.split(" / ");
			oTerfiPersonel.Btrtl = arrayBtrtl[0];

			var gsber = that.getView().byId(entryinputIsAlan3).getValue();
			var arrayGsber = gsber.split(" / ");
			oTerfiPersonel.Gsber = arrayGsber[0];

			var persg = that.getView().byId(entryinputClsGrup3).getValue();
			var arrayPersg = persg.split(" / ");
			oTerfiPersonel.Persg = arrayPersg[0];

			var persk = that.getView().byId(entryinputClsAltGrup3).getValue();
			var arrayPersk = persk.split(" / ");
			oTerfiPersonel.Persk = arrayPersk[0];

			var trfgr = that.getView().byId(entryinputSkalaKod3).getValue();
			var arrayTrfgr = trfgr.split(" / ");
			oTerfiPersonel.Trfgr = arrayTrfgr[0];

			//end of ycoskun

			oModel.create("/ZHRTerfiPersonelBilgiSet", oTerfiPersonel, {
				method: "POST",
				success: function(oData, oThat) {
					console.log("SUCCESS Personel");
				},

				error: function(oData) {
					console.log("ERROR");
				}

			});

			oModel.refresh(true);
			//end of ycoskun

			that.getElement("fisKonuRew3").setValue(oEntry.fisKonu3);
			that.getElement("sicilNoRew3").setValue(oEntry.sicilNo3);
			that.getElement("adSoyadRew3").setValue(oEntry.adSoyad3);
			that.getElement("tcRew3").setValue(oEntry.idTC3);
			that.getElement("dogumTarihRew3").setValue(this.vDate(oEntry.dogumTarih3));
			that.getElement("gecerTarihRew3").setValue(this.vDate(oEntry.gecerTarih3));

			that.getElement("PosAdRew3").setValue(oEntry.PosAd3);
			that.getElement("perAlanRew3").setValue(oEntry.perAlan3);
			that.getElement("perAltAlanRew3").setValue(oEntry.perAltAlan3);
			that.getElement("isAlanRew3").setValue(oEntry.isAlan3);
			that.getElement("sirketRew3").setValue(oEntry.sirket3);
			that.getElement("isAnahRew3").setValue(oEntry.isAnahtari3);
			that.getElement("orgBirRew3").setValue(oEntry.orgBirim3);
			that.getElement("clsRew3").setValue(oEntry.calisanGrp3);
			that.getElement("clsAltRew3").setValue(oEntry.calisanAlt3);
			that.getElement("skalaRew3").setValue(oEntry.skala3);
			that.getElement("ucretRew3").setValue(oEntry.ucret3);
			that.getElement("dilPrimRew3").setValue(oEntry.dilPrim3);
			that.getElement("aracPrimRew3").setValue(oEntry.aracPrim3);
			that.getElement("mevPrimRew3").setValue(oEntry.mevPrim3);
			that.getElement("vekPrimRew3").setValue(oEntry.vekPrim3);
			that.getElement("digerRew3").setValue(oEntry.diger3);

			that.getElement("inputPosAdRew3").setValue(oEntry.InputPosAd3);
			that.getElement("inputPerAlanRew3").setValue(oEntry.InputPerAlan3);
			that.getElement("inputPerAltAlanRew3").setValue(oEntry.InputPerAltAlan3);
			that.getElement("inputsirketRew3").setValue(oEntry.InputIsAlan3);
			that.getElement("inputIsAlanRew3").setValue(oEntry.InputSirket3);
			that.getElement("inputIsAnahRew3").setValue(oEntry.InputIsAnahtari3);
			that.getElement("inputOrgBirRew3").setValue(oEntry.InputOrgBirim3);
			that.getElement("inputClsRew3").setValue(oEntry.InputCalisanGrp3);
			that.getElement("inputClsAltRew3").setValue(oEntry.InputCalisanAlt3);
			that.getElement("inputSkalaRew3").setValue(oEntry.InputSkala3);
			that.getElement("inputUcretRew3").setValue(oEntry.InputUcret3);
			that.getElement("inputDilPrimRew3").setValue(oEntry.InputDilPrim3);
			that.getElement("inputAracPrimRew3").setValue(oEntry.InputAracPrim3);
			that.getElement("inputMevPrimRew3").setValue(oEntry.InputMevPrim3);
			that.getElement("inputVekPrimRew3").setValue(oEntry.InputVekPrim3);
			that.getElement("inputDigerRew3").setValue(oEntry.InputDiger3);
			that.getElement("okulRew3").setValue(oEntry.okulTur3);
			that.getElement("okulAdRew3").setValue(oEntry.okulAd3);
			that.getElement("egitimRew3").setValue(oEntry.egitim3);

			//begin of ycoskun verilerin globalde tutulması islemleri
			sap.ui.getCore().cPernr = that.getView().byId(entrysicilNo3).getValue();
			sap.ui.getCore().cPronr = "03";
			sap.ui.getCore().cAppnr = "01";
			sap.ui.getCore().cAdSoyad = that.getView().byId(entryadSoyad3).getValue();
			sap.ui.getCore().cDogumTarih = that.getView().byId(entrydogumTarih3).getValue();
			sap.ui.getCore().cGecerTarih = that.getView().byId(entrygecerTarih3).getValue();
			sap.ui.getCore().cTC = that.getView().byId(entrytc3).getValue();

			sap.ui.getCore().cPozisyon = oEntry.InputPosAd3;
			sap.ui.getCore().cPerAlan = oEntry.InputPerAlan3;
			sap.ui.getCore().cPerAltAlan = oEntry.InputPerAltAlan3;
			sap.ui.getCore().cIsAlan = oEntry.InputIsAlan3;
			sap.ui.getCore().cSirket = oEntry.InputSirket3;
			sap.ui.getCore().cIsAnahtari = oEntry.InputIsAnahtari3;
			sap.ui.getCore().cOrgBirim = oEntry.InputOrgBirim3;
			sap.ui.getCore().cClsGrup = oEntry.InputCalisanGrp3;
			sap.ui.getCore().cClsAltGrp = oEntry.InputCalisanAlt3;
			sap.ui.getCore().cSkala = oEntry.InputSkala3;
			sap.ui.getCore().cUcret = oEntry.InputUcret3;
			sap.ui.getCore().cDilPrim = oEntry.InputDilPrim3;
			sap.ui.getCore().cAracPrim = oEntry.InputAracPrim3;
			sap.ui.getCore().cMevPrim = oEntry.InputMevPrim3;
			sap.ui.getCore().cVekPrim = oEntry.InputVekPrim3;
			sap.ui.getCore().cDiger = oEntry.InputDiger3;

			sap.ui.getCore().cOkulTur = that.getView().byId(entryokul3).getValue();
			sap.ui.getCore().cOkulAd = that.getView().byId(entryokulAd3).getValue();
			sap.ui.getCore().cEgitim = that.getView().byId(entryegitim3).getValue();

			//end of ycoskun

			//begin of ycoskun yabancı dilleri listele 
			var oThat = this;
			var oLangModel = new sap.ui.model.json.JSONModel();
			var perFilter = "Pernr eq '" + pernr + "'";

			oModel.read("/ZHRTerfiYDSet", null, ["$filter=" + perFilter], true,
				function(oData) {
					oLangModel.setData(oData);
				});
			oThat.getView().setModel(oLangModel, "LangModel");
			var langtable = sap.ui.getCore().byId("idLang");
			langtable.setModel(this.getView().getModel("LangModel"));
			//end of ycoskun

			//begin of ycoskun zihinsel beceri review gösterme 
			var oAbModel = new sap.ui.model.json.JSONModel();
			var perAbFilter = "Pernr eq '" + pernr + "'";

			oModel.read("/ZHRTerfiZBSet", null, ["$filter=" + perAbFilter], true,
				function(oData) {
					oAbModel.setData(oData);
				});
			oThat.getView().setModel(oAbModel, "oAbModel");
			var zihintable = sap.ui.getCore().byId("idExamZihin");
			zihintable.setModel(this.getView().getModel("oAbModel"));
			//end of ycoskun

			//begin of ycoskun pd sonucları listele 
			var oPdModel = new sap.ui.model.json.JSONModel();
			var perPbFilter = "Pernr eq '" + pernr + "'";

			oModel.read("/ZHRTerfiPDSet", null, ["$filter=" + perPbFilter], true,
				function(oData) {
					oPdModel.setData(oData);
				});
			oThat.getView().setModel(oPdModel, "oPdModel");
			var pdtable = sap.ui.getCore().byId("idPd");
			pdtable.setModel(oThat.getView().getModel("oPdModel"));
			//end of ycoskun

			this._oNavContainer.to(this._oWizardReviewPage);

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

			oLang = new sap.m.ComboBox("box_default3", {
				items: {
					path: "/results",
					template: itemTemplate
				},
				selectionChange: function(oEvent) {
					selectLang = oEvent.oSource.getSelectedKey();
					sap.ui.getCore().byId("oLanguage3").setValue(selectLang);

				}
			});
			sap.ui.getCore().byId("box_default3").setModel(osJsonYabanciDil);

			oLanguage = new sap.ui.commons.TextField("oLanguage3", {
				value: "",
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

						oEntry.Sptxt = sap.ui.getCore().byId("box_default3").getValue();
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

						oModel.create("/ZHRTerfiYDSet", oEntry, {
							method: "POST",
							success: function() {
								console.log("SUCCESS");
								MessageToast.show('Yabancı Dil kaydetme başarıyla gerçekleşti');

							},
							error: function() {
								console.log("ERROR");
								MessageToast.show('Yabancı Dil Kaydetme Hata!');
							}
						});
						// end of ycoskun
						oModel.refresh(true);

						//begin of ycoskun yabancı dilleri listele 
						var oLangModel = new sap.ui.model.json.JSONModel();
						var perFilter = "Pernr eq '" + pernr + "'";

						oModel.read("/ZHRTerfiYDSet", null, ["$filter=" + perFilter], true,
							function(oData) {
								oLangModel.setData(oData);

							});
						oView.setModel(oLangModel, "LangModel");
						var langtable = oView.byId("idLanguageTable3");
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

			oExam = new sap.m.ComboBox("idAbility3", {
				items: {
					path: "/results",
					template: itemTemplate
				},
				selectionChange: function(oEvent) {
					selectAbility = oEvent.oSource.getSelectedKey();
				}
			});
			sap.ui.getCore().byId("idAbility3").setModel(osJsonSinavTur);

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
						oModel.create("/ZHRTerfiZBSet", oEntryBeceri, {
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

						oModel.read("/ZHRTerfiZBSet", null, ["$filter=" + perAbFilter], true,
							function(oData) {
								oAbilityModel.setData(oData);

							});
						oView.setModel(oAbilityModel, "oAbilityModel");
						var abtable = oView.byId("idAbilityTable3");
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
		onAddPD: function() {
			var pernr = vPernr;
			var oDialogPD;
			var oYear = new sap.ui.commons.DatePicker({
				value: "",
				enabled: true
			});

			var oSonuc = new sap.ui.commons.TextField({
				value: "",
				enabled: true
			});

			var oPuan = new sap.ui.commons.TextField({
				value: "",
				enabled: true
			});

			var oFormPD = new sap.ui.layout.form.SimpleForm({
				editable: true,
				content: [
					new sap.ui.commons.Label({
						text: "Yıl"
					}), oYear,
					new sap.ui.commons.Label({
						text: "Sonuç"
					}), oSonuc,
					new sap.ui.commons.Label({
						text: "Puan"
					}), oPuan
				]
			});
			var oView = this.getView();
			oDialogPD = new sap.m.Dialog({
				title: "PD Sonuçları",
				rightButton: new sap.m.Button({
					text: "Ekle",
					type: sap.m.ButtonType.Emphasized,
					icon: "sap-icon://add",
					press: function() {

						/* buraya pd ekleyebilmek için servis eklenecek*/
						var oEntry = {};

						oEntry.Pdyear = oYear.getYyyymmdd();
						oEntry.Pdsonuc = oSonuc.getValue();
						oEntry.Pdpuan = oPuan.getValue();
						oEntry.Pernr = pernr;

						// begin of ycoskun pd sonucları kaydet
						oModel.create("/ZHRTerfiPDSet", oEntry, {
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

						//begin of ycoskun pd sonucları listele 
						var oPDModel = new sap.ui.model.json.JSONModel();
						var perFilter = "Pernr eq '" + pernr + "'";

						oModel.read("/ZHRTerfiPDSet", null, ["$filter=" + perFilter], true,
							function(oData) {
								oPDModel.setData(oData);
								//	console.log(oData);
							});
						oView.setModel(oPDModel, "PDModel");
						var pdtable = oView.byId("idPDTable3");
						pdtable.setModel(oView.getModel("PDModel"));
						//end of ycoskun
						this.oParent.close();
						oDialogPD.destroy();
					}
				}),
				leftButton: new sap.m.Button({
					text: "Kapat",
					type: sap.m.ButtonType.Emphasized,
					icon: "sap-icon://decline",
					press: function() {
						this.oParent.close();
						oDialogPD.destroy();
					}
				}),
				content: [oFormPD]
			});
			oDialogPD.open();
		},
		nextOnayPage: function() {
			this.getOwnerComponent().getRouter().navTo("screen3Approve");
		},
		onBackScreen: function() {
			this.getOwnerComponent().getRouter().navTo("PersonalActivity");
			window.location.reload();
		},
		handleSicilNoSearch: function() {

			//begin of ycoskun sicilno girip tıklayınca verileri getirme

			var oThat = this;
			var sicilNo = oThat.getView().byId("sicilNo3").getValue();

			var Terfi = {};

			oModel.read("/ZHRTerfiSet('" + sicilNo + "')", null, null, false,
				function(oData) {
					Terfi = oData;
				},
				//begin of ycoskun response ta donen hatayı gosterme 
				function(oEvent) {
					var message = $(oEvent.response.body).find('message').first().text();
					MessageToast.show(message);
				}
				//end of ycoskun
			);

			this.getView().byId("fisKonu3").setValue("Terfi");
			this.getView().byId("sicilNo3").setValue(sicilNo);
			this.getView().byId("adSoyad3").setValue(Terfi.Ename);
			this.getView().byId("idTC3").setValue(Terfi.Tckno);
			this.getView().byId("dogumTarih3").setValue(Terfi.Gbdat);
			this.getView().byId("gecerTarih3").setValue(Terfi.Endda);
			this.getView().byId("PosAd3").setValue(Terfi.Plans + " / " + Terfi.Stext);
			this.getView().byId("sirket3").setValue(Terfi.Bukrs);
			this.getView().byId("isAlan3").setValue(Terfi.Gsber + " / " + Terfi.Gtext);
			this.getView().byId("isAnahtari3").setValue(Terfi.Stell + " / " + Terfi.StellTxt);
			this.getView().byId("orgBirim3").setValue(Terfi.Orgeh + " / " + Terfi.OrgehTxt);
			this.getView().byId("calisanGrp3").setValue(Terfi.Persg + " / " + Terfi.Psgtext);
			this.getView().byId("calisanAlt3").setValue(Terfi.Persk + " / " + Terfi.Psktext);
			this.getView().byId("skala3").setValue(Terfi.Trfgr);
			this.getView().byId("ucret3").setValue(Terfi.Ucret);
			this.getView().byId("dilPrim3").setValue(Terfi.Dilpr);
			this.getView().byId("aracPrim3").setValue(Terfi.Arcpr);
			this.getView().byId("mevPrim3").setValue(Terfi.Mevpr);
			this.getView().byId("vekPrim3").setValue(Terfi.Vklpr);
			this.getView().byId("diger3").setValue(Terfi.Diger);
			this.getView().byId("perAlan3").setValue(Terfi.Werks + " / " + Terfi.Pbtxt);
			this.getView().byId("perAltAlan3").setValue(Terfi.Btrtl + " / " + Terfi.Btext);
			this.getView().byId("okulTur3").setValue(Terfi.Slart + " / " + Terfi.SlartTxt);
			this.getView().byId("okulAd3").setValue(Terfi.Insti);
			this.getView().byId("egitim3").setValue(Terfi.Fach1 + " / " + Terfi.Ftext);

			this.getView().byId("InputPosAd3").setValue(Terfi.Plans + " / " + Terfi.Stext);
			this.getView().byId("InputSirket3").setValue(Terfi.Bukrs);
			this.getView().byId("InputIsAlan3").setValue(Terfi.Gsber + " / " + Terfi.Gtext);
			this.getView().byId("InputIsAnahtari3").setValue(Terfi.Stell + " / " + Terfi.StellTxt);
			this.getView().byId("InputOrgBirim3").setValue(Terfi.Orgeh + " / " + Terfi.OrgehTxt);
			this.getView().byId("InputCalisanGrp3").setValue(Terfi.Persg + " / " + Terfi.Psgtext);
			this.getView().byId("InputCalisanAlt3").setValue(Terfi.Persk + " / " + Terfi.Psktext);
			this.getView().byId("InputSkala3").setValue(Terfi.Trfgr);
			this.getView().byId("InputUcret3").setValue(Terfi.Ucret);
			this.getView().byId("InputDilPrim3").setValue(Terfi.Dilpr);
			this.getView().byId("InputAracPrim3").setValue(Terfi.Arcpr);
			this.getView().byId("InputMevPrim3").setValue(Terfi.Mvspr);
			this.getView().byId("InputVekPrim3").setValue(Terfi.Vklpr);
			this.getView().byId("InputDiger3").setValue(Terfi.Diger);
			this.getView().byId("InputPerAlan3").setValue(Terfi.Werks + " / " + Terfi.Pbtxt);
			this.getView().byId("InputPerAltAlan3").setValue(Terfi.Btrtl + " / " + Terfi.Btext);

			//end of ycoskun

		},
		onPressLang: function() {
			var pernr = vPernr;
			var oView = this.getView();
			var oList = oView.byId("idLanguageTable3");
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
						var sReadURL = "/ZHRTerfiYDSet(Pernr='" + oEntryDil.Pernr + "',Spras='" + oEntryDil.Spras + "')";
						var mParameters = {
							async: false,
							filters: null,
							urlParameters: null,
							success: function() {
								/*	var Message = "Yabancı Dil Silindi.";
									sap.m.MessageToast.show(Message);*/

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

						oModel.read("/ZHRTerfiYDSet", null, ["$filter=" + perFilter], true,
							function(oData) {
								oLangModel.setData(oData);
							});
						oView.setModel(oLangModel, "LangModel");
						var langtable = oView.byId("idLanguageTable3");
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
			var oList = oView.byId("idAbilityTable3");
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
						var sReadURL = "/ZHRTerfiZBSet(Pernr='" + oEntryZihin.Pernr + "',SinavTuru='" + oEntryZihin.SinavTuru + "')";
						var mParameters = {
							async: false,
							filters: null,
							urlParameters: null,
							success: function() {
								/*	var Message = "Zihinsel Beceri Silindi.";
									sap.m.MessageToast.show(Message);*/

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

						oModel.read("/ZHRTerfiZBSet", null, ["$filter=" + perFilter], true,
							function(oData) {
								oZihinModel.setData(oData);
							});
						oView.setModel(oZihinModel, "oZihinModel");
						var zihintable = oView.byId("idAbilityTable3");
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
		onPressPD: function() {
			var pernr = vPernr;
			var oView = this.getView();
			var oList = oView.byId("idPDTable3");
			var oSelectedItem = oList.getSelectedItem();
			var oDialogPD;

			//secilenin verileri tablodan alma
			var vTarih = oSelectedItem.getCells()[0].getText();
			var vSonuc = oSelectedItem.getCells()[1].getText();
			var vPuan = oSelectedItem.getCells()[2].getText();

			var oTarih = new sap.ui.commons.TextField({
				value: vTarih,
				enabled: false
			});
			var oSonuc = new sap.ui.commons.TextField({
				value: vSonuc,
				enabled: false
			});
			var oPuan = new sap.ui.commons.TextField({
				value: vPuan,
				enabled: false
			});

			var oFormPD = new sap.ui.layout.form.SimpleForm({
				editable: false,
				content: [
					new sap.ui.commons.Label({
						text: "Tarih"
					}), oTarih,
					new sap.ui.commons.Label({
						text: "Sonuç"
					}), oSonuc,
					new sap.ui.commons.Label({
						text: "Puan"
					}), oPuan
				]
			});

			oDialogPD = new sap.m.Dialog({
				title: "Performans Değerlendirme Sonuç Bilgisi",
				rightButton: new sap.m.Button({
					text: "Sil",
					type: sap.m.ButtonType.Emphasized,
					icon: "sap-icon://delete",
					press: function() {
						/* buraya yabancı dil ekleyebilmek için servis eklenecek*/
						var oEntryPD = {};
						var tarih, array, count;

						try {
							array = vTarih.split(".");
							count = array[0].length;
							if (count === 1) {
								array[0] = "0" + array[0];
							}
							tarih = array[2] + array[1] + array[0];
						} catch (err) {
							array = vTarih.split("/");
							count = array[0].length;
							if (count === 1) {
								array[0] = "0" + array[0];
							}
							tarih = array[2] + array[1] + array[0];
						}

						oEntryPD.Pdyear = tarih;
						oEntryPD.Pdsonuc = vSonuc;
						oEntryPD.Pdpuan = vPuan;
						oEntryPD.Pernr = pernr;

						// begin of ycoskun yabancı dilleri silme
						var sReadURL = "/ZHRTerfiPDSet(Pernr='" + oEntryPD.Pernr + "',Pdyear='" + oEntryPD.Pdyear + "')";
						var mParameters = {
							async: false,
							filters: null,
							urlParameters: null,
							success: function() {

							},
							error: function() {
								var Message = "Bağlantı Hatası!";
								sap.m.MessageToast.show(Message);
							}
						};
						oModel.remove(sReadURL, mParameters);
						oModel.refresh(true);
						// end of ycoskun

						var oPDModel = new sap.ui.model.json.JSONModel();
						var perFilter = "Pernr eq '" + pernr + "'";

						oModel.read("/ZHRTerfiPDSet", null, ["$filter=" + perFilter], true,
							function(oData) {
								oPDModel.setData(oData);
							});
						oView.setModel(oPDModel, "oPDModel");
						var pdtable = oView.byId("idPDTable3");
						pdtable.setModel(oView.getModel("oPDModel"));
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
				content: [oFormPD]
			});

			oDialogPD.open();

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
		},
		onSelect: function() {
			var that = this;
			var osJsonStelOrg = new sap.ui.model.json.JSONModel();
			var vStell, vOrg,vStellText,vOrgText;
			var vPosition = sap.ui.getCore().cPosition;
			var arrayPos = vPosition.split("/");
			var vPos = arrayPos[0];
			that.getView().byId("InputPosAd3").setValue(sap.ui.getCore().cPosition);
			that.oMessageDialog.close();
			that.oMessageDialog.destroy();

			oModel.read("/StelOrgGetirSet('" + vPos + "')", null, null, false,
				function(oData) {
					osJsonStelOrg.setData(oData);
					vStell = oData.Stell;
					vOrg = oData.Orgeh;
					vStellText = oData.Stext;
					vOrgText = oData.Otext;
					

					that.getView().byId("InputIsAnahtari3").setValue(vStell + " / " + vStellText);
					that.getView().byId("InputOrgBirim3").setValue(vOrg + " / " + vOrgText);

					that.getView().byId("InputIsAnahtari3").setEnabled(false);
					that.getView().byId("InputOrgBirim3").setEnabled(false);


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