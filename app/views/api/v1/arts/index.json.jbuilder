json.total_results @arts.total_entries
json.per_page Art.per_page

json.arts @arts do |art|
  json.partial! 'art', art: art
end
