class Vote < ApplicationRecord
  belongs_to :comment

  scope :for_gallery, -> (gallery_id) {
    joins(:comment)
    .where(comments: {gallery_id: gallery_id})
  }
  scope :created_since, -> (datetime) {
    where(arel_table[:created_at].gteq(datetime))
  }

  def self.votes_for_gallery(gallery_id, since_date)
    scope = for_gallery(gallery_id)
    unless since_date.blank?
      scope = scope.created_since(since_date)
    end
    scope.length
  end
end
