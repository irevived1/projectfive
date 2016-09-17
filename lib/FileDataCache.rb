require 'singleton'

class FileDataCache
  include Singleton

  def initialize(file_data=nil)
    @file_data = file_data
  end

  def file_data=(file_data)
    @file_data = file_data
  end

  def file_data
  	@file_data
  end
end