# This migration comes from rich (originally 20111002142937)
class CreateRichRichImages < ActiveRecord::Migration[4.2]
  def change
    create_table :rich_rich_images do |t|

      t.timestamps
      
      t.string :image_file_name
      t.string :image_content_type
      t.integer :image_file_size
      t.datetime :image_updated_at
      
      t.string :owner_type
      t.integer :owner_id
      
    end
  end
end
