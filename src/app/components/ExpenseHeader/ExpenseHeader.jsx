import Balance from "./Balance";
import PropTypes from "prop-types";
import IncomeTab from "./IncomeTab";
import ExpenseTab from "./ExpenseTab";

const ExpenseHeader = ({ histories }) => {
  return (
    <>
      <Balance histories={histories} />
      <div className="d-flex justify-content-center border border-1 py-3 bg-white shadow">
        <IncomeTab histories={histories} />
        <ExpenseTab histories={histories} />
      </div>
    </>
  );
};

ExpenseHeader.prototype = {
  history: PropTypes.array,
};

export default ExpenseHeader;
