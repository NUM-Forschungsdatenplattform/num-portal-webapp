/**
 * The different Nodetypes identified by their common field **'_type'**
 */
export enum AqbNodeType {
  Containment = 'Containment',
  LogicalOperator = 'LogicalOperator',
  SelectField = 'SelectField',
  ComparisonOperator = 'ComparisonOperator',
  ParameterValue = 'Parameter',
  SimpleValue = 'Simple',
}
