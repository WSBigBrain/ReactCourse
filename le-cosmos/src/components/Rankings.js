import { collection, getFirestore, limit, orderBy, getDocs } from "firebase/firestore";
import { query} from "firebase/firestore";
import { useState } from "react/cjs/react.development";
import { Table} from 'antd';
import { useEffect } from "react";



const Rankings = () => {
    const [data , setData] = useState([]);
    
    const columns = [
        {
          title: 'Destinations',
          dataIndex: 'destination',
          key: 'destination',
        },
        {
          title: 'Nombre de recherches',
          dataIndex: 'requests',
          key: 'requests',
        }
    ];
    useEffect(()=>{
        getRanks();
    },[]);
    
    const dataSource = [];

    async function getRanks() {
        const db = getFirestore();
        const docRef = collection(db, "Destinations");
        const q = query(docRef,orderBy("requested","desc"));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            dataSource.push({
                key : doc.id,
                destination : doc.id,
                requests : doc.data().requested
            });
            

        
        console.log(doc.id, " => ", doc.data());
        });
        console.log(dataSource);
        setData(dataSource);
    }


    

    return (
        <div>
            <h2> Les tops destinations </h2>
            <Table dataSource={data} columns={columns} />;
        </div>
    )


}

export default Rankings;