include ActionView::Helpers::SanitizeHelper
class Comment < ApplicationRecord
  include CommentBase

  belongs_to :art_topics
  belongs_to :user 
  scope :pending_approval, -> {where(approved: false)}
end
