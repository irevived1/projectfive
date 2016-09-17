require 'singleton'

class FileDataCache
  include Singleton

  def initialize
    @file_data = nil
    @filename = nil
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

  def destroy
    @file_data = nil
    @filename = nil
  end
end