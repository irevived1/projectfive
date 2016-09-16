require 'matrix'

# A class for single variable prediction


extend ActiveSupport::Concern

class UniPre 

	attr_accessor :x, :y, :theta#, :x_max, :x_min, :y_max, :y_min

	def initialize(x, y)  # x and y are arrays
		self.x = self.xArrayToMatrix(x)
		self.y = Matrix.column_vector(y)
	end

	def xArrayToMatrix(a)
		r = a.map do |e|
			ea = [e]
		end
		self.x = Matrix.rows(r) 
	end

	def h(target, theta0=0)  # should use optimal value for theta0
		theta0 + self.theta * target
	end

	def n   # => Matrix [[], []]
		x_t = self.x.transpose
		first = x_t * self.x
		x_i = first.inverse

		theta =  x_i * x_t * self.y

		m = theta.collect { |e| Rational(e).to_f }
		self.theta = m.row(0)[0]
	end
end
