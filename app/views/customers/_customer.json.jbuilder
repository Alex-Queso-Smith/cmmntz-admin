json.extract! customer, :id, :created_at, :updated_at, :first_name, :last_name, :email
json.url customer_url(customer, format: :json)
