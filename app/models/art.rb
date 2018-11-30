class Art < ApplicationRecord
  belongs_to :gallery
  delegate :checker_settings, :default_art_thread_expiration_days, to: :gallery

  has_many :art_topics
  has_many :topics, through: :art_topics

  def status
    deactivated? ? "Deavtivated" : is_disabled? ? "Disabled" : "Active"
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

end
