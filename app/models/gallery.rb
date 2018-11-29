class Gallery < ApplicationRecord
  has_many :arts

  validates :name, presence: true
  validates :default_art_thread_expiration_days, numericality: {greater_than_or_equal_to: 0}, if: Proc.new {|g| !g.default_art_thread_expiration_days.blank? }

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
