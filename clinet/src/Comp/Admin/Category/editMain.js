import { useEffect, useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom"
import utils from "../../../utils";

const EditMainCom = (props) =>
{
    const {id} = useParams();
    const [mainCategory, setMainCategory] = useState(null);
    const [allCategory, setAllCategory] = useState([]);
    const [category, setCategory] = useState({});
    const history = useHistory();
    const [show,setShow] = useState(false);
    const [validated,setValidated] = useState(false);

    
    useEffect(async()=>
    {
        try{
            let res = await utils.GetItem("http://localhost:5000/maincategory/",id);
            setMainCategory(res.data);
        }
        catch(error){
            alert(error.response.data.message);
        }
    },[])

    useEffect(async()=>
    {
        if(mainCategory)
        {
            setCategory({...category,Type:mainCategory.Name});
            try{
                let res = await utils.GetItem("http://localhost:5000/category/getallinmain/",mainCategory.Name);
                setAllCategory(res.data);
            }
            catch(error){
                alert(error.response.data.message);
            }
        }
    },[mainCategory])

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) 
        {
          event.preventDefault();
          event.stopPropagation();
        }
        else
        {
            setValidated(true);
            event.preventDefault();
            AddCategory();
        }
        setValidated(true);
    };

    const AddCategory = async()=>
    {
        console.log(category);
        try{
            let res = await utils.CreateItem("http://localhost:5000/category/",category);
            if(res.data.Category)
            {
                setAllCategory([...allCategory,res.data.Category]);
                setShow(false);
            }
        }
        catch(error){
            alert(error.response.data.message);
        }
    }

    const removeCategory = async(categoryId)=>
    {
        
        try{
            let res = await utils.DeleteItem("http://localhost:5000/category/",categoryId);
            let temp = allCategory;
            console.log(temp);
            let index = temp.findIndex(x => x._id == categoryId);
            alert(index);
            temp.splice(index,1);
            setAllCategory(temp);
            setShow(false);
        }
        catch(error){
            alert(error.response.data.message);
        }
    }

    return(
        <div>
            <h1>{mainCategory?.Name} Edit</h1>
            {
                allCategory.length === 0 ? <>
                    <h1>There no Category in the Main Category!!</h1>
                </>:<>
                    {
                        allCategory.map((item,index)=>
                        {
                            return<>
                                <h3>{item.Name} <input value="Delete" type="button" onClick={()=>{removeCategory(item._id)}}/></h3>
                            </>
                        })                        
                    }
                </>
            }
            <Button onClick={()=>{history.push("/admin/homecategory/maincategory")}}>Go Back To All Category</Button>
            <Button onClick={()=>{setShow(true)}}>Add Category</Button>

            <Modal show={show} onHide={() => setShow(false)}>
                    <Modal.Header closeButton>
                    <Modal.Title>Add Category To Main Category</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" >
                            <Form.Label>Main Category Name:</Form.Label>
                            <Form.Control required type="text" placeholder="Enter category Name" onChange={(e) => {setCategory({...category,Name:e.target.value})}}/>
                            <Form.Control.Feedback type="invalid">
                                    Please Enter Valid Name!
                            </Form.Control.Feedback>
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShow(false)}>
                        Close
                    </Button>
                    </Modal.Footer>
                </Modal>
        </div>
    )
}
export default EditMainCom