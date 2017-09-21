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

	var WizardController = Controller.extend("ZHR_144.controller.Screen5", {

		onInit: function() {

			this._wizard = this.getView().byId("CreateProductWizard5");
			this._oNavContainer = this.getView().byId("wizardNavContainer");
			this._oWizardContentPage = this.getView().byId("wizardContentPage5");
			this._oWizardReviewPage = sap.ui.xmlfragment("ZHR_144.view.Screen5ReviewPage", this);
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
			osModel.setSizeLimit(99999);
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
					that.getView().byId("InputIsAlan5").setValue(oSelectedItem.getDescription() + " / " + oSelectedItem.getTitle());
					that.additionalInfoValidation();
				}
			};
			if (!this._valueHelpSelectDialogIsAlan5) {
				this._valueHelpSelectDialogIsAlan5 = new sap.m.SelectDialog("valueHelpSelectDialogIsAlan5", {
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

				this._valueHelpSelectDialogIsAlan5.setModel(osJsonIsAlan);

			} else {
				this._valueHelpSelectDialogIsAlan5.setModel(osJsonIsAlan);
			}
			this._valueHelpSelectDialogIsAlan5.open();

		},
		handleValueHelpSkala: function() {
			var that = this;
			var handleClose = function(oEvent) {
				var oSelectedItem = oEvent.getParameter("selectedItem");
				if (oSelectedItem) {
					that.getView().byId("InputSkala5").setValue(oSelectedItem.getDescription() + " / " + oSelectedItem.getTitle());
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
					that.getView().byId("InputCalisanAlt5").setValue(oSelectedItem.getDescription() + " / " + oSelectedItem.getTitle());
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
					that.getView().byId("InputCalisanGrp5").setValue(oSelectedItem.getDescription() + " / " + oSelectedItem.getTitle());
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
					that.getView().byId("InputPerAlan5").setValue(oSelectedItem.getDescription() + " / " + oSelectedItem.getTitle());
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
					that.getView().byId("InputPerAltAlan5").setValue(oSelectedItem.getDescription() + " / " + oSelectedItem.getTitle());
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
			this._wizard.validateStep(this.getView().byId("ProductTypeStep5"));

		},

		setProductTypeFromSegmented: function(evt) {

			var productType = evt.mParameters.button.getText();
			this.model.setProperty("/productType", productType);
			this._wizard.validateStep(this.getView().byId("ProductTypeStep5"));

		},

		additionalInfoValidation: function() {

			var cls5 = this.getView().byId("InputCalisanGrp5").getValue();
			var perAlan5 = this.getView().byId("InputPerAlan5").getValue();
			var clsAlt5 = this.getView().byId("InputCalisanAlt5").getValue();
			var isAlan5 = this.getView().byId("InputIsAlan5").getValue();

			if (perAlan5.length < 4 || isAlan5.length < 4 || cls5.length < 1 || clsAlt5.length < 2) {
				this._wizard.invalidateStep(this.getView().byId("YeniStep5"));
			} else {
				this._wizard.validateStep(this.getView().byId("YeniStep5"));

			}

		},

		optionalStepActivation: function() {

			//MessageToast.show('This event is fired on activate of Step3.');
		},

		optionalStepCompletion: function() {
			/*	MessageToast.show(
					'This event is fired on complete of Step3. You can use it to gather the information, and lock the input data.'
				);*/

		},

		stepLanguage: function() {
			//begin of ycoskun  Personel Verilerini erp tabloya atma 

			var that = this;
			var oEntryTerfiPersonel = {};

			var entryPosAd5 = "InputPosAd5";
			var entryPerAlan5 = "InputPerAlan5";
			var entryPerAltAlan5 = "InputPerAltAlan5";
			var entryisAlan5 = "InputIsAlan5";
			var entrySirket5 = "InputSirket5";
			var entryisAnahtar5 = "InputIsAnahtari5";
			var entryorgBirim5 = "InputOrgBirim5";
			var entryclsGrup5 = "InputCalisanGrp5";
			var entryclsAltGrup5 = "InputCalisanAlt5";
			var entryskalaKod5 = "InputSkala5";
			var entryucret5 = "InputUcret5";
			var entryDilPrim5 = "InputDilPrim5";
			var entryAracPrim5 = "InputAracPrim5";
			var entryMevPrim5 = "InputMevPrim5";
			var entryVekPrim5 = "InputVekPrim5";
			var entryDiger5 = "InputDiger5";
			var entrySicilNo = "sicilNo5";
			var entryAdSoyad5 = "adSoyad5";
			var entrydogumTarih5 = "dogumTarih5";
			var entryTckno5 = "idTC5";
			var entrygecerTarih5 = "gecerTarih5";
			var entryOkulTur = "okulTur5";
			var entryOkulAdi = "okulAd5";
			var entryEgitim = "egitim5";

			oEntryTerfiPersonel.Appnr = "01";
			oEntryTerfiPersonel.Pronr = "05";
			oEntryTerfiPersonel.Pernr = that.getView().byId(entrySicilNo).getValue();
			oEntryTerfiPersonel.Ename = that.getView().byId(entryAdSoyad5).getValue();
			oEntryTerfiPersonel.Tckno = that.getView().byId(entryTckno5).getValue();
			oEntryTerfiPersonel.Gbdat = that.getView().byId(entrydogumTarih5).getValue();
			oEntryTerfiPersonel.Begda = that.getView().byId(entrygecerTarih5).getValue();
			oEntryTerfiPersonel.Plans = that.getView().byId(entryPosAd5).getValue();
			oEntryTerfiPersonel.Bukrs = that.getView().byId(entrySirket5).getValue();
			//oEntryTerfiPersonel.Gsber = that.getView().byId(entryisAlan3).getValue();
			oEntryTerfiPersonel.Stell = that.getView().byId(entryisAnahtar5).getValue();
			oEntryTerfiPersonel.Orgeh = that.getView().byId(entryorgBirim5).getValue();
			//oEntryTerfiPersonel.Persg = that.getView().byId(entryclsGrup3).getValue();
			//oEntryTerfiPersonel.Persk = that.getView().byId(entryclsAltGrup3).getValue();
			//oEntryTerfiPersonel.Trfgr = that.getView().byId(entryskalaKod3).getValue();
			oEntryTerfiPersonel.Bet01 = that.getView().byId(entryucret5).getValue();
			oEntryTerfiPersonel.Diger = that.getView().byId(entryDiger5).getValue();
			//oEntryTerfiPersonel.Werks = that.getView().byId(entryPerAlan3).getValue();
			//oEntryTerfiPersonel.Btrtl = that.getView().byId(entryPerAltAlan3).getValue();
			oEntryTerfiPersonel.Dilpr = that.getView().byId(entryDilPrim5).getValue();
			oEntryTerfiPersonel.Arcpr = that.getView().byId(entryAracPrim5).getValue();
			oEntryTerfiPersonel.Mvspr = that.getView().byId(entryMevPrim5).getValue();
			oEntryTerfiPersonel.Vklpr = that.getView().byId(entryVekPrim5).getValue();
			oEntryTerfiPersonel.Slart = that.getView().byId(entryOkulTur).getValue();
			oEntryTerfiPersonel.Insti = that.getView().byId(entryOkulAdi).getValue();
			oEntryTerfiPersonel.Fach1 = that.getView().byId(entryEgitim).getValue();

			//split edip kodu backende yollama begin of ycoskun
			var werks = that.getView().byId(entryPerAlan5).getValue();
			var arrayWerks = werks.split(" / ");
			oEntryTerfiPersonel.Werks = arrayWerks[0];

			var btrtl = that.getView().byId(entryPerAltAlan5).getValue();
			var arrayBtrtl = btrtl.split(" / ");
			oEntryTerfiPersonel.Btrtl = arrayBtrtl[0];

			var gsber = that.getView().byId(entryisAlan5).getValue();
			var arrayGsber = gsber.split(" / ");
			oEntryTerfiPersonel.Gsber = arrayGsber[0];

			var persg = that.getView().byId(entryclsGrup5).getValue();
			var arrayPersg = persg.split(" / ");
			oEntryTerfiPersonel.Persg = arrayPersg[0];

			var persk = that.getView().byId(entryclsAltGrup5).getValue();
			var arrayPersk = persk.split(" / ");
			oEntryTerfiPersonel.Persk = arrayPersk[0];

			var trfgr = that.getView().byId(entryskalaKod5).getValue();
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
			var langtable = oThat.getView().byId("idLanguageTable5");
			langtable.setModel(this.getView().getModel("LangModel"));

			//end of ycoskun

			this._wizard.validateStep(this.getView().byId("idBeceri5"));

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
			var langtable = oThat.getView().byId("idAbilityTable5");
			langtable.setModel(this.getView().getModel("oAbModel"));

			//end of ycoskun

			this._wizard.validateStep(this.getView().byId("PricingStep5"));

		},

		pricingActivate: function() {
			var that = this;
			var sicilNo = "sicilNo5";
			var oPDModel = new sap.ui.model.json.JSONModel();
			vPernr = that.getView().byId(sicilNo).getValue();
			var perFilter = "Pernr eq '" + vPernr + "'";
			var oThat = this;

			oModel.read("/ZHRTerfiPDSet", null, ["$filter=" + perFilter], true,
				function(oData) {
					oPDModel.setData(oData);

				});
			oThat.getView().setModel(oPDModel, "PDModel");
			var pdtable = oThat.getView().byId("idPDTable5");
			pdtable.setModel(this.getView().getModel("PDModel"));

			this.model.setProperty("/navApiEnabled", true);

		},

		pricingComplete: function() {
			this.model.setProperty("/navApiEnabled", false);

		},

		scrollFrom4to2: function() {

			this._wizard.goToStep(this.getView().byId("ProductInfoStep5"));

		},

		goFrom4to3: function() {

			if (this._wizard.getProgressStep() === this.getView().byId("PricingStep5"))

				this._wizard.previousStep();

		},

		goFrom4to5: function() {

			if (this._wizard.getProgressStep() === this.getView().byId("PricingStep5"))

				this._wizard.nextStep();

		},

		wizardCompletedHandler: function() {

			var that = this;
			var oEntry = [];
			var oTerfiPersonel = [];

			var entryfisKonu5 = "fisKonu5";
			var entrysicilNo5 = "sicilNo5";
			var entryadSoyad5 = "adSoyad5";
			var entrytc5 = "idTC5";
			var entrydogumTarih5 = "dogumTarih5";
			var entrygecerTarih5 = "gecerTarih5";
			var entryPosAd5 = "PosAd5";
			var entryperAlan5 = "perAlan5";
			var entryperAltAlan5 = "perAltAlan5";
			var entryisAlan5 = "isAlan5";
			var entrysirket5 = "sirket5";
			var entryisAnahtar5 = "isAnahtari5";
			var entryorgBirim5 = "orgBirim5";
			var entryclsGrup5 = "calisanGrp5";
			var entryclsAltGrup5 = "calisanAlt5";
			var entryskalaKod5 = "skala5";
			var entryucret5 = "ucret5";
			var entrydilPrim5 = "dilPrim5";
			var entryaracPrim5 = "aracPrim5";
			var entrymevPrim5 = "mevPrim5";
			var entryvekPrim5 = "vekPrim5";
			var entrydiger5 = "diger5";

			var entryinputPosAd5 = "InputPosAd5";
			var entryinputPerAlan5 = "InputPerAlan5";
			var entryinputPerAltAlan5 = "InputPerAltAlan5";
			var entryinputIsAlan5 = "InputIsAlan5";
			var entryinputSirket5 = "InputSirket5";
			var entryinputIsAnahtar5 = "InputIsAnahtari5";
			var entryinputOrgBirim5 = "InputOrgBirim5";
			var entryinputClsGrup5 = "InputCalisanGrp5";
			var entryinputClsAltGrup5 = "InputCalisanAlt5";
			var entryinputSkalaKod5 = "InputSkala5";
			var entryinputUcret5 = "InputUcret5";
			var entryinputDilPrim5 = "InputDilPrim5";
			var entryinputAracPrim5 = "InputAracPrim5";
			var entryinputMevPrim5 = "InputMevPrim5";
			var entryinputVekPrim5 = "InputVekPrim5";
			var entryinputDiger5 = "InputDiger5";
			var entryokul5 = "okulTur5";
			var entryokulAd5 = "okulAd5";
			var entryegitim5 = "egitim5";

			var pernr = vPernr;

			oEntry[entryfisKonu5] = that.getView().byId(entryfisKonu5).getValue();
			oEntry[entrysicilNo5] = that.getView().byId(entrysicilNo5).getValue();
			oEntry[entryadSoyad5] = that.getView().byId(entryadSoyad5).getValue();
			oEntry[entrytc5] = that.getView().byId(entrytc5).getValue();
			oEntry[entrydogumTarih5] = that.getView().byId(entrydogumTarih5).getValue();
			oEntry[entrygecerTarih5] = that.getView().byId(entrygecerTarih5).getValue();
			oEntry[entryPosAd5] = that.getView().byId(entryPosAd5).getValue();
			oEntry[entryperAlan5] = that.getView().byId(entryperAlan5).getValue();
			oEntry[entryperAltAlan5] = that.getView().byId(entryperAltAlan5).getValue();
			oEntry[entryisAlan5] = that.getView().byId(entryisAlan5).getValue();
			oEntry[entrysirket5] = that.getView().byId(entrysirket5).getValue();
			oEntry[entryisAnahtar5] = that.getView().byId(entryisAnahtar5).getValue();
			oEntry[entryorgBirim5] = that.getView().byId(entryorgBirim5).getValue();
			oEntry[entryclsGrup5] = that.getView().byId(entryclsGrup5).getValue();
			oEntry[entryclsAltGrup5] = that.getView().byId(entryclsAltGrup5).getValue();
			oEntry[entryskalaKod5] = that.getView().byId(entryskalaKod5).getValue();
			oEntry[entryucret5] = that.getView().byId(entryucret5).getValue();
			oEntry[entrydilPrim5] = that.getView().byId(entrydilPrim5).getValue();
			oEntry[entryaracPrim5] = that.getView().byId(entryaracPrim5).getValue();
			oEntry[entrymevPrim5] = that.getView().byId(entrymevPrim5).getValue();
			oEntry[entryvekPrim5] = that.getView().byId(entryvekPrim5).getValue();
			oEntry[entrydiger5] = that.getView().byId(entrydiger5).getValue();
			oEntry[entryinputPosAd5] = that.getView().byId(entryinputPosAd5).getValue();
			oEntry[entryinputPerAlan5] = that.getView().byId(entryinputPerAlan5).getValue();
			oEntry[entryinputPerAltAlan5] = that.getView().byId(entryinputPerAltAlan5).getValue();
			oEntry[entryinputIsAlan5] = that.getView().byId(entryinputIsAlan5).getValue();
			oEntry[entryinputSirket5] = that.getView().byId(entryinputSirket5).getValue();
			oEntry[entryinputIsAnahtar5] = that.getView().byId(entryinputIsAnahtar5).getValue();
			oEntry[entryinputOrgBirim5] = that.getView().byId(entryinputOrgBirim5).getValue();
			oEntry[entryinputClsGrup5] = that.getView().byId(entryinputClsGrup5).getValue();
			oEntry[entryinputClsAltGrup5] = that.getView().byId(entryinputClsAltGrup5).getValue();
			oEntry[entryinputSkalaKod5] = that.getView().byId(entryinputSkalaKod5).getValue();
			oEntry[entryinputUcret5] = that.getView().byId(entryinputUcret5).getValue();
			oEntry[entryinputDilPrim5] = that.getView().byId(entryinputDilPrim5).getValue();
			oEntry[entryinputAracPrim5] = that.getView().byId(entryinputAracPrim5).getValue();
			oEntry[entryinputMevPrim5] = that.getView().byId(entryinputMevPrim5).getValue();
			oEntry[entryinputVekPrim5] = that.getView().byId(entryinputVekPrim5).getValue();
			oEntry[entryinputDiger5] = that.getView().byId(entryinputDiger5).getValue();
			oEntry[entryokul5] = that.getView().byId(entryokul5).getValue();
			oEntry[entryokulAd5] = that.getView().byId(entryokulAd5).getValue();
			oEntry[entryegitim5] = that.getView().byId(entryegitim5).getValue();

			//console.log(oEntry);

			//end of ycoskun

			//terfi verilerini güncelleme ycoskun

			oTerfiPersonel.Appnr = "01";
			oTerfiPersonel.Pronr = "05";
			oTerfiPersonel.Pernr = that.getView().byId(entrysicilNo5).getValue();
			oTerfiPersonel.Ename = that.getView().byId(entryadSoyad5).getValue();
			oTerfiPersonel.Tckno = that.getView().byId(entrytc5).getValue();
			oTerfiPersonel.Gbdat = that.getView().byId(entrydogumTarih5).getValue();
			oTerfiPersonel.Begda = that.getView().byId(entrygecerTarih5).getValue();
			oTerfiPersonel.Plans = that.getView().byId(entryinputPosAd5).getValue();
			oTerfiPersonel.Bukrs = that.getView().byId(entryinputSirket5).getValue();
			//oTerfiPersonel.Gsber = that.getView().byId(entryinputIsAlan3).getValue();
			oTerfiPersonel.Stell = that.getView().byId(entryinputIsAnahtar5).getValue();
			oTerfiPersonel.Orgeh = that.getView().byId(entryinputOrgBirim5).getValue();
			//oTerfiPersonel.Persg = that.getView().byId(entryinputClsGrup3).getValue();
			//oTerfiPersonel.Persk = that.getView().byId(entryinputClsAltGrup3).getValue();
			//oTerfiPersonel.Trfgr = that.getView().byId(entryinputSkalaKod3).getValue();
			oTerfiPersonel.Bet01 = that.getView().byId(entryinputUcret5).getValue();
			oTerfiPersonel.Diger = that.getView().byId(entryinputDiger5).getValue();
			//oTerfiPersonel.Werks = that.getView().byId(entryinputPerAlan3).getValue();
			//oTerfiPersonel.Btrtl = that.getView().byId(entryinputPerAltAlan3).getValue();
			oTerfiPersonel.Dilpr = that.getView().byId(entryinputDilPrim5).getValue();
			oTerfiPersonel.Arcpr = that.getView().byId(entryinputAracPrim5).getValue();
			oTerfiPersonel.Mvspr = that.getView().byId(entryinputMevPrim5).getValue();
			oTerfiPersonel.Vklpr = that.getView().byId(entryinputVekPrim5).getValue();
			oTerfiPersonel.Slart = that.getView().byId(entryokul5).getValue();
			oTerfiPersonel.Insti = that.getView().byId(entryokulAd5).getValue();
			oTerfiPersonel.Fach1 = that.getView().byId(entryegitim5).getValue();

			//split edip kodu backende yollama begin of ycoskun
			var werks = that.getView().byId(entryinputPerAlan5).getValue();
			var arrayWerks = werks.split(" / ");
			oTerfiPersonel.Werks = arrayWerks[0];

			var btrtl = that.getView().byId(entryinputPerAltAlan5).getValue();
			var arrayBtrtl = btrtl.split(" / ");
			oTerfiPersonel.Btrtl = arrayBtrtl[0];

			var gsber = that.getView().byId(entryinputIsAlan5).getValue();
			var arrayGsber = gsber.split(" / ");
			oTerfiPersonel.Gsber = arrayGsber[0];

			var persg = that.getView().byId(entryinputClsGrup5).getValue();
			var arrayPersg = persg.split(" / ");
			oTerfiPersonel.Persg = arrayPersg[0];

			var persk = that.getView().byId(entryinputClsAltGrup5).getValue();
			var arrayPersk = persk.split(" / ");
			oTerfiPersonel.Persk = arrayPersk[0];

			var trfgr = that.getView().byId(entryinputSkalaKod5).getValue();
			var arrayTrfgr = trfgr.split(" / ");
			oTerfiPersonel.Trfgr = arrayTrfgr[0];

			//end of ycoskun

			oModel.create("/ZHRTerfiPersonelBilgiSet", oTerfiPersonel, {
				method: "POST",
				success: function(oData, oThat) {
					console.log("SUCCESS Personel");
					console.log(oData);

				},

				error: function(oData) {
					console.log("ERROR");
					console.log(oData);

				}

			});

			oModel.refresh(true);

			//end of ycoskun

			//end of ycoskun

			that.getElement("fisKonuRew5").setValue(oEntry.fisKonu5);
			that.getElement("sicilNoRew5").setValue(oEntry.sicilNo5);
			that.getElement("adSoyadRew5").setValue(oEntry.adSoyad5);
			that.getElement("tcRew5").setValue(oEntry.idTC5);
			that.getElement("dogumTarihRew5").setValue(this.vDate(oEntry.dogumTarih5));
			that.getElement("gecerTarihRew5").setValue(this.vDate(oEntry.gecerTarih5));
			that.getElement("PosAdRew5").setValue(oEntry.PosAd5);
			that.getElement("perAlanRew5").setValue(oEntry.perAlan5);
			that.getElement("perAltAlanRew5").setValue(oEntry.perAltAlan5);
			that.getElement("isAlanRew5").setValue(oEntry.isAlan5);
			that.getElement("sirketRew5").setValue(oEntry.sirket5);
			that.getElement("isAnahRew5").setValue(oEntry.isAnahtari5);
			that.getElement("orgBirRew5").setValue(oEntry.orgBirim5);
			that.getElement("clsRew5").setValue(oEntry.calisanGrp5);
			that.getElement("clsAltRew5").setValue(oEntry.calisanAlt5);
			that.getElement("skalaRew5").setValue(oEntry.skala5);
			that.getElement("ucretRew5").setValue(oEntry.ucret5);
			that.getElement("dilPrimRew5").setValue(oEntry.dilPrim5);
			that.getElement("aracPrimRew5").setValue(oEntry.aracPrim5);
			that.getElement("mevPrimRew5").setValue(oEntry.mevPrim5);
			that.getElement("vekPrimRew5").setValue(oEntry.vekPrim5);
			that.getElement("digerRew5").setValue(oEntry.diger5);

			that.getElement("inputPosAdRew5").setValue(oEntry.InputPosAd5);
			that.getElement("inputPerAlanRew5").setValue(oEntry.InputPerAlan5);
			that.getElement("inputPerAltAlanRew5").setValue(oEntry.InputPerAltAlan5);
			that.getElement("inputsirketRew5").setValue(oEntry.InputIsAlan5);
			that.getElement("inputIsAlanRew5").setValue(oEntry.InputSirket5);
			that.getElement("inputIsAnahRew5").setValue(oEntry.InputIsAnahtari5);
			that.getElement("inputOrgBirRew5").setValue(oEntry.InputOrgBirim5);
			that.getElement("inputClsRew5").setValue(oEntry.InputCalisanGrp5);
			that.getElement("inputClsAltRew5").setValue(oEntry.InputCalisanAlt5);
			that.getElement("inputSkalaRew5").setValue(oEntry.InputSkala5);
			that.getElement("inputUcretRew5").setValue(oEntry.InputUcret5);
			that.getElement("inputDilPrimRew5").setValue(oEntry.InputDilPrim5);
			that.getElement("inputAracPrimRew5").setValue(oEntry.InputAracPrim5);
			that.getElement("inputMevPrimRew5").setValue(oEntry.InputMevPrim5);
			that.getElement("inputVekPrimRew5").setValue(oEntry.InputVekPrim5);
			that.getElement("inputDigerRew5").setValue(oEntry.InputDiger5);
			that.getElement("okulRew5").setValue(oEntry.okulTur5);
			that.getElement("okulAdRew5").setValue(oEntry.okulAd5);
			that.getElement("egitimRew5").setValue(oEntry.egitim5);

			//begin of ycoskun verilerin globalde tutulması islemleri
			sap.ui.getCore().cPernr = that.getView().byId(entrysicilNo5).getValue();
			sap.ui.getCore().cPronr = "05";
			sap.ui.getCore().cAppnr = "01";
			sap.ui.getCore().cAdSoyad = that.getView().byId(entryadSoyad5).getValue();
			sap.ui.getCore().cDogumTarih = that.getView().byId(entrydogumTarih5).getValue();
			sap.ui.getCore().cGecerTarih = that.getView().byId(entrygecerTarih5).getValue();
			sap.ui.getCore().cTC = that.getView().byId(entrytc5).getValue();

			sap.ui.getCore().cPozisyon = oEntry.InputPosAd5;
			sap.ui.getCore().cPerAlan = oEntry.InputPerAlan5;
			sap.ui.getCore().cPerAltAlan = oEntry.InputPerAltAlan5;
			sap.ui.getCore().cIsAlan = oEntry.InputIsAlan5;
			sap.ui.getCore().cSirket = oEntry.InputSirket5;
			sap.ui.getCore().cIsAnahtari = oEntry.InputIsAnahtari5;
			sap.ui.getCore().cOrgBirim = oEntry.InputOrgBirim5;
			sap.ui.getCore().cClsGrup = oEntry.InputCalisanGrp5;
			sap.ui.getCore().cClsAltGrp = oEntry.InputCalisanAlt5;
			sap.ui.getCore().cSkala = oEntry.InputSkala5;
			sap.ui.getCore().cUcret = oEntry.InputUcret5;
			sap.ui.getCore().cDilPrim = oEntry.InputDilPrim5;
			sap.ui.getCore().cAracPrim = oEntry.InputAracPrim5;
			sap.ui.getCore().cMevPrim = oEntry.InputMevPrim5;
			sap.ui.getCore().cVekPrim = oEntry.InputVekPrim5;
			sap.ui.getCore().cDiger = oEntry.InputDiger5;

			sap.ui.getCore().cOkulTur = that.getView().byId(entryokul5).getValue();
			sap.ui.getCore().cOkulAd = that.getView().byId(entryokulAd5).getValue();
			sap.ui.getCore().cEgitim = that.getView().byId(entryegitim5).getValue();

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
			var langtable = sap.ui.getCore().byId("idLang5");
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
			var zihintable = sap.ui.getCore().byId("idExamZihin5");
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
			var pdtable = sap.ui.getCore().byId("idPd5");
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

			this._wizard.discardProgress(this.getView().byId("ProductTypeStep5"));

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

			oLang = new sap.m.ComboBox("box_default5", {
				items: {
					path: "/results",
					template: itemTemplate
				},
				selectionChange: function(oEvent) {
					selectLang = oEvent.oSource.getSelectedKey();
					sap.ui.getCore().byId("oLanguage5").setValue(selectLang);

				}
			});
			sap.ui.getCore().byId("box_default5").setModel(osJsonYabanciDil);

			oLanguage = new sap.ui.commons.TextField("oLanguage5", {
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

						oEntry.Sptxt = sap.ui.getCore().byId("box_default5").getValue();
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
						var langtable = oView.byId("idLanguageTable5");
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

			oExam = new sap.m.ComboBox("idAbility5", {
				items: {
					path: "/results",
					template: itemTemplate
				},
				selectionChange: function(oEvent) {
					selectAbility = oEvent.oSource.getSelectedKey();
					//	sap.ui.getCore().byId("oLanguage").setValue(selectLang);

				}
			});
			sap.ui.getCore().byId("idAbility5").setModel(osJsonSinavTur);
			/*	var oExam = new sap.ui.commons.TextField({
					value: "",
					enabled: true
				});*/

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
						var abtable = oView.byId("idAbilityTable5");
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
						var pdtable = oView.byId("idPDTable5");
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

			this.getOwnerComponent().getRouter().navTo("screen5Approve");

		},

		onBackScreen: function() {

			this.getOwnerComponent().getRouter().navTo("PersonalActivity");
			window.location.reload();

		},

		handleSicilNoSearch: function() {

			//begin of ycoskun sicilno girip tıklayınca verileri getirme

			var oThat = this;
			var sicilNo = oThat.getView().byId("sicilNo5").getValue();

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

			this.getView().byId("fisKonu5").setValue("Görev Değişikliği");
			this.getView().byId("sicilNo5").setValue(sicilNo);
			this.getView().byId("adSoyad5").setValue(Terfi.Ename);
			this.getView().byId("idTC5").setValue(Terfi.Tckno);
			this.getView().byId("dogumTarih5").setValue(Terfi.Gbdat);
			this.getView().byId("gecerTarih5").setValue(Terfi.Endda);
			this.getView().byId("PosAd5").setValue(Terfi.Plans + " / " + Terfi.Stext);
			this.getView().byId("sirket5").setValue(Terfi.Bukrs);
			this.getView().byId("isAlan5").setValue(Terfi.Gsber + " / " + Terfi.Gtext);
			this.getView().byId("isAnahtari5").setValue(Terfi.Stell + " / " + Terfi.StellTxt);
			this.getView().byId("orgBirim5").setValue(Terfi.Orgeh + " / " + Terfi.OrgehTxt);
			this.getView().byId("calisanGrp5").setValue(Terfi.Persg + " / " + Terfi.Psgtext);
			this.getView().byId("calisanAlt5").setValue(Terfi.Persk + " / " + Terfi.Psktext);
			this.getView().byId("skala5").setValue(Terfi.Trfgr);
			this.getView().byId("ucret5").setValue(Terfi.Ucret);
			this.getView().byId("dilPrim5").setValue(Terfi.Dilpr);
			this.getView().byId("aracPrim5").setValue(Terfi.Arcpr);
			this.getView().byId("mevPrim5").setValue(Terfi.Mevpr);
			this.getView().byId("vekPrim5").setValue(Terfi.Vklpr);
			this.getView().byId("diger5").setValue(Terfi.Diger);
			this.getView().byId("perAlan5").setValue(Terfi.Werks + " / " + Terfi.Pbtxt);
			this.getView().byId("perAltAlan5").setValue(Terfi.Btrtl + " / " + Terfi.Btext);
			this.getView().byId("okulTur5").setValue(Terfi.Slart + " / " + Terfi.SlartTxt);
			this.getView().byId("okulAd5").setValue(Terfi.Insti);
			this.getView().byId("egitim5").setValue(Terfi.Fach1 + " / " + Terfi.Ftext);

			this.getView().byId("InputPosAd5").setValue(Terfi.Plans + " / " + Terfi.Stext);
			this.getView().byId("InputSirket5").setValue(Terfi.Bukrs);
			this.getView().byId("InputIsAlan5").setValue(Terfi.Gsber + " / " + Terfi.Gtext);
			this.getView().byId("InputIsAnahtari5").setValue(Terfi.Stell + " / " + Terfi.StellTxt);
			this.getView().byId("InputOrgBirim5").setValue(Terfi.Orgeh + " / " + Terfi.OrgehTxt);
			this.getView().byId("InputCalisanGrp5").setValue(Terfi.Persg + " / " + Terfi.Psgtext);
			this.getView().byId("InputCalisanAlt5").setValue(Terfi.Persk + " / " + Terfi.Psktext);
			this.getView().byId("InputSkala5").setValue(Terfi.Trfgr);
			this.getView().byId("InputUcret5").setValue(Terfi.Ucret);
			this.getView().byId("InputDilPrim5").setValue(Terfi.Dilpr);
			this.getView().byId("InputAracPrim5").setValue(Terfi.Arcpr);
			this.getView().byId("InputMevPrim5").setValue(Terfi.Mvspr);
			this.getView().byId("InputVekPrim5").setValue(Terfi.Vklpr);
			this.getView().byId("InputDiger5").setValue(Terfi.Diger);
			this.getView().byId("InputPerAlan5").setValue(Terfi.Werks + " / " + Terfi.Pbtxt);
			this.getView().byId("InputPerAltAlan5").setValue(Terfi.Btrtl + " / " + Terfi.Btext);

			//end of ycoskun

		},
		onPressLang: function() {
			var pernr = vPernr;
			var oView = this.getView();
			var oList = oView.byId("idLanguageTable5");
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
						var langtable = oView.byId("idLanguageTable5");
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
			var oList = oView.byId("idAbilityTable5");
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
						var zihintable = oView.byId("idAbilityTable5");
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
			var oList = oView.byId("idPDTable5");
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
						var pdtable = oView.byId("idPDTable5");
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
		}
	});

	return WizardController;

});