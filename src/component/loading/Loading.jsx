// import { Audio,BallTriangle,Bars,Circles,Grid,Hearts,Oval,Puff,TailSpin,ThreeDots } from "react-loader-spinner";
import { Oval } from "react-loader-spinner";

export const Loading = () => {
    return (

        <div className="col-12"
            style={
                {
                    display : 'flex',
                    justifyContent: 'center',
                    alignItems : 'center',
                }
            }>
            {/* <Audio type="Bars" color="#00BFFF" height={1000} width={100} />
            <BallTriangle color="#00BFFF" height={80} width={80} />
            <Circles color="#00BFFF" height={80} width={80}/>
            <Bars color="#00BFFF" height={80} width={80} />
            <Grid color="#00BFFF" height={80} width={80} />
            <Hearts color="#00BFFF" height={80} width={80} /> */}
            <Oval color="#00BFFF" height={80} width={80} />
            {/* <Puff color="#00BFFF" height={80} width={80} />
            <TailSpin color="#00BFFF" height={80} width={80} />
            <ThreeDots color="#00BFFF" height={80} width={80} /> */}
        </div>

    );
};