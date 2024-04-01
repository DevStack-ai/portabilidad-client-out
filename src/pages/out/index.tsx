import React, { useCallback, useEffect, useRef, useState } from "react";
import { ListLoading } from "../../_metronic/helpers/components/table/components/loading/ListLoading";
import { sendSignature, validateToken } from "./_requests";
import { toAbsoluteUrl } from "../../_metronic/helpers";
import SignatureCanvas from 'react-signature-canvas'
import toast from "react-hot-toast";

export function OutForm() {

    const canvas: any = useRef(null);
    const [isDone, setisDone] = useState(false);
    const [isLoading, setIsloading] = useState(true);
    const [isValid, setIsValid] = useState(false);
    const [signature, setSignature] = useState<any>(null);
    const [data, setData] = useState<any>({});
    //get query params "token"

    function getSignature() {
        if (canvas.current) {
            const signature = canvas.current.getTrimmedCanvas().toDataURL('image/png');
            setSignature(signature);
        }
    }
    async function sendData() {
        try {
            setIsloading(true);
            await sendSignature(Number(data.id), signature);
            setisDone(true);
            setIsloading(false);

        } catch (error) {
            toast.error("Error al enviar el registro")
            console.log(error)
            setIsloading(false);

        }
    }

    const fetchData = useCallback(async () => {

        try {

            const queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString);

            const token = urlParams.get('token');

            if (token) {

                const query = await validateToken(token);
                console.log(query)
                setData(query.data)
                setIsValid(true);
                setIsloading(false);

            } else {
                setIsValid(false);
            }
        } catch (error) {
            setIsValid(false);
            setIsloading(false);
            console.log(error)
        }
    }, []);

    useEffect(() => {
        fetchData()
    }, []);

    if (isLoading && !isValid) {
        return (
            <ListLoading />
        )
    }

    if (!isValid) {
        return (
            <div className="out-container">
                <img
                    src={toAbsoluteUrl("/media/logos/default.png")}
                    alt="logo"
                    className="h-50px light-logo my-5"
                />
                <h1 className="terxt-center">Token Inválido</h1>
            </div>

        );
    }
    if (isDone) {
        return (
            <div className="out-container">
                <img
                    src={toAbsoluteUrl("/media/logos/default.png")}
                    alt="logo"
                    className="h-50px light-logo my-5"
                />
                <h1 className="terxt-center">Muchas gracias por tu registro</h1>
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => window.close()}
                >

                    Cerrar
                </button>
            </div >
        );
    }
    return (
        <div className="out-container">
            <img
                src={toAbsoluteUrl("/media/logos/default.png")}
                alt="logo"
                className="h-50px light-logo my-5 px-2"
            />
            <div className="container card">
                <div className="py-10 p-lg-10 text-center">
                    <div className="row mb-6 ms-0 px-0">
                        <h1>Bienvenido, {data.phone}</h1>
                    </div>
                    <div className="d-flex justify-content-center">
                        <img src="https://s3.amazonaws.com/casebots2/bots/84cf59b8-6535-4880-afaa-c8a5267c2166.png" className="out-image py-2" />

                    </div>
                    <div>
                        <h2>Por favor, firma en la siguiente área</h2>
                    </div>
                    <SignatureCanvas
                        ref={canvas}
                        onEnd={getSignature}
                        canvasProps={{  className: 'sigCanvas', id: "signature" }} />,
                    <div className=" w-100 pt-15">

                        <button
                            type="submit"
                            className="btn btn-primary"
                            onClick={sendData}
                            disabled={isLoading || !signature}
                        >

                            {(!isLoading) ?
                                <span className="indicator-label">Aceptar</span> :
                                <span className="indicator-label">Cargando ...</span>
                            }
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

