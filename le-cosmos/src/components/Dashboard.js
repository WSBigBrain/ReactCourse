import { Row, Col, Card } from 'antd';
import { PlayCircleOutlined } from '@ant-design/icons';
import Imagery from './Imagery';
import Rankings from './Rankings';

const { Meta } = Card;


const Dashboard = (props) => {
    return (
        <div className='dashboardContainer'>
            <h2>Tableau de bord</h2>
            <p> Bienvenue dans l'application Cosmos, les services suivants sont à votre disposition :</p>
            <Row className='rowContainer'>
                <Col span={8}>
                    <div className='columnContainer'>
                        <Card actions={[
                                                <PlayCircleOutlined onClick={()=>{props.setActiveComponent()}}/>,
                        ]} className='cardContainer'> 
                            <Meta
                                title="La météo"
                                description="Consultez les données météorologiques en temps réel"
                            />
                        </Card>
                    </div>
                </Col>
                <Col span={8}>
                    <div className='columnContainer'>
                        <Card actions={[
                                                    <PlayCircleOutlined onClick={()=>{props.setActiveComponent(<Imagery/>)}}/>,
                            ]} className='cardContainer'> 
                                <Meta
                                    title="L'imagerie"
                                    description="Consultez des images de la Terre en temps réel"
                                />
                        </Card>
                    </div>
                </Col>
                <Col span={8}>
                    <div className='columnContainer'>
                            <Card actions={[
                                                        <PlayCircleOutlined  onClick={()=>{props.setActiveComponent(<Rankings/>)}}/>,
                                ]}  className='cardContainer'> 
                                    <Meta
                                        title="Les Tendances"
                                        description="Consultez les destinations les plus recherchées"
                                    />
                            </Card>
                    </div>
                </Col>
            </Row>

        </div>
        
    )
};

export default Dashboard;