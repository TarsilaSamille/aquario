import { Navbar } from "@/components/navbar";
import { AquariumDashboardComponent } from "@/components/aquarium-dashboard";
import withAuth from "@/components/withAuth";

const Dashboard = () => {
  return (
    <div>
      <Navbar />
      <AquariumDashboardComponent />
    </div>
  );
};

export default Dashboard;
