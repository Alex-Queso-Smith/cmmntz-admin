class Api::V1::UsersController < ApiController
  load_and_authorize_resource

  def index
    @users = @users
  end
end
