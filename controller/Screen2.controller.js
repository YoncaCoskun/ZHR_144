sap.ui.define([
	'jquery.sap.global',
	'sap/ui/core/mvc/Controller',
	'sap/ui/model/json/JSONModel',
	"sap/m/MessageToast",
	"sap/m/MessageBox"

], function(jQuery, Controller, JSONModel, MessageToast, MessageBox) {

	"use strict";

	var oModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZHR_144_SRV_01");
	var osJsonIstenCikisTipi = new sap.ui.model.json.JSONModel();
	var osJsonCikisNedeni = new sap.ui.model.json.JSONModel();
	var osJsonAyrilma = new sap.ui.model.json.JSONModel();
	var vad, vsoyad;

	var WizardController = Controller.extend("ZHR_144.controller.Screen2", {

		onInit: function() {

			this._wizard = this.getView().byId("CreateProductWizard");
			this._oNavContainer = this.getView().byId("wizardNavContainer");
			this._oWizardContentPage = this.getView().byId("wizardContentPage");
			this._oWizardReviewPage = sap.ui.xmlfragment("ZHR_144.view.Screen2ReviewPage", this);
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

			//oModel.setSizeLimit(99999);
			oModel.read("/AyrilmaNedeniSet", null, null, true,

				function(oData) {
					osJsonAyrilma.setData(oData);
				},
				function() {

				});

			oModel.read("/CikisTipiSet", null, null, true,

				function(oData) {
					osJsonIstenCikisTipi.setData(oData);
				},
				function() {

				});

			oModel.read("/CikisNedenSet", null, null, true,

				function(oData) {
					osJsonCikisNedeni.setData(oData);
				},
				function() {

				});

			this.getView().setModel(oModel);

		},

		handlePressMenu: function() {
			var oSplitApp = this.getView().byId("SplitAppDemo");
			oSplitApp.setMode(sap.m.SplitAppMode.ShowHideMode);

		},
		onSearchSicil: function() {
			this.oSearchDialog = sap.ui.xmlfragment("ZHR_144.view.Screen2SicilSearch", this);

			this.oSearchDialog.open();
		},
		handleSicilNoSearch: function() {
			//begin of ycoskun sicilno girip tıklayınca verileri getirme
			//	var sicilNo = oThat.getView().byId("sicilNo2").getValue();

			vad = sap.ui.getCore().byId("adIdSicil").getValue();
			vsoyad = sap.ui.getCore().byId("soyadIdSicil").getValue();
			var that = this;
			var oJsonSicilModel = new sap.ui.model.json.JSONModel();
			var filterSicil = "IAd eq '" + vad + "' and ISoyad eq '" + vsoyad + "' ";
			debugger;
			oModel.read("/SearchSicilSet", null, ["$filter=" + filterSicil], true,
				function(oData) {
					debugger;
					//sicilNo = oData.results.Pernr;
					oJsonSicilModel.setData(oData.results);

				});
				that.oSicilTableDialog = sap.ui.xmlfragment("ZHR_144.view.Screen2SicilTable", that);
			that.getView().setModel(oJsonSicilModel, "JModel");
			sap.ui.getCore().byId("idSicilTable").setModel(this.getView().getModel("JModel"));

			that.oSicilTableDialog.open();

		},
		handleCancelSicil: function() {
			this.oSicilTableDialog.destroy();
		},
		handleCloseSicil: function(oEvent) {
			var that = this;
			var sicilNo;
			var istenCikis = {};
			var aContexts = oEvent.getParameter("selectedContexts");

			if (aContexts && aContexts.length) {
				sicilNo = aContexts.map(function(oContext) {
					return oContext.getObject().Pernr;
				}).join(", ");
			}
			oModel.read("/ZHRIstenCikisSet('" + sicilNo + "')", null, null, false,
				function(oData) {
					istenCikis = oData;

				},
				//begin of ycoskun response ta donen hatayı gosterme 
				function(oEvent) {
					var message = $(oEvent.response.body).find('message').first().text();
					MessageToast.show(message);
				}
				//end of ycoskun
				 
			);

			this.getView().byId("fisKonu2").setValue("İşten Çıkış");
			this.getView().byId("sicilNo2").setValue(sicilNo);
			this.getView().byId("adSoyad2").setValue(istenCikis.Ename);
			this.getView().byId("idTC2").setValue(istenCikis.Tckno);
			this.getView().byId("PosAd2").setValue(istenCikis.Plans + " / " + istenCikis.Stext);
			this.getView().byId("sirket2").setValue(istenCikis.Bukrs);
			this.getView().byId("isAlan2").setValue(istenCikis.Gsber + " / " + istenCikis.Gtext);
			this.getView().byId("isAnahtari2").setValue(istenCikis.Stell + " / " + istenCikis.StellTxt);
			this.getView().byId("orgBirim2").setValue(istenCikis.Orgeh + " / " + istenCikis.OrgehTxt);
			this.getView().byId("calisanGrp2").setValue(istenCikis.Persg + " / " + istenCikis.Psgtext);
			this.getView().byId("calisanAlt2").setValue(istenCikis.Persk + " / " + istenCikis.Psktext);
			this.getView().byId("skala2").setValue(istenCikis.Trfgr);
			this.getView().byId("ucret2").setValue(istenCikis.Ucret);
			this.getView().byId("dilPrim2").setValue(istenCikis.Dilpr);
			this.getView().byId("aracPrim2").setValue(istenCikis.Arcpr);
			this.getView().byId("mevPrim2").setValue(istenCikis.Mvspr);
			this.getView().byId("vekPrim2").setValue(istenCikis.Vklpr);
			this.getView().byId("diger2").setValue(istenCikis.Diger);
			this.getView().byId("perAlan2").setValue(istenCikis.Werks + " / " + istenCikis.Pbtxt);
			this.getView().byId("perAltAlan2").setValue(istenCikis.Btrtl + " / " + istenCikis.Btext);
			this.getView().byId("dogumTarih2").setValue(this.vDate(istenCikis.Gbdat));
			this.getView().byId("gecerTarih2").setValue(this.vDate(istenCikis.Begda));
			
			this.oSicilTableDialog.destroy();
			this.oSearchDialog.destroy();   
			vad="";
			vsoyad="";
			
			

			//end of ycoskun

		},
		onDialogClose: function() {
			this.oSearchDialog.destroy();
			this.oSearchDialog = sap.ui.xmlfragment("ZHR_144.view.Screen2SicilSearch", this.getView().getController());

			this.oSearchDialog.close();
		},

		setProductType: function(evt) {
			var productType = evt.getSource().getTitle();
			this.model.setProperty("/productType", productType);
			this.getView().byId("ProductStepChosenType").setText("Chosen product type: " + productType);
			this._wizard.validateStep(this.getView().byId("GenelStep2"));

		},

		setProductTypeFromSegmented: function(evt) {
			var productType = evt.mParameters.button.getText();
			this.model.setProperty("/productType", productType);
			this._wizard.validateStep(this.getView().byId("GenelStep2"));

		},

		additionalInfoValidation: function() {
			this._wizard.validateStep(this.getView().byId("YeniStep2"));

		},

		optionalStepActivation: function() {},

		optionalStepCompletion: function() {},

		pricingActivate: function() {
			this.model.setProperty("/navApiEnabled", true);
		},

		pricingComplete: function() {
			this.model.setProperty("/navApiEnabled", false);
		},

		scrollFrom4to2: function() {
			this._wizard.goToStep(this.getView().byId("YeniStep2"));
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

		wizardCompletedHandler: function() {

			var that = this;
			var oEntry = [];
			var entryfisKonu2 = "fisKonu2";
			var entrySicilNo2 = "sicilNo2";
			var entryadSoyad2 = "adSoyad2";
			var entryidTC2 = "idTC2";
			var entrydogumTarih2 = "dogumTarih2";
			var entrygecerTarih2 = "gecerTarih2";
			var entryPosAd2 = "PosAd2";
			var entryperAlan2 = "perAlan2";
			var entryperAltAlan2 = "perAltAlan2";
			var entrysirket2 = "sirket2";
			var entryisAlan2 = "isAlan2";
			var entryisAnahtar2 = "isAnahtari2";
			var entryorgBirim2 = "orgBirim2";
			var entryclsGrup2 = "calisanGrp2";
			var entryclsAltGrup2 = "calisanAlt2";
			var entryskalaKod2 = "skala2";
			var entryucret2 = "ucret2";
			var entrydilPrim2 = "dilPrim2";
			var entryaracPrim2 = "aracPrim2";
			var entrymevPrim2 = "mevPrim2";
			var entryvekPrim2 = "vekPrim2";
			var entrydiger2 = "diger2";
			var entryayrilmaKod2 = "ayrilmaKod2";
			var entryCikisNedeni1 = "gercekNeden1";
			var entryCikisNedeni2 = "gercekNeden2";
			var entryCikisNedeni3 = "gercekNeden3";
			var entryayrilmaGercekKod2 = "gercekAyrilmaKod2";

			oEntry[entryfisKonu2] = that.getView().byId(entryfisKonu2).getValue();
			oEntry[entryadSoyad2] = that.getView().byId(entryadSoyad2).getValue();
			oEntry[entrydogumTarih2] = that.getView().byId(entrydogumTarih2).getValue();
			oEntry[entrygecerTarih2] = that.getView().byId(entrygecerTarih2).getValue();
			oEntry[entryPosAd2] = that.getView().byId(entryPosAd2).getValue();
			oEntry[entryisAlan2] = that.getView().byId(entryisAlan2).getValue();
			oEntry[entryisAnahtar2] = that.getView().byId(entryisAnahtar2).getValue();
			oEntry[entryorgBirim2] = that.getView().byId(entryorgBirim2).getValue();
			oEntry[entryclsGrup2] = that.getView().byId(entryclsGrup2).getValue();
			oEntry[entryclsAltGrup2] = that.getView().byId(entryclsAltGrup2).getValue();
			oEntry[entryskalaKod2] = that.getView().byId(entryskalaKod2).getValue();
			oEntry[entryucret2] = that.getView().byId(entryucret2).getValue();
			oEntry[entrydiger2] = that.getView().byId(entrydiger2).getValue();
			oEntry[entryperAlan2] = that.getView().byId(entryperAlan2).getValue();
			oEntry[entryperAltAlan2] = that.getView().byId(entryperAltAlan2).getValue();
			oEntry[entrydilPrim2] = that.getView().byId(entrydilPrim2).getValue();
			oEntry[entryaracPrim2] = that.getView().byId(entryaracPrim2).getValue();
			oEntry[entrymevPrim2] = that.getView().byId(entrymevPrim2).getValue();
			oEntry[entryvekPrim2] = that.getView().byId(entryvekPrim2).getValue();
			oEntry[entrysirket2] = that.getView().byId(entrysirket2).getValue();
			oEntry[entrySicilNo2] = that.getView().byId(entrySicilNo2).getValue();
			oEntry[entryidTC2] = that.getView().byId(entryidTC2).getValue();
			oEntry[entryayrilmaKod2] = that.getView().byId(entryayrilmaKod2).getValue();
			oEntry[entryayrilmaGercekKod2] = that.getView().byId(entryayrilmaGercekKod2).getValue();

			oEntry[entryCikisNedeni1] = that.getView().byId(entryCikisNedeni1).getValue();
			oEntry[entryCikisNedeni2] = that.getView().byId(entryCikisNedeni2).getValue();
			oEntry[entryCikisNedeni3] = that.getView().byId(entryCikisNedeni3).getValue();

			//begin of ycoskun verilerin globalde tutulması islemleri
			sap.ui.getCore().cPernr = that.getView().byId(entrySicilNo2).getValue();
			sap.ui.getCore().cPronr = "02";
			sap.ui.getCore().cAppnr = "01";
			sap.ui.getCore().cAdSoyad = that.getView().byId(entryadSoyad2).getValue();
			sap.ui.getCore().cDogumTarih = that.getView().byId(entrydogumTarih2).getValue();
			sap.ui.getCore().cGecerTarih = that.getView().byId(entrygecerTarih2).getValue();
			sap.ui.getCore().cTC = that.getView().byId(entryidTC2).getValue();
			sap.ui.getCore().cPozisyon = that.getView().byId(entryPosAd2).getValue();
			sap.ui.getCore().cPerAlan = that.getView().byId(entryperAlan2).getValue();
			sap.ui.getCore().cPerAltAlan = that.getView().byId(entryperAltAlan2).getValue();
			sap.ui.getCore().cSirket = that.getView().byId(entrysirket2).getValue();
			sap.ui.getCore().cIsAlan = that.getView().byId(entryisAlan2).getValue();
			sap.ui.getCore().cIsAnahtari = that.getView().byId(entryisAnahtar2).getValue();
			sap.ui.getCore().cOrgBirim = that.getView().byId(entryorgBirim2).getValue();
			sap.ui.getCore().cClsGrup = that.getView().byId(entryclsGrup2).getValue();
			sap.ui.getCore().cClsAltGrp = that.getView().byId(entryclsAltGrup2).getValue();
			sap.ui.getCore().cSkala = that.getView().byId(entryskalaKod2).getValue();
			sap.ui.getCore().cUcret = that.getView().byId(entryucret2).getValue();
			sap.ui.getCore().cDilPrim = that.getView().byId(entrydilPrim2).getValue();
			sap.ui.getCore().cAracPrim = that.getView().byId(entryaracPrim2).getValue();
			sap.ui.getCore().cMevPrim = that.getView().byId(entrymevPrim2).getValue();
			sap.ui.getCore().cVekPrim = that.getView().byId(entryvekPrim2).getValue();
			sap.ui.getCore().cDiger = that.getView().byId(entrydiger2).getValue();
			sap.ui.getCore().cAyrilma = that.getView().byId(entryayrilmaKod2).getValue();
			sap.ui.getCore().cCikisTip = that.getView().byId(entryayrilmaGercekKod2).getValue();
			sap.ui.getCore().cCikisNeden1 = that.getView().byId(entryCikisNedeni1).getValue();
			sap.ui.getCore().cCikisNeden2 = that.getView().byId(entryCikisNedeni2).getValue();
			sap.ui.getCore().cCikisNeden3 = that.getView().byId(entryCikisNedeni3).getValue();

			//end of ycoskun

			//end of ycoskun

			//console.log(oEntry);

			that.getElement("fisKonuRew2").setValue(oEntry.fisKonu2);
			that.getElement("sicilRew2").setValue(oEntry.sicilNo2);
			that.getElement("adSoyadRew2").setValue(oEntry.adSoyad2);
			that.getElement("tcRew2").setValue(oEntry.idTC2);
			that.getElement("dogumTarihRew2").setValue(oEntry.dogumTarih2);
			that.getElement("gecerTarihRew2").setValue(oEntry.gecerTarih2);
			that.getElement("PosAdRew2").setValue(oEntry.PosAd2);
			that.getElement("perAlanRew2").setValue(oEntry.perAlan2);
			that.getElement("perAltAlanRew2").setValue(oEntry.perAltAlan2);
			that.getElement("sirketRew2").setValue(oEntry.sirket2);
			that.getElement("isAlanRew2").setValue(oEntry.isAlan2);
			that.getElement("isAnahRew2").setValue(oEntry.isAnahtari2);
			that.getElement("orgBirRew2").setValue(oEntry.orgBirim2);
			that.getElement("clsRew2").setValue(oEntry.calisanGrp2);
			that.getElement("clsAltRew2").setValue(oEntry.calisanAlt2);
			that.getElement("skalaRew2").setValue(oEntry.skala2);
			that.getElement("ucretRew2").setValue(oEntry.ucret2);
			that.getElement("dilPrimRew2").setValue(oEntry.dilPrim2);
			that.getElement("aracPrimRew2").setValue(oEntry.aracPrim2);
			that.getElement("mevPrimRew2").setValue(oEntry.mevPrim2);
			that.getElement("vekPrimRew2").setValue(oEntry.vekPrim2);
			that.getElement("digerRew2").setValue(oEntry.diger2);
			that.getElement("ayrilmaKodRew2").setValue(oEntry.ayrilmaKod2);
			that.getElement("gercekAyrilmaKod2Rew").setValue(oEntry.gercekAyrilmaKod2);

			that.getElement("gercekNeden1Rew").setValue(oEntry.gercekNeden1);
			that.getElement("gercekNeden2Rew").setValue(oEntry.gercekNeden2);
			that.getElement("gercekNeden3Rew").setValue(oEntry.gercekNeden3);

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
			this._wizard.discardProgress(this.getView().byId("GenelStep2"));

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

		onBackScreen: function() {
			this.getOwnerComponent().getRouter().navTo("PersonalActivity");
			window.location.reload();
		},

		nextOnayPage: function() {
			//burada devam butonuna bastığında onay ekranına gitme işlemi yani buraya onaycıların listelenmesi ve personel verilerinin create edilmesi islemleri
			var that = this;

			//	var entryfisKonu2 = "fisKonu2";
			var entrySicilNo2 = "sicilNo2";
			var entryadSoyad2 = "adSoyad2";
			var entryidTC2 = "idTC2";
			var entrydogumTarih2 = "dogumTarih2";
			var entrygecerTarih2 = "gecerTarih2";
			var entryPosAd2 = "PosAd2";
			var entryperAlan2 = "perAlan2";
			var entryperAltAlan2 = "perAltAlan2";
			var entrysirket2 = "sirket2";
			var entryisAlan2 = "isAlan2";
			var entryisAnahtar2 = "isAnahtari2";
			var entryorgBirim2 = "orgBirim2";
			var entryclsGrup2 = "calisanGrp2";
			var entryclsAltGrup2 = "calisanAlt2";
			var entryskalaKod2 = "skala2";
			var entryucret2 = "ucret2";
			var entrydiger2 = "diger2";
			var entryayrilmaKod2 = "ayrilmaKod2";

			var entryCikisTipiKod2 = "gercekAyrilmaKod2";
			var entryCikisNeden1 = "gercekNeden1";
			var entryCikisNeden2 = "gercekNeden2";
			var entryCikisNeden3 = "gercekNeden3";

			var entryDilPrim2 = "dilPrim2";
			var entryAracPrim2 = "aracPrim2";
			var entryMevPrim2 = "mevPrim2";
			var entryVekPrim2 = "vekPrim2";

			var oPersonelIstenCikis = {};
			var splitArrayDogumT, array, count, dogumTarih;
			var splitArrayGecerT, arrayGecer, countGecer, gecerTarih;
			try {
				splitArrayDogumT = that.getView().byId(entrydogumTarih2).getValue();
				array = splitArrayDogumT.split(".");
				count = array[0].length;
				if (count === 1) {
					array[0] = "0" + array[0];
				}
				dogumTarih = array[2] + array[1] + array[0];

				splitArrayGecerT = that.getView().byId(entrygecerTarih2).getValue();
				arrayGecer = splitArrayGecerT.split(".");
				countGecer = arrayGecer[0].length;
				if (countGecer === 1) {
					arrayGecer[0] = "0" + arrayGecer[0];
				}
				gecerTarih = arrayGecer[2] + arrayGecer[1] + arrayGecer[0];
			} catch (err) {
				splitArrayDogumT = that.getView().byId(entrydogumTarih2).getValue();
				array = splitArrayDogumT.split("/");
				count = array[0].length;
				if (count === 1) {
					array[0] = "0" + array[0];
				}
				dogumTarih = array[2] + array[1] + array[0];

				splitArrayGecerT = that.getView().byId(entrygecerTarih2).getValue();
				arrayGecer = splitArrayGecerT.split("/");
				countGecer = arrayGecer[0].length;
				if (countGecer === 1) {
					arrayGecer[0] = "0" + arrayGecer[0];
				}
				gecerTarih = arrayGecer[2] + arrayGecer[1] + arrayGecer[0];
			}

			oPersonelIstenCikis.Appnr = "01";
			oPersonelIstenCikis.Pronr = "02";
			oPersonelIstenCikis.Pernr = that.getView().byId(entrySicilNo2).getValue();
			oPersonelIstenCikis.Ename = that.getView().byId(entryadSoyad2).getValue();
			oPersonelIstenCikis.Gbdat = dogumTarih;
			oPersonelIstenCikis.Begda = gecerTarih;
			oPersonelIstenCikis.Tckno = that.getView().byId(entryidTC2).getValue();
			oPersonelIstenCikis.Trfgr = that.getView().byId(entryskalaKod2).getValue();
			oPersonelIstenCikis.Bet01 = that.getView().byId(entryucret2).getValue();
			oPersonelIstenCikis.Diger = that.getView().byId(entrydiger2).getValue();

			// SEARCH HELP için açıklamasını split edip degerini alma begin of ycoskun
			//split edip kodu backende yollama begin of ycoskun
			var plans = that.getView().byId(entryPosAd2).getValue();
			var arrayPlans = plans.split(" / ");
			oPersonelIstenCikis.Plans = arrayPlans[0];

			var gsber = that.getView().byId(entryisAlan2).getValue();
			var arrayGsber = gsber.split(" / ");
			oPersonelIstenCikis.Gsber = arrayGsber[0];

			var stell = that.getView().byId(entryisAnahtar2).getValue();
			var arrayStell = stell.split(" / ");
			oPersonelIstenCikis.Stell = arrayStell[0];

			var orgeh = that.getView().byId(entryorgBirim2).getValue();
			var arrayOrgeh = orgeh.split(" / ");
			oPersonelIstenCikis.Orgeh = arrayOrgeh[0];

			var persg = that.getView().byId(entryclsGrup2).getValue();
			var arrayPersg = persg.split(" / ");
			oPersonelIstenCikis.Persg = arrayPersg[0];

			var persk = that.getView().byId(entryclsAltGrup2).getValue();
			var arrayPersk = persk.split(" / ");
			oPersonelIstenCikis.Persk = arrayPersk[0];

			var werks = that.getView().byId(entryperAlan2).getValue();
			var arrayWerks = werks.split(" / ");
			oPersonelIstenCikis.Werks = arrayWerks[0];

			var btrtl = that.getView().byId(entryperAltAlan2).getValue();
			var arrayBtrtl = btrtl.split(" / ");
			oPersonelIstenCikis.Btrtl = arrayBtrtl[0];

			//end of ycoskun
			var massg = that.getView().byId(entryayrilmaKod2).getValue();
			var arrayMassg = massg.split(" / ");
			oPersonelIstenCikis.Massg = arrayMassg[0];

			var cikis_tipi = that.getView().byId(entryCikisTipiKod2).getValue();
			var arrayCikisTipi = cikis_tipi.split(" / ");
			oPersonelIstenCikis.CikisTipi = arrayCikisTipi[0];

			var cikis_neden1 = that.getView().byId(entryCikisNeden1).getValue();
			var arrayCikisNeden1 = cikis_neden1.split(" / ");
			oPersonelIstenCikis.CikisNeden1 = arrayCikisNeden1[0];

			var cikis_neden2 = that.getView().byId(entryCikisNeden2).getValue();
			var arrayCikisNeden2 = cikis_neden2.split(" / ");
			oPersonelIstenCikis.CikisNeden2 = arrayCikisNeden2[0];

			var cikis_neden3 = that.getView().byId(entryCikisNeden3).getValue();
			var arrayCikisNeden3 = cikis_neden3.split(" / ");
			oPersonelIstenCikis.CikisNeden3 = arrayCikisNeden3[0];

			//end of ycoskun

			oPersonelIstenCikis.Dilpr = that.getView().byId(entryDilPrim2).getValue();
			oPersonelIstenCikis.Arcpr = that.getView().byId(entryAracPrim2).getValue();
			oPersonelIstenCikis.Mvspr = that.getView().byId(entryMevPrim2).getValue();
			oPersonelIstenCikis.Vklpr = that.getView().byId(entryVekPrim2).getValue();
			oPersonelIstenCikis.Bukrs = that.getView().byId(entrysirket2).getValue();

			oModel.create("/ZHRIstenCikisPersonelBilgiSet", oPersonelIstenCikis, {
				method: "POST",
				success: function(oData) {
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
			this.getOwnerComponent().getRouter().navTo("screen2Approve");

		},

		backOnayPage: function() {
			var that = this;
			that._handleNavigationToStep(0);
			that._wizard.discardProgress(that._wizard.getSteps()[0]);

		},
		vDate: function(value) {
			if (value) {
				var oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({
					pattern: "dd.MM.yyyy"
				});
				return oDateFormat.format(new Date(value));
			} else {
				return value;
			}
		},
		handleValueHelpAyrilma: function() {
			var that = this;
			var handleClose = function(oEvent) {
				var oSelectedItem = oEvent.getParameter("selectedItem");
				if (oSelectedItem) {
					that.getView().byId("ayrilmaKod2").setValue(oSelectedItem.getDescription() + " / " + oSelectedItem.getTitle());
					that.additionalInfoValidation();
				}
			};
			if (!this._valueHelpSelectDialogAyrilma) {
				this._valueHelpSelectDialogAyrilma = new sap.m.SelectDialog("valueHelpSelectDialogAyrilma", {
					title: "Ayrılma Nedeni",
					items: {
						path: "/results",
						sorter: "Mgtxt",
						template: new sap.m.StandardListItem({
							title: "{Mgtxt}",
							description: "{Massg}",
							active: true
						})
					},
					search: function(oEvent) {
						var sValue = oEvent.getParameter("value");
						var oFilter = new sap.ui.model.Filter(
							"Mgtxt",
							sap.ui.model.FilterOperator.Contains, sValue
						);
						oEvent.getSource().getBinding("items").filter([oFilter]);
					},
					confirm: handleClose
				});
				this._valueHelpSelectDialogAyrilma.setModel(osJsonAyrilma);
			} else {
				this._valueHelpSelectDialogAyrilma.setModel(osJsonAyrilma);
			}
			this._valueHelpSelectDialogAyrilma.open();
		},
		handleValueHelpAyrilmaTip: function() {
			var that = this;
			var handleClose = function(oEvent) {
				var oSelectedItem = oEvent.getParameter("selectedItem");
				if (oSelectedItem) {
					that.getView().byId("gercekAyrilmaKod2").setValue(oSelectedItem.getDescription() + " / " + oSelectedItem.getTitle());
					that.additionalInfoValidation();
				}
			};
			if (!this._valueHelpSelectDialogAyrilmaTip) {
				this._valueHelpSelectDialogAyrilmaTip = new sap.m.SelectDialog("valueHelpSelectDialogAyrilmaTip", {
					title: "İşten Çıkış Tipi",
					items: {
						path: "/results",
						sorter: "ZztermintypTxt",
						template: new sap.m.StandardListItem({
							title: "{ZztermintypTxt}",
							description: "{ZzterminTyp}",
							active: true
						})
					},
					search: function(oEvent) {
						var sValue = oEvent.getParameter("value");
						var oFilter = new sap.ui.model.Filter(
							"ZztermintypTxt",
							sap.ui.model.FilterOperator.Contains, sValue
						);
						oEvent.getSource().getBinding("items").filter([oFilter]);
					},
					confirm: handleClose
				});
				this._valueHelpSelectDialogAyrilmaTip.setModel(osJsonIstenCikisTipi);
			} else {
				this._valueHelpSelectDialogAyrilmaTip.setModel(osJsonIstenCikisTipi);
			}
			this._valueHelpSelectDialogAyrilmaTip.open();
		},
		handleValueHelpNeden1: function() {

			var that = this;
			var handleClose = function(oEvent) {
				var oSelectedItem = oEvent.getParameter("selectedItem");
				if (oSelectedItem) {
					that.getView().byId("gercekNeden1").setValue(oSelectedItem.getDescription() + " / " + oSelectedItem.getTitle());
					that.additionalInfoValidation();
				}
			};
			if (!this._valueHelpSelectDialogAyrilmaNeden1) {
				this._valueHelpSelectDialogAyrilmaNeden1 = new sap.m.SelectDialog("valueHelpSelectDialogAyrilmaNeden1", {
					title: "Gerçek Ayrılma Nedeni",
					items: {
						path: "/results",
						sorter: "ZztermincodeTxt",
						template: new sap.m.StandardListItem({
							title: "{ZztermincodeTxt}",
							description: "{ZzterminCode}",
							active: true
						})
					},
					search: function(oEvent) {
						var sValue = oEvent.getParameter("value");
						var oFilter = new sap.ui.model.Filter(
							"ZztermincodeTxt",
							sap.ui.model.FilterOperator.Contains, sValue
						);
						oEvent.getSource().getBinding("items").filter([oFilter]);
					},
					confirm: handleClose
				});

				this._valueHelpSelectDialogAyrilmaNeden1.setModel(osJsonCikisNedeni);

			} else {
				this._valueHelpSelectDialogAyrilmaNeden1.setModel(osJsonCikisNedeni);
			}
			this._valueHelpSelectDialogAyrilmaNeden1.open();

		},
		handleValueHelpNeden2: function() {

			var that = this;
			var handleClose = function(oEvent) {
				var oSelectedItem = oEvent.getParameter("selectedItem");
				if (oSelectedItem) {
					that.getView().byId("gercekNeden2").setValue(oSelectedItem.getDescription() + " / " + oSelectedItem.getTitle());
					that.additionalInfoValidation();
				}
			};
			if (!this._valueHelpSelectDialogAyrilmaNeden2) {
				this._valueHelpSelectDialogAyrilmaNeden2 = new sap.m.SelectDialog("valueHelpSelectDialogAyrilmaNeden2", {
					title: "Gerçek Ayrılma Nedeni",
					items: {
						path: "/results",
						sorter: "ZztermincodeTxt",
						template: new sap.m.StandardListItem({
							title: "{ZztermincodeTxt}",
							description: "{ZzterminCode}",
							active: true
						})
					},
					search: function(oEvent) {
						var sValue = oEvent.getParameter("value");
						var oFilter = new sap.ui.model.Filter(
							"ZztermincodeTxt",
							sap.ui.model.FilterOperator.Contains, sValue
						);
						oEvent.getSource().getBinding("items").filter([oFilter]);
					},
					confirm: handleClose
				});

				this._valueHelpSelectDialogAyrilmaNeden2.setModel(osJsonCikisNedeni);

			} else {
				this._valueHelpSelectDialogAyrilmaNeden2.setModel(osJsonCikisNedeni);
			}
			this._valueHelpSelectDialogAyrilmaNeden2.open();

		},
		handleValueHelpNeden3: function() {

			var that = this;
			var handleClose = function(oEvent) {
				var oSelectedItem = oEvent.getParameter("selectedItem");
				if (oSelectedItem) {
					that.getView().byId("gercekNeden3").setValue(oSelectedItem.getDescription() + " / " + oSelectedItem.getTitle());
					that.additionalInfoValidation();
				}
			};
			if (!this._valueHelpSelectDialogAyrilmaNeden3) {
				this._valueHelpSelectDialogAyrilmaNeden3 = new sap.m.SelectDialog("valueHelpSelectDialogAyrilmaNeden3", {
					title: "Gerçek Ayrılma Nedeni",
					items: {
						path: "/results",
						sorter: "ZztermincodeTxt",
						template: new sap.m.StandardListItem({
							title: "{ZztermincodeTxt}",
							description: "{ZzterminCode}",
							active: true
						})
					},
					search: function(oEvent) {
						var sValue = oEvent.getParameter("value");
						var oFilter = new sap.ui.model.Filter(
							"ZztermincodeTxt",
							sap.ui.model.FilterOperator.Contains, sValue
						);
						oEvent.getSource().getBinding("items").filter([oFilter]);
					},
					confirm: handleClose
				});

				this._valueHelpSelectDialogAyrilmaNeden3.setModel(osJsonCikisNedeni);

			} else {
				this._valueHelpSelectDialogAyrilmaNeden3.setModel(osJsonCikisNedeni);
			}
			this._valueHelpSelectDialogAyrilmaNeden3.open();

		}

	});

	return WizardController;

});