class Api::V1::CommentsController < ApiController
  load_and_authorize_resource

  def index
    display_mode = params[:display_mode] || ""
    page = params[:page] || 1
    filters = params[:search] || []
    
    if params[:art_id]
      @art = Art.find(params[:art_id])
      @comments = Comment.art_comments_for_display_mode(@art.id, display_mode, filters, page)
    else
      @comments = Comment.gallery_comments_for_display_mode(current_gallery, display_mode, filters, page)
    end
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
