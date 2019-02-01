class AddTierToGallery < ActiveRecord::Migration[5.2]
  def change
    add_column :galleries, :tier, :integer, limit: 1
    add_index :galleries, :tier
  end
end
