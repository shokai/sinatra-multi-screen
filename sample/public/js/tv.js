var io = new CometIO().connect();
var screen = new MultiScreen(io, {type: "tv", channel: channel});
var remote = screen.remote;

io.on("connect", function(session){
  console.log("connect!! "+session);
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
