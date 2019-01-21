require 'rails_helper'

RSpec.describe StaticPagesController, type: :controller do

  describe "GET #embed" do
    it "returns http success" do
      get :embed
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET #faq" do
    it "returns http success" do
      get :faq
      expect(response).to have_http_status(:success)
    end
  end

end
