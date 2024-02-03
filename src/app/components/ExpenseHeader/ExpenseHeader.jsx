import Balance from "./Balance";
import PropTypes from "prop-types";
import IncomeTab from "./IncomeTab";
import ExpenseTab from "./ExpenseTab";
import { useEffect, useState } from "react";

const ExpenseHeader = ({ histories }) => {
  const [incomes, setIncomes] = useState();
  const [expenses, setExpenses] = useState();
  const [balance, setBalance] = useState();

  useEffect(() => {
    const totalIncome = getIncome();
    const totalExpense = getExpense();

    setIncomes(totalIncome);
    setExpenses(totalExpense);

    // if (incomes) {
    const totalBalance = getBalance(totalIncome, totalExpense);
    setBalance(totalBalance);
    // }
  }, [histories]);

  const getBalance = (totalIncomes, totalExpenses) => {
    if (!totalIncomes && !totalExpenses) return 0.0;
    const totalBalance = totalIncomes - totalExpenses;
    return totalBalance;
  };

  const getIncome = () => {
    const incomes = [];

    histories
      .filter(({ income }) => income === true)
      .forEach(({ total }) => incomes.push(total));

    // calculate the sun of all incomes
    const totalIncome = incomes.reduce((sum = 0, total) => (sum += total));
    return totalIncome;
  };

  const getExpense = () => {
    const expenses = [];

    histories
      .filter((tran) => tran.income === false)
      .forEach(({ total }) => expenses.push(total));

    // calculate the sum of all expenses
    const totalExpense = expenses.reduce((sum = 0, total) => (sum += total));
    return totalExpense;
  };

  // if no income or balance
  if (!incomes || !balance) return;

  return (
    <>
      <Balance balance={balance} />
      {expenses > incomes && (
        <span className="fw-bold text-danger">
          Your expenses is greater than your incomes
        </span>
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
