class Api::V1::UsersController < ApiController
  load_and_authorize_resource

  def index
    @users = @users.not_guest.order(created_at: :desc)
    if params[:search]
      @users = @users.sort_order(params[:search])
    end
  end
end
