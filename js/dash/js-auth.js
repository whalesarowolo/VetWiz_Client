/*! js-auth.js | Farm Innovation | FarmAid */

/*
 ==========================================================================
            Authentication and registration pages JS file 
 ========================================================================== 
*/


$(document).ready(function ($) {
  "use strict";

  //Login and Signup V1 (startup kit & landing kit 4)
  $("#contacted").on("click", function () {
    $(this).addClass("is-hidden");
    $("#signup-form, #signup-intro").addClass("is-hidden");
    $("#back-to-signup, #contacted-form, #contacted-intro").removeClass(
      "is-hidden"
    );
  });

  
  //Back to signup form
  $("#back-to-signup").on("click", function () {
    $(this).addClass("is-hidden");
    $("#contacted-form, #contacted-intro").addClass("is-hidden");
    $("#contacted, #signup-form, #signup-intro").removeClass("is-hidden");
  });

  //Show register form
  $("#register").on("click", function () {
    $(this).addClass("is-hidden");
    $("#login-form").addClass("is-hidden");
    $("#back-to-login, #register-form, #back-to-login-ii").removeClass(
      "is-hidden"
    );
  });
  //Show recover form
  $("#recover").on("click", function () {
    $(this).addClass("is-hidden");
    $("#signin-form").addClass("is-hidden");
    $("#back-to-login, #recover-form").removeClass("is-hidden");
  });
  //back to login on click
  $("#back-to-login, #back-to-login-ii").on("click", function () {
    $(this).toggleClass("is-hidden");
    console.log("About to login...");
    $("#recover-form, #register-form").addClass("is-hidden");
    $("#login-form, #register").removeClass("is-hidden");
  });

  //Login and Signup V2 (landing kit 1,2,3)
  $(".forgot, .return").on("click", function () {
    $("#login-form, #recover-form").toggleClass("is-hidden");
  });
  //Recover toggle
  $(".forgot-material, .return-material").on("click", function () {
    $("#material-login-form, #material-recover-form").toggleClass("is-hidden");
  });

  //Clean login
  $("#show-login, #show-recover").on("click", function () {
    $("#login-card, #recover-card").toggleClass("is-hidden");
  });

  $("#biz-cat").on("click", function () {
    $(this).toggleClass("is-active");
  });

  //Dashboard login style switcher
  $(".switcher-block").on("click", function () {
    $(".switcher-block, #classic, #material").toggleClass("is-hidden");
  });

  $("#logout").on("click", function (e) {
    localStorage.clear();
    history.pushState(
      { data: window.location.href, time: Date.now() },
      "Dashboard",
      window.location.href
    );
    history.go();
  });

  if ($("#select_agree").length) {
    $("#signup_new").addClass('is-hidden');
    $("#select_agree").on('change', function() {
      console.log("Toggling agreement");
      if ($("#select_agree").is(':checked')) {
        $("#signup_new").removeClass('is-hidden');
      } else {
        
        $("#signup_new").addClass('is-hidden');
      }
    });
    
  }
  // Sign up JS logic starts here

  // onClick event for sign up button
  $("#signup_new").on("click", function (e) {
    let firstname = $("#register-firstname").val().trim();
    let lastname = $("#register-lastname").val().trim();
    let phonNum = $("#register-phonNum").val();
    let email = $("#register-email").val().trim();
    let company = $("#register-company").val().trim();
    let selectId = $("#register-category").val();
    const password = $("#register-password").val().trim();
    var numbers = /^[0-9]+$/;

    // function to validate email
    function IsEmail(email) {
      var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      if (!regex.test(email)) {
        return false;
      } else {
        return true;
      }
    }

    // validate empty input
    if (
      firstname == "" ||
      lastname == "" ||
      email == "" ||
      company == "" ||
      selectId == "" ||
      password == "" ||
      phonNum == ""
    ) {
      $("#login-form").addClass("is-hidden");
      swal
        .fire({
          title: "Error Authenticating",
          text: "You must provide all credentials to Sign Up",
          icon: "warning",
          timer: 2100,
        })
        .then(() => {
          $("#login-form").toggleClass("is-hidden");
        });
      return false;
    }

    if (phonNum < 11) {
      $("#login-form").addClass("is-hidden");
      swal
        .fire({
          title: "Error Authenticating",
          text: "Phone Number format is Invalid",
          icon: "warning",
          timer: 3100,
        })
        .then(() => {
          $("#login-form").toggleClass("is-hidden");
        });
      return false;
    }
    if (!phonNum.match(numbers)) {
      $("#login-form").addClass("is-hidden");
      swal
        .fire({
          title: "Error Authenticating",
          text: "Phone Number must be number",
          icon: "warning",
          timer: 3100,
        })
        .then(() => {
          $("#login-form").toggleClass("is-hidden");
        });
      return false;
    }
    if (password < 8) {
      $("#login-form").addClass("is-hidden");
      swal
        .fire({
          title: "Error Authenticating",
          text: "Password must be greater than 8 characters",
          icon: "warning",
          timer: 3100,
        })
        .then(() => {
          $("#login-form").toggleClass("is-hidden");
        });
      return false;
    }

    if (IsEmail(email) == false) {
      $("#login-form").addClass("is-hidden");
      swal
        .fire({
          title: "Error Authenticating",
          text: "Please provide a valid email address",
          icon: "warning",
          timer: 3100,
        })
        .then(() => {
          $("#login-form").toggleClass("is-hidden");
        });
      return false;
    }

    swal.showLoading("Please wait...");

    const url = "https://farm-aid-backend.herokuapp.com/api/users";

    const user = {
      firstname: firstname,
      lastname: lastname,
      phoneNumber: phonNum,
      email: email,
      company: company,
      bizCategory: selectId,
      password: password,
    };

    // create request object
    var request = new Request(url, {
      method: "POST",
      body: JSON.stringify(user),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    });

    fetch(request).then(async (res) => {
      let resp = await res.json();
      if (resp.status !== 201) {
        Swal.fire({
          title: "Signing Up",
          text: "Either Phone Number or Email has already been used",
          icon: "info",
          timer: 3000,
        });
      } else {
        Swal.fire({
          title: "Signing Up",
          text: `${resp.user.firstname} Please check your mail to verify your Account `,
          icon: "info",
          timer: 3000,
        });
      }
    });
  });

  //  Sign Up logic ends here

  function parseJwt(token) {
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  }

  $("#enta").on("click", function (e) {
    var useremail = $("#email").val();
    var userpassword = $("#password").val();
    if (useremail == "" || userpassword == "") {
      $("#login-form").addClass("is-hidden");
      swal
        .fire({
          title: "Error Authenticating",
          text: "You must provide all credentials to login",
          icon: "warning",
          timer: 1500,
        })
        .then(() => {
          $("#login-form").toggleClass("is-hidden");
        });
      return false;
    }

    swal.showLoading("Please wait...");
    //e.preventDefault();

    const url = "https://farm-aid-backend.herokuapp.com/api/auth";

    const user = {
      email: useremail,
      password: userpassword,
    };

    // create request object
    var request = new Request(url, {
      method: "POST",
      body: JSON.stringify(user),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    });

    // pass request object to `fetch()`
    fetch(request).then(async (res) => {
      //$('.modal').css({ 'display': 'none' });
      var resp = await res.json();
      if (resp.token != null || resp.token != undefined) {
        console.log(resp.token);
        swal.close();
        localStorage.setItem("access_token", resp.token);
        var userObj = parseJwt(localStorage.getItem("access_token"));
        console.log("User: ", userObj);
        //For propcom dashboard
        if (userObj.user.company == "propcom") {
          history.pushState(
            { logged_in: true, ifAdmin: false },
            "Dashboard",
            "/propcom.html"
          );
          //history.pushState({ "logged_in": true, "ifAdmin": false }, "Dashboard", "/dashboard.html");
          window.location.replace("/propcom.html");
        } else if (userObj.user.isAdmin == false) {
          history.pushState(
            { logged_in: true, ifAdmin: false },
            "Dashboard",
            "/partnerDashboard.html"
          );
          window.location.replace("/partnerDashboard.html");
        } else {
          history.pushState(
            { logged_in: true, ifAdmin: false },
            "Dashboard",
            "/dashboard.html"
          );
          window.location.replace("/dashboard.html");
        }

        console.log(userObj.user.id);
        localStorage.setItem("user", userObj.user.id);
      } else {
        $(".modal").css({ display: "none" });
        Swal.fire({
          title: "Invalid Credentials",
          text: "The username/password is invalid",
          timer: 2000,
        }).then(() => {
          $(".modal").css({ display: "block" });
        });
      }
    });
  });
});

function goHome() {
  document.location.replace("/dashboard.html");
}

function goHomePartner() {
  document.location.replace("/partnerDashboard.html");
}


// function to validate email
function IsEmail(email) {
  var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  if (!regex.test(email)) {
    return false;
  } else {
    return true;
  }
}

// forgot password function

$("#forgot_password_button").on("click", function (e) {
  let forgot_email_password = $("#forgot_password_input").val().trim();
  // function to validate email
  function IsEmail(email) {
    var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!regex.test(email)) {
      return false;
    } else {
      return true;
    }
  }

  // validate empty input
  if (forgot_email_password == "") {
    swal
      .fire({
        title: "Error Authenticating",
        text: "Please provide the required credentials",
        icon: "warning",
        timer: 2100,
      })
      .then(() => {
        $("#login-form").toggleClass("is-hidden");
      });
    return false;
  }
  if (IsEmail(forgot_email_password) == false) {
    swal
      .fire({
        title: "Error Authenticating",
        text: "Please provide a valid email address",
        icon: "warning",
        timer: 3100,
      })
      .then(() => {});
    return false;
  }

  swal.showLoading("Please wait...");
  const url = "https://farm-aid-backend.herokuapp.com/api/users/forgotPassword";
  // const token = localStorage.getItem('access_token');
  forgot_email_password;
  let email_obj = {
    email: forgot_email_password,
  };
  // create request object
  var request = new Request(url, {
    method: "POST",
    body: JSON.stringify(email_obj),
    headers: new Headers({
      "Content-Type": "application/json",
    }),
  });

  fetch(request)
    .then(async (res) => {
      var resp = await res.json();
      if (resp.status == 200) {
        Swal.fire({
          title: "Reset Password Link Sent",
          text: `Please check your email inbox for a link to complete the reset.`,
          icon: "info",
          timer: 3000,
        });
      }
    })
    .catch((e) => {
      swal.close();
      console.log("Bad request...");
    });
  document.getElementById("forgot_password_input").value = "";
});

function parseJwt(token) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}

$(document).ready(function () {
  let html = "";
  const token = localStorage.getItem("access_token");
  var userObj = parseJwt(localStorage.getItem("access_token"));
  var img = document.createElement("img");
  img.src = userObj.user.avatar;
  maCompany = userObj.user.company;
  maEmail = userObj.user.email;
  html += "<h3>" + maCompany + "</h3>";
  html += "<p>" + maEmail + "</p>";
  $("#profile-head").html(html);
  $("#profile-head").append(img);
  $("#profile-me").append(img);
  $("#profile_name").html(userObj.user.lastname + " " + userObj.user.firtsname);
  $("#profile_name_h3").html(
    userObj.user.lastname + " " + userObj.user.firtsname
  );
  $("#profile_company").html(userObj.user.company);
  $("#profile_email").html(userObj.user.email);
  $("#phon_num").html(userObj.user.phoneNumber);
  $("#phon_num2").html(userObj.user.phoneNumber);
  $("#biz_category").html(userObj.user.bizCategory);
  $("#profile_biz_header").html(userObj.user.bizCategory);
  $("#profile-trigger").append(img);
  if ($("#logged_person").length) {
    $("#logged_person").html(
      "<p>Welcome " + userObj.user.email + "&nbsp;&nbsp;</p>"
    );
  }
});

function addScript(filename) {
  var head = document.getElementsByTagName("head")[0];

  var script = document.createElement("script");
  script.src = filename;
  script.type = "text/javascript";

  head.append(script);
}

let table = "#mytable";
$("#maxRows").on("change", function () {
  $(".pagination").html("");
  let trnum = 0;
  let maxRows = parseInt($(this).val());
  let totalRows = $(table + "tbody tr").length;
  $(table + " tr:gt(0)").each(function () {
    trnum++;
    if (trnum > maxRows) {
      $(this).hide();
    }

    if (trnum <= maxRows) {
      $(this).show();
    }
    if (totalRows > maxRows) {
      $(this).show();
    }
  });
  if (totalRows > maxRows) {
    let pagenum = Math.ceil(totalRows / maxRows);
    for (let i = 1; i <= pagenum; ) {
      $(".pagination")
        .append(
          '<li data-page="' +
            i +
            '"><span>' +
            i++ +
            '<span class="sr-only">(current)</span></span></li>'
        )
        .show();
    }
  }
  $(".pagination li:first-child").addClass("active");
  $(".pagination li").on("click", function () {
    let pageNum = $(this).attr("data-page");
    let trIndex = 0;
    $(".pagination li").removeClass("active");
    $(this).addClass("active");
    $(table + "tr:gt(0)").each(function () {
      trIndex++;
      if (
        trIndex > maxRows * pageNum ||
        trIndex <= maxRows * pageNum - maxRows
      ) {
        $(this).hide();
      } else {
        $(this).show();
      }
    });
  });
});

function isNumberKey(evt) {
  var charCode = evt.which ? evt.which : evt.keyCode;
  if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57))
    return false;

  return true;
}


