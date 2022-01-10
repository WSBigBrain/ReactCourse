
import { Carousel } from 'antd';
import { Card, Avatar } from 'antd';
import roland from './roland.png'
const Creators = () =>{
    const { Meta } = Card;
    
    return (
        <div className="creatorsContainer">
             <Carousel autoplay dotPosition="top">
                <div>
                    <div className='creator'>
                        <Card
                            style={{ width: 600 }}
                            cover={
                            <img
                                alt="example"
                                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                                style={{width : 600},{height : 600}}
                            />
                            }
                        >
                            <Meta
                                avatar={<Avatar src="https://joeschmoe.io/api/v1/joe" />}
                                title="Moana Faber"
                                description="This is the description"
                            />
                        </Card>
                    </div>
                    
                </div>
                <div >
                    <div className='creator'>
                        <Card
                            style={{ width: 600 }}
                            cover={
                            <img
                                alt="example"
                                src={roland}
                                style={{width : 600}}
                            />
                            }
                        >
                            <Meta
                                avatar={<Avatar src="https://joeschmoe.io/api/v1/james" />}
                                title="Alexis Girard"
                                description="Grand Fan de Roland Cristal, et allez le foot. TikTok : @labagarrre"
                            />
                        </Card>
                    
                    </div>
                </div>
            </Carousel>
        </div>
    )
}

export default Creators;