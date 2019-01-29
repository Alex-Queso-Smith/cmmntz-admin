class ArtInteraction < ApplicationRecord
  belongs_to :art, counter_cache: true
  belongs_to :user

  validates :art_id, :user_id, presence: true
  validates :art_id, uniqueness: { scope: :user_id }

  scope :for_user_and_art, lambda {|user_id, art_id| where(user_id: user_id, art_id: art_id)}

end
