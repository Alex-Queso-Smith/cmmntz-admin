class Api::V1::CustomerSessionsController < ApplicationController
  skip_before_action *ALL_FILTERS, only: [:new, :create]
  before_action :require_no_customer, only: [:new, :create]

  def create
    @customer_session = CustomerSession.new(customer_session_params.to_h)
    if @customer_session.save
      render json: { message: "Login Successful" }
    else
      render json: { errors: @customer_session.errors, status: :unprocessable_entity }
    end
  end

  private

  def customer_session_params
    params.require(:customer_session).permit(:email, :password, :remember_me)
  end
end
