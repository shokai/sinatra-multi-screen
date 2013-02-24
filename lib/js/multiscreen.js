var MultiScreen = function(cometio, options){
  if(typeof options === 'undefined'){
    throw new Error("argument error: option is empty.");
  }
  if(typeof options.type === 'undefined'){
    throw new Error("argument must have connection type.");
  }
  if(typeof options.channel === 'undefined' || options.channel.length < 1){
    options.channel = "__default__channel__";
  }
  var self = this;
  this.io = cometio;
  this.options = options;
  this.io.on("connect", function(session){
    self.io.push("__multiscreen__options", self.options);
  });

  var to;
  if(options.type === 'remote') to = 'tv';
  else if(options.type === 'tv') to = 'remote';
  if(typeof to === 'undefined'){
    throw new Error('argument error: type must be "tv" or "remote"');
  }
  this[to] = {};
  new EventEmitter().apply(this[to]);
  this[to].push = function(event_name, data){
    self.io.push("__multiscreen__data", {event: event_name, data: data, options: self.options});
  };
  this.io.on("__multiscreen__data", function(data){
    self[to].emit(data.event, data.data);
  })

  if(options.type == "remote"){
    this.tv.ui_event = function(selector, event_name, arg){
      self.tv.push("ui_event", {selector: selector, event: event_name, arg: arg});
    };
    this.tv.$ = function(selector){
      return {
        click: function(){
          self.tv.ui_event(selector, "click");
        },
        dblclick: function(){
          self.tv.ui_event(selector, "dblclick");
        },
        mouseover: function(){
          self.tv.ui_event(selector, "mouseover");
        },
        mousedown: function(){
          self.tv.ui_event(selector, "mousedown");
        },
        mouseup: function(){
          self.tv.ui_event(selector, "mouseup");
        },
        val: function(value){
          self.tv.ui_event(selector, "val", value);
        },
        change: function(){
          self.tv.ui_event(selector, "change");
        }
      };
    };
  }

  if(options.type == "tv"){
    self.remote.on("ui_event", function(data){
      if(typeof data.selector === 'undefined' ||
         typeof data.event === 'undefined') return;
      if(typeof data.arg === 'undefined'){
        $(data.selector)[data.event]();
      }else{
        $(data.selector)[data.event](data.arg);
      }
      self.remote.push("ui_event", data);
    });
  }
};
