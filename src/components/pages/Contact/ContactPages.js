import "./contactPages.css"
import InputText from "../../common/inputs/InputText.tsx"
import { Navigation } from "../../common/nav/Navigation.js"
import { Button } from "react-bootstrap"
import React, { useEffect, useRef, useState } from "react"
import emailjs from '@emailjs/browser'




const ContactPages = ()=>{
   const form = useRef()

    const sendEmail = async(e)=>{
        e.preventDefault();
        try {
         await emailjs.sendForm('service_ha8ud1u','template_2yr8kbs',form.current, 'YWx6lOh4WVjX0KXRT')
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
                        <input type="email" className="input-email" name="from_email"  />
                    </div>
                    <div className="username">
                        <label>Tu nombre</label>
                        <input type="text" name="from_user" className="input-username" />
                    </div>
                <div className="message">
                    <label>Tu mensaje</label>
                    <textarea name="mensaje" className="input-message" ></textarea>
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