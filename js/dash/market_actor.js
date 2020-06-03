let subscription_status = document.getElementById('subscription_status');
let sms_button = document.getElementById('sms_sending_button');


if(subscription_status.innerHTML === 'NOT SUBSCRIBED'){
    console.log(subscription_status.innerHTML);
    document.getElementById("sms_subscription_status_message").style.display = "block";
    document.getElementById("sms_sending_button").disabled = true;
}else{
    document.getElementById("sms_subscription_status_message").style.display = "none";
    document.getElementById("sms_sending_button").disabled = false;

}