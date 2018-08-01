# == Schema Information
#
# Table name: users
#
#  id                 :bigint(8)        not null, primary key
#  current_sign_in_at :datetime
#  current_sign_in_ip :string(255)
#  email              :string(255)      default(""), not null
#  encrypted_password :string(255)      default(""), not null
#  last_sign_in_at    :datetime
#  last_sign_in_ip    :string(255)
#  sign_in_count      :integer          default(0), not null
#  username           :string(255)      default(""), not null
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#
# Indexes
#
#  index_users_on_email     (email) UNIQUE
#  index_users_on_username  (username) UNIQUE
#

class User < ApplicationRecord
  attr_accessor :login
  devise :database_authenticatable, :registerable, :trackable, :validatable

  def self.find_for_database_authentication warden_conditions
    conditions = warden_conditions.dup
    login = conditions.delete(:login)
    where(conditions).where(["lower(username) = :value OR lower(email) = :value", {value: login.strip.downcase}]).first
  end
end
