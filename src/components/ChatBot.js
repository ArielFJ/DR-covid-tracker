import React from 'react';
import assistant from '../img/assistant.png';


function ChatBot() {
    
    return (

        <div className="fixed-bottom mb-2 mr-2">
            <div className="float-right">
                <div >                    
                    <df-messenger                    
                        chat-icon={assistant}
                        intent="WELCOME"
                        chat-title="Magnim"
                        agent-id="e7ebbf67-01d2-479d-9f9c-55ac7be6b2ac"
                        language-code="es"
                        wait-open="true"
                    >                        
                    </df-messenger>
                </div>
            </div>
        </div>

             
    )

}

export default ChatBot;