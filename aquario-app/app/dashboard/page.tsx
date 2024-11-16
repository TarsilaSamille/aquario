"use client";
import withAuth from "@/components/withAuth";
import { Navbar } from "@/components/navbar";
import { AquariumDashboardComponent } from "@/components/aquarium-dashboard";

const Dashboard = () => {
  return (
    <div>
      <Navbar />
      <AquariumDashboardComponent />
    </div>
  );
};

export default withAuth(Dashboard);