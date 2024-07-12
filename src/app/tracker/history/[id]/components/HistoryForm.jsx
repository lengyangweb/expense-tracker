"use client";

import { z } from 'zod';
import { toast } from "react-toastify";
import { useFormStatus } from 'react-dom';
import { InputText } from 'primereact/inputtext';
import { useEffect, useRef, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { createHistory, getHistory } from "../../../../services/history";

const History = z.object({
  trackerId: z.string().min(10),
  title: z.string().min(3),
  amount: z.number(),
  type: z.string(),
  createdAt: z.date()
})

const HistoryForm = ({ suggestionSelected, setSuggestionSelected, trackerId }) => {
  const formRef = useRef();
  const { pending } = useFormStatus();

  useEffect(() => {
    if (suggestionSelected) { // if user choose a suggestion transaction
      // const indicator = suggestionSelected.income ? "+" : "-";
      // setTitle(suggestionSelected.title);
      // setTotal(`${indicator}${suggestionSelected.amount}`);
      formRef.current.title.value = suggestionSelected.title;
      formRef.current.amount.value = suggestionSelected.amount;
      formRef.current.type.value = suggestionSelected.type;
    }
  }, [suggestionSelected]);

  /**
   * Create a new transaction and save to hisotries
   * @returns error if error
   */
  const saveHistory = async () => {
    const title = formRef.current.title.value;
    const amount = formRef.current.amount.value
    const type = formRef.current.type.value

    if (!title || !amount || !type) return toast.error("Please make sure all require fields are fill in.");

    // create new transaction
    const newHistory = {
      trackerId,
      title,
      amount: parseFloat(amount),
      type,
      createdAt: new Date(),
    };

    const validate = History.safeParse(newHistory); // validate new history
    if (!validate.success) return toast.error(handleValidationError(validate)); // if validation fail
    // check to see if a history already exist with the title
    const history = await getHistory(trackerId, title);
    // if there's already a history exist
    if (history.length) return toast.error("Please enter a different transaction name");
    try {
      const response = await createHistory(newHistory); // create a new transaction id
      if (!response.success) return toast.error(response.message);
      formRef.current.reset(); // reset form after new history is created
      toast.success(response.message);
      // reset suggestion selected if it is being selected
      if (suggestionSelected) setSuggestionSelected(undefined);
    } catch (error) {
      setSubmitted(false);
      console.error(`Fail trying to create a new transaction`, error);
      return;
    }
  };

  /**
   * Handle error return from Zod validation
   * @param {z.SafeParseReturnType} error 
   * @returns { string }
   */
  function handleValidationError(error) {
    const { issues } = error.error;
    const errorMsg = issues.reduce((errMsg, error) => {
      const { path, message } = error;
      errMsg += `${message}. `;
      return errMsg;
    }, '');

    return errorMsg;
  }

  return (
    <div className="py-2">
      <span>Add new transaction</span>
      <hr />
      <Form action={saveHistory} ref={formRef}>
        <Form.Group>
          <Form.Label htmlFor="title">Transaction Name</Form.Label>
          <InputText
            className='w-100 py-2'
            id='title'
            name="title"
            placeholder='Enter an income or expense title'
            autoComplete='title'
          />
        </Form.Group>
        <Form.Group className='my-2'>
          <Form.Label htmlFor="type">Transaction Type (negative - expense, positive - income)</Form.Label>
          <br/>
          <Form.Check
            inline
            label="Income"
            name="type"
            id="income"
            type='radio'
            value="income"
          />
          <Form.Check
            inline
            label="Expense"
            name="type"
            type='radio'
            id="expense"
            value="expense"
          />
        </Form.Group>
        <Form.Group className="my-2">
          <Form.Label>Amount</Form.Label><br/>
          <InputGroup>
            <InputGroup.Text id="amount">$</InputGroup.Text>
            <Form.Control
              type="number"
              step="0.01"
              id="amount"
              name="amount"
              autoComplete="amount"
              aria-label="amount"
              aria-describedby="amount"
            />
          </InputGroup>
        </Form.Group>
        <Button type="submit" className="w-100 my-2" variant="primary" disabled={pending}>
          <span>{!pending ? `Add Transaction` : `Saving Transaction`}</span>
        </Button>
      </Form>
    </div>
  );
};

export default HistoryForm;
