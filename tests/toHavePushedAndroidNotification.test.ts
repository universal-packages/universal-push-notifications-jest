import { PushNotifications } from '@universal-packages/push-notifications'
import stripAnsi from 'strip-ansi'

import '../src'

describe('toHavePushedAndroidNotification', (): void => {
  describe('against the exact PushNotifications instance', (): void => {
    it('asserts notification being pushed', async (): Promise<void> => {
      const pushNotifications = new PushNotifications()
      const notification = { title: 'title', body: 'body', data: { test: 'test' } }
      pushNotifications.capabilities.push('ios', 'android')

      await pushNotifications.pushNotification(['token:token'], notification)

      expect(pushNotifications).toHavePushedAndroidNotification(notification)
    })

    it('fails if the notification was pushed but it was not expected', async (): Promise<void> => {
      const pushNotifications = new PushNotifications()
      const notification = { title: 'title', body: 'body', data: { test: 'test' } }
      pushNotifications.capabilities.push('ios', 'android')

      await pushNotifications.pushNotification(['token:token'], notification)

      let error: Error

      try {
        expect(pushNotifications).not.toHavePushedAndroidNotification(notification)
      } catch (e) {
        error = e
      }

      expect(stripAnsi(error.message)).toEqual('expected PushNotifications instance not to have pushed the notification to Android, but it actually did (the audacity)')
    })

    it('fails if the notification was not pushed to Android', async (): Promise<void> => {
      const pushNotifications = new PushNotifications()
      const notification = { title: 'title', body: 'body', data: { test: 'test' } }
      pushNotifications.capabilities.push('ios', 'android')

      await pushNotifications.pushNotification(['token'], notification)

      let error: Error

      try {
        expect(pushNotifications).toHavePushedAndroidNotification(notification)
      } catch (e) {
        error = e
      }

      expect(stripAnsi(error.message)).toEqual(
        'expected PushNotifications instance to have pushed the notification to Android, but it did not push any notifications to Android (but it did to other platforms)'
      )
    })

    it('fails and shows if no notifications were pushed', async (): Promise<void> => {
      const pushNotifications = new PushNotifications()

      const notification = { title: 'title', body: 'body', data: { test: 'test' } }
      pushNotifications.capabilities.push('ios', 'android')

      let error: Error

      try {
        expect(pushNotifications).toHavePushedAndroidNotification(notification)
      } catch (e) {
        error = e
      }

      expect(stripAnsi(error.message)).toEqual('expected PushNotifications instance to have pushed the notification to Android, but it did not push any notifications at all')
    })

    it('fails and shows if no notifications were pushed even if it were in other PushNotifications instances', async (): Promise<void> => {
      const pushNotifications = new PushNotifications()
      const otherPushNotifications = new PushNotifications()
      const notification = { title: 'title', body: 'body', data: { test: 'test' } }
      pushNotifications.capabilities.push('ios', 'android')
      otherPushNotifications.capabilities.push('ios', 'android')

      await otherPushNotifications.pushNotification(['token:token'], notification)

      let error: Error

      try {
        expect(pushNotifications).toHavePushedAndroidNotification(notification)
      } catch (e) {
        error = e
      }

      expect(stripAnsi(error.message)).toEqual('expected PushNotifications instance to have pushed the notification to Android, but it did not push any notifications at all')
    })

    it('fails and shows if the notification was not pushed and tells which ones were', async (): Promise<void> => {
      const pushNotifications = new PushNotifications()
      const notification = { title: 'title', body: 'body', data: { test: 'test' } }
      pushNotifications.capabilities.push('ios', 'android')

      await pushNotifications.pushNotification(['token:token'], { title: 'other title', body: 'other body', data: { test: 'other test' } })

      let error: Error

      try {
        expect(pushNotifications).toHavePushedAndroidNotification(notification)
      } catch (e) {
        error = e
      }

      expect(stripAnsi(error.message)).toEqual(`expected PushNotifications instance to have pushed the notification to Android, but it did not

Pushed notifications to Android were:
- Expected
+ Received

  Object {
-   "body": "other body",
+   "body": "body",
    "data": Object {
-     "test": "other test",
+     "test": "test",
    },
-   "title": "other title",
+   "title": "title",
  }`)
    })
  })

  describe('against the PushNotifications class', (): void => {
    it('asserts notification being pushed', async (): Promise<void> => {
      const pushNotifications = new PushNotifications()
      const notification = { title: 'title', body: 'body', data: { test: 'test' } }
      pushNotifications.capabilities.push('ios', 'android')

      await pushNotifications.pushNotification(['token:token'], notification)

      expect(PushNotifications).toHavePushedAndroidNotification(notification)
    })

    it('fails if the notification was pushed but it was not expected', async (): Promise<void> => {
      const pushNotifications = new PushNotifications()
      const notification = { title: 'title', body: 'body', data: { test: 'test' } }
      pushNotifications.capabilities.push('ios', 'android')

      await pushNotifications.pushNotification(['token:token'], notification)

      let error: Error

      try {
        expect(PushNotifications).not.toHavePushedAndroidNotification(notification)
      } catch (e) {
        error = e
      }

      expect(stripAnsi(error.message)).toEqual('expected the notification to not have been pushed to Android, but it actually was (the audacity)')
    })

    it('fails if the notification was not pushed to Android', async (): Promise<void> => {
      const pushNotifications = new PushNotifications()
      const notification = { title: 'title', body: 'body', data: { test: 'test' } }
      pushNotifications.capabilities.push('ios', 'android')

      await pushNotifications.pushNotification(['token'], notification)

      let error: Error

      try {
        expect(PushNotifications).toHavePushedAndroidNotification(notification)
      } catch (e) {
        error = e
      }

      expect(stripAnsi(error.message)).toEqual(
        'expected the notification to have been pushed to Android, but no notifications were pushed to Android (but notifications were pushed to other platforms)'
      )
    })

    it('fails and shows if no notifications were pushed', async (): Promise<void> => {
      const pushNotifications = new PushNotifications()

      const notification = { title: 'title', body: 'body', data: { test: 'test' } }
      pushNotifications.capabilities.push('ios', 'android')

      let error: Error

      try {
        expect(PushNotifications).toHavePushedAndroidNotification(notification)
      } catch (e) {
        error = e
      }

      expect(stripAnsi(error.message)).toEqual('expected the notification to have been pushed to Android, but no notifications were pushed at all')
    })

    it('asserts notification being pushed does not matter which instance did it', async (): Promise<void> => {
      const pushNotifications = new PushNotifications()
      const otherPushNotifications = new PushNotifications()
      const notification = { title: 'title', body: 'body', data: { test: 'test' } }
      pushNotifications.capabilities.push('ios', 'android')
      otherPushNotifications.capabilities.push('ios', 'android')

      await otherPushNotifications.pushNotification(['token:token'], notification)

      expect(PushNotifications).toHavePushedAndroidNotification(notification)
    })

    it('fails and shows if the notification was not pushed and tells which ones were', async (): Promise<void> => {
      const pushNotifications = new PushNotifications()
      const notification = { title: 'title', body: 'body', data: { test: 'test' } }
      pushNotifications.capabilities.push('ios', 'android')

      await pushNotifications.pushNotification(['token:token'], { title: 'other title', body: 'other body', data: { test: 'other test' } })

      let error: Error

      try {
        expect(PushNotifications).toHavePushedAndroidNotification(notification)
      } catch (e) {
        error = e
      }

      expect(stripAnsi(error.message)).toEqual(`expected the notification to have been pushed to Android, but it was not

Pushed notifications to Android were:
- Expected
+ Received

  Object {
-   "body": "other body",
+   "body": "body",
    "data": Object {
-     "test": "other test",
+     "test": "test",
    },
-   "title": "other title",
+   "title": "title",
  }`)
    })
  })
})
