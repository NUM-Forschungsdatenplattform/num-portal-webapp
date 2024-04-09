# NumPortalWebapp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.1.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `npm run test` to execute the unit tests via [Jest](https://jestjs.io/).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Documentation

The documentation for the end user has been created for deployment on 
[Read the Docs](https://readthedocs.org/) and uses [Sphinx](https://www.sphinx-doc.org/) for
building the output manuals (HTML, PDF, EPUB).

You can find the user documentation at 
<a href="https://num-portal-webapp.readthedocs.io/" target="_blank" rel="noopener">
https://num-portal-webapp.readthedocs.io/</a>.

If you want to help with the documentation you can find the doc sources at folder `/doc` inside this
repository.

### Documentation workflow

#### I. Add your content:

You can use Markdown syntax inside `.md` files or reStructuredText syntax inside `.rst` files.

If you add new files to a section do not forget to add them into the corresponding index file with
a `toc::` directive.

The base documentation language is English. You or someone else can add translated content in later
steps.

#### II. Update translations

![Diagram showing the workflow of updating and generating localozed content for Sphinx documentaions](https://www.sphinx-doc.org/en/master/_images/translation.svg "Sphinx translation workflow")

Sphinx uses a special procedure to generate the translated content. First use this script to 
extract the required message catalogue `pot` file:

```bash
$ npm run docs:extract-messages
```

This will go through all `.md` and `.rst` files and looks for new text strings that might need
a translation. The output of this command will be created within `docs/_gettext`.

Then upda the translation `.po` files inside the `docs/locales/` by using this script:

```bash
$ npm run docs:update-po
```

You can also execute both commands with one by using the following script:

```bash
$ npm run docs:update-l10n
```

To translate the messages created with your content, go into the folder `docs/locales/` with your
target language and locate the folder named similar to your source file you worked on.

Inside these files you will always find a meta data header which you can ignore. Below that there
are multiple entries where you can add your translations.

This is an example with a one-line translation:

```pot
#: ../01_create_user/01_create_user.md:1 b5e9052d813c4e89947a9e368cddccdf
msgid "Create User"
msgstr "Benutzer anlegen"
```

The first line  marks the position at the source `.md` or `.rst` file in addition to the uuid of
this occurrence.
The second line is a uniquie id for this translation string which is the same at all translation
files. The value of this id will be used in case that there is no translation value provided.
The third line labeled with `msgstr` contains the string that is in the target language abd will
be used in the target translated documentation.

If the `msgid` and `msgstr` values are too long for one line you can also leave the value empty
at the line of the key and start in a new line. Please be aware of reStructuredText or MarkDown
directives that might work no longer if you break the lines.

```pot
#: ../01_create_user/01_create_user.md:84 e3be248a709e44069d28492dfee8d77e
msgid ""
"You can only log in and log out unless your account gets approved. If you"
" want to see how to approve user accounts go to the section  [User "
"management -> Unapproved "
"users](../07_user_management/01_unapproved_users/01_unapproved_users.md)"
msgstr ""
"Sie können sich nur an- und wieder abmelden solange Ihr Benutzerkonto "
"noch nicht freigegeben wurde. Wenn Sie wissen wollen, wie Sie "
"Benutzerkonten freigeben können, gehen Sie zum Abschnitt "
"[Benutzerverwaltung -> Neue Benutzer](../07_user_management/01_unapproved_users/01_unapproved_users.md) "
"dieses Handbuchs."
```




## License

Copyright 2024 Highmed e.V.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
