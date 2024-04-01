/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC } from "react";
import moment from "moment";

type Props = {
  user: any;
  date: string;
};

const UserDateCell: FC<Props> = ({ user, date }) => (
  <div>
    {user[date]
      ? moment(user[date]).format(
        "DD/MM/YYYY hh:mm A",
      ) : ""}
  </div>
);

export { UserDateCell };
