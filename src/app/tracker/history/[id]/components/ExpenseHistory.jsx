"use client";

import { useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { Card } from "react-bootstrap";
import ExpenseItem from "./ExpenseItem";
import HeaderBadge from "./HeaderBadge";
import HistoryHeader from "./HistoryHeader";
import { removeHistory } from "../../../../services/history";

const historyBodyStyle = {
  maxHeight: "540px",
  overflowY: "scroll",
  background: "#eeeeee",
}

const ExpenseHistory = ({ histories, setHistories }) => {
  const [sortStatus, setSortStatus] = useState();
  const incomeQuantity = histories.filter(({ type }) => type === "income").length;
  const expenseQuantity = histories.filter(({ type }) => type === "expense").length;

  // remove transaction history from histories
  const removeTransaction = async (transaction) => {
    try {
      // send history to be remove in database
      const response = await removeHistory(transaction._id);
      if (!response.success) return toast.error(response.message);
      toast.success(response.success);
    } catch (err) {
      console.error(`Error trying to remove History`, err.message);
      toast.error(`There's an issue removing history`);
      return;
    }
  };

  function sortHistories(sortType) {
    let updatedHistories;
    if (sortType === "asc") updatedHistories = histories.sort((a, b) => String(a.title).localeCompare(b.title));
    if (sortType === 'desc') updatedHistories = histories.sort((a, b) => String(b.title).localeCompare(a.title));
    setHistories(updatedHistories);
  }

  return (
    <Card className="shadow border rounded">
      <Card.Header className="p-3">
        <div className="d-flex justify-content-between">
          <HistoryHeader
            sortStatus={sortStatus}
            setSortStatus={setSortStatus}
            sortHistories={sortHistories}
          />
          <HeaderBadge
            incomeQuantity={incomeQuantity}
            expenseQuantity={expenseQuantity}
          />
        </div>
      </Card.Header>
      <Card.Body style={historyBodyStyle}>
        {histories.length === 0 && <span>No transaction histories.</span>}
        {histories.length > 0 &&
          histories.map((transaction) => (
            <ExpenseItem
              key={transaction.title}
              transaction={transaction}
              removeTransaction={removeTransaction}
            />
          ))}
      </Card.Body>
    </Card>
  );
};

ExpenseHistory.prototype = {
  histories: PropTypes.any,
  setHistories: PropTypes.func,
};

export default ExpenseHistory;
