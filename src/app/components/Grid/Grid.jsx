import React, { useState } from "react";
import { Card, Col, ListGroup, ListGroupItem, Row } from "react-bootstrap";
import styled from "styled-components";
import GridRow from "./GridRow";

const GridContainer = styled.div`
  .card-body {
    .list-group {
      max-height: 350px;
      overflow-y: scroll;

      .row {
        padding: 0;
        margin: 0;

        .selected {
          background: #aaaaaa;
          color: #ffffff;
        }

        .col-12 {
          padding: 0;
          cursor: pointer;

          &:hover {
            background: #aaaaaa;
            color: #ffffff;
          }

          .px-0 {
            .list-group-item {
              background: inherit;
              color: inherit;
            }
          }
        }
      }
    }
  }
`;

const Grid = ({ rows, columns, layouts, selectedRow, setRowSelected }) => {

  return (
    <GridContainer className="card shadow">
      <Card.Header className="bg-dark text-light">
        <Row>
          {columns.map((column, index) => (
            <Col key={index} xs={layouts[index]}>
              {column["heading"]}
            </Col>
          ))}
        </Row>
      </Card.Header>
      <Card.Body className="p-0 w-100">
        <ListGroup className="w-100">
          <Row>
            {rows.map((row) => (
              <GridRow
                key={row[columns[0]['field']]}
                row={row}
                columns={columns}
                layouts={layouts}
                selected={selectedRow}
                setSelected={setRowSelected}
              />
            ))}
          </Row>
        </ListGroup>
      </Card.Body>
      <Card.Footer>
        <Row>
          <Col xs={12}>
            <div className="d-flex justify-content-center">
            {rows.length} (Items)
            </div>
          </Col>
        </Row>
      </Card.Footer>
    </GridContainer>
  );
};

export default Grid;
