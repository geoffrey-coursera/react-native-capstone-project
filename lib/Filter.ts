export { reduceFilters, Filter }

type Filter = Definition & { predicate: () => boolean };
type Definition = { where: string, params: string[] };

const reduceFilters = (conditions: Filter[]): Definition =>
    conditions
        .filter(({ predicate }) => predicate())
        .reduce(concat, empty);

const empty = { where: '', params: [] } satisfies Definition;

const concat = (acc: Definition, { where, params }: Definition): Definition => ({
    where: concatWhere(acc.where, where),
    params: acc.params.concat(params)
})

const concatWhere = (a: string, b: string) => !a ? `where ${b}` : `${a} and ${b}`;