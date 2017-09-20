sap.ui.define(function() {
	"use strict";

	var Formatter = {
			
			vDate : function (value) {
				if (value) {
					var oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({pattern: "dd/MM/yyyy"}); 
					return oDateFormat.format(new Date(value));
				} else {
					return value;
				}
			}
	};

	return Formatter;

}, /* bExport= */ true);
