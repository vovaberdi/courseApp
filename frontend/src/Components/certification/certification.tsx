import Student from "../../models/studentModal";
import { store } from "../../store/store";
import "./certification.css";
import axios from "axios";
import Instructor from "../../models/instructorModel";
import { useEffect, useState } from "react";
import React from "react";
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

function Certification(props:Student): JSX.Element {
    const printRef = React.useRef() as React.MutableRefObject<any>;

    const handleDownloadPdf = async () => {
        const element = printRef.current;
        const canvas = await html2canvas(element, {width: 950, height: 1500});
        const data = canvas.toDataURL('image/png');
    
        const pdf = new jsPDF('p', 'in', [150, 300]);
        const imgProperties = pdf.getImageProperties(data);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight =
          (imgProperties.height * pdfWidth) / imgProperties.width;
    
        pdf.addImage(data, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('print.pdf')
         }



    const [instructor, setInstructor] = useState<Instructor>();


    useEffect(() => {
      const url = `http://localhost:3001/instructor/${props.instructor}`;
      axios.get(url)
     .then((response) => {console.log(response.data);

       setInstructor(response.data[0]);

     }).catch((error) => {console.log("error", error);});
 }, []);

 

    const signature = store.getState().StudentState.student;
    const date = new Date();

// ✅ Reset a Date's time to midnight
date.setHours(0, 0, 0, 0);

// ✅ Format a date to YYYY-MM-DD (or any other format)
function padTo2Digits(num: { toString: () => string; }) {
  return num.toString().padStart(2, '0');
}

function formatDate(date: { getFullYear: () => any; getMonth: () => number; getDate: () => { toString: () => string; }; }) {
  return [
    date.getFullYear(),
    padTo2Digits(date.getMonth() + 1),
    padTo2Digits(date.getDate()),
  ].join('-');
}

    return (
        <div className="certification">

        <button type="button" onClick={handleDownloadPdf}>
            Download as PDF
        </button>
  

        
    <div ref={printRef}>
               
        <div className="div1">
        <div><p className="boldUnderlineTop">תוספת
))2(5 תקנה)</p></div>
        <p className="boldUnderlineTop">אישור על הדרכת עובד לביצוע עבודה בגובה</p>

            <div >
                <h5><p className="boldUnderline">א. המבצע</p></h5>
                <p>תופש המפעל/ מבצע הבניה/ בעל מכונת הרמה/ אחר (מחק את המיותר) ________</p>
                <p>שם ומשפחה ________________ ת.ז. _____________ שם המפעל_________________</p>
                <p>כתובת _____________________ מיקוד ___________ טלפון _____________</p>
            </div>
            <div>
                <h5><p className="boldUnderline">ב. פרטי מדריך העבודה בגובה</p></h5>
                <p>שם ומשפחה <span className="underlineText">{instructor?.first_name} {instructor?.last_name}</span> ת.ז. <span className="underlineText">{instructor?.personal_id}</span></p>
                <p>ותק וניסיון בעבודה בגובה )בשנים( <span className="underlineText">{instructor?.years_of_experience}</span>תעודה מס'<span className="underlineText">{instructor?.license_number}</span> בתוקף עד <span className="underlineText">{instructor?.license_exp_date.toString().split('T')[0]}</span></p>
                <p>כתובת     <span className="underlineText">{instructor?.address}</span>
 טלפון <span className="underlineText">{instructor?.tel}</span></p>
            </div>
            <div>
                <h5><p className="boldUnderline">ג. פרטי העובד שהודרך לביצוע עבודה בגובה</p></h5>
                <p>שם המשפחה <span className="underlineText">{props.last_name}</span> שם פרטי <span className="underlineText">{props.first_name}</span> שם האב _____________</p>
                <p>מס' ת.ז. <span className="underlineText">{props.personal_id}</span> שנת לידה <span className="underlineText">{(props.data_of_birth).toString().split('T')[0]}</span> מקצוע _______________</p>
                <p>כתובת <span className="underlineText">{props.address}</span></p>
            </div>
            <div>
                <h5><p className="boldUnderline">ד. תוקף האישור</p></h5>
                <p>האישור בתוקף מיום <span className="underlineText">{formatDate(new Date())}</span> עד יום <span className="underlineText">{formatDate(new Date(+2))}</span>(תוקף ההדרכה לא יעלה על שנתיים)</p>
            </div>
            <div>
                <h5><p className="boldUnderline">ה.  הצהרת המדריך</p></h5>
                <p>אני החתום מטה מצהיר בזה כי האדם שפרטיו מפורטים בסעיף (ג) לעיל, הודרך על </p>
                <p>ידי לשמש כאדם העובד בגובה בתחומים אלה: (1) על סולמות;(2) מתוך סלים</p>
                <p>להרמת אדם; (3) מתוך בימות הרמה מתרוממות ופיגומים ממוכנים; (4) בתוך</p>
                <p>מקום מוקף;(5) מעל לפיגומים נייחים; (6) מעל גגות; (7) מעל מבנה</p>
                <p>קונסטרוקציה; (8) בטיפול בעצים וגיזומם;(9) בהקמת בימות והתקנת מערכות</p>
                <p>תאורה והגברה;(מחק את המיותר), וכי הוא עומד בכל הדרישות המפורטות בפרקים ב' ו – ג' לתקנות</p>
                <p>הבטיחות בעבודה (עבודה בגובה), התשס"ז – 2006 .(להלן- התקנות).</p>
                <p><span className="underlineText">{formatDate(new Date())}</span> <span className="underlineText">{instructor?.first_name} {instructor?.last_name}</span> <img src={`${signature}`} /></p>
                <p>   תאריך  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   שם המדריך       &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   חתימה</p>
            </div>
            <div>
                <h5><p className="boldUnderline">ו. הצהרת העובד בגובה</p></h5>
                <p>אני מצהיר בזה שכל הנתונים האישיים המפורטים בסעיף (ג) לעיל נכונים, וכי הודרכתי לבצע עבודה </p>
                <p>בגובה, על ידי מדריך העבודה בגובה <span className="underlineText">{instructor?.first_name} {instructor?.last_name}</span> כנדרש בתקנה 5(2).</p>
                <p><span className="underlineText">{formatDate(new Date())}</span> <span className="underlineText">{props.first_name}</span> <img src={`${signature}`} /></p>
                <p>   תאריך  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   שם העובד      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   חתימה</p>
            </div>
        </div>
    </div>
    {/* <span className="underlineText">{instructor?.first_name} {instructor?.last_name}</span> */}
    {/* <span className="underlineText">{instructor?.last_name}</span> */}

    {/* <span className="underlineText">{instructor?.address}</span>

    <span className="underlineText">{instructor?.personal_id}</span>
    <span className="underlineText">{instructor?.data_of_birth.toString().split('T')[0]}</span>

    <span className="underlineText">{instructor?.tel}</span>
    <span className="underlineText">{instructor?.years_of_experience}</span>
    <span className="underlineText">{instructor?.license_number}</span>
    <span className="underlineText">{instructor?.license_exp_date.toString().split('T')[0]}</span> */}



     
			
        </div>
    );
}

export default Certification;
