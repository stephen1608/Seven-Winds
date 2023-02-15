import { RowInterface } from 'types/entityType';

export default function transformList(
  rows: Array<RowInterface>,
  level = 0,
  parentId = 0
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
