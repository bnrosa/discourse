import GlimmerComponent from "discourse/components/glimmer";
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";
import I18n from "I18n";

export default class UserMenuNotificationsList extends GlimmerComponent {
  @tracked loading = false;
  @tracked items = [];

  constructor() {
    super(...arguments);
    this._load();
  }

  get filterByType() {
    return null;
  }

  get showAllHref() {
    return `${this.currentUser.path}/notifications`;
  }

  get showAllTitle() {
    return I18n.t("user_menu.view_all_notifications");
  }

  get dismissTitle() {
    return I18n.t("user.dismiss_notifications_tooltip");
  }

  get showDismiss() {
    return this.items.some((item) => !item.read);
  }

  fetchItems() {
    const params = {
      recent: true,
      silent: this.currentUser.enforcedSecondFactor,
      limit: 30,
    };
    let cacheKey = "recent-notifications";
    if (this.filterByType) {
      params.filter_by_type = this.filterByType;
      cacheKey += `-type-${this.filterByType}`;
    }

    return this.store.findStale("notification", params, { cacheKey }).refresh();
  }

  _load() {
    this.loading = true;
    this.fetchItems()
      .then((items) => (this.items = items.content))
      .finally(() => (this.loading = false));
  }

  @action
  dismissButtonClick() {
    console.log("do something");
  }
}
