var TotalAmountLabel;
var showNADRASection = false;
var fullViewMode = true; // if this is value, Agent, Buyer, Seller information would be made hidden. It is false in Reprint Challan and Verify through Web use-case in Citizen Portal.
 
var Party1Label = "First Party";
var Party2Label = "Second Party";

var exchangeOfPropertyDeedID = 31;
var PowerOfAttorneyDeedId = 107;
var REG_CVT_DeedId = 6;
var Contract22AB_DeedId = 111169;
var PowerOfAttorneyDeed48bbId = 108;
var PowerOfAttorneyDeed48b = 106;
var GiftDeedId = 82;
var PolicyDeedID = 67; 
var firstProperty = "First Property";
var secondProperty = "Second Property"; 
var LandValueLabel = 'Land Value (Rs.)';//'Land Value';
var allRatesApplied = "All Rate Applied";
var highestRateApplied = "Highest Rate Applied";
var refundInitiated = "Refund Initiated";
var refundCompleted = "Refund Completed";
var refundCancelled = "Refund Cancelled";
var CSValue = "Constructed Structure Value (Rs.)";
var certificateOfSaleDeedId = "63";
var awardDeedId = "51";
var leaseDeeds = [85, 86, 87, 90, 91, 92, 94];
var releaseDeedId = "109"
function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

function isleaseDeedFunc(did)
{
    var leaseCheck = false;
    for (i = 0; i < leaseDeeds.length; i++) {
        if (did == leaseDeeds[i]) {           
            leaseCheck = true;
            break;
        }
    }   
    return leaseCheck;
}
function getCategoryByID(ID) {
    categoryID = ID; 
    $.ajax({
        url: base_url_service_layer + '/api/Proxy/Locations/GetCategoryById?id=' + categoryID,
        type: 'POST',
        contentType: "application/json;charset=utf-8",
        success: function (data) {         
           // LandTypeModel = data;
           challan.propertyInfo.CATEGORY_NAME = data[0].Name;
           document.getElementById("CategoryDCScreenText").innerHTML = challan.propertyInfo.CATEGORY_NAME;
        },
        error: function (data) {
        }
    });


}
function rendenChallan() {
    debugger;
    $("#amountsFirstPropertyViewChallan").hide();
    $("#amountsSecondPropertyViewChallan").hide();
    $('#AhleCommissionPagesDiv').hide();
    $('#registryPagesDiv').hide();
    $('#generateChallanDutiesOld').hide();

  

    ////alert('fixed')
    debugger;
    
    if (challan.isStampDutyFixed) {
        $('#totalStampDutyCalAmountPayableDiv').hide(); 

    }
    if (challan.propertyInfo != null) {
        if (challan.propertyInfo.isUrban == false) {

            $("#AgricultureField").show();
        } else {
            $("#AgricultureField").hide();
        }
    }
    if (challan.PSID != null) {
        $("#PSID").show();
        
        document.getElementById("PSID_text").innerHTML = challan.PSID;
    }
    if (challan.totalDeficient != null && challan.ChallanType == "Deficient") {
        $("#DefiecientPenaltyInformation").show();
        if (challan.is_after_registration) {
            document.getElementById("orderNumberViewChallan").innerHTML = challan.order_number;
            var challan_order_date = challan.order_date; 
            document.getElementById("orderDateViewChallan").innerHTML = challan_order_date.split(' ')[0];
        } else {
            document.getElementById("orderNumberViewChallan").innerHTML = '--';
            document.getElementById("orderDateViewChallan").innerHTML = '--';
        }
        $('#totalStampDutyCalAmountPayableDiv').hide();

    } else {
        $("#DefiecientPenaltyInformation").hide();
        $('#totalStampDutyCalAmountPayableDiv').hide();
    }

    if (showNADRASection == false)
        $('#NADRAVerifyDiv').hide();
    else{
        PopulateNadraSection(challan);
        $('#NADRAVerifyDiv').show();
    }
    if (fullViewMode == false) {
        // Hide Agent Contact and Email address
        $('#divAgentContactInfoLabel').hide();
        $('#divAgentContactInfoValue').hide();
    }
    if (challan.FirstPartyLabel != null && challan.FirstPartyLabel != "") {
        Party1Label = challan.FirstPartyLabel;
    }

    if (challan.SecondPartyLabel != null && challan.SecondPartyLabel != "") {
        Party2Label = challan.SecondPartyLabel;
    }
    //$("#amountsSecondPropertyViewChallan").hide();
    //$("#amountsFirstPropertyViewChallan").hide();
    //$("#amountsInDeedSectionViewChallan").hide();
    document.getElementById("agentNameText").innerHTML = challan.AgentName;
    document.getElementById("agentCninText").innerHTML = challan.AgentCnic;
    document.getElementById("agentContactText").innerHTML = challan.AgentCell;
    document.getElementById("agentEmailText").innerHTML = challan.AgentEmail;
    if (challan.isOldRegistryChallan) {
        $("#oldRegistryChallanDetailsDiv").show();  
        $("#oldRegistryChallanDiv").show();
        $("#challanDiv").show();
        $("#oldRegistryDateDiv").show();
        $("#oldRegistryNumberDiv").show();
        document.getElementById("oldRegistryChallanValue").innerHTML = "Yes";
        if (challan.oldRegistryDate != null && challan.oldRegistryDate != "") {
            //document.getElementById("oldRegistryDateValue").innerHTML = (challan.oldRegistryDate.getMonth() + 1) + '/' + challan.oldRegistryDate.getDate() + '/' +  challan.oldRegistryDate.getFullYear();
            var test = typeof challan.oldRegistryDate;
            if (test == "object") {
                document.getElementById("oldRegistryDateValue").innerHTML = (challan.oldRegistryDate.getMonth() + 1) + '/' + challan.oldRegistryDate.getDate() + '/' + challan.oldRegistryDate.getFullYear();
            }
            else if (test == "string") {
                var strDate = challan.oldRegistryDate.toString();
                strDateDisplay = strDate.split("T");
                var dateString = strDateDisplay[0];
                strDateArr = dateString.split("-");
                document.getElementById("oldRegistryDateValue").innerHTML = strDateArr[1] + '/' + strDateArr[2] + '/' + strDateArr[0];
            }
            else {
                document.getElementById("oldRegistryDateValue").innerHTML = challan.oldRegistryDate.toString();;
            }

        }
        else {
            document.getElementById("oldRegistryDateValue").innerHTML = "-";
        }
        if (challan.oldRegistryNumber != null && challan.oldRegistryNumber != "") {
            document.getElementById("oldRegistryNumberValue").innerHTML = challan.oldRegistryNumber;
        } else {
            document.getElementById("oldRegistryNumberValue").innerHTML = "-";
        }
    }
    else {
        $("#oldRegistryChallanDetailsDiv").hide();
        $("#oldRegistryChallanDiv").hide();
        $("#oldRegistryDateDiv").hide();
        $("#oldRegistryNumberDiv").hide();
    }
    //document.getElementById("isConstructedText").innerHTML = "Yes";
    //document.getElementById("constructedAreaText").innerHTML = challan.propertyInfo.ConstructedAreaInSqFeet;
    if (challan.Party2 != null && challan.Party2.length == 0) {
        $('#sellersdiv').hide();
    }
    debugger;
    //alert("here"); 
    if (challan.propertyInfo != null && challan.MultipleLandClassification == true) {
        $('#multipleKhasraDivNew').show();
        var textToDisplay = "Multiple Land Classification: ";
        document.getElementById("multipleKhasraLabel").innerHTML = textToDisplay;

        multipleKhasraGrid();
    } else {
        $('#multipleKhasraDivNew').hide();
    }
    /***************************Property Info 2***************************/

    if (challan.propertyInfo2 != null) {
        $('#propertyInfo2Div').show();
        document.getElementById("districtText2").innerHTML = challan.DistrictString;
        document.getElementById("tehsilText2").innerHTML = challan.TalukaString;
        if (challan.propertyInfo2.FullAddress != null && challan.propertyInfo2.FullAddress != "") {
            $('#addressLabel2').show();
            $('#addressText2').show();
            document.getElementById("addressText2").innerHTML = challan.propertyInfo2.FullAddress;
        }
        else {
            $('#addressLabel2').hide();
            $('#addressText2').hide();
        }
        if (challan.propertyInfo2.LandClassificationString != null && challan.propertyInfo2.LandClassificationString != "") {
            $('#propertyClassificationLabelText2').show();
            $('#propertyClassificationText2').show();
            document.getElementById("propertyClassificationText2").innerHTML = challan.propertyInfo2.LandClassificationString;
        } else {
            $('#propertyClassificationText2').hide();
            $('#propertyClassificationLabelText2').hide();
        }
        var propertyValue2 = 0;
        var finalrate2 = challan.propertyInfo2.FinalRate;
        finalrate2 = returnCommas(finalrate2);
        finalrate2 = finalrate2.replace(/,/g, "");
        finalrate = parseFloat(finalrate2);
        var amount = parseFloat(challan.propertyInfo2.ValuationAmount);
        if (amount > finalrate2) {
            propertyValue2 = amount;
        }
        else {
            propertyValue2 = finalrate2;
        }
        //document.getElementById("totalAmountText2").innerHTML = returnCommas(propertyValue2);

        if (challan.propertyInfo2.ConstructedAreaInSqFeet != null && challan.propertyInfo2.ConstructedAreaInSqFeet != "") {
            $('#constructedAreadiv2').show();
           // document.getElementById("constructedAreaSqFeetText").innerHTML = challan.propertyInfo2.ConstructedAreaInSqFeet
            $('#constructedAreaTextdiv2').show();
           // document.getElementById("isConstructedText2").innerHTML = "Yes";
            document.getElementById("constructedAreaText2").innerHTML = challan.propertyInfo2.ConstructedAreaInSqFeet;
            $('#LandValueRelated').show();
            $('#CStrutureValueRelated').show();
        } else {

            document.getElementById("isConstructedText2").innerHTML = "No";
            document.getElementById("constructedAreaText2").innerHTML = "-";
           // $('#constructedAreadiv2').hide();
          //  $('#constructedAreaTextdiv2').hide();
          //  $('#LandValueRelated').hide();
          //  $('#CStrutureValueRelated').hide();
        }
        if (challan.propertyInfo2.IsGovProperty == true) {
            $('#govtPropertydiv2').show();
            $('#govtPropertyTextdiv2').show();
            document.getElementById("isgovtPropertyText2").innerHTML = "Yes";
          
          
        } else {

            document.getElementById("isgovtPropertyText2").innerHTML = "No";
      
        }
    }
    else {
        $('#propertyInfo2Div').hide();
    }


    /*ADDITIONAL INFORMAION*/

    var totalAmount = 0;
    var CVTamount = 0;
    var RegistrationAmount = 0;
    var StampAmount = 0;
    var deficientCVT = 0;
    var deficientReg = 0;
    var sum = 0;
    var LandValueUserProvided = 0;
    var StrucutureValueUserProvided = 0;
    var TotalPropertyValueUserProvided = 0 ; 

    /***************************Apply CVT***************************/
    if (challan.isParentNewChallan == null)
    {
        challan.isParentNewChallan = false;
    }

    if (challan.applyCVT == true && challan.isParentNewChallan == true) { // New Challans (After Merger of Duties Change)
       
        $("#applyCVTDivViewChallan").hide();  // Hide Old Challan's CVT div
        $("#cvtTaxText").hide();
        $("#CvtAmountText").hide();


        var fixedCVT = challan.PayableCvtString;
        fixedCVT = parseFloat(fixedCVT).toFixed(2);
        var newAmount = challan.PayableCvtString;
        var sdandcvt = challan.PayableSDandCVTString;
        var AmountDutiesCalc = 0;
        var highestCValue = "0";
     //   alert('o2')
        debugger;
        CVTamount = parseFloat(sdandcvt);
        document.getElementById("StampDutyTextValue").innerHTML = formatAmount(sdandcvt);        
    }
    else if (challan.isParentNewChallan == false)// Old Challans ( Before Merger of Duties Change)
    {
        if (challan.applyCVT == true)
        {
            document.getElementById("cvtTaxText").innerHTML = "Yes";
            var fixedCVT = challan.PayableCvtString;
            fixedCVT = parseFloat(fixedCVT).toFixed(2);
            document.getElementById("CvtAmountText").innerHTML = formatAmount(fixedCVT);
            var newAmount = challan.PayableCvtString;
            CVTamount = parseFloat(newAmount);
        }
        else {
            document.getElementById("cvtTaxText").innerHTML = "No";
            document.getElementById("CvtAmountText").innerHTML = "-";
        }
        $("#applyCVTDivViewChallan").show(); // Show Old Challan's Cvt Div
        $("#cvtTaxText").show();
        $("#CvtAmountText").show();
    }

    /***************************Apply Registration***************************/

    if (challan.isParentNewChallan == true) { // New Challans ( After Merger of Duties Change)

        $("#applyRegistrationDutyDivViewChallanOld").hide();// Hide Registration Section of Old Challan.
        $("#registrationFeeTextOld").hide();
        $("#registrationDutyTextOld").hide();

        var fixedRegistration = challan.RegistrationFeeString;
        var newAmount = challan.RegistrationFeeString;
        if (newAmount != null && newAmount != "") {
            RegistrationAmount = parseFloat(newAmount);
        }
        

        $("#IsRegistrationFeeApplicableLabel").hide();
        $("#IsRegistrationFeeApplicable").hide();
        //document.getElementById("IsRegistrationFeeApplicable").innerHTML = "No";
        /*//numan
        if (challan.TransactionName == "5")
        {
            fixedRegistration = parseFloat(fixedRegistration).toFixed(2);
            document.getElementById("registrationFeeText").innerHTML = formatAmount(fixedRegistration);
            var newAmount = challan.RegistrationFeeString;
            RegistrationAmount = parseFloat(newAmount);

            $("#applyRegistrationDutyDivViewChallan").show(); // Don't show lable if value doesn't exists.
            $("#registrationFeeText").show();
        }*/
         if (challan.applyRegistrationDuty == true && parseFloat(fixedRegistration)) {
          //  document.getElementById("IsRegistrationFeeApplicable").innerHTML = "Yes";           
            fixedRegistration = parseFloat(fixedRegistration).toFixed(2);
            document.getElementById("registrationFeeText").innerHTML = formatAmount(fixedRegistration);
            var newAmount = challan.RegistrationFeeString;
            RegistrationAmount = parseFloat(newAmount);             

            $("#applyRegistrationDutyDivViewChallan").show(); // Don't show lable if value doesn't exists.
            $("#registrationFeeText").show();
        }
        else {            
            //document.getElementById("IsRegistrationFeeApplicable").innerHTML = "No";
            $("#applyRegistrationDutyDivViewChallan").hide(); // Don't show lable if value doesn't exists.
            $("#registrationFeeText").hide(); // Don't show lable if value doesn't exists.
        }        
    } 
    else if (challan.isParentNewChallan == false) {// Old Challans ( Before Merger of Duties Change)

        $("#applyRegistrationDutyDivViewChallan").hide(); // Hide Registration Section of New Challan.
        $("#registrationFeeText").hide(); // 

        $("#IsRegistrationFeeApplicableLabel").hide();
        $("#IsRegistrationFeeApplicable").hide();

        if (challan.applyRegistrationDuty == true)
        {
            document.getElementById("registrationDutyTextOld").innerHTML = "Yes";
            var fixedRegistration = challan.RegistrationFeeString;
            fixedRegistration = parseFloat(fixedRegistration).toFixed(2);
            document.getElementById("registrationFeeTextOld").innerHTML = formatAmount(fixedRegistration);
            var newAmount = challan.RegistrationFeeString;
            RegistrationAmount = parseFloat(newAmount);
        }
        else
        {
            document.getElementById("registrationDutyTextOld").innerHTML = "No";
            document.getElementById("registrationFeeTextOld").innerHTML = "-";
        }
    
        $("#applyRegistrationDutyDivViewChallanOld").show(); 
        $("#registrationFeeTextOld").show();
        $("#registrationDutyTextOld").show();
    } 
  //  alert('Challan.challan.DCValuationType' + challan.DCValuationType);
    debugger;
    AmountDutiesCalc = challan.TotalAmount;
    if (challan.DCValuationType) // Show this following section if DC is applicable
    {
        if (challan.DeedNameId == certificateOfSaleDeedId || isleaseDeedFunc(challan.DeedNameId) || challan.DeedNameId == releaseDeedId)
        { // For Cerifitcate of Sale and Lease Deeds don't show DCValuationRelated Div and Amount of Duty calc will be challan's Total Amount;
            ////alert('a')
            //debugger;
            $("#DCValuationRelated").hide();
            $("#CStrutureValueRelated").hide();

            document.getElementById("cstructureVDC").innerHTML = "-";
            document.getElementById("SqFtRateDCValue").innerHTML = "-";
            document.getElementById("cstructureVUP").innerHTML = "-";


            if (!isNaN(AmountDutiesCalc) && AmountDutiesCalc > 0) {
                ////alert('system5')
                debugger;
                $('#AmountOfDutyCalLabel').show();
                $('#AmountDutiesCalc').show();
                document.getElementById("AmountDutiesCalc").innerHTML = returnCommas(AmountDutiesCalc);
            }
            else {
                $('#AmountOfDutyCalLabel').hide();
                $('#AmountDutiesCalc').hide();
            }
            debugger; 
            if (challan.lstTaxAmountValue != null && challan.lstTaxAmountValue.length > 0) {
                for (i = 0; i < challan.lstTaxAmountValue.length; i++) {
                    if (challan.lstTaxAmountValue[i].FieldName == CSValue && challan.lstTaxAmountValue[i].AdditionalInfo == firstProperty) {
                        document.getElementById("cstructureVUP").innerHTML = returnCommas(challan.lstTaxAmountValue[i].AmountValue);
                        break;
                    }
                }
            }
        }
        else {
            $('#CStrutureValueRelated').show();
            $('#LandValueRelated').show();
            //$('#DCValuationRelated').show();
           // //alert('come')
            debugger;
            if (challan.ChallanType != "Deficient") {
                if (challan.deficientAmount > 0 || challan.penalty > 0) {
                    $('#DCValuationRelated').hide();
                    $('#AmountOfDutyAndRegDiv').hide();
                }
                else {
                    $('#DCValuationRelated').hide();
                    $('#AmountOfDutyAndRegDiv').show();
                }
               
                
            }
            else {
                $('#DCValuationRelated').hide();
                $('#AmountOfDutyAndRegDiv').hide();
            }
            if (challan.isExchangeOfProperty) {
                if (challan.propertyInfo2 != null && challan.propertyInfo2.PropertyStampDutyString == "") {
                    challan.propertyInfo2.PropertyStampDutyString = "0";
                }
            }

            // DC Valuation First Property
            if (challan.propertyInfo != null)
            {
                

                ////alert('b')
                //debugger;
                if (challan.propertyInfo.ConstructedStructureValue != "" && challan.propertyInfo.ConstructedStructureValue > 0) {
                    challan.propertyInfo.IsConstructed = true;
                }
                if (challan.propertyInfo.IsConstructed && challan.propertyInfo.ConstructedStructureValue != null && challan.propertyInfo.StructureSqFtRate) {
                    document.getElementById("cstructureVDC").innerHTML = returnCommas(challan.propertyInfo.DCRateSqftString * challan.propertyInfo.ConstructedAreaInSqFeet);
                    //document.getElementById("constructedAreaSqFeetText").innerHTML = challan.propertyInfo2.ConstructedAreaInSqFeet;
                    ////alert('1')
                    debugger;
                    document.getElementById("SqFtRateDCValue").innerHTML = returnCommas(challan.propertyInfo.StructureSqFtRate) + " per " + challan.propertyInfo.StructureSqFtRateUnit ;
                    
                }
                else {
                    if (challan.propertyInfo.ConstructedArea != "" && challan.propertyInfo.ConstructedStructureValue > 0)
                    {
                       // alert(ConstructedStructureValue); 
                        debugger;
                        document.getElementById("SqFtRateDCValue").innerHTML = returnCommas(challan.propertyInfo.StructureSqFtRate) + " per " + challan.propertyInfo.StructureSqFtRateUnit;
                        //challan.propertyInfo.StructureSqFtRate;
                    }
                    else {
                        document.getElementById("cstructureVDC").innerHTML = "-";
                        document.getElementById("SqFtRateDCValue").innerHTML = "-";
                    }
                   
                   
                   // $("#CStrutureValueRelated").hide();
                }
                debugger;
                if (challan.lstTaxAmountValue != null && challan.lstTaxAmountValue.length > 0) {
                    for (i = 0; i < challan.lstTaxAmountValue.length; i++) {     
                        if (challan.lstTaxAmountValue[i].FieldName == "Land Value (Rs.)") {
                           
                            LandValueUserProvided = challan.lstTaxAmountValue[i].AmountValue;
                           // alert(LandValueUserProvided);
                        }
                        if (challan.lstTaxAmountValue[i].FieldName == "Construted Structure Value (Rs.)") {
                            StrucutureValueUserProvided = challan.lstTaxAmountValue[i].AmountValue;
                        }
                    
                        if (challan.lstTaxAmountValue[i].FieldName == "Property Value (Rs.)") {
                            TotalPropertyValueUserProvided = challan.lstTaxAmountValue[i].AmountValue;
                        }
                        if (challan.lstTaxAmountValue[i].FieldName == CSValue && challan.lstTaxAmountValue[i].AdditionalInfo == firstProperty) {
                            document.getElementById("cstructureVUP").innerHTML = returnCommas(challan.lstTaxAmountValue[i].AmountValue);
                            break;
                        }
                    }
                }
                else
                {
                    document.getElementById("cstructureVUP").innerHTML = "-";
                }
            }

            // DC Valuation Second Property
            if (challan.propertyInfo2 != null)
            {
                ////alert('Values21')
                debugger;
                if (challan.propertyInfo2.IsConstructed && challan.propertyInfo2.DCRateSqftString != null) {                                  
                    document.getElementById("cstructureVDC2").innerHTML = returnCommas(challan.propertyInfo2.DCRateSqftString * challan.propertyInfo2.ConstructedAreaInSqFeet);
                    document.getElementById("constructedAreaSqFeetText").innerHTML = challan.propertyInfo2.ConstructedAreaInSqFeet;
                    document.getElementById("SqFtRateDCValue2").innerHTML = returnCommas(challan.propertyInfo2.DCRateSqftString);
                }
                else {                    
                    document.getElementById("cstructureVDC2").innerHTML = "-";
                    document.getElementById("SqFtRateDCValue2").innerHTML = "-";
                    //$('#DCValuationRelated').hide();
                }

                if (challan.lstTaxAmountValue != null && challan.lstTaxAmountValue.length > 0) {                    
                    for (i = 2; i < challan.lstTaxAmountValue.length; i++) {                        
                        if (challan.lstTaxAmountValue[i].FieldName == CSValue && challan.lstTaxAmountValue[i].AdditionalInfo == secondProperty) {
                            document.getElementById("cstructureVUP2").innerHTML = returnCommas(challan.lstTaxAmountValue[i].AmountValue);
                            break;
                        }                        
                    }
                }
                else {
                    document.getElementById("cstructureVUP2").innerHTML = "-";
                }
            }


            // Summary Area of Confirmation Screen

            if (challan.TransactionName == exchangeOfPropertyDeedID && ( challan.lstTaxAmountValue.length > 5 &&  parseFloat(challan.lstTaxAmountValue[5].AmountValue) > parseFloat(challan.lstTaxAmountValue[2].AmountValue)))
            {//Second Property is higher so it should be considered.

                if (challan.propertyInfo2.FinalRate != null && challan.propertyInfo2.FinalRate != ""
                    && challan.DCLandValue != "undefined"
                    && challan.DCLandValue != undefined) {
                    document.getElementById("landValueDC").innerHTML = returnCommas(challan.propertyInfo2.FinalRate);
                } else {
                    document.getElementById("landValueDC").innerHTML = "-";
                }

                if (challan.lstTaxAmountValue != null && challan.lstTaxAmountValue.length > 0) {
                    var highestLandValue = Math.max(challan.lstTaxAmountValue[3].AmountValue, challan.propertyInfo2.FinalRate);
                    //alert('system 26')
                    debugger;
                    AmountDutiesCalc = highestLandValue;
                    for (i = 2; i < challan.lstTaxAmountValue.length; i++) {
                        if (challan.lstTaxAmountValue[i].FieldName == LandValueLabel && challan.lstTaxAmountValue[i].AdditionalInfo == secondProperty) {
                            document.getElementById("landValueUserProvided").innerHTML = returnCommas(challan.lstTaxAmountValue[i].AmountValue);
                        }
                        if (challan.lstTaxAmountValue[i].FieldName == CSValue && challan.lstTaxAmountValue[i].AdditionalInfo == secondProperty) {
                            //alert('hy16')
                            document.getElementById("CSVUP").innerHTML = returnCommas(8778);
                        }                        
                        
                    }
                    //alert('hy6')
                    debugger;
                    if (challan.propertyInfo2.IsConstructed) {

                        if (challan.propertyInfo2.DCRateSqftString == null) { challan.propertyInfo2.DCRateSqftString = 1; }
                       
                        document.getElementById("CSVDC").innerHTML = returnCommas(challan.propertyInfo2.DCRateSqftString * challan.propertyInfo2.ConstructedAreaInSqFeet);
                        var CSVDC = "0";
                        if (challan.lstTaxAmountValue[4] != null && challan.lstTaxAmountValue[4].AmountValue != null) {
                            CSVDC = challan.lstTaxAmountValue[4].AmountValue
                        }
                        //alert('system 16')
                        debugger;
                        highestCValue = Math.max(CSVDC, challan.propertyInfo2.ConstructedStructureValue);
                        AmountDutiesCalc = highestCValue + highestLandValue;                       
                    }
                    else {
                        document.getElementById("CSVDC").innerHTML = "-vbvbv";
                    }

                }
                else {
                    //alert('hy6')
                    document.getElementById("landValueUserProvided").innerHTML = "-";
                    document.getElementById("CSVUP").innerHTML = "9090";
                    document.getElementById("CSVDC").innerHTML = "-0909";

                    AmountDutiesCalc = Math.max(challan.propertyInfo2.DeclaredAmount, challan.propertyInfo2.FinalRate);
                }               

            }
            else // First Property is higher and it should be considered.
            {
               // //alert('first')
              //  if (challan.propertyInfo.FinalRate != null && challan.propertyInfo.FinalRate != "")
               // {
                if (challan.DCLandValue != "0" && challan.DCLandValue != ""
                    && challan.DCLandValue != "undefined"
                    && challan.DCLandValue != undefined

                    )
                    {
                    document.getElementById("landValueDC").innerHTML = returnCommas(challan.DCLandValue);
                } else {
                    document.getElementById("landValueDC").innerHTML = "-";
                }                

                if (challan.lstTaxAmountValue != null && challan.lstTaxAmountValue.length > 0)
                {
                    ////alert('system 6')
                    debugger;
                    var highestLandValue = 0;
                    if (challan.propertyInfo != null) {
                         highestLandValue = Math.max(challan.lstTaxAmountValue[0].AmountValue, challan.propertyInfo.FinalRate);
                    }
                    else {
                        highestLandValue = Math.max(challan.lstTaxAmountValue[0].AmountValue);
                    }
                    
                    AmountDutiesCalc = highestLandValue;
                    for (i = 0; i < challan.lstTaxAmountValue.length; i++) { 
                        if (challan.lstTaxAmountValue[i].FieldName == LandValueLabel && challan.lstTaxAmountValue[i].AdditionalInfo == firstProperty) {
                            document.getElementById("landValueUserProvided").innerHTML = returnCommas(challan.lstTaxAmountValue[i].AmountValue);
                        }
                        if (challan.lstTaxAmountValue[i].FieldName == CSValue && challan.lstTaxAmountValue[i].AdditionalInfo == firstProperty) {
                            //alert('hy13')
                            debugger;
                            document.getElementById("CSVUP").innerHTML = returnCommas(7676);
                        }    
                    }
                    ////alert('hy12')
                    if (challan.propertyInfo != null) {
                        if (challan.propertyInfo.ConstructedStructureValue != "" && challan.propertyInfo.ConstructedStructureValue > 0) {
                            challan.propertyInfo.IsConstructed = true;
                        }
                    }
                    //alert('hy')
                    debugger;
                    if (challan.propertyInfo != null) {
                        if (challan.propertyInfo.IsConstructed) {
                            if (challan.propertyInfo.DCRateSqftString == null) { challan.propertyInfo.DCRateSqftString = 1; }
                            
                            if (challan.StructureValue != "" && challan.StructureValue != "undefined" && challan.StructureValue != undefined) {
                                document.getElementById("CSVDC").innerHTML = returnCommas(challan.StructureValue);//challan.propertyInfo.DCRateSqftString * challan.propertyInfo.ConstructedAreaInSqFeet

                            }
                            else {
                                document.getElementById("CSVDC").innerHTML = "-";//challan.propertyInfo.DCRateSqftString * challan.propertyInfo.ConstructedAreaInSqFeet

                            }
                            //alert('hy1')
                            debugger;
                            var CSVDC = "0";
                            if (challan.lstTaxAmountValue[1] != null && challan.lstTaxAmountValue[1].AmountValue != null) {
                                 
                                CSVDC = challan.lstTaxAmountValue[1].AmountValue
                            }
                            highestCValue = Math.max(CSVDC, challan.propertyInfo.ConstructedStructureValue);
                            AmountDutiesCalc = highestLandValue;//highestCValue; //+
                        }
                        else {
                            //alert('hy2')
                            if (challan.StructureValue != "" && challan.StructureValue != null) {
                                document.getElementById("CSVDC").innerHTML = returnCommas(challan.StructureValue);
                            }
                            else {
                                document.getElementById("CSVDC").innerHTML = "-";
                            }
                            
                        }
                      
                        var CSVDC = "0";
                        if (challan.lstTaxAmountValue[1] != null && challan.lstTaxAmountValue[1].AmountValue != null) {
                            ////alert('hy1')
                            debugger;
                            CSVDC = challan.lstTaxAmountValue[1].AmountValue
                        }
                        highestCValue = Math.max(CSVDC, challan.propertyInfo.ConstructedStructureValue);                        
                        AmountDutiesCalc = highestLandValue;//highestCValue; //+
                    }
                    else {
                        //alert('hy11')
                        document.getElementById("CSVDC").innerHTML = "-";
                    }
                }
                else {
                    //alert('23');
                    document.getElementById("landValueUserProvided").innerHTML = "-";
                    document.getElementById("CSVUP").innerHTML = "-";
                    document.getElementById("CSVDC").innerHTML = "-";
                    AmountDutiesCalc = Math.max(challan.propertyInfo.DeclaredAmount, challan.propertyInfo.FinalRate);
                }
            }

            if (!isNaN(AmountDutiesCalc) && AmountDutiesCalc > 0) {
               // //alert('system3')
                debugger;
                $('#AmountOfDutyCalLabel').show();
                $('#AmountDutiesCalc').show(); 
                document.getElementById("AmountDutiesCalc").innerHTML = returnCommas(challan.TotalAmount); // brfore AmountDutiesCalc
            }
            else {
                $('#AmountOfDutyCalLabel').hide();
                $('#AmountDutiesCalc').hide();
            }
        }
    }
    else
    {

        $('#AmountOfDutyCalLabel').hide();
        $('#AmountDutiesCalc').hide();
        if (!isNaN(AmountDutiesCalc) && AmountDutiesCalc > 0) {
           // alert('system4')
            debugger;
            $('#AmountOfDutyCalLabel').show();
            $('#AmountDutiesCalc').show();
            document.getElementById("AmountDutiesCalc").innerHTML = returnCommas(AmountDutiesCalc);
            document.getElementById("totalAmountTextinDeedDetails").innerHTML = returnCommas(AmountDutiesCalc);
        }
        else {
            $('#AmountOfDutyCalLabel').hide();
            $('#AmountDutiesCalc').hide();
        }
        //alert('c')
        debugger;
        document.getElementById("CSVDC").innerHTML = "-rrrrr";
        document.getElementById("cstructureVDC").innerHTML = "-";
        document.getElementById("SqFtRateDCValue").innerHTML = "-";
        document.getElementById("CSVUP").innerHTML = "76789";
        document.getElementById("cstructureVUP").innerHTML = "-";
        document.getElementById("AreaConstructedSqft").innerHTML = "-";

     
        
        $("#CStrutureValueRelated").hide();
        $('#DCValuationRelated').hide();
    }

   
        
    

    /***************************Apply Stamp Duty***************************/

    var id = "";

    var id = challan.ChallanType;

    if (id == "New") {
        if (typeof queryStringName !== 'undefined' && queryStringName == "GenerateChallanForOldRegistry") {
            id = "PayCVTandReg";
            challan.ChallanType = "PayCVTandReg";
        }
        else if (typeof queryStringName !== 'undefined' && queryStringName == "PayDeficiencyForOldRegistry") {
            id = "PayDeficient";
            challan.ChallanType = "Deficient";
        }
        else
            id = "GenerateNewChallan";
    }
    else if (id == "PayDeficient" || id == "Deficient") {
        id = "PayDeficient";
    } else if (id == "PayCVTandReg") {
        id = "PayCVTandReg";
    }
    else if (id == "Scanning") {
        id = "Scanning";
    }
    else if (id == "MutationFee") {
        id = "Mutation Fee";
    }
    else if (id == "RegFeeNew") {
        id = "Registration Fee";
    }



    if (challan.TransactionName != exchangeOfPropertyDeedID)
    {
        // for other deeds
        $('#multiplePropertiesIncaseofExchange').hide();
        $('#multiplePropertiesIncaseofExchangeDivValue').hide();
        $('#StampDutyRuleValue').hide();

    }
    else
    {
        //for exchange of property
        $('#multiplePropertiesIncaseofExchange').show();
        $('#multiplePropertiesIncaseofExchangeDivValue').show();
        $('#StampDutyRuleValue').show();

        if (challan.isMultiplePropertiesExchageOfProperty == true) {
            document.getElementById("multiplePropertiesIncaseofExchangeDivValue").innerHTML = "Yes";
        }
        else
        {
            document.getElementById("multiplePropertiesIncaseofExchangeDivValue").innerHTML = "No";
        }
        
    }
    // added for especial deed. 
    if ((challan.applyStampDuty == true && id == "GenerateNewChallan") || (id != "PayCVTandReg" && challan.IsPLRAFee == false && challan.applyStampDuty == true)) {
        if (challan.isParentNewChallan == true) {

            $('#applyStampDutyDiv').hide();
            $('#StampDutyTextValueOld').hide();

          var fixedStamp = challan.PayableStampDutyString;
            fixedStamp = parseFloat(fixedStamp).toFixed(2);

            if ((challan.TransactionName == GiftDeedId || challan.TransactionName == PowerOfAttorneyDeed48bbId || challan.DCValuationType == true) && challan.applyCVT == false) {
                if (challan.PayableSDandCVTString != null && challan.PayableSDandCVTString != "")
                    CVTamount = parseFloat(challan.PayableSDandCVTString);
            }

           // alert('okh1')
            debugger;

            
            if (challan.TransactionName == "23") {
                var _amount = parseFloat(challan.TotalAmount);
                fixedStamp = _amount * 0.5 / 100;
            }
            else if (challan.TransactionName == "18") {                

                if (challan.DebenturepayableStampDuty != undefined) {
                    
                    fixedStamp = challan.DebenturepayableStampDuty;
                }
                else {
                    fixedStamp = challan.PayableStampDutyString;
                   // CVTamount = challan.PayableSDandCVTString;
                }
              
            }
            else if (challan.TransactionName == "212") {

                if (challan.AirTicketStampDuty != undefined) {

                    fixedStamp = challan.AirTicketStampDuty;
                    var $radio = $('input[name=AirTicketValue]:checked');
                    var radio_id = $radio.attr('id');
                    // alert(radio_id);
                    if (radio_id == "domesticFlight") {
                       challan.Fixed_Percent = 50
                    } else {
                        challan.Fixed_Percent = 400
                    }
                }
                else {
                    fixedStamp = challan.PayableStampDutyString;
                   
                    // CVTamount = challan.PayableSDandCVTString;
                }

            }

            else if (challan.TransactionName == "81") {

                if (challan.OtherPropertyVal != undefined) {
                    var twoPercentOfOtherProperty = parseFloat(challan.OtherPropertyVal.replace(/,/g, ""))
                    twoPercentOfOtherProperty = ((twoPercentOfOtherProperty * 2) / 100);
                    fixedStamp = parseFloat(fixedStamp.replace(/,/g, ""))
                    fixedStamp = fixedStamp + twoPercentOfOtherProperty;
                }
                else {
                    fixedStamp = challan.PayableStampDutyString;
                    // CVTamount = challan.PayableSDandCVTString;
                }
            }
            
                if (isNaN(CVTamount) || CVTamount <= 0) { CVTamount = parseFloat(fixedStamp) } // CVT is not applicable so add only Stamd Duty
                document.getElementById("StampDutyTextValue").innerHTML = formatAmount(CVTamount);
            
           
            $('#numberOfStampPapersDivValue').hide();
            $('#numberOfStampPapersLabelDivVeiwChallan').hide();
            $('#applyStampDutyDivViewChallan').show();
            $('#StampDutyTextValue').show();

        }
        else if (challan.isParentNewChallan == false) { // Old Challans ( Before Merger of Duties)

            $('#applyStampDutyDivViewChallan').hide();
            $('#StampDutyTextValue').hide();

            var fixedStamp = challan.PayableStampDutyString;
            if (fixedStamp != null && fixedStamp != "" && fixedStamp > 0 && challan.ChallanType != "Deficient") {
                fixedStamp = parseFloat(fixedStamp).toFixed(2);
                document.getElementById("applyStampDutyDiv").innerHTML = "Yes";
                document.getElementById("StampDutyTextValueOld").innerHTML = formatAmount(fixedStamp);
                var newAmount = challan.PayableStampDutyString;
                StampAmount = parseFloat(newAmount);                
            }
            else
            {
                document.getElementById("applyStampDutyDiv").innerHTML = "No";
                document.getElementById("StampDutyTextValueOld").innerHTML = "-";
            }
            $('#applyStampDutyDiv').show();
            $('#StampDutyTextValueOld').show();
            $('#numberOfStampPapersDivValue').hide();
            $('#numberOfStampPapersLabelDivVeiwChallan').hide();
        }
    }    
    else {
        if (challan.isParentNewChallan == false)
        {
            document.getElementById("applyStampDutyDiv").innerHTML = "No";
            document.getElementById("StampDutyTextValueOld").innerHTML = "-";

        }

        $('#numberOfStampPapersDivValue').hide();
        $('#numberOfStampPapersLabelDivVeiwChallan').hide();
        //  document.getElementById("applyStampDutyDiv").innerHTML = "No";
        $('#applyStampDutyDivViewChallan').hide();
        $('#StampDutyTextValue').hide();
        //document.getElementById("StampDutyTextValue").innerHTML = "-";
    }

    if (id == "GenerateNewChallan" || id == "PayCVTandReg") {        
        if (challan.isParentNewChallan == true)
        {
            $('#generateChallanDuties').show();
            if (isNaN(CVTamount)) { CVTamount = 0; }
            sum = CVTamount + RegistrationAmount;
            sum = sum.toFixed(2);           
        }
        else if(challan.isParentNewChallan == false)
        {
            $('#generateChallanDutiesOld').show();
            sum = CVTamount + RegistrationAmount + StampAmount;
            sum = sum.toFixed(2);            
        }

      //alert('system')
      debugger;
      if (challan.isPaidOnlineChkBox && challan.onlineSelectedBank!="") {
          sum = parseFloat(sum) + 100;
          sum = sum.toFixed(2);
          $('.ServiceChargesClass').show();
      }
      else {
          $('.ServiceChargesClass').hide();
      }
        document.getElementById("totalPayableText").innerHTML = formatAmount(sum);
        if (challan.propertyInfo) {

        
        if (challan.propertyInfo.DeclaredAmount != "" && challan.propertyInfo.DeclaredAmount != null) {
            ////alert('new 1')
            debugger;
            document.getElementById("totalStampDutyCalAmountPayableText").innerHTML = formatAmount(challan.propertyInfo.DeclaredAmount);
            debugger; 
            if (challan.TransactionName == exchangeOfPropertyDeedID)
            {
                document.getElementById("totalStampDutyCalAmountPayableText").innerHTML = formatAmount(challan.TotalAmount);
                document.getElementById("totalAmountTextinDeedDetails").innerHTML = formatAmount(challan.TotalAmount);
            }
           // document.getElementById("totalPayableText").innerHTML = formatAmount(challan.propertyInfo.DeclaredAmount);

        }
        }
    }
    
    else if (id == "PayDeficient") {
        $('#generateChallanDuties').hide();
        $('#generateChallanDutiesOld').hide();
        //alert('PayDeficient')
        debugger;
        
        var deficientAmount = challan.deficientAmount;
        var penalty = challan.penalty;
        var surchargeAmount = challan.surchargeAmount;
        if (challan.penalty != null && challan.penalty != "" && !isNaN(challan.penalty)) {
            penalty = parseFloat(penalty);
        } else {
            penalty = 0;
        }
        if (challan.surchargeAmount != null && challan.surchargeAmount != "" && !isNaN(challan.surchargeAmount)) {
            surchargeAmount = parseFloat(surchargeAmount);
        } else {
            surchargeAmount = 0;
        }
        if (!isNaN(deficientAmount) && deficientAmount != "" && deficientAmount != null) {
            deficientAmount = parseFloat(deficientAmount);
        }
        else
            deficientAmount = 0;
        sum = deficientAmount + penalty + surchargeAmount;
        sum = sum.toFixed(2);
        if (challan.isPaidOnlineChkBox && challan.onlineSelectedBank != "") {
            sum = parseFloat(sum) + 100;
            $('.ServiceChargesClass').show();
        }
        else {
            $('.ServiceChargesClass').hide();
        }
        //
        document.getElementById("totalDeficient").innerHTML = formatAmount(sum); //challan.TotalAmountOfDuties
    }

    /*-------------------------------------------------------------------------------------*/
    if (id == "GenerateNewChallan") {
        $('#deficientViewChallanDiv').hide();
        $('#payCVTandRegistrationDiv').hide();
        $("#registryPagesDiv").hide();
        $('#totalTaxPayableDiv').show();
        if (challan.TransactionName == PolicyDeedID) {
            $("#StampDutyRuleId").hide();
            $("#StampDutyRuleId").hide();
            document.getElementById("StampDutyRuleValue").innerHTML = challan.Fixed_Percent + " % of Amount";
            $("#StampDutyRuleValue").hide(); 
        } else {
            $("#StampDutyRuleId").hide();
            $("#StampDutyRuleValue").hide();
            document.getElementById("StampDutyRuleValue").innerHTML = "-";
            $("#StampDutyRuleValue").hide();
        }
        if (challan.IsPLRAFeeOld == true) {
            $('#generateChallanDutiesOld').hide();
            $('#generateChallanPLRADutyOld').show();
            
            document.getElementById("applyPLRADutyDiv").innerHTML = formatAmount(challan.PLRAFee + "");
            PLRAFee = parseFloat(challan.PLRAFee);
            document.getElementById("totalPayableText").innerHTML = formatAmount(PLRAFee); /////

        } else {
            $('#generateChallanPLRADutyOld').hide();
        }
        
    } else if (id == "PayDeficient") {
        $('#payCVTandRegistrationDiv').hide();
        $('#deficientViewChallanDiv').show();
        $('#totalTaxPayableDiv').hide();
        $("#registryPagesDiv").hide();

        if (challan.deficientAmount == "" || challan.deficientAmount == null)
        {
            document.getElementById("deficientValue").innerHTML = "-"
        }
        else {
            document.getElementById("deficientValue").innerHTML = returnCommas(challan.deficientAmount);
        }
        

        if (challan.penalty == null || challan.penalty == "") {
            //$('#penaltyLabel').hide();
            //$('#penaltyValue').hide();
            document.getElementById("penaltyValue").innerHTML = "-";
        } else {
            $('#penaltyLabel').show();
            $('#penaltyValue').show();
            document.getElementById("penaltyValue").innerHTML = returnCommas(challan.penalty);
        }

        if (challan.surchargeAmount == null || challan.surchargeAmount == "") {
            //$('#penaltyLabel').hide();
            //$('#penaltyValue').hide();
            document.getElementById("SurchargeAmount").innerHTML = "-";
        } else {
            $('#div_SurchageAmountRsLbl').show();
            $('#SurchargeAmount').show();
            document.getElementById("SurchargeAmount").innerHTML = returnCommas(challan.surchargeAmount);
        }

        if (challan.stampModel != null && challan.IsPLRAFee == false) {
            $('#taxdiv').hide();
        }
        else {
            $('#taxdiv').show();
        }

        //document.getElementById("totalDeficient").innerHTML = challan.totalDeficient;
    }
    else {
        
        $('#deficientViewChallanDiv').hide();
       // $('#applyStampDutyDivViewChallan').hide();
       // $('#stamDutyValues').hide();
        $('#totalTaxPayableDiv').show();

        if (challan.applyDeficientCVT == true) {
            $('#payCVTandRegistrationDiv').show();
            $('#payCVTandRegistrationDiv1').show();
            document.getElementById("deficientCVTValue").innerHTML = returnCommas(challan.PayableCvtString);
            var newAmount = challan.PayableCvtString;
            deficientCVT = parseFloat(newAmount);
        } else {
            $('#payCVTandRegistrationDiv1').hide();
        }
        if (challan.applyDeficientRegistration == true) {
            $('#payCVTandRegistrationDiv').show();
            $('#payCVTandRegistrationDiv2').show();
            document.getElementById("deficientRegValue").innerHTML = returnCommas(challan.RegistrationFeeString);
            var newAmount = challan.RegistrationFeeString;
            deficientReg = parseFloat(newAmount);
        } else {
            $('#payCVTandRegistrationDiv2').hide();
        }
        
        sum = CVTamount + RegistrationAmount;
        sum = sum.toFixed(2);
        //alert('system1')
        debugger;
        document.getElementById("totalPayableText").innerHTML = formatAmount(sum); /////
        ////alert('new 2')
        debugger;
        if (challan.propertyInfo != null) {
           

            document.getElementById("totalStampDutyCalAmountPayableText").innerHTML = formatAmount(challan.propertyInfo.DeclaredAmount); /////
           
        }
        else {
            document.getElementById("totalStampDutyCalAmountPayableText").innerHTML = "-"; /////
        }

        var deficientSum = 0;
        deficientSum = deficientCVT + deficientReg + CVTamount + RegistrationAmount; 

        //if (challan.isRegistryFeeCheck) {
        //    $('#registryPagesDiv').show();
        //    //document.getElementById("RegistryText").innerHTML = "Yes";
        //    document.getElementById("RegistryAmountText").innerHTML = formatAmount(challan.RegistryFeeString);
        //    deficientSum = deficientSum + parseFloat(challan.RegistryFee)
        //}
        //else {
        //   // document.getElementById("RegistryText").innerHTML = "No";
        //    document.getElementById("RegistryAmountText").innerHTML = "-";
        //}
        if (/*(queryStringName != undefined && queryStringName != "GenerateChallanForOldRegistry" && challan.isAhleCommissionFeeChecked)
            ||*/ ( challan.isOldRegistryChallan != true  && challan.isAhleCommissionFeeChecked ) ) {
            $('#AhleCommissionPagesDiv').show();
            //document.getElementById("RegistryText").innerHTML = "Yes";
            document.getElementById("AhleCommissionAmountText").innerHTML = formatAmount(challan.AhleCommissionFeeString);
            deficientSum = deficientSum + parseFloat(challan.AhleCommissionFee)
        }
        else {
            $('#AhleCommissionPagesDiv').hide();
            //document.getElementById("AhleCommissionAmountText").innerHTML = "-";
        }
        if (/*(queryStringName != undefined && queryStringName == "GenerateChallanForOldRegistry" == "GenerateChallanForOldRegistry" && challan.isAhleCommissionFeeChecked)
            || */(challan.isOldRegistryChallan == true && challan.isAhleCommissionFeeChecked)) {
            $('#payCVTandRegistrationDiv3').show();
            document.getElementById("ahleCommisionOldViewValue").innerHTML = formatAmount(challan.AhleCommissionFeeString);
            deficientSum = deficientSum + parseFloat(challan.AhleCommissionFee)
        }
        else {
            $('#payCVTandRegistrationDiv3').hide();
            //document.getElementById("ahleCommisionOldViewValue").innerHTML = "-";
        }

        if (challan.DigitalScaningFee) {
           // alert("I am in Digital Scanning Department! Help me out !");
            debugger; 
            $("#DigitalScanningAmountText_New").innerHTML = formatAmount(challan.DigitalFee);
            $("#CopyingFeeAmountText_New").innerHTML = formatAmount(challan.CopyingFee);
            $("#DuplicateFeeAmountText_New").innerHTML = formatAmount(challan.DuplicateFee);
            $("#digitalScanningFeeDiv").show();
            $("#CopyingFeeDiv").show();
            $("#DuplicateFeeDiv").show();
            
            deficientSum = deficientSum + parseFloat(challan.DigitalFee) + parseFloat(challan.CopyingFee) + parseFloat(challan.DuplicateFee); 
            document.getElementById("totalPayableText").innerHTML = formatAmount(deficientSum);

        }
        if (challan.MutationFee) {
            // alert("I am in Digital Scanning Department! Help me out !");
            debugger;
            $("#MutationAmountText_New").innerHTML = formatAmount(challan.MutationFeeValue);
            $("#CertifiedFeeAmountText_New").innerHTML = formatAmount(challan.CertifiedFee);
            
            $("#MutationFeeDiv").show();
            $("#CertifiedFeeDiv").show();
          

            deficientSum = deficientSum + parseFloat(challan.MutationFeeValue) + parseFloat(challan.CertifiedFee) ;
            document.getElementById("totalPayableText").innerHTML = formatAmount(deficientSum);

        }
        if (challan.isRegistryFeeCheck) {
            // alert("I am in Digital Scanning Department! Help me out !");
            debugger;
           $('#registryPagesDiv').show();
         // document.getElementById("RegistryText").innerHTML = "Yes";
           document.getElementById("RegistryAmountText").innerHTML = formatAmount(challan.RegistryFee);
           document.getElementById("RegistryAmountText").innerHTML = formatAmount(challan.RegistryFee);
           $("#RegistryAmountText").innerHTML = formatAmount(challan.RegistryFee);
           
            $("#registryPagesDiv").show();
            
            deficientSum = deficientSum + parseFloat(challan.RegistryFee);
            document.getElementById("totalPayableText").innerHTML = formatAmount(deficientSum);

        }
        if (challan.IsPLRAFee == true) {

            $('#PLRAFeeDiv').show();
            document.getElementById("PLRAAmountText").innerHTML = formatAmount(challan.PLRAFee + "");
            deficientSum = parseFloat(challan.PLRAFee)
        }
        else {
            $('#PLRAFeeDiv').hide();
        }
        if (challan.IsPLRAFeeOld == true) {
            //$('#generateChallanDutiesOld').hide();
            $('#generateChallanPLRADutyOld').show();

            document.getElementById("applyPLRADutyDiv").innerHTML = formatAmount(challan.PLRAFee + "");
            document.getElementById("totalPayableText").innerHTML = formatAmount(challan.PLRAFee); /////
            deficientSum = parseFloat(challan.PLRAFee)
        } else {
            $('#generateChallanPLRADutyOld').hide();
        }
        deficientSum = deficientSum.toFixed(2);
        document.getElementById("totalPayableText").innerHTML = formatAmount(deficientSum);

       

        if (challan.stampModel != null && challan.IsPLRAFee != true ) {
            $('#taxdiv').hide();
        }
        else {
            $('#taxdiv').show();
        }

        
    }

    /*-------------------------------------------------------------------------------------*/

    //if (challan.leasePeriod != null && challan.leasePeriod != "") {
    //    $('#leasePeriodTextLabel').show();
    //    $('#leasePeriodText').show();
    //    document.getElementById("leasePeriodText").innerHTML = challan.leasePeriod + " years";
    //}
    //else {
    //    $('#leasePeriodTextLabel').hide();
    //    $('#leasePeriodText').hide();
    //}

    //if (challan.TotalLeaseMoney != null && challan.TotalLeaseMoney != "") {
    //    $('#leaseMoneyTextLabel').show(); 
    //    $('#leaseMoneyText').show();
    //    document.getElementById("leaseMoneyText").innerHTML = returnCommas(challan.TotalLeaseMoney);
    //}
    //else {
    //    $('#leaseMoneyTextLabel').hide();
    //    $('#leaseMoneyText').hide();
    //}

    //if (challan.Premium != null && challan.Premium != "") {
    //    $('#PremiumDiv').show();
    //    document.getElementById("PremiumValue").innerHTML = returnCommas(challan.Premium);
    //}
    //else {
    //    $('#PremiumDiv').hide();
    //}

    //if (challan.AdvanceMoney != null && challan.AdvanceMoney != "") {
    //    $('#AdvanceMoneyDiv').show();
    //    document.getElementById("AdvanceMoneyValue").innerHTML = returnCommas(challan.AdvanceMoney);
    //}
    //else {
    //    $('#AdvanceMoneyDiv').hide();
    //}

   // $('#constructedAreadiv').hide();
   // $('#constructedAreaTextdiv').hide();
    $('#landAreaViewChallanDiv').hide();
    document.getElementById("sellerHeading").innerHTML = Party2Label;
    if (challan.Party1!= null && challan.Party1.length != 0) {
        document.getElementById("puchaserHeading").innerHTML = Party1Label;
    } else {
        $('#purchasersdiv').hide();
    }
    var minimumNonJudicialAmount = 1001;
    var NonJudicialAmoountErrorMsg = stampErrorMessageNonJ;
    if ($("#ImplementFiveHundred").val() === "Yes")
    {
        minimumNonJudicialAmount = 500;
        NonJudicialAmoountErrorMsg = stampErrorMessageNonJ500;
    }
    else
    {
        minimumNonJudicialAmount = 1001;
        NonJudicialAmoountErrorMsg = stampErrorMessageNonJ;
    }
    var totalPayableAmount = parseFloat($("#totalPayableText").text().replace(/,/g, ""));   
    if ((challan.ChallanType == "New" || challan.ChallanType == "GenerateNewChallan")) { // For Judicial Error has been handled earlier.
        
        if (challan.TransactionName == Contract22AB_DeedId) {
            if (totalPayableAmount < 1200) {
                $("#submitChallan").attr("disabled", true);
                $("#stampErrorMessage").css("color", "red");
                document.getElementById("stampErrorMessage").innerHTML = stampErrorMessageNonJ_ContractDeed;//stampErrorMessageNonJ//"To Generate Challan 32-A For Contract 22 A, minimum payable Total Amount must be greater than or equal to Rs. 1200/-";
                $("#stampErrorMessage").show();
                $("#btnPrintChallan").attr("disabled", true);
            }
        }
        else {

            if (totalPayableAmount < minimumNonJudicialAmount && challan.TransactionTypeString != "Judicial" && challan.TransactionName != REG_CVT_DeedId)
            {
                $("#submitChallan").attr("disabled", true);
                $("#stampErrorMessage").css("color", "red");
                document.getElementById("stampErrorMessage").innerHTML = NonJudicialAmoountErrorMsg;//stampErrorMessageNonJ//"To Generate Challan 32-A, minimum payable Total Amount must be greater than or equal to Rs. 1000/-";
                $("#stampErrorMessage").show();
                $("#btnPrintChallan").attr("disabled", true);
            }
            else if (challan.TransactionTypeString != "Judicial") {
                $("#stampErrorMessage").hide();
                $("#submitChallan").removeAttr("disabled");
            }
        }
        
    }
    else if (challan.TransactionTypeString != "Judicial") {
        $("#stampErrorMessage").hide();
        $("#submitChallan").removeAttr("disabled");
    }

    if (challan.TransactionTypeString == "Judicial") {

        $('#constructedAreadiv').hide();
        $('#constructedAreaTextdiv').hide();
        $('#CVTRegistrationLabel').hide();
        $('#CVTRegistrationText').hide();
        $('#govtPropertydiv').hide();
        $('#govtPropertyTextdiv').hide();

        document.getElementById("suitForText").innerHTML = challan.SuitFor;

    }
    else {
        if (challan.propertyInfo != null) {
           // //alert('suno na')
            debugger;
            if (challan.propertyInfo.ConstructedStructureValue != "" && challan.propertyInfo.ConstructedStructureValue > 0) {
                challan.propertyInfo.IsConstructed = true;
            }

            if (challan.LandCategory != "" && challan.LandCategory != undefined && challan.LandCategory != "undefined") {
                document.getElementById("CategoryDCScreenText").innerHTML = challan.LandCategory;
            }
            else if (challan.propertyInfo.CATEGORY_ID != "" && challan.propertyInfo.CATEGORY_ID != undefined && challan.propertyInfo.CATEGORY_ID != "undefined") {
                getCategoryByID(challan.propertyInfo.CATEGORY_ID);
                //alert(challan.propertyInfo.CATEGORY_NAME); 
               // document.getElementById("CategoryDCScreenText").innerHTML = challan.propertyInfo.CATEGORY_NAME;
            }
            else {
                if (challan.propertyInfo.CATEGORY_NAME != "" && challan.propertyInfo.CATEGORY_NAME != undefined && challan.propertyInfo.CATEGORY_NAME != "undefined") {
                    document.getElementById("CategoryDCScreenText").innerHTML = challan.propertyInfo.CATEGORY_NAME;
                }
                else {
                    document.getElementById("CategoryDCScreenText").innerHTML = "-";
                }

            }

            
          
            if (challan.ProduceIndexValue != "" && challan.ProduceIndexValue != undefined && challan.ProduceIndexValue != "undefined") {
                document.getElementById("ProduceIndexRate").innerHTML ="Rs. "+ returnCommas(challan.ProduceIndexValue) + " " + challan.ProduceIndexUnit;
            }
            else if (challan.propertyInfo.PRODUCE_INDEX != "" && challan.propertyInfo.PRODUCE_INDEX != undefined && challan.propertyInfo.PRODUCE_INDEX != "undefined") {
                document.getElementById("ProduceIndexRate").innerHTML = "Rs. " + returnCommas(challan.propertyInfo.PRODUCE_INDEX) + " Acre";
            }
            else if (challan.rate_type_agriculture != "Survey") {
                document.getElementById("ProduceIndexRate").innerHTML = "Rs. " + returnCommas(challan.propertyInfo.RATE) + " Acre";
            }
            else {
                document.getElementById("ProduceIndexRate").innerHTML = "-";
            }

            if (challan.produceIndexUnitAmount != "" && challan.produceIndexUnitAmount != undefined && challan.produceIndexUnitAmount != "undefined") {
                document.getElementById("ProduceIndexUnit").innerHTML = returnCommas(challan.produceIndexUnitAmount);
            }
            else if (challan.propertyInfo.RATE != "" && challan.propertyInfo.RATE != undefined && challan.propertyInfo.RATE != "undefined") {
                document.getElementById("ProduceIndexUnit").innerHTML = "Rs. " + returnCommas(challan.propertyInfo.RATE) + " Index Unit";
            }
            else {
                document.getElementById("ProduceIndexUnit").innerHTML = "-";
            }
            if (challan.propertyInfo.isUrban || challan.propertyInfo.treatAsUrban == true || $("#districtDropdownDC").val() == 1) {
                    $("#div_rural_lbl").hide();
                    $("#div_rural_txt").hide();
            }
            else {
                $("#div_rural_lbl").show();
                $("#div_rural_txt").show();
            }
            //alert('okkk')
            debugger;
            if (challan.TransactionName != PowerOfAttorneyDeedId) {
                $('#landAreaViewChallanDiv').hide();
               // if (challan.propertyInfo.ConstructedAreaInSqFeet != null && challan.propertyInfo.ConstructedAreaInSqFeet != "") {
                if (challan.propertyInfo.ConstructedStructureValue != "" && challan.propertyInfo.ConstructedStructureValue > 0) {
                     $('#constructedAreadiv').show();
                    $('#constructedAreaTextdiv').show();
                    //$('#multiStoryViewChallanDiv').show();
                    //document.getElementById("isConstructedText").innerHTML = "Yes";
                    //alert('123');
                    document.getElementById("constructedAreaText").innerHTML = challan.propertyInfo.Area;
                    document.getElementById("IsAreaConstructed").innerHTML = "Yes";
                    document.getElementById("AreaConstructedSqft").innerHTML = challan.propertyInfo.Area;
                    document.getElementById("CSVUP").innerHTML = challan.propertyInfo.ConstructedStructureValue;
                } else {

                    //document.getElementById("isConstructedText").innerHTML = "No";
                    document.getElementById("constructedAreaText").innerHTML = "-";
                    //document.getElementById("IsAreaConstructed").innerHTML = "No";
                    document.getElementById("AreaConstructedSqft").innerHTML = "-";
                }
            }
            else {
                $('#constructedAreadiv').hide();
                $('#constructedAreaTextdiv').hide();
                //$('#multiStoryViewChallanDiv').hide();
                $('#landAreaViewChallanDiv').show();
                document.getElementById("landAreaValueViewChallan").innerHTML = challan.propertyInfo.Area + " (sq. feet)";
            }

            if (challan.TransactionName == exchangeOfPropertyDeedID)
            {
                if (challan.propertyInfo.IsGovProperty == true) {
                    $('#govtPropertydiv').show();
                    $('#govtPropertyTextdiv').show();
                    document.getElementById("isgovtPropertyText").innerHTML = "Yes";


                } else {

                    document.getElementById("isgovtPropertyText").innerHTML = "No";

                }
            }
            else
            {
                $('#govtPropertydiv').hide();
                $('#govtPropertyTextdiv').hide();
            }
        }
        else
        {
            $('#constructedAreadiv').hide();
            $('#constructedAreaTextdiv').hide();
            $('#govtPropertydiv').hide();
            $('#govtPropertyTextdiv').hide();
        }
    }

    if (challan.TransactionTypeString != "Judicial") {
        if (challan.propertyInfo2 != null) {
            document.getElementById("firstPropertyHeading").innerHTML = firstPropertyChallanInformationLbl;//"First Property/Challan Information";
        }
        else {
            document.getElementById("firstPropertyHeading").innerHTML = PropertyChallanInformationLbl;//"Property/Challan Information";
        }
        
        document.getElementById("districtText").innerHTML = challan.DistrictString;
        document.getElementById("tehsilText").innerHTML = challan.TalukaString;
        $('#suitForText').hide();
        $('#suitForLabel').hide();
    } else {
        if (challan.SuitFor != null && challan.SuitFor != "") {
            $('#suitForText').show();
            $('#suitForLabel').show();
        }
        else {
            $('#suitForText').hide();
            $('#suitForLabel').hide();
        }
      
        if (challan.DistrictString != null) {
            document.getElementById("districtText").innerHTML = challan.DistrictString;
            document.getElementById("tehsilText").innerHTML = challan.TalukaString;
            //} else {
            //    if (challan.propertyInfo.DistrictString != null) {
            //        document.getElementById("districtText").innerHTML = challan.propertyInfo.DistrictString;
            //        document.getElementById("tehsilText").innerHTML = challan.propertyInfo.TehsilString;
            //    } else {
            //        $('#districtTehsilLabel').hide();
            //        $('#districtTehsilText').hide();
            //    }
            //}
        }
    }
    /*-------------------------------------------------------------------------------------*/

    $('#addressLabel').hide();
    $('#addressText').hide();
    $('#propertyClassificationText').hide();
    $('#propertyClassificationLabelText').hide();

    if (challan.propertyInfo != null) {
        if (challan.TransactionTypeString != "Judicial" && challan.propertyInfo.LandClassificationString != null && challan.propertyInfo.LandClassificationString != "") {
            $('#propertyClassificationLabelText').show();
            $('#propertyClassificationText').show();
            document.getElementById("propertyClassificationText").innerHTML = challan.propertyInfo.LandClassificationString;
        } else {
            $('#propertyClassificationText').hide();
            $('#propertyClassificationLabelText').hide();
        }

        if (challan.TransactionTypeString != "Judicial" && challan.propertyInfo != null) {
            if (challan.propertyInfo.FullAddress != null && challan.propertyInfo.FullAddress != "") {
                $('#addressText').show();
                $('#addressLabel').show();
                document.getElementById("addressText").innerHTML = challan.propertyInfo.FullAddress;
            }
        } else {
            $('#addressLabel').hide();
            $('#addressText').hide();
        }
        //if (challan.propertyInfo.IsConstructed != null && challan.propertyInfo.IsConstructed != "") {

        //    if (challan.propertyInfo.IsConstructed) {
        //        document.getElementById("IsAreaConstructed").innerHTML = "Yes";
        //    }
        //    else {
        //        document.getElementById("IsAreaConstructed").innerHTML = "No";
        //        // document.getElementById("CvtAmountText").innerHTML = "-";
        //    }
        //}

       
      
    }
    //else
    //{
    //    document.getElementById("IsAreaConstructed").innerHTML = "-";
    //}

    /*-------------------------------------------------------------------------------------*/
    if (challan.DigitalScaningFee) {
        hideDivForDigitalScanningFee();
    }
    /*SELLER INFORMAION*/
    function sellerDetails(d) {
        //alert('testing');
        debugger;
       // fullViewMode = true; 
        var grid = $('#data').data("kendoGrid");
        d.preventDefault();
        var dataItem = this.dataItem($(d.currentTarget).closest("tr"));
        
        document.getElementById("sellerNameText").innerHTML = dataItem.NameString;

        if (dataItem.IsOverseas == true) {
            $("#PassportLabelSeller").show();
            $("#sellerPassportText").show();
            document.getElementById("sellerPassportText").innerHTML = dataItem.PersonPassport;
            $("#SellerNTNLabel").hide();
            $("#sellerNTNText").hide();
            $("#CNINLabbel").hide();
            $("#sellerCNICText").hide();
        }
        else {
            if (dataItem.PersonCnic == '--') {
                $("#CNINLabbel").hide();
                $("#sellerCNICText").hide();
                $("#SellerNTNLabel").show();
                $("#sellerNTNText").show();
                document.getElementById("sellerNTNText").innerHTML = dataItem.NTN;
                $("#SellerNTNLabel").show();
                $("#sellerNTNText").show();


            }
            else {
                $("#CNINLabbel").show();
                $("#sellerCNICText").show();
                $("#SellerNTNLabel").hide();
                $("#sellerNTNText").hide();
                document.getElementById("sellerCNICText").innerHTML = dataItem.PersonCnic;
            }
        }
        debugger;
        //document.getElementById("sellerCNICText").innerHTML = dataItem.PersonCnic;
        if (dataItem.PersonPhone == null || dataItem.PersonPhone == "") {
            document.getElementById("sellerContactText").innerHTML = "--";
        } else {
            document.getElementById("sellerContactText").innerHTML = dataItem.PersonPhone;
        }
        if (dataItem.PersonCnic == null || dataItem.PersonCnic == "") {
            document.getElementById("sellerCNICText").innerHTML = "--";
        } else {
            document.getElementById("sellerCNICText").innerHTML = dataItem.PersonCnic;
        }
        document.getElementById("sellerAddressText").innerHTML = dataItem.PersonAddress;
        if (dataItem.PersonEmail == null || dataItem.PersonEmail == "") {
            $('#party2email').hide();
        } else {
            $('#party2email').show();
            //document.getElementById("").innerHTML = dataItem.PersonEmail;
            document.getElementById("sellerEmailText").innerHTML = dataItem.PersonEmail;
        }
        if (dataItem.IsPrimary == null || dataItem.IsPrimary == "") {
            document.getElementById("sellerPrimaryText").innerHTML = "No";
        } else {
            document.getElementById("sellerPrimaryText").innerHTML = "Yes";
        }
        if (dataItem.IsThroughPowerOfAttorney == null || dataItem.IsThroughPowerOfAttorney == "") {
            document.getElementById("sellerThroughAttorneyText").innerHTML = "No";
        } else {
            document.getElementById("sellerThroughAttorneyText").innerHTML = "Yes";
            $("#AtorenyDetailTitleDivSeller").show();
            $("#AtorenyDetailTextDivSeller").show();
            document.getElementById("purchaserAttorneyProviderNameTextSeller").innerHTML = dataItem.PersonNameAttorneyProvider;
            document.getElementById("purchaserAttorneyProviderCnicTextSeller").innerHTML = dataItem.PersonCnincPassportAttorneyProvider;


        }

        if (fullViewMode == false)
        {
            $('#divParty2ContactInfoLabel').hide();
            $('#divParty2ContactInfoValue').hide();
            $('#party2email').hide();
        }
        

        $("#sellerDetailedWindow").data("kendoWindow").title(Party2Label).center().open();

    }

    /*SELLER INFORMAION For Franking Machine*/
    function sellerDetailsForFrankingMachine(d) {
        //alert();
        debugger;
        var grid = $('#data').data("kendoGrid");
        d.preventDefault();
        var dataItem = this.dataItem($(d.currentTarget).closest("tr"));

        document.getElementById("sellerNameText").innerHTML = dataItem.NameString;
        if (dataItem.PersonCnic == '') {
           
            $("#CNINLabbel").hide();
            $("#sellerCNICText").hide();
            $("#NTNLabel").show();
            $("#sellerNTNText").show();
            document.getElementById("sellerNTNText").innerHTML = dataItem.NTN;

        }
        else {
          
            $("#CNINLabbel").show();
            $("#sellerCNICText").show();
            $("#NTNLabel").hide();
            $("#sellerNTNText").hide();
            document.getElementById("sellerCNICText").innerHTML = dataItem.PersonCnic;
        }
        //document.getElementById("sellerCNICText").innerHTML = dataItem.PersonCnic;
        if (dataItem.PersonCnic == null || dataItem.PersonCnic == "") {
            document.getElementById("sellerCNICText").innerHTML = "--";
        } else {
            document.getElementById("sellerCNICText").innerHTML = dataItem.PersonCnic;
        }
        if (dataItem.PersonPhone == null || dataItem.PersonPhone == "") {
            document.getElementById("sellerContactText").innerHTML = "--";
        } else {
            document.getElementById("sellerContactText").innerHTML = dataItem.PersonPhone;
        }
        //document.getElementById("sellerContactText").innerHTML = dataItem.PersonPhone;
        document.getElementById("sellerAddressText").innerHTML = dataItem.PersonAddress;
        if (dataItem.PersonEmail == null || dataItem.PersonEmail == "") {
            $('#party2email').hide();
        } else {
            $('#party2email').show();
            //document.getElementById("").innerHTML = dataItem.PersonEmail;
            document.getElementById("sellerEmailText").innerHTML = dataItem.PersonEmail;
        }
        if (dataItem.IsPrimary == null || dataItem.IsPrimary == "") {
            document.getElementById("sellerPrimaryText").innerHTML = "No";
        } else {
            document.getElementById("sellerPrimaryText").innerHTML = "Yes";
        }
        if (dataItem.IsThroughPowerOfAttorney == null || dataItem.IsThroughPowerOfAttorney == "") {
            document.getElementById("sellerThroughAttorneyText").innerHTML = "No";
        } else {
            document.getElementById("sellerThroughAttorneyText").innerHTML = "Yes";
        }

        if (fullViewMode == false) {
            $('#divParty2ContactInfoLabel').hide();
            $('#divParty2ContactInfoValue').hide();
            $('#party2email').hide();
        }


        $("#sellerDetailedWindow").data("kendoWindow").title(Party2Label).center().open();

    }

    function stampGrid()
    {
        if (challan.stampModel != null) {

            if (challan.stampModel.LstStampInfo != null) {
                for (var i = 0; i < challan.stampModel.LstStampInfo.length; i++) {
                    if (challan.stampModel.LstStampInfo[i].Stamp_serial_number == null || challan.stampModel.LstStampInfo[i].Stamp_serial_number == '') {
                                                    challan.stampModel.LstStampInfo[i].Stamp_serial_number = "-";
                                            }
                }

            }
            $("#stampInfoGrid").kendoGrid({
                dataSource: {
                    data: challan.stampModel.LstStampInfo,
                    schema: {
                        model: {
                            fields: {
                                ChallanNumber: { type: "string" },
                                StampType: { type: "string" },
                                PaymentReferenceNumber: { type: "string" },
                                PaymentTimeStamp: { type: "string" },
                                AmountString: { type: "string" },
                                BankCode: { type: "string" },
                                BranchCode: { type: "string" },
                                Stamp_serial_number: { type: "string" }
                            }
                        }
                    },
                    pageSize: 20
                },

                scrollable: false,
                sortable: false,
                filterable: false,
                pageable: false,
                columns: [
                    { field: "ChallanNumber", title: "Challan Number", width: "190px" },
                    { field: "StampType", title: "Type", width: "130px" },
                    { field: "BankCode", title: "Bank Code", width: "130px" },
                    { field: "BranchCode", title: "Branch Code", width: "150px", template: '<a href="BranchesList" target=_blank>#=BranchCode#</a>' },
                    { field: "PaymentReferenceNumber", title: "Payment Reference", width: "220px" },
                    { field: "PaymentTimeStamp", title: "Payment Time", width: "330px" },
                    { field: "AmountString", title: "Stamp Amount (Rs.)", width: "250px" },
                    { field: "Stamp_serial_number", title: "Stamp Serial Number", width: "230px" },
                ]
            });
        }
    }

    function stampCVTRegFeeInfoGrid() {
        if (challan.stampModel != null) {
            $("#stampCVTRegFeeInfoGrid").kendoGrid({
                dataSource: {
                    data: challan.stampModel.LstCVTRegFeeInfo,
                    schema: {
                        model: {
                            fields: {
                                ChallanNumber: { type: "string" },
                                DutyName: { type: "string" },
                                BranchCode: { type: "string" },
                                PaymentReferenceNumber: { type: "string" },
                                PaymentTimeStamp: { type: "string" },
                                AmountString: { type: "string" },
                                RefundStatus: { type: "string" },
                                
                            }
                        }
                    },
                    pageSize: 20
                },

                scrollable: false,
                sortable: false,
                filterable: false,
                pageable: false,
                columns: [
                    { field: "ChallanNumber", title: "Challan Number", width: "180px" },
                    { field: "DutyName", title: "Duty", width: "350px" },
                    { field: "BranchCode", title: "Branch Code", width: "150px",template: '<a href="BranchesList" target=_blank>#=BranchCode#</a>' },
                    { field: "PaymentReferenceNumber", title: "Payment Reference", width: "145px" },
                    { field: "PaymentTimeStamp", title: "Payment Time", width: "320px" },
                    { field: "AmountString", title: "Duty Amount (Rs.)", width: "230px" },
                    { field: "RefundStatus", title: "Refund Status", width: "200px" }
                ]
            });
        }
    }

    function multipleKhasraGrid()
    {
        if (challan.propertyInfo != null && challan.propertyInfo.MultipleKhasras != null)
        {


            $("#multipleKhasraGrid").kendoGrid({
                dataSource: {
                    data: challan.propertyInfo.MultipleKhasras,
                    pageSize: 14,
                    schema: {
                        model: {
                            fields: {
                                DistrictId: { type: "string" },
                                TalukaId: { type: "string" },
                                FloorId: { type: "string" },
                                BasementId: { type: "string" },
                                PropertyAreaId: { type: "string" },
                                LandClassification: { type: "string" },
                                LandClassificationId: { type: "string" },
                                LandCategory: { type: "string" },
                                LandCategoryId: { type: "string" },
                                DCCabniteRate: { type: "string" },
                                DCStructureRate: { type: "string" },
                                LandArea: { type: "string" },
                                CoveredArea: { type: "string" },
                                RateUnit: { type: "string" },
                                PropertyDCValue: { type: "string" },

                            }
                        }
                    },
                },

                scrollable: true,
                sortable: false,
                filterable: false,
                pageable: true,


                columns: [

                        { field: "DistrictId", hidden: true, width: "0px" },
                        { field: "TalukaId", hidden: true, width: "0px" },
                        { field: "PropertyAreaId", hidden: true, width: "0px" },                        
                        { field: "LandClassification", title: "Classification", width: "80px" },
                        { field: "LandClassificationId", hidden: true, width: "0px" },
                        { field: "LandCategory", title: "Category", width: "45px" },
                        { field: "LandCategoryId", hidden: true, width: "0px" },
                        { field: "FloorId", title: "Floors", width: "30px" },
                         { field: "BasementId", title: "Basements", width: "50px" },
                        { field: "DCCabniteRate", title: "Valuation Rate", width: "50px", template: function (dataItem) { return numberWithCommas(dataItem.DCCabniteRate); } },
                        { field: "DCStructureRate", title: "Structure Rate", width: "50px", template: function (dataItem) { return numberWithCommas(dataItem.DCStructureRate); } },
                        { field: "LandArea", title: "Land Area", width: "50px" },
                        { field: "CoveredArea", title: "Covered Area", width: "50px" },
                        { field: "RateUnit", title: "Rate Unit", width: "50px" },
                        { field: "PropertyDCValue", title: "Property Value", width: "70px", template: function (dataItem) { return numberWithCommas(dataItem.PropertyDCValue); } },
                        

                ]
            });

            //$("#multipleKhasraGrid").kendoGrid({
            //    dataSource: {
            //        data: challan.propertyInfo.multipleKhasraList,
            //        schema: {
            //            model: {
            //                fields: {
            //                    KhasraNo: { type: "string" },
            //                    LandClassification: { type: "string" },
            //                    Location: { type: "string" },
            //                    LandAreaWithUnitString: { type: "string" },
            //                    KhasraDCRateWithUnitString: { type: "string" },
            //                    TreatAsUrban: { type: "string" },
            //                }
            //            }
            //        },
            //        pageSize: 10
            //    },

            //    scrollable: false,
            //    sortable: false,
            //    filterable: false,
            //    pageable: true,
            //    columns: [
            //        { field: "KhasraNo", title: "Khasra No", width: "150px" },
            //        { field: "LandClassification", title: "Land Classification", width: "300px" },
            //        { field: "Location", title: "Location", width: "400px" },
            //        { field: "LandAreaWithUnitString", title: "Land Area", width: "120px" },
            //        { field: "KhasraDCRateWithUnitString", title: "DC Rate (Rs.)", width: "250px" },
            //        { field: "TreatAsUrban", title: "Is Rating Area", template: "<span class='treatAsUrban'></span>", width: "80px" },
            //    ],
            //    dataBound: function () {
            //        var rows = this.items();
            //        var data = this._data;
            //        $(rows).each(function () {
            //            var index = $(this).index();
            //            var rowLabel = $(this).find(".treatAsUrban");
            //            if (data[index].TreatAsUrban == "true")
            //                $(rowLabel).html("Yes");
            //            else
            //                $(rowLabel).html("No");
            //        });
            //    }
            //});
        }
    }


    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    function multipleQilaGrid() {
        if (challan.propertyInfo != null && challan.propertyInfo.MultipleQilas != null) {
            $("#multipleQilaGrid").kendoGrid({
                dataSource: {
                    data: challan.propertyInfo.MultipleQilas,
                    schema: {
                        model: {
                            fields: {
                                QilaNo: { type: "string" },
                                SquareNo: { type: "string" },
                                LandClassification: { type: "string" },
                                Location: { type: "string" },
                                LandAreaWithUnitString: { type: "string" },
                                //QilaNoRateString: { type: "string" },
                                QilaDCRateWithUnitString: { type: "string" },
                                TreatAsUrban: { type: "string" },
                            }
                        }
                    },
                    pageSize: 10
                },
                scrollable: false,
                sortable: false,
                filterable: false,
                pageable: true,
                columns: [
                    { field: "QilaNo", title: QilaNo, width: "100px" },
                    { field: "SquareNo", title: SquareNo, width: "100px" },
                    { field: "LandClassification", title: LandClassification, width: "220px" },
                    { field: "Location", title: "Location", width: "400px" },
                    { field: "LandAreaWithUnitString", title: LandArea, width: "150px" },
                    //{ field: "QilaNoRateString", title: "DC Rate (Rs.)", width: "280px" },
                    { field: "QilaDCRateWithUnitString", title: "DC Rate (Rs.)", width: "250px" },
                    { field: "TreatAsUrban", title: "Is Rating Area", template: "<span class='treatAsUrban'></span>", width: "80px" },
                ],

                dataBound: function () {
                    var rows = this.items();
                    var data = this._data;
                    $(rows).each(function () {
                        var index = $(this).index();
                        var rowLabel = $(this).find(".treatAsUrban");
                        if (data[index].TreatAsUrban == "true")
                            $(rowLabel).html("Yes");
                        else
                            $(rowLabel).html("No");
                    });
                }
            });
        }
    }




    function multipleKhasraGrid2() {
        if (challan.propertyInfo2 != null && challan.propertyInfo2.MultipleKhasras != null) {
            $("#multipleKhasraGrid2").kendoGrid({
                dataSource: {
                    data: challan.propertyInfo2.MultipleKhasras,
                    schema: {
                        model: {
                            fields: {

                                KhasraNo: { type: "string" },
                                LandClassification: { type: "string" },
                                Location: { type: "string" },
                                LandAreaWithUnitString: { type: "string" },
                                KhasraDCRateWithUnitString: { type: "string" },
                                TreatAsUrban: { type: "string" },
                            }
                        }
                    },
                    pageSize: 10
                },

                scrollable: false,
                sortable: false,
                filterable: false,
                pageable: true,
                columns: [
                    { field: "KhasraNo", title: "Khasra No", width: "150px" },
                    { field: "LandClassification", title: "Land Classification", width: "270px" },
                    { field: "Location", title: "Location", width: "400px" },
                    { field: "LandAreaWithUnitString", title: "Land Area", width: "150px" },
                    { field: "KhasraDCRateWithUnitString", title: "DC Rate (Rs.)", width: "250px" },
                    { field: "TreatAsUrban", title: "Is Rating Area", template: "<span class='treatAsUrban'></span>", width: "80px" },
                ],
                dataBound: function () {
                    var rows = this.items();
                    var data = this._data;
                    $(rows).each(function () {
                        var index = $(this).index();
                        var rowLabel = $(this).find(".treatAsUrban");
                        if (data[index].TreatAsUrban == "true")
                            $(rowLabel).html("Yes");
                        else
                            $(rowLabel).html("No");
                    });
                }
            });
        }
    }

    function multipleQilaGrid2() {
        if (challan.propertyInfo2 != null && challan.propertyInfo2.MultipleQilas != null) {
            $("#multipleQilaGrid2").kendoGrid({
                dataSource: {
                    data: challan.propertyInfo2.MultipleQilas,
                    schema: {
                        model: {
                            fields: {
                                QilaNo: { type: "string" },
                                SquareNo: { type: "string" },
                                LandClassification: { type: "string" },
                                Location: { type: "string" },
                                LandAreaWithUnitString: { type: "string" },
                                QilaNoRateString: { type: "string" },
                                TreatAsUrban: { type: "string" },
                            }
                        }
                    },
                    pageSize: 10
                },
                scrollable: false,
                sortable: false,
                filterable: false,
                pageable: true,
                columns: [
                    { field: "QilaNo", title: "Qila No", width: "100px" },
                    { field: "SquareNo", title: "Square No", width: "100px" },
                    { field: "LandClassification", title: "Land Classification", width: "220px" },
                    { field: "Location", title: "Location", width: "400px" },
                    { field: "LandAreaWithUnitString", title: "Land Area", width: "150px" },
                    { field: "QilaNoRateString", title: "DC Rate (Rs.)", width: "250px" },
                    { field: "TreatAsUrban", title: "Is Rating Area", template: "<span class='treatAsUrban'></span>", width: "80px" },
                ],
                dataBound: function () {
                    var rows = this.items();
                    var data = this._data;
                    $(rows).each(function () {
                        var index = $(this).index();
                        var rowLabel = $(this).find(".treatAsUrban");
                        if (data[index].TreatAsUrban == "true")
                            $(rowLabel).html("Yes");
                        else
                            $(rowLabel).html("No");
                    });
                }
            });
        }
    }

    $(document).ready(function () {
        debugger;
        var a = challan;
        if (challan.FlDropdownDC =="Number of Floors") {
            challan.FlDropdownDC ="";
        }
        else {
            document.getElementById("FloorDCScreenText").innerHTML = "-";
        }

        if (challan.BasementsDropdownDC == "Number of Basements") {
            challan.BasementsDropdownDC = "";
        }

       // $('.ServiceChargesClass').hide();
        if (challan.propertyInfo != null) {
            if (challan.propertyInfo.LandClassificationString == "Select Land Classification") {
                challan.propertyInfo.LandClassificationString = "";
            }
        }

        
        //$('#DCValuationRelated').hide();
        $('#totalStampDutyCalAmountPayableDiv').hide();
        $('#govtPropertydiv2').hide();
        $('#govtPropertyTextdiv2').hide();
        $('#constructedAreadiv2').hide();
        $('#constructedAreaTextdiv2').hide();
        
        $('#govtPropertydiv').hide();
        $('#govtPropertyTextdiv').hide();


        $('#townDCScreenText2').hide();
        $('#floorDCScreenText2').hide();

        $('#townFloorDCValueLabel2').hide();
        $('#locationUrbanDCScreenText2').hide();
        $('#locationUrbanDCValueLabel2').hide();

        

        showDivsForAdhesiveStamps();
        showDivsForStampVendor();
        showDivsForCopyingFee();
        showDivsForWhitePaperChallan();
        //if (lang == "ur")
        //{

        //    $("#TotalPayableTaxAmountLabelId").css("direction", "rtl");
        //    $("#AmountOfDutyCalLabel").css("direction", "rtl");
        //    $("#amountLabelinDeedDetails").css("direction", "rtl");
        //    $("#AmountOfDutyCalLabel").css("direction", "rtl");
        //    $("#AmountOfDutyCalLabel").css("direction", "rtl");
            
        //}
        $("#AdhesivechallanDiv").hide();
        $('#StampVendorChallanDiv').hide();
        $('#CopyingFeechallanDiv').hide();
        $('#WhitePaperchallanDiv').hide();
        

        if (fullViewMode == false)
        {
            debugger;
            // hide Party contact columns
            $("#data").kendoGrid({
                dataSource: {
                    data: challan.Party2,
                    schema: {
                        model: {
                            fields: {
                                NameString: { type: "string" },
                                PersonCnic: { type: "string" },
                                NTN: { type: "string" },
                                PersonAddress: { type: "string" },
                                PersonEmail: { type: "string" },
                                PersonPhone: { type: "string" }
                            }
                        }
                    },
                    pageSize: 60
                },

                scrollable: false,
                sortable: false,
                filterable: false,
                pageable: false,
                columns: [
                    { field: "NameString", title: Name, width: "375px" },
                    { field: "PersonCnic", title: CNIC, width: "375px" },
                    { field: "NTN", title: "NTN", width: "250px" },
                    //{ field: "PersonPhone", title: "Contact", width: "250px" },
                    {
                        command: {
                            text: "",
                            imageClass: "fa fa-eye",
                            name: "details",
                            className: "view-btn-center-adjustment",
                            click: sellerDetails
                        }, title: " ", width: "50px"
                    }
                ]
            });
        }
        else
        {
            if (challan.TransactionName == "83") {
                $("#data").kendoGrid({
                    dataSource: {
                        data: challan.Party2,
                        schema: {
                            model: {
                                fields: {
                                    NameString: { type: "string" },
                                    NTN: { type: "string" },
                                    PersonPhone: { type: "string" }
                                }
                            }
                        },
                        pageSize: 60
                    },

                    scrollable: false,
                    sortable: false,
                    filterable: false,
                    pageable: false,
                    columns: [
                        { field: "NameString", title: Name, width: "250px" },
                        { field: "NTN", title: "NTN", width: "250px" },
                        { field: "PersonPhone", title: Contact, width: "250px" },
                        {
                            command: {
                                text: "",
                                imageClass: "fa fa-eye",
                                name: "details",
                                className: "view-btn-center-adjustment",
                                click: sellerDetailsForFrankingMachine
                            }, title: " ", width: "50px"
                        }
                    ]
                });
            } else {
                $("#data").kendoGrid({
                    dataSource: {
                        data: challan.Party2,
                        schema: {
                            model: {
                                fields: {
                                    NameString: { type: "string" },
                                    PersonCnic: { type: "string" },
                                    NTN: { type: "string" },
                                    PersonAddress: { type: "string" },
                                    PersonEmail: { type: "string" },
                                    PersonPhone: { type: "string" }
                                }
                            }
                        },
                        pageSize: 60
                    },

                    scrollable: false,
                    sortable: false,
                    filterable: false,
                    pageable: false,
                    columns: [
                        { field: "NameString", title: Name, width: "250px" },
                        { field: "PersonCnic", title: CNIC, width: "250px" },
                        { field: "NTN", title: "NTN", width: "250px" },
                        { field: "PersonPhone", title: Contact, width: "250px" },
                        {
                            command: {
                                text: "",
                                imageClass: "fa fa-eye",
                                name: "details",
                                className: "view-btn-center-adjustment",
                                click: sellerDetails
                            }, title: " ", width: "50px"
                        }
                    ]
                });
            }
            
        }

        // Show Stamp Grid
        stampGrid();

        // Show CVT and Reg Fee Grid
        stampCVTRegFeeInfoGrid();
        if (challan.TransactionName == "83") {
            document.getElementById("sellerHeading").innerHTML = "Company";
            //document.getElementById("sellerNTNText").innerHTML = challan.Party2.PersonCnic;
            //document.getElementById("sellerCNICText").innerHTML = "-";
            $('#purchasersdiv').hide();
        }
        
    });

    /*-------------------------------------------------------------------------------------*/
    function _handleAllRatesAppliedDelete(event) {
        if (!(kWindow2.element.is(":visible"))) {
            var grid = $('#allRatesAppliedGrid').data('kendoGrid');
            dataitem = grid.dataItem($(event.currentTarget).closest("tr"));
            kWindow2.open().center();
        }
    };
    function purchaserDetails(d) {
      
        var grid = $('#purchasersData').data("kendoGrid");
        d.preventDefault();
        var dataItem = this.dataItem($(d.currentTarget).closest("tr"));
      //  fullViewMode = true; 
        document.getElementById("purchaserNameText").innerHTML = dataItem.NameString;
        //document.getElementById("purchaserCNICText").innerHTML = dataItem.PersonCnic;
        if (dataItem.IsOverseas == true) {
            $("#PassportLabelPurchaser").show();
            $("#purchaserPassportText").show();
            document.getElementById("purchaserPassportText").innerHTML = dataItem.PersonPassport;
            $("#NTNLabelPurchaser").hide();
            $("#purchaserNTNText").hide();
            $("#CNINLabbelPurchaser").hide();
            $("#purchaserCNICText").hide();
        }
        else {
            if (dataItem.PersonCnic == '--' && dataItem.IsOverseas != true) {
                $("#CNINLabbelPurchaser").hide();
                $("#purchaserCNICText").hide();

                $("#NTNLabelPurchaser").show();
                $("#purchaserNTNText").show();

                document.getElementById("purchaserNTNText").innerHTML = dataItem.NTN;

            }
            else {
                $("#CNINLabbelPurchaser").show();
                $("#purchaserCNICText").show();
                $("#NTNLabelPurchaser").hide();
                $("#purchaserNTNText").hide();
                document.getElementById("purchaserCNICText").innerHTML = dataItem.PersonCnic;
            }
        }
        
        if (dataItem.PersonPhone == null || dataItem.PersonPhone == "") {
            document.getElementById("purchaserContactText_new").innerHTML = "--";
        } else {
            document.getElementById("purchaserContactText_new").innerHTML = dataItem.PersonPhone;
        }
        //document.getElementById("purchaserContactText").innerHTML = dataItem.PersonPhone;
        document.getElementById("purchaserAddressText_new").innerHTML = dataItem.PersonAddress;
        if (dataItem.PersonEmail == null || dataItem.PersonEmail == "") {
            $('#party1email').hide();
        } else {
            document.getElementById("purchaserEmailText").innerHTML = dataItem.PersonEmail;
        }
        if (dataItem.IsPrimary == null || dataItem.IsPrimary == "") {
            document.getElementById("purchaserPrimaryText").innerHTML = "No";
        } else {
            document.getElementById("purchaserPrimaryText").innerHTML = "Yes";
        }
        if (dataItem.IsThroughPowerOfAttorney == null || dataItem.IsThroughPowerOfAttorney == "") {
            document.getElementById("purchaserThroughAttorneyText").innerHTML = "No";
        } else {
            document.getElementById("purchaserThroughAttorneyText").innerHTML = "Yes";

            $("#AtorenyDetailTitleDivPurchaser").show();
            $("#AtorenyDetailTextDivPurchaser").show();
            document.getElementById("purchaserAttorneyProviderNameTextPurchaser").innerHTML = dataItem.PersonNameAttorneyProvider;
            document.getElementById("purchaserAttorneyProviderCnicTextPurchaser").innerHTML = dataItem.PersonCnincPassportAttorneyProvider;

        }

        if (fullViewMode == false) {
            $('#divParty1ContactInfoLabel').hide();
            $('#divParty1ContactInfoValue').hide();
            $('#party1email').hide();
        }

        $("#purchaserDetailedWindow").data("kendoWindow").title(Party1Label).center().open();
        
    }

    $(document).ready(function () {

        if (fullViewMode == false) {
            // hide Party contact columns
            $("#purchasersData").kendoGrid({
                dataSource: {
                    data: challan.Party1,
                    schema: {
                        model: {
                            fields: {
                                NameString: { type: "string" },
                                PersonCnic: { type: "string" },
                                NTN: { type: "string" },
                                PersonAddress: { type: "string" },
                                PersonEmail: { type: "string" },
                                PersonPhone: { type: "string" }
                            }
                        }
                    },
                    pageSize: 60
                },

                scrollable: false,
                sortable: false,
                filterable: false,
                pageable: false,
                columns: [
                    { field: "NameString", title: Name, width: "375px" },
                    { field: "PersonCnic", title: CNIC, width: "375px" },
                    { field: "NTN", title: "NTN", width: "250px" },
                    //{ field: "PersonPhone", title: "Contact", width: "250px" },
                    {
                        command: {
                            text: "",
                            imageClass: "fa fa-eye",
                            className: "view-btn-center-adjustment",
                            name: "details",
                            click: purchaserDetails
                        }, title: " ", width: "50px"
                    }
                ]
            });
        }
        else
        {
            $("#purchasersData").kendoGrid({
                dataSource: {
                    data: challan.Party1,
                    schema: {
                        model: {
                            fields: {
                                NameString: { type: "string" },
                                PersonCnic: { type: "string" },
                                NTN: { type: "string" },
                                PersonAddress: { type: "string" },
                                PersonEmail: { type: "string" },
                                PersonPhone: { type: "string" }
                            }
                        }
                    },
                    pageSize: 60
                },

                scrollable: false,
                sortable: false,
                filterable: false,
                pageable: false,
                columns: [
                    { field: "NameString", title: Name, width: "250px" },
                    { field: "PersonCnic", title: CNIC, width: "250px" },
                    { field: "NTN", title: "NTN", width: "250px" },
                    { field: "PersonPhone", title: Contact, width: "250px" },
                    {
                        command: {
                            text: "",
                            imageClass: "fa fa-eye",
                            className: "view-btn-center-adjustment",
                            name: "details",
                            click: purchaserDetails
                        }, title: " ", width: "50px"
                    }
                ]
            });
        }
    });



    if (challan.AgentEmail == null || challan.AgentEmail == "") {
        $('#agentEmailLabel').hide();
        $('#agentEmailText').hide();
    }
    else {
        $('#agentEmailLabel').show();
        $('#agentEmailText').show();
    }

    /*-------------------------------------------------------------------------------------*/

    /*DEED DETAILS*/
    var highestAmount = challan.TotalAmount; 

    if (challan.propertyInfo != null && challan.propertyInfo.IsLandAndConstructed) {

        // Calculate Structure DC Value
        var StructureValueDC = 0;
        //if (!isNaN(challan.propertyInfo.DCRateSqftString) && challan.propertyInfo.DCRateSqftString != "" && challan.propertyInfo.DCRateSqftString != null && !isNaN(challan.propertyInfo.ConstructedAreaInSqFeet) && challan.propertyInfo.ConstructedAreaInSqFeet != "") {

        //    StructureValueDC = parseFloat(challan.propertyInfo.DCRateSqftString) * parseFloat(challan.propertyInfo.ConstructedAreaInSqFeet);
        //}

        StructureValueDC = challan.propertyInfo.ConstructedStructureValue;
        var propConStrucValue = 0;
        // User provided Structure Value
        if (challan.lstTaxAmountValue != null && challan.lstTaxAmountValue.length > 1) {
            propConStrucValue = challan.lstTaxAmountValue[1].AmountValue + '';
            propConStrucValue = propConStrucValue.replace(/,/g, "");
        }
        // Pick the highest.
        var highestCSValue = Math.max(StructureValueDC, propConStrucValue);


        if (!challan.isMultiplePropertiesExchageOfProperty) {
            if (challan.propertyInfo2 != null && challan.lstTaxAmountValue > 5) {

                // For Exchange of Property case
                highestAmount = Math.max(challan.propertyInfo.DeclaredAmount, challan.propertyInfo2.DeclaredAmount);
                // Convert DC Rate and Cons to string value. from DB it is coming as num and from Challan Generation it is coming as string
                var propDCRate = challan.propertyInfo.FinalRate + '';
                propDCRate = propDCRate.replace(/,/g, "");
                //var propConStrucValue = challan.propertyInfo.ConstructedStructureValue + '';
                //propConStrucValue = propConStrucValue.replace(/,/g, "");

                // For Exchange of Properties case
                var strFinal = parseFloat(propDCRate) + parseFloat(highestCSValue) + '';
                if (parseFloat(highestAmount) < parseFloat(strFinal.replace(/,/g, ""))) {
                    highestAmount = parseFloat(strFinal.replace(/,/g, ""));
                }

                propDCRate = challan.propertyInfo2.FinalRate + '';
                propDCRate = propDCRate.replace(/,/g, "");
                propConStrucValue = challan.lstTaxAmountValue[4].AmountValue + '';
                propConStrucValue = propConStrucValue.replace(/,/g, "");
                StructureValueDC = challan.propertyInfo2.ConstructedStructureValue;

                highestCSValue = Math.max(StructureValueDC, propConStrucValue);

                strFinal = parseFloat(propDCRate) + parseFloat(highestCSValue) + '';
                if (parseFloat(highestAmount) < parseFloat(strFinal.replace(/,/g, ""))) {
                    highestAmount = parseFloat(strFinal.replace(/,/g, ""));
                }

            }

            else if (challan.ActualDCValue) {

                // For all deeds where DC Value is true in database.

                highestAmount = challan.propertyInfo.DeclaredAmount; // Sub User Provided bcz it is added in Declared Amount Already.
                // Convert DC Rate and Cons to string value. from DB it is coming as num and from Challan Generation it is coming as string
                var propDCRate = challan.propertyInfo.FinalRate + '';
                propDCRate = propDCRate.replace(/,/g, "");
                //var propConStrucValue = challan.propertyInfo.ConstructedStructureValue + '';
                //propConStrucValue = propConStrucValue.replace(/,/g, "");

                var strFinal = parseFloat(propDCRate)+ '';  // + parseFloat(highestCSValue) 
                if (parseFloat(highestAmount) < parseFloat(strFinal.replace(/,/g, ""))) {
                    highestAmount = parseFloat(strFinal.replace(/,/g, ""));
                }
            }
        }

    }
    
    debugger;
    if (challan.propertyInfo != null && challan.propertyInfo.DeclaredAmount > 0 ) {
        document.getElementById("totalAmountTextinDeedDetails").innerHTML = returnCommas(challan.propertyInfo.DeclaredAmount);//(challan.TotalAmount);
        if (challan.TransactionName == exchangeOfPropertyDeedID) {
            document.getElementById("totalStampDutyCalAmountPayableText").innerHTML = formatAmount(challan.TotalAmount);
            document.getElementById("totalAmountTextinDeedDetails").innerHTML = formatAmount(challan.TotalAmount);
        }
    } else {
        $("#AmountOfDutyCalLabel").hide();
        $("#AmountDutiesCalc").hide();
       // alert("Duty Calculations" + AmountDutiesCalc); 
        document.getElementById("totalAmountTextinDeedDetails").innerHTML = returnCommas(AmountDutiesCalc);//challan.TotalAmount;
    }
    if (challan.isHousingSocietyInvolved) {
        document.getElementById("isHousingSocietyInvolvedText").innerHTML = "Yes";
    }
    else {
        document.getElementById("isHousingSocietyInvolvedText").innerHTML = "No";
    }
    document.getElementById("deedNameText").innerHTML = challan.TransactionNameString;
    document.getElementById("stampPaperTypeText").innerHTML = challan.TransactionTypeString;

    document.getElementById("stampDutyPaidByText").innerHTML = challan.ChallanAmountPaidByString;

    queryStringName = getUrlVars()["name"]; //console.log(queryStringName);
    //if (queryStringName == "reprintchallan") {
    //    if (challan.TransactionTypeString == "Judicial") {
    //        if (challan.ChallanAmountPaidByString == "First Party") {
    //            document.getElementById("stampDutyPaidByText").innerHTML = "Plaintiff / Appellant / Petitioner";
    //        }
    //        else {
    //            document.getElementById("stampDutyPaidByText").innerHTML = "Defendant / Respondent";
    //        }
    //    }
    //}

    //if (id == "GenerateNewChallan") {
    //    document.getElementById("stampDutyPaidByText").innerHTML = challan.StampDutyPaidBy;
    //} else {
    //    document.getElementById("stampDutyPaidByText").innerHTML = challan.ChallanAmountPaidByString;//challan.StampDutyPaidBy;
    //}

    /*-------------------------------------------------------------------------------------*/

    //if (challan.AgentEmail == null) {
    //    $('#agentEmaildiv').hide();
    //}

    if (challan.TransactionTypeString == "Judicial") {
        $('#isHousingSocietyInvolvedLabel').hide();
        $('#isHousingSocietyInvolvedText').hide();
        $('#amountLabelinDeedDetails').hide();
        $('#totalAmountTextinDeedDetails').hide();
        //document.getElementById("amountLabel").innerHTML = "Total Amount of Consideration";
        $('#taxdiv').hide();
        /*if (challan.TotalAmount > 0) {
            $('#amountLabelinDeedDetails').text('Court Fee');
            $('#amountLabelinDeedDetails').show();
        }
        */
    } else {
        if (challan.stampModel != null && challan.IsPLRAFee != true) {
            $('#taxdiv').hide();
        }
        else {
            $('#taxdiv').show();
        }

        //document.getElementById("amountLabel").innerHTML = challan.AmountLabelText + ":";
        if (challan.TotalAmount > 0) {
            $('#amountLabelinDeedDetails').show();

            if (challan.TransactionName == GiftDeedId) {
                $('#isHousingSocietyInvolvedLabel').hide();
                $('#isHousingSocietyInvolvedText').hide();
            }
            else
            {
                $('#isHousingSocietyInvolvedLabel').hide();
                $('#isHousingSocietyInvolvedText').hide();
            }
            //$('#amountLabel').show();
            $('#totalAmountTextinDeedDetails').show();
            
            //$('#totalAmountText').show();
            //document.getElementById("amountLabelinDeedDetails").innerHTML = challan.AmountLabelText + ":";

            var propertyValue = 0;

            if (challan.propertyInfo != null && challan.propertyInfo.FinalRate != null && challan.propertyInfo.FinalRate != 0 && challan.TransactionName != 87) {
                var finalRate = challan.propertyInfo.FinalRate;

                finalRate = returnCommas(finalRate);

                finalRate = finalRate.replace(/,/g, "");

                if (challan.propertyInfo.FinalRate != null) {

                    finalrate = parseFloat(finalRate);
                    var amount = parseFloat(challan.propertyInfo.ValuationAmount);

                    if (amount > finalRate) {
                        propertyValue = amount;
                    }
                    else {
                        propertyValue = finalRate;
                    }
                }
            }
            else {
                propertyValue = parseFloat(challan.TotalAmount);
            }

            //document.getElementById("totalAmountText").innerHTML = returnCommas(propertyValue);
            //document.getElementById("totalAmountText").innerHTML = returnCommas(challan.propertyInfo.ValuationAmount);
        }
        else {
            $('#amountLabelinDeedDetails').hide();

            
                $('#isHousingSocietyInvolvedLabel').hide();
                $('#isHousingSocietyInvolvedText').hide();
            
            //$('#amountLabel').hide();
            $('#totalAmountTextinDeedDetails').hide();
           
            //$('#totalAmountText').hide();
        }
        
        //if (id == "GenerateNewChallan") {
        //    document.getElementById("amountLabel").innerHTML = TotalAmountLabel;
        //} else {
        //    document.getElementById("amountLabel").innerHTML = challan.AmountLabelText;
        //}
    }


    if (challan.InfoRetrievedByStamp != null && challan.InfoRetrievedByStamp == true
        && challan.stampModel != null && challan.stampModel.StampNumber != null)
    {
        $('#stampdiv').show();
        
        document.getElementById("stampNumberText").innerHTML = challan.stampModel.StampNumber;
        document.getElementById("stampStatus").innerHTML = challan.stampModel.StatusString;
        document.getElementById("totalStampAmount").innerHTML = formatAmount(challan.stampModel.ConsolidatedStampAmount); // make comma separated
        document.getElementById("totalStampPages").innerHTML = challan.stampModel.ConsolidatedNumberOfPages;

        if (challan.stampModel.refundAppDate != null) {
            $('#refundAppLables').show();
            $('#refundAppValues').show();
            document.getElementById("refundAppDate").innerHTML = challan.stampModel.refundAppDate;            
        }
        if (challan.stampModel.refundAppNumber != null) {
            $('#refundAppLables').show();
            $('#refundAppValues').show();
            document.getElementById("refundAppNumber2").innerHTML = challan.stampModel.refundAppNumber;
        }
        if (challan.stampModel.refundCaseNumber != null) {
            $('#refundAppCaseLable').show();
            $('#refundAppCaseValue').show();
            document.getElementById("refundCaseNo").innerHTML = challan.stampModel.refundCaseNumber;
        } else {
            $('#refundAppCaseLable').hide();
            $('#refundAppCaseValue').hide();
        }
        if (challan.stampModel.IsVerifiedByTO == "YES")
        {
            $("#TOVerificationdiv").show();
            document.getElementById("stampVerifiedByTO").innerHTML = "Yes";
        }
        else
        {
            $("#TOVerificationdiv").hide();
        }
        if (challan.DeedInfo != null && (challan.stampModel.LstCVTRegFeeInfo != null && challan.stampModel.LstCVTRegFeeInfo.length > 0))
        {
            debugger;
            
            //  if (challan.DeedInfo.isCVT == true || challan.DeedInfo.isRegistration == true || (challan.stampModel.LstCVTRegFeeInfo != null && challan.stampModel.LstCVTRegFeeInfo.length > 0))
            if (challan.DeedInfo.isCVT == true || challan.DeedInfo.isRegistration == true)
            {
                //Show CVT section in Stamp section
                $('#stampCVTRegFeeInfoDiv').show();
            }
            else
            {
                //Hide CVT section in Stamp section
                $('#stampCVTRegFeeInfoDiv').hide();
            }
        }
        else
        {
            //Hide CVT section in Stamp section
            $('#stampCVTRegFeeInfoDiv').hide();            
        }
    }
    else
    {
        $('#stampdiv').hide();
    }

    if (challan.InfoRetrievedByStamp != null)
    {
        if (challan.InfoRetrievedByStamp == false)
        {
            
            $('#challanDiv').show();           
            document.getElementById("challanNumberText").innerHTML = challan.ChallanNumber;
            if (challan.stampModel != null && challan.stampModel.LstStampInfo[0].StampNumber != null) {
                $("#chStampNumber").show();
                document.getElementById("stamp_number").innerHTML = challan.stampModel.LstStampInfo[0].StampNumber;

            }
            else {
                $("#chStampNumber").hide();
            }
            document.getElementById("challanStatus").innerHTML = challan.ChallanStatus;           
            if (challan.IsVerifiedByTO == "YES")
            {
                $("#chTOVerified").show();
                document.getElementById("isChallanVerifiedByTO").innerHTML = "Yes";
            }
            else
            {
                $("#chTOVerified").hide();
            }
          
            if (challan.ChallandDutyStatuses != null && challan.ChallandDutyStatuses.LstDutyStatusModel.length != 0) {
                
                for (var index = 0; index < challan.ChallandDutyStatuses.LstDutyStatusModel.length; index++) {
                    if (challan.ChallandDutyStatuses.LstDutyStatusModel[index].Duty == "Stamp")
                    {
                        challan.ChallandDutyStatuses.LstDutyStatus[index].Duty = "Stamp Duty";
                        break;
                    }
                }
                //var newLstDutyStatus = [];
                    //var d;
                    //if (challan.ChallandDutyStatuses.LstDutyStatus[index].Value == refundInitiated || challan.ChallandDutyStatuses.LstDutyStatus[index].Value == refundCancelled || challan.ChallandDutyStatuses.LstDutyStatus[index].Value == refundCompleted) {
                    //    d = {
                    //        Key: challan.ChallandDutyStatuses.LstDutyStatus[index].Key == "Stamp" ? "Stamp Duty" : challan.ChallandDutyStatuses.LstDutyStatus[index].Key,
                    //        Value: challan.ChallandDutyStatuses.LstDutyStatus[index].Value
                    //    }
                    //    newLstDutyStatus.push(d);
                    //}
                    //else
                    //{
                    //    d = { Key: challan.ChallandDutyStatuses.LstDutyStatus[index].Key == "Stamp" ? "Stamp Duty" : challan.ChallandDutyStatuses.LstDutyStatus[index].Key, Value: "-" }
                    //    newLstDutyStatus.push(d);
                    //}

                $('#chStatusPair2').hide();
                $('#chStatusPair').show();
                $('#refundDutiesLablel').show();
                $('#challanStatusGrid').show();
                $("#challanStatusGrid").kendoGrid({
                    dataSource: {
                        data: challan.ChallandDutyStatuses.LstDutyStatusModel,
                        schema: {
                            model: {
                                fields: {
                                    Duty: { type: "string" },
                                    Status: { type: "string" },
                                    RefundAppNumber: { type: "string" },
                                    RefundAppDate:{type:"string"}
                                }
                            }
                        },
                    },

                    scrollable: false,
                    sortable: false,
                    filterable: false,
                    pageable: false,
                    columns: [
                        { field: "Duty", title: Duty, width: "100px" },
                        { field: "Status", title: Status, width: "100px" },
                        { field: "RefundAppNumber", title: ApplicationNumber, width: "150px" },
                        { field: "RefundAppDate", title: ApplicationDate, width: "150px" }
                    ]

                });

            }
            else
            {
                $('#challanStatusGrid').hide();
                $('#refundDutiesLablel').hide();
                $('#chStatusPair2').show();
                document.getElementById("challanStatus2").innerHTML = challan.ChallanStatus;
                $('#chStatusPair').hide();
            }
        }
        else
        {
            $('#challanDiv').hide();
        }
    }
    else
    {
        $('#challanDiv').hide();
    }
   ////alert('Once11')
    debugger;
    if (challan.propertyInfo != null) {
        
        $('#constructedStructureDiv').hide();
        $('#squareNoUrbanHierarchyDivViewChallan').hide();
      //  $('#IrrigationModeDiv').hide();
      //  $('#IrrigationModeTextDCScreen').hide();
        $("#propertyAreaLabel").hide();
      //  $("#DehLabel").hide();
        //  $("#IrrigationLabel").hide();
        $("#DehModeofIrrigationValueLabel").hide();
        $("#DehModeofIrrigationDCValueText").hide();
        //alert("testingIrrigationModeDeh"); 
        if (challan.DCValuationType == true && challan.isOldRegistryChallan != true && challan.ChallanType != "Deficient")
        {
            debugger; 
            if (!challan.propertyInfo.isUrban) {
                $("#TalukaLandTypeDivLabel").show();
                $("#TalukaLandTypeDiv").show();
                $("#PropertyAreaLandClassificationDCValueLabel").hide();
                $("#PropertyAreaLandClassificationDCValueText").hide();

                $("#DehModeofIrrigationValueLabel").show();
                $("#DehModeofIrrigationDCValueText").show();

                //if (challan.propertyInfo.DistrictId != 1 || challan.propertyInfo.DistrictId != 2 || challan.propertyInfo.DistrictId == 18) {
                 
                //    $("#DehLabel").hide();
                //    $("#PropertyAreaDCScreenText").hide();
                //    $("#IrrigationLabel").show();
                //}

                //if (challan.propertyInfo.DistrictId == 1) {
                //    $("#DehLabel").show();
                //    $("#PropertyAreaDCScreenText").show();
                //    $("#IrrigationLabel").hide();
                //    $("#IrrigationModeText").hide();
                //}
                //else if (challan.propertyInfo.DistrictId == 2 || challan.propertyInfo.DistrictId == 18) {

                //    $("#DehLabel").show();
                //    $("#PropertyAreaDCScreenText").show();
                //    $("#IrrigationLabel").show();
                //    $("#IrrigationModeText").show();

                //}


                //else {

                //    $("#DehLabel").hide();
                //    $("#PropertyAreaDCScreenText").hide();
                //    $("#IrrigationLabel").hide();
                //    $("#IrrigationModeText").hide();
                //}
            } else {
                $("#propertyAreaLabel").show();
                $("#PropertyAreaLandClassificationDCValueLabel").show();
                $("#PropertyAreaLandClassificationDCValueText").show();
              
            }
          // alert('Once')
            debugger;
            // DC valuation section for first property would be shown here
            $('#DCValuationMainDIV').show();

            if (challan.TransactionName == exchangeOfPropertyDeedID) {
                document.getElementById("DCValuationHeadingFirstProperty").innerHTML = DCValuationFP;
            }
            else {
                document.getElementById("DCValuationHeadingFirstProperty").innerHTML = DCValuation;
            }
        
            //document.getElementById("LandClassificationDCValue").innerHTML = challan.propertyInfo.LandClassificationString;

            if (challan.propertyInfo.IsKhasraAvailable) {
                if (challan.propertyInfo.KhasraUrbanNo != null && challan.propertyInfo.KhasraUrbanNo != null) {
                    $('#khasraUrbanDivViewChallan').show();
                    document.getElementById("khasraUrbanNumber").innerHTML = challan.propertyInfo.KhasraUrbanNo;
                }
                else {
                    $('#khasraUrbanDivViewChallan').hide();
                }
            }
            else {
                $('#khasraUrbanDivViewChallan').hide();
            }

          
            $("#khasraDiv").hide();
            //if (challan.propertyInfo.isUrban || challan.propertyInfo.treatAsUrban == true) {
            //    $("#applyCVTForSingleDiv").show();
            //    document.getElementById("applyCVTForSingleValue").innerHTML = "Yes";
            //}
            //else {
            //    $("#applyCVTForSingleDiv").show();
            //    document.getElementById("applyCVTForSingleValue").innerHTML = "No";
            //}
            $("#applyCVTForSingleDiv").hide();
            
            ////alert('suno')
            debugger;
            if (challan.propertyInfo.DistrictString != null && challan.propertyInfo.DistrictString != "") {
                document.getElementById("districtDCScreenText").innerHTML = challan.propertyInfo.DistrictString;
            }
            else {
                document.getElementById("districtDCScreenText").innerHTML = "-";
            }
            if (challan.propertyInfo.TehsilString != null && challan.propertyInfo.TehsilString != "") {
                document.getElementById("tehsilDCScreenText").innerHTML = challan.propertyInfo.TehsilString;
            }
            else {
                document.getElementById("tehsilDCScreenText").innerHTML = "-";
            }


            if (challan.propertyInfo.LandClassificationString != null && challan.propertyInfo.LandClassificationString != "") {
                document.getElementById("LandClassificationDCScreenText").innerHTML = challan.propertyInfo.LandClassificationString;
            }
            else {
                document.getElementById("LandClassificationDCScreenText").innerHTML = "-";
            }
            
            
            if (challan.propertyInfo.PropertyAreaString != null && challan.propertyInfo.PropertyAreaString != "") {
                document.getElementById("PropertyAreaDCScreenText").innerHTML = challan.propertyInfo.PropertyAreaString;
            }
            else {
             document.getElementById("PropertyAreaDCScreenText").innerHTML = "-";
            }

            if (challan.propertyInfo.IrrigationMode != null && challan.propertyInfo.IrrigationMode != "") {
                document.getElementById("IrrigationModeText").innerHTML = challan.propertyInfo.IrrigationMode;
            }
            else {
                document.getElementById("IrrigationModeText").innerHTML = "-";
            }

            if (challan.propertyInfo.PropertyAreaString != null && challan.propertyInfo.PropertyAreaString != "" && challan.propertyInfo.PropertyAreaString != "Select Deh ") {
                document.getElementById("DehDCScreenText").innerHTML = challan.propertyInfo.PropertyAreaString;
            }
            else {
                document.getElementById("DehDCScreenText").innerHTML = "-";
            }
            if (challan.propertyInfo.TalukaLandType != null && challan.propertyInfo.TalukaLandType != "") {
                document.getElementById("TalukaLandypeText").innerHTML = challan.propertyInfo.TalukaLandType;
            }
            else {
                document.getElementById("TalukaLandypeText").innerHTML = "-";
            }
            
            if (challan.propertyInfo.Area != null && challan.propertyInfo.Area != "") {
               // //alert('Values15')
                debugger;
                if (challan.propertyInfo.ConstructedAreaInSqFeet == "" || challan.propertyInfo.Area!="") {
                    document.getElementById("LandAreaSqftDCValue").innerHTML = challan.propertyInfo.Area;
                }
                else {
                    document.getElementById("LandAreaSqftDCValue").innerHTML = "-";
                }
                
            }
            else {
                

                document.getElementById("LandAreaSqftDCValue").innerHTML = "-";
                
            }

            if (!challan.propertyInfo.isUrban) {
                if (challan.landAreaAddedForRural != "" && challan.landAreaAddedForRural != "undefined" && challan.landAreaAddedForRural != undefined) {
                    document.getElementById("LandAreaSqftDCValue").innerHTML = challan.landAreaAddedForRural;
                }
                
            }
            ////alert('yes');
            debugger;
            if (challan.propertyInfo.ConstructedAreaInSqFeet != null && challan.propertyInfo.ConstructedAreaInSqFeet != "") {
                document.getElementById("LandAreaDCScreenText").innerHTML = challan.propertyInfo.ConstructedAreaInSqFeet;
            }
            else {
                if (challan.CoveredAreaQuantity != null && challan.CoveredAreaQuantity != "") {
                    document.getElementById("LandAreaDCScreenText").innerHTML = challan.CoveredAreaQuantity;

                }
                else {
                    document.getElementById("LandAreaDCScreenText").innerHTML = "-";
                }
            }

            if (StrucutureValueUserProvided != null && StrucutureValueUserProvided != "") {
                   document.getElementById("ConstructedStructurUserProvidedDCScreenText").innerHTML = returnCommas(StrucutureValueUserProvided);
               // document.getElementById("ConstructedStructurUserProvidedDCScreenText").innerHTML = returnCommas(challan.propertyInfo.ConstructedStructureValue);
            }
            else {
                document.getElementById("ConstructedStructurUserProvidedDCScreenText").innerHTML = "-";
            }
            if (challan.propertyInfo.FLOOR_ID != null && challan.propertyInfo.FLOOR_ID != "" && challan.propertyInfo.multipleKhasrasSelected != true) {
                //alert("Multple Land Claasification " + challan.MultipleLandClassification); 
                document.getElementById("FloorDCScreenText").innerHTML = challan.propertyInfo.FLOOR_ID;
                challan.propertyInfo.FlDropdownDC = challan.propertyInfo.FLOOR_ID;
            }
            else if (challan.FlDropdownDC != null && challan.FlDropdownDC != "") {
               
                document.getElementById("FloorDCScreenText").innerHTML = challan.FlDropdownDC;
                challan.propertyInfo.FlDropdownDC = challan.FlDropdownDC;
            }
            else {
                document.getElementById("FloorDCScreenText").innerHTML = "-";
            }
            
           
              
               
           
            if (challan.propertyInfo.BASEMENT_ID != null && challan.propertyInfo.BASEMENT_ID != "") {
                document.getElementById("BasementDCScreenText").innerHTML = challan.propertyInfo.BASEMENT_ID;
                challan.propertyInfo.BasementsDropdownDC = challan.propertyInfo.BASEMENT_ID;
            }
            else  if (challan.BasementsDropdownDC != null && challan.BasementsDropdownDC != "") {
                document.getElementById("BasementDCScreenText").innerHTML = challan.BasementsDropdownDC;
                challan.propertyInfo.BasementsDropdownDC = challan.BasementsDropdownDC;
            }
            else {
                document.getElementById("BasementDCScreenText").innerHTML = "-";
            }
           
                
               
            
            debugger; 
            if (challan.propertyInfo.AcreValue == "" || challan.propertyInfo.AcreValue == null) {
                $('#AcreScreenText').html("-");
            }
            else {
                $('#AcreScreenText').html(challan.propertyInfo.AcreValue);
            }

            if (challan.propertyInfo.GhuntaValue == "" || challan.propertyInfo.GhuntaValue == null) {
                $('#GhuntasDCScreenText').html("-");
            }
            else {
                $('#GhuntasDCScreenText').html(challan.propertyInfo.GhuntaValue);
            }
            if (challan.propertyInfo.SqrYardValue == "" || challan.propertyInfo.SqrYardValue == null) {
                $('#SqrYardScreenText').html("-");
            }
            else {
                $('#SqrYardScreenText').html(challan.propertyInfo.SqrYardValue);
            }

            if (challan.propertyInfo.LandTypeStampId == "" || challan.propertyInfo.LandTypeStampId == null) {
                $('#LandTypeStampScreenText').html("-");
            }
            else {
                $('#LandTypeStampScreenText').html(challan.propertyInfo.StampDutyTypeString);
            }

            

            if (challan.propertyInfo.isUrban == true) {
                document.getElementById("PropertyTypeValue").innerHTML = Urban;
              //  document.getElementById("QanoongoOrRevenueCircle").innerHTML = RevenueCircle;
              //  document.getElementById("MouzaOrPropertyArea").innerHTML = PropertyArea;
              //  document.getElementById("QanoongoOrRevenueCircleText").innerHTML = challan.propertyInfo.RevenueCircleString;
              //  document.getElementById("MouzaOrPropertyAreaText").innerHTML = challan.propertyInfo.PropertyAreaString;
                $('#LocationLabel').hide();
                $('#LocationDCValue').hide();
                $("#khasraDiv").hide();
                $('#squareNoHierarchyDivViewChallan').hide();
                //newDevChanges
                $('#locationUrbanDCValueLabel').show();
                $('#locationUrbanDCValueText').show();
              //  $('#townFloorDCValueLabel').show();
                //$('#townFloorDCValueText').show();
               
             
                //if (challan.propertyInfo.LocationUrbanString != null && challan.propertyInfo.LocationUrbanString != "") {
                //    document.getElementById("locationUrbanDCScreenText").innerHTML = challan.propertyInfo.LocationUrbanString;
                //}
                //else {
                //    document.getElementById("locationUrbanDCScreenText").innerHTML = "-";
                //}

              
            }

            else {
                document.getElementById("PropertyTypeValue").innerHTML = Rural;
                //document.getElementById("QanoongoOrRevenueCircle").innerHTML = Qanoongoee;
                //document.getElementById("MouzaOrPropertyArea").innerHTML = Mouza;
                //document.getElementById("QanoongoOrRevenueCircleText").innerHTML = challan.propertyInfo.QanoongoeeString;
               // document.getElementById("MouzaOrPropertyAreaText").innerHTML = challan.propertyInfo.MouzaString;
                $('#LocationLabel').show();
                $('#LocationDCValue').show();
               // alert("Line 3031 " + challan.rate_type_agriculture); 
                
                if (challan.rate_type_agriculture != "Survey" ) {

                    $("#mode_of_irrigation").hide();
                    $("#IrrigationModeText").hide();
                    $("#LocationLabel").hide();
                    $("#ProduceIndexUnit").hide();
                    if (challan.rate_type_agriculture == "Unsurvey") {
                        challan.Land_Rate_Type_Agriculture = "Unsurvey"; 
                        $("#produced_index_rate").html("Un-surveyed Land Rate:");
                        document.getElementById("ProduceIndexRate").innerHTML = "Rs. " + returnCommas(challan.propertyInfo.RATE) + " Acre";
                        
                    } else if (challan.rate_type_agriculture == "MuncipalLimits") {
                        $("#produced_index_rate").html("Municipal Limits Land Rate:");
                        challan.Land_Rate_Type_Agriculture = "MuncipalLimits";

                        document.getElementById("ProduceIndexRate").innerHTML = "Rs. " + returnCommas(challan.propertyInfo.RATE) + " Acre";

                    }

                    else if (challan.rate_type_agriculture == "") {
                        $("#div_rural_lbl").hide(); 
                        $("#div_rural_txt").hide();
                    }

                   // alert(challan.propertyInfo.RATE);
                } else {
                    challan.Land_Rate_Type_Agriculture = "Survey";
                    $("#mode_of_irrigation").show();
                    $("#IrrigationModeText").show();
                    $("#LocationLabel").show();
                    $("#ProduceIndexUnit").show();
                   
                        $("#produced_index_rate").html("Produce Index Rate:");
                   
                }
                debugger;
                if (challan.propertyInfo.TehsilId != 1) {
                    $('#IrrigationModeDiv').show();
                    $('#IrrigationModeTextDCScreen').show();
                }
                $('#locationUrbanDCValueLabel').hide();
                $('#locationUrbanDCValueText').hide();
                $('#townFloorDCValueLabel').hide();
                $('#townFloorDCValueText').hide();
                //document.getElementById("LocationDCValue").innerHTML = challan.propertyInfo.LocationString;
            }
            //DCValuation
            //+document.getElementById("LandAreaDCValue").innerHTML = challan.propertyInfo.Area + " " + challan.propertyInfo.rateUnit;
            if (challan.TransactionName == 82 && challan.applyStampDuty == false) {
                document.getElementById("RateDCValue").innerHTML = "-";
                document.getElementById("DCValueFinalText").innerHTML = "-";
            }
            else {
                if (challan.propertyInfo.isUrban) {
                   
                  //  alert('abc' + challan.MultipleLandClassification)
                   // //alert('d')
                    debugger;
                   
                    if (challan.propertyInfo.ConstructedAreaInSqFeet == "" || challan.propertyInfo.Area != "") {
                        
                        if (challan.propertyInfo.Rate == "") {
                            challan.propertyInfo.Rate = challan.propertyInfo.CABINET_RATE;
                        }
                        
                        if (challan.propertyInfo.LAND_RATE != 0 && challan.propertyInfo.LAND_RATE != null && challan.propertyInfo.LAND_RATE != "undefined") {
                           var AreaUnit = challan.propertyInfo.AreaUnit;
                          
                           if (AreaUnit == 'undefined' || AreaUnit == 'null') {
                                AreaUnit = challan.propertyInfo.rateUnit;
                            }

                            if(AreaUnit == 'undefined' || AreaUnit == 'null'){
                               AreaUnit = challan.propertyInfo.LAND_AREA_UNIT;
                            }
                          
                            document.getElementById("RateDCValue").innerHTML = returnCommas(challan.propertyInfo.LAND_RATE) + " per " + AreaUnit;
                        } else {
                            document.getElementById("RateDCValue").innerHTML = "-"; 
                        }
                            //alert(challan.propertyInfo.StructureSqFtRate); 
                        debugger;
                        if (challan.propertyInfo.StructureSqFtRate != "" && 
                            challan.propertyInfo.StructureSqFtRate != "undefined" &&
                            challan.propertyInfo.StructureSqFtRate != undefined && challan.propertyInfo.StructureSqFtRate != 0) {
                            document.getElementById("SqFtRateDCValue").innerHTML = returnCommas(challan.propertyInfo.StructureSqFtRate) + " per " + challan.propertyInfo.StructureSqFtRateUnit
                        }
                        else {
                            document.getElementById("SqFtRateDCValue").innerHTML = "-"
                        }
                        

                        //if (challan.propertyInfo.LAND_RATE != "" && challan.propertyInfo.LAND_RATE != null && challan.propertyInfo.LAND_RATE != 0) {
                        //    document.getElementById("RateDCValue").innerHTML = returnCommas(challan.ValuationRateInds) + " per " + challan.propertyInfo.rateUnit;
                        //}
                        //else {
                          
                        //    document.getElementById("RateDCValue").innerHTML = "-"; 
                        //}

                        //if (challan.propertyInfo.Rate != "" && challan.propertyInfo.Rate != null) {

                        //}
                        //else {
                        //   alert('Values31')
                        //   // //alert('4')
                        //    debugger;
                        //    document.getElementById("SqFtRateDCValue").innerHTML = returnCommas(challan.StructureSqFtRateInds) + " per " + challan.propertyInfo.StructureSqFtRateUnit;

                        //}


                    }
                    else {
                       // //alert('Values511')
                       // //alert('e')
                        debugger;

                        if (challan.StructureSqFtRateInds != null && challan.StructureSqFtRateInds != undefined) {
                            document.getElementById("SqFtRateDCValue").innerHTML = returnCommas(challan.StructureSqFtRateInds) + " per " + challan.propertyInfo.StructureSqFtRateUnit;
                        }
                        else if (challan.propertyInfo.ConstructedArea != "" && challan.propertyInfo.ConstructedArea != null) {
                            document.getElementById("SqFtRateDCValue").innerHTML = returnCommas(challan.propertyInfo.StructureSqFtRate) + " per " + challan.propertyInfo.StructureSqFtRateUnit;
                        }
                        else {
                            document.getElementById("SqFtRateDCValue").innerHTML = "-";
                        }
                       // document.getElementById("RateDCValue").innerHTML = "-";
                        

                    }
                }
               
                else {
                    document.getElementById("RateDCValue").innerHTML = "-";
                    document.getElementById("SqFtRateDCValue").innerHTML = "-";

                }
                ////alert('valueFinal')
                debugger;
               // alert(challan.propertyInfo.LAND_Valuation_Amount);
                if (challan.DCLandValue != "0" && challan.DCLandValue != ""
                    && challan.DCLandValue != "undefined" && challan.DCLandValue!= undefined
                    ) {
                    //alert('checkingValue1 if condition' + challan.DCLandValue);
                    document.getElementById("DCValueFinalText").innerHTML = returnCommas(challan.DCLandValue);

                }
                else if (challan.propertyInfo.LAND_Valuation_Amount != 0 && challan.propertyInfo.LAND_Valuation_Amount != "" && challan.propertyInfo.LAND_Valuation_Amount != undefined) {
                    document.getElementById("DCValueFinalText").innerHTML = returnCommas(challan.propertyInfo.LAND_Valuation_Amount);
                }



                else {
                    //  if (challan.DCLandValue == "undefined" || challan.DCLandValue == undefined && challan.propertyInfo.Area > 0) {
                    //   //    alert('checkingValue2');
                    //       //alert(challan.propertyInfo.Rate);
                    //      // alert(challan.propertyInfo.Area);
                    //       var DC_valu_FinalText = (challan.propertyInfo.Rate) * (challan.propertyInfo.Area);
                    //       document.getElementById("DCValueFinalText").innerHTML = returnCommas(challan.propertyInfo.ValuationAmount);//returnCommas(DC_valu_FinalText); 

                    //}
                    //else {
                    document.getElementById("DCValueFinalText").innerHTML = "-";
                    // }


                }
            }

            if (challan.ActualDCValue) {

            if (challan.MultipleLandClassification == true) {
                //alert(challan.MultipleLandClassification);
                document.getElementById("RateDCValue").innerHTML = returnCommas(challan.propertyInfo.LAND_RATE) + " per Sq. Yard";
                challan.propertyInfo.AreaUnit = "Sq. Yard";
                challan.propertyInfo.StructureSqFtRateUnit = "Sq. Yard";
                document.getElementById("SqFtRateDCValue").innerHTML = returnCommas(challan.propertyInfo.StructureSqFtRate) + "  per Sq. Yard";
            }
                
                $('#propertyValuationDCValuetextLabel').show();
                $('#propertyValuationDCValuetext').show();
                for (i = 0; i < challan.lstTaxAmountValue.length; i++) {
                  //  alert('Values51');
                 //   alert(challan.lstTaxAmountValue[i].AmountValue); 
                  debugger;

                    if (challan.lstTaxAmountValue[i].FieldName == LandValueLabel && challan.lstTaxAmountValue[i].AdditionalInfo == firstProperty) {
                      //  document.getElementById("propertyValuationDCValuetext").innerHTML = returnCommas(challan.lstTaxAmountValue[i].AmountValue);
                       // var landAreaValue
                   // alert('a gya g')
                        debugger;
                        if (challan.StructureValue != null && challan.StructureValue != "0") {

                           // document.getElementById("propertyValuationDCValuetextStRate").innerHTML = returnCommas(challan.StructureValue);
                        }
                        else {
                         //   document.getElementById("propertyValuationDCValuetextStRate").innerHTML = "-";
                        }
                        
                    }

                    if (challan.lstTaxAmountValue[i].FieldName == LandValueLabel) {
                        if (challan.lstTaxAmountValue[i].AmountValue > 0) {
                            document.getElementById("propertyValuationDCValuetext").innerHTML = returnCommas(challan.lstTaxAmountValue[i].AmountValue);
                        } else {
                            document.getElementById("propertyValuationDCValuetext").innerHTML = '-';
                        }
                            // alert('a gya g')
                        debugger;
                        if (challan.StructureValue != null && challan.StructureValue != "0") {
                            //alert("inside if"); 
                          document.getElementById("propertyValuationDCValuetextStRate").innerHTML = returnCommas(challan.StructureValue);
                        }
                        else {
                          
                            if ((challan.StructureValue == "undefined" || challan.StructureValue == undefined) && challan.propertyInfo.Area==0) {
                               // alert("inside else if");
                                document.getElementById("propertyValuationDCValuetextStRate").innerHTML = returnCommas(challan.propertyInfo.DeclaredAmount);
                            }
                            if (challan.propertyInfo.ConstructedArea > 0 || challan.propertyInfo.ConstructedAreaInSqFeet > 0 || challan.propertyInfo.ConstructedStructureValue > 0) {
                               var structure_valuation_rate = challan.propertyInfo.ConstructedStructureValue * challan.propertyInfo.StructureSqFtRate; 
                                document.getElementById("propertyValuationDCValuetextStRate").innerHTML = returnCommas(structure_valuation_rate);
                            }
                            else {

                                document.getElementById("propertyValuationDCValuetextStRate").innerHTML = "-";
                            }
                            
                        }

                    }
                }
            }
            else {               
                document.getElementById("propertyValuationDCValuetext").innerHTML = "-";
            }

       
            $('#multipleKhasraDiv').hide();
        

        }

        else {
           // //alert('Once1')
            debugger;
            $('#DCValuationMainDIV').hide(); 
        }
    } else {
       
        debugger;
        $('#DCValuationMainDIV').hide();
        $('#constructedStructureDiv').hide();
        $('#LandValueRelated').hide();
        $('#CStrutureValueRelated').hide();
    }
    
    if (challan.propertyInfo2 != null) {
        if (challan.propertyInfo2 != null) { //&& (((challan.propertyInfo2.QanoongoeeString != "" && challan.propertyInfo2.QanoongoeeString != null) || (challan.propertyInfo2.RevenueCircleString != "" && challan.propertyInfo2.RevenueCircleString != null)))
            $("#DCValuationMainDIV2").show();
            $('#constructedStructureDiv2').hide();
            $('#squareNoUrbanHierarchyDivSecond').hide();
            


            document.getElementById("constructedStructureValue2").innerHTML = returnCommas(challan.propertyInfo2.ConstructedStructureValue);

            document.getElementById("LandClassificationDCValue2").innerHTML = challan.propertyInfo2.LandClassificationString;
           // document.getElementById("LocationDCValue2").innerHTML = challan.propertyInfo2.LocationString;

            if (challan.propertyInfo2.IsKhasraAvailable) {
                $('#khasraUrbanDivSecond').show();
                document.getElementById("khasraUrbanNumberSecond").innerHTML = challan.propertyInfo2.KhasraUrbanNo;
            }
            else {
                $('#khasraUrbanDivSecond').hide();
            }
           // //alert('suno1')
            debugger;
            if (challan.propertyInfo2.DistrictString != null && challan.propertyInfo2.DistrictString != "") {
                document.getElementById("districtDCScreenText2").innerHTML = challan.propertyInfo2.DistrictString;
            }
            else {
                document.getElementById("districtDCScreenText2").innerHTML = "-";
            }
            if (challan.propertyInfo2.TehsilString != null && challan.propertyInfo2.TehsilString != "") {
                document.getElementById("tehsilDCScreenText2").innerHTML = challan.propertyInfo2.TehsilString;
            }
            else {
                document.getElementById("tehsilDCScreenText2").innerHTML = "-";
            }

            //if (challan.propertyInfo2.isKhasraHierarchy) {
            //    $("#khasraDivSecondProperty").show();
            //    document.getElementById("khasraNumberSecondProperty").innerHTML = challan.propertyInfo2.KhasraNo;
            //    $("#squareNoHierarchyDivSecond").hide();
            //}
            //else {
            //    $("#squareNoHierarchyDivSecond").show();
            //   // document.getElementById("squareNoValueSecond").innerHTML = challan.propertyInfo2.SquareNo;
            //    //.getElementById("qilaNumberValueSecond").innerHTML = challan.propertyInfo2.QilaNo;

            //    $("#khasraDivSecondProperty").hide();
            //}
            //if (challan.propertyInfo2.isUrban || challan.propertyInfo2.treatAsUrban == true) {
            //    $("#applyCVTForSingleDiv2").show();
            //    document.getElementById("applyCVTForSingleValue2").innerHTML = "Yes";
            //}
            //else {
            //    $("#applyCVTForSingleDiv2").show();
            //    document.getElementById("applyCVTForSingleValue2").innerHTML = "No";
            //}
            //if ((challan.propertyInfo2.MultipleKhasras != null && challan.propertyInfo2.MultipleKhasras.length > 0) || 
            //    (challan.propertyInfo2.MultipleQilas != null && challan.propertyInfo2.MultipleQilas.length > 0)) {
            //    $("#applyCVTForSingleDiv2").hide();
            //}

            if (challan.propertyInfo2.isUrban == true) {
            //newDevChanges
                $('#locationUrbanDCValueLabel2').hide();
                $('#locationUrbanDCValueText2').hide();
                $('#townFloorDCValueLabel2').hide();
                $('#townFloorDCValueText2').hide();
                //document.getElementById("townDCScreenText2").innerHTML = challan.propertyInfo2.TownString;
                //document.getElementById("floorDCScreenText2").innerHTML = challan.propertyInfo2.FloorString;
                //document.getElementById("locationUrbanDCScreenText2").innerHTML = challan.propertyInfo2.LocationUrbanString;
                if (challan.propertyInfo2.TownString != null && challan.propertyInfo2.TownString != "") {
                    document.getElementById("townDCScreenText2").innerHTML = challan.propertyInfo2.TownString;
                }
                else {
                    document.getElementById("townDCScreenText2").innerHTML = "-";
                }
                if (challan.propertyInfo2.FloorString != null && challan.propertyInfo2.FloorString != "") {
                    document.getElementById("floorDCScreenText2").innerHTML = challan.propertyInfo2.FloorString;
                }
                else {
                    document.getElementById("floorDCScreenText2").innerHTML = "-";
                }
                if (challan.propertyInfo2.LocationUrbanString != null && challan.propertyInfo2.LocationUrbanString != "") {
                    document.getElementById("locationUrbanDCScreenText2").innerHTML = challan.propertyInfo2.LocationUrbanString;
                }
                else {
                    document.getElementById("locationUrbanDCScreenText2").innerHTML = "-";
                }

                document.getElementById("PropertyTypeValue2").innerHTML = Urban;
                document.getElementById("QanoongoOrRevenueCircle2").innerHTML = PropertyArea;//RevenueCircle;
                //document.getElementById("MouzaOrPropertyArea2").innerHTML = PropertyArea;
                //document.getElementById("QanoongoOrRevenueCircleText2").innerHTML = challan.propertyInfo2.RevenueCircleString;
                document.getElementById("MouzaOrPropertyAreaText2").innerHTML = challan.propertyInfo2.PropertyAreaString;

                if (challan.propertyInfo2.SquareNoUrban != null && challan.propertyInfo2.SquareNoUrban != "" && challan.propertyInfo2.QilaNoUrban != null && challan.propertyInfo2.QilaNoUrban != "") {
                    $('#squareNoUrbanHierarchyDivSecond').show();
                    document.getElementById("squareNoUrbanValueSecond").innerHTML = challan.propertyInfo2.SquareNoUrban;
                    document.getElementById("qilaNumberUrbanValueSecond").innerHTML = challan.propertyInfo2.QilaNoUrban;
                    $("#khasraDivSecondProperty").hide();

                }



                $('#LocationDCLabel2').hide();
                $('#LocationDCValue2').hide();
                $("#khasraDivSecondProperty").hide();
                $("#squareNoHierarchyDivSecond").hide();
            }
            else {

                document.getElementById("PropertyTypeValue2").innerHTML = Rural;

                //document.getElementById("QanoongoOrRevenueCircle2").innerHTML = Qanoongoee;
               // document.getElementById("MouzaOrPropertyArea2").innerHTML = Mouza;
               // document.getElementById("QanoongoOrRevenueCircleText2").innerHTML = challan.propertyInfo2.QanoongoeeString;
               // document.getElementById("MouzaOrPropertyAreaText2").innerHTML = challan.propertyInfo2.MouzaString;

                $('#LocationDCLabel2').show();
                $('#locationUrbanDCValueLabel2').hide();
                $('#locationUrbanDCValueText2').hide();
                $('#townFloorDCValueLabel2').hide();
                $('#townFloorDCValueText2').hide();
              //  $('#LocationDCValue2').show();
              //  document.getElementById("LocationDCValue2").innerHTML = challan.propertyInfo2.LocationString;
            }
            //DCValuation
            document.getElementById("LandAreaDCValue2").innerHTML = challan.propertyInfo2.Area + " " + challan.propertyInfo2.rateUnit;
            document.getElementById("RateDCValue2").innerHTML = returnCommas(challan.propertyInfo2.Rate) + " per " + challan.propertyInfo2.rateUnit;
            document.getElementById("DCValueFinalText2").innerHTML = returnCommas(challan.propertyInfo2.FinalRate);
            document.getElementById("cstructureVUP2").innerHTML = returnCommas(challan.propertyInfo2.ConstructedStructureValue);

            if (challan.ActualDCValue == false)
            {                
                document.getElementById("propertyValuationDCValuetext2").innerHTML = "-";
            }
            else
            {
                $('#propertyValuationDCValuetextLabel2').show();
                $('#propertyValuationDCValuetext2').show();

                for (i = 0; i < challan.lstTaxAmountValue.length; i++) {

                    if (challan.lstTaxAmountValue[i].FieldName == LandValueLabel && challan.lstTaxAmountValue[i].AdditionalInfo == secondProperty) {
                        document.getElementById("propertyValuationDCValuetext2").innerHTML = returnCommas(challan.lstTaxAmountValue[i].AmountValue);
                    }
                }
            }

            // Show multiple Khasras
            if (challan.propertyInfo2.MultipleKhasras != null && challan.propertyInfo2.MultipleKhasras.length > 0) {
                $("#applyCVTForSingleDiv2").hide();
                $('#multipleKhasraDiv2').show();

                var multipleKhasraDCType = challan.propertyInfo2.MultipleKhasraDCRateType;

                var textToDisplay = "Multiple Khasras " + (multipleKhasraDCType == null ? "" : "( " + multipleKhasraDCType + " ) ") + ":"

                document.getElementById("multipleKhasraLabel2").innerHTML = textToDisplay;
                multipleKhasraGrid2();

                // do not values for Khasra number
                document.getElementById("khasraNumberSecondProperty").innerHTML = "-";
                document.getElementById("RateDCValue2").innerHTML = "-";

                document.getElementById("LandClassificationDCValue2").innerHTML = "-";
               // document.getElementById("LocationDCValue2").innerHTML = "-";

                if (multipleKhasraDCType == allRatesApplied)
                    document.getElementById("LandAreaDCValue2").innerHTML = "-";
                else if (multipleKhasraDCType == highestRateApplied) {

                    var dcRate = 0;
                    var HighestKhasra = null;

                    for (var i = 0; i < challan.propertyInfo2.MultipleKhasras.length; i++) {
                        if (challan.propertyInfo2.MultipleKhasras[i] != null) {

                            
                                // Highest Rate applied
                                var khasraString = challan.propertyInfo2.MultipleKhasras[i].KhasraRate + '';
                                var khasraRate = parseFloat(khasraString.replace(/,/g, ""));
                                if (khasraRate > dcRate) {
                                    dcRate = khasraRate;
                                    HighestKhasra = challan.propertyInfo2.MultipleKhasras[i];
                                }
                            
                        }
                    }

                   
                }
            }
            else {
                // hide Multiple grid
                $('#multipleKhasraDiv2').hide();
            }


            // Show multiple Qilas
            if (challan.propertyInfo2.MultipleQilas != null && challan.propertyInfo2.MultipleQilas.length > 0) {
                $("#applyCVTForSingleDiv2").hide();
                $('#multipleQilaDiv2').show();

                var multipleSquareQilaDCType = challan.propertyInfo2.MultipleSquareQilaDCRateType;

                var textToDisplay = "Multiple Qilas " + (multipleSquareQilaDCType == null ? "" : "( " + multipleSquareQilaDCType + " ) ") + ":"

                document.getElementById("multipleQilaLabel2").innerHTML = textToDisplay;
                multipleQilaGrid2();

                // do not values for Qila number
                document.getElementById("squareNoValueSecond").innerHTML = "-";
                document.getElementById("qilaNumberValueSecond").innerHTML = "-";
                document.getElementById("squareNoUrbanValueSecond").innerHTML = "-";
                document.getElementById("qilaNumberUrbanValueSecond").innerHTML = "-";
                document.getElementById("RateDCValue2").innerHTML = "-";

                document.getElementById("LandClassificationDCValue2").innerHTML = "-";
               // document.getElementById("LocationDCValue2").innerHTML = "-";

                if (multipleSquareQilaDCType == allRatesApplied)
                    document.getElementById("LandAreaDCValue2").innerHTML = "-";
                else if (multipleSquareQilaDCType == highestRateApplied) {

                    var dcRate = 0;
                    var HighestQila = null;

                    for (var i = 0; i < challan.propertyInfo2.MultipleQilas.length; i++) {
                        if (challan.propertyInfo2.MultipleQilas[i] != null) {
                            // Highest Rate applied
                            var qilaString = challan.propertyInfo2.MultipleQilas[i].QilaNoRate + '';
                            var qilaRate = parseFloat(qilaString.replace(/,/g, ""));
                            if (qilaRate > dcRate) {
                                dcRate = qilaRate;
                                HighestQila = challan.propertyInfo2.MultipleQilas[i];
                            }

                        }
                    }

                   
                }
            }
            else {
                // hide Multiple grid
                $('#multipleQilaDiv2').hide();
            }

        } else {
           // //alert('31')
            debugger;
            $("#DCValuationMainDIV2").hide();
            $('#constructedStructureDiv2').hide();
        }
    } else {
       // //alert('32')
        debugger;
        $('#DCValuationMainDIV2').hide();
        $('#constructedStructureDiv2').hide();
        //$('#LandValueRelated').hide();
        //$('#CStrutureValueRelated').hide();
    }
    
    if ((challan.ChallanType == null || challan.ChallanType == "" ) && challan.IsPLRAFee == false) {
        $("#taxdiv").hide();
    }
    else {
        $("#taxdiv").show();
    }

    if (challan.lstTaxAmountValue.length > 0) {
        //createAmountFields();
        debugger;
        if (challan.TransactionName != exchangeOfPropertyDeedID) {
            createAmountFieldsNew(challan.TransactionName, challan.DeedInfo.IsCalculateSum,challan.lstTaxAmountValue);
        }
        else
        {
            ////alert('else')
            debugger;
            var indexOfSecondPropertyFields = -1;
            for(var i = 0; i < challan.lstTaxAmountValue.length;i++)
            {
                if(challan.lstTaxAmountValue[i].AdditionalInfo == secondProperty)
                {
                    indexOfSecondPropertyFields = i;
                    break;
                }
            }

            if (indexOfSecondPropertyFields == -1) indexOfSecondPropertyFields = 3;
           // //alert('else2')
            debugger;
            var lstFirstPropertyFields = challan.lstTaxAmountValue.slice(0, 3);
            var lstSecondPropertyFields = challan.lstTaxAmountValue.slice(3);
            createAmountFieldsNew(challan.TransactionName, challan.DeedInfo.IsCalculateSum, lstFirstPropertyFields);
            createAmountFieldsNew(challan.TransactionName, challan.DeedInfo.IsCalculateSum, lstSecondPropertyFields);


        }
        ////alert('else2')
        debugger;
        if (challan.propertyInfo != null) {

            if (challan.propertyInfo.LandClassificationString == 'Industrial') {
                //  alert("Testing the case" + challan.DCLandValue);
                if (challan.DCLandValue != null && challan.DCLandValue != 0 && challan.DCLandValue != 0) {
                    challan.propertyInfo.FinalRate = challan.DCLandValue;
                }
                //if (challan.StructureValue != null && challan.StructureValue != 0 && challan.StructureValue != "undefined") {
                //    challan.propertyInfo.ConstructedStructureValue = challan.StructureValue;
                //}
                // $('#DCValueFinalText').html(returnCommas(challan.propertyInfo.FinalRate));
                $('#DCValueFinalText').html(returnCommas(challan.propertyInfo.LAND_Valuation_Amount));
                $('#propertyValuationDCValuetextStRate').html(returnCommas(challan.propertyInfo.ConstructedStructureValue));
              
            }
            else {
                if (challan.DCLandValue != null && challan.DCLandValue != 0 && challan.DCLandValue != 0) {
                    challan.propertyInfo.FinalRate = challan.DCLandValue;
                }
               // alert('challan.StructureValue' + challan.StructureValue);
             //  alert('challan.propertyInfo.ConstructedStructureValue' + challan.propertyInfo.ConstructedStructureValue);
                if (challan.StructureValue != null && challan.StructureValue != 0 && challan.StructureValue != "undefined") {
                    challan.propertyInfo.ConstructedStructureValue = challan.StructureValue;
                }
            //    alert('challan.propertyInfo.ConstructedStructureValue' + challan.propertyInfo.ConstructedStructureValue);
                // $('#DCValueFinalText').html(returnCommas(challan.propertyInfo.FinalRate));
                
                    $('#propertyValuationDCValuetextStRate').html(returnCommas(challan.propertyInfo.ConstructedStructureValue));

              
            }
        }
        if (challan.DeedNameId == "31") {
           // //alert('else2')
            debugger;
            $('#DCValueFinalText').html(returnCommas(challan.propertyInfo.declaredAmount));
            $('#propertyValuationDCValuetext').html(returnCommas(challan.propertyInfo.LandPropertyValue));

            
            
            if (challan.MultipleLandClassification == true) {
                $('#propertyValuationDCValuetextStRate').html(returnCommas(challan.propertyInfo.ConstructedStructureValue));
            } 

           // //alert('f')
            debugger;
            if (challan.propertyInfo.StructureSqFtRateInds == "0" || challan.propertyInfo.StructureSqFtRateInds == null) {
                $('#SqFtRateDCValue').html("-");

            }
            else {
                //$('#SqFtRateDCValue').html(challan.propertyInfo.StructureSqFtRateInds);
                document.getElementById("SqFtRateDCValue").innerHTML = returnCommas(challan.propertyInfo.StructureSqFtRate) + " per " + challan.propertyInfo.StructureSqFtRateUnit;

            }
           


            if (challan.propertyInfo.CATEGORY_NAME == "" || challan.propertyInfo.CATEGORY_NAME == null) {
                $('#CategoryDCScreenText').html("-");
            }
            else {
                $('#CategoryDCScreenText').html(challan.propertyInfo.CATEGORY_NAME);
            }
            
            if (challan.propertyInfo.FlDropdownDC == "" || challan.propertyInfo.FlDropdownDC == null ) {
                
                $('#FloorDCScreenText').html("-");
            }
            else {
                $('#FloorDCScreenText').html(challan.propertyInfo.FlDropdownDC);
            }



            if (challan.propertyInfo.BasementsDropdownDC == "" || challan.propertyInfo.BasementsDropdownDC == null) {
                $('#BasementDCScreenText').html("-");
            }
            else {
                $('#BasementDCScreenText').html(challan.propertyInfo.BasementsDropdownDC);
            }


            if (challan.propertyInfo.AcreValue == "" || challan.propertyInfo.AcreValue == null) {
                $('#AcreDCScreenText').html("-");
            }
            else {
                $('#AcreDCScreenText').html(challan.propertyInfo.AcreValue);
            }

            if (challan.propertyInfo.GhuntaValue == "" || challan.propertyInfo.GhuntaValue == null) {
                $('#GhuntaDCScreenText').html("-");
            }
            else {
                $('#GhuntaDCScreenText').html(challan.propertyInfo.GhuntaValue);
            }
            if (challan.propertyInfo.SqrYardValue == "" || challan.propertyInfo.SqrYardValue == null) {
                $('#SqrYardScreenText').html("-");
            }
            else {
                $('#SqrYardScreenText').html(challan.propertyInfo.SqrYardValue);
            }

            if (challan.propertyInfo.LandTypeStampId == "" || challan.propertyInfo.LandTypeStampId == null) {
                $('#LandTypeStampScreenText').html("-");
            }
            else {
                $('#LandTypeStampScreenText').html(challan.propertyInfo.StampDutyTypeString);
            }


            if (challan.propertyInfo.PropertyAreaQuantity == "" || challan.propertyInfo.PropertyAreaQuantity == null) {
                $('#LandAreaSqftDCValue').html("-");
            }
            else {
                $('#LandAreaSqftDCValue').html(challan.propertyInfo.PropertyAreaQuantity);
            }
           // //alert('yes1');
            debugger;
            if (challan.propertyInfo.CoveredAreaQuantity == "" || challan.propertyInfo.CoveredAreaQuantity == null) {
                $('#LandAreaDCScreenText').html("-");
            }
            else {
                $('#LandAreaDCScreenText').html(challan.propertyInfo.CoveredAreaQuantity);
            }


            if (challan.propertyInfo2.FlDropdownDC == "" || challan.propertyInfo2.FlDropdownDC == null) {
                $('#FloorDCScreenText2').html("-");
            }
            else {
                $('#FloorDCScreenText2').html(challan.propertyInfo2.FlDropdownDC);
            }

            if (challan.propertyInfo2.BasementsDropdownDC == "" || challan.propertyInfo2.BasementsDropdownDC == null) {
                $('#BasementDCScreenText2').html("-");
            }
            else {
                $('#BasementDCScreenText2').html(challan.propertyInfo2.BasementsDropdownDC);
            }

            if (challan.propertyInfo2.BasementsDropdownDC == "" || challan.propertyInfo2.BasementsDropdownDC == null) {
                $('#CategoryDCScreenText2').html("-");
            }
            else {
                $('#CategoryDCScreenText2').html(challan.propertyInfo2.BasementsDropdownDC);
            }
            
            if (challan.propertyInfo2.LandCategory == "" || challan.propertyInfo2.LandCategory == null) {
                $('#CategoryDCScreenText2').html("-");
            }
            else {
                $('#CategoryDCScreenText2').html(challan.propertyInfo2.LandCategory);
            }
            

            if (challan.propertyInfo2.CoveredAreaQuantity == "" || challan.propertyInfo2.CoveredAreaQuantity == null) {
                $('#constructedAreaText2').html("-");
            }
            else {
                $('#constructedAreaText2').html(challan.propertyInfo2.CoveredAreaQuantity);
            }

            if (challan.propertyInfo2.CoveredAreaQuantity == "" || challan.propertyInfo2.CoveredAreaQuantity == null) {
                $('#constructedAreaText2').html("-");
            }
            else {
                $('#constructedAreaText2').html(challan.propertyInfo2.CoveredAreaQuantity);
            }

            if (challan.propertyInfo2.CoveredAreaQuantity == "" || challan.propertyInfo2.CoveredAreaQuantity == null) {
                $('#LandAreaDCScreenText2').html("-");
            }
            else {
                $('#LandAreaDCScreenText2').html(challan.propertyInfo2.CoveredAreaQuantity);
            }

            if (challan.propertyInfo2.StructureSqFtRateInds == "0" || challan.propertyInfo2.StructureSqFtRateInds == null) {
                $('#SqFtRateDCValue2').html("-");
            }
            else {
              //  $('#SqFtRateDCValue2').html(challan.propertyInfo2.StructureSqFtRateInds);
                document.getElementById("SqFtRateDCValue2").innerHTML = returnCommas(challan.propertyInfo2.StructureSqFtRate) + " per " + challan.propertyInfo2.StructureSqFtRateUnit
            }

            if (challan.propertyInfo2.StructureValue == "0" || challan.propertyInfo2.StructureValue == null) {
                $('#cstructureVDC2').html("-");
            }
            else {
                $('#cstructureVDC2').html(challan.propertyInfo2.StructureValue);
            }

            if (challan.propertyInfo2.StructureValue != "0" && challan.propertyInfo2.StructureSqFtRateInds != "0"
               && challan.propertyInfo2.Area == "") {
                $('#RateDCValue2').html("-");
                //$('#propertyValuationDCValuetext').html("-");

                $('#DCValueFinalText2').html("-");
               // $('#propertyValuationDCValuetextStRate').html(returnCommas(challan.propertyInfo.StructureValue));
            }
            
            

            //StructureSqFtRateInds
           // $('#BasementDCScreenText').html(challan.propertyInfo.BasementsDropdownDC);           
           // $('#CategoryDCScreenText').html(challan.propertyInfo.LandCategory);
           // $('#LandAreaSqftDCValue').html(challan.propertyInfo.PropertyAreaQuantity);
            //$('#LandAreaDCScreenText').html(challan.propertyInfo.CoveredAreaQuantity);
            
            
        }

    }
}



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function PopulateNadraSection(challan)
{
    document.getElementById("dutyPayingPartyName").innerHTML = challan.DutyPaidByPrimaryParty.PersonName;
    document.getElementById("dutyPayingPartyRelationName").innerHTML = challan.DutyPaidByPrimaryParty.RelationName;
    document.getElementById("dutyPayingPartyRelationLabel").innerHTML = challan.DutyPaidByPrimaryParty.RelationString + ":";
    document.getElementById("dutyPayingPartyCnic").innerHTML = challan.DutyPaidByPrimaryParty.PersonCnic;
    
    var nadra_name;
    var nadra_fathername;
    var nadra_cnic;

    if (challan.DutyPaidByPrimaryPartyNADRAInfo != null)
    {
        nadra_name = challan.DutyPaidByPrimaryPartyNADRAInfo.name;
        nadra_fathername = challan.DutyPaidByPrimaryPartyNADRAInfo.father_husband_name;
        nadra_cnic = challan.DutyPaidByPrimaryPartyNADRAInfo.cnic;
    }

    if (nadra_name == "" || nadra_name == null || nadra_name == undefined) nadra_name = "Not Available";
    if (nadra_fathername == "" || nadra_fathername == null || nadra_fathername == undefined) nadra_fathername = "Not Available";
    if (nadra_cnic == "" || nadra_cnic == null || nadra_cnic == undefined) nadra_cnic = challan.DutyPaidByPrimaryParty.PersonCnic;

    document.getElementById("nadraName").innerHTML = nadra_name;
    document.getElementById("nadraFatherName").innerHTML = nadra_fathername;
    document.getElementById("nadraCnic").innerHTML = nadra_cnic;
    
}


function createAmountFields() {
    //alert('createAmountFields')
    debugger;
    var returnedArray = "";
    var fieldsArray = "";

    var firstpropertyInfo = "";
    var firstPropertyFieldsArray = "";

    var secondpropertyInfo = "";
    var secondpropertyFieldInfo = "";

    var checkIsCalculateSum = false;

    for (i = 0; i < challan.lstTaxAmountValue.length; i++) {
        if (challan.DeedInfo.IsCalculateSum == false) {

            checkIsCalculateSum = false;
            returnedArray = renderField(challan.lstTaxAmountValue[i].FieldName, returnCommas(challan.lstTaxAmountValue[i].AmountValue));
            fieldsArray = fieldsArray + returnedArray;

        }
        else {
           
            debugger;
            checkIsCalculateSum = true;
            if (challan.TransactionName == exchangeOfPropertyDeedID) {

                if (challan.lstTaxAmountValue[i].AdditionalInfo == firstProperty) {

                    firstpropertyInfo = renderField(challan.lstTaxAmountValue[i].FieldName, returnCommas(challan.lstTaxAmountValue[i].AmountValue));
                    firstPropertyFieldsArray = firstPropertyFieldsArray + firstpropertyInfo;

                }
                else {
                    secondpropertyInfo = renderField(challan.lstTaxAmountValue[i].FieldName, returnCommas(challan.lstTaxAmountValue[i].AmountValue));
                    secondpropertyFieldInfo = secondpropertyFieldInfo + secondpropertyInfo;
                }
            }
            else {
                
                returnedArray = renderField(challan.lstTaxAmountValue[i].FieldName, returnCommas(challan.lstTaxAmountValue[i].AmountValue));
                fieldsArray = fieldsArray + returnedArray;

            }

        }

    }
   
    debugger;
    if (!checkIsCalculateSum) {
        $("#amountsInDeedSectionViewChallan").show();
        $("#amountsInDeedSectionViewChallan").html(fieldsArray);

        $("#amountsFirstPropertyViewChallan").hide();
        $("#amountsSecondPropertyViewChallan").hide();
    }
    else {
        
        debugger;
        if (challan.TransactionName == exchangeOfPropertyDeedID) {
            $("#amountsFirstPropertyViewChallan").show();
            $("#amountsSecondPropertyViewChallan").show();

            $("#amountsFirstPropertyViewChallan").html(firstPropertyFieldsArray); 
            $("#amountsSecondPropertyViewChallan").html(secondpropertyFieldInfo);

            $("#amountsInDeedSectionViewChallan").hide();
        }
        else {
            $("#amountsFirstPropertyViewChallan").show();
            $("#amountsFirstPropertyViewChallan").html(fieldsArray);

            $("#amountsInDeedSectionViewChallan").hide();
        }
    }
    if (challan.isOldRegistryChallan) {
        $("#amountsFirstPropertyViewChallan").hide();
    }
    else {
        $("#amountsFirstPropertyViewChallan").show();
    }

}

function createAmountFieldsNew(deed_Id, IsCalculateSum, lstTaxAmountValue) {
    $("#amountsFirstPropertyViewChallan").hide();
    $("#amountsSecondPropertyViewChallan").hide();
   
    var returnedArray = "";
    var fieldsArray = "";
    var firstpropertyInfo = "";
    var firstPropertyFieldsArray = "";
    var secondpropertyInfo = "";
    var secondpropertyFieldInfo = "";
    var checkIsCalculateSum = false;
    var loopLength = lstTaxAmountValue.length / 2;
    loopLength = loopLength.toFixed(0); // It rounds to upper decimal places. means if length of array is 3, then loopLength value would be 1.5 => 2.
    var index = 0;
   // alert('a jao')
    debugger;
    for (i = 0; i < loopLength; i++, index += 2) {
        if (IsCalculateSum == false) {
          
            checkIsCalculateSum = false;
            if (index + 1 < lstTaxAmountValue.length) {
                if (lstTaxAmountValue[index].FieldName == 'Period From' || lstTaxAmountValue[index].FieldName == 'Period To' || lstTaxAmountValue[index].FieldName == 'Policy Date From' || lstTaxAmountValue[index].FieldName == 'Policy Date To'
                    || lstTaxAmountValue[index].FieldName == "Distinctive Number (From - To)"
                    || lstTaxAmountValue[index].FieldName == "Share Certificate Number" || lstTaxAmountValue[index].FieldName == "NTN Number" || lstTaxAmountValue[index].FieldName == "Policy Number"
                    ) {
                    returnedArray = renderFieldInRow(lstTaxAmountValue[index].FieldName, lstTaxAmountValue[index].AmountValue,
                   lstTaxAmountValue[index + 1].FieldName, lstTaxAmountValue[index + 1].AmountValue);
                }

                else if (lstTaxAmountValue[index + 1].FieldName == "Distinctive Number From - To") {
                    returnedArray = renderFieldInRow(lstTaxAmountValue[index].FieldName, lstTaxAmountValue[index].AmountValue,
                   lstTaxAmountValue[index + 1].FieldName, lstTaxAmountValue[index + 1].AmountValue);
                }
                else {
                    if (lstTaxAmountValue[index + 1].FieldName == 'Issue(0.05 % per annum)'
                        || lstTaxAmountValue[index].FieldName == 'Issue(0.05 % per annum)'
                        ) {
                        returnedArray = renderFieldInRow(lstTaxAmountValue[index].FieldName, returnCommas(lstTaxAmountValue[index].AmountValue),
                    " "," ");
                    }
                    else {
                        if (lstTaxAmountValue[index].FieldName == 'Franking Machine No.') {
                            returnedArray = renderFieldInRow(lstTaxAmountValue[index].FieldName, lstTaxAmountValue[index].AmountValue,
                        lstTaxAmountValue[index + 1].FieldName, returnCommas(lstTaxAmountValue[index + 1].AmountValue));
                        } else {
                            returnedArray = renderFieldInRow(lstTaxAmountValue[index].FieldName, returnCommas(lstTaxAmountValue[index].AmountValue),
                        lstTaxAmountValue[index + 1].FieldName, returnCommas(lstTaxAmountValue[index + 1].AmountValue));
                        }
                        
                    }
                   
                }
            }
            else // for last item in the list
            {


                returnedArray = renderField(lstTaxAmountValue[index].FieldName, returnCommas(lstTaxAmountValue[index].AmountValue));
            }
            fieldsArray = fieldsArray + returnedArray;

        }
        else
        {
            
            debugger;
            checkIsCalculateSum = true;
            if (deed_Id == exchangeOfPropertyDeedID) {

                if (lstTaxAmountValue[i].AdditionalInfo == firstProperty) {
                   
                    if (index + 1 < lstTaxAmountValue.length) {
                        if (lstTaxAmountValue[index].FieldName == "Distinctive Number (From - To)") {
                            firstpropertyInfo = renderFieldInRow(lstTaxAmountValue[index].FieldName, lstTaxAmountValue[index].AmountValue,
                           lstTaxAmountValue[index + 1].FieldName, lstTaxAmountValue[index + 1].AmountValue);
                        }
                        else if (lstTaxAmountValue[index + 1].FieldName == "Distinctive Number From - To") {
                            returnedArray = renderFieldInRow(lstTaxAmountValue[index].FieldName, lstTaxAmountValue[index].AmountValue,
                           lstTaxAmountValue[index + 1].FieldName, lstTaxAmountValue[index + 1].AmountValue);
                        }
                        else
                            if (lstTaxAmountValue[index + 1].FieldName == 'Issue(0.05 % per annum)'
                        || lstTaxAmountValue[index].FieldName == 'Issue(0.05 % per annum)'
                        ) {
                                firstpropertyInfo = renderFieldInRow(lstTaxAmountValue[index].FieldName, returnCommas(lstTaxAmountValue[index].AmountValue),
                            " ", " ");
                            }
                            else {
                                firstpropertyInfo = renderFieldInRow(lstTaxAmountValue[index].FieldName, returnCommas(lstTaxAmountValue[index].AmountValue),
                                lstTaxAmountValue[index + 1].FieldName, returnCommas(lstTaxAmountValue[index + 1].AmountValue));
                            }
                    }

                    else // for last item in the list
                        firstpropertyInfo = renderField(lstTaxAmountValue[index].FieldName, returnCommas(lstTaxAmountValue[index].AmountValue));

                    //firstpropertyInfo = renderField(lstTaxAmountValue[i].FieldName, returnCommas(lstTaxAmountValue[i].AmountValue));
                    firstPropertyFieldsArray = firstPropertyFieldsArray + firstpropertyInfo;

                }
                else {

                    if (index + 1 < lstTaxAmountValue.length)
                        secondpropertyInfo = renderFieldInRow(lstTaxAmountValue[index].FieldName, returnCommas(lstTaxAmountValue[index].AmountValue),
                            lstTaxAmountValue[index + 1].FieldName, returnCommas(lstTaxAmountValue[index + 1].AmountValue));
                    else // for last item in the list
                        secondpropertyInfo = renderField(lstTaxAmountValue[index].FieldName, returnCommas(lstTaxAmountValue[index].AmountValue));

                    //secondpropertyInfo = renderField(lstTaxAmountValue[i].FieldName, returnCommas(lstTaxAmountValue[i].AmountValue));
                    secondpropertyFieldInfo = secondpropertyFieldInfo + secondpropertyInfo;
                }
            }
            else {
                debugger;
                if (index + 1 < lstTaxAmountValue.length){
                    if (lstTaxAmountValue[index].FieldName == "Distinctive Number (From - To)" || lstTaxAmountValue[index].FieldName == "Policy Date From" ||  lstTaxAmountValue[index].FieldName == "Policy Date To"
                        || lstTaxAmountValue[index].FieldName == "Share Certificate Number"
                        ) {
                        debugger;
                        if (lstTaxAmountValue[index].FieldName == "Policy Date From") {
                            challan.PolicyDateFrom = lstTaxAmountValue[index].AmountValue;
                        }
                        if (lstTaxAmountValue[index].FieldName == "Policy Date To") {
                            challan.PolicyDateTo = lstTaxAmountValue[index].AmountValue;
                        }
                        returnedArray = firstpropertyInfo = renderFieldInRow(lstTaxAmountValue[index].FieldName, lstTaxAmountValue[index].AmountValue,
                       lstTaxAmountValue[index + 1].FieldName, lstTaxAmountValue[index + 1].AmountValue);
                    }
                    else if (lstTaxAmountValue[index + 1].FieldName == "Distinctive Number From - To") {
                        returnedArray = renderFieldInRow(lstTaxAmountValue[index].FieldName, lstTaxAmountValue[index].AmountValue,
                       lstTaxAmountValue[index + 1].FieldName, lstTaxAmountValue[index + 1].AmountValue);
                    }
                    else
                        if (lstTaxAmountValue[index + 1].FieldName == 'Issue(0.05 % per annum)'
                    || lstTaxAmountValue[index].FieldName == 'Issue(0.05 % per annum)'
                    ) {
                            returnedArray = renderFieldInRow(lstTaxAmountValue[index].FieldName, returnCommas(lstTaxAmountValue[index].AmountValue),
                        " ", " ");
                        }
                        else {
                            if (lstTaxAmountValue[index].FieldName == 'Franking Machine No.') {
                                returnedArray = renderFieldInRow(lstTaxAmountValue[index].FieldName, lstTaxAmountValue[index].AmountValue,
                        lstTaxAmountValue[index + 1].FieldName, returnCommas(lstTaxAmountValue[index + 1].AmountValue));
                            } else {
                                returnedArray = renderFieldInRow(lstTaxAmountValue[index].FieldName, returnCommas(lstTaxAmountValue[index].AmountValue),
                        lstTaxAmountValue[index + 1].FieldName, returnCommas(lstTaxAmountValue[index + 1].AmountValue));
                            }
                    
                    }
                }
                else // for last item in the list
                    returnedArray = renderField(lstTaxAmountValue[index].FieldName, returnCommas(lstTaxAmountValue[index].AmountValue));
                //returnedArray = renderField(challan.lstTaxAmountValue[i].FieldName, returnCommas(challan.lstTaxAmountValue[i].AmountValue));
                fieldsArray = fieldsArray + returnedArray;

            }

        }

    }

    if (!checkIsCalculateSum) {
        $("#amountsInDeedSectionViewChallan").show();
        $("#amountsInDeedSectionViewChallan").html(fieldsArray);
        $("#amountsFirstPropertyViewChallan").hide();
        $("#amountsSecondPropertyViewChallan").hide();
    }
    else {
       
        debugger;
        if (deed_Id == exchangeOfPropertyDeedID) {
            $("#amountsFirstPropertyViewChallan").show();
            $("#amountsSecondPropertyViewChallan").show();
            if (firstPropertyFieldsArray != null && firstPropertyFieldsArray != "") $("#amountsFirstPropertyViewChallan").html(firstPropertyFieldsArray);
            if (secondpropertyFieldInfo != null && secondpropertyFieldInfo != "") $("#amountsSecondPropertyViewChallan").html(secondpropertyFieldInfo);
            $("#amountsInDeedSectionViewChallan").hide();
        }
        else {
            $("#amountsFirstPropertyViewChallan").show();
            $("#amountsFirstPropertyViewChallan").html(fieldsArray);
            $("#amountsInDeedSectionViewChallan").hide();
        }
    }

}

function renderField(fieldName, amountValue) {
  
    debugger;
    var strVar = "";
    strVar += "<div>";
    strVar += "                    <div class=\"col-md-12 row\">";
    strVar += "                        <div class=\"boldLabel col-md-6\">";
    strVar += "                            " + fieldName + ": ";
    strVar += "                        <\/div>";
    strVar += "                    <\/div>";
    strVar += "";
    strVar += "                    <div class=\"col-md-12 row\">";
    strVar += "                        <div class=\"label text col-md-6\">";
    strVar += " " + amountValue + " ";
    strVar += "                        <\/div>";
    strVar += "                    <\/div>";
    strVar += "                <\/div>";

    return strVar;

}

function renderFieldInRow(firstFieldName, firstAmountValue, secondFieldName, secondAmountValue) {
    debugger;

    if (secondFieldName == 'NTN Number') {

        secondAmountValue = secondAmountValue.replace(/,/g, '');
    }
    if (firstFieldName == 'Franking Machine No.') {
        firstAmountValue = firstAmountValue.replace(/,/g, '');
    }
    
    if (firstFieldName == "Policy Date From") {  // || secondFieldName == "Policy Date From"
        challan.PolicyDateFrom = firstAmountValue; 
        var dateformat = formatDate(challan.PolicyDateFrom);
        if (dateformat != "" && dateformat != null && dateformat != "NaN/NaN/NaN") {
            dateformat = dateformat;
        }
        else {
            dateformat = "-"
        }
        firstAmountValue = dateformat;
    }
    else if (secondFieldName == "Policy Date From") {
        challan.PolicyDateFrom = secondAmountValue;
        var dateformat = formatDate(challan.PolicyDateFrom);
        if (dateformat != "" && dateformat != null && dateformat != "NaN/NaN/NaN") {
            dateformat = dateformat;
        }
        else {
            dateformat = "-"
        }
        secondAmountValue = dateformat;
    }

    if (firstFieldName == "Policy Date To") {
        challan.PolicyDateTo = firstAmountValue;
        var dateformat = formatDate(challan.PolicyDateTo);

        if (dateformat != "" && dateformat != null && dateformat != "NaN/NaN/NaN") {
            dateformat = dateformat;
        }
        else {
            dateformat = "-"
        }
        firstAmountValue = dateformat
    }
    else if (secondFieldName == "Policy Date To") {
        challan.PolicyDateTo = secondAmountValue;
        var dateformat = formatDate(challan.PolicyDateTo);
        if (dateformat != "" && dateformat != null && dateformat != "NaN/NaN/NaN") {
            dateformat = dateformat;
        }
        else {
            dateformat = "-"
        }
        secondAmountValue = dateformat;
    }

    //                <div class="col-md-12 row">
    //                    <div class="boldLabel col-md-6" id="amountLabelinDeedDetails">
    //                        Property Value
    //                    </div>
    //                    <div class="boldLabel col-md-6" id="suitForLabel">
    //                        Suit For:
    //                    </div>

    //                </div>

    //<div class="col-md-12 row">
    //    <div class="label text col-md-6" id="totalAmountTextinDeedDetails">

    //    </div>
    //    <div class="label text col-md-6" id="suitForText">

    //    </div>
    //</div>
    debugger; 
    if (secondFieldName == 'RadioPhysicalCDC') {
        var $radio_phsicalCDC = $('input[name=ShareWinthdrawl]:checked');
        var id_radio_CDC = $radio_phsicalCDC.attr('id');
        if (id_radio_CDC == 'CDC') {
           // secondFieldName = 'Share Deposit to CDC';
            //secondAmountValue = "Selected";

            secondFieldName = " ";
            secondAmountValue = " ";
        } else {
            //secondFieldName = 'Physically Withdrawl';
            //secondAmountValue = "Selected";

            secondFieldName = " ";
            secondAmountValue = " ";
        }
       
    
    
    }

    if (firstFieldName == 'RadioSubInsuredType') {

        if (firstAmountValue == 0.05) {
            firstFieldName = "Upto 6 Months";
            firstAmountValue = "0.045% of Sub Insured Amount";

        } else {
            var $radio_phsicalCDC = $('input[name=typeInstruments]:checked');
            var id_radio_CDC = $radio_phsicalCDC.attr('id');
            if (id_radio_CDC == 'six_month') {
                // secondFieldName = 'Share Deposit to CDC';
                //secondAmountValue = "Selected";

                firstFieldName = "Upto 6 Months";
                firstAmountValue = "0.045% of Sub Insured Amount";
            } else {
                //secondFieldName = 'Physically Withdrawl';
                //secondAmountValue = "Selected";

                firstFieldName = "Upto 12 Months";
                firstAmountValue = "0.090% of Sub Insured Amount";
            }

        }
    }

    if (firstFieldName == 'For Domectic Use') {

        
        var $radio_phsicalCDC = $('input[name=AirTicketValue]:checked');
            var id_radio_CDC = $radio_phsicalCDC.attr('id');
            if (id_radio_CDC == 'domesticFlight') {
                // secondFieldName = 'Share Deposit to CDC';
                //secondAmountValue = "Selected";

                firstFieldName = "Domestic Flight";
                firstAmountValue = "50";
            } else {
                //secondFieldName = 'Physically Withdrawl';
                //secondAmountValue = "Selected";

                firstFieldName = "International Flights";
                firstAmountValue = "400";
            }

        
    }
    debugger;
    if (secondFieldName == 'Type of Instruments') {
        
        //var $radio_phsicalCDC = $('input[name=TypeofInstruments]:checked');
        //var id_radio_CDC = $radio_phsicalCDC.attr('id');
        if (secondAmountValue == 'Bill of Lading') {
            secondFieldName = 'Type of Instruments';
            secondAmountValue = "Bill of Lading";
        }
        else if (secondAmountValue == 'Insurance') {
           secondFieldName = 'Type of Instruments';
           secondAmountValue = "Insurance";
        }

        else if (secondAmountValue == 'Banking_Documents') {
           secondFieldName = 'Type of Instruments';
           secondAmountValue = "Banking Document";
       }
        else if (secondAmountValue == 'Banking Document') {
           secondFieldName = 'Type of Instruments';
           secondAmountValue = "Banking Document";
       }
       else{
           secondFieldName = 'Type of Instruments';
           secondAmountValue = "Securities";
       }
       
    }
    var strVar = "";
    strVar += "<div>";
    strVar += "                    <div class=\"col-md-12 row\">";
    strVar += "                        <div class=\"boldLabel col-md-6\">";
    strVar += "                            " + firstFieldName + ": ";
    strVar += "                        <\/div>";
//    strVar += "                    <\/div>";
//    strVar += "                    <div class=\"col-md-12 row\">";
    strVar += "                        <div class=\"boldLabel col-md-6\">";
    if (secondFieldName == " ") {
        strVar += "                            " + secondFieldName + " ";
    }
    else
    strVar += "                            " + secondFieldName + ": ";
    strVar += "                        <\/div>";
    strVar += "                    <\/div>";
    strVar += "";
    strVar += "                    <div class=\"col-md-12 row\">";
    strVar += "                        <div class=\"label text col-md-6\" style=\"white-space: normal; overflow-wrap: break-word; display: block;\">";
    strVar += " " + firstAmountValue + " ";
    strVar += "                        <\/div>";
    strVar += "                        <div class=\"label text col-md-6\" style=\"white-space: normal; overflow-wrap: break-word; display: block;\"  >";
    strVar += " " + secondAmountValue + " ";
    strVar += "                        <\/div>";
    strVar += "                    <\/div>";
    strVar += "                <\/div>";

    return strVar;

}

function initializeDropDown(url, placeholder, elementId) {
    $("#" + elementId).kendoDropDownList({
        dataTextField: "Name",
        optionLabel: placeholder,
        dataValueField: "Id",
        dataSource: {
            transport: {
                read: {
                    url: url,
                    dataType: 'json',
                    type: 'POST',
                },
            },
        },
    });
}

function initializeStaticDropDown(data, placeholder, elementId) {
    $("#" + elementId).kendoDropDownList({
        dataTextField: "Name",
        optionLabel: placeholder,
        dataValueField: "Id",
        dataSource: data,
    });
}

function returnCommas(nStr) {
    
   
    nStr += ''; nStr = nStr.replace(/,/g, "");
    if (nStr == "" || nStr == null) return "";

    var isFloatingNumber = false;

    var floatNumber = parseFloat(nStr);
    if (isNaN(floatNumber)) return nStr;
    if (floatNumber == 0) return "0";
    if (!(floatNumber % 1 == 0)) {
        // Has some decimal points
        isFloatingNumber = true;
        floatNumber = Math.round(floatNumber * 100) / 100; // Round to 2 decimal places at the most.
        
    }
    else {
        // Does not have decimal points
        isFloatingNumber = false;
    }

    nStr = floatNumber.toString();

    x = nStr.split('.');
    x1 = x[0]; x2 = '';
    if (isFloatingNumber) x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    //if (x2 == "")
    //    x2 = ".00";
    if (x1 == "")
        x2 = "";

    var returnValue = x1 + x2;
    console.log("returnCommas parameter type : " + typeof (nStr) + " value: " + nStr + " returnValue : " + returnValue + " typeof returnValue: " + typeof(returnValue));
    return returnValue;
}

function formatAmount(nStr) {
    ////alert(nStr);
    if (nStr == null)
    {
        return "0";
    }
    nStr = Math.round(nStr); 

    nStr = nStr.toString();

    ////alert(nStr);

    var formattedAmount = nStr;
    var n = nStr.indexOf(",");
    if (n == -1) {
        formattedAmount = returnCommas(nStr);
    }

    console.log("formatAmount parameter type : " + typeof (nStr) + " value: " + nStr + " formattedAmount : " + formattedAmount + " typeof formattedAmount: " + typeof (formattedAmount));

    return formattedAmount;
}

function hideDivsForAdhesiveStamps() {
    $("#stampdiv").hide();
    $("#NADRAVerifyDiv").hide();
    $("#taxdiv").hide();
    $("#oldRegistryChallanDetailsDiv").hide();
    $("#deedsDetails").hide();
    $("#propertyInfo1Div").hide();
    $("#propertyInfo2Div").hide();
    $("#DCValuationMainDIV").hide();
    $("#DCValuationMainDIV2").hide();
    $("#AgentInformation").hide();
    $("#purchasersdiv").hide();
    $("#sellersdiv").hide();
    $("#DCValuationMainDIV2").hide();
    $('#refundDutiesLablel').hide();
    $("#chTOVerified").hide();
    $("#chStatusPair").hide();
    $("#chStatusPair2").hide();
    $('#StampVendorChallanDiv').hide();
    $('#WhitePaperchallanDiv').hide();
}
function hideDivForDigitalScanningFee() {
    $("#propertyInfo1Div").hide();
    $("#propertyInfo2Div").hide();
    $("#DCValuationMainDIV").hide();
    $("#DCValuationMainDIV2").hide();

}
function showDivsForAdhesiveStamps() {
    $("#stampdiv").show();
    $("#deedsDetails").show();
    $("#propertyInfo1Div").show();
    $("#AgentInformation").show();
    $("#purchasersdiv").show();
    $("#sellersdiv").show();
    $("#DCValuationMainDIV2").show();
    $('#refundDutiesLablel').show();
    $("#chTOVerified").show();
    $('#StampVendorChallanDiv').show();
}

function renderChallanForAdhesiveStamps(challanForAdhesiveStamps) {
    //Hiding Divs:
    hideDivsForAdhesiveStamps();
    
    //------------------
    if (challan.ChallanStatus == refundInitiated || challan.ChallanStatus == refundCompleted || challan.ChallanStatus == refundCancelled) {
        $("#refundDutiesLablel").show();
        $("#chStatusPair").show();
        document.getElementById("challanNumberText").innerHTML = challan.ChallanNumber;
        document.getElementById("challanStatus").innerHTML = challan.ChallanStatus;
    } else {
        $("#chStatusPair2").show();
        document.getElementById("challanNumberText").innerHTML = challan.ChallanNumber;
        document.getElementById("challanStatus2").innerHTML = challan.ChallanStatus;
    }

    var challanAmountView = calculateDenominationTotalAmount(challanForAdhesiveStamps.denominationData);
    document.getElementById("challanAmountText").innerHTML = returnCommas(challanAmountView);
    document.getElementById("totalPayableAmountText2").innerHTML = returnCommas(challanAmountView) ;
    record = 0;
    $('#DenominationViewGrid').kendoGrid({
        toolbar: kendo.template("<b style='font-size:18px;'>"+SelectedDenominations+"<b>"),
        columns: [{ title: serialNumber, template: "#= ++record #", width: "10px" },
        { title: Denomination, field: "denomination", width: "250px" },
        { title: NoOfStamps, field: "noOfStamps", width: "250px" }
        ],

        dataSource: {
            data: challanForAdhesiveStamps.denominationData
        },
        scrollable: false,
        sortable: false,
        filterable: false,
        pageable: false
    });

    document.getElementById("districtText3").innerHTML = challanForAdhesiveStamps.DistrictString;
    document.getElementById("tehsilText3").innerHTML = challanForAdhesiveStamps.TehsilString;
    document.getElementById("StampTypeText3").innerHTML = challanForAdhesiveStamps.TransactionTypeString;
    document.getElementById("AdhesiveStampText2").innerHTML = challanForAdhesiveStamps.AdhesiveStampString;

    document.getElementById("agentNameText1").innerHTML = challanForAdhesiveStamps.AgentName;
    document.getElementById("agentCninText1").innerHTML = challanForAdhesiveStamps.AgentCnic;
    document.getElementById("agentContactText1").innerHTML = challanForAdhesiveStamps.AgentCell;
    if (challanForAdhesiveStamps.AgentEmail == null || challanForAdhesiveStamps.AgentEmail == "") {
        $('#agentEmailLabel1').hide();
        $('#agentEmailText1').hide();
    }
    else {
        $('#agentEmailLabel1').show();
        $('#agentEmailText1').show();
        document.getElementById("agentEmailText1").innerHTML = challanForAdhesiveStamps.AgentEmail;
    }
    if (fullViewMode == false) {
        // Hide Agent Contact and Email address
        $('#divAgentContactInfoLabel1').hide();
        $('#divAgentContactInfoValue1').hide();
    }
    $('#ApplicantDataGrid').kendoGrid({
        columns: [{ title: Name, field: "NameString", width: "250px" },
            { title: Cnic, field: "PersonCnic", width: "250px" },
        {
            command: [{
                text: "",
                name: "edit",
                className: "edit-btn-center-adjustment",
                imageClass: "fa fa-eye",
                click: applicantDetails
            }
            ], width: "60px"
            , attributes: { class: "ob-center" }
        }
        ],

        dataSource: {
            data: challanForAdhesiveStamps.Party1
        },
        scrollable: false,
        sortable: false,
        filterable: false,
        pageable: false
    });

    if (challan.IsVerifiedByTO == "YES") {
        $("#chTOVerified").show();
        document.getElementById("isChallanVerifiedByTO").innerHTML = "Yes";
    }
    else {
        $("#chTOVerified").hide();
    }
}

function calculateDenominationTotalAmount(data) {
    total = 0;
    for (var i = 0; i < data.length; i++) {
        total += data[i].denomination * data[i].noOfStamps
    }
    return total;
}
function applicantDetails(d) {
    var grid = $('#data').data("kendoGrid");
    d.preventDefault();

    var dataItem = this.dataItem($(d.currentTarget).closest("tr"));
    document.getElementById("applicantNameText").innerHTML = dataItem.NameString;
    document.getElementById("applicantCNICText").innerHTML = dataItem.PersonCnic;
    //document.getElementById("applicantContactText").innerHTML = dataItem.PersonPhone;
    //document.getElementById("applicantAddressText").innerHTML = dataItem.PersonAddress;
    if (dataItem.PersonEmail == null || dataItem.PersonEmail == "") {
        $('#applicantEmail').hide();
    } else {
        $('#applicantEmail').show();

        //document.getElementById("").innerHTML = dataItem.PersonEmail;
        document.getElementById("applicantEmailText").innerHTML = dataItem.PersonEmail;
    }

    $("#applicantDetailedWindow").data("kendoWindow").title(applicantInfoLabel).center().open();
}
function toDate(stringDate) {
    return new Date(stringDate);
}

function formatDate(stringDate) {
    var d = toDate(stringDate);
    var day = d.getDate();
    var month = d.getMonth() + 1;
    var year = d.getFullYear();
    var date = day + "/" + month + "/" + year;
    return date;
}
function hideDivsForStampVendor() {
    $("#stampdiv").hide();
    $("#NADRAVerifyDiv").hide();
    $("#taxdiv").hide();
    $("#oldRegistryChallanDetailsDiv").hide();
    $("#deedsDetails").hide();
    $("#propertyInfo1Div").hide();
    $("#propertyInfo2Div").hide();
    $("#DCValuationMainDIV").hide();
    $("#DCValuationMainDIV2").hide();
    $("#AgentInformation").hide();
    $("#purchasersdiv").hide();
    $("#sellersdiv").hide();
    $("#DCValuationMainDIV2").hide();
    $('#refundDutiesLablel').hide();
    $("#chTOVerified").hide();
    $("#chStatusPair").hide();
    $("#chStatusPair2").show();
    $('#AdhesivechallanDiv').hide();
    $('#challanStatusGrid').hide();

}
function showDivsForStampVendor() {
    $("#stampdiv").show();
    $("#deedsDetails").show();
    $("#propertyInfo1Div").show();
    $("#AgentInformation").show();
    $("#purchasersdiv").show();
    $("#sellersdiv").show();
    $("#DCValuationMainDIV2").show();
    $('#refundDutiesLablel').show();
    $("#chTOVerified").show();
    $('#AdhesivechallanDiv').show();

}

function renderChallanForStampVendor(challanForStampVendor) {
    hideDivsForStampVendor();
    //License Details

    document.getElementById("challanNumberText").innerHTML = challan.ChallanNumber;
    document.getElementById("challanStatus2").innerHTML = challan.ChallanStatus;

    document.getElementById("districtText4").innerHTML = challanForStampVendor.stampVendorModel.DISTRICT_NAME;
    document.getElementById("tehsilText4").innerHTML = challanForStampVendor.stampVendorModel.TEHSIL_NAME;
    document.getElementById("StampVendorLocationValue4").innerHTML = challanForStampVendor.stampVendorModel.VENDING_AREA;
    //if (challanForStampVendor.stampVendorModel.TREASURY_NUMBER != null && challanForStampVendor.stampVendorModel.TREASURY_NUMBER != "")
    //    document.getElementById("TreasuryNoValue").innerHTML = challanForStampVendor.stampVendorModel.TREASURY_NUMBER;
    //else
        document.getElementById("TreasuryNoValue").innerHTML = "-";
    //document.getElementById("TreasuryNoValue").innerHTML = challanForStampVendor.stampVendorModel.TREASURY_NUMBER;
    document.getElementById("LicenseNoValue").innerHTML = challanForStampVendor.stampVendorModel.LICENSE_NUMBER;
    document.getElementById("commission4").innerHTML = challanForStampVendor.stampVendorModel.COMMISSION + "%";

    if (challanForStampVendor.stampVendorModel.ISSUE_DATE != null) {
        document.getElementById("LicenseIssueDateValue").innerHTML = formatDate(challanForStampVendor.stampVendorModel.ISSUE_DATE);
    } else {
        document.getElementById("LicenseIssueDateValue").innerHTML = challanForStampVendor.stampVendorModel.ISSUE_DATE;
    }
    if (challanForStampVendor.stampVendorModel.LICENSE_EXPIRY_DATE != null) {
        document.getElementById("LicenseExpiryDateValue").innerHTML = formatDate(challanForStampVendor.stampVendorModel.LICENSE_EXPIRY_DATE);
    } else {
        document.getElementById("LicenseExpiryDateValue").innerHTML = challanForStampVendor.stampVendorModel.LICENSE_EXPIRY_DATE;
    }
    document.getElementById("applicantQualificationText4").innerHTML = challanForStampVendor.stampVendorModel.QUALIFICATION;


    var totalPayableAmount = 0;
    //Payable Amount
    if (challanForStampVendor.isNewEnrollemntFeePaid != null && challanForStampVendor.isNewEnrollemntFeePaid == true) {
        document.getElementById("firstTimeRegfeeValue").innerHTML = returnCommas(challanForStampVendor.stampVendorModel.APPLY_NEW_ENROLLMENT_FEE_Value);
        $('#firstTimeRegfeeValues').show();
        $('#firstTimeRegfeeDiv').show();
        totalPayableAmount += challanForStampVendor.stampVendorModel.APPLY_NEW_ENROLLMENT_FEE_Value;
    }
    else {
        $('#firstTimeRegfeeValues').hide();
        $('#firstTimeRegfeeDiv').hide();
    }
    if (challanForStampVendor.isRenwalFeePaid != null && challanForStampVendor.isRenwalFeePaid == true) {
        document.getElementById("RenewalFeeValue").innerHTML = returnCommas(challanForStampVendor.stampVendorModel.APPLY_RENEWAL_FEE_Value);
        $('#RenewalFeeDiv').show();
        $('#RenewalFeeValues').show();
        totalPayableAmount += challanForStampVendor.stampVendorModel.APPLY_RENEWAL_FEE_Value;
    }
    else {
        $('#RenewalFeeDiv').hide();
        $('#RenewalFeeValues').hide();
    }
    if (challanForStampVendor.isSmartCardFeePaid != null && challanForStampVendor.isSmartCardFeePaid == true) {
        document.getElementById("SmartCardFeeValue").innerHTML = returnCommas(challanForStampVendor.stampVendorModel.APPLY_SMART_CARD_FEE_Value);
        $('#SmartCardFeeDiv').show();
        $('#SmartCardFeeValues').show();
        totalPayableAmount += challanForStampVendor.stampVendorModel.APPLY_SMART_CARD_FEE_Value;
    }
    else {
        $('#SmartCardFeeDiv').hide();
        $('#SmartCardFeeValues').hide();
    }
    document.getElementById("totalPayableAmountText4").innerHTML = returnCommas(totalPayableAmount);

    //Applicant Details
    var Party1 = challanForStampVendor.Party1;
    Party1[0].PersonCnic = Party1[0].PersonCnic;
    $('#VendorApplicantDataGrid').kendoGrid({
        columns: [{ title: Name, field: "NameString", width: "250px" },
            { title: CNIC, field: "PersonCnic", width: "250px" },
            {
                command: [{
                    text: "",
                    name: "edit",
                    className: "edit-btn-center-adjustment",
                    imageClass: "fa fa-eye",
                    click: applicantDetailsForStampVendor
                }
                ], width: "50px"
                , attributes: { class: "ob-center" }
            }
        ],

        dataSource: {
            data: Party1
        },
        scrollable: false,
        sortable: false,
        filterable: false,
        pageable: false
    });

    if (challan.IsVerifiedByTO == "YES") {
        $("#chTOVerified").show();
        document.getElementById("isChallanVerifiedByTO").innerHTML = "Yes";
        document.getElementById("Verifylbl").innerHTML = VerifiedByADC;
    }
    else {
        $("#chTOVerified").hide();
        document.getElementById("Verifylbl").innerHTML = VerifiedByTO;
    }
}
function applicantDetailsForStampVendor(d) {
    var grid = $('#data').data("kendoGrid");
    d.preventDefault();

    var dataItem = this.dataItem($(d.currentTarget).closest("tr"));
    document.getElementById("applicantNameText").innerHTML = dataItem.NameString;
    document.getElementById("applicantCNICText").innerHTML = dataItem.PersonCnic;
    //document.getElementById("applicantContactText").innerHTML = dataItem.PersonPhone;
    //document.getElementById("applicantAddressText").innerHTML = dataItem.PersonAddress;
    if (dataItem.PersonEmail == null || dataItem.PersonEmail == "") {
        $('#applicantEmail').hide();
    } else {
        $('#applicantEmail').show();

        //document.getElementById("").innerHTML = dataItem.PersonEmail;
        document.getElementById("applicantEmailText").innerHTML = dataItem.PersonEmail;
    }

    $("#applicantDetailedWindow").data("kendoWindow").title(applicantInfoLabel).center().open();
}

function addDashesInCNIC(f) {
    f = f.substr(0, 5) + "-" + f.substr(5, 7) + "-" + f.substr(12, 1);
    return f;
}

function hideDivsForCopyingFee() {
    $("#stampdiv").hide();
    $("#NADRAVerifyDiv").hide();
    $("#taxdiv").hide();
    $("#oldRegistryChallanDetailsDiv").hide();
    $("#deedsDetails").hide();
    $("#propertyInfo1Div").hide();
    $("#propertyInfo2Div").hide();
    $("#DCValuationMainDIV").hide();
    $("#DCValuationMainDIV2").hide();
    $("#AgentInformation").hide();
    $("#purchasersdiv").hide();
    $("#sellersdiv").hide();
    $("#DCValuationMainDIV2").hide();
    $('#refundDutiesLablel').hide();
    $("#chTOVerified").hide();
    $("#chStatusPair").hide();
    $("#chStatusPair2").show();
    $('#AdhesivechallanDiv').hide();
    $('#challanStatusGrid').hide();
    $('#StampVendorChallanDiv').hide();
    $('#WhitePaperchallanDiv').hide();
    
}
function showDivsForCopyingFee() {
    $("#stampdiv").show();
    $("#deedsDetails").show();
    $("#propertyInfo1Div").show();
    $("#AgentInformation").show();
    $("#purchasersdiv").show();
    $("#sellersdiv").show();
    $("#DCValuationMainDIV2").show();
    $('#refundDutiesLablel').show();
    $("#chTOVerified").show();
    $('#AdhesivechallanDiv').show();
    $('#StampVendorChallanDiv').show();
}
function hideDivsForWhitePaperChallan() {
    $("#stampdiv").hide();
    $("#NADRAVerifyDiv").hide();
    $("#taxdiv").hide();
    $("#oldRegistryChallanDetailsDiv").hide();
    $("#deedsDetails").hide();
    $("#propertyInfo1Div").hide();
    $("#propertyInfo2Div").hide();
    $("#DCValuationMainDIV").hide();
    $("#DCValuationMainDIV2").hide();
    $("#AgentInformation").hide();
    $("#purchasersdiv").hide();
    $("#sellersdiv").hide();
    $("#DCValuationMainDIV2").hide();
    $('#refundDutiesLablel').hide();
    $("#chTOVerified").hide();
    $("#chStatusPair").hide();
    $("#chStatusPair2").show();
    $('#AdhesivechallanDiv').hide();
    $('#challanStatusGrid').hide();
    $('#StampVendorChallanDiv').hide();
    $("#propertyInfo1Div").hide();
    $("#purchasersdiv").hide();
    $("#sellersdiv").hide();
    $("#DCValuationMainDIV2").hide();
    $('#refundDutiesLablel').hide();
    $("#chTOVerified").hide();
    $('#AdhesivechallanDiv').hide();
    $('#StampVendorChallanDiv').hide();
    $('#CopyingFeechallanDiv').hide();
   
    
    
}
function showDivsForWhitePaperChallan() {
    $("#stampdiv").show();
    $("#deedsDetails").show();
    //$("#propertyInfo1Div").show();
    $("#AgentInformation").show();
    //$("#purchasersdiv").show();
    //$("#sellersdiv").show();
    //$("#DCValuationMainDIV2").show();
    //$('#refundDutiesLablel').show();
    //$("#chTOVerified").show();
    //$('#AdhesivechallanDiv').show();
    //$('#StampVendorChallanDiv').show();
}

function renderChallanForCopyingFee(challan) {

    hideDivsForCopyingFee();
    document.getElementById("challanNumberText").innerHTML = challan.ChallanNumber;
    document.getElementById("challanStatus2").innerHTML = challan.ChallanStatus;

    var challanAmountView = challan.TotalAmount;
    document.getElementById("challanAmountText5").innerHTML = returnCommas(challanAmountView);
    document.getElementById("totalPayableAmountText5").innerHTML = returnCommas(challanAmountView);

    document.getElementById("districtText5").innerHTML = challan.DistrictString;
    document.getElementById("tehsilText5").innerHTML = challan.TalukaString;

    document.getElementById("deednotext").innerHTML = challan.DeedNumber;
    document.getElementById("booknotext").innerHTML = challan.BookNumber;
    document.getElementById("volumenotext").innerHTML = challan.VolumeNumber;
    document.getElementById("registrationdatetext").innerHTML = formatDate(challan.RegistryDate);
    document.getElementById("reasonfornaqaltext").innerHTML = challan.ReasonForNaqal;

    document.getElementById("agentNameText5").innerHTML = challan.AgentName;
    document.getElementById("agentCninText5").innerHTML = challan.AgentCnic;
    if (challan.AgentEmail == null || challan.AgentEmail == "") {
        $('#agentEmailLabel5').hide();
        $('#agentEmailText5').hide();
    }
    else {
        $('#agentEmailLabel5').show();
        $('#agentEmailText5').show();
        document.getElementById("agentEmailText5").innerHTML = challan.AgentEmail;
    }

    $('#ApplicantDataGrid5').kendoGrid({
        columns: [{ title: Name, field: "NameString", width: "250px" },
            { title: Cnic, field: "PersonCnic", width: "250px" },
            {
                command: [{
                    text: "",
                    name: "edit",
                    className: "edit-btn-center-adjustment",
                    imageClass: "fa fa-eye",
                    click: applicantDetailsCopyingFee
                }
                ], width: "50px"
                , attributes: { class: "ob-center" }
            }
        ],

        dataSource: {
            data: challan.Party1
        },
        scrollable: false,
        sortable: false,
        filterable: false,
        pageable: false
    });
    if (challan.IsVerifiedByTO == "YES") {
        $("#chTOVerified").show();
        $("#Verifylbl").html(VerifiedByCAA);
        document.getElementById("isChallanVerifiedByTO").innerHTML = "Yes";
    }
    else {
        $("#Verifylbl").html(VerifiedByTO);
        $("#chTOVerified").hide();
    }
}

function renderChallanForWhitePaperChallan(challan) {

    hideDivsForWhitePaperChallan();

    document.getElementById("challanNumberText").innerHTML = challan.ChallanNumber;
    document.getElementById("challanStatus2").innerHTML = challan.ChallanStatus;

    var challanAmountView = challan.TotalAmount;
    document.getElementById("challanAmountText6").innerHTML = returnCommas(challanAmountView);
    document.getElementById("totalPayableAmountText5").innerHTML = returnCommas(challanAmountView);

    document.getElementById("districtText6").innerHTML = challan.DistrictString;
    document.getElementById("branchText6").innerHTML = challan.BranchString;

    document.getElementById("purposetext").innerHTML = challan.PurposeOfWhitePaperString;
    document.getElementById("denominationtext").innerHTML = challan.DenominationOfWhitePaper;
    document.getElementById("reasontext").innerHTML = challan.ReasonOfWhitePaper;

    document.getElementById("agentNameText6").innerHTML = challan.AgentName;
    document.getElementById("agentCninText6").innerHTML = challan.AgentCnic;
    if (challan.AgentEmail == null || challan.AgentEmail == "") {
        $('#agentEmailLabel6').hide();
        $('#agentEmailText6').hide();
    }
    else {
        $('#agentEmailLabel6').show();
        $('#agentEmailText6').show();
        document.getElementById("agentEmailText6").innerHTML = challan.AgentEmail;
    }

    $('#ApplicantDataGrid6').kendoGrid({
        columns: [{ title: Name, field: "NameString", width: "250px" },
            { title: Cnic, field: "PersonCnic", width: "250px" },
            {
                command: [{
                    text: "",
                    name: "edit",
                    className: "edit-btn-center-adjustment",
                    imageClass: "fa fa-eye",
                    click: applicantDetailsCopyingFee
                }
                ], width: "50px"
                , attributes: { class: "ob-center" }
            }
        ],

        dataSource: {
            data: challan.Party1
        },
        scrollable: false,
        sortable: false,
        filterable: false,
        pageable: false
    });
    //if (challan.IsVerifiedByTO == "YES") {
    //    $("#chTOVerified").show();
    //    $("#Verifylbl").html(VerifiedByCAA);
    //    document.getElementById("isChallanVerifiedByTO").innerHTML = "Yes";
    //}
    //else {
    //    $("#Verifylbl").html(VerifiedByTO);
    //    $("#chTOVerified").hide();
    //}
}

function applicantDetailsCopyingFee(d) {
    var grid = $('#data').data("kendoGrid");
    d.preventDefault();

    var dataItem = this.dataItem($(d.currentTarget).closest("tr"));
    document.getElementById("applicantNameText").innerHTML = dataItem.NameString;
    document.getElementById("applicantCNICText").innerHTML = dataItem.PersonCnic;
    if (dataItem.PersonEmail == null || dataItem.PersonEmail == "") {
        $('#applicantEmail').hide();
    } else {
        $('#applicantEmail').show();

        //document.getElementById("").innerHTML = dataItem.PersonEmail;
        document.getElementById("applicantEmailText").innerHTML = dataItem.PersonEmail;
    }

    $("#applicantDetailedWindow").data("kendoWindow").title(applicantInfoLabel).center().open();
}

//$(document).keydown(function (event) {
//    if (event.keyCode == 123) { // Prevent F12
//        return false;
//    } else if (event.ctrlKey && event.shiftKey && event.keyCode == 73) { // Prevent Ctrl+Shift+I        
//        return false;
//    }
//});
//$(document).on("contextmenu", function (e) {
//    e.preventDefault();
//})