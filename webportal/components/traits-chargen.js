import EmberObject from '@ember/object';
import Component from '@ember/component';
import { action } from '@ember/object';
import { notifyPropertyChange } from '@ember/object';
import { removeObject } from 'ares-webportal/helpers/object-ext';

export default Component.extend({
  didInsertElement: function() {
    let self = this;
    this.set('updateCallback', function() { return self.onUpdate(); } );
  },
  onUpdate: function() {
    let extras = this.get('model.app.game.extra_plugins');

    if (!extras.some(e => e === 'traits')) {
      return {};
    }

    let data = {};
    this.get('model.char.traits').filter(t => t.name && t.name.length > 0)
    .forEach(t => data[t.name] = t.desc);
    return data;
  },
      
  @action
  addTrait() {
    this.get('model.char.traits').push(EmberObject.create( {name: "", desc: ""} ));
    notifyPropertyChange(this, 'model');
  },
  
  @action        
  removeTrait(name) {
    let found = this.get('model.char.traits').find(t => t.name === name);
    if (found) {
      removeObject(this.get('model.char.traits'), found);
      notifyPropertyChange(this, 'model');
    }
  }
});
