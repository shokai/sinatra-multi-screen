module Sinatra

  class Application

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

end
