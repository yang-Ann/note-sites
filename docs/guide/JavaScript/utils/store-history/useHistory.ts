import { defineStore } from "pinia";
import History from "@/utils/Class/History";

const his = new History(7, "comp");
const getNoop = (): featureMenuType[] => [];
const localhostKey = "history";

const useHistory = defineStore("historyStore", {
  state: () => {
    return {
      history: getNoop()
    };
  },
  actions: {
    getHistory() {
      let history: any = localStorage.getItem(localhostKey);
      if (!history) history = JSON.stringify(getNoop());
      return JSON.parse(history) as featureMenuType[];
    },
    align() {
      this.history = this.getHistory();
    },
    add(item: featureMenuType) {
      his.add(item);
      const history = his.getHistory();
      localStorage.setItem(localhostKey, JSON.stringify(history));
      this.history = history;
    },
    clear() {
      his.setHistory(getNoop());
      localStorage.setItem(localhostKey, JSON.stringify(getNoop()));
      this.history = getNoop();
    }
  }
});

export default useHistory;
