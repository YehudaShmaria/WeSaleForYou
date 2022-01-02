import { useState } from "react"
import { useHistory } from "react-router-dom";
import utils from "../../../utils";
import { Form, Button, Container } from "react-bootstrap";

const CreateMainCategoryCom = () =>
{
    const [mainCategory, setMainCategory] = useState({Name:""});
    const history = useHistory();
    const [validated, setValidated] = useState(false);


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
            createMainCategory();
        }
        setValidated(true);
    };

    const createMainCategory = async() =>
    {
        try{
            let res = await utils.CreateItem("http://localhost:5000/maincategory",mainCategory);
            if(res.data.MainCategory)
                history.push("/admin/homecategory/maincategory")
        }
        catch(error)
        {
            alert(error.response.data.message);
        }
    }

    return(
        <div>
            <Container>
            <div style={{color:"green",textAlign:"left",marginBottom:"50px"}}>
                    <h1><cite>Create Main Category</cite></h1>
            </div>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="mb-3" >
                    <Form.Label>Main Category Name:</Form.Label>
                    <Form.Control required type="text" placeholder="Enter category Name" onChange={(e) => {setMainCategory({Name:e.target.value})}}/>
                    <Form.Control.Feedback type="invalid">
                            Please Enter Valid Name!
                    </Form.Control.Feedback>
                </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
                <div style={{textAlign:"right"}}>
                <Button onClick={()=>{history.push("/admin/homecategory/maincategory")}}>Go Back To All Category</Button>
                </div>
            </Container>
        </div>
    )
}
export default CreateMainCategoryCom