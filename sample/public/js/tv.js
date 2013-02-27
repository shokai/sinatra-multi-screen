// TV Side
var io = new CometIO().connect();
var screen = new MultiScreen(io, {type: "tv", channel: channel});
var remote = screen.remote;

io.on("connect", function(session){
  console.log("connect!! "+session);
});

// catch UI Event from Remote
remote.on("ui_event", function(data){
  $("#message").text(JSON.stringify(data));
});

// push from server
screen.on("new_client", function(e){
  $("#message").text("new Remote <"+e.session+"> available.");
});

$(function(){
  $(".btn").click(function(e){
    alert(e.currentTarget.innerText);
  });

  $(".btn").mouseover(function(e){
    var color = e.currentTarget.attributes['x-color'].value;
    $("body").css("background-color", color);
  });
});
