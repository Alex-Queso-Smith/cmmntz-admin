module CommentsHelper
  def comment_user_user_name(comment)
    comment.render_anonymously? ? "Anonymous" : comment.user.user_name
  end

  def comment_user_user_id(comment)
    comment.user_id
  end
end
