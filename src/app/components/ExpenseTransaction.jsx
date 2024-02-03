"use client";
import { useState } from "react";
import { toast } from "react-toastify";
import { Button, Form } from "react-bootstrap";

const ExpenseTransaction = ({ histories, setHistories }) => {
  const [title, setTitle] = useState();
  const [total, setTotal] = useState();

  /**
   * Create a new transaction and save to hisotries
   * @returns error if error
   */
  const onSave = () => {
    if (!title || !total)
      return toast.error("Please fill out both text and amount field");

    const kindOfExpense = total.substring(0, 1);
    if (!kindOfExpense.includes("+")) {
      if (!kindOfExpense.includes("-")) {
        return toast.error("Please specify what kind of expense (+, -)");
      }
    }

    // check to see what kind of expense is it
    const newTotal = total.split(kindOfExpense)[1];

    // create new transaction
    const newTransaction = {
      title,
      total: parseFloat(newTotal),
      income: kindOfExpense.includes("+"),
      createdAt: Date.now(),
    };

    // set and update histories
    const updatedHistories = [...histories, newTransaction];
    localStorage.setItem("histories", JSON.stringify([...updatedHistories]));

    // reset fields
    setTotal();
    setTitle();
  };

  return (
    <div className="py-3">
      <span>Add new transaction</span>
      <hr />
      <Form>
        <Form.Group>
          <Form.Label htmlFor="transaction">Text</Form.Label>
          <Form.Control
            type="text"
            id="transaction"
            name="transaction"
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter text..."
          />
        </Form.Group>
        <Form.Group className="my-2">
          <Form.Label htmlFor="amount">
            <span>Amount</span>
            <br />
            <span>(negative - expense, positive - income)</span>
          </Form.Label>
          <Form.Control
            type="text"
            id="amount"
            name="amount"
            onChange={(e) => setTotal(e.target.value)}
          />
        </Form.Group>
        <Button className="w-100 my-2" variant="primary" onClick={onSave}>
          Add Transaction
        </Button>
      </Form>
    </div>
  );
};

export default ExpenseTransaction;
