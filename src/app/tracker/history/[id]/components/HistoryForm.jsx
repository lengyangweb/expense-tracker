"use client";

import { z } from 'zod';
import { toast } from "react-toastify";
import { useFormStatus } from 'react-dom';
import { useEffect, useRef, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { createHistory, getHistory } from "../../../../services/history";

const History = z.object({
  trackerId: z.string().min(10),
  title: z.string().min(3),
  total: z.number(),
  income: z.boolean(),
  createdAt: z.date()
})

const HistoryForm = ({ suggestionSelected, setSuggestionSelected, trackerId }) => {
  const formRef = useRef();

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
  const saveHistory = async (formData) => {
    const title = formData.get('title');
    const total = formData.get('total');

    if (!title || !total) return toast.error("Please fill out both text and amount field");
    // check to see if it's an expense or income
    const kindOfExpense = total.substring(0, 1);
    if (!kindOfExpense.includes("+")) {
      if (!kindOfExpense.includes("-")) return toast.error("Please specify what kind of expense (+, -)");
    }
    // check to see what kind of expense is it
    // const newTotal = total.split(kindOfExpense)[1];
    // create new transaction
    const newHistory = {
      trackerId,
      title,
      total: parseFloat(total),
      income: kindOfExpense.includes("+"),
      createdAt: Date.now(),
    };
    // validate new history
    const validate = History.safeParse(newHistory);
    // if validation fail
    if (!validate.success) {
      debugger;
      const { issues } = validate.error;
      const errorMsg = issues.reduce((errMsg, error) => {
        const { path, message } = error;
        errMsg += `${message}. `;
        return errMsg;
      }, '');
      toast.error(errorMsg);
    }
    // check to see if a history already exist with the title
    let history = await getHistory(trackerId, title);
    // if there's already a history exist
    if (history.length) return toast.error("Please enter a different transaction name");
    try {
      // create a new transaction id
      const response = await createHistory(newHistory);
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
      <Form action={saveHistory} ref={formRef}>
        <Form.Group>
          <Form.Label htmlFor="title">Transaction Name</Form.Label>
          <Form.Control
            type="text"
            id="title"
            name="title"
            placeholder="Enter an income or expense title"
            autoComplete="title"
          />
        </Form.Group>
        <Form.Group className='my-2'>
          <Form.Label htmlFor="type">
            <span>Transaction Type (negative - expense, positive - income)</span>
          </Form.Label><br/>
          <Form.Check
            inline
            label="Income"
            name="type"
            id="income"
            type='radio'
          />
          <Form.Check
            inline
            label="Expense"
            name="type"
            type='radio'
            id="expense"
          />
        </Form.Group>
        <Form.Group className="my-2">
          <Form.Label>Amount</Form.Label><br/>
          <InputGroup>
            <InputGroup.Text id="amount">@</InputGroup.Text>
            <Form.Control
              type="text"
              id="amount"
              name="amount"
              autoComplete="amount"
              aria-label="amount"
              aria-describedby="amount"
            />
          </InputGroup>
        </Form.Group>
        <Button className="w-100 my-2" variant="primary" disabled={pending}>
          <span>{!pending ? `Add Transaction` : `Saving Transaction`}</span>
        </Button>
      </Form>
    </div>
  );
};

export default HistoryForm;
