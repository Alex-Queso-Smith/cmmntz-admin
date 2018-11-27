class CustomerSessionsController < ApplicationController
  def new
    @customer_session = CustomerSession.new
  end

  def create
    @customer_session = CustomerSession.new(customer_session_params.to_h)
    if @customer_session.save
      redirect_to root_path
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
