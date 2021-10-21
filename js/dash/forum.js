//Implement forum topic persistence logic here

function persist_new_forum_topic() {
  swal.fire({
    title: "Please wait",
    text: "Formating forum topic...",
    icon: "info",
    allowOutsideClick: false,
    showConfirmButton: false,
  });

  var forum_topic_title = $("#forum_topic_title").val();

  var forum_topic_description = $("#forum_topic_description").val();

  const dis_img = document.getElementById("image_a").files[0];
  // const dis_img_1 = document.getElementById("image_b").files[0];
  // const dis_img_2 = document.getElementById("image_c").files[0];

  //Do value validations
  const data = {
    title: forum_topic_title,
    description: forum_topic_description,
  };
  var formData = new FormData();
  formData.append("values", JSON.stringify(data));
  formData.append("file", dis_img);

  const token = localStorage.getItem("access_token");
  fetch(
    "https://vetwiz-server-alpha.herokuapp.com/api/v1/forum/web/save-topic",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        ContentType: "appliation/json",
      },
      body: formData,
    }
  )
    .then((res) => {
      if (res) {
        swal
          .fire({
            title: "Data saved",
            text: "Topic has been saved",
            icon: "success",
            timer: 3000,
          })
          .then(() => {
            swal.close();
          });
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

// Implement forum topic listing

function refresh_forum_topics() {
  let disease_dataId;
  let html = "";
  swal
    .fire({
      title: "Loading Topic Data",
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
        allowOutsideClick: true,
        showConfirmButton: false,
      });

      $("#forum_topic_description").ready(function () {
        const url =
          "https://vetwiz-server-alpha.herokuapp.com/api/v1/admin/topics";
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
            console.log("The Topics Object: ", data);
            data.forEach((datas) => {
              html += "<header>" + datas.title + "</header><br />";
              html +=
                '<div style="display: flex; "><img style="float: left; border-radius: 20px; width: 220px; height: auto;" src="' +
                datas.imageUrl +
                '" />';
              html +=
                '<p style="margin-left: 20px; float: right; border-radius: 10px; padding: 7px; box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);">' +
                datas.description +
                "</p></div><hr />";
              let theSection = document.createElement("section");
              theSection.innerHTML = html;
              document
                .getElementById("forum_topic_description")
                .appendChild(theSection);
            });
            swal.close();
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      });
    });
}
