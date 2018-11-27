class CustomerSessionsController < ApplicationController
  def new
    @customer_session = CustomerSession.new
  end

  def create
    @user_session = CustomerSession.new(customer_session_params)
    if @customer_session.save
      redirect_to account_url
    else
      render :action => :new
    end
  end

  def destroy
    current_customer_session.destroy
    redirect_to new_customer_session_url
  end

  private

  def customer_session_params
    params.require(:customer_session).permit(:email, :password, :remember_me)
  end
end
