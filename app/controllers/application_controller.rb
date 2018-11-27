class ApplicationController < ActionController::Base
  helper_method :current_customer_session, :current_customer, :current_gallery

  private
    def current_customer_session
      return @current_customer_session if defined?(@current_customer_session)
      @current_customer_session = CustomerSession.find
    end

    def current_customer
      return @current_customer if defined?(@current_customer)
      @current_customer = current_customer_session && current_customer_session.customer
    end

    def current_gallery
      return @current_gallery if defined?(@current_gallery)
      @current_gallery = Gallery.find(current_customer.gallery_id) || []
    end
end
