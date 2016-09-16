require 'csv'
module ModelTranslate
	def self.readCSVForMatrix(file_path)
		CSV.foreach(Rails.root.join('app/assets/csv/master.csv'), headers: false) do |row|
  		
  		puts row
		end
	end
end