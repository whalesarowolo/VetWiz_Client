function start_blog() {
  $("#snow-container").ready(function () {
    if ($("#snow-container").length) {
      console.log("inside");
      $(".panel .ql-toolbar").remove();
    }
    console.log("In Editor now...");
    var bubble = new Quill("#bubble-container", {
      theme: "bubble",
      modules: {
        table: true,
        toolbar: [
          [
            { align: "" },
            { align: "center" },
            { align: "right" },
            { align: "justify" },
          ],
          [{ header: [1, 2, 3, 4, false] }],
          ["bold", "italic", "underline", "strike"],
          ["link", "blockquote", "code-block", "image", "video"],
          [
            { list: "ordered" },
            { list: "bullet" },
            {
              color: [
                "blue",
                "red",
                "yellow",
                "olive",
                "silver",
                "green",
                "aquamarine",
                "maroon",
                "magenta",
                "lime",
                "purple",
              ],
            },
            {
              background: [
                "blue",
                "red",
                "yellow",
                "olive",
                "silver",
                "green",
                "aquamarine",
                "maroon",
                "magenta",
                "lime",
                "purple",
              ],
            },
          ],
        ],
      },
    });
    var snow = new Quill("#snow-container", {
      theme: "snow",
      modules: {
        table: true,
        toolbar: [
          [
            { align: "" },
            { align: "center" },
            { align: "right" },
            { align: "justify" },
          ],
          [{ header: [1, 2, 3, 4, false] }],
          ["bold", "italic", "underline", "strike"],
          ["link", "blockquote", "code-block", "image", "video"],
          [
            { list: "ordered" },
            { list: "bullet" },
            {
              color: [
                "blue",
                "red",
                "yellow",
                "olive",
                "silver",
                "green",
                "aquamarine",
                "maroon",
                "magenta",
                "lime",
                "purple",
              ],
            },
            {
              background: [
                "blue",
                "red",
                "yellow",
                "olive",
                "silver",
                "green",
                "aquamarine",
                "maroon",
                "magenta",
                "lime",
                "purple",
              ],
            },
          ],
        ],
      },
    });
    var output = new Quill("#output-container", {
      theme: "bubble",
      modules: {
        table: true,
        toolbar: [
          [
            { align: "" },
            { align: "center" },
            { align: "right" },
            { align: "justify" },
          ],
          [{ header: [1, 2, 3, 4, false] }],
          ["bold", "italic", "underline", "strike"],
          ["link", "blockquote", "code-block", "image", "video"],
          [
            { list: "ordered" },
            { list: "bullet" },
            {
              color: [
                "blue",
                "red",
                "yellow",
                "olive",
                "silver",
                "green",
                "aquamarine",
                "maroon",
                "magenta",
                "lime",
                "purple",
              ],
            },
            {
              background: [
                "blue",
                "red",
                "yellow",
                "olive",
                "silver",
                "green",
                "aquamarine",
                "maroon",
                "magenta",
                "lime",
                "purple",
              ],
            },
          ],
        ],
      },
      readOnly: true,
    });
    bubble.on("text-change", function (delta, old, source) {
      if (source === "user") {
        snow.updateContents(delta, "api");
        updateOutput();
      }
    });
    const table = snow.getModule("table");
    snow.on("text-change", function (delta, old, source) {
      if (source === "user") {
        bubble.updateContents(delta, "api");
        updateOutput();
      }
    });

    function updateOutput() {
      const bubbleContent = bubble.getContents();
      const snowContent = snow.getContents();
      // TODO compare
      output.setContents(bubbleContent);
      const outputContent = output.getContents();
      // TODO compare outputContent
      console.log("Output: 👉 ", outputContent);
      localStorage.setItem("blog_posted", JSON.stringify(outputContent));
    }

    document
      .querySelector("#insert-table")
      .addEventListener("click", function () {
        table.insertTable(2, 2);
      });
    document
      .querySelector("#insert-row-above")
      .addEventListener("click", function () {
        table.insertRowAbove();
      });
    document
      .querySelector("#insert-row-below")
      .addEventListener("click", function () {
        table.insertRowBelow();
      });
    document
      .querySelector("#insert-column-left")
      .addEventListener("click", function () {
        table.insertColumnLeft();
      });
    document
      .querySelector("#insert-column-right")
      .addEventListener("click", function () {
        table.insertColumnRight();
      });
    document
      .querySelector("#delete-row")
      .addEventListener("click", function () {
        table.deleteRow();
      });
    document
      .querySelector("#delete-column")
      .addEventListener("click", function () {
        table.deleteColumn();
      });
    document
      .querySelector("#delete-table")
      .addEventListener("click", function () {
        table.deleteTable();
      });
  });
}

function persist_new_blog_topic() {
  // Call updateOutput and send to remote store
  swal.fire({
    title: "Please wait",
    text: "Formating Blog Content...",
    icon: "info",
    allowOutsideClick: false,
    showConfirmButton: false,
  });

  var local_blog_content = localStorage.getItem("blog_posted");
  let the_blog_content = local_blog_content
    ? local_blog_content
    : { message: "No Content" };
  // let the_blog_content = (local_blog_content)? JSON.parse(local_blog_content) : {'message': 'No Content'};

  //Do value validations
  const blog_data = {
    blogTitle: $("#the_title").val(),
    blogDescription: the_blog_content,
  };
  var formData = new FormData();
  formData.append("values", JSON.stringify(blog_data));

  const token = localStorage.getItem("access_token");
  fetch("https://vetwiz-server-alpha.herokuapp.com/api/v1/blog/add", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      ContentType: "appliation/json",
    },
    body: formData,
  })
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
            localStorage.removeItem("blog_posted");
            swal.close();
          });
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function get_blog_posts() {
  var output = new Quill("#remote-container", {
    theme: "bubble",
    modules: {
      table: true,
      toolbar: [
        [
          { align: "" },
          { align: "center" },
          { align: "right" },
          { align: "justify" },
        ],
        [{ header: [1, 2, 3, 4, false] }],
        ["bold", "italic", "underline", "strike"],
        ["link", "blockquote", "code-block", "image", "video"],
        [
          { list: "ordered" },
          { list: "bullet" },
          {
            color: [
              "blue",
              "red",
              "yellow",
              "olive",
              "silver",
              "green",
              "aquamarine",
              "maroon",
              "magenta",
              "lime",
              "purple",
            ],
          },
          {
            background: [
              "blue",
              "red",
              "yellow",
              "olive",
              "silver",
              "green",
              "aquamarine",
              "maroon",
              "magenta",
              "lime",
              "purple",
            ],
          },
        ],
      ],
    },
    readOnly: true,
  });

  swal
    .fire({
      title: "Loading Blog Data",
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

      $("#remote-container").ready(function () {
        const url = "https://vetwiz-server-alpha.herokuapp.com/api/v1/blog/get";
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
            console.log("The Blog Object: ", data);
            localStorage.setItem("current_blog_posts_admin", data.data);
            if (data.data && data.data.length > 0) {
              output &&
                output.setContents(JSON.parse(data.data[0].blogDescription));
            } else {
              swal.close();
              swal.fire({
                title: "No data",
                text: "No data available at the moment",
                icon: "info",
                showConfirmButton: true,
                allowOutsideClick: true,
                timer: 3000,
              });
            }
          });
        swal.close();
      });
    });
}
