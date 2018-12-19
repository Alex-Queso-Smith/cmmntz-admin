class Customer < ApplicationRecord
  include AuthlogicValidations

  belongs_to :gallery
  has_many :gallery_artists

  validates :first_name, :last_name, :role, presence: true

  acts_as_authentic do |c|
    c.login_field = :email
    c.validate_email_field = false
    c.validate_password_field = false
  end

  def ability
    @ability ||= Ability.new(self)
  end
  delegate :can?, :cannot?, to: :ability # allows calling from models


  def reverse_name
    "#{last_name}, #{first_name}"
  end

  def name
    "#{first_name} #{last_name}"
  end
end
