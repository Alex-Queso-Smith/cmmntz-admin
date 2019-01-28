class SignupsController < ApplicationController
  skip_before_action *ALL_FILTERS, only: [:new]
  before_action :require_no_customer, only: [:new]

  def new
    @signup = Signup.new
  end
end
