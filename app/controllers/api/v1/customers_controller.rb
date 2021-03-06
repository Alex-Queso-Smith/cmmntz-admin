class Api::V1::CustomersController < ApiController
  load_and_authorize_resource

  def index
    @customers = @customers.order(role: :desc)
  end

  def show; end

  def create
    @customer = Customer.new(customer_params.merge(gallery: current_gallery, active: true))

    if @customer.save
      render json: { message: "Member created!" }
    else
      render json: { errors: @customer.errors, status: :unprocessable_entity }
    end
  end

  def update
    if @customer.update(customer_params)
      render "update"
    else
      render json: { errors: @customer.errors, status: :unprocessable_entity }
    end
  end


  def customer_params
    params.require(:customer).permit(
      :first_name,
      :last_name,
      :email,
      :role,
      :password,
      :password_confirmation
    )
  end
end
