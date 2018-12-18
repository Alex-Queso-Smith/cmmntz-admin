module CommentBase
  extend ActiveSupport::Concern
  BAD_WORDS = ["fuck", "wombat", "happen"]

  def render_anonymously?
    anonymous? || user.guest? || user.nil?
  end

end
