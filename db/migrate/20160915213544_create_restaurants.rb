class CreateRestaurants < ActiveRecord::Migration[5.0]
  def change
    create_table :restaurants do |t|
      t.integer :zip
      t.integer :avg_score

      t.timestamps
    end
  end
end
