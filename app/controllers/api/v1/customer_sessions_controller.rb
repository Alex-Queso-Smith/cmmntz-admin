class Api::V1::CustomerSessionsController < ApiController
  skip_before_action *ALL_FILTERS, only: [:new, :create]
  before_action :require_no_customer, only: [:new, :create]

  def create
    @customer_session = CustomerSession.new(customer_session_params.to_h)
    if @customer_session.save
      render json: { id: @customer_session.customer.id, name: @customer_session.customer.name, gallery: @customer_session.customer.gallery.name }
    else
      render json: { errors: @customer_session.errors, status: :unprocessable_entity }
    end
  end

  private

  def customer_session_params
    params.require(:customer_session).permit(:email, :password, :remember_me)
  end
end
