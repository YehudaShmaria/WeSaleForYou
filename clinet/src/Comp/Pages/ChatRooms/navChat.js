import React from 'react';
import {Nav} from 'react-bootstrap'
function NavChatCom(props) {
    return (
        <div>
            <Nav fill variant="tabs" defaultActiveKey="/home">
                <Nav.Item>
                    <Nav.Link>LapTop</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link>Smart Phone</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link>Head Phones</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link>Smart Watch</Nav.Link>
                </Nav.Item>
            </Nav>
        </div>
    );
}

export default NavChatCom;