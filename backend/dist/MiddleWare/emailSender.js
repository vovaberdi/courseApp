"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const personalEmail = process.env.PERSONAL_EMAIL;
const emailPassword = process.env.EMAIL_PASSWORD;
const nodemailer_1 = require("nodemailer");
function emailSender(studentEmail, pdfFilePath) {
    return __awaiter(this, void 0, void 0, function* () {
        // Transporter to send emails from your account
        const transporter = (0, nodemailer_1.createTransport)({
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
        function sendEmail() {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    let info = yield transporter.sendMail(mailOptions);
                    console.log(`Message sent: ${info.messageId}`);
                }
                catch (error) {
                    console.error(`Error sending email: ${error}`);
                }
            });
        }
        // Call the sendEmail function to send the email with the PDF.
        sendEmail();
    });
}
exports.default = emailSender;
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
