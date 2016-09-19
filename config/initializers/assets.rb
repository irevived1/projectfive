# Be sure to restart your server when you modify this file.

# Version of your assets, change this if you want to expire all your assets.
Rails.application.config.assets.version = '1.0'

# For linechart initialization  -- begin
Rails.application.config.assets.precompile += %w( abel.css slippry.css linechart.css)
Rails.application.config.assets.precompile += %w( slippry.min.js linechart.js )
require "#{Rails.root}/lib/UniPre.rb"
require "#{Rails.root}/lib/FileDataCache.rb"
# -- end

Rails.application.config.assets.precompile += %w(input.js d3.v3.min.js scatter.js) 
Rails.application.config.assets.precompile += %w( test.css bootstrap.min.css font-awesome.css splash.css)


# Add additional assets to the asset load path
# Rails.application.config.assets.paths << Emoji.images_path

# Precompile additional assets.
# application.js, application.css, and all non-JS/CSS in app/assets folder are already added.
# Rails.application.config.assets.precompile += %w( search.js )

