"use client"

import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { ProgressBar } from "primereact/progressbar";

const Grid = ({
  rows,
  columns,
  layouts,
  selectedRow,
  setRowSelected,
  isLoading,
  scrollHeight,
  minWidth = "100%"
}) => {
  return (
    <div className="d-flex flex-column">
      <DataTable
        value={rows}
        className="shadow"
        selectionMode="single"
        selection={selectedRow}
        stripedRows
        onSelectionChange={(e) => setRowSelected(e.value)}
        scrollable
        showGridlines
        scrollHeight={scrollHeight}
        footer={ isLoading ? 'Loading...' : `${rows.length} Item(s)` }
        tableStyle={{ minWidth, background: "#000000", color: "#eeeeee" }}
      >
        {columns.map(({ field, header }, index) => (<Column key={index} field={field} header={header} />))}
      </DataTable>
      {isLoading && (
        <ProgressBar
          mode="indeterminate"
          style={{ height: "6px" }}
        ></ProgressBar>
      )}
    </div>
  );
};

export default Grid;
