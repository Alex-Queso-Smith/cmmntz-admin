json.member do
  json.isCurrentUser @customer.id === current_customer.id
  json.name @customer.name
  json.id @customer.id
  json.gallery current_gallery.name
  json.galleryId current_gallery.id
end
