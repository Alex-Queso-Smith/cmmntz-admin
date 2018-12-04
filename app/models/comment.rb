include ActionView::Helpers::SanitizeHelper
class Comment < ApplicationRecord
  include CommentBase

  belongs_to :art
  belongs_to :user
  scope :pending_approval, -> {where(approved: false)}
  scope :not_deleted, -> {where(deleted: false)}
  scope :deleted, -> {where(deleted: true)}

  scope :for_non_blocked_users, -> {
    joins(:art)
    .joins("left join gallery_blacklistings on gallery_blacklistings.user_id = comments.user_id AND gallery_blacklistings.gallery_id = arts.gallery_id")
    .where("gallery_blacklistings.id IS NULL")
  }
end
