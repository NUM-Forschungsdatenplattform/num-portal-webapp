# Data filter

This section covers the data filter page of the search module.

You get to the data filter if you created the {term}`cohort` in the [Patient filter](../01_patient_filter/01_patient_filter.md) in the previous step and clicked on *Next step* button. With the data filter you can now filter the defined cohort according to specific return parameters based on the GECCO data set.

The size of the defined cohort is displayed above the return parameters area. To select the return parameters, click *Add Parameter*. A dialog window will then open in which you can make your selection. Depending on your authorization, you can then either start a data retrieval or transfer the configuration to a project in a further step.

Depending on your authorization, you have the following additional options and only see the corresponding button:
1. Create project application: this function is only available and visible to project managers.
2. Start data retrieval: this function is only available and visible to managers.

```{figure} images/data_filter.png
---
alt: Screenshot of data filter
---
Fig 03-02-01: Data filter
```


In order to select {term}`return parameters` press *Add return parameter*. In the dialog you can select the desired return parameter(s) from a list. To do this, click on the respective plus symbol. As soon as a parameter is selected, the symbol changes to a tick. If you click the tick again, the symbol changes back to a plus and the return parameter is no longer selected.
Above the list is a search box that you can use to search directly for parameters and narrow the list down accordingly. 

As soon as you have selected one or more return parameters, you can add the parameters to the data filter by clicking on *Apply selection* button. The dialog window then closes automatically.

```{important}
Return parameters are mandatory, in order to continue you must select at least one parameter.
```

```{figure} images/data_filter_return_parameters.png
---
alt: Screenshot of data filter return parameters
---
Fig 03-02-02: Data filter return parameters
```


After you have selected the return parameters, they are displayed in the data filter list. Now you can calculate the number of patients in the data set within the defined cohort for the respective return parameter. To do this, click on *Determine patients*. Each return parameter listed in the table can be removed from the list by clicking on the trash can icon. You can also add further return parameters to the list by clicking on *Add return parameter* button.

```{figure} images/data_filter_determine_patients.png
---
alt: Screenshot of data filter determine patients
---
Fig 03-02-03: patients per return parameter
```

With the return parameters now defined, depending on your role and/or permission in your organization, you can proceed as follows:
1. Create project application: With the role "Project manager" you can now apply all settings that you have made in the patient and data filter directly to a new project. This configuration can also be adjusted in the project itself.
2. Start data retrieval: With the role "Manager" you can start a data retrieval based on the settings in the patient and data filter.


```{figure} images/data_filter_next_steps.png
---
alt: Screenshot of data filter next steps
---
Fig 03-02-04: Data filter next steps
```

