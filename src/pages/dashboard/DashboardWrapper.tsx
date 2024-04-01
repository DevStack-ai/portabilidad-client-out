/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC } from "react";
import { toAbsoluteUrl } from "../../_metronic/helpers";
import { PageTitle } from "../../_metronic/layout/core";
import {
  CardsWidget17,
  CardsWidget20,
  CardsWidget7,
  ChartsWidget3,
  ListsWidget26,
} from "../../_metronic/partials/widgets";

const DashboardPage: FC = () => (
  <>
    {/* begin::Row */}
    {/* <div className="row g-5 g-xl-10 mb-5 mb-xl-10">
      <div className="col-md-6 col-lg-6 col-xl-6 col-xxl-3 mb-md-5 mb-xl-10">
        <CardsWidget20
          className="h-md-50 mb-5 mb-xl-10"
          description="Active Projects"
          color="#F1416C"
          img={toAbsoluteUrl("/media/patterns/vector-1.png")}
        />
        <CardsWidget7
          className="h-md-50 mb-5 mb-xl-10"
          description="Professionals"
          icon={false}
          stats={357}
          labelColor="dark"
          textColor="gray-300"
        />
      </div>

      <div className="col-md-6 col-lg-6 col-xl-6 col-xxl-3 mb-md-5 mb-xl-10">
        <CardsWidget17 className="h-md-50 mb-5 mb-xl-10" />
        <ListsWidget26 className="h-lg-50" />
      </div>

      <div className="col-xxl-6">
        <ChartsWidget3 className="h-md-100" />
      </div>
    </div> */}
  </>
);

const DashboardWrapper: FC = () => {
  return (
    <>
      <PageTitle breadcrumbs={[]}>Dashboard</PageTitle>
      <DashboardPage />
    </>
  );
};

export { DashboardWrapper };
