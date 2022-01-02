import { useEffect } from "react";
import { useState } from "react"
import utils from "../../../utils";
import { Container, Table, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const MainCategoryCom = () =>
{
    const [mainCategory, setMainCategory] = useState([]);
    const history = useHistory();
    useEffect(async()=>
    {
        try{
            let res = await utils.GetAllItems("http://localhost:5000/maincategory");
            console.log(res.data);
            setMainCategory(res.data);
        }   
        catch(error)
        {
            alert(error.response.data.message);
        }
    },[])
    return(
        <div>
            <Container>
            <div style={{color:"green",textAlign:"left",marginBottom:"50px"}}>
                    <h1><cite>Main category Home</cite></h1>
            </div>
            <div style={{textAlign:"right", marginBottom:"25px"}}>
                <Button onClick={()=>{history.push('/admin/homecategory/create')}}>Create New Main Category</Button>
            </div>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>Number</th>
                        <th>Main Category</th>
                        <th>Number Of Category</th>
                        <th>Detailes</th>
                        <th>Edit - Delete</th>
                    </tr>
                </thead>
                <tbody>
                   
                    {
                        mainCategory.map((item,index)=>
                        {
                                    return <>
                                     <tr>
                                        <td>{index + 1}</td>
                                        <td>{item.Name}</td>
                                        <td>{item.Category.length}</td>
                                        <td><Button onClick={()=>{history.push('/admin/homecategory/detailes/'+item._id)}}>Detailes</Button></td>
                                        <td><Button onClick={()=>{history.push('/admin/homecategory/edit/'+item._id)}}>Edit - Delete</Button></td>
                                    </tr>                            
                                </>
                        })
                    } 
                </tbody>
                </Table>
            

            </Container>
                  </div>
    )
}
export default MainCategoryCom