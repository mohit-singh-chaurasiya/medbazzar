import { useNavigate } from "react-router-dom"
import mainlogo from '../../../src/assets/MedBazzar-Logo.png'
import list from '../../../src/assets/list.png'
export default function TitleComponent ({title,logo,listicon,page})
{
   
    var navigate = useNavigate()
    return (<div style={{display:'flex',justifyContent:'space-between'}}>
        <div style={{display:'flex',flexDirection:'column', justifyContent:'center',alignItems:'center'}}>
            <img src={mainlogo} width='150' />
            <div style={{color:'#636e72', fontWeight:'bolder',fontSize:'16'}}>{title}</div>
        </div>
        <div style={{cursor:'pointer'}} onClick={()=>navigate(page)}>
            <img src={list} width='35' />
        </div>
    </div>) 
}