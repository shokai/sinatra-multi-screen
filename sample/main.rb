helpers do
  def app_name
    "Sinatra-Multi-Screen Sample"
  end

  def app_root
    "#{env['rack.url_scheme']}://#{env['HTTP_HOST']}#{env['SCRIPT_NAME']}"
  end
end

MultiScreen.on :connect do |client|
  puts "new client #{client.inspect}"
  p MultiScreen.channels
  to = case client[:type]
       when "tv" then "remote"
       when "remote" then "tv"
       end
  MultiScreen.push :new_client, client, {:type => to, :channel => client[:channel]}
end

MultiScreen.on :disconnect do |client|
  puts "client disconnect - #{client.inspect}"
  p MultiScreen.channels
end

MultiScreen.on :ui_event do |data, from|
  puts "UI Event $('#{data['selector']}').#{data['event']}(#{data['arg']}) -- from #{from.inspect}"
end

before '/*' do
  @title = app_name
end

get '/' do
  haml :index
end

get '/tv/:channel' do
  @channel = params[:channel]
  haml :tv
end

get '/remote/:channel' do
  @channel = params[:channel]
  haml :remote
end

get '/:source.css' do
  scss params[:source].to_sym
end
