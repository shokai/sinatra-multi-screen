var cometio = new CometIO().connect();
var screen = new MultiScreen(cometio, {type: "remote"});
var tv = screen.tv;

cometio.on("connect", function(session){
  console.log("connect!! "+session);

  $("#btn_load").click(function(e){
    var id = $("#video_id").val();
    tv.$("#video_id").val(id);
    tv.$("#btn_load").click();
  });

  $("#video_id").keydown(function(e){
    var id = $("#video_id").val();
    tv.$("#video_id").val(id);
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
});
