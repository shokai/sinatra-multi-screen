var cometio = new CometIO().connect();
var screen = new MultiScreen(cometio, {type: "remote"});
var tv = screen.tv;

cometio.on("connect", function(session){
  console.log("connect!! "+session);
});

$(function(){
  $("#btn_play").click(function(e){
    tv.event("#btn_play", "click");
  });
});
