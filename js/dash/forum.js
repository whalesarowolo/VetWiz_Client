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
        allowOutsideClick: false,
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
            console.log(data);
            data.forEach((datas) => {
              let forumTopic = datas.title;
              let forumTopicDescription = datas.description;
              let forumTopicAvatar = datas.avatar && datas.avatar;
              html += "<div>";
              html += "<header>" + forumTopic + "</header>";
              html += "<h1>" + forumTopicDescription + "</h1>";
              html += "<img src=" + forumTopicAvatar + " />";
              html += "</div>";

              document
                .getElementById("forum_topic_description")
                .appendChild(html);
            });
            swal.close();
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      });
    });
}
