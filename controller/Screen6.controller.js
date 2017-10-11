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

	var WizardController = Controller.extend("ZHR_144.controller.Screen6", {

		onInit: function() {

			this._wizard = this.getView().byId("CreateProductWizard6");
			this._oNavContainer = this.getView().byId("wizardNavContainer");
			this._oWizardContentPage = this.getView().byId("wizardContentPage6");
			this._oWizardReviewPage = sap.ui.xmlfragment("ZHR_144.view.Screen6ReviewPage", this);
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
					that.getView().byId("InputIsAlan6").setValue(oSelectedItem.getDescription() + " / " + oSelectedItem.getTitle());
					that.additionalInfoValidation();
				}
			};
			if (!this._valueHelpSelectDialogIsAlan6) {
				this._valueHelpSelectDialogIsAlan6 = new sap.m.SelectDialog("valueHelpSelectDialogIsAlan6", {
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

				this._valueHelpSelectDialogIsAlan6.setModel(osJsonIsAlan);

			} else {
				this._valueHelpSelectDialogIsAlan6.setModel(osJsonIsAlan);
			}
			this._valueHelpSelectDialogIsAlan6.open();

		},
		handleValueHelpSkala: function() {
			var that = this;
			var handleClose = function(oEvent) {
				var oSelectedItem = oEvent.getParameter("selectedItem");
				if (oSelectedItem) {
					that.getView().byId("InputSkala6").setValue(oSelectedItem.getDescription() + " / " + oSelectedItem.getTitle());
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
					that.getView().byId("InputCalisanAlt6").setValue(oSelectedItem.getDescription() + " / " + oSelectedItem.getTitle());
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
					that.getView().byId("InputCalisanGrp6").setValue(oSelectedItem.getDescription() + " / " + oSelectedItem.getTitle());
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
					that.getView().byId("InputPerAlan6").setValue(oSelectedItem.getDescription() + " / " + oSelectedItem.getTitle());
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
					that.getView().byId("InputPerAltAlan6").setValue(oSelectedItem.getDescription() + " / " + oSelectedItem.getTitle());
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
			this._wizard.validateStep(this.getView().byId("ProductTypeStep6"));
		},
		setProductTypeFromSegmented: function(evt) {
			var productType = evt.mParameters.button.getText();
			this.model.setProperty("/productType", productType);
			this._wizard.validateStep(this.getView().byId("ProductTypeStep6"));
		},
		additionalInfoValidation: function() {
			var cls6 = this.getView().byId("InputCalisanGrp6").getValue();
			var perAlan6 = this.getView().byId("InputPerAlan6").getValue();
			var clsAlt6 = this.getView().byId("InputCalisanAlt6").getValue();
			var isAlan6 = this.getView().byId("InputIsAlan6").getValue();

			if (perAlan6.length < 4 || isAlan6.length < 4 || cls6.length < 1 || clsAlt6.length < 2) {
				this._wizard.invalidateStep(this.getView().byId("YeniStep6"));
			} else {
				this._wizard.validateStep(this.getView().byId("YeniStep6"));
			}
		},

		optionalStepActivation: function() {},

		optionalStepCompletion: function() {},

		stepLanguage: function() {
			//begin of ycoskun  Personel Verilerini erp tabloya atma 

			var that = this;
			var oEntryTerfiPersonel = {};

			var entryPosAd6 = "InputPosAd6";
			var entryPerAlan6 = "InputPerAlan6";
			var entryPerAltAlan6 = "InputPerAltAlan6";
			var entryisAlan6 = "InputIsAlan6";
			var entrySirket6 = "InputSirket6";
			var entryisAnahtar6 = "InputIsAnahtari6";
			var entryorgBirim6 = "InputOrgBirim6";
			var entryclsGrup6 = "InputCalisanGrp6";
			var entryclsAltGrup6 = "InputCalisanAlt6";
			var entryskalaKod6 = "InputSkala6";
			var entryucret6 = "InputUcret6";
			var entryDilPrim6 = "InputDilPrim6";
			var entryAracPrim6 = "InputAracPrim6";
			var entryMevPrim6 = "InputMevPrim6";
			var entryVekPrim6 = "InputVekPrim6";
			var entryDiger6 = "InputDiger6";
			var entrySicilNo = "sicilNo6";
			var entryAdSoyad6 = "adSoyad6";
			var entrydogumTarih6 = "dogumTarih6";
			var entryTckno6 = "idTC6";
			var entrygecerTarih6 = "gecerTarih6";
			var entryOkulTur = "okulTur6";
			var entryOkulAdi = "okulAd6";
			var entryEgitim = "egitim6";

			oEntryTerfiPersonel.Appnr = "01";
			oEntryTerfiPersonel.Pronr = "06";
			oEntryTerfiPersonel.Pernr = that.getView().byId(entrySicilNo).getValue();
			oEntryTerfiPersonel.Ename = that.getView().byId(entryAdSoyad6).getValue();
			oEntryTerfiPersonel.Tckno = that.getView().byId(entryTckno6).getValue();
			oEntryTerfiPersonel.Gbdat = that.getView().byId(entrydogumTarih6).getValue();
			oEntryTerfiPersonel.Begda = that.getView().byId(entrygecerTarih6).getValue();
			oEntryTerfiPersonel.Plans = that.getView().byId(entryPosAd6).getValue();
			oEntryTerfiPersonel.Bukrs = that.getView().byId(entrySirket6).getValue();
			oEntryTerfiPersonel.Stell = that.getView().byId(entryisAnahtar6).getValue();
			oEntryTerfiPersonel.Orgeh = that.getView().byId(entryorgBirim6).getValue();
			oEntryTerfiPersonel.Bet01 = that.getView().byId(entryucret6).getValue();
			oEntryTerfiPersonel.Diger = that.getView().byId(entryDiger6).getValue();
			oEntryTerfiPersonel.Dilpr = that.getView().byId(entryDilPrim6).getValue();
			oEntryTerfiPersonel.Arcpr = that.getView().byId(entryAracPrim6).getValue();
			oEntryTerfiPersonel.Mvspr = that.getView().byId(entryMevPrim6).getValue();
			oEntryTerfiPersonel.Vklpr = that.getView().byId(entryVekPrim6).getValue();
			oEntryTerfiPersonel.Slart = that.getView().byId(entryOkulTur).getValue();
			oEntryTerfiPersonel.Insti = that.getView().byId(entryOkulAdi).getValue();
			oEntryTerfiPersonel.Fach1 = that.getView().byId(entryEgitim).getValue();

			//split edip kodu backende yollama begin of ycoskun
			var plans = that.getView().byId(entryPosAd6).getValue();
			var arrayPlans = plans.split(" / ");
			oEntryTerfiPersonel.Plans = arrayPlans[0];

			var fach1 = that.getView().byId(entryEgitim).getValue();
			var arrayFach1 = fach1.split(" / ");
			oEntryTerfiPersonel.Fach1 = arrayFach1[0];

			var orgeh = that.getView().byId(entryorgBirim6).getValue();
			var arrayOrgeh = orgeh.split(" / ");
			oEntryTerfiPersonel.Orgeh = arrayOrgeh[0];

			var slart = that.getView().byId(entryOkulTur).getValue();
			var arraySlart = slart.split(" / ");
			oEntryTerfiPersonel.Slart = arraySlart[0];

			var stell = that.getView().byId(entryisAnahtar6).getValue();
			var arrayStell = stell.split(" / ");
			oEntryTerfiPersonel.Stell = arrayStell[0];

			var werks = that.getView().byId(entryPerAlan6).getValue();
			var arrayWerks = werks.split(" / ");
			oEntryTerfiPersonel.Werks = arrayWerks[0];

			var btrtl = that.getView().byId(entryPerAltAlan6).getValue();
			var arrayBtrtl = btrtl.split(" / ");
			oEntryTerfiPersonel.Btrtl = arrayBtrtl[0];

			var gsber = that.getView().byId(entryisAlan6).getValue();
			var arrayGsber = gsber.split(" / ");
			oEntryTerfiPersonel.Gsber = arrayGsber[0];

			var persg = that.getView().byId(entryclsGrup6).getValue();
			var arrayPersg = persg.split(" / ");
			oEntryTerfiPersonel.Persg = arrayPersg[0];

			var persk = that.getView().byId(entryclsAltGrup6).getValue();
			var arrayPersk = persk.split(" / ");
			oEntryTerfiPersonel.Persk = arrayPersk[0];

			var trfgr = that.getView().byId(entryskalaKod6).getValue();
			var arrayTrfgr = trfgr.split(" / ");
			oEntryTerfiPersonel.Trfgr = arrayTrfgr[0];

			//end of ycoskun

			oModel.create("/ZHRTerfiPersonelBilgiSet", oEntryTerfiPersonel, {
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
			var langtable = oThat.getView().byId("idLanguageTable6");
			langtable.setModel(this.getView().getModel("LangModel"));

			//end of ycoskun

			this._wizard.validateStep(this.getView().byId("idBeceri6"));

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
			var langtable = oThat.getView().byId("idAbilityTable6");
			langtable.setModel(this.getView().getModel("oAbModel"));
			//end of ycoskun

			this._wizard.validateStep(this.getView().byId("PricingStep6"));

		},

		pricingActivate: function() {
			var that = this;
			var sicilNo = "sicilNo6";
			var oPDModel = new sap.ui.model.json.JSONModel();
			vPernr = that.getView().byId(sicilNo).getValue();
			var perFilter = "Pernr eq '" + vPernr + "'";
			var oThat = this;

			oModel.read("/ZHRTerfiPDSet", null, ["$filter=" + perFilter], true,
				function(oData) {
					oPDModel.setData(oData);

				});
			oThat.getView().setModel(oPDModel, "PDModel");
			var pdtable = oThat.getView().byId("idPDTable6");
			pdtable.setModel(this.getView().getModel("PDModel"));

			this.model.setProperty("/navApiEnabled", true);

		},
		pricingComplete: function() {
			this.model.setProperty("/navApiEnabled", false);
		},
		scrollFrom4to2: function() {
			this._wizard.goToStep(this.getView().byId("ProductInfoStep6"));
		},
		goFrom4to3: function() {
			if (this._wizard.getProgressStep() === this.getView().byId("PricingStep6"))
				this._wizard.previousStep();
		},
		goFrom4to5: function() {
			if (this._wizard.getProgressStep() === this.getView().byId("PricingStep6"))
				this._wizard.nextStep();
		},
		wizardCompletedHandler: function() {

			var that = this;
			var oEntry = [];
			var oTerfiPersonel = [];

			var entryfisKonu6 = "fisKonu6";
			var entrysicilNo6 = "sicilNo6";
			var entryadSoyad6 = "adSoyad6";
			var entrytc6 = "idTC6";
			var entrydogumTarih6 = "dogumTarih6";
			var entrygecerTarih6 = "gecerTarih6";
			var entryPosAd6 = "PosAd6";
			var entryperAlan6 = "perAlan6";
			var entryperAltAlan6 = "perAltAlan6";
			var entryisAlan6 = "isAlan6";
			var entrysirket6 = "sirket6";
			var entryisAnahtar6 = "isAnahtari6";
			var entryorgBirim6 = "orgBirim6";
			var entryclsGrup6 = "calisanGrp6";
			var entryclsAltGrup6 = "calisanAlt6";
			var entryskalaKod6 = "skala6";
			var entryucret6 = "ucret6";
			var entrydilPrim6 = "dilPrim6";
			var entryaracPrim6 = "aracPrim6";
			var entrymevPrim6 = "mevPrim6";
			var entryvekPrim6 = "vekPrim6";
			var entrydiger6 = "diger6";

			var entryinputPosAd6 = "InputPosAd6";
			var entryinputPerAlan6 = "InputPerAlan6";
			var entryinputPerAltAlan6 = "InputPerAltAlan6";
			var entryinputIsAlan6 = "InputIsAlan6";
			var entryinputSirket6 = "InputSirket6";
			var entryinputIsAnahtar6 = "InputIsAnahtari6";
			var entryinputOrgBirim6 = "InputOrgBirim6";
			var entryinputClsGrup6 = "InputCalisanGrp6";
			var entryinputClsAltGrup6 = "InputCalisanAlt6";
			var entryinputSkalaKod6 = "InputSkala6";
			var entryinputUcret6 = "InputUcret6";
			var entryinputDilPrim6 = "InputDilPrim6";
			var entryinputAracPrim6 = "InputAracPrim6";
			var entryinputMevPrim6 = "InputMevPrim6";
			var entryinputVekPrim6 = "InputVekPrim6";
			var entryinputDiger6 = "InputDiger6";
			var entryokul6 = "okulTur6";
			var entryokulAd6 = "okulAd6";
			var entryegitim6 = "egitim6";

			var pernr = vPernr;

			oEntry[entryfisKonu6] = that.getView().byId(entryfisKonu6).getValue();
			oEntry[entrysicilNo6] = that.getView().byId(entrysicilNo6).getValue();
			oEntry[entryadSoyad6] = that.getView().byId(entryadSoyad6).getValue();
			oEntry[entrytc6] = that.getView().byId(entrytc6).getValue();
			oEntry[entrydogumTarih6] = that.getView().byId(entrydogumTarih6).getValue();
			oEntry[entrygecerTarih6] = that.getView().byId(entrygecerTarih6).getValue();
			oEntry[entryPosAd6] = that.getView().byId(entryPosAd6).getValue();
			oEntry[entryperAlan6] = that.getView().byId(entryperAlan6).getValue();
			oEntry[entryperAltAlan6] = that.getView().byId(entryperAltAlan6).getValue();
			oEntry[entryisAlan6] = that.getView().byId(entryisAlan6).getValue();
			oEntry[entrysirket6] = that.getView().byId(entrysirket6).getValue();
			oEntry[entryisAnahtar6] = that.getView().byId(entryisAnahtar6).getValue();
			oEntry[entryorgBirim6] = that.getView().byId(entryorgBirim6).getValue();
			oEntry[entryclsGrup6] = that.getView().byId(entryclsGrup6).getValue();
			oEntry[entryclsAltGrup6] = that.getView().byId(entryclsAltGrup6).getValue();
			oEntry[entryskalaKod6] = that.getView().byId(entryskalaKod6).getValue();
			oEntry[entryucret6] = that.getView().byId(entryucret6).getValue();
			oEntry[entrydilPrim6] = that.getView().byId(entrydilPrim6).getValue();
			oEntry[entryaracPrim6] = that.getView().byId(entryaracPrim6).getValue();
			oEntry[entrymevPrim6] = that.getView().byId(entrymevPrim6).getValue();
			oEntry[entryvekPrim6] = that.getView().byId(entryvekPrim6).getValue();
			oEntry[entrydiger6] = that.getView().byId(entrydiger6).getValue();
			oEntry[entryinputPosAd6] = that.getView().byId(entryinputPosAd6).getValue();
			oEntry[entryinputPerAlan6] = that.getView().byId(entryinputPerAlan6).getValue();
			oEntry[entryinputPerAltAlan6] = that.getView().byId(entryinputPerAltAlan6).getValue();
			oEntry[entryinputIsAlan6] = that.getView().byId(entryinputIsAlan6).getValue();
			oEntry[entryinputSirket6] = that.getView().byId(entryinputSirket6).getValue();
			oEntry[entryinputIsAnahtar6] = that.getView().byId(entryinputIsAnahtar6).getValue();
			oEntry[entryinputOrgBirim6] = that.getView().byId(entryinputOrgBirim6).getValue();
			oEntry[entryinputClsGrup6] = that.getView().byId(entryinputClsGrup6).getValue();
			oEntry[entryinputClsAltGrup6] = that.getView().byId(entryinputClsAltGrup6).getValue();
			oEntry[entryinputSkalaKod6] = that.getView().byId(entryinputSkalaKod6).getValue();
			oEntry[entryinputUcret6] = that.getView().byId(entryinputUcret6).getValue();
			oEntry[entryinputDilPrim6] = that.getView().byId(entryinputDilPrim6).getValue();
			oEntry[entryinputAracPrim6] = that.getView().byId(entryinputAracPrim6).getValue();
			oEntry[entryinputMevPrim6] = that.getView().byId(entryinputMevPrim6).getValue();
			oEntry[entryinputVekPrim6] = that.getView().byId(entryinputVekPrim6).getValue();
			oEntry[entryinputDiger6] = that.getView().byId(entryinputDiger6).getValue();
			oEntry[entryokul6] = that.getView().byId(entryokul6).getValue();
			oEntry[entryokulAd6] = that.getView().byId(entryokulAd6).getValue();
			oEntry[entryegitim6] = that.getView().byId(entryegitim6).getValue();

			//console.log(oEntry);

			//terfi verilerini güncelleme ycoskun
			oTerfiPersonel.Appnr = "01";
			oTerfiPersonel.Pronr = "06";
			oTerfiPersonel.Pernr = that.getView().byId(entrysicilNo6).getValue();
			oTerfiPersonel.Ename = that.getView().byId(entryadSoyad6).getValue();
			oTerfiPersonel.Tckno = that.getView().byId(entrytc6).getValue();
			oTerfiPersonel.Gbdat = that.getView().byId(entrydogumTarih6).getValue();
			oTerfiPersonel.Begda = that.getView().byId(entrygecerTarih6).getValue();
			oTerfiPersonel.Plans = that.getView().byId(entryinputPosAd6).getValue();
			oTerfiPersonel.Bukrs = that.getView().byId(entryinputSirket6).getValue();
			oTerfiPersonel.Stell = that.getView().byId(entryinputIsAnahtar6).getValue();
			oTerfiPersonel.Orgeh = that.getView().byId(entryinputOrgBirim6).getValue();
			oTerfiPersonel.Bet01 = that.getView().byId(entryinputUcret6).getValue();
			oTerfiPersonel.Diger = that.getView().byId(entryinputDiger6).getValue();
			oTerfiPersonel.Dilpr = that.getView().byId(entryinputDilPrim6).getValue();
			oTerfiPersonel.Arcpr = that.getView().byId(entryinputAracPrim6).getValue();
			oTerfiPersonel.Mvspr = that.getView().byId(entryinputMevPrim6).getValue();
			oTerfiPersonel.Vklpr = that.getView().byId(entryinputVekPrim6).getValue();
			oTerfiPersonel.Slart = that.getView().byId(entryokul6).getValue();
			oTerfiPersonel.Insti = that.getView().byId(entryokulAd6).getValue();
			oTerfiPersonel.Fach1 = that.getView().byId(entryegitim6).getValue();

			//split edip kodu backende yollama begin of ycoskun
			var plans = that.getView().byId(entryinputPosAd6).getValue();
			var arrayPlans = plans.split(" / ");
			oTerfiPersonel.Plans = arrayPlans[0];

			var fach1 = that.getView().byId(entryegitim6).getValue();
			var arrayFach1 = fach1.split(" / ");
			oTerfiPersonel.Fach1 = arrayFach1[0];

			var orgeh = that.getView().byId(entryinputOrgBirim6).getValue();
			var arrayOrgeh = orgeh.split(" / ");
			oTerfiPersonel.Orgeh = arrayOrgeh[0];

			var slart = that.getView().byId(entryokul6).getValue();
			var arraySlart = slart.split(" / ");
			oTerfiPersonel.Slart = arraySlart[0];

			var stell = that.getView().byId(entryinputIsAnahtar6).getValue();
			var arrayStell = stell.split(" / ");
			oTerfiPersonel.Stell = arrayStell[0];

			var werks = that.getView().byId(entryinputPerAlan6).getValue();
			var arrayWerks = werks.split(" / ");
			oTerfiPersonel.Werks = arrayWerks[0];

			var btrtl = that.getView().byId(entryinputPerAltAlan6).getValue();
			var arrayBtrtl = btrtl.split(" / ");
			oTerfiPersonel.Btrtl = arrayBtrtl[0];

			var gsber = that.getView().byId(entryinputIsAlan6).getValue();
			var arrayGsber = gsber.split(" / ");
			oTerfiPersonel.Gsber = arrayGsber[0];

			var persg = that.getView().byId(entryinputClsGrup6).getValue();
			var arrayPersg = persg.split(" / ");
			oTerfiPersonel.Persg = arrayPersg[0];

			var persk = that.getView().byId(entryinputClsAltGrup6).getValue();
			var arrayPersk = persk.split(" / ");
			oTerfiPersonel.Persk = arrayPersk[0];

			var trfgr = that.getView().byId(entryinputSkalaKod6).getValue();
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

			that.getElement("fisKonuRew6").setValue(oEntry.fisKonu6);
			that.getElement("sicilNoRew6").setValue(oEntry.sicilNo6);
			that.getElement("adSoyadRew6").setValue(oEntry.adSoyad6);
			that.getElement("tcRew6").setValue(oEntry.idTC6);
			that.getElement("dogumTarihRew6").setValue(this.vDate(oEntry.dogumTarih6));
			that.getElement("gecerTarihRew6").setValue(this.vDate(oEntry.gecerTarih6));
			that.getElement("PosAdRew6").setValue(oEntry.PosAd6);
			that.getElement("perAlanRew6").setValue(oEntry.perAlan6);
			that.getElement("perAltAlanRew6").setValue(oEntry.perAltAlan6);
			that.getElement("isAlanRew6").setValue(oEntry.isAlan6);
			that.getElement("sirketRew6").setValue(oEntry.sirket6);
			that.getElement("isAnahRew6").setValue(oEntry.isAnahtari6);
			that.getElement("orgBirRew6").setValue(oEntry.orgBirim6);
			that.getElement("clsRew6").setValue(oEntry.calisanGrp6);
			that.getElement("clsAltRew6").setValue(oEntry.calisanAlt6);
			that.getElement("skalaRew6").setValue(oEntry.skala6);
			that.getElement("ucretRew6").setValue(oEntry.ucret6);
			that.getElement("dilPrimRew6").setValue(oEntry.dilPrim6);
			that.getElement("aracPrimRew6").setValue(oEntry.aracPrim6);
			that.getElement("mevPrimRew6").setValue(oEntry.mevPrim6);
			that.getElement("vekPrimRew6").setValue(oEntry.vekPrim6);
			that.getElement("digerRew6").setValue(oEntry.diger6);

			that.getElement("inputPosAdRew6").setValue(oEntry.InputPosAd6);
			that.getElement("inputPerAlanRew6").setValue(oEntry.InputPerAlan6);
			that.getElement("inputPerAltAlanRew6").setValue(oEntry.InputPerAltAlan6);
			that.getElement("inputsirketRew6").setValue(oEntry.InputIsAlan6);
			that.getElement("inputIsAlanRew6").setValue(oEntry.InputSirket6);
			that.getElement("inputIsAnahRew6").setValue(oEntry.InputIsAnahtari6);
			that.getElement("inputOrgBirRew6").setValue(oEntry.InputOrgBirim6);
			that.getElement("inputClsRew6").setValue(oEntry.InputCalisanGrp6);
			that.getElement("inputClsAltRew6").setValue(oEntry.InputCalisanAlt6);
			that.getElement("inputSkalaRew6").setValue(oEntry.InputSkala6);
			that.getElement("inputUcretRew6").setValue(oEntry.InputUcret6);
			that.getElement("inputDilPrimRew6").setValue(oEntry.InputDilPrim6);
			that.getElement("inputAracPrimRew6").setValue(oEntry.InputAracPrim6);
			that.getElement("inputMevPrimRew6").setValue(oEntry.InputMevPrim6);
			that.getElement("inputVekPrimRew6").setValue(oEntry.InputVekPrim6);
			that.getElement("inputDigerRew6").setValue(oEntry.InputDiger6);
			that.getElement("okulRew6").setValue(oEntry.okulTur6);
			that.getElement("okulAdRew6").setValue(oEntry.okulAd6);
			that.getElement("egitimRew6").setValue(oEntry.egitim6);

			//begin of ycoskun verilerin globalde tutulması islemleri
			sap.ui.getCore().cPernr = that.getView().byId(entrysicilNo6).getValue();
			sap.ui.getCore().cPronr = "06";
			sap.ui.getCore().cAppnr = "01";
			sap.ui.getCore().cAdSoyad = that.getView().byId(entryadSoyad6).getValue();
			sap.ui.getCore().cDogumTarih = that.getView().byId(entrydogumTarih6).getValue();
			sap.ui.getCore().cGecerTarih = that.getView().byId(entrygecerTarih6).getValue();
			sap.ui.getCore().cTC = that.getView().byId(entrytc6).getValue();

			sap.ui.getCore().cPozisyon = oEntry.InputPosAd6;
			sap.ui.getCore().cPerAlan = oEntry.InputPerAlan6;
			sap.ui.getCore().cPerAltAlan = oEntry.InputPerAltAlan6;
			sap.ui.getCore().cIsAlan = oEntry.InputIsAlan6;
			sap.ui.getCore().cSirket = oEntry.InputSirket6;
			sap.ui.getCore().cIsAnahtari = oEntry.InputIsAnahtari6;
			sap.ui.getCore().cOrgBirim = oEntry.InputOrgBirim6;
			sap.ui.getCore().cClsGrup = oEntry.InputCalisanGrp6;
			sap.ui.getCore().cClsAltGrp = oEntry.InputCalisanAlt6;
			sap.ui.getCore().cSkala = oEntry.InputSkala6;
			sap.ui.getCore().cUcret = oEntry.InputUcret6;
			sap.ui.getCore().cDilPrim = oEntry.InputDilPrim6;
			sap.ui.getCore().cAracPrim = oEntry.InputAracPrim6;
			sap.ui.getCore().cMevPrim = oEntry.InputMevPrim6;
			sap.ui.getCore().cVekPrim = oEntry.InputVekPrim6;
			sap.ui.getCore().cDiger = oEntry.InputDiger6;

			sap.ui.getCore().cOkulTur = that.getView().byId(entryokul6).getValue();
			sap.ui.getCore().cOkulAd = that.getView().byId(entryokulAd6).getValue();
			sap.ui.getCore().cEgitim = that.getView().byId(entryegitim6).getValue();

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
			var langtable = sap.ui.getCore().byId("idLang6");
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
			var zihintable = sap.ui.getCore().byId("idExamZihin6");
			zihintable.setModel(this.getView().getModel("oAbModel"));
			//end of ycoskun

			//begin of ycoskun pd sonucları listele 
			var oPdModel = new sap.ui.model.json.JSONModel();
			var perPbFilter = "Pernr eq '" + pernr + "'";

			oModel.read("/ZHRTerfiPDSet", null, ["$filter=" + perPbFilter], true,
				function(oData) {
					oPdModel.setData(oData);
					//	console.log(oData);
				});
			oThat.getView().setModel(oPdModel, "oPdModel");
			var pdtable = sap.ui.getCore().byId("idPd6");
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
			this._wizard.discardProgress(this.getView().byId("ProductTypeStep6"));
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
			//this.model.setProperty("/isAlanState", "Error");
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
			oLang = new sap.m.ComboBox("box_default6", {
				items: {
					path: "/results",
					template: itemTemplate
				},
				selectionChange: function(oEvent) {
					selectLang = oEvent.oSource.getSelectedKey();
					sap.ui.getCore().byId("oLanguage6").setValue(selectLang);

				}
			});
			sap.ui.getCore().byId("box_default6").setModel(osJsonYabanciDil);

			oLanguage = new sap.ui.commons.TextField("oLanguage6", {
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

						oEntry.Sptxt = sap.ui.getCore().byId("box_default6").getValue();
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
						var langtable = oView.byId("idLanguageTable6");
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

			oExam = new sap.m.ComboBox("idAbility6", {
				items: {
					path: "/results",
					template: itemTemplate
				},
				selectionChange: function(oEvent) {
					selectAbility = oEvent.oSource.getSelectedKey();

				}
			});
			sap.ui.getCore().byId("idAbility6").setModel(osJsonSinavTur);

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
						var abtable = oView.byId("idAbilityTable6");
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
							});
						oView.setModel(oPDModel, "PDModel");
						var pdtable = oView.byId("idPDTable6");
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
			this.getOwnerComponent().getRouter().navTo("screen6Approve");
		},
		onBackScreen: function() {
			this.getOwnerComponent().getRouter().navTo("PersonalActivity");
			window.location.reload();
		},
		handleSicilNoSearch: function() {
			//begin of ycoskun sicilno girip tıklayınca verileri getirme

			var oThat = this;
			var sicilNo = oThat.getView().byId("sicilNo6").getValue();
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

			this.getView().byId("fisKonu6").setValue("Ücret Değişikliği");
			this.getView().byId("sicilNo6").setValue(sicilNo);
			this.getView().byId("adSoyad6").setValue(Terfi.Ename);
			this.getView().byId("idTC6").setValue(Terfi.Tckno);
			this.getView().byId("dogumTarih6").setValue(Terfi.Gbdat);
			this.getView().byId("gecerTarih6").setValue(Terfi.Endda);
			this.getView().byId("PosAd6").setValue(Terfi.Plans + " / " + Terfi.Stext);
			this.getView().byId("sirket6").setValue(Terfi.Bukrs);
			this.getView().byId("isAlan6").setValue(Terfi.Gsber + " / " + Terfi.Gtext);
			this.getView().byId("isAnahtari6").setValue(Terfi.Stell + " / " + Terfi.StellTxt);
			this.getView().byId("orgBirim6").setValue(Terfi.Orgeh + " / " + Terfi.OrgehTxt);
			this.getView().byId("calisanGrp6").setValue(Terfi.Persg + " / " + Terfi.Psgtext);
			this.getView().byId("calisanAlt6").setValue(Terfi.Persk + " / " + Terfi.Psktext);
			this.getView().byId("skala6").setValue(Terfi.Trfgr);
			this.getView().byId("ucret6").setValue(Terfi.Ucret);
			this.getView().byId("dilPrim6").setValue(Terfi.Dilpr);
			this.getView().byId("aracPrim6").setValue(Terfi.Arcpr);
			this.getView().byId("mevPrim6").setValue(Terfi.Mevpr);
			this.getView().byId("vekPrim6").setValue(Terfi.Vklpr);
			this.getView().byId("diger6").setValue(Terfi.Diger);
			this.getView().byId("perAlan6").setValue(Terfi.Werks + " / " + Terfi.Pbtxt);
			this.getView().byId("perAltAlan6").setValue(Terfi.Btrtl + " / " + Terfi.Btext);
			this.getView().byId("okulTur6").setValue(Terfi.Slart + " / " + Terfi.SlartTxt);
			this.getView().byId("okulAd6").setValue(Terfi.Insti);
			this.getView().byId("egitim6").setValue(Terfi.Fach1 + " / " + Terfi.Ftext);

			this.getView().byId("InputPosAd6").setValue(Terfi.Plans + " / " + Terfi.Stext);
			this.getView().byId("InputSirket6").setValue(Terfi.Bukrs);
			this.getView().byId("InputIsAlan6").setValue(Terfi.Gsber + " / " + Terfi.Gtext);
			this.getView().byId("InputIsAnahtari6").setValue(Terfi.Stell + " / " + Terfi.StellTxt);
			this.getView().byId("InputOrgBirim6").setValue(Terfi.Orgeh + " / " + Terfi.OrgehTxt);
			this.getView().byId("InputCalisanGrp6").setValue(Terfi.Persg + " / " + Terfi.Psgtext);
			this.getView().byId("InputCalisanAlt6").setValue(Terfi.Persk + " / " + Terfi.Psktext);
			this.getView().byId("InputSkala6").setValue(Terfi.Trfgr);
			this.getView().byId("InputUcret6").setValue(Terfi.Ucret);
			this.getView().byId("InputDilPrim6").setValue(Terfi.Dilpr);
			this.getView().byId("InputAracPrim6").setValue(Terfi.Arcpr);
			this.getView().byId("InputMevPrim6").setValue(Terfi.Mvspr);
			this.getView().byId("InputVekPrim6").setValue(Terfi.Vklpr);
			this.getView().byId("InputDiger6").setValue(Terfi.Diger);
			this.getView().byId("InputPerAlan6").setValue(Terfi.Werks + " / " + Terfi.Pbtxt);
			this.getView().byId("InputPerAltAlan6").setValue(Terfi.Btrtl + " / " + Terfi.Btext);
			//end of ycoskun
		},
		onPressLang: function() {
			var pernr = vPernr;
			var oView = this.getView();
			var oList = oView.byId("idLanguageTable6");
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
							success: function() {},
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
						var langtable = oView.byId("idLanguageTable6");
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
			var oList = oView.byId("idAbilityTable6");
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
							success: function() {},
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
						var zihintable = oView.byId("idAbilityTable6");
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
			var oList = oView.byId("idPDTable6");
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
						var pdtable = oView.byId("idPDTable6");
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
			var vStell, vOrg;
			var vPosition = sap.ui.getCore().cPosition;
			var arrayPos = vPosition.split("/");
			var vPos = arrayPos[0];
			that.getView().byId("InputPosAd6").setValue(sap.ui.getCore().cPosition);
			that.oMessageDialog.close();
			that.oMessageDialog.destroy();

			oModel.read("/StelOrgGetirSet('" + vPos + "')", null, null, false,
				function(oData) {
					osJsonStelOrg.setData(oData);
					vStell = oData.Stell;
					vOrg = oData.Orgeh;

					that.getView().byId("InputIsAnahtari6").setValue(vStell);
					that.getView().byId("InputOrgBirim6").setValue(vOrg);

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