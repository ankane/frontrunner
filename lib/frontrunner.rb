require "frontrunner/helper"
require "frontrunner/version"
require "active_support/lazy_load_hooks"

module Frontrunner
  class Error < StandardError; end
end

ActiveSupport.on_load(:action_view) do
  include Frontrunner::Helper
end
