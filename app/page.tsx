import { Footer, Navbar, Services, Welcome } from "./components";
import Benefits from "./components/Benefits";
import ButtonGradient from "./components/ButtonGradient";

declare module "next-auth" {
  interface Session {
    user: {
      _id: string;
      username: string;
      lastName: string;
      accountNumber: string;
      balanceEth: number;
      balancePkr: number;
      firstName: string;
      name: string;
      email: string;
      role?: string; // add any custom fields you have
      avatar?: string; // add any custom fields you have
      cnic?: string; // add any custom fields you have
      dob?: string; // add any custom fields you have
      createdAt?: string; // add any custom fields you have
      isVerified?: boolean; // add any custom fields you have
    };
  }
}

export default function Home() {
  return (
    <>
      <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
        <Navbar />
        <Welcome />
        <Benefits />
        <Services />
        <Footer />
      </div>

      <ButtonGradient />
      {/* <div className="min-h-screen">
      <div className="gradient-bg-welcome">
        <Navbar />
        <Welcome />
      </div>
      <Services />
      <Footer />
    </div> */}
    </>
  );
}
