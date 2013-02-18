var MultiScreen = function(cometio, options){
  if(typeof options === 'undefined' || typeof options.type === 'undefined'){
    throw new Error("argument must have connection type.");
  }
  var self = this;
  this.io = cometio;
  this.options = options;
  this.io.on("connect", function(session){
    self.io.push("__multiscreen__options", self.options);
  });
  if(options.type == "remote"){
    this.tv = {};
    new EventEmitter().apply(this.tv);
    this.tv.event = function(selector, event_name, args){
      self.io.push("__multiscreen__event", {selector: selector, event: event_name, args: args, options: self.options});
    };
    this.tv.$ = function(selector){
      return {
        click: function(){
          self.tv.event(selector, "click");
        },
        dblclick: function(){
          self.tv.event(selector, "dblclick");
        },
        mouseover: function(){
          self.tv.event(selector, "mouseover");
        },
        mousedown: function(){
          self.tv.event(selector, "mousedown");
        },
        mouseup: function(){
          self.tv.event(selector, "mouseup");
        },
        val: function(value){
          self.tv.event(selector, "val", value);
        },
        change: function(){
          self.tv.event(selector, "change");
        }
      };
    };
    this.io.on("__multiscreen__event", function(data){
      self.tv.emit(data.event, data.args);
    })
  }

  if(options.type == "tv"){
    this.remote = {};
    this.remote.push = function(event_name, args){
      self.io.push("__multiscreen__event", {event: event_name, args: args, options: self.options});
    };
    this.io.on("__multiscreen__event", function(data){
      if(typeof data.selector === 'undefined') return;
      if(typeof data.args === 'undefined'){
        $(data.selector)[data.event]();
      }else{
        $(data.selector)[data.event](data.args);
      }
    });
  }
};
