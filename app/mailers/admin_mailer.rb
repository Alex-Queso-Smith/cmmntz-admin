class AdminMailer < ApplicationMailer
  default :from => "do_not_reply@cmmntz.com"

  def send_mail(to, subject, content)
    @content = content
    mail( to: to, subject: subject)
  end

  def send_thread_activity_warning(email, thread, reasons)
    @reasons = reasons
    @thread = thread
    mail( to: email, subject: "CMMNTZ: Activity exceeding thresholds for thread: #{@thread.url}")
  end
end
