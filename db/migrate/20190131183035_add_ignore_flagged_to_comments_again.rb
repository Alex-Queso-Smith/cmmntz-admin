class AddIgnoreFlaggedToCommentsAgain < ActiveRecord::Migration[5.2]
  def change
    unless column_exists? :comments, :ignore_flagged
      add_column :comments, :ignore_flagged, :boolean, default: false, null: false
      add_index :comments, :ignore_flagged
    end
  end
end
