import { useEffect, useState } from "react";
import {
  KeyAllVanity,
  KeyLikeCount,
  KeyReplyCount,
  KeyRetweetCount,
} from "../../../../storage-keys";
import { getStorage, setStorage } from "../../utilities/chromeStorage";
import ToggleChevron from "../ui/ToggleChevron";
import { CheckboxControl } from "../ui/checkboxes";

const VanityCheckboxes = () => {
  const [showVanityCheckboxes, setShowVanityCheckboxes] = useState(false);
  const [hideAll, setHideAll] = useState(false);
  const [hideReply, setHideReply] = useState(false);
  const [hideRetweet, setHideRetweet] = useState(false);
  const [hideLike, setHideLike] = useState(false);

  useEffect(() => {
    const getUserDefaultAll = async () => {
      try {
        const userDefaultAll = await getStorage(KeyAllVanity);
        if (userDefaultAll) {
          setHideAll(userDefaultAll === "hide" ? true : false);
        }
      } catch (error) {
        console.warn(error);
      }
    };
    const getUserDefaultReply = async () => {
      try {
        const userDefaultReply = await getStorage(KeyReplyCount);
        userDefaultReply &&
          setHideReply(userDefaultReply === "hide" ? true : false);
      } catch (error) {
        console.warn(error);
      }
    };
    const getUserDefaultLike = async () => {
      try {
        const userDefaultLike = await getStorage(KeyLikeCount);
        userDefaultLike &&
          setHideLike(userDefaultLike === "hide" ? true : false);
      } catch (error) {
        console.warn(error);
      }
    };
    const getUserDefaultRetweet = async () => {
      try {
        const userDefaultRetweet = await getStorage(KeyRetweetCount);
        userDefaultRetweet &&
          setHideRetweet(userDefaultRetweet === "hide" ? true : false);
      } catch (error) {
        console.warn(error);
      }
    };

    getUserDefaultAll();
    getUserDefaultReply();
    getUserDefaultLike();
    getUserDefaultRetweet();
  }, []);

  const onCheckedChange = async (type, checked) => {
    switch (type) {
      case "all":
        setHideAll(checked);
        setHideReply(checked);
        setHideRetweet(checked);
        setHideLike(checked);
        try {
          await setStorage({
            [KeyAllVanity]: checked ? "hide" : "show",
            [KeyReplyCount]: checked ? "hide" : "show",
            [KeyRetweetCount]: checked ? "hide" : "show",
            [KeyLikeCount]: checked ? "hide" : "show",
          });
        } catch (error) {
          console.warn(error);
        }
        break;

      case "reply":
        setHideReply(checked);
        try {
          await setStorage({
            [KeyReplyCount]: checked ? "hide" : "show",
          });
        } catch (error) {
          console.warn(error);
        }
        break;

      case "retweet":
        setHideRetweet(checked);
        try {
          await setStorage({
            [KeyRetweetCount]: checked ? "hide" : "show",
          });
        } catch (error) {
          console.warn(error);
        }
        break;

      case "like":
        setHideLike(checked);
        try {
          await setStorage({
            [KeyLikeCount]: checked ? "hide" : "show",
          });
        } catch (error) {
          console.warn(error);
        }
        break;
    }
  };

  return (
    <>
      <CheckboxControl
        label="隐藏帖子下的数字"
        labelExtras={
          <ToggleChevron
            pressed={showVanityCheckboxes}
            onClick={setShowVanityCheckboxes}
          />
        }
        checked={hideAll}
        onCheckedChange={checked => onCheckedChange("all", checked)}
        crossedIcon
      />
      {showVanityCheckboxes && (
        <div className="pl-3 flex flex-col gap-4 mb-2">
          <CheckboxControl
            crossedIcon
            label="回复"
            onCheckedChange={checked => onCheckedChange("reply", checked)}
            checked={hideReply}
          />
          <CheckboxControl
            crossedIcon
            label="转发"
            onCheckedChange={checked => onCheckedChange("retweet", checked)}
            checked={hideRetweet}
          />
          <CheckboxControl
            crossedIcon
            label="点赞"
            onCheckedChange={checked => onCheckedChange("like", checked)}
            checked={hideLike}
          />
        </div>
      )}
    </>
  );
};

export default VanityCheckboxes;
