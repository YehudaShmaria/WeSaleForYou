import React from 'react';
import { Toast, ToastContainer } from 'react-bootstrap'

function MessageChatCom(props) {
    return (
        <div>
            <div style={{ padding: '10px' }}>
                <div style={props.o ? {display:'flex', justifyContent: 'flex-end' } : {display:'flex', justifyContent: 'flex-start' }}>
                    <div>
                        <Toast>
                            <Toast.Header closeButton={false}>
                                <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                                <strong className="me-auto">{props.f}</strong>
                                <small>11 mins ago</small>
                            </Toast.Header>
                            <Toast.Body>{props.m}</Toast.Body>
                        </Toast>
                    </div>

                </div>

            </div>
        </div>
    );
}

export default MessageChatCom;