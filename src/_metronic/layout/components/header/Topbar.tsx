/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC, useEffect, useState } from "react";
import { ThemeModeSwitcher } from "../../../partials";
import moment from "moment/moment";
import { KTIcon } from "../../../helpers";
import { useSelector } from "react-redux";
import { BasicTableState, ReduxState } from "../../../../providers";
import axios from "axios";

const Topbar: FC = () => {
  const [date, setDate] = useState(new Date());
  const [count, setCount] = useState<any>({});
  const portasout: BasicTableState = useSelector((state: ReduxState) => state.portasout);

  //Replaces componentDidMount and componentWillUnmount
  useEffect(() => {
    var timerID = setInterval(() => tick(), 1000);
    return function cleanup() {
      clearInterval(timerID);
    };
  });
  function tick() {
    setDate(new Date());
  }

  useEffect(() => {
    (async () => {

      const query = await axios.get(`${import.meta.env.VITE_API_URL}/porta-request-out/in-wait`)
      const count = query.data.count_in_wait
      setCount(count)
    })();
  }, [portasout.dataList.length]);

  return (
    <div className="d-flex flex-shrink-0">
      <div className="d-flex align-items-center ms-3">
        <div className="dropdown">
          <button
            type="button"
            id="dropdownMenu2"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            style={{ border: "none", background: "none" }}>
            <KTIcon
              iconName="notification"
              style={{ fontSize: "30px", color: !!(count["15"] + count["16"]) ? "#F00" : "black" }}
            />
          </button>
          <ul className="dropdown-menu p-5 mt-5 dropdown-menu-start" aria-labelledby="dropdownMenu2" style={{ minWidth: "300px" }}>
            {!!count["15"] && <li>
              <p>
                Tienes <b>{count["15"]}</b> transacciones en estado <b>'Oferta Pospago a la Espera Cliente Interactúe'</b>. Por favor, da seguimiento oportuno.
              </p>
            </li>}
            {!!count["16"] && <li><p>
              Tienes <b>{count["16"]}</b> transacciones en estado <b>'Oferta Pospago B2B SOHO a la Espera Cliente Interactúe'</b>. Por favor, da seguimiento oportuno.
            </p>
            </li>}
          </ul>
        </div>

        <div className="d-flex flex-column mx-5">
          <b className="text-muted">{moment(date).format("DD/MM/YYYY hh:mm:ss")}</b>
        </div>
      </div>

      <div className="d-flex align-items-center ms-3">
      </div>
    </div>
  );
};
export { Topbar };
