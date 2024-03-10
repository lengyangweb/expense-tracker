"use client";
import { toast } from "react-toastify";
import { useFormStatus } from 'react-dom';
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { createHistory, getHistory } from "../../../../services/history";

const ExpenseTransaction = ({ suggestionSelected, setSuggestionSelected, trackerId }) => {
  const [title, setTitle] = useState("");
  const [total, setTotal] = useState("");
  const { pending } = useFormStatus();

  useEffect(() => {
    if (!suggestionSelected) {
      setTitle("");
      setTotal("");
    }
    if (suggestionSelected) { // if user choose a suggestion transaction
      const indicator = suggestionSelected.income ? "+" : "-";
      setTitle(suggestionSelected.title);
      setTotal(`${indicator}${suggestionSelected.amount}`);
    }
  }, [suggestionSelected]);

  /**
   * Create a new transaction and save to hisotries
   * @returns error if error
   */
  const onSave = async () => {
    if (!title || !total) return toast.error("Please fill out both text and amount field");
    // check to see if a history already exist with the title
    let history = await getHistory(trackerId, title);
    // if there's already a history exist
    if (history.length) return toast.error("Please enter a different transaction name");
    // check to see if it's an expense or income
    const kindOfExpense = total.substring(0, 1);
    if (!kindOfExpense.includes("+")) {
      if (!kindOfExpense.includes("-")) return toast.error("Please specify what kind of expense (+, -)");
    }

    // check to see what kind of expense is it
    const newTotal = total.split(kindOfExpense)[1];
    // create new transaction
    const newTransaction = {
      trackerId,
      title,
      total: parseFloat(newTotal),
      income: kindOfExpense.includes("+"),
      createdAt: Date.now(),
    };

    try {
      // create a new transaction id
      const response = await createHistory(newTransaction);
      if (!response.success) return toast.error(response.message);
      toast.success(response.message);
      // reset suggestion selected if it is being selected
      if (suggestionSelected) setSuggestionSelected(undefined);
    } catch (error) {
      setSubmitted(false);
      console.error(`Fail trying to create a new transaction`, error);
      return;
    }
  };

  return (
    <div className="py-2">
      <span>Add new transaction</span>
      <hr />
      <Form>
        <Form.Group>
          <Form.Label htmlFor="title">Transaction Name</Form.Label>
          <Form.Control
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter an income or expense title"
            autoComplete="title"
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
            value={total}
            onChange={(e) => setTotal(e.target.value)}
            autoComplete="amount"
          />
        </Form.Group>
        <Button className="w-100 my-2" variant="primary" onClick={onSave} disabled={pending}>
          <span>{!pending ? `Add Transaction` : `Saving Transaction`}</span>
        </Button>
      </Form>
    </div>
  );
};

export default ExpenseTransaction;
