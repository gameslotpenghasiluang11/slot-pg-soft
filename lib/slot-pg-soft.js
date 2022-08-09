'use babel';

import SlotPgSoftView from './slot-pg-soft-view';
import { CompositeDisposable } from 'atom';

export default {

  slotPgSoftView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.slotPgSoftView = new SlotPgSoftView(state.slotPgSoftViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.slotPgSoftView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'slot-pg-soft:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.slotPgSoftView.destroy();
  },

  serialize() {
    return {
      slotPgSoftViewState: this.slotPgSoftView.serialize()
    };
  },

  toggle() {
    console.log('SlotPgSoft was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
