class Api::V1::ArtsController < ApiController

  def show
    @art = Art.find(params[:id])
    display_mode = params[:display_mode] || ""
    @comments = @art.comment_for_display_mode(display_mode)
  end

end
