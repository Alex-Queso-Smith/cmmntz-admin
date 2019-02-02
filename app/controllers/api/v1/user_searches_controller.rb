class Api::V1::UserSearchesController < ApiController

  def create
    unauthorized! if cannot? :read, User

    @users = User.search(search_params, current_gallery)
  end

  private
  def search_params
    params.require(:search)
  end
end
