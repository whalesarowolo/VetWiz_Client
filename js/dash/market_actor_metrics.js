$(document).ready(function () {
   
    var make_call = false;
   if ($("#message").length) {
     console.log("Inside checker");
     if ($(".white-button-disabled").length) {
       $(".white-button-disabled #prev_it").prop('disabled', true);
     } else {
       $(".white-button-disabled #prev_it").prop('disabled', false);
     }
     $('input[type="checkbox"]').attr("checked", "checked");

     //Call api for metrics
     function get_metrics(criterias) {
        var inner_criteria = {};
        const {states, crops} = criterias;
        const my_token = localStorage.getItem('access_token');
        var userObj = parseJwt(localStorage.getItem("access_token"));
       let criteria_info = {
          user: userObj.user,
          states: states,
          crops: crops
       };
       var metric_request = new Request(
         "https://farm-aid-backend.herokuapp.com/api/farmer/get-metrics",
         {
           method: "POST",
           body: JSON.stringify(criteria_info),
           headers: new Headers({
             "Content-Type": "application/json",
             "authorization": my_token,
           }),
         }
       );
       fetch(metric_request)
         .then(async (response) => {
           var resp = await response.json();
           if (resp) {
             console.log("Network response from metric server: ", resp);
             //update the previews with the insights
             $(".message-reach-preview #adamawa_farmers").html(numberWithComma(resp.adamawa_farmers));
             $(".message-reach-preview #gombe_farmers").html(numberWithComma(resp.gombe_farmers));
             $(".message-reach-preview #m_farmers").html(numberWithComma(resp.male_farmers));
             $(".message-reach-preview #f_farmers").html(numberWithComma(resp.female_farmers));
             $(".total-farmers-preview #total_target_farmers").html(numberWithComma(resp.adamawa_farmers + resp.gombe_farmers));
             $(".message-reach-preview #total_sms_count").html(numberWithComma((resp.adamawa_farmers + resp.gombe_farmers) * Number.parseInt($(".message-count #messages").html())));
             $(".message-reach-preview #number_of_message_pages").html(Number.parseInt($(".message-count #messages").html()));
             $(".count-and-cost #total_sms_counts").html(numberWithComma((resp.adamawa_farmers + resp.gombe_farmers) * Number.parseInt($(".message-count #messages").html())));
             $(".count-and-cost #total_sms_cost").html("₦" + numberWithComma(5 * (resp.adamawa_farmers + resp.gombe_farmers) * Number.parseInt($(".message-count #messages").html())));
             $(".message-reach-preview #total_sms_cost_amount").html("₦" + numberWithComma(5 * (resp.adamawa_farmers + resp.gombe_farmers) * Number.parseInt($(".message-count #messages").html())));
             $(".farmer-count-text #farmer_counter_total").attr('readonly', 'false');
             //$(".farmer-count-text #farmer_counter_total").html(resp.adamawa_farmers + resp.gombe_farmers);
             $(".sms-summary-row #number_of_message_pages").html(Number.parseInt($(".message-count #messages").html()));
             $(".sms-summary-row #total_sms_counted").html(numberWithComma((resp.adamawa_farmers + resp.gombe_farmers) * Number.parseInt($(".message-count #messages").html())));
             $(".sms-summary-row #total_sms_cost_amount").html("₦" + numberWithComma(5 * (resp.adamawa_farmers + resp.gombe_farmers) * Number.parseInt($(".message-count #messages").html())));
             $(".farmer-count-wrapper #farmer_counter_total").val((resp.adamawa_farmers + resp.gombe_farmers));//.attr('readonly', 'true');
             $(".message-content-preview #final_sms_message").html($(".message-compose-container #message").val());
             $(".message-content-preview #final_sms_pages").html(Number.parseInt($(".message-count #messages").html()));
           }
         })
         .catch((err) => {
           console.log("Error from metrics api: ", err.message)
         });
     }
     //End call for metrics
   }

   $('#modify_farmer_count').on('click', function(){
       $(this)
       .html(function(i,v){
           return v.trim() == 'Edit' ? function() { $('#modify_farmer_count').removeClass('fa-pencil').addClass('fa-save'); $("#farmer_counter_total").removeClass('farmer-count-text-noedit'); return 'Save'; } : function() { $('#modify_farmer_count').removeClass('fa-save').addClass('fa-pencil'); $("#farmer_counter_total").addClass('farmer-count-text-noedit'); return 'Edit'; } ;
       })
       .prev('input[required]')
       .prop('readonly',function(i,r){
           return !r;
       });
   });

   $("#message").on("change input keyup paste", function () {
     let regx = /^(\s+)$/;
     if (this.value.length > 5 && !this.value.toString().match(regx)) {
       if (
         $(".button.subs_info_section_button.white-button").hasClass(
           "white-button-disabled"
         )
       ) {
         $(".button.subs_info_section_button.white-button").removeClass(
           "white-button-disabled"
         );
       }
     } else {
       $(".button.subs_info_section_button.white-button").addClass(
         "white-button-disabled"
       );
     }
   });

   part1Count = 160;
   part2Count = 158;
   part3Count = 158;

   $("#message").keyup(function () {
     // state tracking
     var chosen_states = [];
     var chosen_crops = [];
     var filterable_criterias = {};

     const state_els = $(".select_state");
     const select_crops = $(".select_crops");

     //add_state function
     function add_state(new_state) {
       if (chosen_states.indexOf(new_state) == -1) {
         chosen_states.push(new_state);
       }
     }

     //add_crop function
     function add_crop(new_crop) {
       if (chosen_crops.indexOf(new_crop) == -1) {
         chosen_crops.push(new_crop);
       }
     }

     for (const state of state_els) {
       if (state.checked) {
         add_state(state.value);
       }
     }

     for (const crop of select_crops) {
       if (crop.checked) {
         add_crop(crop.value);
       }
     }

     if (chosen_states.length > 0) {
       //Update filterable criteria for states
       filterable_criterias.states = chosen_states;
       console.log(
         "Selected states are: 👉🏻",
         chosen_states,
         filterable_criterias
       );
       make_call = true;
     } else {make_call = false}
     if (chosen_crops.length > 0) {
       //Update filterable criteria for crops
       filterable_criterias.crops = chosen_crops;
       console.log(
         "Selected crops are: 👉🏻",
         chosen_crops,
         filterable_criterias
       );
       make_call = true;
       // get_metrics(filterable_criterias);
     }

     if (make_call) {
        get_metrics(filterable_criterias);
     }

     // end state tracking

     var chars = $(this).val().length;

     messages = 0;

     remaining = 0;

     total = 0;

     if (chars <= part1Count) {
       messages = 1;

       remaining = part1Count - chars;
     } else if (chars <= part1Count + part2Count) {
       messages = 2;

       remaining = part1Count + part2Count - chars;
     } else if (chars > part1Count + part2Count) {
       moreM = Math.ceil((chars - part1Count - part2Count) / part3Count);
       remaining = part1Count + part2Count + moreM * part3Count - chars;
       messages = 2 + moreM;
     }

     $("#remaining").text(remaining);
     $("#messages").text(messages);
     $("#total").text(chars);
     if (remaining > 1) $(".cplural").show();
     else $(".cplural").hide();
     if (messages > 1) $(".mplural").show();
     else $(".mplural").hide();
     if (chars > 1) $(".tplural").show();
     else $(".tplural").hide();
   });

   $("#message").keyup();
 });


 function numberWithComma(x) {
   //Clean implementation for brevity
   return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
 }

 $("#send_messages").on('click', function() {
    swal.fire({
        title: 'Me coming for you...',
        text: 'I am coming to get you...',
        timer: 3000,
    });
 });

