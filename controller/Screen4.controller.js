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

	var WizardController = Controller.extend("ZHR_144.controller.Screen4", {

		onInit: function() {

			this._wizard = this.getView().byId("CreateProductWizard4");
			this._oNavContainer = this.getView().byId("wizardNavContainer");
			this._oWizardContentPage = this.getView().byId("wizardContentPage4");
			this._oWizardReviewPage = sap.ui.xmlfragment("ZHR_144.view.Screen4ReviewPage", this);
			this._oNavContainer.addPage(this._oWizardReviewPage);
			this.model = new sap.ui.model.json.JSONModel();
			this.model.setData({});

			this.getView().setModel(this.model);
			this.model.setProperty("/productType", "Mobile");
			this.model.setProperty("/navApiEnabled", true);
			this.model.setProperty("/productVAT", false);
			this._setEmptyValue("/productManufacturer");
			this._setEmptyValue("/productDescription");
			this._setEmptyValue("/productPrice");

			var osModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZHR_144_SRV_01");
			osModel.setSizeLimit(99999);
			osModel.read("/PerAlanSet", null, null, true,

				function(oData) {
					osJsonPerAlan.setData(oData);
				},
				function() {

				});
			osModel.read("/IsAlaniSet", null, null, true,

				function(oData) {
					osJsonIsAlan.setData(oData);
				},
				function() {

				});
			osModel.read("/CalisanGrSet", null, null, true,

				function(oData) {
					osJson.setData(oData);
				},
				function() {

				});

			osModel.read("/CalisanAltGrSet", null, null, true,

				function(oData) {
					osJsonClsALtGrb.setData(oData);
				},
				function() {

				});
			osModel.read("/SkalaKoduSet", null, null, true,

				function(oData) {
					osJsonSkala.setData(oData);
				},
				function() {

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
					that.getView().byId("InputIsAlan4").setValue(oSelectedItem.getDescription() + " / " + oSelectedItem.getTitle());
					that.additionalInfoValidation();
				}
			};
			if (!this._valueHelpSelectDialogIsAlan4) {
				this._valueHelpSelectDialogIsAlan4 = new sap.m.SelectDialog("valueHelpSelectDialogIsAlan4", {
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

				this._valueHelpSelectDialogIsAlan4.setModel(osJsonIsAlan);

			} else {
				this._valueHelpSelectDialogIsAlan4.setModel(osJsonIsAlan);
			}
			this._valueHelpSelectDialogIsAlan4.open();

		},
		handleValueHelpSkala: function() {
			var that = this;
			var handleClose = function(oEvent) {
				var oSelectedItem = oEvent.getParameter("selectedItem");
				if (oSelectedItem) {
					that.getView().byId("InputSkala4").setValue(oSelectedItem.getDescription() + " / " + oSelectedItem.getTitle());
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
					that.getView().byId("InputCalisanAlt4").setValue(oSelectedItem.getDescription() + " / " + oSelectedItem.getTitle());
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
					that.getView().byId("InputCalisanGrp4").setValue(oSelectedItem.getDescription() + " / " + oSelectedItem.getTitle());
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
		handleValueHelpPerA: function() {
			var that = this;
			var handleClose = function(oEvent) {
				var oSelectedItem = oEvent.getParameter("selectedItem");
				if (oSelectedItem) {
					that.getView().byId("InputPerAlan4").setValue(oSelectedItem.getDescription() + " / " + oSelectedItem.getTitle());
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
					that.getView().byId("InputPerAltAlan4").setValue(oSelectedItem.getDescription() + " / " + oSelectedItem.getTitle());
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
			this._wizard.validateStep(this.getView().byId("ProductTypeStep4"));
		},
		setProductTypeFromSegmented: function(evt) {
			var productType = evt.mParameters.button.getText();
			this.model.setProperty("/productType", productType);
			this._wizard.validateStep(this.getView().byId("ProductTypeStep4"));
		},

		additionalInfoValidation: function() {

			var cls4 = this.getView().byId("InputCalisanGrp4").getValue();
			var perAlan4 = this.getView().byId("InputPerAlan4").getValue();
			var clsAlt4 = this.getView().byId("InputCalisanAlt4").getValue();
			var isAlan4 = this.getView().byId("InputIsAlan4").getValue();

			if (perAlan4.length < 4 || isAlan4.length < 4 || cls4.length < 1 || clsAlt4.length < 2) {
				this._wizard.invalidateStep(this.getView().byId("YeniStep4"));
			} else {
				this._wizard.validateStep(this.getView().byId("YeniStep4"));
			}
		},

		optionalStepActivation: function() {},

		optionalStepCompletion: function() {},
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
		stepLanguage: function() {
			//begin of ycoskun  Personel Verilerini erp tabloya atma 

			var that = this;
			var oEntryTerfiPersonel = {};

			var entryPosAd4 = "InputPosAd4";
			var entryPerAlan4 = "InputPerAlan4";
			var entryPerAltAlan4 = "InputPerAltAlan4";
			var entryisAlan4 = "InputIsAlan4";
			var entrySirket4 = "InputSirket4";
			var entryisAnahtar4 = "InputIsAnahtari4";
			var entryorgBirim4 = "InputOrgBirim4";
			var entryclsGrup4 = "InputCalisanGrp4";
			var entryclsAltGrup4 = "InputCalisanAlt4";
			var entryskalaKod4 = "InputSkala4";
			var entryucret4 = "InputUcret4";
			var entryDilPrim4 = "InputDilPrim4";
			var entryAracPrim4 = "InputAracPrim4";
			var entryMevPrim4 = "InputMevPrim4";
			var entryVekPrim4 = "InputVekPrim4";
			var entryDiger4 = "InputDiger4";
			var entrySicilNo = "sicilNo4";
			var entryAdSoyad4 = "adSoyad4";
			var entrydogumTarih4 = "dogumTarih4";
			var entryTckno4 = "idTC4";
			var entrygecerTarih4 = "gecerTarih4";
			var entryOkulTur = "okulTur4";
			var entryOkulAdi = "okulAd4";
			var entryEgitim = "egitim4";

			oEntryTerfiPersonel.Appnr = "01";
			oEntryTerfiPersonel.Pronr = "04";
			oEntryTerfiPersonel.Pernr = that.getView().byId(entrySicilNo).getValue();
			oEntryTerfiPersonel.Ename = that.getView().byId(entryAdSoyad4).getValue();
			oEntryTerfiPersonel.Tckno = that.getView().byId(entryTckno4).getValue();
			oEntryTerfiPersonel.Gbdat = that.getView().byId(entrydogumTarih4).getValue();
			oEntryTerfiPersonel.Begda = that.getView().byId(entrygecerTarih4).getValue();
			oEntryTerfiPersonel.Plans = that.getView().byId(entryPosAd4).getValue();
			oEntryTerfiPersonel.Bukrs = that.getView().byId(entrySirket4).getValue();
			oEntryTerfiPersonel.Stell = that.getView().byId(entryisAnahtar4).getValue();
			oEntryTerfiPersonel.Orgeh = that.getView().byId(entryorgBirim4).getValue();
			oEntryTerfiPersonel.Bet01 = that.getView().byId(entryucret4).getValue();
			oEntryTerfiPersonel.Diger = that.getView().byId(entryDiger4).getValue();
			oEntryTerfiPersonel.Dilpr = that.getView().byId(entryDilPrim4).getValue();
			oEntryTerfiPersonel.Arcpr = that.getView().byId(entryAracPrim4).getValue();
			oEntryTerfiPersonel.Mvspr = that.getView().byId(entryMevPrim4).getValue();
			oEntryTerfiPersonel.Vklpr = that.getView().byId(entryVekPrim4).getValue();
			oEntryTerfiPersonel.Slart = that.getView().byId(entryOkulTur).getValue();
			oEntryTerfiPersonel.Insti = that.getView().byId(entryOkulAdi).getValue();
			oEntryTerfiPersonel.Fach1 = that.getView().byId(entryEgitim).getValue();

			//split edip kodu backende yollama begin of ycoskun
			var plans = that.getView().byId(entryPosAd4).getValue();
			var arrayPlans = plans.split(" / ");
			oEntryTerfiPersonel.Plans = arrayPlans[0];

			var fach1 = that.getView().byId(entryEgitim).getValue();
			var arrayFach1 = fach1.split(" / ");
			oEntryTerfiPersonel.Fach1 = arrayFach1[0];

			var orgeh = that.getView().byId(entryorgBirim4).getValue();
			var arrayOrgeh = orgeh.split(" / ");
			oEntryTerfiPersonel.Orgeh = arrayOrgeh[0];

			var slart = that.getView().byId(entryOkulTur).getValue();
			var arraySlart = slart.split(" / ");
			oEntryTerfiPersonel.Slart = arraySlart[0];

			var stell = that.getView().byId(entryisAnahtar4).getValue();
			var arrayStell = stell.split(" / ");
			oEntryTerfiPersonel.Stell = arrayStell[0];

			var werks = that.getView().byId(entryPerAlan4).getValue();
			var arrayWerks = werks.split(" / ");
			oEntryTerfiPersonel.Werks = arrayWerks[0];

			var btrtl = that.getView().byId(entryPerAltAlan4).getValue();
			var arrayBtrtl = btrtl.split(" / ");
			oEntryTerfiPersonel.Btrtl = arrayBtrtl[0];

			var gsber = that.getView().byId(entryisAlan4).getValue();
			var arrayGsber = gsber.split(" / ");
			oEntryTerfiPersonel.Gsber = arrayGsber[0];

			var persg = that.getView().byId(entryclsGrup4).getValue();
			var arrayPersg = persg.split(" / ");
			oEntryTerfiPersonel.Persg = arrayPersg[0];

			var persk = that.getView().byId(entryclsAltGrup4).getValue();
			var arrayPersk = persk.split(" / ");
			oEntryTerfiPersonel.Persk = arrayPersk[0];

			var trfgr = that.getView().byId(entryskalaKod4).getValue();
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
			var langtable = oThat.getView().byId("idLanguageTable4");
			langtable.setModel(this.getView().getModel("LangModel"));
			//end of ycoskun

			this._wizard.validateStep(this.getView().byId("idBeceri4"));

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
			var langtable = oThat.getView().byId("idAbilityTable4");
			langtable.setModel(this.getView().getModel("oAbModel"));

			//end of ycoskun

		//	this._wizard.validateStep(this.getView().byId("PricingStep4"));

		},

		pricingActivate: function() {
			var that = this;
		/*	var sicilNo = "sicilNo4";
			var oPDModel = new sap.ui.model.json.JSONModel();
			vPernr = that.getView().byId(sicilNo).getValue();
			var perFilter = "Pernr eq '" + vPernr + "'";
			var oThat = this;

			oModel.read("/ZHRTerfiPDSet", null, ["$filter=" + perFilter], true,
				function(oData) {
					oPDModel.setData(oData);

				});
			oThat.getView().setModel(oPDModel, "PDModel");
			var pdtable = oThat.getView().byId("idPDTable4");
			pdtable.setModel(this.getView().getModel("PDModel"));*/
			
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
			var langtable = oThat.getView().byId("idAbilityTable4");
			langtable.setModel(this.getView().getModel("oAbModel"));

			//end of ycoskun

			this.model.setProperty("/navApiEnabled", true);
		},

		pricingComplete: function() {
			this.model.setProperty("/navApiEnabled", false);
		},

		scrollFrom4to2: function() {
			this._wizard.goToStep(this.getView().byId("ProductInfoStep4"));
		},
		goFrom4to3: function() {
			if (this._wizard.getProgressStep() === this.getView().byId("PricingStep4"))
				this._wizard.previousStep();
		},
		goFrom4to5: function() {
			if (this._wizard.getProgressStep() === this.getView().byId("PricingStep4"))
				this._wizard.nextStep();
		},

		wizardCompletedHandler: function() {

			var that = this;
			var oEntry = [];
			var oTerfiPersonel = [];

			var entryfisKonu4 = "fisKonu4";
			var entrysicilNo4 = "sicilNo4";
			var entryadSoyad4 = "adSoyad4";
			var entrytc4 = "idTC4";
			var entrydogumTarih4 = "dogumTarih4";
			var entrygecerTarih4 = "gecerTarih4";
			var entryPosAd4 = "PosAd4";
			var entryperAlan4 = "perAlan4";
			var entryperAltAlan4 = "perAltAlan4";
			var entryisAlan4 = "isAlan4";
			var entrysirket4 = "sirket4";
			var entryisAnahtar4 = "isAnahtari4";
			var entryorgBirim4 = "orgBirim4";
			var entryclsGrup4 = "calisanGrp4";
			var entryclsAltGrup4 = "calisanAlt4";
			var entryskalaKod4 = "skala4";
			var entryucret4 = "ucret4";
			var entrydilPrim4 = "dilPrim4";
			var entryaracPrim4 = "aracPrim4";
			var entrymevPrim4 = "mevPrim4";
			var entryvekPrim4 = "vekPrim4";
			var entrydiger4 = "diger4";

			var entryinputPosAd4 = "InputPosAd4";
			var entryinputPerAlan4 = "InputPerAlan4";
			var entryinputPerAltAlan4 = "InputPerAltAlan4";
			var entryinputIsAlan4 = "InputIsAlan4";
			var entryinputSirket4 = "InputSirket4";
			var entryinputIsAnahtar4 = "InputIsAnahtari4";
			var entryinputOrgBirim4 = "InputOrgBirim4";
			var entryinputClsGrup4 = "InputCalisanGrp4";
			var entryinputClsAltGrup4 = "InputCalisanAlt4";
			var entryinputSkalaKod4 = "InputSkala4";
			var entryinputUcret4 = "InputUcret4";
			var entryinputDilPrim4 = "InputDilPrim4";
			var entryinputAracPrim4 = "InputAracPrim4";
			var entryinputMevPrim4 = "InputMevPrim4";
			var entryinputVekPrim4 = "InputVekPrim4";
			var entryinputDiger4 = "InputDiger4";
			var entryokul4 = "okulTur4";
			var entryokulAd4 = "okulAd4";
			var entryegitim4 = "egitim4";

			var pernr = vPernr;

			oEntry[entryfisKonu4] = that.getView().byId(entryfisKonu4).getValue();
			oEntry[entrysicilNo4] = that.getView().byId(entrysicilNo4).getValue();
			oEntry[entryadSoyad4] = that.getView().byId(entryadSoyad4).getValue();
			oEntry[entrytc4] = that.getView().byId(entrytc4).getValue();
			oEntry[entrydogumTarih4] = that.getView().byId(entrydogumTarih4).getValue();
			oEntry[entrygecerTarih4] = that.getView().byId(entrygecerTarih4).getValue();
			oEntry[entryPosAd4] = that.getView().byId(entryPosAd4).getValue();
			oEntry[entryperAlan4] = that.getView().byId(entryperAlan4).getValue();
			oEntry[entryperAltAlan4] = that.getView().byId(entryperAltAlan4).getValue();
			oEntry[entryisAlan4] = that.getView().byId(entryisAlan4).getValue();
			oEntry[entrysirket4] = that.getView().byId(entrysirket4).getValue();
			oEntry[entryisAnahtar4] = that.getView().byId(entryisAnahtar4).getValue();
			oEntry[entryorgBirim4] = that.getView().byId(entryorgBirim4).getValue();
			oEntry[entryclsGrup4] = that.getView().byId(entryclsGrup4).getValue();
			oEntry[entryclsAltGrup4] = that.getView().byId(entryclsAltGrup4).getValue();
			oEntry[entryskalaKod4] = that.getView().byId(entryskalaKod4).getValue();
			oEntry[entryucret4] = that.getView().byId(entryucret4).getValue();
			oEntry[entrydilPrim4] = that.getView().byId(entrydilPrim4).getValue();
			oEntry[entryaracPrim4] = that.getView().byId(entryaracPrim4).getValue();
			oEntry[entrymevPrim4] = that.getView().byId(entrymevPrim4).getValue();
			oEntry[entryvekPrim4] = that.getView().byId(entryvekPrim4).getValue();
			oEntry[entrydiger4] = that.getView().byId(entrydiger4).getValue();

			oEntry[entryinputPosAd4] = that.getView().byId(entryinputPosAd4).getValue();
			oEntry[entryinputPerAlan4] = that.getView().byId(entryinputPerAlan4).getValue();
			oEntry[entryinputPerAltAlan4] = that.getView().byId(entryinputPerAltAlan4).getValue();
			oEntry[entryinputIsAlan4] = that.getView().byId(entryinputIsAlan4).getValue();
			oEntry[entryinputSirket4] = that.getView().byId(entryinputSirket4).getValue();
			oEntry[entryinputIsAnahtar4] = that.getView().byId(entryinputIsAnahtar4).getValue();
			oEntry[entryinputOrgBirim4] = that.getView().byId(entryinputOrgBirim4).getValue();
			oEntry[entryinputClsGrup4] = that.getView().byId(entryinputClsGrup4).getValue();
			oEntry[entryinputClsAltGrup4] = that.getView().byId(entryinputClsAltGrup4).getValue();
			oEntry[entryinputSkalaKod4] = that.getView().byId(entryinputSkalaKod4).getValue();
			oEntry[entryinputUcret4] = that.getView().byId(entryinputUcret4).getValue();
			oEntry[entryinputDilPrim4] = that.getView().byId(entryinputDilPrim4).getValue();
			oEntry[entryinputAracPrim4] = that.getView().byId(entryinputAracPrim4).getValue();
			oEntry[entryinputMevPrim4] = that.getView().byId(entryinputMevPrim4).getValue();
			oEntry[entryinputVekPrim4] = that.getView().byId(entryinputVekPrim4).getValue();
			oEntry[entryinputDiger4] = that.getView().byId(entryinputDiger4).getValue();
			oEntry[entryokul4] = that.getView().byId(entryokul4).getValue();
			oEntry[entryokulAd4] = that.getView().byId(entryokulAd4).getValue();
			oEntry[entryegitim4] = that.getView().byId(entryegitim4).getValue();

			//console.log(oEntry);

			//terfi verilerini güncelleme ycoskun

			oTerfiPersonel.Appnr = "01";
			oTerfiPersonel.Pronr = "04";
			oTerfiPersonel.Pernr = that.getView().byId(entrysicilNo4).getValue();
			oTerfiPersonel.Ename = that.getView().byId(entryadSoyad4).getValue();
			oTerfiPersonel.Tckno = that.getView().byId(entrytc4).getValue();
			oTerfiPersonel.Gbdat = that.getView().byId(entrydogumTarih4).getValue();
			oTerfiPersonel.Begda = that.getView().byId(entrygecerTarih4).getValue();
			oTerfiPersonel.Plans = that.getView().byId(entryinputPosAd4).getValue();
			oTerfiPersonel.Bukrs = that.getView().byId(entryinputSirket4).getValue();
			oTerfiPersonel.Stell = that.getView().byId(entryinputIsAnahtar4).getValue();
			oTerfiPersonel.Orgeh = that.getView().byId(entryinputOrgBirim4).getValue();
			oTerfiPersonel.Bet01 = that.getView().byId(entryinputUcret4).getValue();
			oTerfiPersonel.Diger = that.getView().byId(entryinputDiger4).getValue();
			oTerfiPersonel.Dilpr = that.getView().byId(entryinputDilPrim4).getValue();
			oTerfiPersonel.Arcpr = that.getView().byId(entryinputAracPrim4).getValue();
			oTerfiPersonel.Mvspr = that.getView().byId(entryinputMevPrim4).getValue();
			oTerfiPersonel.Vklpr = that.getView().byId(entryinputVekPrim4).getValue();
			oTerfiPersonel.Slart = that.getView().byId(entryokul4).getValue();
			oTerfiPersonel.Insti = that.getView().byId(entryokulAd4).getValue();
			oTerfiPersonel.Fach1 = that.getView().byId(entryegitim4).getValue();

			//split edip kodu backende yollama begin of ycoskun
			var plans = that.getView().byId(entryinputPosAd4).getValue();
			var arrayPlans = plans.split(" / ");
			oTerfiPersonel.Plans = arrayPlans[0];

			var fach1 = that.getView().byId(entryegitim4).getValue();
			var arrayFach1 = fach1.split(" / ");
			oTerfiPersonel.Fach1 = arrayFach1[0];

			var orgeh = that.getView().byId(entryinputOrgBirim4).getValue();
			var arrayOrgeh = orgeh.split(" / ");
			oTerfiPersonel.Orgeh = arrayOrgeh[0];

			var slart = that.getView().byId(entryokul4).getValue();
			var arraySlart = slart.split(" / ");
			oTerfiPersonel.Slart = arraySlart[0];

			var stell = that.getView().byId(entryinputIsAnahtar4).getValue();
			var arrayStell = stell.split(" / ");
			oTerfiPersonel.Stell = arrayStell[0];

			var werks = that.getView().byId(entryinputPerAlan4).getValue();
			var arrayWerks = werks.split(" / ");
			oTerfiPersonel.Werks = arrayWerks[0];

			var btrtl = that.getView().byId(entryinputPerAltAlan4).getValue();
			var arrayBtrtl = btrtl.split(" / ");
			oTerfiPersonel.Btrtl = arrayBtrtl[0];

			var gsber = that.getView().byId(entryinputIsAlan4).getValue();
			var arrayGsber = gsber.split(" / ");
			oTerfiPersonel.Gsber = arrayGsber[0];

			var persg = that.getView().byId(entryinputClsGrup4).getValue();
			var arrayPersg = persg.split(" / ");
			oTerfiPersonel.Persg = arrayPersg[0];

			var persk = that.getView().byId(entryinputClsAltGrup4).getValue();
			var arrayPersk = persk.split(" / ");
			oTerfiPersonel.Persk = arrayPersk[0];

			var trfgr = that.getView().byId(entryinputSkalaKod4).getValue();
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

			that.getElement("fisKonuRew4").setValue(oEntry.fisKonu4);
			that.getElement("sicilNoRew4").setValue(oEntry.sicilNo4);
			that.getElement("adSoyadRew4").setValue(oEntry.adSoyad4);
			that.getElement("tcRew4").setValue(oEntry.idTC4);
			that.getElement("dogumTarihRew4").setValue(this.vDate(oEntry.dogumTarih4));
			that.getElement("gecerTarihRew4").setValue(this.vDate(oEntry.gecerTarih4));

			that.getElement("PosAdRew4").setValue(oEntry.PosAd4);
			that.getElement("perAlanRew4").setValue(oEntry.perAlan4);
			that.getElement("perAltAlanRew4").setValue(oEntry.perAltAlan4);
			that.getElement("isAlanRew4").setValue(oEntry.isAlan4);
			that.getElement("sirketRew4").setValue(oEntry.sirket4);
			that.getElement("isAnahRew4").setValue(oEntry.isAnahtari4);
			that.getElement("orgBirRew4").setValue(oEntry.orgBirim4);
			that.getElement("clsRew4").setValue(oEntry.calisanGrp4);
			that.getElement("clsAltRew4").setValue(oEntry.calisanAlt4);
			that.getElement("skalaRew4").setValue(oEntry.skala4);
			that.getElement("ucretRew4").setValue(oEntry.ucret4);
			that.getElement("dilPrimRew4").setValue(oEntry.dilPrim4);
			that.getElement("aracPrimRew4").setValue(oEntry.aracPrim4);
			that.getElement("mevPrimRew4").setValue(oEntry.mevPrim4);
			that.getElement("vekPrimRew4").setValue(oEntry.vekPrim4);
			that.getElement("digerRew4").setValue(oEntry.diger4);

			that.getElement("inputPosAdRew4").setValue(oEntry.InputPosAd4);
			that.getElement("inputPerAlanRew4").setValue(oEntry.InputPerAlan4);
			that.getElement("inputPerAltAlanRew4").setValue(oEntry.InputPerAltAlan4);
			that.getElement("inputsirketRew4").setValue(oEntry.InputIsAlan4);
			that.getElement("inputIsAlanRew4").setValue(oEntry.InputSirket4);
			that.getElement("inputIsAnahRew4").setValue(oEntry.InputIsAnahtari4);
			that.getElement("inputOrgBirRew4").setValue(oEntry.InputOrgBirim4);
			that.getElement("inputClsRew4").setValue(oEntry.InputCalisanGrp4);
			that.getElement("inputClsAltRew4").setValue(oEntry.InputCalisanAlt4);
			that.getElement("inputSkalaRew4").setValue(oEntry.InputSkala4);
			that.getElement("inputUcretRew4").setValue(oEntry.InputUcret4);
			that.getElement("inputDilPrimRew4").setValue(oEntry.InputDilPrim4);
			that.getElement("inputAracPrimRew4").setValue(oEntry.InputAracPrim4);
			that.getElement("inputMevPrimRew4").setValue(oEntry.InputMevPrim4);
			that.getElement("inputVekPrimRew4").setValue(oEntry.InputVekPrim4);
			that.getElement("inputDigerRew4").setValue(oEntry.InputDiger4);
			that.getElement("okulRew4").setValue(oEntry.okulTur4);
			that.getElement("okulAdRew4").setValue(oEntry.okulAd4);
			that.getElement("egitimRew4").setValue(oEntry.egitim4);

			//begin of ycoskun verilerin globalde tutulması islemleri
			sap.ui.getCore().cPernr = that.getView().byId(entrysicilNo4).getValue();
			sap.ui.getCore().cPronr = "04";
			sap.ui.getCore().cAppnr = "01";
			sap.ui.getCore().cAdSoyad = that.getView().byId(entryadSoyad4).getValue();
			sap.ui.getCore().cDogumTarih = that.getView().byId(entrydogumTarih4).getValue();
			sap.ui.getCore().cGecerTarih = that.getView().byId(entrygecerTarih4).getValue();
			sap.ui.getCore().cTC = that.getView().byId(entrytc4).getValue();

			sap.ui.getCore().cPozisyon = oEntry.InputPosAd4;
			sap.ui.getCore().cPerAlan = oEntry.InputPerAlan4;
			sap.ui.getCore().cPerAltAlan = oEntry.InputPerAltAlan4;
			sap.ui.getCore().cIsAlan = oEntry.InputIsAlan4;
			sap.ui.getCore().cSirket = oEntry.InputSirket4;
			sap.ui.getCore().cIsAnahtari = oEntry.InputIsAnahtari4;
			sap.ui.getCore().cOrgBirim = oEntry.InputOrgBirim4;
			sap.ui.getCore().cClsGrup = oEntry.InputCalisanGrp4;
			sap.ui.getCore().cClsAltGrp = oEntry.InputCalisanAlt4;
			sap.ui.getCore().cSkala = oEntry.InputSkala4;
			sap.ui.getCore().cUcret = oEntry.InputUcret4;
			sap.ui.getCore().cDilPrim = oEntry.InputDilPrim4;
			sap.ui.getCore().cAracPrim = oEntry.InputAracPrim4;
			sap.ui.getCore().cMevPrim = oEntry.InputMevPrim4;
			sap.ui.getCore().cVekPrim = oEntry.InputVekPrim4;
			sap.ui.getCore().cDiger = oEntry.InputDiger4;

			sap.ui.getCore().cOkulTur = that.getView().byId(entryokul4).getValue();
			sap.ui.getCore().cOkulAd = that.getView().byId(entryokulAd4).getValue();
			sap.ui.getCore().cEgitim = that.getView().byId(entryegitim4).getValue();

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
			var langtable = sap.ui.getCore().byId("idLang4");
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
			var zihintable = sap.ui.getCore().byId("idExamZihin4");
			zihintable.setModel(this.getView().getModel("oAbModel"));
			//end of ycoskun

			//begin of ycoskun pd sonucları listele 
		/*	var oPdModel = new sap.ui.model.json.JSONModel();
			var perPbFilter = "Pernr eq '" + pernr + "'";

			oModel.read("/ZHRTerfiPDSet", null, ["$filter=" + perPbFilter], true,
				function(oData) {
					oPdModel.setData(oData);
					//	console.log(oData);
				});
			oThat.getView().setModel(oPdModel, "oPdModel");
			var pdtable = sap.ui.getCore().byId("idPd4");
			pdtable.setModel(oThat.getView().getModel("oPdModel"));*/
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
			this._wizard.discardProgress(this.getView().byId("ProductTypeStep4"));
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

			oLang = new sap.m.ComboBox("box_default4", {
				items: {
					path: "/results",
					template: itemTemplate
				},
				selectionChange: function(oEvent) {
					selectLang = oEvent.oSource.getSelectedKey();
					sap.ui.getCore().byId("oLanguage4").setValue(selectLang);
				}
			});
			sap.ui.getCore().byId("box_default4").setModel(osJsonYabanciDil);

			oLanguage = new sap.ui.commons.TextField("oLanguage4", {
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

						oEntry.Sptxt = sap.ui.getCore().byId("box_default4").getValue();
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
						var langtable = oView.byId("idLanguageTable4");
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

			oExam = new sap.m.ComboBox("idAbility4", {
				items: {
					path: "/results",
					template: itemTemplate
				},
				selectionChange: function(oEvent) {
					selectAbility = oEvent.oSource.getSelectedKey();
				}
			});
			sap.ui.getCore().byId("idAbility4").setModel(osJsonSinavTur);

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
						var abtable = oView.byId("idAbilityTable4");
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
						/*var oPDModel = new sap.ui.model.json.JSONModel();
						var perFilter = "Pernr eq '" + pernr + "'";

						oModel.read("/ZHRTerfiPDSet", null, ["$filter=" + perFilter], true,
							function(oData) {
								oPDModel.setData(oData);
							});
						oView.setModel(oPDModel, "PDModel");
						var pdtable = oView.byId("idPDTable4");
						pdtable.setModel(oView.getModel("PDModel"));*/
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
			this.getOwnerComponent().getRouter().navTo("screen4Approve");
		},
		onBackScreen: function() {
			this.getOwnerComponent().getRouter().navTo("PersonalActivity");
			window.location.reload();

		},
		handleSicilNoSearch: function() {

			//begin of ycoskun sicilno girip tıklayınca verileri getirme

			var oThat = this;
			var sicilNo = oThat.getView().byId("sicilNo4").getValue();
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

			this.getView().byId("fisKonu4").setValue("Nakil");
			this.getView().byId("sicilNo4").setValue(sicilNo);
			this.getView().byId("adSoyad4").setValue(Terfi.Ename);
			this.getView().byId("idTC4").setValue(Terfi.Tckno);
			this.getView().byId("dogumTarih4").setValue(Terfi.Gbdat);
			this.getView().byId("gecerTarih4").setValue(Terfi.Endda);
			this.getView().byId("PosAd4").setValue(Terfi.Plans + " / " + Terfi.Stext);
			this.getView().byId("sirket4").setValue(Terfi.Bukrs);
			this.getView().byId("isAlan4").setValue(Terfi.Gsber + " / " + Terfi.Gtext);
			this.getView().byId("isAnahtari4").setValue(Terfi.Stell + " / " + Terfi.StellTxt);
			this.getView().byId("orgBirim4").setValue(Terfi.Orgeh + " / " + Terfi.OrgehTxt);
			this.getView().byId("calisanGrp4").setValue(Terfi.Persg + " / " + Terfi.Psgtext);
			this.getView().byId("calisanAlt4").setValue(Terfi.Persk + " / " + Terfi.Psktext);
			this.getView().byId("skala4").setValue(Terfi.Trfgr);
			this.getView().byId("ucret4").setValue(Terfi.Ucret);
			this.getView().byId("dilPrim4").setValue(Terfi.Dilpr);
			this.getView().byId("aracPrim4").setValue(Terfi.Arcpr);
			this.getView().byId("mevPrim4").setValue(Terfi.Mevpr);
			this.getView().byId("vekPrim4").setValue(Terfi.Vklpr);
			this.getView().byId("diger4").setValue(Terfi.Diger);
			this.getView().byId("perAlan4").setValue(Terfi.Werks + " / " + Terfi.Pbtxt);
			this.getView().byId("perAltAlan4").setValue(Terfi.Btrtl + " / " + Terfi.Btext);
			this.getView().byId("okulTur4").setValue(Terfi.Slart + " / " + Terfi.SlartTxt);
			this.getView().byId("okulAd4").setValue(Terfi.Insti);
			this.getView().byId("egitim4").setValue(Terfi.Fach1 + " / " + Terfi.Ftext);

			this.getView().byId("InputPosAd4").setValue(Terfi.Plans + " / " + Terfi.Stext);
			this.getView().byId("InputSirket4").setValue(Terfi.Bukrs);
			this.getView().byId("InputIsAlan4").setValue(Terfi.Gsber + " / " + Terfi.Gtext);
			this.getView().byId("InputIsAnahtari4").setValue(Terfi.Stell + " / " + Terfi.StellTxt);
			this.getView().byId("InputOrgBirim4").setValue(Terfi.Orgeh + " / " + Terfi.OrgehTxt);
			this.getView().byId("InputCalisanGrp4").setValue(Terfi.Persg + " / " + Terfi.Psgtext);
			this.getView().byId("InputCalisanAlt4").setValue(Terfi.Persk + " / " + Terfi.Psktext);
			this.getView().byId("InputSkala4").setValue(Terfi.Trfgr);
			this.getView().byId("InputUcret4").setValue(Terfi.Ucret);
			this.getView().byId("InputDilPrim4").setValue(Terfi.Dilpr);
			this.getView().byId("InputAracPrim4").setValue(Terfi.Arcpr);
			this.getView().byId("InputMevPrim4").setValue(Terfi.Mvspr);
			this.getView().byId("InputVekPrim4").setValue(Terfi.Vklpr);
			this.getView().byId("InputDiger4").setValue(Terfi.Diger);
			this.getView().byId("InputPerAlan4").setValue(Terfi.Werks + " / " + Terfi.Pbtxt);
			this.getView().byId("InputPerAltAlan4").setValue(Terfi.Btrtl + " / " + Terfi.Btext);

			//end of ycoskun

		},
		onPressLang: function() {
			var pernr = vPernr;
			var oView = this.getView();
			var oList = oView.byId("idLanguageTable4");
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
						var langtable = oView.byId("idLanguageTable4");
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
			var oList = oView.byId("idAbilityTable4");
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
						oEntryZihin.Tavan = vTarih;
						oEntryZihin.Pernr = pernr;

						// begin of ycoskun yabancı dilleri silme
						var sReadURL = "/ZHRTerfiZBSet(Pernr='" + oEntryZihin.Pernr + "',SinavTuru='" + oEntryZihin.SinavTuru + "')";
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

						var oZihinModel = new sap.ui.model.json.JSONModel();
						var perFilter = "Pernr eq '" + pernr + "'";

						oModel.read("/ZHRTerfiZBSet", null, ["$filter=" + perFilter], true,
							function(oData) {
								oZihinModel.setData(oData);
							});
						oView.setModel(oZihinModel, "oZihinModel");
						var zihintable = oView.byId("idAbilityTable4");
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
			var oList = oView.byId("idPDTable4");
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

						/*var oPDModel = new sap.ui.model.json.JSONModel();
						var perFilter = "Pernr eq '" + pernr + "'";

						oModel.read("/ZHRTerfiPDSet", null, ["$filter=" + perFilter], true,
							function(oData) {
								oPDModel.setData(oData);
							});
						oView.setModel(oPDModel, "oPDModel");
						var pdtable = oView.byId("idPDTable4");
						pdtable.setModel(oView.getModel("oPDModel"));*/
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
			that.getView().byId("InputPosAd4").setValue(sap.ui.getCore().cPosition);
			that.oMessageDialog.close();
			that.oMessageDialog.destroy();

			oModel.read("/StelOrgGetirSet('" + vPos + "')", null, null, false,
				function(oData) {
					osJsonStelOrg.setData(oData);
					vStell = oData.Stell;
					vOrg = oData.Orgeh;
					vStellText = oData.Stext;
					vOrgText = oData.Otext;

					that.getView().byId("InputIsAnahtari4").setValue(vStell + " / " + vStellText);
					that.getView().byId("InputOrgBirim4").setValue(vOrg + " / " + vOrgText);

					that.getView().byId("InputIsAnahtari4").setEnabled(false);
					that.getView().byId("InputOrgBirim4").setEnabled(false);

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