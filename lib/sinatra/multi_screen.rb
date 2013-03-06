require File.expand_path '../sinatra-multi-screen', File.dirname(__FILE__)
require 'sinatra/cometio'
require File.expand_path '../sinatra-multi-screen/application', File.dirname(__FILE__)

Sinatra.register Sinatra::MultiScreen

class MultiScreen

  def self.channels
    @@channels ||= Hash.new{|h,channel_id|
      h[channel_id] = {
        'tv' => [],
        'remote' => []
      }
    }
  end

  def self.push(event, data, opts={})
    ids = nil
    channel = opts[:channel].to_s
    type = opts[:type].to_s
    if !channel.empty? and !type.empty?
      ids = channels[channel][type] or []
    elsif !channel.empty?
      ids = channels[channel].values.flatten or []
    elsif !type.empty?
      ids = channels.values.map{|i| i[type] }.flatten or []
    else
      ids = channels.values.map{|i| i.values }.flatten or []
    end
    ids.each do |session_id|
      CometIO.push(:__multiscreen__server,
                   {:event => event, :data => data},
                   {:to => session_id})
    end
  end

end

EventEmitter.apply MultiScreen
