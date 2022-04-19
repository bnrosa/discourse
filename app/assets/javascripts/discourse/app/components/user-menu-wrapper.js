import Component from "@ember/component";
import layout from "discourse/templates/components/user-menu-wrapper";
import { bind } from "discourse-common/utils/decorators";

export default Component.extend({
  layout,

  didInsertElement() {
    this._super(...arguments);
    document.addEventListener("click", this._outsideClickHandler);
  },

  willDestroyElement() {
    this._super(...arguments);
    document.removeEventListener("click", this._outsideClickHandler);
  },

  @bind
  _outsideClickHandler(e) {
    if (this.element.contains(e.target)) {
      return;
    }
    const userMenuHeaderIcon = document.querySelector(
      ".d-header-icons .current-user"
    );
    this.appEvents.trigger("header:close-user-menu");
  },
});
