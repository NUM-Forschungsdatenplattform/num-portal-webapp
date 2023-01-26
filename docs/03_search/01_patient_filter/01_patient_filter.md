# Patient Filter

This section covers the Patient filter feature of the Search module.

With the patient filter you define the desired cohort by selecting and combining criteria. The available criteria are categorized thematically and can be combined as desired using logical operators: AND, OR and NOT.

Once you have defined your cohort, you can go to the [Data filter](../02_data_filter/02_data_filter.md) step by clicking on *Next Step* button above the footer of the page.

There are three main areas in the patient filter:

1. The criteria list: a list of categorized criteria used to build a cohort
2. The cohort builder: criteria can be combined here using logical operators to build the cohort
3. The patients display: display of the expected number of patients in the data sets based on the combined criteria


```{figure} images/patient_filter.jpg
---
alt: Screenshot of patient filter
---
Fig 03-01-01: Patient filter
```

#### 1. Criteria list
The various criteria are divided into categories, these can be expanded and collapsed. Detailed information on each individual criterion can be obtained by clicking on the *i* symbol.

To use a criterion and add it to the cohort builder, click it's plus icon. The criterion is then inserted directly into the cohort builder in the active (red bordered) group.

```{figure} images/search_criteria_list.png
---
alt: Screenshot of patient filter criteria list
---
Fig 03-01-02: Criteria list
```

After clicking on the *i* symbol of a criterion, a dialog window opens, from which you can find more detailed information about the criterion. The top section provides information about the title, author, purpose, and how the criterion is used. In the lower area you can see how the actual aql query is written in the Archetype Query Language (AQL).


```{figure} images/search_criteria_details.jpg
---
alt: Screenshot of criteria details dialog
---
Fig 03-01-03: Criteria detail view
```

#### 2. Cohort builder

In the cohort builder, the criteria are inserted in the order you selected/clicked them from the list.

You have the following options for forming a cohort:

1. Groupings: by default, a main group is created in the cohort builder, you can either insert criteria directly (loosely) into this or create subgroups. In order for a criterion to be inserted into a group, it must be activated. To do this, you need to select the tick in the top left corner of the group. A selected group is marked with a red border; the unselected groups are outlined in light gray. You can also delete groups, but it should be noted that the criteria contained in them will then also be removed.
2. Operators: you can set conditions using "AND" and "OR" operators. Operators can be applied directly to groups and within groups/subgroups to the criteria. "AND" is set by default as soon as two and more criteria or groups of criteria have been inserted in the cohort builder.
3. Negation: using the negate button, the conditions of criteria can be negated within a group or between entire groups.


```{figure} images/search_cohort_builder_one_group.jpg
---
alt: Screenshot of criteria in a main group
---
Fig 03-01-04: Cohort builder with criteria in a main group
```

```{figure} images/search_cohort_builder_two_groups.jpg
---
alt: Screenshot of criteria in two subgroups
---
Fig 03-01-05: Cohort builder with criteria in two subgroups
```


###### Structure of the criterion elements

The criterion elements can differ in structure, scope and the type of information required.

1. Status
   1. Green: all parameters have been filled in
   2. Grey: some parameters need to be filled in
2. Name of the parameter
3. Operator for the current parameter value
4. Parameter value, there are three field types for the parameter value:
   1. Free text input field: the necessary unit of the value can be in the field name.
   2. Dropdown list with predefined values
   3. Date field with calendar datepicker
5. Check box:
   1. Selected: a parameter value must be entered/selected so that the criterion for the cohort is defined.
   2. Deselected: no parameter value can be entered/selected. As a result, all data sets in which information was provided on the respective criteria are included in the cohort - regardless of the value.


```{figure} images/patient_filter_criteria_elements.jpg
---
alt: Screenshot of criteria elements
---
Fig 03-01-06: Cohort builder with criteria elements
```

```{note}
There are also criteria that do not require the entry of parameters, these can be used directly.
```


#### 3. Patients display

This area shows the number of patients in the entire dataset resulting from the configuration of the cohort. To retrieve the patients, you must click the *Retrieve* button. The number of patients is then displayed. Depending on the authorization and if the data is available, the patients are also displayed in a graphical representation.

```{note}
If you make changes to the cohort in the cohort builder, you need to press "Retrieve" each time for an accurate patients count.
```

```{important}
Due to data privacy reasons, only users inheriting the "Manager" role are able to see the exact number of patients. Users without this role will always see a slightly rounded number.
```

```{figure} images/patient_filter_criteria_elements.jpg
---
alt: Screenshot of cohort hits and diagrams
---
Fig 03-01-07: Cohort builder data hits and data diagrams
```



