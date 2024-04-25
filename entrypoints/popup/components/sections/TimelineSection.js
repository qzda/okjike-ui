import {
  KeyRemovePromotedPosts,
  KeyRemoveTimelineBorders,
  KeyRemoveTimelineTabs,
  KeyRemoveTopicsToFollow,
  KeyRemoveTweetBorders,
  KeyStickyHeader,
  KeyWriterMode,
} from "../../../../storage-keys";
import useMounted from "../../utilities/hooks/useMounted";
import TimelineWidthSlider from "../controls/TimelineWidthSlider";
import VanityCheckboxes from "../controls/VanityCheckboxes";
import ControlsWrapper from "../ui/ControlsWrapper";
import SectionLabel from "../ui/SectionLabel";
import Separator from "../ui/Separator";
import SwitchControl from "../ui/SwitchControl";
import { LocalStorageCheckboxControl } from "../ui/checkboxes";

const TimelineSection = () => {
  const mounted = useMounted();

  return (
    <section className="flex flex-col gap-y-2">
      <SectionLabel htmlFor="user-control-timeline">时间线</SectionLabel>
      {mounted ? (
        <ControlsWrapper id="user-control-timeline">
          <TimelineWidthSlider />
          <Separator />
          <SwitchControl label="禅模式" storageKey={KeyWriterMode} />
          <SwitchControl label="固定顶栏" storageKey={KeyStickyHeader} />
          <Separator />
          <SectionLabel>简化帖子</SectionLabel>
          <VanityCheckboxes />
          <LocalStorageCheckboxControl label="Promoted Posts" storageKey={KeyRemovePromotedPosts} crossedIcon />
          <LocalStorageCheckboxControl label="Topics to Follow Suggestions" storageKey={KeyRemoveTopicsToFollow} crossedIcon />
          <LocalStorageCheckboxControl label={`Timeline Tabs (For you, Following, lists...)`} storageKey={KeyRemoveTimelineTabs} crossedIcon />
          <LocalStorageCheckboxControl label="Timeline Borders" storageKey={KeyRemoveTimelineBorders} crossedIcon />
          <LocalStorageCheckboxControl label="Tweet Borders" storageKey={KeyRemoveTweetBorders} crossedIcon />
        </ControlsWrapper>
      ) : (
        <ControlsWrapper className="animate-pulse h-[115.5px]" />
      )}
    </section>
  );
};

export default TimelineSection;
