class Art < ApplicationRecord
  belongs_to :gallery
  delegate :checker_settings, to: :gallery

end
