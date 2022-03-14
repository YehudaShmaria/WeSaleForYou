import { useContext, useEffect, useState } from "react"
import { Container, Form, Button, Col, Row } from "react-bootstrap";
import { useHistory } from "react-router";
import utils from "../../../../utils";
import { sallerContext } from "../sallerContext"

const SallerUpdateCom = () =>
{
    const {saller,setSaller} = useContext(sallerContext);
    const [updateSaller,setUpdateSaller] = useState({});
    const history = useHistory();
    const [validated, setValidated] = useState(false);


    useEffect(()=>
    {   
        if(saller)
        {
            setUpdateSaller(saller)
        }
    },[saller])

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
            sendSaller();
        }
        setValidated(true);
      };

    const sendSaller = async() =>
    {
        try{
            let res = await utils.UpdateItem("http://localhost:5000/saller/",updateSaller._id,updateSaller);
            setSaller(res.data.newSaller);
            history.push("/mangeproduct/saller");
        }catch(error)
        {
            alert(error.response.data.message);
        }
       
    }

    return(
        <div>
             <Container>
                <div>
                    <h3 style={{color:"yellowgreen",backgroundColor:"whitesmoke",padding:"10px"}}>Seller Update</h3>
                </div>
                <Form  style={{textAlign:'left'}} noValidate validated={validated} onSubmit={handleSubmit}> 
                            <Form.Group as={Row} className="mb-3">
                                    <Form.Label column md="4">Your Seller Name:</Form.Label>
                                    <Col md={8}>
                                        <Form.Control required placeholder="Enter User Name" value={updateSaller.Name} onChange={(e)=>{setUpdateSaller({...updateSaller,Name:e.target.value})}}/>
                                        <Form.Control.Feedback type="invalid">
                                            Please Enter Guide Name!
                                        </Form.Control.Feedback>
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} className="mb-3">
                                    <Form.Label column sm ={4}>Title:</Form.Label>
                                    <Col md={8}>
                                        <Form.Control required="true" type="tel" placeholder="Enter Your Title"  value={updateSaller.Title} onChange={(e)=>{setUpdateSaller({...updateSaller,Title:e.target.value})}}/>
                                        <Form.Control.Feedback type="invalid">
                                            Please Enter Your Title!
                                        </Form.Control.Feedback>
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} className="mb-3">
                                    <Form.Label column sm ={3}>About Me:</Form.Label>
                                    <Col md={9}>
                                        <Form.Control required="false" as="textarea" type="text" placeholder="Enter AboutMe" value={updateSaller.AboutMe} onChange={(e)=>{setUpdateSaller({...updateSaller,AboutMe:e.target.value})}}/>
                                    </Col>
                                </Form.Group>

                                <div style={{paddingTop:"20px", textAlign:"right"}}>
                                    <Button type="submit" variant="primary">
                                        Save
                                    </Button>
                                </div>
                            </Form>
             </Container>
        </div>
    )
}
export default SallerUpdateCom