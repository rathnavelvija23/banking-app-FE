import React, { useState } from 'react';
import { Card, Form, Input, Button, Table } from 'antd';

const ViewPage = () => {
  const [currentBalance, setCurrentBalance] = useState(1000);
  const [transactionData, setTransactionData] = useState([]);
  const [transactionType, setTransactionType] = useState('');
  const [transactionAmount, setTransactionAmount] = useState('');

  const accountDetails = [
    {
      key: 1,
      accountNumber: '1234567890',
      name: 'Rathnavel Vija',
      email: 'rathnavelvija@gmail.com',
      accountType: 'Savings',
      balance: currentBalance,
    },
  ];

  const accountColumns = [
    {
      title: 'Account Number',
      dataIndex: 'accountNumber',
      key: 'accountNumber',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Account Type',
      dataIndex: 'accountType',
      key: 'accountType',
    },
    {
      title: 'Current Balance',
      dataIndex: 'balance',
      key: 'balance',
    },
  ];

  const transactionColumns = [
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Timestamp',
      dataIndex: 'timestamp',
      key: 'timestamp',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
  ];

  const handleDeposit = () => {
    const newBalance = currentBalance + parseInt(transactionAmount);
    setCurrentBalance(newBalance);
    const newTransactionData = [...transactionData, { key: Date.now(), type: 'Deposit', timestamp: new Date().toLocaleString(), amount: transactionAmount }];
    setTransactionData(newTransactionData);
    setTransactionAmount('');
  };

  const handleWithdraw = () => {
    const newBalance = currentBalance - parseInt(transactionAmount);
    setCurrentBalance(newBalance);
    const newTransactionData = [...transactionData, { key: Date.now(), type: 'Withdraw', timestamp: new Date().toLocaleString(), amount: transactionAmount }];
    setTransactionData(newTransactionData);
    setTransactionAmount('');
  };

  const handleTransactionAmountChange = (e) => {
    setTransactionAmount(e.target.value);
  };

  return (
    <div style={{ padding: '20px' }}>
      <Card title="Account Details" style={{ marginBottom: '20px' }}>
        <Table columns={accountColumns} dataSource={accountDetails} pagination={false} />
        <Card title="Withdraw or Deposit" style={{ marginBottom: '20px' }}>
        <Form layout="inline">
          <Form.Item label="Enter Amount">
            <Input value={transactionAmount} onChange={handleTransactionAmountChange} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={handleDeposit}>Deposit</Button>
          </Form.Item>
          <Form.Item>
            <Button type="primary" danger onClick={handleWithdraw}>Withdraw</Button>
          </Form.Item>
        </Form>
        </Card>
      </Card>

      <Card title="Transaction Details">
        <Table columns={transactionColumns} dataSource={transactionData} pagination={false} />
      </Card>
    </div>
  );
};

export default ViewPage;
