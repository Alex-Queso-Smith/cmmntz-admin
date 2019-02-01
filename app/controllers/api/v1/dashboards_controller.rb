class Api::V1::DashboardsController < ApiController

  def index
    @dashboard = Dashboard.new(gallery_id: current_gallery.id)
  end

end
