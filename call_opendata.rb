require 'csv'
require 'byebug'

tree_hash = {}

CSV.foreach('trees_by_zip.csv', headers: true) do |tree|
  tree_hash[tree[2]] ? tree_hash[tree[2]] += 1 : tree_hash[tree[2]] = 1
end

CSV.open('public/trees.csv', 'wb') do |csv|
  csv << ['zip', 'count']
  tree_hash.each do |zip, count|
    csv << [zip, count]
  end
end
