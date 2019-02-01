class Signup < Tableless
  attribute :gallery_name, :string
  attribute :gallery_url, :string
  attribute :customer_first_name, :string
  attribute :customer_last_name, :string
  attribute :customer_password, :string
  attribute :customer_password_confirmation, :string
  attribute :customer_email, :string
  attribute :customer_subscribe_newsletter, :boolean
  attribute :gallery_tier, :integer

  validate :customer_valid?, :gallery_valid?

  after_validation :create_gallery_and_customer!

  def gallery
    @gallery ||= Gallery.new(name: gallery_name, site_url: gallery_url, tier: gallery_tier)
  end

  def customer
    @customer ||= Customer.new(first_name: customer_first_name, last_name: customer_last_name, password: customer_password, password_confirmation: customer_password_confirmation, email: customer_email, role: "super_admin", gallery: @gallery, subscribe_newsletter: customer_subscribe_newsletter)
  end

  private

  def customer_valid?
    if !gallery.valid?
      errors[:gallery] << gallery.errors
      # gallery.errors.each do |k, v|
      #   # you can customize the error message here:
      #   errors[:gallery][k.to_sym] = v
      # end
    end
  end

  def gallery_valid?
    if !customer.valid?
      errors[:customer] << customer.errors
      # customer.errors.each do |k, v|
      #   # you can customize the error message here:
      #   errors[:customer][k.to_sym] = v
      # end
    end
  end

  def create_gallery_and_customer!
    return unless self.errors.empty?
    gallery.save(validate: false)
    customer.gallery = gallery
    customer.active = true
    customer.save(validate: false)
  end
end
