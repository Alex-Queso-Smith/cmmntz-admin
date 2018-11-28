class Art < ApplicationRecord
  belongs_to :gallery
  delegate :checker_settings, to: :gallery

  def status
    deactivated? ? "Deavtivated" : disabled? ? "Disabled" : "Active"
  end

end
