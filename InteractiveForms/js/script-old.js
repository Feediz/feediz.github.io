// ================================================================
// ==============  Basic info section =============================
// ================================================================
// setting focus on first field
$("form:first *:input[type!=hidden]:first").focus();

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
$colorElement.append(new Option("Please select a T-shirt theme", ""));
$colorElement.val("");

designElement.change(e => {
  const selectedDesign = e.target.value;

  if (designElement.value !== "") {
    if (selectedDesign === "js puns") {
      $colorElementOptions.each(i => {
        // starting with one since select options indexes are not zero based
        i = i + 1;
        const $currentOption = $("#color :nth-child(" + i + ")");
        if ($currentOption.val() === "cornflowerblue") {
          $currentOption.css("display", "");
        } else if ($currentOption.val() === "darkslategrey") {
          $currentOption.css("display", "");
        } else if ($currentOption.val() === "gold") {
          $currentOption.css("display", "");
        } else if ($currentOption.val() === "") {
          $currentOption.css("display", "none");
        }

        if ($currentOption.val() === "tomato") {
          $currentOption.css("display", "none");
        } else if ($currentOption.val() === "steelblue") {
          $currentOption.css("display", "none");
        } else if ($currentOption.val() === "dimgrey") {
          $currentOption.css("display", "none");
        }

        $colorElement.val("cornflowerblue");
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

        $colorElement.val("tomato");
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
$("form").on("change", e => {
  const typedID = e.target.id;
  const typedValue = e.target.value;

  // validate name field
  if (typedID === "name") {
    validateName(typedValue, typedID);
  }

  // validate email field
  if (typedID === "mail") {
    validateEmail(typedValue, typedID);
  }

  // User must select at least one checkbox under the "Register for Activities" section of the form.
  // validate email field
  console.log(typedID);
  if (typedID === "payment" || typedID === "cc-num") {
    //validateEmail(typedValue, typedID);
    console.log("Calling validatePayment");
    validatePayment(typedValue, typedID);
  }
  // If the selected payment option is "Credit Card," make sure the user has supplied a Credit Card number, a Zip Code, and a 3 number CVV value before the form can be submitted.

  // Credit Card field should only accept a number between 13 and 16 digits.

  // The Zip Code field should accept a 5-digit number.

  // The CVV should only accept a number that is exactly 3 digits long.
});

function validatePayment(typedValue, typedID) {
  if (typedValue === "Credit Card") {
    // if cc selected
    // cc number
    // zip code
    //cvv
    const cvv = $("#cvv").val();
    if (cvv.length !== 3) {
      //return false;
      showValidationMessage(
        true,
        $("#" + typedID),
        "CVV needs to be 3 digit long."
      );
    } else {
      showValidationMessage(false, $("#" + typedID), "");
    }

    const ccNumber = $("#cc-num").val();
    if (
      !(ccNumber.length >= 13 && ccNumber.length <= 16 && $.isNumeric(ccNumber))
    ) {
      //return false;
      console.log("sadjkf");
      showValidationMessage(
        true,
        $("#" + typedID),
        "Credit card needs to be between 13 and 16 digit long and numeric."
      );
    } else {
      console.log("sadjkf");
      showValidationMessage(false, $("#" + typedID), "");
    }

    const ccZipCode = $("#zip").val();
    if (!(ccZipCode.length === 5 && $.isNumeric(ccZipCode))) {
      // return false;
      showValidationMessage(
        true,
        $("#" + typedID),
        "Zip Code needs to be 5 digit long."
      );
    } else {
      showValidationMessage(false, $("#" + typedID), "");
    }

    //showValidationMessage(true, $("#" + typedID), "Name is required");
  }
}

function validateName(typedValue, typedID) {
  if (typedValue.length === 0) {
    showValidationMessage(true, $("#" + typedID), "Name is required");
  } else {
    showValidationMessage(false, $("#" + typedID), "Name is required");
  }
}

function validateEmail(typedValue, typedID) {
  const regEx = /^[^@]+@[^@.]+\.[a-z]+$/i;
  //return regEx.test(typedValue);

  if (typedValue.length === 0) {
    showValidationMessage(true, $("#" + typedID), "Email is required");
  } else {
    const testEmail = isValidEmail(typedValue);
    console.log(typedValue + " is ::: " + testEmail);
    if (testEmail) {
      showValidationMessage(false, $("#" + typedID), "");
    } else {
      showValidationMessage(true, $("#" + typedID), "Valid email required");
    }
  }
}
$("form").on("submit", e => {
  e.preventDefault();
  //Name field can't be blank.
  let name = $("#name").val();
  if (name.length === 0) {
    showValidationMessage(true, $("#name"), "Name is required");
  }
  //Email field must be a validly formatted e-mail address (you don't have to check that it's a real e-mail address, just that it's formatted like one: dave@teamtreehouse.com for example.
  let email = $("#mail").val();

  // User must select at least one checkbox under the "Register for Activities" section of the form.

  // If the selected payment option is "Credit Card," make sure the user has supplied a Credit Card number, a Zip Code, and a 3 number CVV value before the form can be submitted.

  // Credit Card field should only accept a number between 13 and 16 digits.

  // The Zip Code field should accept a 5-digit number.

  // The CVV should only accept a number that is exactly 3 digits long.
  alert("form submitted");
  return false;
});

// ================================================================
// ==============  helper functions ===============================
// ================================================================
// Must be a valid email address my@email.com
function isValidEmail(email) {
  const regEx = /^[^@]+@[^@.]+\.[a-z]+$/i;
  return regEx.test(email);
}

function showValidationMessage(show, element, message) {
  // set up span element to show error message
  const spanElement = document.createElement("span");
  spanElement.innerHTML = message;
  spanElement.id = "errorMessage";

  if (show) {
    spanElement.style.display = "inherit";
    $(element).after(spanElement);
  } else {
    //spanElement.style.display = "inherit";
    $("#errorMessage").remove();
  }
}

const testEmail = "my@email.com";
const ttt = isValidEmail(testEmail);
console.log(testEmail + " " + ttt);
