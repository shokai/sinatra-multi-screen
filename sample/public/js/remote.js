var cometio = new CometIO().connect();
var screen = new MultiScreen(cometio, {type: "remote"});
var tv = screen.tv;

cometio.on("connect", function(session){
  console.log("connect!! "+session);
  $("#btn_play").click(function(e){
    tv.$("#btn_play").click();
  });

  $("#btn_seek").click(function(e){
    tv.$("#btn_seek").click();
  });
  $("#btn_seekback").click(function(e){
    tv.$("#btn_seekback").click();
  });

});

$(function(){
});
