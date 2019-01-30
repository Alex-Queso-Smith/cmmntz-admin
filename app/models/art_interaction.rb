class ArtInteraction < ApplicationRecord
  belongs_to :art, counter_cache: true
  belongs_to :user

  validates :art_id, :user_id, presence: true
  validates :art_id, uniqueness: { scope: :user_id }

  scope :for_user_and_art, lambda {|user_id, art_id| where(user_id: user_id, art_id: art_id)}
  scope :for_gallery, -> (gallery_id) {
    joins(:art).where(arts: {gallery_id: gallery_id})
  }
  scope :created_since, -> (datetime) {
    where(arel_table[:created_at].gteq(datetime))
  }
  scope :select_distinct_users, -> {
    select("DISTINCT(art_interactions.user_id)")
  }

  def self.users_for_gallery(gallery_id, since_date = "")
    scope = select_distinct_users.for_gallery(gallery_id)
    unless since_date.blank?
      scope = scope.created_since(since_date)
    end
    scope.length
  end
end
