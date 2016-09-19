require 'singleton'

class FileDataCache
  include Singleton

  def initialize
    @file_data = nil
    @filename = nil
    @headers = nil
  end

  def file_data=(file_data)
    @file_data = file_data
  end

  def file_data
  	@file_data
  end

  def filename=(filename)
    @filename = filename
  end

  def filename
    @filename
  end

  def headers=(headers)
    @headers = headers
  end

  def headers
    @headers
  end

  def hideAbout
    @hideAbout
  end

  def hideAbout=(flag)
    @hideAbout = flag
  end

  def destroy
    @file_data = nil
    @filename = nil
    @headers = nil
  end
end