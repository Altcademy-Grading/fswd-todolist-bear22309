source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '3.1.2'

# Rails version
gem 'rails', '~> 6.1.6.1'
# App server
gem 'puma', '>= 5.6.4'
# SCSS for stylesheets
gem 'sass-rails', '~> 6.0'
# JavaScript transpiling
gem 'webpacker', '~> 5.0'
# JSON APIs
gem 'jbuilder', '~> 2.11'
# AWS S3
gem 'aws-sdk-s3', '~> 1.114'
# Webrick
gem 'webrick', '~> 1.7'
# Mail gem
gem 'mail', '>= 2.8.0.rc1'
# Bootsnap for faster boot times
gem 'bootsnap', '>= 1.13', require: false
# Cross-platform I/O
gem 'nio4r', '~> 2.5'
# Updated ffi gem
gem 'ffi', '~> 1.15'

group :development, :test do
  # Debugging
  gem 'byebug', '~> 11.1.3', platforms: %i[mri mingw x64_mingw]
  # Development tools
  gem 'awesome_print', '~> 1.9'
  gem 'dotenv-rails', '~> 2.8'
  gem 'factory_bot_rails', '~> 6.2'
  gem 'pry-rails', '>= 0.3.9'
  gem 'rspec-rails', '~> 5.1'
  gem 'rubocop', '~> 1.36'
  gem 'rubocop-rspec', '2.12'
end

group :development do
  # Console tools
  gem 'listen', '~> 3.7.1'
  gem 'web-console', '>= 4.2'
  # Speed up development
  gem 'spring', '>= 2.1'
  gem 'spring-watcher-listen', '~> 2.0.1'
  # SQLite for development
  gem 'sqlite3', '~> 1.4'
end

group :production do
  # PostgreSQL for production
  gem 'pg', '~> 1.4.3'
end

