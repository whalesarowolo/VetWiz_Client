$.ready((params) =>{
    console.log("Starting now...");
    gombefarmerSwal("noting");
})

/**
 * Start definition for gombe Farmers retrieval
 * @param {*} params
 */
 function gombefarmerSwal(params) {
    addScript("https://cdn.datatables.net/1.10.20/js/jquery.dataTables.min.js");
  
    swal
      .fire({
        title: "Loading Farmers Data from Gombe",
        text: "Please wait...",
        timer: 4000,
        allowOutsideClick: false,
        showConfirmButton: false,
        icon: "info",
      })
      .then(function () {
        $("#gombetable").fadeOut("fast");
        swal.fire({
          title: "Please wait",
          text: "Loading data ....",
          icon: "info",
          allowOutsideClick: false,
          showConfirmButton: false,
        });
  
        $("#gombetable").ready(function () {
          const url =
            "https://farm-aid-backend.herokuapp.com/api/farmer/state/Gombe";
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
              // DataTable here
  
              if ($("#example_tase").length) {
                $("#example_tase").DataTable({
                  data: data,
                  columns: [
                    { data: "firstname" },
                    { data: "lastname" },
                    { data: "gender" },
                    { data: "phoneNumber" },
                    { data: "state" },
                    { data: "lga" },
                    { data: "marital_status" },
                  ],
                });
  
                html =
                  "<span>" +
                  "Total Number of Farmers in Gombe: " +
                  data.length +
                  "</span>";
                document.getElementById("gob").innerHTML = html;
              }
  
              // End DataTable here
            })
            .catch((error) => {
              console.error("Error:", error);
            });
        });
  
        Swal.close();
      });
  }
  // End of Gombe Farmers retrieval

