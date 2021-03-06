sinatra-multi-screen
====================
Sinatra Plugin for Multi-Screen Application.


Installation
------------

    % gem install sinatra-multi-screen

Requirements
------------
* Ruby 1.8.7+ or 1.9.2+
* Sinatra 1.3.0+
* EventMachine
* jQuery
* [sinatra-comeio](http://shokai.github.com/sinatra-cometio)


Usage
-----

### Sinatra Setup

```ruby
require 'sinatra'
require 'sinatra/cometio'
require 'sinatra/multi_screen'

run Sinatra::Application
```
```html
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js"></script>
<script src="<%= cometio_js %>"></script>
<script src="<%= multi_screen_js %>"></script>
```

### Remote --(dispatch UI Event)--> TV

Remote Side
```javascript
var io = new CometIO().connect();
var screen = new MultiScreen(io, {type: "remote", channel: "1"});
var tv = screen.tv;

io.on("connect", function(session){
  tv.$("#btn").click();  // dispatch CLICK event on TV Side
};

tv.on("ui_event", function(data){  // UI Event echo back from TV
  alert(data.event+' was dispatched on TV-side '+data.selector);
});
```

TV Side
```html
<input type="button" id="btn" value="hello" />
```
```javascript
var io = new CometIO().connect();
var screen = new MultiScreen(io, {type: "tv", channel: "1"});
var remote = screen.remote;

$(function(){
  $("#btn").click(function(e){ // regist click event
    alert("hello!!");
  });
});
```

### TV --(push event)--> Remote

TV Side
```javascript
remote.push("change_color", {color: #FF0000"});  // push "change_color" event to Remote
```

Remote Side
```javascript
tv.on("change_color", function(data){ // regist "change_color" event
  $("body").css("background-color", data.color);
});
```

### Remote --(push event)--> TV

Remote Side
```javascript
tv.push("mode", "fullscreen");  // push "mode" to TV
```

TV Side
```javascript
remote.on("mode", function(data){
  console.log(data);
});
```


### Events on Server

Sinatra Side
```ruby
MultiScreen.on :connect do |client|
  puts "new client #{client.inspect}"
  p MultiScreen.channels
end

MultiScreen.on :disconnect do |client|
  puts "client disconnect - #{client.inspect}"
  p MultiScreen.channels
end

MultiScreen.on :ui_event do |data, from|
  puts "Remote --(dispatch UI Event)--> TV"
end
```


### Server ---(push event)--> TV or Remote

Sinatra Side
```ruby
data = {:message => 'hello!!'}
MultiScreen.push :foo, data  # to all TV and Remote
MultiScreen.push :foo, data, {:type => "tv"}  # to all TV
MultiScreen.push :foo, data, {:type => "remote", :channel => "1"}
```

TV or Remote Side
```javascript
screen.on("foo", function(data){
  alert(data.message);
});
```


Samples
-------
* https://github.com/shokai/sinatra-multi-screen/tree/master/sample
* http://multiscreen-youtube.herokuapp.com
* https://github.com/shokai/multiscreen-youtube-sample


Contributing
------------
1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request
