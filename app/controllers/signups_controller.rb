class SignupsController < ApplicationController
  skip_before_action *ALL_FILTERS, only: [:new, :create]
  before_action :require_no_customer, only: [:new, :create]
  
  def new
    @signup = Signup.new
  end

  def create
    @signup = Signup.new(signup_params)
    respond_to do |format|
      if @signup.valid?
        format.html { redirect_to @signup.gallery }
        format.json { render :show, status: :created, location: @signup }
      else
        format.html { render :new }
        format.json { render json: @signup.errors, status: :unprocessable_entity }
      end
    end
  end

  private
  def signup_params
    params.require(:signup).permit(:gallery_name, :customer_first_name, :customer_last_name, :customer_password, :customer_password_confirmation, :customer_email)
  end
end
