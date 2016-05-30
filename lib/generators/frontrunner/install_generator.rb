require "rails/generators"

module Frontrunner
  module Generators
    class InstallGenerator < Rails::Generators::Base
      source_root File.expand_path("../templates", __FILE__)

      def perform
        copy_file "package.json", "package.json"
        copy_file "webpack.config.js", "webpack.config.js"
        append_file ".gitignore", "\n# Webpack\n/node_modules/\nnpm-debug.log\nwebpack-assets.json\n"
        create_file "app/webpack/images/.keep"
        copy_file "application.js", "app/webpack/javascripts/application.js"
        copy_file "hello.coffee", "app/webpack/javascripts/hello.coffee"
        copy_file "application.scss", "app/webpack/stylesheets/application.scss"
      end
    end
  end
end
