var MultiScreen = function(cometio, options){
  if(typeof options === 'undefined' || typeof options.type === 'undefined'){
    throw new Error("argument must have connection type.");
  }
  var self = this;
  this.io = cometio;
  this.options = options;
  if(options.type == "remote"){
    this.tv = {};
    this.tv.event = function(selector, event_name){
      self.io.push("__multiscreen__event", {selector: selector, event: event_name});
    }
  }

  if(options.type == "tv"){
    console.log("set tv side events");
    this.io.on("__multiscreen__event", function(data){
      console.log("click !!!");
      $(data.selector)[data.event]();
    });
  }
};
