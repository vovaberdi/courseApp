import "./Signature.css";
import SignatureCanvas from "react-signature-canvas";
import { useCallback, useRef, useState } from "react";
import { store } from "../../store/store";
import { login } from "../../store/student-state";
import axios from "axios";




function Signature(): JSX.Element {
  

    const padRef = useRef(null) as React.MutableRefObject<any>;
    const [signature, setCanvas] = useState<string | undefined>(undefined);
    const [canvasVisibility, setCanvasVisibility] = useState(false);
  
    const clearSignatureCanvas = useCallback(() => {
      padRef?.current?.clear();
      setCanvas(undefined);
      setCanvasVisibility(false);
    }, []);
  
    const handleGetCanvas = useCallback(() => {
        
      const signature = (padRef?.current?.toDataURL());
      store.dispatch(login(signature))
      console.log(signature.toString());

    //   localStorage.setItem("studentSign", JSON.stringify(signature));


  
      setCanvas(signature);
      setCanvasVisibility(true);
    }, []);


    



    return (
        <div className="Signature">

      <SignatureCanvas ref={padRef}canvasProps={{width: 415, height: 200}}/>

      <hr />

      {canvasVisibility && <img src={signature} alt="signature" />}

      <button onClick={clearSignatureCanvas}>clear</button>
      <button onClick={handleGetCanvas}>save</button>

            

      {/* <SignatureCanvas backgroundColor="lightgray" penColor="blue"canvasProps={{ width: 415, height: 200 }}/> */}
			
        </div>
    );
}

export default Signature;
