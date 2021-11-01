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
