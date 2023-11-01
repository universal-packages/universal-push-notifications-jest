import { PushNotification } from '@universal-packages/push-notifications'

declare global {
  namespace jest {
    interface Matchers<R> {
      toHavePushedNotification(notification: PushNotification): R
      toHavePushedNotificationTo(token: string, notification: PushNotification): R

      toHavePushedAndroidNotification(notification: PushNotification): R
      toHavePushedAndroidNotificationTo(token: string, notification: PushNotification): R

      toHavePushedIosNotification(notification: PushNotification): R
      toHavePushedIosNotificationTo(token: string, notification: PushNotification): R
    }
  }
}

export {}
