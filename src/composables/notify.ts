import { Notify, QNotifyCreateOptions } from 'quasar'
export const useNotify = () => {

  const handleWarnings = (message: string) => {
    Notify.create({
      message,
      position: "top-right",
      color: 'warning',
      icon: 'error_outline'
    })
  }

  const handleSuccess = (message: string) => {
    Notify.create({
      message,
      position: "top-right",
      color: 'secondary',
      icon: 'check_circle'
    })
  }

  const handleError = (message: string) => {
    Notify.create({
      message,
      position: "top-right",
      color: 'negative',
      icon: 'highlight_off'
    })
  }

  const create = (opts: string | QNotifyCreateOptions) => {
    Notify.create(opts)
  }

  return {
    handleSuccess,
    handleWarnings,
    handleError,
    create
  }

}