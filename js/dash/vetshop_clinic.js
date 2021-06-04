function viewVetshops(params) {
  let vetshop_dataId;

  let html = "";
  swal
    .fire({
      title: "Loading Vetshops / Clinic Data",
      text: "Please wait...",
      timer: 3000,
      allowOutsideClick: false,
      showConfirmButton: false,
      icon: "info",
    })
    .then(function () {
      Swal.fire({
        title: "Please wait",
        text: "Loading data ....",
        icon: "info",
        allowOutsideClick: false,
        showConfirmButton: false,
      });

      $("#view_vetshops_table").ready(function () {
        const url =
          "https://vetwiz-server-alpha.herokuapp.com/api/v1/vet-shops";
        const token = localStorage.getItem("access_token");
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("authorization", `Bearer ${token}`);
        fetch(url, {
          method: "GET",
          headers,
        })
          .then(async (res) => res.json())
          .then((data) => {
            // console.log("Vetshops: ", data);
            data.forEach((shopdata, ind) => {
              let shop_name = shopdata.name;
              let shop_state = shopdata.state;
              let shop_lga = shopdata.lga;
              let shop_phone = shopdata.contactPhone;
              let shop_address = shopdata.address;
              let shop_vcn = shopdata.vcn;
              let shop_cacRegistered = shopdata.cacRegistered;
              let shop_nvirRegistered = shopdata.nvirRegistered;
              shop_Id = shopdata._id;

              //   Build the table UI

              html += "<tr>";
              html += "<td>" + `${ind + 1}` + "</td>";
              html += "<td>" + shop_name.toUpperCase() + "</td>";
              html += "<td>" + shop_state + "</td>";
              html += "<td>" + shop_lga + "</td>";
              html += "<td>" + shop_phone + "</td>";
              html += "<td>" + shop_address + "</td>";
              html += "</tr>";

              document.getElementById("view_vetshops_table").innerHTML = html;
            });

            swal.close();
            document.getElementById("vnc_count").innerHTML = data.length;
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      });
    });
}

$("#dash-vetshops").ready(function () {
  const url = "https://vetwiz-server-alpha.herokuapp.com/api/v1/vet-shops";
  const token = localStorage.getItem("access_token");
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("authorization", `Bearer ${token}`);
  fetch(url, {
    method: "GET",
    headers,
  })
    .then(async (res) => res.json())
    .then((data) => {
      //   console.log("Dashboard Vetshops: ", data);
      $("#dash-vetshops").html("" + data.length);
    });
});

$("#dash-users").ready(function () {
  const url = "https://vetwiz-server-alpha.herokuapp.com/api/v1/admin/users";
  const token = localStorage.getItem("access_token");
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("authorization", `Bearer ${token}`);
  fetch(url, {
    method: "GET",
    headers,
  })
    .then(async (res) => res.json())
    .then((data) => {
      //   console.log("Dashboard Users: ", data);
      $("#dash-users").html("" + data.length);
    });
});

$("#dash-diagnosis").ready(function () {
  const url =
    "https://vetwiz-server-alpha.herokuapp.com/api/v1/diagnosis/get-count";
  const token = localStorage.getItem("access_token");
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("authorization", `Bearer ${token}`);
  fetch(url, {
    method: "GET",
    headers,
  })
    .then(async (res) => res.json())
    .then((data) => {
      //   console.log("Dashboard Diagnosis: ", data);
      $("#dash-diagnosis").html("" + data.data);
    });
});
