class Ability
  include CanCan::Ability
  attr_accessor :customer

  def initialize(current_customer)
    cannot :manage, :all # wipe all base Permissions

    alias_action :create, :read, :update, :destroy, :to => :crud
    alias_action :read, :update, :to => :modify

    guest_permissions # applies to non logged in customer

    self.customer = current_customer # set scope of customer to logged in customer
    return if customer.nil?

    default_permissions # applies to all logged in customers

    super_admin_permissions if current_customer.role == "super_admin"

    artist_permissions if current_customer.role == "artist"

  end

  def guest_permissions
    can :create, Signup
  end

  def default_permissions
    can [:crud, :edit_password, :edit_settings], Customer, { id: customer.id } # can crud self

    # TODO: move this to admin app
    # this is only here until this feature gets moved to the admin app
    can :create, AdminMail
  end

  def super_admin_permissions
    can :crud, Gallery, { id: customer.gallery_id }
    can :crud, Customer, { gallery_id: customer.gallery_id }
    can :crud, Art, { gallery_id: customer.gallery_id }
  end

  def artist_permissions
    can :read, Gallery, { id: customer.gallery_id }
    can :read, Art, { gallery_id: customer.gallery_id }
  end

end
