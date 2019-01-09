class Api::V1::UserSearchesController < ApiController

  def create
    unauthorized! if cannot? :read, User

    @users = @User.not_guest.order(created_at: :desc)
    if search_params
      @users = @users.sort_order(search_params)
    end
  end
  private
  def search_params
    params.require(:search)
  end
end
