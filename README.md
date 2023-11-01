# Push Notifications Jest

[![npm version](https://badge.fury.io/js/@universal-packages%2Fbackground-jobs-jest.svg)](https://www.npmjs.com/package/@universal-packages/push-notifications-jest)
[![Testing](https://github.com/universal-packages/universal-push-notifications-jest/actions/workflows/testing.yml/badge.svg)](https://github.com/universal-packages/universal-push-notifications-jest/actions/workflows/testing.yml)
[![codecov](https://codecov.io/gh/universal-packages/universal-push-notifications-jest/branch/main/graph/badge.svg?token=CXPJSN8IGL)](https://codecov.io/gh/universal-packages/universal-push-notifications-jest)

Jest matchers for [Push Notifications](https://github.com/universal-packages/universal-push-notifications) testing.

## Install

```shell
npm install @universal-packages/push-notifications-jest

npm install @universal-packages/push-notifications
```

## Setup

Add the following to your `jest.config.js` or where you configure Jest:

```js
module.exports = {
  setupFilesAfterEnv: ['@universal-packages/push-notifications-jest']
}
```

## Matchers

### toHavePushedNotification

```js
import { PushNotifications } from './MyJob'
import config from './config'

it('should push notification', async () => {
  const pushNotifications = new PushNotifications(config)

  await pushNotifications.pushNotification([deviceToken], { title: 'Hello', body: 'World', data: { id: 1 } })

  expect(pushNotifications).toHavePushedNotification({ title: 'Hello', body: 'World', data: { id: 1 } })

  // Or against the PushNotifications class
  expect(PushNotifications).toHavePushedNotification({ title: 'Hello', body: 'World', data: { id: 1 } })
})
```

### toHavePushedNotificationTo

```js
import { PushNotifications } from './MyJob'
import config from './config'

it('should push notification', async () => {
  const pushNotifications = new PushNotifications(config)

  await pushNotifications.pushNotification([deviceToken], { title: 'Hello', body: 'World', data: { id: 1 } })

  expect(pushNotifications).toHavePushedNotificationTo(deviceToken, { title: 'Hello', body: 'World', data: { id: 1 } })

  // Or against the PushNotifications class
  expect(PushNotifications).toHavePushedNotificationTo(deviceToken, { title: 'Hello', body: 'World', data: { id: 1 } })
})
```

### toHavePushedAndroidNotification

```js
import { PushNotifications } from './MyJob'
import config from './config'

it('should push notification', async () => {
  const pushNotifications = new PushNotifications(config)

  await pushNotifications.pushNotification([androidDeviceToken], { title: 'Hello', body: 'World', data: { id: 1 } })

  expect(pushNotifications).toHavePushedAndroidNotification({ title: 'Hello', body: 'World', data: { id: 1 } })

  // Or against the PushNotifications class
  expect(PushNotifications).toHavePushedAndroidNotification({ title: 'Hello', body: 'World', data: { id: 1 } })
})
```

### toHavePushedAndroidNotificationTo

```js
import { PushNotifications } from './MyJob'
import config from './config'

it('should push notification', async () => {
  const pushNotifications = new PushNotifications(config)

  await pushNotifications.pushNotification([androidDeviceToken], { title: 'Hello', body: 'World', data: { id: 1 } })

  expect(pushNotifications).toHavePushedAndroidNotificationTo(androidDeviceToken, { title: 'Hello', body: 'World', data: { id: 1 } })

  // Or against the PushNotifications class
  expect(PushNotifications).toHavePushedAndroidNotificationTo(androidDeviceToken, { title: 'Hello', body: 'World', data: { id: 1 } })
})
```

### toHavePushedIosNotification

```js
import { PushNotifications } from './MyJob'
import config from './config'

it('should push notification', async () => {
  const pushNotifications = new PushNotifications(config)

  await pushNotifications.pushNotification([androidDeviceToken], { title: 'Hello', body: 'World', data: { id: 1 } })

  expect(pushNotifications).toHavePushedIosNotification({ title: 'Hello', body: 'World', data: { id: 1 } })

  // Or against the PushNotifications class
  expect(PushNotifications).toHavePushedIosNotification({ title: 'Hello', body: 'World', data: { id: 1 } })
})
```

### toHavePushedIosNotificationTo

```js
import { PushNotifications } from './MyJob'
import config from './config'

it('should push notification', async () => {
  const pushNotifications = new PushNotifications(config)

  await pushNotifications.pushNotification([iosDeviceToken], { title: 'Hello', body: 'World', data: { id: 1 } })

  expect(pushNotifications).toHavePushedIosNotificationTo(iosDeviceToken, { title: 'Hello', body: 'World', data: { id: 1 } })

  // Or against the PushNotifications class
  expect(PushNotifications).toHavePushedIosNotificationTo(iosDeviceToken, { title: 'Hello', body: 'World', data: { id: 1 } })
})
```

## Typescript

In order for typescript to see the global types you need to reference the types somewhere in your project, normally `./src/globals.d.ts`.

```ts
/// <reference types="@universal-packages/push-notifications-jest" />
```

This library is developed in TypeScript and shipped fully typed.

## Contributing

The development of this library happens in the open on GitHub, and we are grateful to the community for contributing bugfixes and improvements. Read below to learn how you can take part in improving this library.

- [Code of Conduct](./CODE_OF_CONDUCT.md)
- [Contributing Guide](./CONTRIBUTING.md)

### License

[MIT licensed](./LICENSE).
