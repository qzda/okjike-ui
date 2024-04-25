import { KeyExtensionStatus } from "../../../../storage-keys";
import ControlsWrapper from "../ui/ControlsWrapper";
import SwitchControl from "../ui/SwitchControl";

export default function ExtensionStatus() {
  return (
    <ControlsWrapper>
      <SwitchControl label="启用扩展" storageKey={KeyExtensionStatus} />
    </ControlsWrapper>
  );
}
