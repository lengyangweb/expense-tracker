"use client";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import ExpenseItem from "./ExpenseItems/ExpenseItem";

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
    <>
      <span className="fw-400">History</span>
      <hr />
      <div className="px-3" style={{ maxHeight: "420px", overflowY: "scroll" }}>
        {histories.map((transaction) => (
          <ExpenseItem
            key={transaction.title}
            transaction={transaction}
            removeTransaction={removeTransaction}
          />
        ))}
      </div>
    </>
  );
};

ExpenseHistory.prototype = {
  histories: PropTypes.any,
  setHistories: PropTypes.func,
};

export default ExpenseHistory;
