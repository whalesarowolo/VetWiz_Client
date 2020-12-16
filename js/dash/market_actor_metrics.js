part1Count = 160;
part2Count = 158;
part3Count = 158;

// state tracking
var chosen_states = [];
var chosen_crops = [];
var filterable_criterias = {};
var make_call = false;

//add_state function
function add_state(new_state) {
  if (chosen_states.indexOf(new_state) == -1) {
    chosen_states.push(new_state);
  }
}

function update_wallet_balance() {
  console.log("Getting wallet balance");
  $("#how_many_sms").html(localStorage.getItem('how_many_sms'));
  setInterval(() => {
    if ($(".topup_balance").length) {
      var wallety = localStorage.getItem('topup_balance');
      if (wallety) {
        $(".topup_balance").html("₦" + numberWithCommas(Number(wallety)));
      }
    }
  }, 6000)
}

//add_crop function
function add_crop(new_crop) {
  if (chosen_crops.indexOf(new_crop) == -1) {
    chosen_crops.push(new_crop);
  }
}

$(document).ready(function () {
  // state tracking
  chosen_states = [];
  chosen_crops = [];
  filterable_criterias = {};
  make_call = false;
  // maSMS_history();
  reset_criteria();
  update_wallet_balance();

  if ($("#message").length) {
    if ($(".white-button-disabled").length) {
      $(".white-button-disabled #prev_it").prop("disabled", true);
    } else {
      $(".white-button-disabled #prev_it").prop("disabled", false);
    }
  }

  $(document).on("click", "#continue_metrics", function (ev) {
    if ($("#prev_it").hasClass("white-button-disabled")) {
      swal.fire({
        title: "Message too short",
        text: "Your message must be at least 6 characters long",
        icon: "info",
        timer: 3000,
        allowOutsideClick: false,
        showConfirmButton: true,
      });
    } else {
      swal.fire({
        title: "Getting Summary Metrics",
        text: "Please wait...",
        icon: "info",
        allowOutsideClick: false,
        showConfirmButton: false,
      });
      get_metrics(JSON.parse(localStorage.getItem("chosen_criteria")));
    }
  });
});

$(document).on("click", "#modify_farmer_count", function () {
  $(this)
    .html(function (i, v) {
      return v.trim() == "Edit"
        ? function () {
            $("#modify_farmer_count")
              .removeClass("fa-pencil")
              .addClass("fa-save");
            $("#farmer_counter_total").removeClass("farmer-count-text-noedit");
            return "Save";
          }
        : function () {
            $("#modify_farmer_count")
              .removeClass("fa-save")
              .addClass("fa-pencil");
            $("#farmer_counter_total").addClass("farmer-count-text-noedit");
            //Compute and update new sms cost here
            $("#total_target_farmers").html(numberWithComma(Number($("#farmer_counter_total").val())));

            $("#total_sms_counted").html(
              numberWithComma(
                Number($("#farmer_counter_total").val()) *
                  Number.parseInt($(".message-count #messages").html())
              )
            );

            $("#total_sms_cost_amount").html(
              "₦" +
                numberWithComma(
                  5 *
                    Number($("#farmer_counter_total").val()) *
                    Number.parseInt($(".message-count #messages").html())
                )
            );

            $("#total_sms_counts").html(
              numberWithComma(
                Number($("#farmer_counter_total").val()) *
                  Number.parseInt($(".message-count #messages").html())
              )
            );
            
            $("#total_sms_cost").html(
              "₦" +
                numberWithComma(
                  5 *
                    Number($("#farmer_counter_total").val()) *
                    Number.parseInt($(".message-count #messages").html())
                )
            );
            return "Edit";
          };
    })
    .prev("input[required]")
    .prop("readonly", function (i, r) {
      return !r;
    });
});

$(document).on("change input keyup paste", "#message", function () {
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

  // Add states into mix here
  const state_els = $("#selected_states").val();

  // Add crops into mix here
  const select_crops = $(".select_crops");

  chosen_crops.splice(0, chosen_crops.length);
  chosen_states.splice(0, chosen_states.length);
  chosen_states = [];
  for (const state of state_els) {
    add_state(state);
    // if (state.checked) {
    //   add_state(state.value);
    // }
  }

  for (const crop of select_crops) {
    if (crop.checked) {
      add_crop(crop.value);
    }
  }

  if (chosen_states.length > 0) {
    //Update filterable criteria for states
    filterable_criterias.states = chosen_states;
    console.log("Selected states are: 👉🏻", chosen_states, filterable_criterias);
    make_call = true;
  } else {
    make_call = false;
  }
  if (chosen_crops.length > 0) {
    //Update filterable criteria for crops
    filterable_criterias.crops = chosen_crops;
    console.log("Selected crops are: 👉🏻", chosen_crops, filterable_criterias);
    make_call = true;
    // get_metrics(filterable_criterias);
  } else {
    make_call = false;
  }
  if (make_call) {
    //get_metrics(filterable_criterias);
    localStorage.setItem("chosen_states", filterable_criterias.states);
    localStorage.setItem(
      "chosen_criteria",
      JSON.stringify(filterable_criterias)
    );
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

function numberWithComma(x) {
  //Clean implementation for brevity
  return x.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');//x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

//Call api for metrics
function get_metrics(criterias) {
  var inner_criteria = {};
  const { states, crops } = criterias;
  const my_token = localStorage.getItem("access_token");
  var userObj = parseJwt(localStorage.getItem("access_token"));
  let criteria_info = {
    user: userObj.user,
    states: states,
    crops: crops,
  };
  var metric_request = new Request(
    "https://farm-aid-backend.herokuapp.com/api/farmer/get-metrics",
    {
      method: "POST",
      body: JSON.stringify(criteria_info),
      headers: new Headers({
        "Content-Type": "application/json",
        authorization: my_token,
      }),
    }
  );
  fetch(metric_request)
    .then(async (response) => {
      var resp = await response.json();
      if (resp.message) {
        swal.close();
        console.log("Problem with response from metric server: ", resp);
        //update the previews with the insights
      } else {
        swal.close();
        $(".opaque-summary").css("opacity", "1.0");
        console.log("Response from metric server: ", resp);
        $(".message-reach-preview #adamawa_farmers").html(
          numberWithComma(resp.adamawa_farmers)
        );
        $(".message-reach-preview #gombe_farmers").html(
          numberWithComma(resp.gombe_farmers)
        );
        $(".message-reach-preview #m_farmers").html(
          numberWithComma(resp.male_farmers)
        );
        $(".message-reach-preview #f_farmers").html(
          numberWithComma(resp.female_farmers)
        );
        $(".total-farmers-preview #total_target_farmers").html(
          numberWithComma(resp.adamawa_farmers + resp.gombe_farmers)
        );
        $(".message-reach-preview #total_sms_count").html(
          numberWithComma(
            (resp.adamawa_farmers + resp.gombe_farmers) *
              Number.parseInt($(".message-count #messages").html())
          )
        );
        $(".message-reach-preview #number_of_message_pages").html(
          Number.parseInt($(".message-count #messages").html())
        );
        $(".count-and-cost #total_sms_counts").html(
          numberWithComma(
            (resp.adamawa_farmers + resp.gombe_farmers) *
              Number.parseInt($(".message-count #messages").html())
          )
        );
        $(".count-and-cost #total_sms_cost").html(
          "₦" +
            numberWithComma(
              5 *
                (resp.adamawa_farmers + resp.gombe_farmers) *
                Number.parseInt($(".message-count #messages").html())
            )
        );
        $(".message-reach-preview #total_sms_cost_amount").html(
          "₦" +
            numberWithComma(
              5 *
                (resp.adamawa_farmers + resp.gombe_farmers) *
                Number.parseInt($(".message-count #messages").html())
            )
        );
        $(".farmer-count-text #farmer_counter_total").attr("readonly", "false");
        //$(".farmer-count-text #farmer_counter_total").html(resp.adamawa_farmers + resp.gombe_farmers);
        $(".sms-summary-row #number_of_message_pages").html(
          Number.parseInt($(".message-count #messages").html())
        );
        $(".sms-summary-row #total_sms_counted").html(
          numberWithComma(
            (resp.adamawa_farmers + resp.gombe_farmers) *
              Number.parseInt($(".message-count #messages").html())
          )
        );
        $(".sms-summary-row #total_sms_cost_amount").html(
          "₦" +
            numberWithComma(
              5 *
                (resp.adamawa_farmers + resp.gombe_farmers) *
                Number.parseInt($(".message-count #messages").html())
            )
        );
        localStorage.setItem(
          "final_cost",
          5 *
            (resp.adamawa_farmers + resp.gombe_farmers) *
            Number.parseInt($(".message-count #messages").html())
        );
        $(".farmer-count-wrapper #farmer_counter_total").val(
          resp.adamawa_farmers + resp.gombe_farmers
        ); //.attr('readonly', 'true');
        $(".message-content-preview #final_sms_message").html(
          $(".message-compose-container #message").val()
        );
        $(".message-content-preview #final_sms_pages").html(
          Number.parseInt($(".message-count #messages").html())
        );
        $(".message-content-preview #final_sms_message").attr(
          "data-query",
          JSON.stringify(resp.query)
        );
        $(".message-content-preview #final_sms_message").attr(
          "data-id",
          resp.query_id
        );
      }
    })
    .catch((err) => {
      console.log("Error from metrics api: ", err.message);
    });
}
//End call for metrics

// Market Actor sms log sent for approval
function maSMS_history() {
  let html = "";
  swal
    .fire({
      title: "Loading Messages",
      text: "Please wait...",
      timer: 3000,
      allowOutsideClick: false,
      showConfirmButton: false,
      icon: "info",
    })
    .then(function () {
      swal.fire({
        title: "Please wait",
        text: "Loading Your data ....",
        icon: "info",
        allowOutsideClick: false,
        showConfirmButton: false,
      });

      const url = "https://farm-aid-backend.herokuapp.com/api/masms_history";
      const token = localStorage.getItem("access_token");
      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append("Authorization", token);
      fetch(url, {
        method: "GET",
        headers,
      })
        .then(async (res) => res.json())
        .then((data) => {
          swal.close();
          var how_many_sms = data.length;
          console.log("SMS sent: ", how_many_sms);
          localStorage.setItem('how_many_sms', how_many_sms);
          $("#how_many_sms").html(how_many_sms);
          var counter = 0;
          data.forEach((datas) => {
            counter += 1;
            let state = datas.state;
            let company = datas.company;
            let email = datas.email;
            let crops = datas.crop;
            let gender = datas.gender;
            let message = datas.msg;
            let dataId = datas._id;
            let date = new Date(datas.date);
            let ma_cost = datas.cost
              ? "&#x20A6;" + numberWithComma(datas.cost)
              : "N/A";
            newDate =
              date.getMonth() +
              1 +
              "/" +
              date.getDate() +
              "/" +
              date.getFullYear() +
              " ";
            console.log(dataId);
            var status_button = "";
            switch (datas.status) {
              case "Approved":
                status_button = `<td><span style="color: green; padding:5px; border-radius:8px; cursor:pointer; box-shadow: 5px 5px #888888;" class="is-button" onclick="javascript:" data_id="${dataId}">Resend</span></td>`;
                break;
              case "Pending":
                status_button = "";
                break;
              case "Rejected":
                status_button = "";
              default:
                status_button = "";
                break;
            }

            html += "<tr>";
            html += "<td>" + counter + "</td>";
            html += "<td>" + newDate + "</td>";
            html += "<td id=" + `${dataId}` + " >" + message + "</td>";
            html += "<td class='crops'>" + crops + "</td>";
            html += "<td>" + gender + "</td>";
            html += "<td>" + state + "</td>";
            html += "<td>" + "N/A" + "</td>";
            html += "<td>" + ma_cost + "</td>";
            html += "<td>" + datas.status + "</td>";

            html += status_button + "</tr>";
          });

          $("#ma_sms_history").ready(function () {
            $("#ma_sms_history").html(html);
          });
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    });
}

function reset_criteria() {
  setTimeout(() => {
    if (location.hash === "#sms") {
      if ($(".child-menu").hasClass("is-sidebar-translated")) {
        $(".dashboard-outer").removeClass("is-pushed");
        $(".dashboard-inner").removeClass("is-pushed");
        $(".dashboard-nav").removeClass("is-pushed");
        $(".child-menu").removeClass("is-sidebar-translated");
      }
      $(".select_state").ready(function () {
        $(".select_state").prop("checked", true);
        $(".select_crops").prop("checked", true);
      });
    }
  }, 2000);
}

window.addEventListener("hashchange", reset_criteria, false);
