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
    var target_ele = ($(event.target).children())[0];
    console.log("Amount: " + topup_amount);
    target_ele.classList.toggle('fa-check-circle');
    console.log(target_ele);
 //let amount_to_topup_by = event.target
 var x = document.getElementById("topupConfirm");
 $("#money_holder").empty().append("₦" + topup_amount+ " ?");
 if (x.style.display === "block") {
   x.style.display = "none";
 } else {
   x.style.display = "block";
 }
} 