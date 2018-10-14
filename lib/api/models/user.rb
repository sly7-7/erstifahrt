require 'active_support/core_ext/securerandom'

class User < ActiveRecord::Base
  def regenerate_token!
    update! token: self.class.generate_unique_secure_token
    update_token_expiration!
    token
  end

  def update_token_expiration!
    update! token_expires_at: (DateTime.now + Rational(1, 48)) # +30 min
  end

  def token_is_valid?
    DateTime.now < token_expires_at
  end
end
