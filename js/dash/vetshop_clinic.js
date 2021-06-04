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
            // data.forEach((datas) => {
            //   let Disease = datas.disease;
            //   let Disease_hausa = datas.diseaseHausa;
            //   let Disease_fulfude = datas.diseaseFulfude;
            //   let animal = datas.animal;
            //   let Vaccine = datas.vaccine;
            //   let associated_animal = datas.animalAssocaited;
            //   let key_Word = datas.keyWord;
            //   disease_dataId = datas._id;
            //   // let associated_animal = datas._id;
            //   // let keyWord = datas._id;

            //   html += "<tr>";
            //   html += "<td></td>";
            //   html += "<td>" + Disease + "</td>";
            //   html += "<td>" + Disease_hausa + "</td>";
            //   html += "<td>" + Disease_fulfude + "</td>";
            //   html += "<td>" + animal + "</td>";
            //   // html += '<td>' + Treatment + '</td>'
            //   html += "<td>" + associated_animal + "</td>";
            //   // html += "<td>" + Vaccine + "</td>"
            //   html += "<td>" + key_Word + "</td>";
            //   html +=
            //     '<td><span  class="view_handler" style="color:#fff; background-color: #26d0a8; padding:5px; border-radius:8px; cursor:pointer; box-shadow: 5px 5px #888888; text-align:center;" onclick="attach(event)" data_id=' +
            //     `${disease_dataId}` +
            //     "> View" +
            //     "</span>";
            //   html += "</tr>";

            //   document.getElementById("view_vetshops_table").innerHTML = html;
            // });

            swal.close();
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      });
    });
}
