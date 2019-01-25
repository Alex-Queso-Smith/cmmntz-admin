class Api::V1::CommentsController < ApiController
  load_and_authorize_resource

  def index
    @art = Art.find(params[:art_id])
    display_mode = params[:display_mode] || ""
    @comments = @art.comments_for_display_mode(display_mode)
  end

  def update
    if @comment.update(comment_params)
      render json: { message: "Change successful" }
    else
      render json: { errors: @comment.errors, status: :unprocessable_entity }
    end
  end

  private

  def comment_params
    params.require(:comment).permit(
      :deleted,
      :approved,
      :approved_by,
      :ignore_flagged
    )
  end

end
