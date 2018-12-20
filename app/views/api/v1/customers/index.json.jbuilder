json.customers @customers do |customer|
  json.id customer.id
  json.email customer.email
  json.name customer.name
  json.role customer.role
  json.gallery_id customer.gallery_id
  json.user_account_id customer.user_account_id
end
