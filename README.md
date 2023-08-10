####

<img src="https://i.ibb.co/y4VJQ7L/Mask-group-2.png" alt="koiPlate">

# KoiPlate - TS & Clean Architecture boilerplate

[//]: # "Cambiar la version en la siguiente linea cuando se incrementa"

<img src="https://img.shields.io/badge/version-v0.23.0-orange" alt="teoPlate">

## Descripción

Clean architecture typescript boilerplate.

## Development set up

### Colaborate

To commit new features, fixes, documentation, tests, etc. please follow the next commitlint rules:

```
ci:       Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)
chore:    Other changes that don't modify src or test files
revert:   Reverts a previous commit
feat:     A new feature
fix:      A bug fix
docs:     Documentation only changes
style:    Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
refactor: A code change that neither fixes a bug nor adds a feature
perf:     A code change that improves performance
test:     Adding missing tests or correcting existing tests
build:    Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
```

#### Commit examples:

- Feature:

```
git commit -m "feat(createUser): added new use case for user creation"
```

- Fix:

```
git commit -m "fix(authenticate): fixed jwt response"
```

- Documentation:

```
git commit -m "docs(readme): added commit lint rules to readme"
```

### Tag a release and generate a changelog

```
yarn run release
git push --follow-tags origin [your branch]
```

### Set Up

Add .env to root folder or duplicate .env.example and complete variables

**Environments variables**

```
<<<<<<< HEAD
    - VARIABLE_1: why is is necessary
    - VARIABLE_2: why is is necessary
    - VARIABLE_3: why is is necessary
=======
    - APP_NAME= Application name
    - AUTH_APIKEY= Auth module API key
    - AUTH_APP= App name
    - AUTH_DEFAULT_VERIFICATION_METHOD= Default verification method (EMAIL | SMS | WHATSAPP)
    - AUTH_REQUIRES_ACCOUNT_VERIFICATION= Enables account verification step
    - AUTH_REQUIRES_OTP= Enables OTP authentication
    - AUTH_SECRET= Auth module secret
    - AUTH_URL= Auth module URL
    - AUTH_VERIFICATION_METHODS= Verification methods separated by spaces and with single quotes. Example: 'EMAIL SMS WHATSAPP'
    - HTTP_PORT= Port to run the server
    - KOIBANX_SECRET= Koibanx secret for GOD user one time generation
    - MONGO_URI= MongoDB connection string
    - NOTIFICATIONS_FIREBASE_KEY= Firebase key
    - NOTIFICATIONS_FRONTEND_URL= Frontend URL
    - NOTIFICATIONS_MAIL_SENDER= Mail sender
    - NOTIFICATIONS_URL= Notifications URL
>>>>>>> develop
```

### Install dependencies

```
npm install
yarn
```

### Run

```
npm run dev
yarn dev
```

### Test

```
npm run test
yarn test
```

<<<<<<< HEAD

### Lint

```
npm run lint
```

=======

> > > > > > > develop

## Building and deploying in production

### Build

```
docker build . -t ${REGISTRY}/${REPOSITORY}:${ENVIRONMENT}-${TAG}
```

### Deploy

```
helm upgrade --install ${APP} -n ${NAMESPACE} -f ./values/${PRODUCT}/${APP}.yaml .
```

## URLs

**Develop**

[https://api.koiplate.develop.tokkenit.com](https://api.koiplate.develop.tokkenit.com)

**Demo**

[https://api.koiplate.demo.tokkenit.com](https://api.koiplate.demo.tokkenit.com)

**Production**

[https://api.koiplate.tokkenit.com](https://api.koiplate.tokkenit.com)

## Issues

For issues or questions please contact [mail@koibanx.com](mailto:nombre@koibanx.com?subject=[GitHub]%20Project%20Name%20) (Project Owner) or [mail@koibanx.com](mailto:nombre@koibanx.com?subject=[GitHub]%20Project%20Name%20) (Substitute)

<<<<<<< HEAD
Jira dashboard: [Board name](https://www.jira.com)

=======
Jira dashboard: [PR2XXXXXXXXX-koiplate](https://koibanx.atlassian.net/jira/software/c/projects/PGXXXXX/boards/XXX)

> > > > > > > develop
