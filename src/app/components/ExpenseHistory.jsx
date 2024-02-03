"use client";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import ExpenseItem from "./ExpenseItem";

const ExpenseHistory = ({ histories, setHistories }) => {
  const removeTransaction = (transaction) => {
    let updatedHistories = histories.filter(
      (tran) => tran.title !== transaction.title
    );
    setHistories([...updatedHistories]);
    toast.success(`Transaction '${transaction.title}' removed.`);
  };

  return (
    <div>
      <span className="fw-400">History</span>
      <hr />
      {histories.map((transaction) => (
        <ExpenseItem
          key={transaction.title}
          transaction={transaction}
          removeTransaction={removeTransaction}
        />
      ))}
    </div>
  );
};

ExpenseHistory.prototype = {
  histories: PropTypes.any,
  setHistories: PropTypes.func,
};

export default ExpenseHistory;
