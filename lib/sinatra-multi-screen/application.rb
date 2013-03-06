module Sinatra::MultiScreen

  CometIO.on :__multiscreen__data do |data, from|
    opts = data["options"]
    raise ArgumentError, 'option is empty'  if !opts or opts.empty?
    raise ArgumentError, 'channel is empty' if opts["channel"].empty?
    raise ArgumentError, 'type must be "tv" or "remote"' unless ["tv","remote"].include? opts["type"]
    unless MultiScreen.channels[opts["channel"]][opts["type"]].include? from
      raise StandardError, "client <#{from}> is not member of channel <#{opts['channel']}>"
    end
    MultiScreen.emit data["event"], data["data"], {:session => from, :channel => opts["channel"], :type => opts["type"]}
    type = case opts["type"]
           when "tv"
             "remote"
           when "remote"
             "tv"
           end
    MultiScreen.channels[opts["channel"]][type].each do |session_id|
      CometIO.push :__multiscreen__data, data, {:to => session_id}
    end
  end

  CometIO.on :__multiscreen__options do |opts, from|
    raise ArgumentError, 'channel is empty' if opts["channel"].empty?
    raise ArgumentError, 'type must be "tv" or "remote"' unless ["tv","remote"].include? opts["type"]
    MultiScreen.channels[opts["channel"]][opts["type"]] << from
    MultiScreen.emit :connect, {:session => from, :channel => opts["channel"], :type => opts["type"]}
  end

  CometIO.on :disconnect do |session_id|
    MultiScreen.channels.each do |channel_id, h|
      ["tv", "remote"].each do |type|
        next unless h[type].include? session_id
        h[type].delete session_id
        MultiScreen.emit :disconnect, {:session => session_id, :channel => channel_id, :type => type}
      end
    end
  end

  helpers do
    def multi_screen_js
      "#{env['rack.url_scheme']}://#{env['HTTP_HOST']}#{env['SCRIPT_NAME']}/cometio/multiscreen.js"
    end
  end

  get '/cometio/multiscreen.js' do
    content_type 'application/javascript'
    @js ||= (
             js = ''
             Dir.glob(File.expand_path '../js/*.js', File.dirname(__FILE__)).each do |i|
               File.open(i) do |f|
                 js += f.read
               end
             end
             ERB.new(js).result(binding)
             )
  end

end
