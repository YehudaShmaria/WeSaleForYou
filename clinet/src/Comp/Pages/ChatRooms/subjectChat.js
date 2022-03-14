import React from 'react';
import { Badge } from 'react-bootstrap';

function SubjectChatCom(props) {
    return (
        <div>
            <div style={{ padding: '3px' }}>
                <div style={{ padding: '10px', textAlign: 'left' }}>
                    <h4><Badge bg="warning">{props.Name}</Badge></h4>
                </div>
            </div>

        </div>
    );
}

export default SubjectChatCom;