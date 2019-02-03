class Api::V1::UserSearchesController < ApiController

  def create
    unauthorized! if cannot? :read, User
    page = params[:page] || 1
    @users = User.search(search_params, current_gallery, page)
  end

  private
  def search_params
    params.require(:search)
  end
end
