require File.expand_path '../sinatra-multi-screen', File.dirname(__FILE__)
require 'sinatra/cometio'
require File.expand_path 'application', File.dirname(__FILE__)


CometIO.on :__multiscreen__event do |data, from|
  CometIO.push :__multiscreen__event, data
end
