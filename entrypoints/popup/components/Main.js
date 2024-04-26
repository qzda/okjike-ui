import ExtensionStatus from "./sections/ExtensionStatus";
import InterfaceSection from "./sections/InterfaceSection";
import TimelineSection from "./sections/TimelineSection";

const Main = () => (
  <main className="flex flex-col p-2 gap-y-4">
    <ExtensionStatus />
    <TimelineSection />
    <InterfaceSection />
  </main>
);

export default Main;
