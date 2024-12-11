import Link from "next/link";
import DashboardButton from "@/app/components/DashboardButton";

export default function NotFound() {
  return (
    <div className={`flex flex-col gap-4`}>
      <h2>
        <b>Could not find requested resource</b>
      </h2>
      <DashboardButton>
        <Link href="/dashboard">Return to Dashboard</Link>
      </DashboardButton>
    </div>
  );
}
