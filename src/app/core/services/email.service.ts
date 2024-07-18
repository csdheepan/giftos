import { Injectable } from '@angular/core';
import emailjs from '@emailjs/browser';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor() { }

  generateCode(mailContent:any) {
   
    emailjs.init({
      publicKey: "Hs3fVEmocwggW4JRi",
    });

    emailjs.send('service_l1ya5qu', 'template_jb2kulq', mailContent)
      .then(
        () => {
          console.log('Mail had sent successfully');
        },
        (error) => {
          console.log('Mail had not sent successfully');
        },
      );

        
  }

  
}
