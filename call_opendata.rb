require 'csv'
require 'byebug'

noise_hash = Hash.new(0)
light_hash = Hash.new(0)
heat_hash = Hash.new(0)
graffiti_hash = Hash.new(0)
parking_hash = Hash.new(0)

CSV.foreach('complaints_min.csv', headers: true) do |complaint|
  case complaint[0]
  # when "Noise - Residential"
  #   noise_hash[complaint[1]] += 1
  when "HEATING"
    heat_hash[complaint[1]] += 1
  when "Street Light Condition"
    light_hash[complaint[1]] += 1
  when "Graffiti"
    graffiti_hash[complaint[1]] += 1
  when "Illegal Parking"
    parking_hash[complaint[1]] += 1
  end
end

CSV.open('public/heating_complaints.csv', 'a+') do |csv|
  heat_hash.each do |zip, count|
    csv << [zip, count]
  end
end

CSV.open('public/streetlight_complaints.csv', 'a+') do |csv|
  light_hash.each do |zip, count|
    csv << [zip, count]
  end
end

CSV.open('public/graffiti_complaints.csv', 'a+') do |csv|
  graffiti_hash.each do |zip, count|
    csv << [zip, count]
  end
end


CSV.open('public/illegal_parking.csv', 'a+') do |csv|
  parking_hash.each do |zip, count|
    csv << [zip, count]
  end
end
