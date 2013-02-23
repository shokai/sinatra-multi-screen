// Remote Side
var io = new CometIO().connect();
var screen = new MultiScreen(io, {type: "remote", channel: channel});
var tv = screen.tv;

io.on("connect", function(session){
  console.log("connect!! "+session);
});

// from TV
tv.on("message", function(msg){
  console.log(msg);
});

$(function(){
  generate_code();
  $("select").change(generate_code);

  $("#btn_dispatch").click(function(e){
    eval( $("#code").val() ); // dispatch UI Event on TV
  });
});

var generate_code = function(){
  var selector = $("#selector").val();
  var event_name = $('#event_name').val();
  $("#code").val( 'tv.$("'+selector+'").'+event_name+'();' );
};
