"use client";

import { z } from 'zod';
import { toast } from "react-toastify";
import { useFormStatus } from 'react-dom';
import { InputText } from 'primereact/inputtext';
import { useEffect, useRef, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { createHistory, getHistory } from "../../../../services/history";
import { Card } from 'primereact/card';

const History = z.object({
  trackerId: z.string().min(10),
  title: z.string().min(3),
  amount: z.number(),
  type: z.string(),
  createdAt: z.date()
})

const HistoryForm = ({ trackerId }) => {
  const formRef = useRef();
  const { pending } = useFormStatus();

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
    } catch (error) {
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
      const { message } = error;
      errMsg += `${message}. `;
      return errMsg;
    }, '');

    return errorMsg;
  }

  return (
    <Card title="Add Transaction Form">
      {/* <span>Add new transaction</span>
      <hr /> */}
      <Form action={saveHistory} ref={formRef}>
        <Form.Group>
          <Form.Label htmlFor="title">Transaction Name:</Form.Label>
          <InputText
            className='w-100 mt-1'
            id='title'
            name="title"
            placeholder='Enter an income or expense title'
            autoComplete='title'
          />
        </Form.Group>
        <Form.Group className='mt-2'>
          <Form.Label htmlFor="type">Transaction Type:</Form.Label>
          <br/>
          <div className="d-flex flex-column">
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
          </div>
        </Form.Group>
        <Form.Group className="my-2">
          <Form.Label>Amount:</Form.Label><br/>
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
        <Button type="submit" className="w-100 mt-2" variant="primary" disabled={pending}>
          <span>{!pending ? `Add Transaction` : `Saving Transaction`}</span>
        </Button>
      </Form>
    </Card>
  );
};

export default HistoryForm;
