
require 'matrix'

X = Matrix.rows([[1, 2], [3, 4]])
X_t = X.transpose
first = X_t * X
X_i = first.inverse
y = Matrix.column_vector([1,2])

theta =  X_i * X_t * y
puts theta[0][1]
# theta.each_with_index do |e, row, col|
# 	puts e
# end


# m = Matrix[ [1,2,3,4], [5,6,7,8], [9,10,11,12] ]
# r = Matrix[*m.to_a.reverse]
