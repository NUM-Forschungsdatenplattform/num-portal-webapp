# Projects Editor

This section covers the projects editor page of the projects module.

The project editor provides functionality to define a project. In order to create a project click *Create project* button in the [Project overview](../01_projects_overview/01_projects_overview.md). Saved projects have *draft* status and can be found in the project overview page.

```{note}
In the *draft* status the project can be previewed, edited or deleted.
```

```{tip}
In edit and preview mode, comments can be added to the project using the comments section at the bottom of the page.
```

There are four main sections of the project definition, these can be individually collapsed and expanded:
1. Cohort definition
2. General information
3. Parameter selection
4. Researchers selection

```{note}
A project can be saved as a draft or directly sent for approval.
```


```{figure} images/project_editor.png
---
alt: Screenshot of project editor
---
Fig 04-02-01: Project editor
```
 

#### 1. Cohort definition
The cohort definition section is the most important section and represents the criteria that is to define the cohort of patients taking part in this project.

In this section all criteria available are displayed in the left pane on categories, these can be individually expanded and collapsed. The criteria can be filtered as well as searched on using the search box.

Detailed information on each individual criterion can be obtained by clicking on the *i* symbol.

To use a criterion and add it to the cohort builder, click it's plus icon. The criterion is then inserted directly into the cohort builder.

The number of hits in the data set within the defined cohort can be calculated at any time during the cohort definition. To do this, click on *Determine* button.

Detailed information on how the search works can be found in the [Search](../../03_search/03_search.md) functionality documentation.


```{figure} images/cohort_definition.png
---
alt: Screenshot of cohort definition
---
Fig 04-02-02: Cohort definition
```


#### 2. General information

The general information section contains information about the project. A list of the available fields can be found in the table below. 


```{figure} images/project_general_information.png
---
alt: Screenshot of project general info
---
Fig 04-02-03: Project general information fields
```


| No  | Field                 | Mandatory |
|-----|-----------------------|-----------|
| 1   | Title                 | Yes       |
| 2   | Description           | Yes       |
| 3   | Goal                  | Yes       |
| 4   | Primary hypothesis    | Yes       |
| 5   | Secondary hypothesis  | No        |
| 6   | Keywords              | No        |
| 7   | Category              | No        |
| 8   | Start date            | Yes       |
| 9   | End date              | Yes       |
| 10  | Financing             | No        |
| 11  | Data protection level | No        |




There are 23 predefined project categories at the moment as listed in the table below.


```{figure} images/project_categories.png
---
alt: Screenshot of project categories
---
Fig 04-02-04: Project categories
```


| No  | Field                                 |
|-----|---------------------------------------|
| 1   | Pediatrics                            |
| 2   | Symptomatology                        |
| 3   | Classification of disease progression |
| 4   | Drug therapies                        |
| 5   | Surgical therapies                    |
| 6   | Treatment plan                        |
| 7   | Alternative therapies                 |
| 8   | Prevention                            |
| 9   | Diagnostic methodology                |
| 10  | Drug side effects                     |
| 11  | Microbiology                          |
| 12  | Pathology                             |
| 13  | Oncology                              |
| 14  | Rare diseases                         |
| 15  | Decision support                      |
| 16  | COVID-19                              |
| 17  | Critical care medicine                |
| 18  | Quality management MII                |
| 19  | Quality management routine care       |
| 20  | Longitudinal study                    |
| 21  | Prospective study                     |
| 22  | Retrospective study                   |
| 23  | Registry                              |



#### 3. Return parameters
Results can be further filtered by selection return parameters. To select the return parameters, click Add Return Parameter button.


```{figure} images/project_parameters.png
---
alt: Screenshot of project parameters
---
Fig 04-02-05: Project return prameters section
```


A dialog window will then open in which you can make your selection. To do this, click on the respective plus symbol. As soon as a parameter is selected, the symbol changes to a tick. If you click the tick again, the symbol changes back to a plus and the return parameter is no longer selected.

Above the list is a search box that you can use to search directly for parameters and narrow down the list accordingly.

As soon as you have selected one or more return parameters, you can add the parameters to the data filter by clicking on "Accept selection". The dialog window then closes automatically.


```{figure} images/project_parameters_selection.png
---
alt: Screenshot of project parameters dialog
---
Fig 04-02-06: Project return prameters dialog
```


After the parameters are selected, hits in the data set within the defined cohorts can be calculated individually per parameter.


```{figure} images/project_parameters_hits.png
---
alt: Screenshot of hits per parameter
---
Fig 04-02-07: Hits per parameter
```


```{important}
Return parameters are mandatory, in order to save this project you must select at least one parameter.
```


#### 3. Researchers 
The last section of the project screen is the researchers section, here researchers can be assigned to the project. By clicking the Add researchers button.


```{figure} images/project_researchers.png
---
alt: Screenshot project researchers
---
Fig 04-02-08: Project researchers
```


A dialog window will then open in which you can make your selection. To do this, click on the respective plus symbol. As soon as a parameter is selected, the symbol changes to a tick. If you click the tick again, the symbol changes back to a plus and the return parameter is no longer selected.


```{figure} images/project_researchers_selection.png
---
alt: Screenshot project researchers dialog
---
Fig 04-02-09: Project researchers dialog
```


```{important}
Researchers are mandatory, in order to save this project you must select at least one researcher.
```




