module AresMUSH
  module Traits
    def self.can_edit_traits?(enactor, model)
      enactor.name == model.name || Traits.can_manage_traits?(enactor)
    end
    
    def self.can_manage_traits?(enactor)
      Chargen.can_approve?(enactor)
    end
    
    def self.check_traits_locked(enactor, model)
      return nil if Traits.can_manage_traits?(enactor)
      return Chargen.check_chargen_locked(model)
    end
    
    def self.uninstall_plugin(client)
      begin 
        Character.all.each do |c|
          c.update(traits: nil)
        end        
         Manage.uninstall_plugin("traits")
         client.emit_success "Plugin uninstalled."
      
       rescue Exception => e
         client.emit_failure "Error uninstalling plugin: #{e} backtrace=#{e.backtrace[0,10]}"
       end
    end
    
  end
end