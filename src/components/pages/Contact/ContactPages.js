import "./contactPages.css"
import InputText from "../../common/inputs/InputText.tsx"
import { Navigation } from "../../common/nav/Navigation.js"
import { Button } from "react-bootstrap"
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
            <form ref={form} className="form-contact" onSubmit={sendEmail} >
                    <div className="email">
                        <label>Tu email</label>
                        <input ref={inputEmail} type="email" className="input-email" name="from_email"  />
                    </div>
                    <div className="username">
                        <label>Tu nombre</label>
                        <input ref={inputName} type="text" name="from_user" className="input-username" />
                    </div>
                <div className="message">
                    <label>Tu mensaje</label>
                    <textarea ref={inputMessage} name="mensaje" className="input-message" ></textarea>
                </div>
                <div className="container-btn-send">
                    <Button variant="warning" style={{color:"white"}} type="submit" >Enviar</Button>
                </div>
            </form>
        </div>
        </>
    )
}
export default ContactPages