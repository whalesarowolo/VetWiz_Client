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
            console.log("Vetshops: ", data);
            data.forEach((shopdata) => {
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
              html += "<td></td>";
              html += "<td>" + shop_name + "</td>";
              html += "<td>" + shop_state + "</td>";
              html += "<td>" + shop_lga + "</td>";
              html += "<td>" + shop_address + "</td>";
              html += "<td>" + shop_phone + "</td>";
              html +=
                '<td><span  class="view_handler" style="color:#fff; background-color: #26d0a8; padding:5px; border-radius:8px; cursor:pointer; box-shadow: 5px 5px #888888; text-align:center;" onclick="attach(event)" data_id=' +
                `${shop_Id}` +
                "> View" +
                "</span>";
              html += "</tr>";

              document.getElementById("view_vetshops_table").innerHTML = html;
            });

            swal.close();
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      });
    });
}
