import { CSSProperties, useState } from 'react';

import ArrowDownIcon from '@/icons/arrow-down.svg';
import ArrowRightIcon from '@/icons/arrow-right.svg';

import './Table.css';

type WithId = {
  id: string;
};

type Data<T extends string> = {
  [key in T]: string | number;
};

type Props<T extends string, K extends string> = {
  columns: T[];
  rows: (Data<T> & WithId)[];
  extend?: boolean;
  extendedColumns?: K[];
  extendedRows?: (Data<K> & WithId)[];
  width?: string | number;
  style?: CSSProperties;
};

const EmptyColumn = () => <td></td>;

const Table = <T extends string, K extends string>({
  rows,
  columns,
  extend,
  extendedColumns,
  extendedRows,
  width,
  style,
}: Props<T, K>) => {
  const [expandedRows, setExpandedRows] = useState<(Data<K> & WithId)[]>([]);

  const isExpanded = (id: string) => expandedRows.find((row) => row.id === id);

  const getExpandedRowData = (id: string) => {
    const row = isExpanded(id);

    if (!row) {
      return null;
    }

    if (!extendedRows || !extendedColumns) {
      return null;
    }

    return (
      <>
        <tr>
          <EmptyColumn />
          {extendedColumns.map((column) => (
            <td className="extended-row-head" key={column}>
              {column.toUpperCase()}
            </td>
          ))}
        </tr>
        <tr>
          <EmptyColumn />
          {(Object.keys(row) as K[])
            .filter((r) => r !== 'id')
            .map((key, i) => (
              <td key={row[key] + i.toString()}>{row[key]}</td>
            ))}
        </tr>
      </>
    );
  };

  const handleExtendRow = (id: string) => {
    setExpandedRows((prev) =>
      prev.map((r) => r.id).includes(id)
        ? prev.filter((r) => r.id !== id)
        : [...prev, extendedRows?.find((r) => r.id === id) as Data<K> & WithId]
    );
  };

  return (
    <table
      width={width}
      style={{ tableLayout: extend ? 'initial' : 'fixed', ...style }}
    >
      <thead>
        <tr>
          {extend && (
            <th>
              <EmptyColumn />
            </th>
          )}

          {columns.map((column) => (
            <th key={column}>{column.toUpperCase()}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, index) => (
          <>
            <tr key={index}>
              {extend && (
                <td
                  className="extender"
                  onClick={() => handleExtendRow(row.id)}
                >
                  <img
                    src={isExpanded(row.id) ? ArrowDownIcon : ArrowRightIcon}
                    alt="extend-icon"
                  />
                </td>
              )}

              {(Object.keys(row) as T[]).map((key, i) => (
                <td key={row[key] + i.toString()}>{row[key]}</td>
              ))}
            </tr>

            {getExpandedRowData(row.id)}
          </>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
