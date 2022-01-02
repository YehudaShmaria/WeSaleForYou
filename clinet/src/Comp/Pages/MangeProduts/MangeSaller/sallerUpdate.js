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
                <Form  noValidate validated={validated} onSubmit={handleSubmit}> 
                            <Form.Group as={Row} className="mb-3">
                                    <Form.Label column md="4">Your Seller Name:</Form.Label>
                                    <Col md={8}>
                                        <Form.Control required placeholder="Enter User Name" value={updateSaller.Name} onChange={(e)=>{setUpdateSaller({...updateSaller,Name:e.target.value})}}/>
                                        <Form.Control.Feedback type="invalid">
                                            Please Enter Seller Name!
                                        </Form.Control.Feedback>
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} className="mb-3">
                                    <Form.Label column sm ={4}>Phone Number:</Form.Label>
                                    <Col md={8}>
                                        <Form.Control required="true" type="tel" placeholder="Enter Phone Number"  value={updateSaller.PhoneNumber} onChange={(e)=>{setUpdateSaller({...updateSaller,PhoneNumber:e.target.value})}}/>
                                        <Form.Control.Feedback type="invalid">
                                            Please Enter Phone Number!
                                        </Form.Control.Feedback>
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} className="mb-3">
                                    <Form.Label column sm ={3}>Addres:</Form.Label>
                                    <Col md={9}>
                                        <Form.Control required="true" type="text" placeholder="Enter Addres" value={updateSaller.Addres} onChange={(e)=>{setUpdateSaller({...updateSaller,Addres:e.target.value})}}/>
                                        <Form.Control.Feedback type="invalid">
                                            Please Enter Addres!
                                        </Form.Control.Feedback>
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