import { useContext,useEffect, useState } from "react"
import { Col, Container, Row } from "react-bootstrap";
import { sallerContext } from "../sallerContext"

const SallerInfromationCom = () =>
{
    const {saller,setSaller} = useContext(sallerContext);
    const [date,setDate] = useState({Creadte:"",Update:""})

    useEffect(()=>
    {
        if(saller)
        {
            setDate({Creadte:fixTheDate(saller.createdAt),Update:fixTheDate(saller.updatedAt)});
        }
    },[saller])

    const fixTheDate = (convertDate) =>
    {
        const d = new Date(convertDate);
        let normalDate = d.getHours() + ":" + d.getMinutes() + ", " + d.toDateString();
        return normalDate;
    }

    return(
        <div>
            <Container>
                <div>
                    <h3 style={{color:"yellowgreen",backgroundColor:"whitesmoke",padding:"10px"}}>Seller Infromation</h3>
                </div>
                <div>
                    <Row>
                        <Col md={7} sm={7} xs={12}>
                            <div style={{textAlign:"left", marginLeft:"20px"}}>
                                {
                                    saller ? <>
                                        <h4>Name: {saller.Name}</h4>
                                        <h4>Phone Number: {saller.PhoneNumber}</h4>
                                        <h4>Addres: {saller.Addres}</h4>
                                    </>:null
                                }
                               
                            </div>
                        </Col>
                        <Col md={5} sm={5} xs={12}>
                        <div style={{textAlign:"left"}}>
                            <p><b>Created At:</b> {date.Creadte}</p>
                            <p><b>Updated At:</b> {date.Update}</p>
                        </div>
                        </Col>
                    </Row>
                    
                </div>
            </Container>
             
        </div>
    )
}
export default SallerInfromationCom