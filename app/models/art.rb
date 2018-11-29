class Art < ApplicationRecord
  belongs_to :gallery
  delegate :checker_settings, :default_art_thread_expiration_days, to: :gallery

  def status
    deactivated? ? "Deavtivated" : is_disabled? ? "Disabled" : "Active"
  end

  def is_disabled?
    disabled? ? true : thread_expired? ? true : false
  end

  def thread_expired?
    return false unless default_art_thread_expiration_days.is_a? Integer
    Time.now > (created_at + default_art_thread_expiration_days.days)
  end

end
