let subscription_status = document.getElementById('subscription_status');
let sms_button = document.getElementById('sms_sending_button');

if(subscription_status.innerHTML === 'NOT SUBSCRIBED'){
    console.log(subscription_status.innerHTML);

    function show_sidebar()
        {
        document.getElementById('sms_subscription_status_message').style.visibility="visible";
        }

        function hide_sidebar()
        {
        document.getElementById('sms_subscription_status_message').style.visibility="hidden";
        }

         document.getElementById("sms_sending_button").style.opacity = "0.5";
}else{
    function show_sidebar()
    {
    document.getElementById('sms_subscription_status_message').style.visibility="none";
    }

    function hide_sidebar()
    {
    document.getElementById('sms_subscription_status_message').style.visibility="none";
    }

}

function myFunction(event, topup_amount) {
  if($("#topupConfirm").length){$("#topupConfirm").css('display', 'none')}
    var target_ele = $(event.target),
        the_i = $(target_ele).children();
        target_parent_array = ($(event.target).parent().children());
        $.each(target_parent_array, (elsa) => {
          var the_check = $(target_parent_array[elsa]).children();
          $(the_check[0]).removeClass('fa-check-circle');

        });

    // Get all the siblings and remove the check mark from their stylings
    console.log("Amount: " + topup_amount);

    // Now add the check mark to the element with current focus

    $(the_i[0]).addClass('fa-check-circle');
    $(target_ele).css('background-color','#00d1b2');
    //target_ele.classList.toggle('fa-check-circle');
  //let amount_to_topup_by = event.target
  $("#money_holder").empty().append("₦" + topup_amount+ " ?");
  $("#figu").html(topup_amount);
  $("#topupConfirm").fadeIn('fast');
  
} 

function call_top_up() {

  const call_API = 'https://farm-aid-backend.herokuapp.com/';
  var amount = $("#figu").text();
  console.log("The top up amount" + amount);
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })
  
  swalWithBootstrapButtons.fire({
    title: 'Top up with ₦' + amount + " ?",
    text: "You won't be able to revert this!",
    icon: 'warning',
    allowOutsideClick: false,
    background: '#fff url(/img/bg.jpg)',
    showCancelButton: true,
    confirmButtonText: 'Yes, top up!',
    backdrop: `
    rgba(0,0,123,0.4)
    url("/img/nbg.jpg")
    left top
    no-repeat
  `,
    cancelButtonText: 'No, cancel!',
    reverseButtons: true,
    preConfirm: () => {
      return fetch(call_API)
        .then(response => response.json())
        .then(data => console.log("Paystack data" ,data))
        .catch((err) => {
        //Handle error here
        console.log("No Paystack response");
        })
    }
    
      // end call here
  }).then((result) => {
    if (result.value) {
      // My test call here
      
      swalWithBootstrapButtons.fire(
        'Dispatched!',
        'Your top up is being proccessed.',
        'success'
      )
    } else if (
      /* Read more about handling dismissals below */
      result.dismiss === Swal.DismissReason.cancel
    ) {
      swalWithBootstrapButtons.fire(
        'Cancelled',
        'You decided to cancel',
        'error'
      )
    }
  })
  // swal.fire({
  //   title: 'Please Confirm',
  //   text: 'Are you shure you want to top up with ₦' + amount + "?",
  //   icon: 'info',
  //   buttons: {
  //     confirm : {text:'Yes, top up!',className:'sweet-success'},
  //     cancel : 'No, cancel please!'
  //   },
  //   // allowOutsideClick: false,
  //   // showCancelButton: true,
  //   // cancelButtonText: "No, cancel please!",
  //   // cancelButtonColor: "#DD6B55",
  //   // showConfirmButton: true,
  //   // confirmButtonText: "Yes, top up!",
  //   // confirmButtonColor: "#26D0A9",
    
  // })
}
