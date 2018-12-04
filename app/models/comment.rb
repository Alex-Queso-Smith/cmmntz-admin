include ActionView::Helpers::SanitizeHelper
class Comment < ApplicationRecord
  include CommentBase

  belongs_to :art
  belongs_to :user
  scope :pending_approval, -> {where(approved: false)}
  scope :not_deleted, -> {where(deleted: false)}
  scope :deleted, -> {where(deleted: true)}
end
