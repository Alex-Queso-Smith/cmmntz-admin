class Art < ApplicationRecord
  self.per_page = 10 # results per page default

  vstr 'settings', {
    ignore_warning_checker: :bool
  }

  belongs_to :gallery
  delegate :checker_settings, :default_art_thread_expiration_days, to: :gallery

  belongs_to :gallery_artist, optional: true

  has_many :art_topics
  has_many :topics, through: :art_topics

  has_many :comments
  has_many :votes, through: :comments
  has_many :pending_comments, -> { where(approved: false, deleted: false) }, class_name: "Comment", foreign_key: "art_id"
  has_many :deleted_comments, -> { where(deleted: true) }, class_name: "Comment", foreign_key: "art_id"
  has_many :approved_comments, -> { where(approved: true, deleted: false) }, class_name: "Comment", foreign_key: "art_id"
  has_many :flagged_comments, -> {
    joins("left join votes on votes.comment_id = comments.id AND votes.vote_type = 'warn' ")
    .where(ignore_flagged: false, deleted: false )
    .group("comments.id")
    .having("COUNT(votes.id) > 0")
  }, class_name: "Comment", foreign_key: "art_id"

  has_many :art_interactions

  validates :art_type, presence: true

  def status
    deactivated? ? "Deactivated" : is_disabled? ? "Disabled" : "Active"
  end

  def is_disabled?
    disabled? ? true : thread_expired? ? true : false
  end

  def thread_expired?
    return false unless default_art_thread_expiration_days.is_a? Integer
    Time.now > (published_at + default_art_thread_expiration_days.days)
  end

  def topics_list=(list)
    art_topics.destroy_all if art_topics
    list.split(",").each { |t| topics << Topic.find_or_create_by(name: t.strip) }
  end

  def topics_list
    topics.map(&:name).join(", ")
  end

  def comments_for_display_mode(display_mode)
    cs = comments
    if display_mode == "pending"
      cs = pending_comments
    elsif display_mode == "deleted"
      cs = deleted_comments
    elsif display_mode == "flagged"
      cs = flagged_comments
    else
      cs = approved_comments
    end
    return cs.for_non_blocked_users.order(created_at: :desc)
  end

  def self.search(filters, page)
    scope = self.where({}).includes(:pending_comments, :deleted_comments, :approved_comments, :flagged_comments, comments: [:votes])
    scope = scope.page(page)
    scope
  end

end
