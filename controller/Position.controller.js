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

	var oJsonModel = new sap.ui.model.json.JSONModel();
	var oModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZHR_144_SRV_01");
	var data = [{}];
	var oInstallments = {};

	var categoryLevel1 = [{}];
	var categoryLevel2 = [{}];
	var categoryLevel3 = [{}];
	var categoryLevel4 = [{}];
	var categoryLevel5 = [{}];
	var categoryLevel6 = [{}];
	var categoryLevel7 = [{}];
	var categoryLevel8 = [{}];
	var categoryLevel9 = [{}];
	var categoryLevel10 = [{}];
	var categoryLevel11 = [{}];
	var categoryLevel12 = [{}];
	var categoryLevel13 = [{}];

	var WizardController = Controller.extend("ZHR_144.controller.Position", {
		onInit: function() {
			this.getView().setModel(oModel);
			var that = this;
			oModel.read("/PozisyonSet", null, null, true,
				function(oData) {
					console.log(oData.results);
					data = [{}];
					for (var i = 0; i < oData.results.length; i++) {
						if (oData.results[i].Level === "1") {
							categoryLevel1 = [{}];
							for (var a = 0; a < oData.results.length; a++) {
								if (oData.results[i].Objid === oData.results[a].Objid2) {
									categoryLevel2 = [{}];
									for (var b = 0; b < oData.results.length; b++) {
										if (oData.results[a].Objid === oData.results[b].Objid2) {
											categoryLevel3 = [{}];
											for (var c = 0; c < oData.results.length; c++) {
												if (oData.results[b].Objid === oData.results[c].Objid2) {
													categoryLevel4 = [{}];
													for (var d = 0; d < oData.results.length; d++) {
														if (oData.results[c].Objid === oData.results[d].Objid2) {
															categoryLevel5 = [{}];
															for (var e = 0; e < oData.results.length; e++) {
																if (oData.results[d].Objid === oData.results[e].Objid2) {
																	categoryLevel6 = [{}];
																	for (var f = 0; f < oData.results.length; f++) {
																		if (oData.results[e].Objid === oData.results[f].Objid2) {
																			categoryLevel7 = [{}];
																			for (var g = 0; g < oData.results.length; g++) {
																				if (oData.results[f].Objid === oData.results[g].Objid2) {
																					categoryLevel8 = [{}];
																					for (var h = 0; h < oData.results.length; h++) {
																						if (oData.results[g].Objid === oData.results[h].Objid2) {
																							categoryLevel9 = [{}];
																							for (var k = 0; k < oData.results.length; k++) {
																								if (oData.results[h].Objid === oData.results[k].Objid2) {
																									categoryLevel10 = [{}];
																									for (var l = 0; l < oData.results.length; l++) {
																										if (oData.results[k].Objid === oData.results[l].Objid2) {
																											categoryLevel11 = [{}];
																											for (var m = 0; m < oData.results.length; m++) {
																												if (oData.results[l].Objid === oData.results[m].Objid2) {
																													categoryLevel12 = [{}];
																													for (var n = 0; n < oData.results.length; n++) {
																														if (oData.results[m].Objid === oData.results[n].Objid2) {
																															categoryLevel13.shift();
																															categoryLevel12.push({
																																name: oData.results[n].Objid,
																																categories: categoryLevel13,
																																text: oData.results[n].Stext
																															});
																														}
																													}
																													categoryLevel12.shift();
																													categoryLevel11.push({
																														name: oData.results[m].Objid,
																														categories: categoryLevel12,
																														text: oData.results[m].Stext
																													});
																												}
																											}
																											categoryLevel11.shift();
																											categoryLevel10.push({
																												name: oData.results[l].Objid,
																												categories: categoryLevel11,
																												text: oData.results[l].Stext
																											});
																										}
																									}
																									categoryLevel10.shift();
																									categoryLevel9.push({
																										name: oData.results[k].Objid,
																										categories: categoryLevel10,
																										text: oData.results[k].Stext
																									});
																								}
																							}
																							categoryLevel9.shift();
																							categoryLevel8.push({
																								name: oData.results[h].Objid,
																								categories: categoryLevel9,
																								text: oData.results[h].Stext
																							});
																						}
																					}
																					categoryLevel8.shift();
																					categoryLevel7.push({
																						name: oData.results[g].Objid,
																						categories: categoryLevel8,
																						text: oData.results[g].Stext
																					});
																				}
																			}
																			categoryLevel7.shift();
																			categoryLevel6.push({
																				name: oData.results[f].Objid,
																				categories: categoryLevel7,
																				text: oData.results[f].Stext
																			});
																		}
																	}
																	categoryLevel6.shift();
																	categoryLevel5.push({
																		name: oData.results[e].Objid,
																		categories: categoryLevel6,
																		text: oData.results[e].Stext
																	});
																}
															}
															categoryLevel5.shift();
															categoryLevel4.push({
																name: oData.results[d].Objid,
																categories: categoryLevel5,
																text: oData.results[d].Stext
															});
														}
													}
													categoryLevel4.shift();
													categoryLevel3.push({
														name: oData.results[c].Objid,
														categories: categoryLevel4,
														text: oData.results[c].Stext,
														DrillState: "expanded"
													});
												}
											}
											categoryLevel3.shift();
											categoryLevel2.push({
												name: oData.results[b].Objid,
												categories: categoryLevel3,
												text: oData.results[b].Stext
											});
										}
									}
									categoryLevel2.shift();
									categoryLevel1.push({
										name: oData.results[a].Objid,
										categories: categoryLevel2,
										text: oData.results[a].Stext
									});
								}
							}
							categoryLevel1.shift();
							data.push({
								name: oData.results[i].Objid,
								categories: categoryLevel1,
								text: oData.results[i].Stext
							});
						}

					}
					data.shift();

					categoryLevel3.shift();
					categoryLevel4.shift();
					categoryLevel5.shift();
					categoryLevel6.shift();
					categoryLevel7.shift();
					categoryLevel8.shift();
					categoryLevel9.shift();
					categoryLevel10.shift();
					categoryLevel11.shift();
					categoryLevel12.shift();

					oInstallments = {
						"catalog": {
							"clothing": {
								"categories": data
							}

						}
					};
					console.log(oInstallments);
					oJsonModel.setData(oInstallments);
				});
			that.getView().byId("TreeTableBasic").setModel(oJsonModel);
		},
		onCollapseAll: function() {
			var oView = this.getView();
			var oTreeTable = oView.byId("TreeTableBasic");
			oTreeTable.collapseAll();
		},
		onExpandFirstLevel: function() {
			var oView = this.getView();
			var oTreeTable = oView.byId("TreeTableBasic");
			oTreeTable.expandToLevel(1);
		},
		selectionChanged: function(oEvent) {
			var oView = this.getView();
			var oTreeTable = oView.byId("TreeTableBasic");
			var sPath = oEvent.getParameter("rowContext").getPath();
			var model = oTreeTable.getModel();
			var dataSelect = model.getProperty(sPath);
			var position = dataSelect.name;
			var posText = dataSelect.text;

			sap.ui.getCore().cPosition = position + "/" + posText;

		}
	});

	return WizardController;
});