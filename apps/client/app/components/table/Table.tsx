import { Table as TableInstance, flexRender } from "@tanstack/react-table";
import {
  Table as MantineTable,
  TableThead,
  TableTr,
  TableTbody,
  TableTfoot,
  TableTh,
  TableTd,
} from "@mantine/core";
import tableClasses from "./Table.module.css";

export type TableProps<TData> = {
  table: TableInstance<TData>;
};

export const Table = <TData,>({ table }: TableProps<TData>) => {
  return (
    <MantineTable>
      <TableThead>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableTr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <TableTh key={header.id} colSpan={header.colSpan}>
                {header.isPlaceholder
                  ? null
                  : flexRender(header.column.columnDef.header, header.getContext())}
              </TableTh>
            ))}
          </TableTr>
        ))}
      </TableThead>
      <TableTbody>
        {table.getRowModel().rows.map((row) => (
          <TableTr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <TableTd key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableTd>
            ))}
          </TableTr>
        ))}
      </TableTbody>
      <TableTfoot className="">
        {table.getFooterGroups().map((footerGroup) => (
          <TableTr key={footerGroup.id}>
            {footerGroup.headers.map((header) => (
              <TableTh key={header.id} colSpan={header.colSpan}>
                {header.isPlaceholder
                  ? null
                  : flexRender(header.column.columnDef.footer, header.getContext())}
              </TableTh>
            ))}
          </TableTr>
        ))}
      </TableTfoot>
    </MantineTable>
  );
};
