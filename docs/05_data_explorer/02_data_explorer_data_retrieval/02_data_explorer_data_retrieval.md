# Data retrieval

This section covers the data retrieval page of the data explorer feature.

##### Data retrieval
The data retrieval page is divided into three areas:

1. Project summary: here you have complete insight into the configuration of the project. All information is read-only. You can expand and collapse the individual areas.
2. Data retrieval: in this section you can start the complete data retrieval. You also have the option of limiting the data retrieval using filters. Start the entire data retrieval by clicking on *Retrieve data* button.
3. Result set: after the data retrieval has been started, the available data sets are displayed in this section.


```{figure} images/data_retrieval_details.jpg
---
alt: Screenshot of detailed data retrieval
---
Fig 05-02-01: Data retrieval
```

##### Result set

At data retrieval the result set is displayed based on the configurations specified in the project.

In the standard configuration, the complete result set is produced as table(s). The output result set is based on the return parameters as defined in the project as a basis.

In addition, you have the option of a user-defined configuration. You can customize the configuration of the data query as part of the defined return parameters. To access this function, click on *Filter data* button. Please note that setting filters can result in unwanted cross products.

##### Representation of the result set

The result set is presented as a table. A separate table is generated for each return parameter defined in the project.

The table structure is as follows:
1. Rows: the results of the cohort specified in the project, i.e. the patient filter, are displayed in rows. Each available record makes up one row.
2. Columns: the columns represent the data filter and contain all parameters for which information is available in the respective data record.


```{figure} images/data_retrieval_results.jpg
---
alt: Screenshot of data retrieval results
---
Fig 05-02-02: Data retrieval results
```


##### Export of the result set

You can export the entire displayed result as either a CSV file or a JSON file. A separate file is created for each return parameter.
