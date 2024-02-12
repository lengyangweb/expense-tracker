"use client";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import ExpenseItem from "./ExpenseItems/ExpenseItem";
import { Card } from "react-bootstrap";
import HeaderBadge from "./ExpenseHeader/HeaderBadge";
import { removeHistory } from "../lib/apis/histories";

const ExpenseHistory = ({ histories, setHistories }) => {
  const incomeQuantity = histories.filter(
    ({ income }) => income === true
  ).length;
  const expenseQuantity = histories.filter(
    ({ income }) => income === false
  ).length;

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

  return (
    <Card className="shadow border rounded">
      <Card.Header className="p-3">
        <div className="d-flex justify-content-between">
          <span>History</span>
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
