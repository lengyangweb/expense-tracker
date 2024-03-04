"use client";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Button, Form, Spinner } from "react-bootstrap";
import { createHistory, getHistory } from "../lib/apis/histories";

const ExpenseTransaction = ({
  histories,
  setHistories,
  suggestionSelected,
  setSuggestionSelected,
  trackerId
}) => {
  const [title, setTitle] = useState("");
  const [total, setTotal] = useState("");
  const [isSubmitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!suggestionSelected) {
      setTitle("");
      setTotal("");
    }
    if (suggestionSelected) {
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
    setSubmitted(true); // turn on submitted flag
    if (!title || !total) {
      setSubmitted(false);
      return toast.error("Please fill out both text and amount field");
    }
    // validate if transaction already exist
    let history = await validate(title);
    if (history) {
      setSubmitted(false);
      return toast.error("Please enter a different transaction name");
    }

    const kindOfExpense = total.substring(0, 1);
    if (!kindOfExpense.includes("+")) {
      if (!kindOfExpense.includes("-")) {
        setSubmitted(false);
        return toast.error("Please specify what kind of expense (+, -)");
      }
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
      history = await createHistory(newTransaction);
    } catch (error) {
      setSubmitted(false);
      console.error(`Fail trying to create a new transaction`, error);
      return;
    }

    // set and update histories
    const updatedHistories = [...histories, history];
    // update histories state
    setHistories([...updatedHistories]);

    // reset fields
    setTotal((prev) => (prev = ""));
    setTitle((prev) => (prev = ""));

    // reset suggestion selected if it is being selected
    if (suggestionSelected) setSuggestionSelected(undefined);
    // reset submit flag
    setSubmitted(false);
  };

  // validate if a history with the same title already exist
  const validate = async (title) => {
    try {
      // send new history to be created
      const history = await getHistory(title, trackerId);
      return history ? true : false;
    } catch (error) {
      console.error(`Fail trying to get history`, error);
      return;
    }
  };

  return (
    <div className="py-2">
      <span>Add new transaction</span>
      <hr />
      <Form>
        <Form.Group>
          <Form.Label htmlFor="transaction">Transaction Name</Form.Label>
          <Form.Control
            type="text"
            id="transaction"
            name="transaction"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter a transaction name..."
            autoComplete="transaction"
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
        <Button
          className="w-100 my-2"
          variant="primary"
          onClick={onSave}
          disabled={isSubmitted}
        >
          {!isSubmitted ? `Add Transaction` : `Saving Transaction`}
        </Button>
      </Form>
    </div>
  );
};

export default ExpenseTransaction;
