import {Circle} from 'better-react-spinkit';


function Loading() {
    return (
        <center style={{display: "grid", placeItems:"center",height:"100vh"}}>
            <div>
            
                <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" 
                alt="" 
                style={{marginBottom:10}}
                height={200}
                />
                <Circle color="#49C958" size={60}/>
            </div>
        </center>
    );
}

export default Loading;

