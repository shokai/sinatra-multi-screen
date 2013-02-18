require File.expand_path '../sinatra-multi-screen', File.dirname(__FILE__)
require 'sinatra/cometio'
require File.expand_path 'application', File.dirname(__FILE__)

class MultiScreen

  def self.channels
    @@channels ||= Hash.new{|h,channel_id|
      h[channel_id] = {
        'tv' => [],
        'remote' => []
      }
    }
  end

end

EventEmitter.apply MultiScreen
