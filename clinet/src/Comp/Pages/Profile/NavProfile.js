import {Button,ButtonGroup,DropdownButton,Dropdown} from 'react-bootstrap'
import { useRouteMatch } from 'react-router'
import {LinkContainer} from 'react-router-bootstrap'

const NavProfileCom = (props) =>
{
    const {pate, url} = useRouteMatch();

    return (<div style={{textAlign:"left", marginTop:"30px"}}>
        <ButtonGroup size='lg' vertical>
            <LinkContainer to={`${url}`}>
              <Button>User Information</Button>
            </LinkContainer>
            
            <LinkContainer to={`${url}/update`}>
              <Button>Update User Account</Button>
            </LinkContainer>
            
            <LinkContainer to={`${url}/delete`}>
              <Button>Delete User Account</Button>
            </LinkContainer>

            {
                props.type != "Saller" ?  <LinkContainer to="/createsaller">
                <Button>Become A Saller</Button>
              </LinkContainer>:<LinkContainer to="/mangeproduct/saller">
                 <Button>Mange Saller Account</Button>
              </LinkContainer>
            }
            
            {/* <DropdownButton as={ButtonGroup} title="Dropdown" id="bg-vertical-dropdown-3">
                <Dropdown.Item eventKey="1">Dropdown link</Dropdown.Item>
                <Dropdown.Item eventKey="2">Dropdown link</Dropdown.Item>
            </DropdownButton> */}
            </ButtonGroup>
    </div>)

}
export default NavProfileCom