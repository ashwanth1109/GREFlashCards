$(() => {
  console.log($);

  let difficulty = "";

  $(".card").flip({ axis: "x" });

  $(`.difficulty`).on("click", e => {
    if ($(e.target).hasClass("yellow")) {
      $(e.target).removeClass("yellow");
      difficulty = "";
      $("#wordDifficulty")
        .attr("name", "difficulty")
        .attr("value", difficulty);
    } else {
      difficulty = $(e.target).attr("difficulty");
      $("#wordDifficulty")
        .attr("name", "difficulty")
        .attr("value", difficulty);
      $(".difficulty").removeClass("yellow");
      $(e.target).addClass("yellow");
    }
  });

  if ($(".previous").hasClass("grey")) {
    $(".previous").removeClass("grey");
  }

  const currentURL = $(location).attr("href");
  const urlStringArray = currentURL.split("/");

  const nextId = Number(urlStringArray[urlStringArray.length - 1]) + 1;
  const previousId = Number(urlStringArray[urlStringArray.length - 1]) - 1;
  urlStringArray[urlStringArray.length - 1] = (
    Number(urlStringArray[urlStringArray.length - 1]) + 1
  ).toString();

  $(".previous").on("click", () => {
    urlStringArray[urlStringArray.length - 1] = previousId;
    const newURL = urlStringArray.join("/");
    window.location.href = newURL;
  });
  $(".next").on("click", () => {
    urlStringArray[urlStringArray.length - 1] = nextId;
    const newURL = urlStringArray.join("/");
    window.location.href = newURL;
  });

  if (previousId < 0) {
    $(".previous").off("click");
    $(".previous")
      .removeClass("yellow")
      .removeClass("hoverButton")
      .addClass("grey");
  }

  if (nextId === Number($("#wordPosition").attr("totalWords"))) {
    $(".next").off("click");
    $(".next")
      .removeClass("yellow")
      .removeClass("hoverButton")
      .addClass("grey");
  }
  console.log($("#wordPosition").attr("currentWord"));
  console.log($("#wordPosition").attr("totalWords"));

  $(".disabled")
    .removeClass("yellow hoverButton")
    .addClass("grey")
    .off("click");

  const disabledButtons = $(".disabled");
  for (const disabledButton of disabledButtons) {
    if ($(disabledButton).hasClass("delete")) {
      console.log(`detecting disabled delete button`);
      console.log($(".delete"));
      $(".delete").attr("disabled", "disabled");
    }
  }

  // if (nextId > )
});
