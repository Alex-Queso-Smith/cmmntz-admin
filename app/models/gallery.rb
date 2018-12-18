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
    notify_on_new_comment: :bool
  }

  has_many :arts
  has_many :gallery_blacklistings
  has_many :blacklisted_users, through: :gallery_blacklistings, source: :user

  validates :name, presence: true
  validates :default_art_thread_expiration_days, numericality: { greater_than_or_equal_to: 0 }, if: Proc.new { |g| !g.default_art_thread_expiration_days.blank? }
  validates :comment_etiquette, length: { maximum: 8000 }

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
end
