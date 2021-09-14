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

Sphinx uses a special procedure to generate the translated content. First use this command to create
the translation base `pot` file with all strings that have to be translated.

```bash
$ cd ./docs
$ make gettext
```

Then generate the translation `.po` files inside the `locales/` folder at `/docs`:

```bash
$ sphinx-intl update -p _build/gettext -l de_DE -l en_US
```

These files


## License

Copyright 2021 vitagroup AG

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
