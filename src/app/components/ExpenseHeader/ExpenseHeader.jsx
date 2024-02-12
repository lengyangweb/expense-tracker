import Balance from "./Balance";
import PropTypes from "prop-types";
import IncomeTab from "./IncomeTab";
import ExpenseTab from "./ExpenseTab";
import { useEffect, useState } from "react";

const ExpenseHeader = ({ histories }) => {
  const [incomes, setIncomes] = useState(0.0);
  const [expenses, setExpenses] = useState(0.0);
  const [balance, setBalance] = useState(0.0);

  useEffect(() => {
    const totalIncome = getIncome();
    const totalExpense = getExpense();

    setIncomes(totalIncome);
    setExpenses(totalExpense);

    // get total balance
    const totalBalance = getBalance(totalIncome, totalExpense);
    setBalance(totalBalance);
  }, [histories]);

  /**
   * Get total balance
   * @param {number} totalIncomes
   * @param {number} totalExpenses
   * @returns
   */
  const getBalance = (totalIncomes, totalExpenses) => {
    // if there's no income or expense enter
    if (!totalIncomes && !totalExpenses) return 0.0;
    // subtract the income amount by expense amount to get the remaining income
    const totalBalance = totalIncomes - totalExpenses;
    // return total remaining income
    return totalBalance;
  };

  /**
   * Get current income
   * @returns {number}
   */
  const getIncome = () => {
    const incomes = [];

    // get all of the income items
    histories
      .filter(({ income }) => income === true)
      .forEach(({ total }) => incomes.push(total));
    // if no income items
    if (!incomes.length) return 0.0;
    // calculate the sun of all incomes
    const totalIncome = incomes.reduce((sum = 0, total) => (sum += total));
    return totalIncome;
  };

  /**
   * Get total expense amount
   * @returns {number}
   */
  const getExpense = () => {
    const expenses = [];
    // get all of the expense items
    histories
      .filter((tran) => tran.income === false)
      .forEach(({ total }) => expenses.push(total));
    // if there's no expense items
    if (!expenses.length) return 0.0;
    // calculate the sum of all expenses
    const totalExpense = expenses.reduce((sum = 0, total) => (sum += total));
    // return the total expense amount
    return totalExpense;
  };

  return (
    <>
      <Balance balance={balance} />
      {expenses > incomes && (
        <small className="fw-bold text-danger">
          Your expenses is greater than your incomes
        </small>
      )}
      <div className="d-flex justify-content-center border border-1 py-3 bg-white shadow">
        <IncomeTab incomes={incomes} />
        <ExpenseTab expenses={expenses} />
      </div>
    </>
  );
};

ExpenseHeader.prototype = {
  history: PropTypes.array,
};

export default ExpenseHeader;
