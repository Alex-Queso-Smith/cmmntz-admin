class Art < ApplicationRecord
  belongs_to :gallery
  delegate :checker_settings, to: :gallery

  scope :for_gallery_id, -> (gallery_id) {
    where(gallery_id: gallery_id)
  }

end
