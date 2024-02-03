import PropTypes from "prop-types";
import { FaTrash } from "react-icons/fa";

const ExpenseItem = ({ transaction, removeTransaction }) => {
  return (
    <div className=" col-12 d-flex justify-content-between align-items-center">
      <button
        className="btn btn-danger"
        onClick={() => removeTransaction(transaction)}
      >
        <FaTrash />
      </button>
      <div className="bg-white my-2 p-2 d-flex justify-content-between w-100">
        <span>{transaction.title}</span>
        <span>${transaction.total.toFixed(2)}</span>
      </div>
      <div>
        <span
          className={
            (transaction.income ? "bg-success" : "bg-danger") + " p-1 h-100"
          }
        ></span>
      </div>
    </div>
  );
};

ExpenseItem.prototype = {
  transaction: PropTypes.object,
  removeTransaction: PropTypes.func,
};

export default ExpenseItem;
