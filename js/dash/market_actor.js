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