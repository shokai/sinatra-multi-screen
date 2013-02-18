var io = new CometIO().connect();
var screen = new MultiScreen(io, {type: "tv", channel: channel});
var remote = screen.remote;

io.on("connect", function(session){
  console.log("connect!! "+session);
});

var youtube;
var onYouTubePlayerReady = function(id){
  console.log('youtube ready');
  youtube = document.getElementById("player");
  youtube.addEventListener("onStateChange", "onYouTubeStateChange");
};

var onYouTubeStateChange = function(status){
  console.log("status changed:"+status);
  switch(status){
  case 1:
    var duration = youtube.getDuration();
    $("#range_seek").attr("max", duration);
    remote.push("get_duration", duration);
    break;
  };
};

$(function(){
  var params = { allowScriptAccess: "always" };
  var atts = { id: "player" };
  var url = "http://www.youtube.com/apiplayer?enablejsapi=1&version=3";
  swfobject.embedSWF(url, "youtube_player", "500", "400", "8", null, null, params, atts);

  $("#btn_search").click(function(e){
    var word = $("#text_search").val();
    $.getJSON(search_api, {word: word}, function(res){
      console.log(res);
      $("h1").text(res.title);
      youtube.cueVideoById(res.video_id);
      var url = youtube.getVideoUrl();
      $("#video_url").html(
        $("<a>").attr("href", url).text(url)
      );
    });
  });

  var btn_play = $("#btn_play");
  btn_play.click(function(e){
    if(youtube.getPlayerState() == 1){
      youtube.pauseVideo();
      btn_play.val('play');
    }
    else{
      youtube.playVideo();
      btn_play.val('pause');
    }
  });

  $("#btn_seek").click(function(e){
    youtube.seekTo(youtube.getCurrentTime() + 20);
  });
  $("#btn_seekback").click(function(e){
    youtube.seekTo(youtube.getCurrentTime() - 20);
  });

  var range_seek = $("#range_seek");
  range_seek.change(function(e){
    youtube.seekTo(range_seek.val());
  });

  setInterval(function(){
    if(typeof youtube !== 'undefined'){
      var time = youtube.getCurrentTime();
      $("#range_seek").val(time);
      $("#text_seek").val(time);
      remote.push("seek", time);
    }
  }, 1000);
});
