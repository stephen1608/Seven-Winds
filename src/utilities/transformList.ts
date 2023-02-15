import { RowInterface } from 'types/entityType';

export default function transformList(
  rows: Array<RowInterface>,
  level: number,
  parentId?: number
): Array<RowInterface> {
  const result: Array<RowInterface> = [];

  rows.forEach((row) => {
    const { child, id } = row;

    result.push({ ...row, level, parentId });

    if (child && child.length > 0) {
      result.push(...transformList(child, level + 1, id));
    }
  });

  return result;
}
