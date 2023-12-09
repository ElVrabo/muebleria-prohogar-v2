import "./contactPages.css"
import InputText from "../../common/inputs/InputText.tsx"
import { Navigation } from "../../common/nav/Navigation"
import { Button } from "react-bootstrap"
import React from "react"


const ContactPages = ()=>{
    return (
        <>
        <Navigation/>
        <div className="container-form-contact" >
            <form className="form-contact" >
                <h3>Contactanos</h3>
                <div className="container-name-lastname">
                    <div className="name">
                        <label>Nombre</label>
                        <InputText type="text" width="300px" />
                    </div>
                    <div className="lastname">
                        <label>Apellido</label>
                        <InputText type="text" width="300px" />
                    </div>
                </div>
                    <div className="email">
                        <label>Email</label>
                        <input type="email" className="input-email" />
                    </div>
                <div className="send-message">
                    <label>Tu mensaje</label>
                    <textarea></textarea>
                </div>
                <div className="container-btn-send">
                    <Button variant="warning" style={{color:"white"}} >Enviar</Button>
                </div>
            </form>
        </div>
        </>
    )
}
export default ContactPages