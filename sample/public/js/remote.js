var io = new CometIO().connect();
var screen = new MultiScreen(io, {type: "remote", channel: channel});
var tv = screen.tv;

io.on("connect", function(session){
  console.log("connect!! "+session);
});

$(function(){
  generate_code();
  $("select").change(generate_code);

  $("#btn_dispatch").click(function(e){
    // tv.$("#btn_red").click();
    // tv.$("#btn_blue").mouseover();
    eval( $("#code").val() );
  });
});

var generate_code = function(){
  var selector = $("#selector").val();
  var event_name = $('#event_name').val();
  $("#code").val( 'tv.$("'+selector+'").'+event_name+'();' );
};
