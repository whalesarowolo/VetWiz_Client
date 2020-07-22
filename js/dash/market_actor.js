let subscription_status = document.getElementById("subscription_status");
let sms_button = document.getElementById("sms_sending_button");

function get_wallet_balance() {
  console.log("Getting wallet balance");
  setInterval(() => {
    if ($(".topup_balance").length) {
      var wallety = localStorage.getItem('topup_balance');
      if (wallety) {
        $(".topup_balance").html("₦" + numberWithCommas(Number(wallety)));
      }
    }
  }, 6000)
}

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
            "authorization": my_token,
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
  //Clean implementation for brevity
  return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
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
      if (Number(walletBalance.balance) > 0.0) {
        $(".wallet_balance").removeClass('color-red').html("₦" + (numberWithCommas(walletBalance.balance)));
        $(".low_sms").addClass('is-hidden');
        $(".sms_units_available").html("" + numberWithCommas(Math.floor(Number(walletBalance.balance) / 5.0 + 100))); 
        localStorage.setItem('topup_balance', walletBalance.balance)
      }
    })
    .catch((err) => {
      //Do nothing but log here
      console.log("There was a problem: ", err);
    });
})();

// new home for sending market actor messages


$("#send_messages").on('click', function(e) {
  
  var msg_content = $("#final_sms_message").html();
  var msg_state = (localStorage.getItem('chosen_states')).split(',');
  var message_recipients_query_id = $(".message-content-preview #final_sms_message").attr('data-id');
  //var female_gender = $("#female").is(":checked");
  // var msg_gender = (male_gender)? "male": "";
  // msg_gender += + (female_gender)? ",female": "";

  var rice_crop = $("#rice_crop").is(":checked");
  var tomato_crop = $("#tomato_crop").is(":checked");
  var sorghum_crop = $("#sorghum_crop").is(":checked");
  var groundnut_crop = $("#groundnut_crop").is(":checked");
  var target_crops = "" + (rice_crop)? "rice": "";// + (tomatoes_crop)? "tomatoes": "" + (sorghum_crop)? "sorghum": "" + (groundnuts_crop)? "groundnuts": "";
  target_crops += (tomato_crop)? ", tomato": "";
  target_crops += (sorghum_crop)? ", sorghum": "";
  target_crops += (groundnut_crop)? ", groundnut": "";

  console.log("Crops " + target_crops);
  var msg_crop = "" + (target_crops != "")? target_crops: "No Crops selected";
  console.log("Crops " + msg_crop);
  console.log("Message", msg_content);
  //console.log("Genders " + msg_gender);
  if (msg_crop != "No Crops selected") {
    $("#create-note-modal").css({'z-index': '-4000'});
    swal.fire({
      title: 'Preparing Message Details',
      text: 'Please wait...',
      timer: 2000,
      allowOutsideClick: false,
      showConfirmButton: false,
      icon: 'info'
    }).then(function() {
  
      const url = 'https://farm-aid-backend.herokuapp.com/api/masms'
    
      const token = localStorage.getItem('access_token');
      var userObj = parseJwt(localStorage.getItem('access_token'));
      maCompany = userObj.user.company
      maEmail = userObj.user.email
      
    swal.fire({
      title: 'Sending Message',
      text: 'You will get an Email notificaton if your Message is approved or not',
      icon: 'info',
      allowOutsideClick: false,
      showConfirmButton: false
    });
    let query_string = $(".message-content-preview #final_sms_message").attr('data-query'); //data-query
    
    const newMessage = {
      state: msg_state,
      crop: msg_crop,
      msg: msg_content,
      query: query_string,
      query_id: message_recipients_query_id,
      company: maCompany,
      email: maEmail,
    };
    // create request object
      var request = new Request(url, {
        method: 'POST',
        body: JSON.stringify(newMessage),
        headers: new Headers({
          'Content-Type': 'application/json',
          'authorization': token       
        })
      });
      // pass request object to `fetch()`
      fetch(request)
        .then(async (res) => {
           //$('.modal').css({ 'display': 'none' });
        var resp = await res.json();
        if(resp != null || resp != undefined){
          swal.close();
          if (resp.errors) {
            swal.fire({
              title: 'Error Condition',
              text: 'Your message has not been dispatched',
              icon: 'warning',
              timer: 3000,
              allowOutsideClick: false,
              showConfirmButton: true
            }).then(() => {
              console.log("Bad request...", resp);
            });
          } else {
            swal.fire({
              title: 'Message',
              text: 'Your message has been dispatched',
              icon: 'info',
              timer: 3000,
              allowOutsideClick: false,
              showConfirmButton: false
            }).then(() => {
              //window.location.reload();
              console.log("Done sending request...", resp);
            });
          }
          
        }
        }).catch((e)=> {
          swal.close();
          console.log("Error condition is bad...");
        });
    })
  }

 });