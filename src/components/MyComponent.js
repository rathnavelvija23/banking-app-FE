import React, { useState } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Select } from 'antd';

const { Option } = Select;

const MyComponent = () => {
  const [isRegister, setIsRegister] = useState(false);

  const handleRegisterClick = () => {
    setIsRegister(true);
  };

  const handleLoginClick = () => {
    setIsRegister(false);
  };

  const onFinish = async (values) => {
    const { username, password } = values;
    try {
      const response = await fetch('http://localhost:8080/users/authenticate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Invalid credentials');
      }

      const token = await response.text();
      localStorage.setItem('token', token);
      console.log('Token:', token);
    } catch (error) {
      console.error('Login failed:', error.message);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: 'rgb(173,216,230)' }}>
      <div style={{ maxWidth: 400 }}>
        <div style={{ border: '1px solid #d9d9d9', borderRadius: 20, padding: 24, textAlign: 'center', background: 'white' }}>
          {isRegister ? (
            <Form
              name="register"
              className="register-form"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
            >
              <Form.Item
                name="name"
                rules={[
                  {
                    required: true,
                    message: 'Please Enter your Name!',
                  },
                ]}
              >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Name" />
              </Form.Item>
              <Form.Item
                name="username"
                rules={[
                  {
                    required: true,
                    message: 'Please input your Email!',
                  },
                  {
                    type: 'email',
                    message: 'Please enter a valid Email!',
                  },
                ]}
              >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: 'Please input your Password!',
                  },
                ]}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>
              <Form.Item
                name="accountType"
                rules={[
                  {
                    required: true,
                    message: 'Please select your Account Type!',
                  },
                ]}
              >
                <Select placeholder="Select Account Type">
                  <Option value="savings">Savings</Option>
                  <Option value="current">Current</Option>
                </Select>
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" className="register-form-button">
                  Register
                </Button>
                Or <a onClick={handleLoginClick}>login now!</a>
              </Form.Item>
            </Form>
          ) : (
            <Form
              name="login"
              className="login-form"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
            >
              <Form.Item
                name="username"
                rules={[
                  {
                    required: true,
                    message: 'Please input your Email!',
                  },
                  {
                    type: 'email',
                    message: 'Please enter a valid Email!',
                  },
                ]}
              >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: 'Please input your Password!',
                  },
                ]}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                  Log in
                </Button>
                Or <a onClick={handleRegisterClick}>register now!</a>
              </Form.Item>
            </Form>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyComponent;
