module Frontrunner
  module Helper
    def webpack_include_tag(*sources)
      options = sources.extract_options!
      sources =
        sources.map do |source|
          @webpack_manifest = nil if Rails.env.development?
          entry = webpack_manifest[source]
          raise Frontrunner::Error, "Could not find webpack entry point: #{source}" unless entry
          entry["js"]
        end
      javascript_include_tag *sources, options
    end

    def webpack_manifest
      @webpack_manifest ||= JSON.parse(File.read(Rails.root.join("webpack-assets.json")))
    rescue => e
      raise Frontrunner::Error, "Error reading webpack manifest - be sure to start the dev server"
    end
  end
end
