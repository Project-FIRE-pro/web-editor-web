import { Dialog, DialogChainObject, QDialogOptions } from 'quasar'
export function useDialog() {

  const create = (opts: QDialogOptions): DialogChainObject => {
    return Dialog.create(opts)
  }

  return {
    create
  }

}