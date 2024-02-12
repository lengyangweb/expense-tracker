"use client";
import { useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { Card } from "react-bootstrap";
import ExpenseItem from "./ExpenseItems/ExpenseItem";
import HeaderBadge from "./ExpenseHeader/HeaderBadge";
import { removeHistory } from "../lib/apis/histories";
import HistoryHeader from "./HistoryHeader";

const ExpenseHistory = ({ histories, setHistories }) => {
  const [sortStatus, setSortStatus] = useState();
  const incomeQuantity = histories.filter(({ income }) => income === true).length;
  const expenseQuantity = histories.filter(({ income }) => income === false).length;

  // remove transaction history from histories
  const removeTransaction = async (transaction) => {
    try {
      // send history to be remove in database
      const result = await removeHistory(transaction._id);
      if (!result) return;
      // remove history from state
      const updatedHistories = histories.filter(
        (history) => history._id !== transaction._id
      );
      // update current histories state
      setHistories([...updatedHistories]);
      // show toast
      toast.success(`Transaction has been removed`);
    } catch (error) {
      console.error(`Error trying to remove History`, error);
      toast.error(`There's an issue removing history`);
      return;
    }
  };

  function sortHistories(sortType) {
    if (sortType === "asc") {
      const updatedHistories = histories.sort((a, b) => String(a.title).localeCompare(b.title));
      setHistories(updatedHistories);
    }
    if (sortType === 'desc') {
      const updatedHistories = histories.sort((a, b) => String(b.title).localeCompare(a.title));
      setHistories(updatedHistories);
    }
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
      <Card.Body
        style={{
          maxHeight: "540px",
          overflowY: "scroll",
          background: "#eeeeee",
        }}
      >
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
