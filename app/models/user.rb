class User < ApplicationRecord
  has_many :gallery_blacklistings


  def guest?
    user_name.blank? && email.blank?
  end

end
