import * as dotenv from 'dotenv';
dotenv.config();
const personalEmail = process.env.PERSONAL_EMAIL;
const emailPassword = process.env.EMAIL_PASSWORD;
import { createTransport } from 'nodemailer';

async function emailSender(studentEmail: string, pdfFilePath: string) {
  // Transporter to send emails from your account
  const transporter = createTransport({
    host: 'smtp.zoho.com',
    secure: true,
    port: 465,
    auth: {
      user: personalEmail,
      pass: emailPassword,
    },
  });

  const mailOptions = {
    from: 'mrnewton@zohomail.com',
    to: studentEmail,
    subject: 'Subject of the Email',
    text: 'Body of the Email',
    attachments: [
      {
        filename: 'certificate.pdf',
        path: pdfFilePath, // Use the file path of the PDF
      },
    ],
  };

  // Function to send the email with the PDF
  async function sendEmail() {
    try {
      let info = await transporter.sendMail(mailOptions);
      console.log(`Message sent: ${info.messageId}`);
    } catch (error) {
      console.error(`Error sending email: ${error}`);
    }
  }

  // Call the sendEmail function to send the email with the PDF.
  sendEmail();
}

export default emailSender;


// import { createTransport } from 'nodemailer';
// import { Readable } from 'stream';


// function emailSender(studentEmail: string, pdfFilePath: Blob) {

//     const CertificationPdf = pdfFilePath;



//     //message objects
// let sendMorningMsg = {
//     from: "mrnewton@zohomail.com",
//     to: studentEmail,
//     cc: "mrnewton@zohomail.com",
//     subject: "It's a beautiful morning",
//     // text: CertificationPdf,
//     File: CertificationPdf
// };


//     //transporter to send emails from our account 
// let transporter = createTransport({
//     host: 'smtp.zoho.com',
//     secure: true,
//     port: 465,
//     auth: {
//         user: "mrnewton@zohomail.com",
//         pass: "Ct6eQvcCDKMCzq"
//     }
// });


//   // Read the PDF file as a Buffer
//   const pdfBuffer = await readFileAsync(pdfPath);

//   const mailOptions = {
//     from: 'your_email@example.com',
//     to: email,
//     subject: 'Subject of the Email',
//     text: 'Body of the Email',
//     attachments: [
//       {
//         filename: 'certificate.pdf',
//         content: pdfBuffer, // Use the Buffer containing the PDF content
//       },
//     ],
//   };

//   await transporter.sendMail(mailOptions);
// }

// function readFileAsync(filePath: string): Promise<Buffer> {
//   return new Promise((resolve, reject) => {
//     const chunks: Uint8Array[] = [];
//     const readable = Readable.from(filePath);

//     readable.on('data', (chunk: Uint8Array) => chunks.push(chunk));
//     readable.on('error', reject);
//     readable.on('end', () => resolve(Buffer.concat(chunks)));
//   });
// }



// transporter.verify((error:any) => {
//     error
//       ? console.log(`There was an error for the email connection: ${error}`)
//       : console.log('Ready to send email');
//   });

//   // Function to send the morning message
//   async function morningMessage() {
//     try {
//       let info = await transporter.sendMail(sendMorningMsg);
//       console.log(`Message sent: ${info.messageId}`);
//     } catch (error) {
//       console.error(`Error sending email: ${error}`);
//     }
//   }

//   // Call the morningMessage function whenever you want to send the email with the PDF.
//   morningMessage();
// }

// export default emailSender;


