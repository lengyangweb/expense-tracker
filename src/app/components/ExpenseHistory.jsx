"use client";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import ExpenseItem from "./ExpenseItems/ExpenseItem";
import { Card } from "react-bootstrap";

const ExpenseHistory = ({ histories, setHistories }) => {
  // remove transaction history from histories
  const removeTransaction = (transaction) => {
    let updatedHistories = histories.filter(
      (tran) => tran.title !== transaction.title
    );
    // update localStorage
    localStorage.setItem("histories", JSON.stringify([...updatedHistories]));
    // update current histories state
    setHistories([...updatedHistories]);
    // show toast
    toast.success(`Transaction has been removed`);
  };

  return (
    <Card className="shadow">
      <Card.Header className="p-3">History</Card.Header>
      <Card.Body
        style={{
          maxHeight: "420px",
          overflowY: "scroll",
          background: "#eeeeee",
        }}
      >
        {histories.map((transaction) => (
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
