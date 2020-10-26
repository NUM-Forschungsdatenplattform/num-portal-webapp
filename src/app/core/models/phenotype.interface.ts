import { IPhenotypeQuery } from './phenotype-query.interface';

export interface IPhenotype {
  id: number;
  name: string;
  description: string;
  query: IPhenotypeQuery;
}
