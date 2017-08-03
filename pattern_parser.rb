print 'Input pattern string: '
pattern = gets.chomp

# pattern = '34b3o27b3o13b3o27b3o43b$33bo3bo25bo3bo11bo3bo25bo3bo42b$32b2o4bo11bo11bo4b2o9b2o4bo11bo11bo4b2o41b$31bobob2ob2o3b4ob2ob2ob4o3b2ob2obobo7bobob2ob2o3b4ob2ob2ob4o3b2ob2obobo40b$30b2obo4bob2ob4o7b4ob2obo4bob2o5b2obo4bob2ob4o7b4ob2obo4bob2o39b$29bo4bo3bo4bo2b2obobob2o2bo4bo3bo4bo3bo4bo3bo4bo2b2obobob2o2bo4bo3bo4bo38b$6bo17bo16bo4bo7bo4bo27bo4bo7bo4bo25bo17bo6b$5b3o15b3o3b2o7b2o6bo7bo6b2o7b2o3b2o7b2o6bo7bo6b2o7b2o12b3o15b3o5b$3b2ob3o13b3ob2o100b2ob3o13b3ob2o3b$4bo2bob2o4bo4b2obo2bo18b2o7b2o35b2o7b2o27bo2bob2o4bo4b2obo2bo4b$b2obo4bobob2ob2obobo4bob2o17bo5bo39bo5bo26b2obo4bobob2ob2obobo4bob2ob$b2obobo2bobo7bobo2bobob2o15bo2bo3bo2bo35bo2bo3bo2bo24b2obobo2bobo7bobo2bobob2ob$bo8b3obobob3o8bo16bo2bobo2bo37bo2bobo2bo25bo8b3obobob3o8bob$2o7b2o9b2o7b3obo15bobo43bobo24bob3o7b2o9b2o7b2o$33b2o12bobobobo39bobobobo21b2o33b$31b2obo11b2obobob2o37b2obobob2o20bob2o31b$34b2o9bo3bobo3bo35bo3bobo3bo18b2o34b$33bo88bo33b$35b3o7b2ob2ob2ob2o35b2ob2ob2ob2o16b3o35b$7b3o15b3o9b2o78b2o9b3o15b3o7b$6bo3bo13bo3bo9bo7bo3bo3bo37bo3bo3bo16bo9bo3bo13bo3bo6b$5b2o4bo11bo4b2o8b2o6bo3bo3bo7b3o9b3o9b3o3bo3bo3bo4b3o8b2o8b2o4bo11bo4b2o5b$4bobob2ob2o3b3o3b2ob2obobo8bo21bo3bo7bo3bo7bo3bo14bo3bo7bo8bobob2ob2o3b3o3b2ob2obobo4b$3b2obo4bob2ob3ob2obo4bob2o6bobo5b2o5b2o5b2o3b2o5b2o3b2o5b2o3b2o5b2o5b2o3b2o5bobo6b2obo4bob2ob3ob2obo4bob2o3b$2bo4bo3bo4bobo4bo3bo4bo6b3o3b4o3b4o3b2obobob2o3b2obobob2o3b2obobob2o3b4o3b2obobob2o3b3o6bo4bo3bo4bobo4bo3bo4bo2b$14bo5bo20b2ob2o2b2ob2o2b2ob2ob2ob2ob2ob2ob2ob2ob2ob2ob2ob2ob2ob2o2b2ob2ob2ob2ob2ob2o20bo5bo14b$2b2o7b2o9b2o7b2ob3o5bobo4bobo4bobo3bobo3bobo3bobo3bobo3bobo3bobo4bobo3bobo3bobo5b3ob2o7b2o9b2o7b2o2b$36bo82bo36b$34bo6b2ob2o2b2ob2o2b2ob2ob2ob2ob2ob2ob2ob2ob2ob2ob2ob2ob2ob2o2b2ob2ob2ob2ob2ob2o6bo34b$34bob2o80b2obo34b$39b78o39b$38bo78bo!'

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
