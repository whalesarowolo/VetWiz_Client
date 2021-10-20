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
