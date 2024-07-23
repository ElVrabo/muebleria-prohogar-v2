import "./contactPages.css"
// import InputText from "../../common/inputs/InputText.tsx"
import { Navigation } from "../../common/nav/Navigation.js"
import { Button, Form } from "react-bootstrap"
import React, { useEffect, useRef, useState } from "react"
import emailjs from '@emailjs/browser'
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal)



const ContactPages = ()=>{
   const form = useRef()
   const inputEmail = useRef()
   const inputName = useRef()
   const inputMessage = useRef()

    const sendEmail = async(e)=>{
        e.preventDefault();
        try {
            if(inputEmail.current.value && inputName.current.value && inputMessage.current.value){
            await emailjs.sendForm('service_ha8ud1u','template_2yr8kbs',form.current, 'YWx6lOh4WVjX0KXRT')
            MySwal.fire({
                title:"Tu mensaje se envio correctamente",
                icon:"success"
            })
            inputEmail.current.value = ""
            inputName.current.value = ""
            inputMessage.current.value = ""
            return
            }
            MySwal.fire({
                title:"Debes rellenar todos los campos",
                icon:"error"
            })
            console.log(form.current)
        } catch (error) {
         
        }
    }

    return (
        <>
        <Navigation/>
        <div className="container-form-contact" >
            <Form ref={form} className="form-contact" onSubmit={sendEmail} >
                    <div className="email">
                        <Form.Label>Tu email</Form.Label>
                        <Form.Control ref={inputEmail} type="email" className="input-email" name="from_email"  />
                    </div>
                    <div className="username">
                        <Form.Label>Tu nombre</Form.Label>
                        <Form.Control ref={inputName} type="text" name="from_user" className="input-username" />
                    </div>
                <div className="message">
                    <Form.Label>Tu mensaje</Form.Label>
                    <Form.Control ref={inputMessage} name="mensaje" className="input-message" ></Form.Control>
                </div>
                <div className="container-btn-send">
                    <Button variant="warning" style={{color:"white"}} type="submit" >Enviar</Button>
                </div>
            </Form>
        </div>
        </>
    )
}
export default ContactPages