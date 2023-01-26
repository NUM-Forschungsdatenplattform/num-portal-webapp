# Organizations - Editor

This section covers the editor page of the organization management feature.

The organization editor feature provides functionality to create and update an organization. To create an organization, click on the *organizations editor* tab at the top of the section. Here you can insert a name and click *create organization* to create your new organization. 

```{note}
 Organizations can be created only by users with **Super admin** role. The names of organizations have to be unqiue.
```

```{figure} images/organization_editor.png
---
alt: Screenshot of organization editor
---
Fig 08-02-01: Create organization
```

In order to edit an organization, click on the pen icon on the respective organization in the organization overview list. Organizations can be assigned a list of domain names. At user registration the user will be automatically assigned to the organization to which the registration email matches. You can add domains as well as subdomains to the organization. Subdomains can be entered explicitly or with the wildcard "*". Please see examples in the screenshot.

```{figure} images/organization_editor_subdomains.png
---
alt: Screenshot of organization editor with subdomains
---
Fig 08-02-02: Subdomains in Organization editor
```

```{caution}
Be sure to enter all possible domains and subdomains for your organization. Otherwise users may be unable to register and will get an according error message.
```