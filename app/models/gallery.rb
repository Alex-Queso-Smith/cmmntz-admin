class Gallery < ApplicationRecord

  vstr 'settings', {
    comments_from: :string,
    filter_list: :array,
    not_filter_list: :array,
    sort_dir: :string,
    sort_type: :string,
    votes_from: :string,
    censor: :bool,
    default_art_thread_expiration_days: :integer,
    comment_approval_needed: :bool,
    guest_approval_needed: :bool,
    notify_on_comment_approval_needed: :bool,
    notify_on_new_comment: :bool,
    hide_anon_and_guest: :bool,
    gender_search: :string,
    age_range_search: :string
  }

  has_many :customers
  has_many :arts
  has_many :comments
  has_many :gallery_blacklistings
  has_many :blacklisted_users, through: :gallery_blacklistings, source: :user

  has_many :user_gallery_moderators
  has_many :gallery_moderators, through: :user_gallery_moderators, source: :user

  has_many :pending_comments, -> { where(approved: false, deleted: false) }, class_name: "Comment", foreign_key: "gallery_id"

  validates :name, :site_url, presence: true
  validates :site_url, uniqueness: { case_sensitive: false }
  validates :default_art_thread_expiration_days, numericality: { greater_than_or_equal_to: 0 }, if: Proc.new { |g| !g.default_art_thread_expiration_days.blank? }
  validates :comment_etiquette, length: { maximum: 8000 }

  scope :created_since, -> (datetime) {
    where(arel_table[:created_at].gteq(datetime))
  }

  def checker_settings
    {
      comments_amount: 1,
      votes: {
        warn: 1,
        dislike: 1,
        dislike_a_lot: 1
      }
    }
  end

  def users_for_timeframe(timeframe = "")
    ArtInteraction.users_for_gallery(self.id, resolve_time_frame(timeframe))
  end

  def comments_for_timeframe(timeframe = "")
    Comment.comments_for_gallery(self.id, resolve_time_frame(timeframe))
  end

  def votes_for_timeframe(timeframe = "")
    Vote.votes_for_gallery(self.id, resolve_time_frame(timeframe))
  end

  def resolve_time_frame(timeframe = "")
    case timeframe
    when "today"
      Date.today.beginning_of_day
    when "week"
      Date.today.beginning_of_week
    when "month"
      Date.today.beginning_of_month
    else
      ""
    end
  end
end
