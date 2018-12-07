class ApplicationController < ActionController::Base
  helper_method :current_customer_session, :current_customer, :current_gallery

  ALL_FILTERS = [:require_office_ip_prod, :require_customer, :current_customer, :current_customer_session]
  before_action *ALL_FILTERS

  private
  def require_office_ip_prod
    # return true
    if Rails.env.production? && request.remote_ip != '96.227.61.123'
      raise "You are not Authorized to be here!"
    end
  end

  def store_location
    session[:return_to] = request[:REQUEST_URI]
  end

  def current_customer_session
    return @current_customer_session if defined?(@current_customer_session)
    @current_customer_session = CustomerSession.find
  end

  def current_user
    current_customer
  end

  def current_customer
    return @current_customer if defined?(@current_customer)
    @current_customer = current_customer_session && current_customer_session.customer
  end

  def current_gallery
    return @current_gallery if defined?(@current_gallery)
    if current_customer
      @current_gallery = Gallery.find(current_customer.gallery_id)
    else
      @current_gallery = []
    end
  end

  def require_customer
    unless current_customer
      store_location
      flash[:notice] = "You must be logged in to access this page"
      redirect_to login_url
      return false
    end
  end

  def require_no_customer
    if current_customer
      store_location
      flash[:notice] = "You must be logged out to access this page"
      redirect_to root_path
      return false
    end
  end
end
