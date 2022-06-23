import { pullAt, last, findLastIndex, isEqual } from 'lodash'
import { defineStore } from 'pinia'
import { QSlideItem } from 'quasar'
import { RouteLocationNormalized } from 'vue-router'





export const useRouterHistoryStore = defineStore('RouterHistory', {
  state: () => ({
    history: <Array<[RouteLocationNormalized, RouteLocationNormalized] | undefined>>[]
  }),
  getters: {
    current(): RouteLocationNormalized | undefined {
      return last(last(this.history))
    },
    path(): Array<RouteLocationNormalized | undefined> {
      return this.history.map((item) => (last(item)))
    },
  },
  actions: {
    updateHistory(from: RouteLocationNormalized, to: RouteLocationNormalized) {
      const index = findLastIndex(this.history, (item) => (isEqual(item, [to, from])))
      if (index != -1) {
        this.history.splice(index)
      } else {
        this.history.push([from, to])
      }
    },
    initHistory() {
      this.history = [last(this.history)]
    }
  }
})