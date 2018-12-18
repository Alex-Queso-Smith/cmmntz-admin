class MassManageComment < Tableless
  VIABLE_ACTIONS = %w(delete approve ignore restore)
  attribute :art_id, :uuid
  attribute :action, :string
  attribute :comment_ids, :text
  attribute :customer_id, :uuid

  belongs_to :art
  belongs_to :customer
  validates :action, :comment_ids, presence: true
  validates :action, inclusion: {in: VIABLE_ACTIONS}
  validate :can_crud_all_comments?

  after_validation :perform_action_on_comments!

  def comments
    @comments ||= Comment.where id: comment_ids.split(',')
  end

  private

  def can_crud_all_comments?
    comments.each do |c|
      errors[:base] << "You cannot manage comment: #{c.id}" unless customer.can?(:update, c)
    end
  end

  def perform_action_on_comments!
    return unless self.errors.empty?
    case action
    when "delete"
      comments.update_all(deleted: true)
    when "approve"
      comments.update_all(approved: true)
    when "ignore"
      comments.update_all(ignore_flagged: true)
    when "restore"
      comments.update_all(deleted: false)
    end
  end
end
