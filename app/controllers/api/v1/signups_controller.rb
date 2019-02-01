class Api::V1::SignupsController < ApiController
  skip_before_action *ALL_FILTERS, only: [:create]
  before_action :require_no_customer, only: [:create]

  def create
    @signup = Signup.new(signup_params)
    if @signup.valid?
      render json: { message: "Gallery created!" }
    else
      render json:{ errors: @signup.errors, status: :unprocessable_entity}
    end
  end

  private

  def signup_params
    params.require(:signup).permit(:gallery_name, :gallery_url, :gallery_tier, :customer_first_name, :customer_last_name, :customer_password, :customer_password_confirmation, :customer_email)
  end
end
