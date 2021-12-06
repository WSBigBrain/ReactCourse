import { Form, Input, Button, Checkbox, message } from 'antd';
import {
    getAuth,
    signInWithEmailAndPassword
} from "firebase/auth"
import { initializeApp } from "firebase/app"
import { firebaseConfig } from "../lib/firebaseCredentials";
import { useState } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import Dashboard from './Dashboard';

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

const Login = (props) => {

  const [loading, setLoading] = useState(false)

  const onFinish = (values) => {
    setLoading(<LoadingOutlined/>)
    signInWithEmailAndPassword(auth, values.email, values.password)
    .then((credentials) => {
        console.log(credentials);
        setLoading(false);
        props.setActiveComponent(<Dashboard/>);
    })
    .catch((err) => {
        console.log(err.message);
        setLoading(false);
        message.error(err.message);
    })
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: 'Please input your email!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Mot de passe"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Se connecter {loading}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Login;