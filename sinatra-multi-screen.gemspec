lib = File.expand_path('../lib', __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require 'sinatra-multi-screen/version'

Gem::Specification.new do |gem|
  gem.name          = "sinatra-multi-screen"
  gem.version       = SinatraMultiScreen::VERSION
  gem.authors       = ["Sho Hashimoto"]
  gem.email         = ["hashimoto@shokai.org"]
  gem.description   = %q{Sinatra Plugin for Multi-Screen Application.}
  gem.summary       = gem.description
  gem.homepage      = "https://github.com/shokai/sinatra-multi-screen"

  gem.files         = `git ls-files`.split($/).reject{|i| i=="Gemfile.lock" }
  gem.executables   = gem.files.grep(%r{^bin/}).map{ |f| File.basename(f) }
  gem.test_files    = gem.files.grep(%r{^(test|spec|features)/})
  gem.require_paths = ["lib"]
  gem.add_dependency 'sinatra', '>= 1.3.3'
  gem.add_dependency 'sinatra-cometio', '>= 0.1.3', '< 0.2.0'
  gem.add_dependency 'event_emitter'
end
