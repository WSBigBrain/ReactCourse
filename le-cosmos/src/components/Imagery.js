import { DatePicker, Image, Input, Empty} from 'antd';
import { useState} from "react";
import { Button, Tooltip } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import {doc , getFirestore, setDoc, getDoc, } from "firebase/firestore";
const Imagery = () => {
    const [ date,setDate]= useState('');
    const [ destination, setDestination]= useState('');
    const [lon, setLon] = useState('');
    const [lat, setLat]= useState('');
    const [valid, setValid]= useState('');
    const [disabled, setDisabled] = useState(true);
    const onChange= (dateString,date)=> {
// eslint-disable-next-line no-unused-expressions
-       setDate(date);
    }

    const db =getFirestore();

    async function addDestination () {
        const docRef = doc(db, "Destinations", destination.toUpperCase());
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()){
            const count = docSnap.data().requested + 1;
            const data = {
                requested : count
            }
            await setDoc(doc(db,"Destinations",destination.toUpperCase()),data);
        } else {
            const data = {
                requested : 1
            }
            await setDoc(doc(db, "Destinations", destination.toUpperCase()), data);
        }
    }
        
    

    const updateDestination = (desst) =>{
        setDestination(desst.target.value);
        
        setDisabled(destination=== '');
        
    }


    const buildUrl =()=>{
        setValid(date !== '');
        getCoordinates();
        addDestination();
        
    }
  

    async function getCoordinates(){
        await fetch(`https://api-adresse.data.gouv.fr/search/?q=${destination}`).then(res => res.json()).then(result=> {
            setLon(result.features[0].geometry.coordinates[0]);
            setLat(result.features[0].geometry.coordinates[1]);

        })

    }

    return (
        <div class="imageContainer">
            <div class="title">
                <h2>Imagerie</h2> 
                <h6>Choisissez un lieu en France et une date, vous aurez alors accès à l'image satelitte correspondante</h6>
            </div>
            <div class="choiceContainer">
                <DatePicker onChange={onChange} />
                <Input placeholder="Votre destination" bordered={false} onChange={updateDestination}/>
                <Tooltip title="search">
                    <Button shape="circle" icon={<SearchOutlined />} size="large" onClick={buildUrl} disabled={disabled} />
                </Tooltip>

            </div>
            <div class="contentContainer">
            {valid ? (
                    <Image
                    width={800}
                    src={`https://api.nasa.gov/planetary/earth/imagery?lon=${lon}&lat=${lat}&date=${date}&api_key=JCCngia7qtimfgWKFqcMGmkr0NfhdKY63FlOLpbY&dim=1`} placeholder={
                        <Image
                        src="error"
                        width={200}
                        placeholder={<Empty />}/>
                    }
                    />
                ) : (
                    <h2>Veuillez renseigner la date et le lieu</h2>
                )}
                
                
            </div>
           
        </div>
        
    )
}

export default Imagery;