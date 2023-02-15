import { RowInterface } from 'types/entityType';

export default function transformList(
  rows: Array<RowInterface>,
  level = 0
): Array<RowInterface> {
  const result: Array<RowInterface> = [];

  rows.forEach((row) => {
    const { child } = row;

    result.push({ ...row, level });

    if (child && child.length > 0) {
      result.push(...transformList(child, level + 1));
    }
  });

  return result;
}
