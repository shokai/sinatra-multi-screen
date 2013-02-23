var io = new CometIO().connect();
var screen = new MultiScreen(io, {type: "tv", channel: channel});
var remote = screen.remote;

io.on("connect", function(session){
  console.log("connect!! "+session);
});

remote.on("ui_event", function(data){
  console.log(data);
});

$(function(){
  $(".btn").click(function(e){
    alert(e.currentTarget.innerText);
    remote.push("message", "click button #"+e.currentTarget.id);
  });

  $(".btn").mouseover(function(e){
    var color = e.currentTarget.attributes['x-color'].value;
    $("body").css("background-color", color);
    remote.push("message", "mouse over "+color);
  });
});
