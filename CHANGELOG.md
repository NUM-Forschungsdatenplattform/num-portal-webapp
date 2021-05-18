# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog][Keep a Changelog] and this project adheres to [Semantic Versioning][Semantic Versioning].

## [Unreleased]


---

## [Released]

## [0.3.0] - 2021-03-15

### Added

- Content displayed to users
- Welcome Page Editor
- Navigation Editor
- Export Study as CSV
- Export data from Data Explorer as CSV
- Filter for AQLs
- Filter for Templates
- Animated Header Logo
- Toast feedback message on AQL save operations
- Toast feedback message on Study save operations
- Toast feedback message on User save operations
- Add categories to studies with autocomplete
- Add keywords to studies with autocomplete
- Add goal to studies with new input area
- Add start and end dates to studies with date picker
- Add flag for private financed studies

### Changed

- Rename 'title' of studies to 'name'
- Only show contents in tables that user has acces to
- Show all content if user is Super Admin

### Security

- Dependency Update Angular from 11.1.1 to 11.2.3
- Dependency Update lodash-es from 4.17.20 to 4.17.21
- Dependency Update rxjs from 6.6.3 to 6.6.6


## [0.2.0] - 2021-03-01

### Added

- Organizations Overview with table to view all organizations
- Organization Editor to add and edit organizations
- Determine hits for a cohort from phenotype and study editor
- Assign Roles to a user

### Changed

- Components take care of assigned roles of the current user


## [0.1.0] - 2021-02-25

### Added

- CircleCI configuration
- Jest for unit and component tests
- Dockerfile
- Authentication with Keycloak
- Welcome Page
- Studies Overview with table of all available studies
- Study editor to add and edit studies
- Data-Explorer Page
- Phenotypes Overview with table to view all existing phenotypes
- Phenotypes Editor to add and edit phenotypes
- AQL Overview to view all stored AQLs
- AQL Editor to add and edit AQLs
- Approved users overview with table of approved users
- Unapproved users overview to view all pending approval requests
- Content-Editor Page

---

<!-- Links -->
[Keep a Changelog]: https://keepachangelog.com/
[Semantic Versioning]: https://semver.org/

<!-- Versions -->
[Unreleased]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/compare/v1.1.0...HEAD
[Released]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/tree/master
[1.0.0]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/compare/2dc040e5eb792bfffb5959172fe8b40b2ee2f739..8ad602c9bbe0e6c5b535ebdbd6cc86370e863f34
[0.5.0]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/compare/94ba3f799407ffb395d80969d2ab6a7cc40cd05f..2dc040e5eb792bfffb5959172fe8b40b2ee2f739
[0.4.0]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/compare/25e7400b55c60a70735ca778416f596650a62f55..94ba3f799407ffb395d80969d2ab6a7cc40cd05f
[0.3.0]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/compare/911d755ec2764d551939d74abca6ffb17652ab53..25e7400b55c60a70735ca778416f596650a62f55
[0.2.0]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/compare/e6babad91dbeb562803ad3a1ec6afa1726e0c09a..911d755ec2764d551939d74abca6ffb17652ab53
[0.1.0]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/compare/137548301f9143282686503e915163dfffe03090..e6babad91dbeb562803ad3a1ec6afa1726e0c09a