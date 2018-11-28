class AddDisableDeactivateToArt < ActiveRecord::Migration[5.2]
  def change
    add_column :arts, :disabled, :boolean
    add_column :arts, :deactivated, :boolean
  end
end
