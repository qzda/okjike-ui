import { KeySearchBar, KeyTweetButton } from "../../../../storage-keys";
import SectionLabel from "../ui/SectionLabel";
import SwitchControl from "../ui/SwitchControl";

const InterfaceSection = () => (
  <section className="flex flex-col gap-y-2">
    <SectionLabel htmlFor="user-control-interface">界面</SectionLabel>
    <div id="user-control-interface">
      <form className="flex flex-col items-center justify-between px-4 dark:bg-x-bgTwoDark bg-x-bgTwo rounded-2xl">
        <div className="w-full py-4">
          <div className="flex flex-col gap-y-4">
            <SwitchControl label="搜索栏" storageKey={KeySearchBar} />
            <SwitchControl label="发帖" storageKey={KeyTweetButton} />
          </div>
        </div>
      </form>
    </div>
  </section>
);

export default InterfaceSection;
