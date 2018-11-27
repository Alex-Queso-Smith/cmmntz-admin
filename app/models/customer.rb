class Customer < ApplicationRecord
  include AuthlogicValidations

  belongs_to :gallery

  acts_as_authentic do |c|
    c.login_field = :email
    c.validate_email_field = false
    c.validate_password_field = false
  end
end
