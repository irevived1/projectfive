class CreateTrees < ActiveRecord::Migration[5.0]
  def change
    create_table :trees do |t|
      t.integer :zip
      t.integer :count

      t.timestamps
    end
  end
end
