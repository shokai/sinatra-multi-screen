var io = new CometIO().connect();
var screen = new MultiScreen(io, {type: "remote", channel: channel});
var tv = screen.tv;

io.on("connect", function(session){
  console.log("connect!! "+session);

  $("#btn_search").click(function(e){
    var word = $("#text_search").val();
    tv.$("#text_search").val(word);
    tv.$("#btn_search").click();
  });

  $("#text_search").keydown(function(e){
    var word = $("#text_search").val();
    tv.$("#text_search").val(word);
  });

  $("#btn_play").click(function(e){
    tv.$("#btn_play").click();
  });

  $("#btn_seek").click(function(e){
    tv.$("#btn_seek").click();
  });
  $("#btn_seekback").click(function(e){
    tv.$("#btn_seekback").click();
  });

  var range_seek = $("#range_seek");
  range_seek.change(function(e){
    tv.$("#range_seek").val( range_seek.val() );
    tv.$("#range_seek").change();
  });

  tv.on("seek", function(time){
    $("#text_seek").val(time);
    range_seek.val(time);
  });

  tv.on("get_duration", function(duration){
    range_seek.attr("max", duration);
  });
});
