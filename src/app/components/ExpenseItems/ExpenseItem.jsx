import PropTypes from "prop-types";
import { FaTrash } from "react-icons/fa";
import { useEffect, useState } from "react";
import ExpenseItemDetails from "./ExpenseItemDetails";

const ExpenseItem = ({ transaction, removeTransaction }) => {
  const [indicator, setIndicator] = useState("");
  const [createdStamp, setCreatedStamp] = useState("");

  useEffect(() => {
    const indicatorClass = getIndicatorClass();
    const dateStamp = getCreatedStamp();

    setIndicator(indicatorClass);
    setCreatedStamp(dateStamp);
  }, [transaction]);

  /**
   * Get indicator class to differeciate income and expense
   * @returns
   */
  const getIndicatorClass = () => {
    // indicate whether its an income or expense class
    const indicatorClass = transaction.income ? "bg-success" : "bg-danger";
    // return indicator class
    return indicatorClass;
  };

  /**
   * Get date stamp in a proper formatting
   * @returns {string}
   */
  const getCreatedStamp = () => {
    // init new date
    const date = new Date(transaction.createdAt);
    // set time of date to the creation of this transaction
    const createdDateStamp = date.toDateString();
    // convert time to a readable time stamp
    const createdTimeStamp = date.toLocaleTimeString();
    // generate created stamp
    const createdStamp = `${createdDateStamp} - ${createdTimeStamp}`;
    // return createdStamp
    return createdStamp;
  };
  return (
    <div className="d-flex flex-column">
      <div className=" col-12 d-flex justify-content-between align-items-center">
        <button
          className="btn btn-danger"
          onClick={() => removeTransaction(transaction)}
        >
          <FaTrash />
        </button>
        <ExpenseItemDetails
          title={transaction.title}
          total={transaction.total}
        />
        <div>
          <span className={`${indicator} py-2 px-1 h-100`}></span>
        </div>
      </div>
      <span className="align-self-end" style={{ fontSize: "10px" }}>
        {createdStamp}
      </span>
      <hr />
    </div>
  );
};

ExpenseItem.prototype = {
  transaction: PropTypes.object,
  removeTransaction: PropTypes.func,
};

export default ExpenseItem;
