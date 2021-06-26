// Function to verify that the phone number is correct.
// Here, I validate for (12345), but you have to change that for a phone validation
// Tutorials on Regular expressions
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
// https://flaviocopes.com/javascript-regular-expressions/
// Regular expressions can get complex, you can think in terms of a series of characters
// or numbers


function validatePhone(txtPhone) {
    var a = document.getElementById(txtPhone).value;
    var filter = /(\u0028)(\d{3})(\u0029)(\x20?)(\d{3})(\u002D)(\d{4})$/;
    if (filter.test(a)) {
        return true;
    }
    else {
        return false;
    }
}


function validateCredit(txtCredit) {
    var b = document.getElementById(txtCredit).value;
    var filter = /(\d{4})(\x20?)(\d{4})(\x20?)(\d{4})(\x20?)(\d{4})$/;
    if (filter.test(b)) {
        return true;
    }
    else {
        return false;
    }
}


// Using date restrictions on datepicker
// Document of datepicker is here: https://api.jqueryui.com/datepicker/
// The following code shows how to set specific dates to exclude, as well as Sundays (Day 0)
// Make sure in your version that you associate Days to remove with Experts (e.g. John doesn't work Mondays)
var unavailableDates = ["06/29/2020","07/07/2020","07/10/2020"];
var unavailableBob = ["06/30/2021","07/07/2021","07/14/2021","07/21/2021","07/28/2021","08/04/2021","08/11/2021","08/18/2021","08/25/2021","09/01/2021","09/08/2021","09/15/2021","09/22/2021","09/29/2021","10/06/2021","10/13/2021","10/20/2021","10/27/2021"];
var unavailableSnoop = ["06/29/2021","07/06/2021","07/13/2021","07/20/2021","07/27/2021","08/03/2021","08/10/2021","08/17/2021","08/24/2021","08/31/2021","09/07/2021","09/14/2021","09/21/2021","09/28/2021","10/05/2021","10/12/2021","10/19/2021","10/26/2021"];
var unavailableDonald = ["06/28/2021","07/05/2021","07/12/2021","07/19/2021","07/26/2021","08/02/2021","08/09/2021","08/16/2021","08/23/2021","08/30/2021","09/06/2021","09/13/2021","09/20/2021","09/27/2021","10/04/2021","10/11/2021","10/18/2021","10/25/2021"];
const setDateFormat = "mm/dd/yy";

function disableDates(date) {
    // Sunday is Day 0, disable all Sundays
    if (date.getDay() === 0)
        return [false];
    var string = jQuery.datepicker.formatDate(setDateFormat, date);
    if ($('#Bob').prop('checked')){
        return [ unavailableBob.indexOf(string) === -1 ]
    }
    if ($('#Snoop').prop('checked')){
        return [ unavailableSnoop.indexOf(string) === -1 ]
    }
    if ($('#Donald').prop('checked')){
        return [ unavailableDonald.indexOf(string) === -1 ]
    }
    return [ unavailableDates.indexOf(string) === -1 ]
}


// HERE, JQuery "LISTENING" starts
$(document).ready(function(){

    // phone validation, it calls validatePhone
    // and also some feedback as an Alert + putting a value in the input that shows the format required
    // the "addClass" will use the class "error" defined in style.css and add it to the phone input
    // The "error" class in style.css defines yellow background and red foreground
    $("#phone").on("change", function(){
        if (!validatePhone("phone")){
            alert("Wrong format for phone!"+"\r\n"+"\r\n"+"Please use this format : (XXX) XXX-XXXX");
            $("#phone").val("(xxxx)");
            $("#phone").addClass("error");
        }
        else {
            $("#phone").removeClass("error");
        }
    });

    // credit card validation, it calls validateCredit
    // and also some feedback as an Alert + putting a value in the input that shows the format required
    // the "addClass" will use the class "error" defined in style.css and add it to the credit card input
    // The "error" class in style.css defines yellow background and red foreground
    $("#credit").on("change", function(){
        if (!validateCredit("credit")){
            alert("Wrong format for credit card!"+"\r\n"+"\r\n"+"Please use this format : XXXX XXXX XXXX XXXX");
            $("#credit").val("XXXX XXXX XXXX XXXX");
            $("#credit").addClass("error");
        }
        else {
            $("#credit").removeClass("error");
        }
    });

    // To change the style of the calender, look in jqueryui.com, under Themes, in the ThemeRoller Gallery
    // You can try different themes (the names are under the calendars) / This is Excite Bike
    // To use a different theme you must include its css in your HTML file.
    // The one I included in my HTML is the Excite Bike, but you can try others

    // Also, here is a good tutorial for playing with the datepicker in https://webkul.com/blog/jquery-datepicker/
    // Datepicker is also documented as one of the widgets here: https://api.jqueryui.com/category/widgets/
    $( "#dateInput" ).datepicker(
        {
            dateFormat: setDateFormat,
            // no calendar before June 1rst 2020
            minDate: new Date('06/27/2021'),
            maxDate: '+4M',
            // used to disable some dates
            beforeShowDay: $.datepicker.noWeekends,
            beforeShowDay: disableDates
        }
    );


    // Look at the different events on which an action can be performed
    // https://www.w3schools.com/jquery/jquery_events.asp
    // Here, we put
    $("#debit").on("mouseenter", function(){
        $("#debit").addClass("showInput");
    });

    $("#debit").on("mouseleave", function(){
        $("#debit").removeClass("showInput");
    });

    // https://jqueryui.com/tooltip/
    // The class "highlight" used here is predefined in JQuery UI
    // the message of the tooltip is encoded in the input (in the HTML file)
    $("#debit").tooltip({
        classes: {
            "ui-tooltip": "highlight"
        }
    });


});
