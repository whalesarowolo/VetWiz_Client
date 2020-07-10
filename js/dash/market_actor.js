let subscription_status = document.getElementById("subscription_status");
let sms_button = document.getElementById("sms_sending_button");

function myFunction(event, topup_amount) {
  if ($("#topupConfirm").length) {
    $("#topupConfirm").css("display", "none");
  }
  var target_ele = $(event.target),
    the_i = $(target_ele).children();
  target_parent_array = $(event.target).parent().children();
  $.each(target_parent_array, (elsa) => {
    var the_check = $(target_parent_array[elsa]).children();
    $(the_check[0]).removeClass("fa-check-circle");
  });

  // Get all the siblings and remove the check mark from their stylings
  console.log("Amount: " + topup_amount);

  // Now add the check mark to the element with current focus

  $(the_i[0]).addClass("fa-check-circle");
  $(target_ele).css("background-color", "#00d1b2");
  //target_ele.classList.toggle('fa-check-circle');
  //let amount_to_topup_by = event.target
  $("#money_holder")
    .empty()
    .append("₦" + numberWithCommas(topup_amount) + " ?");
  $("#figu").html(topup_amount);
  $("#topupConfirm").fadeIn("fast");
}

function call_top_up() {
  var amount = $("#figu").text();
  //converted_amount = amount * 100;
  const my_token = localStorage.getItem("access_token");
  var myHeaders = new Headers({
    "Content-Type": "application/json",
    Authorization: my_token,
  });

  const call_API =
    "https://farm-aid-backend.herokuapp.com/api/topup/paystack_init/" + amount;
  console.log("The top up amount" + numberWithCommas(amount));
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });

  swalWithBootstrapButtons
    .fire({
      title: "Top up with ₦" + numberWithCommas(amount) + " ?",
      text: "",
      icon: "warning",
      allowOutsideClick: false,
      // background: '#fff url(/img/bg.jpg)',
      showCancelButton: true,
      confirmButtonText: "Yes, top up!",
      backdrop: `
    rgba(0,0,123,0.4)
    url("/img/nbg.jpg")
    left top
    no-repeat
  `,
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
      preConfirm: () => {
        var approved_request = new Request(call_API, {
          method: "GET",
          //mode: 'no-cors',
          //body: JSON.stringify(approved_msg),
          headers: new Headers({
            "Content-Type": "application/json",
            authorization: my_token,
          }),
        });
        return fetch(approved_request)
          .then(async (response) => {
            var resp = await response.json();
            if (resp.message) {
              console.log("Hahaha");
              swal.close();
              console.log("Network response from Approved: ", resp);
              window.location.replace(resp.authorization_url);
            }
          })
          .then((data) =>
            console.log("Paystack payment flow approved and started", data)
          )
          .catch((err) => {});
      },

      // end call here
    })
    .then((result) => {
      console.log("Call results here: ", result);
      if (result.value) {
        // My test call here

        swalWithBootstrapButtons.fire(
          "Dispatched!",
          "Your top up is being proccessed.",
          "success"
        );
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          "Cancelled",
          "You decided to cancel",
          "error"
        );
      }
    });
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  // var parts = x.toString().split(".");
  // parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  // return parts.join(".");
}

function top_up_history(event) {
  event.preventDefault();
  console.log("History is good");
  swal.fire({
    title: "Please wait",
    text: "Fetching Your Transaction History",
    icon: "info",
    timer: 3000,
  });
}

function do_calculation() {
  swal.fire({
    title: "Dispatching your message",
    text: "Please wait",
    icon: "info",
    timer: 4000,
    allowOutsideClick: false,
    showCancelButton: true,
  });
}

(async () => {
  const m_token = localStorage.getItem("access_token");
  var userObj = parseJwt(localStorage.getItem("access_token"));
  let wallet_id_info = {
    user: userObj.user,
  };
  var wallet_balance_request = new Request(
    "https://farm-aid-backend.herokuapp.com/api/wallet/get-balance",
    {
      method: "POST",
      body: JSON.stringify(wallet_id_info),
      headers: new Headers({
        "Content-Type": "application/json",
        "authorization": m_token,
      }),
    }
  );

  // pass request object to `fetch()`
  fetch(wallet_balance_request)
    .then(async (balance) => {
      let { walletBalance } = await balance.json();
      console.table(walletBalance);
      if (Number(walletBalance.balance) > 0.0) {
        $(".wallet_balance").removeClass('color-red').html("₦" + (numberWithCommas(walletBalance.balance)));
        $(".low_sms").addClass('is-hidden');
        $(".sms_units_available").html("" + numberWithCommas(Math.floor(Number(walletBalance.balance) / 5.0 + 100))); 
        localStorage.setItem('topup_balance', walletBalance.balance)
      }
    })
    .catch((err) => {
      console.log("There was a problem: ", err);
    });
})();

$(document).ready(() => {
  if ($(".topup_balance").length) {
    $(".topup_balance").html("₦" + (numberWithCommas( (Number(localStorage.getItem('topup_balance'))? Number(localStorage.getItem('topup_balance')): 0.0) )));
  }
})
