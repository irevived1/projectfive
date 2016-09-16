require 'csv'

module CsvHelper

  def all_zips
    csvs = Dir.entries('app/assets/csv').select{|x| x.length > 3}

    master_hash = {}

    csvs.each do |sheet|
      CSV.foreach("app/assets/csv/#{sheet}") do |line|
        master_hash[line[0]] ? master_hash[line[0]] << line[1] : master_hash[line[0]] = [line[1]]
      end
    end

    regulated = master_hash.delete_if{|k,v| v.length != 7}

    CSV.open("app/assets/csv/master.csv", "wb") do |csv|
      regulated.each do |k, v|
        csv << [k, v].flatten
      end
    end
  end
end


class CSVHelper

#   def all_zips
#     csvs = Dir.entries('app/assets/csv').select{|x| x.length > 3}
#
#     # 1. graffiti
#     # 2. heating
#     # 3. illegal
#     # 4. noise
#     # 5. restaurant
#     # 6. streetlight
#     # 7. trees
#
#     master_hash = {}
#
#     csvs.each do |sheet|
#       CSV.foreach("app/assets/csv/#{sheet}") do |line|
#         master_hash[line[0]] ? master_hash[line[0]] << line[1] : master_hash[line[0]] = [line[1]]
#       end
#     end
#
#     regulated = master_hash.delete_if{|k,v| v.length != 7}
#
#     CSV.open("app/assets/csv/master.csv", "wb") do |csv|
#       regulated.each do |k, v|
#         csv << [k, v].flatten
#       end
#     end
#
#   end
#
end
