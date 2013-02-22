Multi-Screen Video Player
=========================

* Ruby 1.8.7+ or 1.9.2+
* sinatra-multi-screen with Sinatra1.3+


Install Dependencies
--------------------

    % gem install bundler foreman
    % bundle install


Run
---

    % foreman start

=> http://localhost:5000


Deploy Heroku
-------------

    % mkdir ~/multiscreen-sample
    % cp -R ./ ~/multiscreen-sample/
    % cd ~/multiscreen-sample
    % git init
    % git add ./
    % git commit -m "first sample chat"
    % heroku create --stack cedar
    % git push heroku master
    % heroku open
