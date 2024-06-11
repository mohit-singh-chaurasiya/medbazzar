import MaterialTable from "@material-table/core";
import { useEffect, useState } from "react";
import { getData } from "../../Services/FetchNodeServices";

export default function DisplayUsers(props) {
    const [userData, setUserData] = useState([])

    const fetchUserData = async () => {
        var result = await getData('users/display_userData')
        if (result.status) { setUserData(result.data) }
        console.log("USERdsda", result)
    }


    useEffect(function () {
        fetchUserData()
    }, [])
    const showUsers = () => {
        return (<div >
            <MaterialTable
                title="Main Category"
                style={{ color: '#000',background:'#95a5a6',fontWeight:'bold' }}
                columns={[
                    { title: 'UserId', field: 'userid' },
                    { title: 'User MobileNo.', field: 'mobileno' },
                    { title: 'User EmailId', field: 'emailid' },
                    { title: 'User Name', field: 'username' },


                ]}
                options={{
                    paging: true,
                    pageSize: 3,       // make initial page size
                    emptyRowsWhenPaging: false,   // To avoid of having empty rows
                    pageSizeOptions: [3, 5, 7, 10],    // rows selection options
                }}


                data={userData}

            />
        </div>)
    }
    return (
        <div style={{
            display: 'flex',
            width: '100%',
            height: '100vh',
            justifyContent: 'center',
            fontFamily: 'kanit',
            alignItems: 'center',
            background: '#fff',
        }}>
            <div style={{
                width: 800,
                height: 'auto',
                background: '#fff',
                borderRadius: 10,
                padding: 10,
                boxShadow:'3px 3px 8px 5px grey',
            }}>
                {showUsers()}
            </div>

        </div>
    )
}