
import { Layout, Menu  } from 'antd';
import 'antd/dist/antd.css';
import {
  LoginOutlined,
  CodeOutlined,
  UserAddOutlined ,
  CloudOutlined
} from '@ant-design/icons';
import './App.css';
import { useState} from "react";

function App() {
  const [ activeComponent,setActiveComponent]= useState();

  const { Header , Content , Footer, Sider} = Layout;
  
  const menus = [
    {
      key:"signup",
      action : ()=> setActiveComponent(),
      title :"Signup",
      icon : <UserAddOutlined />
    },
    {
      key:"login",
      action : ()=> setActiveComponent(),
      title :"Login",
      icon : <LoginOutlined />
    },
    {
      key:"authors",
      action : ()=> setActiveComponent(),
      title :"Createurs",
      icon : <CodeOutlined />
    },
    {
      key : "meteo",
      action : ()=> setActiveComponent(),
      title: "Meteo",
      icon : <CloudOutlined />
    }
  ];

  function createMenuItem (l) {
    return(
        <Menu.Item key={l.key} onClick={l.action} icon={l.icon}>
           {l.title}
        </Menu.Item>
    )
};



  return (
    <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible >
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            {menus.map((label)=> createMenuItem(label))}
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }} ><h2>LE COSMOS</h2></Header>
          <Content style={{ margin: '0 16px' }}>
            
          </Content>
          <Footer style={{ textAlign: 'center' }}>Le Cosmos @2021 - ESEO - GIRARD x FABER</Footer>
        </Layout>
      </Layout>
  );
}

export default App;
