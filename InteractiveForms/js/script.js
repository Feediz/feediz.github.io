// set default items
// credit card payment type
$("#payment").val("Credit Card");

// setting focus on first field
$("form:first *:input[type!=hidden]:first").focus();

// hide the color div initially
$("#colors-js-puns").hide();

// ================================================================
// ==============  Basic info section =============================
// ================================================================
// including and displaying if job role selected is 'Other'
const jobRoleElement = $("#title");

// hide other title initially
$("#other-title").hide();

jobRoleElement.change(e => {
  const jobRoleSelected = e.target.value;
  if (jobRoleSelected === "other") {
    // show other title if selected role is other
    $("#other-title").show();
  } else {
    // hide other title selected role is not other
    $("#other-title").hide();
  }
});

// ================================================================
// ==============  t-shirt info section ===========================
// ================================================================

// reference design select element
const designElement = $("#design");

// reference color select element
const $colorElement = $("#color");

// reference color select options
const $colorElementOptions = $colorElement.children();

// initially hide color options
$colorElementOptions.each(i => {
  // starting with one since select options indexes are not zero based
  i = i + 1;

  // adding css style to hide options
  $("#color :nth-child(" + i + ")").css("display", "none");
});
// append and select the option telling user to select theme first
$colorElement.append('<option value="">Please select a T-shirt theme</option>');

$colorElement.val("");

designElement.change(e => {
  const selectedDesign = e.target.value;

  // starting with one since select options indexes are not zero based
  let i = 1;

  // hide the select t-shirt option under the color drop down
  $("option:contains(Please select a T-shirt theme)").hide();

  // hide the select theme option under the design drop down
  $("option:contains(Select Theme)").hide();

  if (designElement.value !== "") {
    $("#colors-js-puns").show();
    if (selectedDesign === "js puns") {
      $colorElementOptions.each(i => {
        i = i + 1;
        const $currentOption = $("#color :nth-child(" + i + ")");

        if ($currentOption.val() === "cornflowerblue") {
          $currentOption.css("display", "");
        } else if ($currentOption.val() === "darkslategrey") {
          $currentOption.css("display", "");
        } else if ($currentOption.val() === "gold") {
          $currentOption.css("display", "");
        }

        if ($currentOption.val() === "tomato") {
          $currentOption.css("display", "none");
        } else if ($currentOption.val() === "steelblue") {
          $currentOption.css("display", "none");
        } else if ($currentOption.val() === "dimgrey") {
          $currentOption.css("display", "none");
        }
        // select the corn flower option
        $colorElement.val($("#color :nth-child(1)").val());
        // $colorElement.val("cornflowerblue");
      });
    } else if (selectedDesign === "heart js") {
      $colorElementOptions.each(i => {
        // starting with one since select options indexes are not zero based
        i = i + 1;
        const $currentOption = $("#color :nth-child(" + i + ")");
        if ($currentOption.val() === "tomato") {
          $currentOption.css("display", "");
        } else if ($currentOption.val() === "steelblue") {
          $currentOption.css("display", "");
        } else if ($currentOption.val() === "dimgrey") {
          $currentOption.css("display", "");
        } else if ($currentOption.val() === "") {
          $currentOption.css("display", "none");
        }

        if ($currentOption.val() === "cornflowerblue") {
          $currentOption.css("display", "none");
        } else if ($currentOption.val() === "darkslategrey") {
          $currentOption.css("display", "none");
        } else if ($currentOption.val() === "gold") {
          $currentOption.css("display", "none");
        }

        // select the tomato option
        $colorElement.val($("#color :nth-child(4)").val());
      });
    } else if (selectedDesign === "") {
      $colorElementOptions.each(i => {
        // starting with one since select options indexes are not zero based
        i = i + 1;
        const $currentOption = $("#color :nth-child(" + i + ")");
        if ($currentOption.val() === "tomato") {
          $currentOption.css("display", "none");
        } else if ($currentOption.val() === "steelblue") {
          $currentOption.css("display", "none");
        } else if ($currentOption.val() === "dimgrey") {
          $currentOption.css("display", "none");
        } else if ($currentOption.val() === "") {
          $currentOption.css("display", "");
        }

        if ($currentOption.val() === "cornflowerblue") {
          $currentOption.css("display", "none");
        } else if ($currentOption.val() === "darkslategrey") {
          $currentOption.css("display", "none");
        } else if ($currentOption.val() === "gold") {
          $currentOption.css("display", "none");
        }

        $colorElement.val("");
      });
    }
  }
});

// ================================================================
// ==============  Register for activities section ================
// ================================================================
// get reference all elements with in the activities class
//const checkboxes = document.querySelectorAll(".activities input");
const checkboxes = $(".activities input:checkbox");
const checkBoxesFieldSet = document.querySelector(".activities");

// runningTotalCost will hold total cost for selected activities
let runningTotalCost = 0;
const runningTotalCostUI = document.createElement("span");
runningTotalCostUI.innerHTML = "Total Cost: $" + runningTotalCost;
runningTotalCostUI.id = "runningCostSpan";

checkBoxesFieldSet.parentNode.insertBefore(
  runningTotalCostUI,
  checkBoxesFieldSet.nextElementSibling
);

checkBoxesFieldSet.addEventListener("change", e => {
  const clicked = e.target;
  let clickedCost = clicked.attributes["data-cost"].value;
  clickedCost = clickedCost.substr(1);

  if (e.target.checked) {
    runningTotalCost = parseInt(runningTotalCost) + parseInt(clickedCost);
  } else {
    runningTotalCost = parseInt(runningTotalCost) - parseInt(clickedCost);
  }

  // Update running cost
  runningTotalCostUI.innerHTML = "Total Cost: $" + runningTotalCost;
  let clickedTime = 0;
  if (typeof clicked.attributes["data-day-and-time"] !== "undefined") {
    clickedTime = clicked.attributes["data-day-and-time"].value;
  }

  for (let i = 0; i < checkboxes.length; i++) {
    // initialize variable to hold date and time information for comparison
    let currentTime = 0;
    if (
      typeof checkboxes[i].getAttribute("data-day-and-time") !== "undefined"
    ) {
      currentTime = checkboxes[i].getAttribute("data-day-and-time");
    }

    // disable other workshops with same date and time as the selected workshops
    if (clickedTime === currentTime && clicked !== checkboxes[i]) {
      if ($(clicked).prop("checked")) {
        // set up an element to add to the dom
        const spanTag = document.createElement("span");
        // adding html text to show users why workshop slot not available
        spanTag.innerHTML =
          "<b style='color:red;' >This time slot isn't available.</b>";
        // adding span element to the dom
        checkboxes[i].parentNode.insertBefore(
          spanTag,
          checkboxes[i].nextSibling.nextSibling
        );
        // disable element if time slot is same as another one
        checkboxes[i].setAttribute("disabled", "true");
      } else {
        // removing informational span element from dom
        checkboxes[i].nextSibling.nextSibling.remove();
        // enable element
        checkboxes[i].removeAttribute("disabled");
      }
    }
  }
});

// ================================================================
// ==============  payment info section ===========================
// ================================================================

// get a reference to paypal
const paypalDiv = $("#paypal");
// hide paypal info at first
paypalDiv.hide();

// get a reference to bitcoin
const bitCoinDiv = $("#bitcoin");
// hide bitcoin info at first
bitCoinDiv.hide();

// get a reference to credit card div
const ccDiv = $("#credit-card");

const paymentMethodSelect = $("#payment");
paymentMethodSelect.on("change", e => {
  let selectedPaymentMethod = e.target.value;

  if (selectedPaymentMethod === "Credit Card") {
    // show cc and hide paypal and bitcoin
    bitCoinDiv.hide();
    ccDiv.show();
    paypalDiv.hide();
  } else if (selectedPaymentMethod === "PayPal") {
    // show paypal and hide bitcoin and cc
    bitCoinDiv.hide();
    ccDiv.hide();
    paypalDiv.show();
  } else if (selectedPaymentMethod === "Bitcoin") {
    //show bitcoin and hide cc and paypal
    bitCoinDiv.show();
    ccDiv.hide();
    paypalDiv.hide();
  }
});

// ================================================================
// ==============  validator functions ============================
// ================================================================

// validate credit card in real time
$("#credit-card").on("input", e => {
  validateCC();
});

// validate zip code in real time
$("#zip").on("input", e => {
  validateZipCode();
});

// validate cvv in real time
$("#cvv").on("input", e => {
  validateCVV();
});

$("form").on("input submit", e => {
  e.preventDefault();
  const eventType = e.type;
  const element = e.target;
  const elementID = element.id;

  let isFormValid = true;

  // validate name field on submit and as user types
  if (elementID === "name" || eventType === "submit") {
    if (!validateName()) {
      isFormValid = false;
    }
  }

  // validate email field on submit and as user types
  if (elementID === "mail" || eventType === "submit") {
    if (!validateEmail()) {
      isFormValid = false;
    }
  }

  if (eventType === "submit") {
    // validate that at least one event is selected on submit
    // begin
    let oneActivitySelected = false;
    checkboxes.each(i => {
      if (checkboxes[i].checked) {
        oneActivitySelected = true;
      }
    });

    if (oneActivitySelected === false) {
      isFormValid = false;
      showValidationMessage(
        true,
        checkBoxesFieldSet,
        "You must select one activity"
      );
    } else {
      showValidationMessage(false, checkBoxesFieldSet, "");
    }
    // end
    // validate that at least one event is selected on submit

    // if payment type is cc then validate cc, zip code and cvv
    // begin
    if (!validateCC()) {
      isFormValid = false;
    }
    if (!validateZipCode()) {
      isFormValid = false;
    }
    if (!validateCVV()) {
      isFormValid = false;
    }
    // end
    // if payment type is cc then validate cc, zip code and cvv

    // submit form if form is valid
    if (isFormValid) {
      e.target.submit();
    }
  }
});

/**
 * validateCVV()
 * @return {boolean} true if valid cvv false if not
 */
function validateCVV() {
  const cvv = $("#cvv");
  const cvvValue = parseInt(cvv.val());
  if (paymentMethodSelect.val() === "Credit Card") {
    if (cvv.val().length === 3 && $.isNumeric(cvvValue)) {
      showValidationMessage(false, cvv, "");
      return true;
    } else if (cvv.val().length === 0) {
      showValidationMessage(true, cvv, "Please enter CVV");
      return false;
    } else {
      showValidationMessage(true, cvv, "Enter 3 digit long CVV.");
      return false;
    }
  } else {
    showValidationMessage(false, cvv, "");
    return true;
  }
}

/**
 * validateZipCode()
 * @return {boolean} true if valid zip code false if not
 */
function validateZipCode() {
  const zipCode = $("#zip");
  const zipCodeValue = parseInt(zipCode.val());
  if (paymentMethodSelect.val() === "Credit Card") {
    if (zipCode.val().length === 5 && $.isNumeric(zipCodeValue)) {
      showValidationMessage(false, zipCode, "");
      return true;
    } else if (zipCode.val().length === 0) {
      showValidationMessage(true, zipCode, "Please enter a zip code.");
      return false;
    } else {
      showValidationMessage(true, zipCode, "Enter 5 digit Zip code.");
      return false;
    }
  } else {
    showValidationMessage(false, zipCode, "");
    return true;
  }
}

/**
 * validateCC()
 * @return {boolean} true if valid cc number false if not
 */
function validateCC() {
  const ccNumber = $("#cc-num");
  const ccNumberValue = parseInt(ccNumber.val());
  // console.log("CC is: " + $.type(ccNumber.val()));
  if (paymentMethodSelect.val() === "Credit Card") {
    if (
      ccNumber.val().length >= 13 &&
      ccNumber.val().length <= 16 &&
      $.isNumeric(ccNumberValue)
    ) {
      showValidationMessage(false, ccNumber, "");
      return true;
    } else if (ccNumber.val().length === 0) {
      showValidationMessage(
        true,
        ccNumber,
        "Please enter a credit card number."
      );
      return false;
    } else {
      showValidationMessage(
        true,
        ccNumber,
        "Credit Card must be between 13 and 16 digits long"
      );
      return false;
    }
  } else {
    showValidationMessage(false, ccNumber, "");
    return true;
  }
}

/**
 * validateEmail()
 * @return {boolean} true if valid email false if not
 */
function validateEmail() {
  const emailElement = $("#mail");

  if (emailElement.val().length === 0) {
    showValidationMessage(true, emailElement, "Email is required");
    return false;
  } else {
    const testEmail = isValidEmail(emailElement.val());
    if (testEmail) {
      showValidationMessage(false, emailElement, "");
      return true;
    } else {
      showValidationMessage(true, emailElement, "Valid email required");
      return false;
    }
  }
}

/**
 * validateName()
 * @return {boolean} true if valid name false if not
 */
function validateName() {
  const nameElement = $("#name");

  if (nameElement.val().length === 0) {
    // name field is blank
    showValidationMessage(true, nameElement, "Name field is required");
    return false;
  } else {
    // name field is valid
    showValidationMessage(false, nameElement, "");
    return true;
  }
}

// ================================================================
// ==============  helper functions ===============================
// ================================================================

/**
 * isValidEmail()
 * @param email to be validated
 * @return {boolean} true if valid email false if not
 */
function isValidEmail(email) {
  const regEx = /^[^@]+@[^@.]+\.[a-z]+$/i;
  return regEx.test(email);
}

/**
 * showValidationMessage()
 * @param show  boolean whether to show or hide error indicator on the form element
 * @param element form element to show or hide error indicator on
 * @param message error message to display if we are displaying error message instead of indicator
 */
function showValidationMessage(show, element, message) {
  // set up span element to show error message
  const spanElement = document.createElement("div");
  spanElement.innerHTML = message;
  spanElement.id = "errorMessage";

  spanElement.style.display = "inline-block";
  $errorElement = $(element).next();
  if (show) {
    if ($errorElement.attr("id") === "errorMessage") {
      $errorElement.remove();
    }
    $(element).after(spanElement);

    $(spanElement).css("margin", "1px 0 0");
    $(element).css("border", "5px solid #cc0033");
  } else {
    if ($errorElement.attr("id") === "errorMessage") {
      $errorElement.hide();
      $errorElement.css("background-color", "");
      $errorElement.css("border", "");
    }
  }
}
