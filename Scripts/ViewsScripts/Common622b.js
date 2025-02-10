var base_url_service_layer = ".."; // All Service Layer calls are passed through ProxyController
var base_url_sms_services = ".."; // All Service Layer calls are passed through ProxyServicesController




// -- User Roles -- //
var refundClerkRole = 'Refund Clerk';
var forcefullyChangePasswordRole = "Forcefully Change Password";
var districtCollectorRole = 'District Collector';
var kmlGeneratorRole = 'KML Generator';
var borAdminRole = "BOR Admin";
var PLRAAdminRole = "PLRA Admin";
var shippingCompanyRole = "Shipping Company User";
var districtCollectorAdminRole = "District Collector Administrator";
var refundClerkAdminRole = "Refund Clerk Administrator";
var financeDepartmentAdminRole = "Finance Department Admin";
var financeDepartmentUserRole = "Finance Department";
var borDashboardViewerRole = "BOR Dashboard Viewer";
var estamp_service_exportdc_url = "http://localhost:31648/ExportedDCRates/";
var estamp_service_import_error_url = "http://localhost:31648/ImportedDCRatesErrorFiles/";
var eStampingSupportAdmin = "eStamping Support Admin";
var BORDashboardAdmin = "BOR_Dashboard_Admin";
var DRAAdmin = "DRA_Admin";
var DRAUser = "DRA_User";
var invalidLoginAttempt = 'Invalid credentials. Please try again';
var userName;
var portalName = "BOR Portal";
var proxy_layer = "/api/Proxy";
var AtChangePasswordScreen;
//var kml_server_location_url = "http://119.159.228.197/eStampCitizenPortal/KML/";
var eStamp_service_base_url = "..";//"http://localhost:31648";


// Public IP URL for Loading KMLs. (Used in RateOfChallan.js)
var kml_server_location_url = "https://es.punjab.gov.pk/eStampCitizenPortal/KML/"//"http://119.159.228.197/eStampCitizenPortal/KML/";//"http://lhr.techlogix.com:3582/KML/";


function changeFloatingLabelOfElement(id, placeholder) {
   // debugger;
    $("#" + id).attr("placeholder", placeholder);
    //$("#" + id).addClass("empty");
    if ($('#' + id).next('div').hasClass("floating-label") || $('#' + id).next('span').next('div').hasClass("floating-label")) {
        $("#" + id).attr("placeholder", null).removeClass("floating-label");
        if ($('#' + id).next('div').hasClass("floating-label")) {
            $('#' + id).next('div').remove();
            $("#" + id).after("<div class=floating-label>" + placeholder + "</div>");
        }
        else {
            $('#' + id).next('span').next('div').remove();
            $("#" + id).next('span').after("<div class=floating-label>" + placeholder + "</div>");
        }
    }
}


