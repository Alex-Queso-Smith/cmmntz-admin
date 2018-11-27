require 'rails_helper'

RSpec.describe "galleries/new", type: :view do
  before(:each) do
    assign(:gallery, Gallery.new(
      :name => "MyString",
      :settings => "MyText"
    ))
  end

  it "renders new gallery form" do
    render

    assert_select "form[action=?][method=?]", galleries_path, "post" do

      assert_select "input[name=?]", "gallery[name]"

      assert_select "textarea[name=?]", "gallery[settings]"
    end
  end
end
