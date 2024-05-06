/**
 * The different Nodetypes identified by their common field **'_type'**
 */
export enum AqbNodeType {
  Containment = 'Containment',
  LogicalOperator = 'LogicalOperator',
  SelectField = 'SelectField',
  SelectExpression = 'SelectExpression',
  ComparisonOperator = 'ComparisonOperator',
  ParameterValue = 'QueryParameter',
  SimpleValue = 'Simple',
  IdentifiedPath = 'IdentifiedPath',
}
