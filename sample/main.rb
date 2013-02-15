helpers do
  def app_name
    "Multi-Screen Video Player"
  end

  def app_root
    "#{env['rack.url_scheme']}://#{env['HTTP_HOST']}#{env['SCRIPT_NAME']}"
  end
end

CometIO.on :connect do |session|
  puts "new client <#{session}>"
  CometIO.push :chat, {:name => "system", :message => "new client <#{session}>"}
  CometIO.push :chat, {:name => "system", :message => "welcome <#{session}>"}, {:to => session}
end

before '/*' do
  @title = app_name
end

get '/' do
  haml :index
end

get '/tv' do
  haml :tv
end

get '/remote' do
  haml :remote
end

get '/:source.css' do
  scss params[:source].to_sym
end
