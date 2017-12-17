sap.ui.define(["sap/ui/core/mvc/Controller", "sap/ui/core/routing/History", "sap/ui/commons/TextField"], function(Controller, History,

	TextField) {

	"use strict";

	var oModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZHR_144_SRV_01");
	var selectPernr;
	var selectPronr;
	var firstPernr;
	var firstPronr;
	var formPronr = [];
	var selectAppnr;
	var firstAppnr;

	var vOK = "Tamamlandı";
	var vWait = "Bekleniyor";
	var xStatu;

	var vrPernr, vrPronr, vrAppnr;
	return Controller.extend("ZHR_144.controller.History", {

		onInit: function() {
			var that = this;
			var oJasonModel = new sap.ui.model.json.JSONModel();

			oModel.read("/ZHRHistorySet", null, null, false,
				function(oData) {
					oJasonModel.setData(oData);
					for (var a = 0; a < oData.results.length; a++) {
						vrPernr = oData.results[a].Pernr;
						vrPronr = oData.results[a].Pronr;
						vrAppnr = oData.results[a].Appnr
						var filterOnayci = "Pernr eq '" + vrPernr + "' and  Pronr eq '" + vrPronr + "' and Appnr eq '" + vrAppnr + "'";
						oModel.read("/ZHROnayciStatuSet", null, ["$filter=" + filterOnayci], false,
							function(oData) {
							for (var b = 0; b < oData.results.length; b++) {
								debugger;
								if(oData.results[b].Statu ===""){
									xStatu="Bekleniyor";
								}
							}
								//onayciModel.setData(oData);
								//	console.log(oData);
							});
						if(xStatu ==="Bekleniyor"){
							oData.results[a].Uname = vWait;
						}
						else{
							oData.results[a].Uname = vOK;
						}
					

					}

					try {
						firstPernr = oData.results[0].Pernr;
						firstPronr = oData.results[0].Pronr;
					} catch (err) {

					}
					for (var j = 0; j < oData.results.length; j++) {
						if (oData.results[j].Pronr === "01") {
							oData.results[j].Pernr = "-";
						}
						formPronr.push(oData.results[j].Pronr);
					}

				});

			that.getView().setModel(oJasonModel, "JasonModel");
			this.getView().byId("historyList").setModel(this.getView().getModel("JasonModel"));

		},

		onBack: function() {

			this.getOwnerComponent().getRouter().navTo("PersonalActivity");

		},
		onAfterRendering: function() {
			var that = this;
			var pozisyon, perAlan, perAltAlan, isAlan, isAnahtar, orgBirim, clsGrup, aracPrim, dilPrim, mevPrim, vekPrim, fisKonu;
			var clsAltGrp, skala, ucret, diger, okulTur, okulAd, egitim, adSoyad, dogumTarih, gecerTarih, sirket, tc, sicil, ayrilma;

			var oLangModel = new sap.ui.model.json.JSONModel();
			var perFilter = "Pernr eq '" + firstPernr + "'";
			var oAbModel = new sap.ui.model.json.JSONModel();
			var perAbFilter = "Pernr eq '" + firstPernr + "'";
			var attachModel = new sap.ui.model.json.JSONModel();
			var perAttachFilter = "IvPernr eq '" + firstPernr + "'";
			var langtable = that.getView().byId("idLanguageTable");
			var zbtable = that.getView().byId("idAbilityTable");
			var onayciModel = new sap.ui.model.json.JSONModel();
			var oPdModel = new sap.ui.model.json.JSONModel();
			var ozbModel = new sap.ui.model.json.JSONModel();
			var perZbFilter = "Pernr eq '" + firstPernr + "'";

			var oYDModel = new sap.ui.model.json.JSONModel();
			var perFilterYD = "Pernr eq '" + firstPernr + "'";
			//	var pdtable = sap.ui.getCore().byId("idPDTable3");

			firstAppnr = "01";
			var filterOnayci = "Pernr eq '" + firstPernr + "' and  Pronr eq '" +
				+"' and Appnr eq '" + firstAppnr + "'";

			setTimeout(function() {
				if (firstPronr === "01") {
					oModel.read("/ZHRTalepPersonelBilgiSet('" + firstPernr + "')", null, null, true,
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
							sicil = "";
							fisKonu = "İşe Alım";

							that.getView().byId("fisApprove").setText(fisKonu);
							that.getView().byId("adSoyadApprove").setText(adSoyad);
							that.getView().byId("dogumTarihApprove").setText(that.firstFormatDate(dogumTarih));
							that.getView().byId("gecerTarihApprove").setText(that.firstFormatDate(gecerTarih));
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

							//begin of ycoskun visible false olacaklar 
							that.getView().byId("labelSicil").setVisible(false);
							that.getView().byId("sicilApprove").setVisible(false);
							that.getView().byId("labelDil").setVisible(false);
							that.getView().byId("dilPrimApprove").setVisible(false);
							that.getView().byId("labelArac").setVisible(false);
							that.getView().byId("aracPrimApprove").setVisible(false);
							that.getView().byId("labelMev").setVisible(false);
							that.getView().byId("mevPrimApprove").setVisible(false);
							that.getView().byId("labelVek").setVisible(false);
							that.getView().byId("vekPrimApprove").setVisible(false);
							that.getView().byId("labelTC").setVisible(false);
							that.getView().byId("tcApprove").setVisible(false);
							that.getView().byId("labelSirket").setVisible(false);
							that.getView().byId("sirketApprove").setVisible(false);

							that.getView().byId("labelOkulTur").setVisible(true);
							that.getView().byId("okulTurApprove").setVisible(true);
							that.getView().byId("labelOkulAd").setVisible(true);
							that.getView().byId("okulAdApprove").setVisible(true);
							that.getView().byId("labelEgitim").setVisible(true);
							that.getView().byId("egitimApprove").setVisible(true);
							that.getView().byId("labelAyrilma").setVisible(false);
							that.getView().byId("ayrilmaApprove").setVisible(false);

							that.getView().byId("iconTabTable").setVisible(true);
							that.getView().byId("idPDTable3").setVisible(false);
							that.getView().byId("formPD").setVisible(false);
							that.getView().byId("IconTabAttach").setVisible(true);

						});
					//işe alım personelinin yabancı dillerini getirme

					oModel.read("/ZHRIseAlimYDSet", null, ["$filter=" + perFilter], false,
						function(oData) {
							oLangModel.setData(oData);
							//	console.log(oData);
						});
					that.getView().setModel(oLangModel, "LangModel");
					langtable.setModel(that.getView().getModel("LangModel"));

					//işe alım personelinin zihinsel beceri bilgilerini getirme

					oModel.read("/ZHRIseAlimZBSet", null, ["$filter=" + perAbFilter], false,
						function(oData) {
							oAbModel.setData(oData);

						});
					that.getView().setModel(oAbModel, "oAbModel");
					zbtable.setModel(that.getView().getModel("oAbModel"));

					//işe alım personelinin eklerinin getirilmesi

					oModel.read("/ZHRAttachDisplaySet", null, ["$filter=" + perAttachFilter], false,
						function(oData) {
							attachModel.setData(oData);
							//	console.log(oData);
						});
					that.getView().setModel(attachModel, "attachModel");

					//end of ycoskun

					//işe alım personelinin onaycılarının getirilmesi
					oModel.read("/ZHROnayciStatuSet", null, ["$filter=" + filterOnayci], false,
						function(oData) {
							onayciModel.setData(oData);
						});
					that.getView().setModel(onayciModel, "onayciModel");

					//end of ycoskun

				} else if (firstPronr === "02") {
					oModel.read("/ZHRIstenCikisSet('" + firstPernr + "')", null, null, true,
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
							ucret = oData.Ucret;
							diger = oData.Diger;
							okulTur = "";
							okulAd = "";
							egitim = "";
							adSoyad = oData.Ename;
							dogumTarih = oData.Gbdat;
							gecerTarih = oData.Begda;
							aracPrim = oData.Arcpr;
							dilPrim = oData.Dilpr;
							mevPrim = oData.Mvspr;
							vekPrim = oData.Vklpr;
							sirket = oData.Bukrs;
							tc = oData.Tckno;
							sicil = firstPernr;
							fisKonu = "İşten Çıkış";
							ayrilma = oData.Mgtxt;

							that.getView().byId("fisApprove").setText(fisKonu);
							that.getView().byId("adSoyadApprove").setText(adSoyad);
							that.getView().byId("dogumTarihApprove").setText(that.firstFormatDate(dogumTarih));
							that.getView().byId("gecerTarihApprove").setText(that.firstFormatDate(gecerTarih));
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
							that.getView().byId("ayrilmaApprove").setValue(ayrilma);

							//begin of ycoskun visible yapma
							that.getView().byId("labelSicil").setVisible(true);
							that.getView().byId("sicilApprove").setVisible(true);
							that.getView().byId("labelDil").setVisible(true);
							that.getView().byId("dilPrimApprove").setVisible(true);
							that.getView().byId("labelArac").setVisible(true);
							that.getView().byId("aracPrimApprove").setVisible(true);
							that.getView().byId("labelMev").setVisible(true);
							that.getView().byId("mevPrimApprove").setVisible(true);
							that.getView().byId("labelVek").setVisible(true);
							that.getView().byId("vekPrimApprove").setVisible(true);
							that.getView().byId("labelTC").setVisible(true);
							that.getView().byId("tcApprove").setVisible(true);
							that.getView().byId("labelSirket").setVisible(true);
							that.getView().byId("sirketApprove").setVisible(true);
							that.getView().byId("labelAyrilma").setVisible(true);
							that.getView().byId("ayrilmaApprove").setVisible(true);

							that.getView().byId("labelOkulTur").setVisible(false);
							that.getView().byId("okulTurApprove").setVisible(false);
							that.getView().byId("labelOkulAd").setVisible(false);
							that.getView().byId("okulAdApprove").setVisible(false);
							that.getView().byId("labelEgitim").setVisible(false);
							that.getView().byId("egitimApprove").setVisible(false);

							that.getView().byId("iconTabTable").setVisible(false);
							that.getView().byId("idPDTable3").setVisible(false);
							that.getView().byId("formPD").setVisible(false);
							that.getView().byId("IconTabAttach").setVisible(false);

						});

					//işe alım personelinin onaycılarının getirilmesi

					oModel.read("/ZHROnayciStatuSet", null, ["$filter=" + filterOnayci], false,
						function(oData) {
							onayciModel.setData(oData);
							//	console.log(oData);
						});
					that.getView().setModel(onayciModel, "onayciModel");

					//end of ycoskun

				} else if (firstPronr === "03") {
					oModel.read("/ZHRGuncelTerfiSet('" + firstPernr + "')", null, null, true,
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
							ucret = oData.Ucret;
							diger = oData.Diger;
							okulTur = oData.SlartTxt;
							okulAd = oData.Insti;
							egitim = oData.Ftext;
							adSoyad = oData.Ename;
							dogumTarih = oData.Gbdat;
							gecerTarih = oData.Begda;
							aracPrim = oData.Arcpr;
							dilPrim = oData.Dilpr;
							mevPrim = oData.Mvspr;
							vekPrim = oData.Vklpr;
							sirket = oData.Bukrs;
							tc = oData.Tckno;
							sicil = firstPernr;
							fisKonu = "Terfi";

							that.getView().byId("fisApprove").setText(fisKonu);
							that.getView().byId("adSoyadApprove").setText(adSoyad);
							that.getView().byId("dogumTarihApprove").setText(that.firstFormatDate(dogumTarih));
							that.getView().byId("gecerTarihApprove").setText(that.firstFormatDate(gecerTarih));
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

							//begin of ycoskun visible yapma
							that.getView().byId("labelSicil").setVisible(true);
							that.getView().byId("sicilApprove").setVisible(true);
							that.getView().byId("labelDil").setVisible(true);
							that.getView().byId("dilPrimApprove").setVisible(true);
							that.getView().byId("labelArac").setVisible(true);
							that.getView().byId("aracPrimApprove").setVisible(true);
							that.getView().byId("labelMev").setVisible(true);
							that.getView().byId("mevPrimApprove").setVisible(true);
							that.getView().byId("labelVek").setVisible(true);
							that.getView().byId("vekPrimApprove").setVisible(true);
							that.getView().byId("labelTC").setVisible(true);
							that.getView().byId("tcApprove").setVisible(true);
							that.getView().byId("labelSirket").setVisible(true);
							that.getView().byId("sirketApprove").setVisible(true);

							that.getView().byId("labelOkulTur").setVisible(true);
							that.getView().byId("okulTurApprove").setVisible(true);
							that.getView().byId("labelOkulAd").setVisible(true);
							that.getView().byId("okulAdApprove").setVisible(true);
							that.getView().byId("labelEgitim").setVisible(true);
							that.getView().byId("egitimApprove").setVisible(true);
							that.getView().byId("labelAyrilma").setVisible(false);
							that.getView().byId("ayrilmaApprove").setVisible(false);

							that.getView().byId("iconTabTable").setVisible(true);
							that.getView().byId("idPDTable3").setVisible(true);
							that.getView().byId("formPD").setVisible(true);
							that.getView().byId("IconTabAttach").setVisible(false);

						});
					//begin of ycoskun terfi yabancı dilleri getir

					oModel.read("/ZHRTerfiYDSet", null, ["$filter=" + perFilterYD], true,
						function(oData) {
							oYDModel.setData(oData);

						});
					that.getView().setModel(oYDModel, "oYDModel");
					var YDtable = that.getView().byId("idLanguageTable");
					YDtable.setModel(this.getView().getModel("oYDModel"));

					//end of ycoskun

					//begin of ycoskun  zihinsel beceri bilgileri getir

					oModel.read("/ZHRTerfiZBSet", null, ["$filter=" + perZbFilter], true,
						function(oData) {
							ozbModel.setData(oData);

						});
					that.getView().setModel(ozbModel, "ozbModel");
					zbtable.setModel(this.getView().getModel("ozbModel"));
					//end of ycoskun 

					//pd sonucları goruntuleme begin of ycoskun
					var oPDModel = new sap.ui.model.json.JSONModel();
					var perFilterPD = "Pernr eq '" + firstPernr + "'";

					oModel.read("/ZHRTerfiPDSet", null, ["$filter=" + perFilterPD], true,
						function(oData) {
							oPDModel.setData(oData);

						});
					that.getView().setModel(oPDModel, "PDModel");
					var pdtable = that.getView().byId("idPDTable3");
					pdtable.setModel(this.getView().getModel("PDModel"));
					//end of ycoskun

					//işe alım personelinin onaycılarının getirilmesi

					oModel.read("/ZHROnayciStatuSet", null, ["$filter=" + filterOnayci], false,
						function(oData) {
							onayciModel.setData(oData);
							//	console.log(oData);
						});
					that.getView().setModel(onayciModel, "onayciModel");

					//end of ycoskun
				} else if (firstPronr === "04") {
					oModel.read("/ZHRGuncelTerfiSet('" + firstPernr + "')", null, null, true,
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
							ucret = oData.Ucret;
							diger = oData.Diger;
							okulTur = oData.SlartTxt;
							okulAd = oData.Insti;
							egitim = oData.Ftext;
							adSoyad = oData.Ename;
							dogumTarih = oData.Gbdat;
							gecerTarih = oData.Begda;
							aracPrim = oData.Arcpr;
							dilPrim = oData.Dilpr;
							mevPrim = oData.Mvspr;
							vekPrim = oData.Vklpr;
							sirket = oData.Bukrs;
							tc = oData.Tckno;
							sicil = firstPernr;
							fisKonu = "Nakil";

							that.getView().byId("fisApprove").setText(fisKonu);
							that.getView().byId("adSoyadApprove").setText(adSoyad);
							that.getView().byId("dogumTarihApprove").setText(that.firstFormatDate(dogumTarih));
							that.getView().byId("gecerTarihApprove").setText(that.firstFormatDate(gecerTarih));
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

							//begin of ycoskun visible yapma
							that.getView().byId("labelSicil").setVisible(true);
							that.getView().byId("sicilApprove").setVisible(true);
							that.getView().byId("labelDil").setVisible(true);
							that.getView().byId("dilPrimApprove").setVisible(true);
							that.getView().byId("labelArac").setVisible(true);
							that.getView().byId("aracPrimApprove").setVisible(true);
							that.getView().byId("labelMev").setVisible(true);
							that.getView().byId("mevPrimApprove").setVisible(true);
							that.getView().byId("labelVek").setVisible(true);
							that.getView().byId("vekPrimApprove").setVisible(true);
							that.getView().byId("labelTC").setVisible(true);
							that.getView().byId("tcApprove").setVisible(true);
							that.getView().byId("labelSirket").setVisible(true);
							that.getView().byId("sirketApprove").setVisible(true);

							that.getView().byId("labelOkulTur").setVisible(true);
							that.getView().byId("okulTurApprove").setVisible(true);
							that.getView().byId("labelOkulAd").setVisible(true);
							that.getView().byId("okulAdApprove").setVisible(true);
							that.getView().byId("labelEgitim").setVisible(true);
							that.getView().byId("egitimApprove").setVisible(true);

							that.getView().byId("iconTabTable").setVisible(true);
							that.getView().byId("idPDTable3").setVisible(true);
							that.getView().byId("formPD").setVisible(true);
							that.getView().byId("IconTabAttach").setVisible(false);

						});
					//begin of ycoskun terfi yabancı dilleri getir
					oModel.read("/ZHRTerfiYDSet", null, ["$filter=" + perFilterYD], true,
						function(oData) {
							oYDModel.setData(oData);

						});
					that.getView().setModel(oYDModel, "oYDModel");
					YDtable.setModel(this.getView().getModel("oYDModel"));

					//end of ycoskun

					//begin of ycoskun  zihinsel beceri bilgileri getir

					oModel.read("/ZHRTerfiZBSet", null, ["$filter=" + perZbFilter], true,
						function(oData) {
							ozbModel.setData(oData);

						});
					that.getView().setModel(ozbModel, "ozbModel");
					var ozbtable = that.getView().byId("idAbilityTable");
					ozbtable.setModel(this.getView().getModel("ozbModel"));

					//end of ycoskun

					//pd sonucları goruntuleme begin of ycoskun

					oModel.read("/ZHRTerfiPDSet", null, ["$filter=" + perFilterPD], true,
						function(oData) {
							oPDModel.setData(oData);

						});
					that.getView().setModel(oPDModel, "PDModel");
					pdtable = that.getView().byId("idPDTable3");
					pdtable.setModel(this.getView().getModel("PDModel"));
					//end of ycoskun

					//işe alım personelinin onaycılarının getirilmesi

					oModel.read("/ZHROnayciStatuSet", null, ["$filter=" + filterOnayci], false,
						function(oData) {
							onayciModel.setData(oData);
							//	console.log(oData);
						});
					that.getView().setModel(onayciModel, "onayciModel");

					//end of ycoskun
				} else if (firstPronr === "05") {
					oModel.read("/ZHRGuncelTerfiSet('" + firstPernr + "')", null, null, true,
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
							ucret = oData.Ucret;
							diger = oData.Diger;
							okulTur = oData.SlartTxt;
							okulAd = oData.Insti;
							egitim = oData.Ftext;
							adSoyad = oData.Ename;
							dogumTarih = oData.Gbdat;
							gecerTarih = oData.Begda;
							aracPrim = oData.Arcpr;
							dilPrim = oData.Dilpr;
							mevPrim = oData.Mvspr;
							vekPrim = oData.Vklpr;
							sirket = oData.Bukrs;
							tc = oData.Tckno;
							sicil = firstPernr;

							fisKonu = "Görev Değişikliği";

							that.getView().byId("fisApprove").setText(fisKonu);
							that.getView().byId("adSoyadApprove").setText(adSoyad);
							that.getView().byId("dogumTarihApprove").setText(that.firstFormatDate(dogumTarih));
							that.getView().byId("gecerTarihApprove").setText(that.firstFormatDate(gecerTarih));
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

							//begin of ycoskun visible yapma
							that.getView().byId("labelSicil").setVisible(true);
							that.getView().byId("sicilApprove").setVisible(true);
							that.getView().byId("labelDil").setVisible(true);
							that.getView().byId("dilPrimApprove").setVisible(true);
							that.getView().byId("labelArac").setVisible(true);
							that.getView().byId("aracPrimApprove").setVisible(true);
							that.getView().byId("labelMev").setVisible(true);
							that.getView().byId("mevPrimApprove").setVisible(true);
							that.getView().byId("labelVek").setVisible(true);
							that.getView().byId("vekPrimApprove").setVisible(true);
							that.getView().byId("labelTC").setVisible(true);
							that.getView().byId("tcApprove").setVisible(true);
							that.getView().byId("labelSirket").setVisible(true);
							that.getView().byId("sirketApprove").setVisible(true);

							that.getView().byId("labelOkulTur").setVisible(true);
							that.getView().byId("okulTurApprove").setVisible(true);
							that.getView().byId("labelOkulAd").setVisible(true);
							that.getView().byId("okulAdApprove").setVisible(true);
							that.getView().byId("labelEgitim").setVisible(true);
							that.getView().byId("egitimApprove").setVisible(true);

							that.getView().byId("iconTabTable").setVisible(true);
							that.getView().byId("idPDTable3").setVisible(true);
							that.getView().byId("formPD").setVisible(true);
							that.getView().byId("IconTabAttach").setVisible(false);

						});
					//begin of ycoskun terfi yabancı dilleri getir
					oModel.read("/ZHRTerfiYDSet", null, ["$filter=" + perFilterYD], true,
						function(oData) {
							oYDModel.setData(oData);

						});
					that.getView().setModel(oYDModel, "oYDModel");
					YDtable.setModel(this.getView().getModel("oYDModel"));

					//end of ycoskun

					//begin of ycoskun  zihinsel beceri bilgileri getir

					oModel.read("/ZHRTerfiZBSet", null, ["$filter=" + perZbFilter], true,
						function(oData) {
							ozbModel.setData(oData);

						});
					that.getView().setModel(ozbModel, "ozbModel");
					ozbtable = that.getView().byId("idAbilityTable");
					ozbtable.setModel(this.getView().getModel("ozbModel"));

					//end of ycoskun

					//pd sonucları goruntuleme begin of ycoskun

					oModel.read("/ZHRTerfiPDSet", null, ["$filter=" + perFilterPD], true,
						function(oData) {
							oPDModel.setData(oData);

						});
					that.getView().setModel(oPDModel, "PDModel");
					pdtable = that.getView().byId("idPDTable3");
					pdtable.setModel(this.getView().getModel("PDModel"));
					//end of ycoskun

					//işe alım personelinin onaycılarının getirilmesi

					oModel.read("/ZHROnayciStatuSet", null, ["$filter=" + filterOnayci], false,
						function(oData) {
							onayciModel.setData(oData);
							//	console.log(oData);
						});
					that.getView().setModel(onayciModel, "onayciModel");

					//end of ycoskun
				} else if (firstPronr === "06") {
					oModel.read("/ZHRGuncelTerfiSet('" + firstPernr + "')", null, null, true,
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
							ucret = oData.Ucret;
							diger = oData.Diger;
							okulTur = oData.SlartTxt;
							okulAd = oData.Insti;
							egitim = oData.Ftext;
							adSoyad = oData.Ename;
							dogumTarih = oData.Gbdat;
							gecerTarih = oData.Begda;
							aracPrim = oData.Arcpr;
							dilPrim = oData.Dilpr;
							mevPrim = oData.Mvspr;
							vekPrim = oData.Vklpr;
							sirket = oData.Bukrs;
							tc = oData.Tckno;
							sicil = firstPernr;
							fisKonu = "Ücret Değişikliği";

							that.getView().byId("fisApprove").setText(fisKonu);
							that.getView().byId("adSoyadApprove").setText(adSoyad);
							that.getView().byId("dogumTarihApprove").setText(that.firstFormatDate(dogumTarih));
							that.getView().byId("gecerTarihApprove").setText(that.firstFormatDate(gecerTarih));
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

							//begin of ycoskun visible yapma
							that.getView().byId("labelSicil").setVisible(true);
							that.getView().byId("sicilApprove").setVisible(true);
							that.getView().byId("labelDil").setVisible(true);
							that.getView().byId("dilPrimApprove").setVisible(true);
							that.getView().byId("labelArac").setVisible(true);
							that.getView().byId("aracPrimApprove").setVisible(true);
							that.getView().byId("labelMev").setVisible(true);
							that.getView().byId("mevPrimApprove").setVisible(true);
							that.getView().byId("labelVek").setVisible(true);
							that.getView().byId("vekPrimApprove").setVisible(true);
							that.getView().byId("labelTC").setVisible(true);
							that.getView().byId("tcApprove").setVisible(true);
							that.getView().byId("labelSirket").setVisible(true);
							that.getView().byId("sirketApprove").setVisible(true);

							that.getView().byId("labelOkulTur").setVisible(true);
							that.getView().byId("okulTurApprove").setVisible(true);
							that.getView().byId("labelOkulAd").setVisible(true);
							that.getView().byId("okulAdApprove").setVisible(true);
							that.getView().byId("labelEgitim").setVisible(true);
							that.getView().byId("egitimApprove").setVisible(true);

							that.getView().byId("iconTabTable").setVisible(true);
							that.getView().byId("idPDTable3").setVisible(true);
							that.getView().byId("formPD").setVisible(true);
							that.getView().byId("IconTabAttach").setVisible(false);

						});
					//begin of ycoskun terfi yabancı dilleri getir
					oModel.read("/ZHRTerfiYDSet", null, ["$filter=" + perFilterYD], true,
						function(oData) {
							oYDModel.setData(oData);

						});
					that.getView().setModel(oYDModel, "oYDModel");
					YDtable.setModel(this.getView().getModel("oYDModel"));

					//end of ycoskun

					//begin of ycoskun  zihinsel beceri bilgileri getir

					oModel.read("/ZHRTerfiZBSet", null, ["$filter=" + perZbFilter], true,
						function(oData) {
							ozbModel.setData(oData);

						});
					that.getView().setModel(ozbModel, "ozbModel");
					ozbtable = that.getView().byId("idAbilityTable");
					ozbtable.setModel(this.getView().getModel("ozbModel"));

					//end of ycoskun

					//pd sonucları goruntuleme begin of ycoskun

					oModel.read("/ZHRTerfiPDSet", null, ["$filter=" + perFilterPD], true,
						function(oData) {
							oPDModel.setData(oData);

						});
					that.getView().setModel(oPDModel, "PDModel");
					pdtable = that.getView().byId("idPDTable3");
					pdtable.setModel(this.getView().getModel("PDModel"));
					//end of ycoskun

					//işe alım personelinin onaycılarının getirilmesi

					oModel.read("/ZHROnayciStatuSet", null, ["$filter=" + filterOnayci], false,
						function(oData) {
							onayciModel.setData(oData);
							//	console.log(oData);
						});
					that.getView().setModel(onayciModel, "onayciModel");

					//end of ycoskun
				}
			}, 1000);

		},
		onListItemPress: function(oEvent) {
			var that = this;
			var oJasonModel = new sap.ui.model.json.JSONModel();
			var selectItem = oEvent.getSource().getId();
			//oThat.getView().byId("idDetail").setValue(selectItemTitle);
			var arrayId = selectItem.split("-");
			var selectId = arrayId[arrayId.length - 1];

			oModel.read("/ZHRHistorySet", null, null, false,
				function(oData) {
					oJasonModel.setData(oData);
					selectPernr = oData.results[selectId].Pernr;
					selectPronr = oData.results[selectId].Pronr;
					console.log(selectPernr);

				});

			//işe alım için tıklanan personelin information alanına bilgilerin set edilmesi		
			var pozisyon, perAlan, perAltAlan, isAlan, isAnahtar, orgBirim, clsGrup, aracPrim, dilPrim, mevPrim, vekPrim, fisKonu;
			var clsAltGrp, skala, ucret, diger, okulTur, okulAd, egitim, adSoyad, dogumTarih, gecerTarih, sirket, tc, sicil, ayrilma;
			var oJPerModel = new sap.ui.model.json.JSONModel();
			var oLangModel = new sap.ui.model.json.JSONModel();
			var perFilter = "Pernr eq '" + selectPernr + "'";
			var oAbModel = new sap.ui.model.json.JSONModel();
			var perAbFilter = "Pernr eq '" + selectPernr + "'";
			var attachModel = new sap.ui.model.json.JSONModel();
			var perAttachFilter = "IvPernr eq '" + selectPernr + "'";
			var langtable = that.getView().byId("idLanguageTable");
			var zbtable = that.getView().byId("idAbilityTable");

			var onayciModel = new sap.ui.model.json.JSONModel();
			selectAppnr = "01";
			var filterOnayci = "Pernr eq '" + selectPernr + "' and  Pronr eq '" + selectPronr + "' and Appnr eq '" + selectAppnr + "'";

			if (selectPronr === "01") {
				oModel.read("/ZHRTalepPersonelBilgiSet('" + selectPernr + "')", null, null, true,
					function(oData) {
						oJPerModel.setData(oData);

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
						sicil = "";
						fisKonu = "İşe Alım";

						that.getView().byId("fisApprove").setText(fisKonu);
						that.getView().byId("adSoyadApprove").setText(adSoyad);
						that.getView().byId("dogumTarihApprove").setText(that.formatDate(dogumTarih));
						that.getView().byId("gecerTarihApprove").setText(that.formatDate(gecerTarih));
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

						//begin of ycoskun visible false olacaklar 
						that.getView().byId("labelSicil").setVisible(false);
						that.getView().byId("sicilApprove").setVisible(false);
						that.getView().byId("labelDil").setVisible(false);
						that.getView().byId("dilPrimApprove").setVisible(false);
						that.getView().byId("labelArac").setVisible(false);
						that.getView().byId("aracPrimApprove").setVisible(false);
						that.getView().byId("labelMev").setVisible(false);
						that.getView().byId("mevPrimApprove").setVisible(false);
						that.getView().byId("labelVek").setVisible(false);
						that.getView().byId("vekPrimApprove").setVisible(false);
						that.getView().byId("labelTC").setVisible(false);
						that.getView().byId("tcApprove").setVisible(false);
						that.getView().byId("labelSirket").setVisible(false);
						that.getView().byId("sirketApprove").setVisible(false);
						that.getView().byId("labelAyrilma").setVisible(false);
						that.getView().byId("ayrilmaApprove").setVisible(false);

						that.getView().byId("labelOkulTur").setVisible(true);
						that.getView().byId("okulTurApprove").setVisible(true);
						that.getView().byId("labelOkulAd").setVisible(true);
						that.getView().byId("okulAdApprove").setVisible(true);
						that.getView().byId("labelEgitim").setVisible(true);
						that.getView().byId("egitimApprove").setVisible(true);

						that.getView().byId("iconTabTable").setVisible(true);
						that.getView().byId("idPDTable3").setVisible(false);
						that.getView().byId("formPD").setVisible(false);
						that.getView().byId("IconTabAttach").setVisible(true);

					});

				//işe alım personelinin yabancı dillerini getirme

				oModel.read("/ZHRIseAlimYDSet", null, ["$filter=" + perFilter], false,
					function(oData) {
						oLangModel.setData(oData);
						//	console.log(oData);
					});
				that.getView().setModel(oLangModel, "LangModel");
				langtable.setModel(this.getView().getModel("LangModel"));

				//işe alım personelinin zihinsel beceri bilgilerini getirme

				oModel.read("/ZHRIseAlimZBSet", null, ["$filter=" + perAbFilter], false,
					function(oData) {
						oAbModel.setData(oData);

					});
				that.getView().setModel(oAbModel, "oAbModel");
				zbtable.setModel(this.getView().getModel("oAbModel"));

				//işe alım personelinin eklerinin getirilmesi

				oModel.read("/ZHRAttachDisplaySet", null, ["$filter=" + perAttachFilter], false,
					function(oData) {
						attachModel.setData(oData);
						//	console.log(oData);
					});
				that.getView().setModel(attachModel, "attachModel");
				//end of ycoskun

				//işe alım personelinin onaycılarının getirilmesi
				oModel.read("/ZHROnayciStatuSet", null, ["$filter=" + filterOnayci], false,
					function(oData) {
						onayciModel.setData(oData);
						//	console.log(oData);
					});
				that.getView().setModel(onayciModel, "onayciModel");

			} else if (selectPronr === "02") {
				oModel.read("/ZHRIstenCikisSet('" + selectPernr + "')", null, null, true,
					function(oData) {
						oJPerModel.setData(oData);

						pozisyon = oData.Stext;
						perAlan = oData.Pbtxt;
						perAltAlan = oData.Btext;
						isAlan = oData.Gtext;
						isAnahtar = oData.StellTxt;
						orgBirim = oData.OrgehTxt;
						clsGrup = oData.Psgtext;
						clsAltGrp = oData.Psktext;
						skala = oData.Trfgr;
						ucret = oData.Ucret;
						diger = oData.Diger;
						okulTur = "";
						okulAd = "";
						egitim = "";
						adSoyad = oData.Ename;
						dogumTarih = oData.Gbdat;
						gecerTarih = oData.Begda;
						aracPrim = oData.Arcpr;
						dilPrim = oData.Dilpr;
						mevPrim = oData.Mvspr;
						vekPrim = oData.Vklpr;
						sirket = oData.Bukrs;
						tc = oData.Tckno;
						sicil = selectPernr;
						fisKonu = "İşten Çıkış";
						ayrilma = oData.Mgtxt;

						that.getView().byId("fisApprove").setText(fisKonu);
						that.getView().byId("adSoyadApprove").setText(adSoyad);
						that.getView().byId("dogumTarihApprove").setText(that.formatDate(dogumTarih));
						that.getView().byId("gecerTarihApprove").setText(that.formatDate(gecerTarih));
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

						//begin of ycoskun visible yapma
						that.getView().byId("labelSicil").setVisible(true);
						that.getView().byId("sicilApprove").setVisible(true);
						that.getView().byId("labelDil").setVisible(true);
						that.getView().byId("dilPrimApprove").setVisible(true);
						that.getView().byId("labelArac").setVisible(true);
						that.getView().byId("aracPrimApprove").setVisible(true);
						that.getView().byId("labelMev").setVisible(true);
						that.getView().byId("mevPrimApprove").setVisible(true);
						that.getView().byId("labelVek").setVisible(true);
						that.getView().byId("vekPrimApprove").setVisible(true);
						that.getView().byId("labelTC").setVisible(true);
						that.getView().byId("tcApprove").setVisible(true);
						that.getView().byId("labelSirket").setVisible(true);
						that.getView().byId("sirketApprove").setVisible(true);
						that.getView().byId("labelAyrilma").setVisible(true);
						that.getView().byId("ayrilmaApprove").setVisible(true);

						that.getView().byId("labelOkulTur").setVisible(false);
						that.getView().byId("okulTurApprove").setVisible(false);
						that.getView().byId("labelOkulAd").setVisible(false);
						that.getView().byId("okulAdApprove").setVisible(false);
						that.getView().byId("labelEgitim").setVisible(false);
						that.getView().byId("egitimApprove").setVisible(false);

						that.getView().byId("iconTabTable").setVisible(false);
						that.getView().byId("idPDTable3").setVisible(false);
						that.getView().byId("formPD").setVisible(false);
						that.getView().byId("IconTabAttach").setVisible(false);

						//işe alım personelinin onaycılarının getirilmesi

						oModel.read("/ZHROnayciStatuSet", null, ["$filter=" + filterOnayci], false,
							function(oData) {
								onayciModel.setData(oData);
								//	console.log(oData);
							});
						that.getView().setModel(onayciModel, "onayciModel");

					});

				//end of ycoskun
			} else if (selectPronr === "03") {
				oModel.read("/ZHRGuncelTerfiSet('" + selectPernr + "')", null, null, true,
					function(oData) {
						oJPerModel.setData(oData);
						pozisyon = oData.Stext;
						perAlan = oData.Pbtxt;
						perAltAlan = oData.Btext;
						isAlan = oData.Gtext;
						isAnahtar = oData.StellTxt;
						orgBirim = oData.OrgehTxt;
						clsGrup = oData.Psgtext;
						clsAltGrp = oData.Psktext;
						skala = oData.Trfgr;
						ucret = oData.Ucret;
						diger = oData.Diger;
						okulTur = oData.SlartTxt;
						okulAd = oData.Insti;
						egitim = oData.Ftext;
						adSoyad = oData.Ename;
						dogumTarih = oData.Gbdat;
						gecerTarih = oData.Begda;
						aracPrim = oData.Arcpr;
						dilPrim = oData.Dilpr;
						mevPrim = oData.Mvspr;
						vekPrim = oData.Vklpr;
						sirket = oData.Bukrs;
						tc = oData.Tckno;
						sicil = selectPernr;
						fisKonu = "Terfi";

						that.getView().byId("fisApprove").setText(fisKonu);
						that.getView().byId("adSoyadApprove").setText(adSoyad);
						that.getView().byId("dogumTarihApprove").setText(that.formatDate(dogumTarih));
						that.getView().byId("gecerTarihApprove").setText(that.formatDate(gecerTarih));
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
						that.getView().byId("sicilApprove").setValue(selectPernr);

						//begin of ycoskun visible yapma
						that.getView().byId("labelSicil").setVisible(true);
						that.getView().byId("sicilApprove").setVisible(true);
						that.getView().byId("labelDil").setVisible(true);
						that.getView().byId("dilPrimApprove").setVisible(true);
						that.getView().byId("labelArac").setVisible(true);
						that.getView().byId("aracPrimApprove").setVisible(true);
						that.getView().byId("labelMev").setVisible(true);
						that.getView().byId("mevPrimApprove").setVisible(true);
						that.getView().byId("labelVek").setVisible(true);
						that.getView().byId("vekPrimApprove").setVisible(true);
						that.getView().byId("labelTC").setVisible(true);
						that.getView().byId("tcApprove").setVisible(true);
						that.getView().byId("labelSirket").setVisible(true);
						that.getView().byId("sirketApprove").setVisible(true);

						that.getView().byId("labelOkulTur").setVisible(true);
						that.getView().byId("okulTurApprove").setVisible(true);
						that.getView().byId("labelOkulAd").setVisible(true);
						that.getView().byId("okulAdApprove").setVisible(true);
						that.getView().byId("labelEgitim").setVisible(true);
						that.getView().byId("egitimApprove").setVisible(true);
						that.getView().byId("labelAyrilma").setVisible(false);
						that.getView().byId("ayrilmaApprove").setVisible(false);

						that.getView().byId("iconTabTable").setVisible(true);
						that.getView().byId("idPDTable3").setVisible(true);
						that.getView().byId("formPD").setVisible(true);
						that.getView().byId("IconTabAttach").setVisible(false);

					});
				//begin of ycoskun terfi yabancı dilleri getiR
				var perFilterDil = "Pernr eq '" + selectPernr + "'";

				oModel.read("/ZHRTerfiYDSet", null, ["$filter=" + perFilterDil], true,
					function(oData) {
						oLangModel.setData(oData);

					});
				that.getView().setModel(oLangModel, "LangModel");
				langtable.setModel(that.getView().getModel("LangModel"));

				//end of ycoskun
				//begin of ycoskun  zihinsel beceri bilgileri getir
				var perAbFilterZB = "Pernr eq '" + selectPernr + "'";
				oModel.read("/ZHRTerfiZBSet", null, ["$filter=" + perAbFilterZB], true,
					function(oData) {
						oAbModel.setData(oData);

					});
				that.getView().setModel(oAbModel, "oAbModel");
				zbtable.setModel(that.getView().getModel("oAbModel"));

				//end of ycoskun
				//pd sonucları goruntuleme begin of ycoskun
				var oPDModel = new sap.ui.model.json.JSONModel();
				var perFilterPD = "Pernr eq '" + selectPernr + "'";

				oModel.read("/ZHRTerfiPDSet", null, ["$filter=" + perFilterPD], true,
					function(oData) {
						oPDModel.setData(oData);

					});
				that.getView().setModel(oPDModel, "PDModel");
				var pdtable = that.getView().byId("idPDTable3");
				pdtable.setModel(this.getView().getModel("PDModel"));
				//end of ycoskun

				//işe alım personelinin onaycılarının getirilmesi

				oModel.read("/ZHROnayciStatuSet", null, ["$filter=" + filterOnayci], false,
					function(oData) {
						onayciModel.setData(oData);
						//	console.log(oData);
					});
				that.getView().setModel(onayciModel, "onayciModel");

				//end of ycoskun
			} else if (selectPronr === "04") {
				oModel.read("/ZHRGuncelTerfiSet('" + selectPernr + "')", null, null, true,
					function(oData) {
						oJPerModel.setData(oData);
						pozisyon = oData.Stext;
						perAlan = oData.Pbtxt;
						perAltAlan = oData.Btext;
						isAlan = oData.Gtext;
						isAnahtar = oData.StellTxt;
						orgBirim = oData.OrgehTxt;
						clsGrup = oData.Psgtext;
						clsAltGrp = oData.Psktext;
						skala = oData.Trfgr;
						ucret = oData.Ucret;
						diger = oData.Diger;
						okulTur = oData.SlartTxt;
						okulAd = oData.Insti;
						egitim = oData.Ftext;
						adSoyad = oData.Ename;
						dogumTarih = oData.Gbdat;
						gecerTarih = oData.Begda;
						aracPrim = oData.Arcpr;
						dilPrim = oData.Dilpr;
						mevPrim = oData.Mvspr;
						vekPrim = oData.Vklpr;
						sirket = oData.Bukrs;
						tc = oData.Tckno;
						sicil = selectPernr;
						fisKonu = "Nakil";

						that.getView().byId("fisApprove").setText(fisKonu);
						that.getView().byId("adSoyadApprove").setText(adSoyad);
						that.getView().byId("dogumTarihApprove").setText(that.formatDate(dogumTarih));
						that.getView().byId("gecerTarihApprove").setText(that.formatDate(gecerTarih));
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
						that.getView().byId("sicilApprove").setValue(selectPernr);

						//begin of ycoskun visible yapma
						that.getView().byId("labelSicil").setVisible(true);
						that.getView().byId("sicilApprove").setVisible(true);
						that.getView().byId("labelDil").setVisible(true);
						that.getView().byId("dilPrimApprove").setVisible(true);
						that.getView().byId("labelArac").setVisible(true);
						that.getView().byId("aracPrimApprove").setVisible(true);
						that.getView().byId("labelMev").setVisible(true);
						that.getView().byId("mevPrimApprove").setVisible(true);
						that.getView().byId("labelVek").setVisible(true);
						that.getView().byId("vekPrimApprove").setVisible(true);
						that.getView().byId("labelTC").setVisible(true);
						that.getView().byId("tcApprove").setVisible(true);
						that.getView().byId("labelSirket").setVisible(true);
						that.getView().byId("sirketApprove").setVisible(true);
						that.getView().byId("labelAyrilma").setVisible(false);
						that.getView().byId("ayrilmaApprove").setVisible(false);

						that.getView().byId("labelOkulTur").setVisible(true);
						that.getView().byId("okulTurApprove").setVisible(true);
						that.getView().byId("labelOkulAd").setVisible(true);
						that.getView().byId("okulAdApprove").setVisible(true);
						that.getView().byId("labelEgitim").setVisible(true);
						that.getView().byId("egitimApprove").setVisible(true);

						that.getView().byId("iconTabTable").setVisible(true);
						that.getView().byId("idPDTable3").setVisible(true);
						that.getView().byId("formPD").setVisible(true);
						that.getView().byId("IconTabAttach").setVisible(false);

					});
				//begin of ycoskun terfi yabancı dilleri getiR
				perFilterDil = "Pernr eq '" + selectPernr + "'";

				oModel.read("/ZHRTerfiYDSet", null, ["$filter=" + perFilterDil], true,
					function(oData) {
						oLangModel.setData(oData);

					});
				that.getView().setModel(oLangModel, "LangModel");
				langtable.setModel(that.getView().getModel("LangModel"));

				//end of ycoskun
				//begin of ycoskun  zihinsel beceri bilgileri getir
				perAbFilterZB = "Pernr eq '" + selectPernr + "'";
				oModel.read("/ZHRTerfiZBSet", null, ["$filter=" + perAbFilterZB], true,
					function(oData) {
						oAbModel.setData(oData);

					});
				that.getView().setModel(oAbModel, "oAbModel");
				zbtable.setModel(that.getView().getModel("oAbModel"));

				//end of ycoskun
				//pd sonucları goruntuleme begin of ycoskun
				oPDModel = new sap.ui.model.json.JSONModel();
				perFilterPD = "Pernr eq '" + selectPernr + "'";

				oModel.read("/ZHRTerfiPDSet", null, ["$filter=" + perFilterPD], true,
					function(oData) {
						oPDModel.setData(oData);

					});
				that.getView().setModel(oPDModel, "PDModel");
				pdtable = that.getView().byId("idPDTable3");
				pdtable.setModel(this.getView().getModel("PDModel"));
				//end of ycoskun

				//işe alım personelinin onaycılarının getirilmesi

				oModel.read("/ZHROnayciStatuSet", null, ["$filter=" + filterOnayci], false,
					function(oData) {
						onayciModel.setData(oData);
						//	console.log(oData);
					});
				that.getView().setModel(onayciModel, "onayciModel");

				//end of ycoskun
			} else if (selectPronr === "05") {
				oModel.read("/ZHRGuncelTerfiSet('" + selectPernr + "')", null, null, true,
					function(oData) {
						oJPerModel.setData(oData);
						pozisyon = oData.Stext;
						perAlan = oData.Pbtxt;
						perAltAlan = oData.Btext;
						isAlan = oData.Gtext;
						isAnahtar = oData.StellTxt;
						orgBirim = oData.OrgehTxt;
						clsGrup = oData.Psgtext;
						clsAltGrp = oData.Psktext;
						skala = oData.Trfgr;
						ucret = oData.Ucret;
						diger = oData.Diger;
						okulTur = oData.SlartTxt;
						okulAd = oData.Insti;
						egitim = oData.Ftext;
						adSoyad = oData.Ename;
						dogumTarih = oData.Gbdat;
						gecerTarih = oData.Begda;
						aracPrim = oData.Arcpr;
						dilPrim = oData.Dilpr;
						mevPrim = oData.Mvspr;
						vekPrim = oData.Vklpr;
						sirket = oData.Bukrs;
						tc = oData.Tckno;
						sicil = selectPernr;
						fisKonu = "Görev Değişikliği";

						that.getView().byId("fisApprove").setText(fisKonu);
						that.getView().byId("adSoyadApprove").setText(adSoyad);
						that.getView().byId("dogumTarihApprove").setText(that.formatDate(dogumTarih));
						that.getView().byId("gecerTarihApprove").setText(that.formatDate(gecerTarih));
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
						that.getView().byId("sicilApprove").setValue(selectPernr);

						//begin of ycoskun visible yapma
						that.getView().byId("labelSicil").setVisible(true);
						that.getView().byId("sicilApprove").setVisible(true);
						that.getView().byId("labelDil").setVisible(true);
						that.getView().byId("dilPrimApprove").setVisible(true);
						that.getView().byId("labelArac").setVisible(true);
						that.getView().byId("aracPrimApprove").setVisible(true);
						that.getView().byId("labelMev").setVisible(true);
						that.getView().byId("mevPrimApprove").setVisible(true);
						that.getView().byId("labelVek").setVisible(true);
						that.getView().byId("vekPrimApprove").setVisible(true);
						that.getView().byId("labelTC").setVisible(true);
						that.getView().byId("tcApprove").setVisible(true);
						that.getView().byId("labelSirket").setVisible(true);
						that.getView().byId("sirketApprove").setVisible(true);
						that.getView().byId("labelAyrilma").setVisible(false);
						that.getView().byId("ayrilmaApprove").setVisible(false);

						that.getView().byId("labelOkulTur").setVisible(true);
						that.getView().byId("okulTurApprove").setVisible(true);
						that.getView().byId("labelOkulAd").setVisible(true);
						that.getView().byId("okulAdApprove").setVisible(true);
						that.getView().byId("labelEgitim").setVisible(true);
						that.getView().byId("egitimApprove").setVisible(true);

						that.getView().byId("iconTabTable").setVisible(true);
						that.getView().byId("idPDTable3").setVisible(true);
						that.getView().byId("formPD").setVisible(true);
						that.getView().byId("IconTabAttach").setVisible(false);

					});
				//begin of ycoskun terfi yabancı dilleri getiR
				perFilterDil = "Pernr eq '" + selectPernr + "'";

				oModel.read("/ZHRTerfiYDSet", null, ["$filter=" + perFilterDil], true,
					function(oData) {
						oLangModel.setData(oData);

					});
				that.getView().setModel(oLangModel, "LangModel");
				langtable.setModel(that.getView().getModel("LangModel"));

				//end of ycoskun
				//begin of ycoskun  zihinsel beceri bilgileri getir
				perAbFilterZB = "Pernr eq '" + selectPernr + "'";
				oModel.read("/ZHRTerfiZBSet", null, ["$filter=" + perAbFilterZB], true,
					function(oData) {
						oAbModel.setData(oData);

					});
				that.getView().setModel(oAbModel, "oAbModel");
				zbtable.setModel(that.getView().getModel("oAbModel"));

				//end of ycoskun
				//pd sonucları goruntuleme begin of ycoskun
				oPDModel = new sap.ui.model.json.JSONModel();
				perFilterPD = "Pernr eq '" + selectPernr + "'";

				oModel.read("/ZHRTerfiPDSet", null, ["$filter=" + perFilterPD], true,
					function(oData) {
						oPDModel.setData(oData);

					});
				that.getView().setModel(oPDModel, "PDModel");
				pdtable = that.getView().byId("idPDTable3");
				pdtable.setModel(this.getView().getModel("PDModel"));
				//end of ycoskun

				//işe alım personelinin onaycılarının getirilmesi

				oModel.read("/ZHROnayciStatuSet", null, ["$filter=" + filterOnayci], false,
					function(oData) {
						onayciModel.setData(oData);
						//	console.log(oData);
					});
				that.getView().setModel(onayciModel, "onayciModel");

				//end of ycoskun
			} else if (selectPronr === "06") {
				oModel.read("/ZHRGuncelTerfiSet('" + selectPernr + "')", null, null, true,
					function(oData) {
						oJPerModel.setData(oData);
						pozisyon = oData.Stext;
						perAlan = oData.Pbtxt;
						perAltAlan = oData.Btext;
						isAlan = oData.Gtext;
						isAnahtar = oData.StellTxt;
						orgBirim = oData.OrgehTxt;
						clsGrup = oData.Psgtext;
						clsAltGrp = oData.Psktext;
						skala = oData.Trfgr;
						ucret = oData.Ucret;
						diger = oData.Diger;
						okulTur = oData.SlartTxt;
						okulAd = oData.Insti;
						egitim = oData.Ftext;
						adSoyad = oData.Ename;
						dogumTarih = oData.Gbdat;
						gecerTarih = oData.Begda;
						aracPrim = oData.Arcpr;
						dilPrim = oData.Dilpr;
						mevPrim = oData.Mvspr;
						vekPrim = oData.Vklpr;
						sirket = oData.Bukrs;
						tc = oData.Tckno;
						sicil = selectPernr;
						fisKonu = "Ücret Değişikliği";

						that.getView().byId("fisApprove").setText(fisKonu);
						that.getView().byId("adSoyadApprove").setText(adSoyad);
						that.getView().byId("dogumTarihApprove").setText(that.formatDate(dogumTarih));
						that.getView().byId("gecerTarihApprove").setText(that.formatDate(gecerTarih));
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
						that.getView().byId("sicilApprove").setValue(selectPernr);

						//begin of ycoskun visible yapma
						that.getView().byId("labelSicil").setVisible(true);
						that.getView().byId("sicilApprove").setVisible(true);
						that.getView().byId("labelDil").setVisible(true);
						that.getView().byId("dilPrimApprove").setVisible(true);
						that.getView().byId("labelArac").setVisible(true);
						that.getView().byId("aracPrimApprove").setVisible(true);
						that.getView().byId("labelMev").setVisible(true);
						that.getView().byId("mevPrimApprove").setVisible(true);
						that.getView().byId("labelVek").setVisible(true);
						that.getView().byId("vekPrimApprove").setVisible(true);
						that.getView().byId("labelTC").setVisible(true);
						that.getView().byId("tcApprove").setVisible(true);
						that.getView().byId("labelSirket").setVisible(true);
						that.getView().byId("sirketApprove").setVisible(true);
						that.getView().byId("labelAyrilma").setVisible(false);
						that.getView().byId("ayrilmaApprove").setVisible(false);

						that.getView().byId("labelOkulTur").setVisible(true);
						that.getView().byId("okulTurApprove").setVisible(true);
						that.getView().byId("labelOkulAd").setVisible(true);
						that.getView().byId("okulAdApprove").setVisible(true);
						that.getView().byId("labelEgitim").setVisible(true);
						that.getView().byId("egitimApprove").setVisible(true);

						that.getView().byId("iconTabTable").setVisible(true);
						that.getView().byId("idPDTable3").setVisible(true);
						that.getView().byId("formPD").setVisible(true);
						that.getView().byId("IconTabAttach").setVisible(false);

					});
				//begin of ycoskun terfi yabancı dilleri getiR
				perFilterDil = "Pernr eq '" + selectPernr + "'";

				oModel.read("/ZHRTerfiYDSet", null, ["$filter=" + perFilterDil], true,
					function(oData) {
						oLangModel.setData(oData);

					});
				that.getView().setModel(oLangModel, "LangModel");
				langtable.setModel(that.getView().getModel("LangModel"));

				//end of ycoskun
				//begin of ycoskun  zihinsel beceri bilgileri getir
				perAbFilterZB = "Pernr eq '" + selectPernr + "'";
				oModel.read("/ZHRTerfiZBSet", null, ["$filter=" + perAbFilterZB], true,
					function(oData) {
						oAbModel.setData(oData);

					});
				that.getView().setModel(oAbModel, "oAbModel");
				zbtable.setModel(that.getView().getModel("oAbModel"));

				//end of ycoskun
				//pd sonucları goruntuleme begin of ycoskun
				oPDModel = new sap.ui.model.json.JSONModel();
				perFilterPD = "Pernr eq '" + selectPernr + "'";

				oModel.read("/ZHRTerfiPDSet", null, ["$filter=" + perFilterPD], true,
					function(oData) {
						oPDModel.setData(oData);

					});
				that.getView().setModel(oPDModel, "PDModel");
				pdtable = that.getView().byId("idPDTable3");
				pdtable.setModel(this.getView().getModel("PDModel"));
				//end of ycoskun

				//işe alım personelinin onaycılarının getirilmesi

				oModel.read("/ZHROnayciStatuSet", null, ["$filter=" + filterOnayci], false,
					function(oData) {
						onayciModel.setData(oData);
						//	console.log(oData);
					});
				that.getView().setModel(onayciModel, "onayciModel");

				//end of ycoskun
			}
		},
		setDate: function(value) {
			var gun, yil, ay, tarih;
			if (value) {
				if (selectPronr === "01") {
					gun = value.substring(0, 2);
					ay = value.substring(2, 4);
					yil = value.substring(4, 8);
					tarih = gun + "." + ay + "." + yil;

				} else if (selectPronr === "02") {
					var oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({
						pattern: "dd.MM.yyyy"
					});
					tarih = oDateFormat.format(new Date(value));
				} else if (selectPronr === "03") {
					yil = value.substring(0, 4);
					ay = value.substring(4, 6);
					gun = value.substring(6, 8);
					tarih = gun + "." + ay + "." + yil;
				} else if (selectPronr === "04") {
					yil = value.substring(0, 4);
					ay = value.substring(4, 6);
					gun = value.substring(6, 8);
					tarih = gun + "." + ay + "." + yil;
				} else if (selectPronr === "05") {
					yil = value.substring(0, 4);
					ay = value.substring(4, 6);
					gun = value.substring(6, 8);
					tarih = gun + "." + ay + "." + yil;
				} else if (selectPronr === "06") {
					yil = value.substring(0, 4);
					ay = value.substring(4, 6);
					gun = value.substring(6, 8);
					tarih = gun + "." + ay + "." + yil;
				}
			}
			return tarih;

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
		setTur: function(value) {
			var text;
			if (value) {
				if (value === "01") {
					text = "İşe Alım";
				} else if (value === "02") {
					text = "İşten Çıkış";
				} else if (value === "03") {
					text = "Terfi";
				} else if (value === "04") {
					text = "Nakil";
				} else if (value === "05") {
					text = "Görev Değişikliği";
				} else if (value === "06") {
					text = "Ücret Değişikliği";
				}
				return text;
			} else {
				return value;
			}
		},
		statusIcon: function(sStatu) {
			if (sStatu === "A") {
				return "sap-icon://accept";
			} else if (sStatu === "R") {
				return "sap-icon://decline";
			} else {
				return "sap-icon://pending";
			}
		},
		status: function(sStatu) {
			if (sStatu === "A") {
				return "Success";
			} else if (sStatu === "R") {
				return "Warning";
			} else {
				return "None";
			}

		},
		formatDate: function(value) {
			var gun, yil, ay, tarih;
			if (value) {
				if (selectPronr === "01") {
					yil = value.substring(0, 4);
					ay = value.substring(4, 6);
					gun = value.substring(6, 8);

					tarih = gun + "." + ay + "." + yil;

				} else if (selectPronr === "02") {
					var oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({
						pattern: "dd.MM.yyyy"
					});
					tarih = oDateFormat.format(new Date(value));
				} else if (selectPronr === "03") {
					yil = value.substring(0, 4);
					ay = value.substring(4, 6);
					gun = value.substring(6, 8);
					tarih = gun + "." + ay + "." + yil;
				} else if (selectPronr === "04") {
					yil = value.substring(0, 4);
					ay = value.substring(4, 6);
					gun = value.substring(6, 8);
					tarih = gun + "." + ay + "." + yil;
				} else if (selectPronr === "05") {
					yil = value.substring(0, 4);
					ay = value.substring(4, 6);
					gun = value.substring(6, 8);
					tarih = gun + "." + ay + "." + yil;
				} else if (selectPronr === "06") {
					yil = value.substring(0, 4);
					ay = value.substring(4, 6);
					gun = value.substring(6, 8);
					tarih = gun + "." + ay + "." + yil;
				}
			}
			return tarih;
		},
		firstFormatDate: function(value) {
			var gun, yil, ay, tarih;
			if (value) {
				if (firstPronr === "01") {
					yil = value.substring(0, 4);
					ay = value.substring(4, 6);
					gun = value.substring(6, 8);

					tarih = gun + "." + ay + "." + yil;

				} else if (firstPronr === "02") {
					var oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({
						pattern: "dd.MM.yyyy"
					});
					tarih = oDateFormat.format(new Date(value));
				} else if (firstPronr === "03") {
					yil = value.substring(0, 4);
					ay = value.substring(4, 6);
					gun = value.substring(6, 8);
					tarih = gun + "." + ay + "." + yil;
				} else if (firstPronr === "04") {
					yil = value.substring(0, 4);
					ay = value.substring(4, 6);
					gun = value.substring(6, 8);
					tarih = gun + "." + ay + "." + yil;
				} else if (firstPronr === "05") {
					yil = value.substring(0, 4);
					ay = value.substring(4, 6);
					gun = value.substring(6, 8);
					tarih = gun + "." + ay + "." + yil;
				} else if (firstPronr === "06") {
					yil = value.substring(0, 4);
					ay = value.substring(4, 6);
					gun = value.substring(6, 8);
					tarih = gun + "." + ay + "." + yil;
				}
			}
			return tarih;

		},
		vDatePdyear: function(value) {
			var gun, yil, ay, tarih;
			if (value) {
				yil = value.substring(0, 4);
				ay = value.substring(4, 6);
				gun = value.substring(6, 8);
				tarih = gun + "." + ay + "." + yil;
			}
			return tarih;
		},
		setOnayDate: function(value) {
			var oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({
				pattern: "dd.MM.yyyy"
			});
			var tarih = oDateFormat.format(new Date(value));
			return tarih;
		}
	});

}, /* bExport= */ true);