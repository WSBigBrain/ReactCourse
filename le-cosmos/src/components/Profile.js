import { useState } from "react";
import { Input, Form, Button, message } from "antd";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../lib/firebaseCredentials";
import { LoadingOutlined } from "@ant-design/icons";
import { collection, addDoc, getFirestore } from "firebase/firestore";


const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db =getFirestore();

const Profile = () => {
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({
      name:"",
      firstName:"",
      age:"",
      email:"",
  });

  const onFinish = (values) => {
    setLoading(<LoadingOutlined />);
    createUserWithEmailAndPassword(auth, values.email, values.password)
      .then((credentials) => {
        console.log(credentials);
        
    addDoc(collection(db, "users"), state)
    .then((doc) => console.log(doc))
    .catch((err) => console.log(err.message)); 

        message.success("Vous êtes bien inscrit");
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
        setLoading(false);
        message.error(err.message);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const labels = [
    {
      label: "Nom",
      name: "name",
      required: true,
      message: "Please input your last name",
      type: "text",
      action: (e) => {setState({...state, name : e.target.value})}
    },
    {
      label: "Prénom",
      name: "fistName",
      required: true,
      message: "Please input your first name",
      type: "text",
      action: (e) => {setState({...state, firstName : e.target.value})}
    },
    {
      label: "Âge",
      name: "age",
      type: "number",
      required: false,
      message: "Please input your age",
      action: (e) => {setState({...state, age : e.target.value})}
    },
    {
      label: "Email",
      name: "email",
      required: true,
      message: "Please input your email",
      type: "email",
      action: (e) => {setState({...state, email : e.target.value})}
    },
    {
      label: "Mot de passe",
      name: "password",
      required: true,
      message: "Please input your password",
      type: "password",
    },
  ];

  function createFormItem(label) {
    return (
      <Form.Item
        key={label.name}
        label={label.label}
        name={label.name}
        rules={[
          {
            required: label.required,
            message: label.message,
          },
        ]}
      >
        <Input type={label.type} onChange={label.action} />
      </Form.Item>
    );
  }

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
      {labels.map((label) => createFormItem(label))}

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          S'inscrire {loading}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Profile;