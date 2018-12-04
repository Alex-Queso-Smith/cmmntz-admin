class Api::V1::CommentsController < ApiController
  load_and_authorize_resource

  def update
    if @comment.update(comment_params)
      render json: { message: "Destroy successfull" }
    else
      render json: { errors: @comment.errors, status: :unprocessable_entity }
    end
  end

  private

  def comment_params
    params.require(:comment).permit(
      :deleted,
      :approved
    )
  end

end
