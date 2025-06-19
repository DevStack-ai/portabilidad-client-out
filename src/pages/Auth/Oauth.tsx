/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from "react";
import { toAbsoluteUrl } from "../../_metronic/helpers";
import { getToken } from "./helpers/_request";
import { useAuth } from "../../providers";
import { getUserByToken } from "../../providers/_requests";

const Oauth = () => {
    //get code from url params
    const [message, setMessage] = useState("Bienvenido, Verificando acceso...");
    const [loading, setLoading] = useState(true);
    const { saveAuth, setCurrentUser } = useAuth();

    useEffect(() => {
        (async () => {
            const queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString);
            const code = urlParams.get("code");

            if (code) {
                try {
                    const query = await getToken(code);
                    console.log("Response from token request:", query);
                    const token = query.data?.access_token;
                    if (token) {
                        setMessage("Acceso verificado, redirigiendo...");
                        saveAuth({
                            token: token
                        })
                        const query = await getUserByToken(token);
                        const user = query.data;
                        console.log("User data:", user);
                        setCurrentUser(user);
                    }
                } catch (error) {
                    console.error("Error fetching token:", error);
                    setMessage("Error al verificar el acceso, redirigiendo...");
                } finally {
                    setLoading(false);
                }
            } else {
                setMessage("Código no encontrado, redirigiendo...");
                setLoading(false);
            }
        })()
    }, []);

    return (
        <div className="d-flex flex-column flex-lg-row flex-column-fluid h-100 flex-reverse-important">
            <div
                className="d-flex flex-lg-row-fluid w-lg-50 bgi-size-cover bgi-position-center order-1 order-lg-2"
                style={{
                    backgroundImage: `url(${toAbsoluteUrl("/media//misc/auth-bg.png")})`,
                }}
            >
                <div className="d-flex flex-column flex-center py-7 py-lg-15 px-5 px-md-15 w-100">
                    <a className="mb-0 mb-lg-12">
                        <img
                            alt="Logo"
                            src={toAbsoluteUrl("/media/logos/default-dark.png")}
                            className="h-60px h-lg-75px"
                        />
                    </a>
                </div>
            </div>
            <div className="d-flex flex-column flex-lg-row-fluid w-lg-50 p-10 order-2 order-lg-1">
                <div className="d-flex flex-center flex-column flex-lg-row-fluid">
                    <div className="w-lg-500px p-10">
                        <span className="text-center mb-10">
                            <h1 className="text-dark fw-bolder mb-3">{message}</h1>
                            <div className="text-gray-500 fw-semibold fs-6">
                                {loading && <div className="spinner-border text-primary" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>}
                            </div>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};


export { Oauth };
