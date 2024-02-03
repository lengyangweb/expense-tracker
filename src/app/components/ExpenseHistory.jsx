"use client";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import ExpenseItem from "./ExpenseItem";

const ExpenseHistory = ({ histories, setHistories, selected, setSelected }) => {
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
    <div>
      <span className="fw-400">History</span>
      <hr />
      {histories.map((transaction) => (
        <ExpenseItem
          key={transaction.title}
          transaction={transaction}
          removeTransaction={removeTransaction}
          selected={selected}
          setSelected={setSelected}
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
