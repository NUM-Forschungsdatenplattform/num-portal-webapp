# Glossary

```{glossary}


AQL : AQL
  A special query language inspired by SQL to get data from an {term}`openEHR` like system. Can be
  used on all {term}`openEHR` systems to get data from stored {term}`EHRs<EHR>`.


Cohort : Cohort
  A combination and parametrized selection of {term}`Criteria` to restrict data output to a subset
  of {term}`EHRs<EHR>`, e.g. "Vaccinated persons over the age of 18" or "All female persons over the age of 60".


Content Admin : Content Admin
  A role of users that is allowed to add, modify and delete content to the Info Board and the 
  Navigation menu section.


Criteria : Criteria
  A special description in {term}`AQL` syntax that describes a filter criteria to extract a sub set
  of data.


EHR : EHR
  Electronic health record. A data record that is connected to a person and collects all treatments
  and measurements during a specific period of time, e.g. duration of a clinical stay of the 
  person.


NUM : NUM
  Netzwerk Universitätsmedizin. A collaboration of clinics in Germany that work together in several
  specific medical applications. In case of RDP the goal is to implement a data exchange
  platform for researchers on big data sets.


openEHR : openEHR
  Open international standard to store data together with the semantic information on how data has
  to be interpreted.

  See [openEHR project website](https://www.openehr.org) for more information.


Project : Project
  A project contains the meta and control data to stear research on a specific topic and subset
  of data extracted from the data pool. 

  It contains the {term}`Cohort` definition as well as general information like the purpose,
  hypothesis or period of time the project is intended to run.

  For the data retrieval and work on the data all {term}`Return Parameters` are as well defined as
  the {term}`Researcher` who works with the data.


Researcher : Researcher
  A natural person that works inside a project on the data and is allowed to retrieve the data. A
  researcher can only see the data assigned to a project.


Return Parameters : Return Parameters
  The clinical models that are used in a data retrieval. These models are usually defined in an
  {term}`openEHR` template.


```
