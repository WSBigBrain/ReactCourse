
import { Layout, Menu, Col, Row } from 'antd';
import 'antd/dist/antd.css';
import {
  LoginOutlined,
  CodeOutlined,
  UserAddOutlined ,
  CloudOutlined,
  StarOutlined,
  FileImageOutlined,
  CloseOutlined,
  HomeOutlined,
  RiseOutlined
} from '@ant-design/icons';
import './App.css';
import { useState} from "react";
import Profile from './components/Profile';
import Login from './components/Login';
import Imagery from './components/Imagery';
import Dashboard from './components/Dashboard';
import Creators from './components/Creators';
import Rankings from './components/Rankings';

function App() {
  const [ activeComponent,setActiveComponent]= useState();

  const { Header , Content , Footer, Sider} = Layout;
  
  const menus = [
    {
      key:"signup",
      action : ()=> setActiveComponent(<Profile setActiveComponent={setActiveComponent}/>),
      title :"Signup",
      icon : <UserAddOutlined />,
      hidden : localStorage.getItem("isAuth") 
    },
    {
      key:"login",
      action : ()=> setActiveComponent(<Login setActiveComponent={setActiveComponent}/>),
      title :"Login",
      icon : <LoginOutlined />,
      hidden : localStorage.getItem("isAuth") 
    },
    {
      key:"dashboard",
      action : ()=> setActiveComponent(<Dashboard setActiveComponent={setActiveComponent}/>),
      title :"Tableau de Bord",
      icon : <HomeOutlined />,
      hidden : !localStorage.getItem("isAuth") 
    },
    {
      key:"authors",
      action : ()=> setActiveComponent(<Creators/>),
      title :"Createurs",
      icon : <CodeOutlined />,
      hidden : !localStorage.getItem("isAuth") 
    },
    {
      key : "meteo",
      action : ()=> setActiveComponent(),
      title: "Meteo",
      icon : <CloudOutlined />,
      hidden : !localStorage.getItem("isAuth") 
    },
    {
      key :"image",
      action : ()=> setActiveComponent(<Imagery/>),
      title : "Imagerie",
      icon : <FileImageOutlined />,
      hidden : !localStorage.getItem("isAuth") 
    },
    {
      key :"trends",
      action : ()=> setActiveComponent(<Rankings/>),
      title : "Tendances",
      icon : <RiseOutlined />,
      hidden : !localStorage.getItem("isAuth") 
    },
    {
      key :"disconnect",
      action : ()=> disconnect(),
      title : "Deconnexion",
      icon : <CloseOutlined />,
      hidden : !localStorage.getItem("isAuth") 
    }
  ];
  function disconnect () {
    localStorage.removeItem("isAuth");
    setActiveComponent(<Login setActiveComponent={setActiveComponent}/>);
    console.log(localStorage.getItem("isAuth"));
  }
  function createMenuItem (l) {
    return(
        <Menu.Item key={l.key} onClick={l.action} icon={l.icon} hidden={l.hidden}>
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
