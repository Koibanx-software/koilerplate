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
