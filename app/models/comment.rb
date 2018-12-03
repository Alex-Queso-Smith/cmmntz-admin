class Comment < ApplicationRecord
  belongs_to :art_topics
  scope :pending_approval, -> {where(approved: false)}
end
