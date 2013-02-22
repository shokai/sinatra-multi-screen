var io = new CometIO().connect();
var screen = new MultiScreen(io, {type: "remote", channel: channel});
var tv = screen.tv;

io.on("connect", function(session){
  console.log("connect!! "+session);
});

$(function(){
  $("#btn_dispatch").click(function(e){
    var selector = $("#selector").val();
    var event_name = $('#event_name').val();
    // tv.$("#btn_red").click();
    tv.$(selector)[event_name]();
  });
});
