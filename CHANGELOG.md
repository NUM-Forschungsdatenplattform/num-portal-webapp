# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog][keep a changelog] and this project adheres to [Semantic Versioning][semantic versioning].

## [Unreleased]


---

## [Released]

## [1.4.0] - 2021-07-27

### Fixed

- Project Editor: Keep save buttons enabled after save failed ([#256])
- Cohort-Designer: Preview of AQLs in the Dialog ([#257])
- Cohort-Designer: Parameters for types Date, DateTime and Time ([#258])
- Simple Search: Displays ‘Invalid’ for broken templates (backend respond with -1)  ([#259])
- Simple Search: Fix graph labels and copy issues ([265])
- Simple Search: Separate role handling for managers and project lead for determine hits ([#270])
- Restricts AQL Module to Manager only ([#260])
- Data-Filter: Deleting of template deleted wrong template ([#261])
- AQL Builder: Appends “code_string” in where clause to aql paths ending with “defining_code” ([#263])
- Project Editor: Add create project button that is only visible to project leads ([#267])
- AQL Service: Add caching to prevent multiple fetch requests on page load  ([#262])
- User management: Manager role can only be assigned by super admin role ([#268])

### Added

- Cookie-Dialog before the login happens ([#264])
- Separate pages for legal information ([#266])

### Changed

- Copy: Remove AQL from all user visible texts ([#269], [#273])
- Copy: Approval dialog content changed to not use the term “ethical” ([#272])
- Charts page: Only visible to manager users ([#271])

## [1.3.0] - 2021-07-16

### Added

- Role "Manager" that takes over responsibilities from role "Project Lead" for managing AQLs and Phenotypes ([#224])
- AQL Category management page to create, update or delete categories for AQL queries ([#227])
- Renaming of all occurrences of the term "study" to "project" in all cases except for roles ([#228])
- AQL Category column in AQL queries overview ([#229])
- AQL Category select in AQL editor dialog ([#229])
- Cohort-Builder disabled state ([#234])
- Cohort-Builder and accordion style to data-explorer ([#235])
- Cohort-Builder handling of parameters ([#239])
- Search-Page to filter patients for possible projects ([#238])
- Search-Page shows age distribution graph of defined cohort ([#242])
- Search-Page shows clinic distribution graph of defined cohort ([#245])
- Imprint page provides public keys as link for data transfer ([#240])
- Adds determin hits to projects cohort builder ([#241])
- Adds ability to set parameters in cohort builder to null ([#243])
- Adds the data-filter ([#246])
- Adds the manager-data-explorer ([#248])

### Changes

- Add role restriction to tab navigation generation ([#230])
- Refactoring of the Cohort-Builder ([#233])
- Removale of phenotype-concept ([#233])
- Refactoring of aql-parameter inputs ([#234])
- Editing researchers in the project editor no longer saves the cohort ([#247])
- Separated download file utils ([#251])

## [1.2.0] - 2021-06-01

### Added

- Unapproved / Approved Users table: Filter by organizations or all users ([#208])
- Data Explorer: All unselectable Composition parts are shown faded out in customize AQL view ([#213])
- CHANGELOG.md ([#223])

### Changed

- Dev-Tooling: Default backend target is now at "dev.num-codex.de" ([#211])
- Graphs: Change to new backend endpoint ([#217])
- Graphs: Now using ngx-charts ([#217])
- NOTICE.md: All partners are now listet with their logo ([#220])
- Data Explorer: AQLs for multiple compositions got a unique alias based on template id ([#221])
- Data Explorer: AQLs for multiple compositions are restricted to the corresponding template ([#221])

### Fixed

- AQL-Editor: Publish AQL is no longer preselected ([#206])
- AQL table: Sort AQLs now working ([#207])
- AQL Builder: Contains operator is now "OR" instead of "AND" ([#210])
- AQL Builder: Display bug with Safari is gone ([#214])
- AQL Builder: Dialog now consumes less CPU power ([#214])
- Unapproved Users table: Sorting now works ([#212])
- Approved Users table: Sorting now works ([#215])
- Organizations table: Sorting now works ([#216])
- Data Explorer: Downloaded ZIP files are no longer corrupt ([#218])
- Data Explorer: Project table sort now works ([#219])
- Dev-Tooling: Playground compilation fixed by no longer using ivy ([#222])

### Security

- Fix NPM security audit issues ([#209])

## [1.1.0] - 2021-04-29

### Added

- Phenotype Overview table: Delete phenotypes ([#183])
- Phenotype overview table: Filter by users' organization, users' own or all ([#195])
- AQL overview table: Delete not owned AQLs as super admin ([#185])
- Project overview table: Delete and archive projects ([#186])
- Project overview table: Filter for archived project ([#188])
- Project overview table: Filter by users' organization, users' own or all ([#196])
- Data Explorer: Modify AQL for specific researcher requests ([#190])
- Data Explorer: Show multiple tables for each composition ([#192], [#198])
- Data Explorer: Download multiple CSV files as on ZIP archive ([#193])
- AQL Editor: Execute AQL to see result match count ([#191])
- Charts: Average SOFA per clinic and number of patients per SOFA score ([#201])

### Changed

- New Logo ([#189])
- Project editor: Consider the outside EU flag for result set size ([#199])
- AQL Builder: Generate random id for undefined alias ([#202], [#203])

### Fixed

- AQL & Phenotype tables no longer show blank page if owner is undefined ([#187])
- Project overview table: Sort content ([#194])
- Data Explorer: Recompile AQL after configuration exit ([#197])

### Security

- Links with target \_blank: Add rel=noopener to all links ([#184])

## [1.0.0] - 2021-03-31

### Added

- Data Explorer: Export to JSON file ([#165])
- Apache 2.0 license headers to all files ([#168])
- NOTICE.md file ([#171], [#179])
- Project editor: Simple description & data usage outside EU ([#172])
- Imprint page ([#174], [#177])

### Changed

- Rename "Study" to "Project" ([#166])
- Data Explorer: Hide determine hits & customize features ([#170])
- User friendly terms ([#173])
- Updated initiative logos ([#175])

### Fixed

- Project Editor: Not saving due to cohort save error ([#167], [#169])
- Phenotype Overview table: Show description and information about phenotype ([#176])
- Data Explorer: Owner can access own projects again ([#178])

## [0.5.0] - 2021-03-24

### Added

- Welcome page: Navigation links ([#155])
- Welcome page: Dashboard metrics ([#161])
- Welcome page: List of latest projects ([#162])

### Changed

- Data Explorer: Show studies where current user is the coordinator ([#150])
- New Logo ([#158])
- Approved Users Table: Include email address to search filter ([#159])
- Footer: Remove version number ([#160])
- Footer: Update copyright notice ([#160])
- Header: Remove contact button ([#160])

### Fixed

- Word wrapping in tables with long names ([#149])
- Study-Editor: Lazy loading of cohorts ([#151])
- Study-Editor: Search for phenotypes and by author ([#152])
- Study-Editor: List of researchers empty if one has no role ([#153])
- Study Overview table: Allow specific actions on for owners ([#154])
- Study-Editor: Permit approval request for studies without phenotype ([#156])

## [0.4.0] - 2021-03-16

- No changes

## [0.3.0] - 2021-03-15

### Added

- Data Explorer - Export result to CSV ([#130], [#132], [#133])
- Content manager - Edit dashboard cards ([#140])
- Organization Manager - Filter users ([#141])
- Dashboard ([#143], [#145])

### Changed

- Cohort editor - Show result count or error message ([#131])
- General data transfer - Handle network errors during filtering ([#134])
- Welcome Page - Header image ([#135], [#138])
- Organization manager - Only allow organization and super admins to manage users ([#137])
- Localization files bundled into build output ([#139])
- Phenotype editor - Use dedicated endpoint to fetch only one single phenotype ([#144])

### Fixes

- Study Editor - Save researchers does not show feedback and does not redurect after save ([#142])

### Security

- Dependency Update Angular from 11.1.1 to 11.2.3 ([#136])
- Dependency Update lodash-es from 4.17.20 to 4.17.21 ([#136])
- Dependency Update rxjs from 6.6.3 to 6.6.6 ([#136])

## [0.2.0] - 2021-03-01

### Added

- Organzation manager - Create and edit Organizations with Organizations Editor ([#125])

## [0.1.0] - 2021-02-25

### Added

- Basic app structure and layout ([#2])
- Localization ([#3], [#99])
- Authorize Users with Keycloak ([#4], [#19], [#76], [#102], [#107])
- CircleCI Pipeline ([#6], [#121])
- Table of AQL queries ([#13], [#73], [#84])
- Table of Phenotypes ([#14])
- Cohort size exedcution ([#15])
- Show content depending on users' role ([#20])
- Phenotype editor ([#21], [#108])
- Studies Overview ([#22], [#23], [#66], [#67], [#74], [#77])
- Studies Editor ([#24], [#26], [#34], [#36], [#37], [#39], [#44], [#58], [#61], [#62], [#64], [#120])
- Table of unapproved users ([#25], [#29], [#33], [#35], [#40], [#43], [#54], [#57], [#70])
- AQL editor ([#41], [#42], [#46], [#47], [#48], [#49], [#50], [#51], [#52], [#55], [#56], [#59], [#68], [#69], [#71], [#86], [#88], [#89], [#92], [#94], [#97], [#98], [#100], [#101], [#103])
- AQL Editor - Validate AQL ([#109])
- Table of approved users ([#72], [#123])
- Edit Comments of a Study ([#75])
- Edit Cohorts of a Study ([81])
- Approve Studies dialog ([#82], [91])
- Data Explorer - Show published studies ([#83], [#85], [#87], [#106])
- Data Explorer - Table of results ([#105], [#113])
- App logo ([#90])
- Toast messages for user feedback ([#96])
- Content Editor - Edit menu items ([#115], [#119])
- Organization manager - Organizations table ([#117], [#122])

### Security

- Angular v11.1.1 ([#95])

---

<!-- Links -->

[keep a changelog]: https://keepachangelog.com/
[semantic versioning]: https://semver.org/

<!-- Versions -->

[unreleased]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/compare/v1.4.0...HEAD
[released]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/tree/master
[1.4.0]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/compare/v1.3.0..v1.4.0
[1.3.0]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/compare/v1.2.0..v1.3.0
[1.2.0]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/compare/v1.1.0..v1.2.0
[1.1.0]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/compare/8ad602c9bbe0e6c5b535ebdbd6cc86370e863f34..v1.1.0
[1.0.0]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/compare/2dc040e5eb792bfffb5959172fe8b40b2ee2f739..8ad602c9bbe0e6c5b535ebdbd6cc86370e863f34
[0.5.0]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/compare/94ba3f799407ffb395d80969d2ab6a7cc40cd05f..2dc040e5eb792bfffb5959172fe8b40b2ee2f739
[0.4.0]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/compare/25e7400b55c60a70735ca778416f596650a62f55..94ba3f799407ffb395d80969d2ab6a7cc40cd05f
[0.3.0]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/compare/911d755ec2764d551939d74abca6ffb17652ab53..25e7400b55c60a70735ca778416f596650a62f55
[0.2.0]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/compare/e6babad91dbeb562803ad3a1ec6afa1726e0c09a..911d755ec2764d551939d74abca6ffb17652ab53
[0.1.0]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/compare/137548301f9143282686503e915163dfffe03090..e6babad91dbeb562803ad3a1ec6afa1726e0c09a

<!-- PRs  -->

[#1]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/1
[#2]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/2
[#3]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/3
[#4]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/4
[#5]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/5
[#6]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/6
[#7]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/7
[#8]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/8
[#9]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/9
[#10]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/10
[#11]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/11
[#12]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/12
[#13]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/13
[#14]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/14
[#15]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/15
[#16]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/16
[#17]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/17
[#18]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/18
[#19]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/19
[#20]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/20
[#21]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/21
[#22]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/22
[#23]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/23
[#24]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/24
[#25]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/25
[#26]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/26
[#27]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/27
[#28]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/28
[#29]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/29
[#30]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/30
[#31]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/31
[#32]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/32
[#33]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/33
[#34]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/34
[#35]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/35
[#36]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/36
[#37]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/37
[#39]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/39
[#40]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/40
[#41]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/41
[#42]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/42
[#43]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/43
[#44]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/44
[#45]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/45
[#46]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/46
[#47]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/47
[#48]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/48
[#49]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/49
[#50]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/50
[#51]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/51
[#52]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/52
[#53]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/53
[#54]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/54
[#55]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/55
[#56]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/56
[#57]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/57
[#58]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/58
[#59]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/59
[#60]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/60
[#61]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/61
[#62]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/62
[#63]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/63
[#64]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/64
[#65]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/65
[#66]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/66
[#67]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/67
[#68]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/68
[#69]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/69
[#70]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/70
[#71]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/71
[#72]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/72
[#73]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/73
[#74]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/74
[#75]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/75
[#76]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/76
[#77]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/77
[#78]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/78
[#79]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/79
[#80]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/80
[#81]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/81
[#82]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/82
[#83]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/83
[#84]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/84
[#85]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/85
[#86]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/86
[#87]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/87
[#88]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/88
[#89]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/89
[#90]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/90
[#91]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/91
[#92]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/92
[#93]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/93
[#94]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/94
[#95]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/95
[#96]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/96
[#97]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/97
[#98]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/98
[#99]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/99
[#100]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/100
[#101]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/101
[#102]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/102
[#103]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/103
[#104]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/104
[#105]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/105
[#106]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/106
[#107]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/107
[#108]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/108
[#109]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/109
[#110]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/110
[#111]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/111
[#112]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/112
[#113]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/113
[#114]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/114
[#115]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/115
[#116]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/116
[#117]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/117
[#118]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/118
[#119]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/119
[#120]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/120
[#121]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/121
[#122]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/122
[#123]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/123
[#124]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/124
[#125]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/125
[#126]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/126
[#127]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/127
[#128]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/128
[#129]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/129
[#130]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/130
[#131]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/131
[#132]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/132
[#133]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/133
[#134]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/134
[#135]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/135
[#136]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/136
[#137]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/137
[#138]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/138
[#139]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/139
[#140]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/140
[#141]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/141
[#142]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/142
[#143]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/143
[#144]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/144
[#145]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/145
[#146]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/146
[#147]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/147
[#148]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/148
[#149]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/149
[#150]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/150
[#151]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/151
[#152]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/152
[#153]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/153
[#154]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/154
[#155]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/155
[#156]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/156
[#157]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/157
[#158]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/158
[#159]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/159
[#160]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/160
[#161]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/161
[#162]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/162
[#163]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/163
[#164]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/164
[#165]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/165
[#166]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/166
[#167]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/167
[#168]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/168
[#169]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/169
[#170]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/170
[#171]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/171
[#172]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/172
[#173]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/173
[#174]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/174
[#175]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/175
[#176]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/176
[#177]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/177
[#178]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/178
[#179]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/179
[#180]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/180
[#181]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/181
[#182]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/182
[#183]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/183
[#184]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/184
[#185]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/185
[#186]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/186
[#187]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/187
[#188]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/188
[#189]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/189
[#190]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/190
[#191]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/191
[#192]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/192
[#193]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/193
[#194]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/194
[#195]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/195
[#196]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/196
[#197]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/197
[#198]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/198
[#199]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/199
[#200]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/200
[#201]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/201
[#202]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/202
[#203]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/203
[#204]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/204
[#205]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/205
[#206]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/206
[#207]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/207
[#208]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/208
[#209]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/209
[#210]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/210
[#211]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/211
[#212]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/212
[#213]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/213
[#214]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/214
[#215]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/215
[#216]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/216
[#217]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/217
[#218]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/218
[#219]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/219
[#220]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/220
[#221]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/221
[#222]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/222
[#223]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/223
[#224]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/224
[#227]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/227
[#228]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/228
[#229]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/229
[#230]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/230
[#233]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/233
[#234]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/234
[#235]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/235
[#238]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/238
[#239]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/239
[#240]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/240
[#241]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/241
[#242]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/242
[#243]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/243
[#245]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/245
[#246]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/246
[#247]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/247
[#248]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/248
[#251]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/251
[#256]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/256
[#257]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/257
[#258]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/258
[#259]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/259
[#260]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/260
[#261]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/261
[#262]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/262
[#263]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/263
[#264]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/264
[#265]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/265
[#266]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/266
[#267]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/267
[#268]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/268
[#269]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/269
[#270]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/270
[#271]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/271
[#272]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/272
[#273]: https://github.com/NUM-Forschungsdatenplattform/num-portal-webapp/pull/273
