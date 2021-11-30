function get_blog_posts(index) {
  console.log("Getting The Blog content");

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

  var output_2 = new Quill("#remote-container_2", {
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
        allowOutsideClick: false,
        showConfirmButton: false,
      });

      $("#remote-container").ready(function () {
        console.log("Checking network to ascertain connectivity...");
        const url = "https://vetwiz-server-alpha.herokuapp.com/api/v1/blog/get";
        const token = localStorage.getItem("access_token");
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        // headers.append("authorization", `Bearer ${token}`);
        fetch(url, {
          method: "GET",
          headers,
        })
          .then(async (res) => res.json())
          .then((data) => {
            console.log("The Blog Object: ", data);
            localStorage.setItem(
              "current_public_blog_posts",
              JSON.stringify(data.data)
            );
            if (data.data && data.data.length > 0) {
              if (index >= 2) {
                output &&
                  output.setContents(JSON.parse(data.data[0].blogDescription));
                output_2 &&
                  output_2.setContents(
                    JSON.parse(data.data[1].blogDescription)
                  );
              } else {
                output &&
                  output.setContents(JSON.parse(data.data[0].blogDescription));
              }
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

function display_blog_at_pointer(curr_pointer) {
  // Check localstorage and get current blog posts global object
  // Iterate and cycle through current blogs object holder and display item at current pointer position
  let current_blogs =
    localStorage.getItem("current_public_blog_posts") != null &&
    localStorage.getItem("current_public_blog_posts").length > 0
      ? localStorage.getItem("current_public_blog_posts")
      : [];
  var the_output = new Quill("#remote-container", {
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
  current_blogs.length > 0
    ? the_output.setContents(
        JSON.parse(
          JSON.parse(localStorage.getItem("current_public_blog_posts"))[
            curr_pointer
          ].blogDescription
        )
      ) &&
      console.log(
        "The current blog now, ",
        JSON.parse(localStorage.getItem("current_public_blog_posts"))[
          curr_pointer
        ]
      )
    : alert("Nothing to worry about...");
}
