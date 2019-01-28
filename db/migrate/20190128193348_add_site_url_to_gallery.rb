class AddSiteUrlToGallery < ActiveRecord::Migration[5.2]
  def change
    add_column :galleries, :site_url, :string
    add_index :galleries, :site_url
  end
end
