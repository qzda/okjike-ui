import {
  KeyStickyHeader,
  KeyWriterMode,
  KeyWaterfallMode,
} from "../../../../storage-keys";
import useMounted from "../../utilities/hooks/useMounted";
import TimelineWidthSlider from "../controls/TimelineWidthSlider";
import VanityCheckboxes from "../controls/VanityCheckboxes";
import ControlsWrapper from "../ui/ControlsWrapper";
import SectionLabel from "../ui/SectionLabel";
import Separator from "../ui/Separator";
import SwitchControl from "../ui/SwitchControl";

const TimelineSection = () => {
  const mounted = useMounted();

  return (
    <section className="flex flex-col gap-y-2">
      <SectionLabel className="px-4">时间线</SectionLabel>
      {mounted ? (
        <ControlsWrapper>
          <TimelineWidthSlider />
          <Separator />
          <SwitchControl
            label="瀑布流布局"
            storageKey={KeyWaterfallMode}
          />
          <SwitchControl
            label="固定顶栏"
            storageKey={KeyStickyHeader}
          />
          <SwitchControl
            label="禅模式"
            storageKey={KeyWriterMode}
          />
          <Separator />
          <SectionLabel>简化帖子</SectionLabel>
          <VanityCheckboxes />
        </ControlsWrapper>
      ) : (
        <ControlsWrapper className="animate-pulse h-[115.5px]" />
      )}
    </section>
  );
};

export default TimelineSection;
