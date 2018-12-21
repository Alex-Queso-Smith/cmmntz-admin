class User < ApplicationRecord
  has_many :gallery_blacklistings
  
  # define galleries where the user has moderator status
  has_many :user_gallery_moderators

  def guest?
    user_name.blank? && email.blank?
  end

  def customer_for?(gallery_id)
    Customer.account_for_gallery_and_user(gallery_id, id).size > 0
  end

  def user_gallery_moderator_for?(gallery_id)
    user_gallery_moderators.for_gallery(gallery_id).size > 0
  end

end
