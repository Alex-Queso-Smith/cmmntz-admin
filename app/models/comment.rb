include ActionView::Helpers::SanitizeHelper
class Comment < ApplicationRecord
  self.per_page = 10
  include CommentBase

  belongs_to :art
  belongs_to :gallery
  belongs_to :user, optional: true

  has_many :votes

  scope :pending_approval, -> {where(approved: false)}
  scope :not_deleted, -> {where(deleted: false)}
  scope :pending, -> { pending_approval }
  scope :deleted, -> {where(deleted: true)}
  scope :approved, -> { where(approved: true, deleted: false) }
  scope :flagged, -> {
    joins("left join votes on votes.comment_id = comments.id AND votes.vote_type = 'warn' ")
    .where(ignore_flagged: false, deleted: false )
    .group("comments.id")
    .having("COUNT(votes.id) > 0")
  }

  scope :for_gallery, -> (gallery_id) {
    where(gallery_id: gallery_id)
  }

  scope :for_art, -> (art_id) {
    where(art_id: art_id)
  }

  scope :created_since, -> (datetime) {
    where(arel_table[:created_at].gteq(datetime))
  }

  scope :for_non_blocked_users, -> {
    joins(:art)
    .joins("left join gallery_blacklistings on gallery_blacklistings.user_id = comments.user_id AND gallery_blacklistings.gallery_id = arts.gallery_id")
    .where("gallery_blacklistings.id IS NULL")
  }

  def self.comments_for_gallery(gallery_id, since_date)
    scope = for_gallery(gallery_id)
    unless since_date.blank?
      scope = scope.created_since(since_date)
    end
    scope.length
  end

  def self.art_comments_for_display_mode(art_id, display_mode, filters, page)
    scope = where({}).for_art(art_id).for_non_blocked_users.includes(:votes)
    if display_mode != ''
      scope = scope.send(display_mode)
    else
      scope = scope.approved
    end
    scope.order(created_at: :desc).page(page)
  end

  def self.gallery_comments_for_display_mode(gallery_id, display_mode, filters, page)
    scope = where({}).for_gallery(gallery_id).for_non_blocked_users.includes(:votes)
    if display_mode != ''
      scope = scope.send(display_mode)
    else
      scope = scope.approved
    end
    scope.order(created_at: :desc).page(page)
  end
end
