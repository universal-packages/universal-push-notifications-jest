import { expect } from '@jest/globals'
import { DryPush, PushNotification, PushNotifications } from '@universal-packages/push-notifications'

import './globals'

beforeEach(() => {
  PushNotifications.dryPushes.length = 0
})

function toHavePushedNotification(PN: PushNotifications | typeof PushNotifications, notification: PushNotification): jest.CustomMatcherResult {
  const instance = PN instanceof PushNotifications ? PN : undefined
  const instanceNotifications = instance ? PushNotifications.dryPushes.filter((dryPush: DryPush) => dryPush.instance === instance) : PushNotifications.dryPushes

  const pass = instanceNotifications.some((dryPush: DryPush) => this.equals(dryPush.notification, notification))

  if (pass) {
    return {
      message: () => {
        if (instance) {
          return 'expected PushNotifications instance not to have pushed the notification, but it actually did (the audacity)'
        } else {
          return 'expected the notification to not have been pushed, but it actually was (the audacity)'
        }
      },
      pass
    }
  } else {
    return {
      message: () => {
        if (instance) {
          if (instanceNotifications.length === 0) {
            return 'expected PushNotifications instance to have pushed the notification, but it did not push any notifications at all'
          } else {
            const notificationsToPrint = instanceNotifications.map((dryPush: DryPush) => this.utils.diff(dryPush.notification, notification)).join('\n\n')

            return `expected PushNotifications instance to have pushed the notification, but it did not\n\nPushed notifications were:\n${notificationsToPrint}`
          }
        } else {
          if (instanceNotifications.length === 0) {
            return 'expected the notification to have been pushed, but no notifications were pushed at all'
          } else {
            const notificationsToPrint = instanceNotifications.map((dryPush: DryPush) => this.utils.diff(dryPush.notification, notification)).join('\n\n')

            return `expected the notification to have been pushed, but it was not\n\nPushed notifications were:\n${notificationsToPrint}`
          }
        }
      },
      pass
    }
  }
}

function toHavePushedNotificationTo(PN: PushNotifications | typeof PushNotifications, token: string, notification: PushNotification): jest.CustomMatcherResult {
  const instance = PN instanceof PushNotifications ? PN : undefined
  const instanceNotifications = instance ? PushNotifications.dryPushes.filter((dryPush: DryPush) => dryPush.instance === instance) : PushNotifications.dryPushes
  const tokenNotifications = instanceNotifications.filter((dryPush: DryPush) => dryPush.token === token)

  const pass = tokenNotifications.some((dryPush: DryPush) => this.equals(dryPush.notification, notification))

  if (pass) {
    return {
      message: () => {
        if (instance) {
          return `expected PushNotifications instance not to have pushed the notification to the given token, but it actually did (the audacity)`
        } else {
          return `expected the notification to not have been pushed to the given token, but it actually was (the audacity)`
        }
      },
      pass
    }
  } else {
    return {
      message: () => {
        if (instance) {
          if (instanceNotifications.length === 0) {
            return `expected PushNotifications instance to have pushed the notification to the given token, but it did not push any notifications at all`
          } else if (tokenNotifications.length === 0) {
            return `expected PushNotifications instance to have pushed the notification to the given token, but it did not push any notifications to that token (but it did to other tokens)`
          } else {
            const notificationsToPrint = tokenNotifications.map((dryPush: DryPush) => this.utils.diff(dryPush.notification, notification)).join('\n\n')

            return `expected PushNotifications instance to have pushed the notification to the given token, but it did not\n\nPushed notifications to that token were:\n${notificationsToPrint}`
          }
        } else {
          if (instanceNotifications.length === 0) {
            return `expected the notification to have been pushed to the given token, but no notifications were pushed at all`
          } else if (tokenNotifications.length === 0) {
            return `expected the notification to have been pushed to the given token, but no notifications were pushed to that token (but notifications were pushed to other tokens)`
          } else {
            const notificationsToPrint = tokenNotifications.map((dryPush: DryPush) => this.utils.diff(dryPush.notification, notification)).join('\n\n')

            return `expected the notification to have been pushed to the given token, but it was not\n\nPushed notifications to that token were:\n${notificationsToPrint}`
          }
        }
      },
      pass
    }
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//// ANDROID ////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function toHavePushedAndroidNotification(PN: PushNotifications | typeof PushNotifications, notification: PushNotification): jest.CustomMatcherResult {
  const instance = PN instanceof PushNotifications ? PN : undefined
  const instanceNotifications = instance ? PushNotifications.dryPushes.filter((dryPush: DryPush) => dryPush.instance === instance) : PushNotifications.dryPushes
  const androidNotifications = instanceNotifications.filter((dryPush: DryPush) => dryPush.capability === 'android')

  const pass = androidNotifications.some((dryPush: DryPush) => this.equals(dryPush.notification, notification))

  if (pass) {
    return {
      message: () => {
        if (instance) {
          return `expected PushNotifications instance not to have pushed the notification to Android, but it actually did (the audacity)`
        } else {
          return `expected the notification to not have been pushed to Android, but it actually was (the audacity)`
        }
      },
      pass
    }
  } else {
    return {
      message: () => {
        if (instance) {
          if (instanceNotifications.length === 0) {
            return `expected PushNotifications instance to have pushed the notification to Android, but it did not push any notifications at all`
          } else if (androidNotifications.length === 0) {
            return `expected PushNotifications instance to have pushed the notification to Android, but it did not push any notifications to Android (but it did to other platforms)`
          } else {
            const notificationsToPrint = androidNotifications.map((dryPush: DryPush) => this.utils.diff(dryPush.notification, notification)).join('\n\n')

            return `expected PushNotifications instance to have pushed the notification to Android, but it did not\n\nPushed notifications to Android were:\n${notificationsToPrint}`
          }
        } else {
          if (instanceNotifications.length === 0) {
            return `expected the notification to have been pushed to Android, but no notifications were pushed at all`
          } else if (androidNotifications.length === 0) {
            return `expected the notification to have been pushed to Android, but no notifications were pushed to Android (but notifications were pushed to other platforms)`
          } else {
            const notificationsToPrint = androidNotifications.map((dryPush: DryPush) => this.utils.diff(dryPush.notification, notification)).join('\n\n')

            return `expected the notification to have been pushed to Android, but it was not\n\nPushed notifications to Android were:\n${notificationsToPrint}`
          }
        }
      },
      pass
    }
  }
}

function toHavePushedAndroidNotificationTo(PN: PushNotifications | typeof PushNotifications, token: string, notification: PushNotification): jest.CustomMatcherResult {
  const instance = PN instanceof PushNotifications ? PN : undefined
  const instanceNotifications = instance ? PushNotifications.dryPushes.filter((dryPush: DryPush) => dryPush.instance === instance) : PushNotifications.dryPushes
  const androidNotifications = instanceNotifications.filter((dryPush: DryPush) => dryPush.capability === 'android')
  const tokenNotifications = androidNotifications.filter((dryPush: DryPush) => dryPush.token === token)

  const pass = tokenNotifications.some((dryPush: DryPush) => this.equals(dryPush.notification, notification))

  if (pass) {
    return {
      message: () => {
        if (instance) {
          return `expected PushNotifications instance not to have pushed the notification to Android for the given token, but it actually did (the audacity)`
        } else {
          return `expected the notification to not have been pushed to Android for the given token, but it actually was (the audacity)`
        }
      },
      pass
    }
  } else {
    return {
      message: () => {
        if (instance) {
          if (instanceNotifications.length === 0) {
            return `expected PushNotifications instance to have pushed the notification to Android for the given token, but it did not push any notifications at all`
          } else if (androidNotifications.length === 0) {
            return `expected PushNotifications instance to have pushed the notification to Android for the given token, but it did not push any notifications to Android (but it did to other platforms)`
          } else if (tokenNotifications.length === 0) {
            return `expected PushNotifications instance to have pushed the notification to Android for the given token, but it did not push any notifications to Android for that token (but it did to other tokens)`
          } else {
            const notificationsToPrint = tokenNotifications.map((dryPush: DryPush) => this.utils.diff(dryPush.notification, notification)).join('\n\n')

            return `expected PushNotifications instance to have pushed the notification to Android for the given token, but it did not\n\nPushed notifications to Android for that token were:\n${notificationsToPrint}`
          }
        } else {
          if (instanceNotifications.length === 0) {
            return `expected the notification to have been pushed to Android for the given token, but no notifications were pushed at all`
          } else if (androidNotifications.length === 0) {
            return `expected the notification to have been pushed to Android for the given token, but no notifications were pushed to Android (but notifications were pushed to other platforms)`
          } else if (tokenNotifications.length === 0) {
            return `expected the notification to have been pushed to Android for the given token, but no notifications were pushed to Android for that token (but notifications were pushed to other tokens)`
          } else {
            const notificationsToPrint = tokenNotifications.map((dryPush: DryPush) => this.utils.diff(dryPush.notification, notification)).join('\n\n')

            return `expected the notification to have been pushed to Android for the given token, but it was not\n\nPushed notifications to Android for that token were:\n${notificationsToPrint}`
          }
        }
      },
      pass
    }
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//// IOS ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function toHavePushedIosNotification(PN: PushNotifications | typeof PushNotifications, notification: PushNotification): jest.CustomMatcherResult {
  const instance = PN instanceof PushNotifications ? PN : undefined
  const instanceNotifications = instance ? PushNotifications.dryPushes.filter((dryPush: DryPush) => dryPush.instance === instance) : PushNotifications.dryPushes
  const iosNotifications = instanceNotifications.filter((dryPush: DryPush) => dryPush.capability === 'ios')

  const pass = iosNotifications.some((dryPush: DryPush) => this.equals(dryPush.notification, notification))

  if (pass) {
    return {
      message: () => {
        if (instance) {
          return `expected PushNotifications instance not to have pushed the notification to iOS, but it actually did (the audacity)`
        } else {
          return `expected the notification to not have been pushed to iOS, but it actually was (the audacity)`
        }
      },
      pass
    }
  } else {
    return {
      message: () => {
        if (instance) {
          if (instanceNotifications.length === 0) {
            return `expected PushNotifications instance to have pushed the notification to iOS, but it did not push any notifications at all`
          } else if (iosNotifications.length === 0) {
            return `expected PushNotifications instance to have pushed the notification to iOS, but it did not push any notifications to iOS (but it did to other platforms)`
          } else {
            const notificationsToPrint = iosNotifications.map((dryPush: DryPush) => this.utils.diff(dryPush.notification, notification)).join('\n\n')

            return `expected PushNotifications instance to have pushed the notification to iOS, but it did not\n\nPushed notifications to iOS were:\n${notificationsToPrint}`
          }
        } else {
          if (instanceNotifications.length === 0) {
            return `expected the notification to have been pushed to iOS, but no notifications were pushed at all`
          } else if (iosNotifications.length === 0) {
            return `expected the notification to have been pushed to iOS, but no notifications were pushed to iOS (but notifications were pushed to other platforms)`
          } else {
            const notificationsToPrint = iosNotifications.map((dryPush: DryPush) => this.utils.diff(dryPush.notification, notification)).join('\n\n')

            return `expected the notification to have been pushed to iOS, but it was not\n\nPushed notifications to iOS were:\n${notificationsToPrint}`
          }
        }
      },
      pass
    }
  }
}

function toHavePushedIosNotificationTo(PN: PushNotifications | typeof PushNotifications, token: string, notification: PushNotification): jest.CustomMatcherResult {
  const instance = PN instanceof PushNotifications ? PN : undefined
  const instanceNotifications = instance ? PushNotifications.dryPushes.filter((dryPush: DryPush) => dryPush.instance === instance) : PushNotifications.dryPushes
  const iosNotifications = instanceNotifications.filter((dryPush: DryPush) => dryPush.capability === 'ios')
  const tokenNotifications = iosNotifications.filter((dryPush: DryPush) => dryPush.token === token)

  const pass = tokenNotifications.some((dryPush: DryPush) => this.equals(dryPush.notification, notification))

  if (pass) {
    return {
      message: () => {
        if (instance) {
          return `expected PushNotifications instance not to have pushed the notification to iOS for the given token, but it actually did (the audacity)`
        } else {
          return `expected the notification to not have been pushed to iOS for the given token, but it actually was (the audacity)`
        }
      },
      pass
    }
  } else {
    return {
      message: () => {
        if (instance) {
          if (instanceNotifications.length === 0) {
            return `expected PushNotifications instance to have pushed the notification to iOS for the given token, but it did not push any notifications at all`
          } else if (iosNotifications.length === 0) {
            return `expected PushNotifications instance to have pushed the notification to iOS for the given token, but it did not push any notifications to iOS (but it did to other platforms)`
          } else if (tokenNotifications.length === 0) {
            return `expected PushNotifications instance to have pushed the notification to iOS for the given token, but it did not push any notifications to iOS for that token (but it did to other tokens)`
          } else {
            const notificationsToPrint = tokenNotifications.map((dryPush: DryPush) => this.utils.diff(dryPush.notification, notification)).join('\n\n')

            return `expected PushNotifications instance to have pushed the notification to iOS for the given token, but it did not\n\nPushed notifications to iOS for that token were:\n${notificationsToPrint}`
          }
        } else {
          if (instanceNotifications.length === 0) {
            return `expected the notification to have been pushed to iOS for the given token, but no notifications were pushed at all`
          } else if (iosNotifications.length === 0) {
            return `expected the notification to have been pushed to iOS for the given token, but no notifications were pushed to iOS (but notifications were pushed to other platforms)`
          } else if (tokenNotifications.length === 0) {
            return `expected the notification to have been pushed to iOS for the given token, but no notifications were pushed to iOS for that token (but notifications were pushed to other tokens)`
          } else {
            const notificationsToPrint = tokenNotifications.map((dryPush: DryPush) => this.utils.diff(dryPush.notification, notification)).join('\n\n')

            return `expected the notification to have been pushed to iOS for the given token, but it was not\n\nPushed notifications to iOS for that token were:\n${notificationsToPrint}`
          }
        }
      },
      pass
    }
  }
}

expect.extend({
  toHavePushedNotification,
  toHavePushedNotificationTo,
  toHavePushedAndroidNotification,
  toHavePushedAndroidNotificationTo,
  toHavePushedIosNotification,
  toHavePushedIosNotificationTo
})
