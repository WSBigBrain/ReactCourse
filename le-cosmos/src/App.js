
import { Layout, Menu, Col, Row } from 'antd';
import 'antd/dist/antd.css';
import {
  LoginOutlined,
  CodeOutlined,
  UserAddOutlined ,
  CloudOutlined,
  StarOutlined
} from '@ant-design/icons';
import './App.css';
import { useState} from "react";
import Profile from './components/Profile';
import Login from './components/Login';
import MeteoCard from './components/MeteoCard';
import Meteo from './components/Meteo';

function App() {
  const [ activeComponent,setActiveComponent]= useState();

  const { Header , Content , Footer, Sider} = Layout;
  
  const menus = [
    {
      key:"signup",
      action : ()=> setActiveComponent(<Profile setActiveComponent={setActiveComponent}/>),
      title :"Signup",
      icon : <UserAddOutlined />
    },
    {
      key:"login",
      action : ()=> setActiveComponent(<Login setActiveComponent={setActiveComponent}/>),
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
      action : ()=> setActiveComponent(<Meteo setActiveComponent={setActiveComponent}/>),
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
          <Header className="site-layout-background" style={{ padding: 0, display:"flex" }} ><StarOutlined/><h2>   LE COSMOS   </h2><StarOutlined/></Header>
          <Content style={{ margin: '0 16px' }}>
            <Col offset={2} span={20} style={{marginTop:40}}>
              <Row justify="center">{activeComponent}</Row>
            </Col>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Le Cosmos @2021 - ESEO - GIRARD x FABER</Footer>
        </Layout>
      </Layout>
  );
}

export default App;
