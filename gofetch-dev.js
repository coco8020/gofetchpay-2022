// NAVBAR

var navbarClicks = 0;

// when element with attribute hamburger-menu="button" is clicked increase navbarClicks by 1
document
  .querySelector('[hamburger-menu="button"]')
  .addEventListener("click", function () {
    navbarClicks++;
    // if navbarClicks is odd, set body to overflow: hidden
    if (navbarClicks % 2 != 0) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  });

// if url path is /gofetch-staff
if (window.location.pathname === "/gofetch-staff") {
  var billAmount = document.querySelector(
    '[data-staff-calculator="bill-amount"]'
  );
  var billAmountValue;

  function staffCalculator() {
    billAmountValue = billAmount.value;
    // dividir billAmountValue para 4 partes
    var billAmountValueDivided = billAmountValue / 4;

    document.querySelector(
      '[data-staff-calculator="installment-1"]'
    ).innerHTML = billAmountValueDivided;
    document.querySelector(
      '[data-staff-calculator="installment-2"]'
    ).innerHTML = billAmountValueDivided;
    document.querySelector(
      '[data-staff-calculator="installment-3"]'
    ).innerHTML = billAmountValueDivided;
    document.querySelector(
      '[data-staff-calculator="installment-4"]'
    ).innerHTML = billAmountValueDivided;
  }

  // add event listener on keyup to billAmount
  billAmount.addEventListener("keyup", staffCalculator);
  billAmount.value = 5000;
  staffCalculator();
}

// if url path is /about
if (window.location.pathname === "/about") {
  var cards = document.querySelector('[cards="card-list"]').children;
  // get element with attribute button="see=all-people"
  var seeAllPeopleButton = document.querySelector('[button="see-all-people"]');

  // if screen is larger than 991px
  if (window.innerWidth > 991) {
    for (var i = 0; i < cards.length; i++) {
      if (i > 5) {
        cards[i].style.display = "none";
      }
    }

    function showCards() {
      for (var i = 0; i < cards.length; i++) {
        if (i > 5) {
          cards[i].style.display = "block";
        }
      }

      // set focus to seventh child of element with attribute cards="card-list"
      cards[5].focus();

      // set display none to seeAllPeopleButton
      seeAllPeopleButton.style.display = "none";
    }

    seeAllPeopleButton.addEventListener("click", showCards);
  } else if (window.innerWidth <= 991) {
    for (var i = 0; i < cards.length; i++) {
      if (i > 3) {
        cards[i].style.display = "none";
      }
    }

    function showCards() {
      for (var i = 0; i < cards.length; i++) {
        if (i > 3) {
          cards[i].style.display = "block";
        }
      }

      // set focus to seventh child of element with attribute cards="card-list"
      cards[4].focus();

      // set display none to seeAllPeopleButton
      seeAllPeopleButton.style.display = "none";
    }

    seeAllPeopleButton.addEventListener("click", showCards);
  }
}

// CALCULATOR

// if url path is /how-it-works
if (window.location.pathname === "/how-it-works") {
  function calculatorFunction() {
    var billValue = document.querySelector('[calculator="input"]').value;
    var insuranceReinbursementPercentage = document.querySelector(
      "input:checked"
    ).value;
    var reducedLoanAmount = -Math.abs(
      billValue - billValue * insuranceReinbursementPercentage
    );
    var interestRateByMonth = 0.1 / 12;

    function PMT(rate, nperiod, pv, fv, type) {
      if (!fv) fv = 0;
      if (!type) type = 0;

      if (rate == 0) return -(pv + fv) / nperiod;

      var pvif = Math.pow(1 + rate, nperiod);
      var pmt = (rate / (pvif - 1)) * -(pv * pvif + fv);

      if (type == 1) {
        pmt /= 1 + rate;
      }

      return pmt;
    }

    var installmentAmount3 = PMT(
      interestRateByMonth,
      3,
      reducedLoanAmount,
      0,
      1
    ).toFixed(2);
    var totalPaymentsByBorrower3 = (installmentAmount3 * 3).toFixed(2);
    var totalInterestCost3 = (
      totalPaymentsByBorrower3 - Math.abs(reducedLoanAmount)
    ).toFixed(2);

    var installmentAmount6 = PMT(
      interestRateByMonth,
      6,
      reducedLoanAmount,
      0,
      1
    ).toFixed(2);
    var totalPaymentsByBorrower6 = (installmentAmount6 * 6).toFixed(2);
    var totalInterestCost6 = (
      totalPaymentsByBorrower6 - Math.abs(reducedLoanAmount)
    ).toFixed(2);

    document.querySelector(
      '[calculator="3-month-installment"]'
    ).innerHTML = installmentAmount3;
    document.querySelector(
      '[calculator="3-month-interest"]'
    ).innerHTML = totalInterestCost3;
    document.querySelector(
      '[calculator="3-month-total"]'
    ).innerHTML = totalPaymentsByBorrower3;

    document.querySelector(
      '[calculator="6-month-installment"]'
    ).innerHTML = installmentAmount6;
    document.querySelector(
      '[calculator="6-month-interest"]'
    ).innerHTML = totalInterestCost6;
    document.querySelector(
      '[calculator="6-month-total"]'
    ).innerHTML = totalPaymentsByBorrower6;

    document.querySelector('[calculator="claim-amount"]').innerHTML = (
      billValue * insuranceReinbursementPercentage
    ).toFixed(2);
    document.querySelector(
      '[calculator="remaining-payment"]'
    ).innerHTML = Math.abs(
      billValue - billValue * insuranceReinbursementPercentage
    ).toFixed(2);
  }

  function calculatorInput() {
    var billValue = document.querySelector('[calculator="input"]').value;

    calculatorFunction();
  }

  function fixedValueButton(buttonValue) {
    document.querySelector('[calculator="input"]').value = buttonValue;
    calculatorFunction();
  }

  if (document.querySelector('input[name="Claim-Amount"]')) {
    document.querySelectorAll('input[name="Claim-Amount"]').forEach((elem) => {
      elem.addEventListener("change", function (event) {
        calculatorFunction();
      });
    });
  }

  document
    .querySelector('[calculator="input"]')
    .addEventListener("keyup", calculatorInput);
  document.querySelector('[calculator="input"]').value = "5000";
  calculatorFunction();
}

// THE PACK SLIDER

if (window.location.pathname === "/the-pack") {
  // SLICK SLIDER
  $(document).ready(function () {
    $(".featured-blog-collection_list").slick({
      accessibility: true,
      focusOnChange: true,
      infinite: true,
      slidesToShow: 1,
      arrows: false,
      draggable: true,
      dots: true,
      appendDots: $(".slider-dots-wrapper"),
      dotsClass: "slider-dots-list"
    });
  });
}

// DONT HAVE INSURANCE SLIDER

if (window.location.pathname === "/dont-have-insurance") {
  $(document).ready(function () {
    $(".blog-carousel-collection_list").slick({
      accessibility: true,
      focusOnChange: true,
      nextArrow: $("#blog-carousel-next-arrow"),
      prevArrow: $("#blog-carousel-prev-arrow"),
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 3,
      responsive: [
        {
          breakpoint: 991,
          settings: "unslick"
        }
      ]
    });
  });
}
