print 'Input pattern string: '
pattern = gets.chomp

grid = [[]]
previous_count = 1
while (match = /(\d+)|b|o|\$|\!/.match(pattern).to_s)
  case match
  when 'o'
    grid.last.concat([1] * previous_count)
    previous_count = 1
  when 'b'
    grid.last.concat([0] * previous_count)
    previous_count = 1
  when '$'
    (previous_count - 1).times { grid << Array.new(grid.first.size, 0) }
    grid << []
    previous_count = 1
  when '!'
    break
  else
    previous_count = match.to_i
  end

  pattern = pattern.chars.drop(match.size).join
end

grid.last << 0 until grid.last.length == grid.first.length

puts 'Turns into:'
puts
p grid

`echo "#{grid.to_s}" | pbcopy`
