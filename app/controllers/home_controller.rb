class HomeController < ApplicationController
  def index
  end

  def display
    byebug
    term1 = (Object.const_get params[:term1]).all
    term2 = (Object.const_get params[:term2]).all
    puts term1.inspect
  end
end
