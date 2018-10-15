$(() => {
  console.log($);

  let difficulty = "";

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
});
