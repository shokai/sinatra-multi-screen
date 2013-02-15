var MultiScreen = function(cometio, options){
  if(typeof options === 'undefined' || typeof options.type === 'undefined'){
    throw new Error("argument must have connection type.");
  }
  var self = this;
  this.io = cometio;
  this.options = options;
  if(options.type == "remote"){
    this.tv = {};
    this.tv.event = function(selector, event_name, args){
      self.io.push("__multiscreen__event", {selector: selector, event: event_name, args: args});
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
  }

  if(options.type == "tv"){
    console.log("set tv side events");
    this.io.on("__multiscreen__event", function(data){
      console.log(data);
      if(typeof data.args === 'undefined'){
        $(data.selector)[data.event]();
      }else{
        $(data.selector)[data.event](data.args);
      }
    });
  }
};
