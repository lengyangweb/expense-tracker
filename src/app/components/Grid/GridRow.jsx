"use client";
import React, { useMemo, useState } from "react";
import { Col, ListGroupItem, Row } from "react-bootstrap";

const GridRow = ({ row, columns, layouts, selected, setSelected }) => {
  const [isSelected, setIsSelected] = useState(false);

  useMemo(() => {
    if (selected && selected[columns[0]["field"]] == row[columns[0]["field"]]) {
      return setIsSelected(true);
    }
    if (selected && selected[columns[0]["field"]] !== row[columns[0]["field"]]) {
      return setIsSelected(false);
    }
  }, [selected]);

  function handleRowSelection() {
    if (isSelected && selected && selected[columns[0]["field"]] === row[columns[0]["field"]]) {
      setIsSelected(false);
      setSelected(undefined);
      return;
    }
    setSelected(row);
  }

  return (
    <Col
      xs={12}
      onClick={handleRowSelection}
      className={isSelected ? "selected" : ""}
    >
      <Row>
        {columns.map((column, index) => (
          <Col xs={layouts[index]} key={index} className="px-0">
            <ListGroupItem>{row[column["field"]]}</ListGroupItem>
          </Col>
        ))}
      </Row>
    </Col>
  );
};

export default GridRow;
