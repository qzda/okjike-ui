import { removeElementById } from "../utils/element";
import { devLog } from "../utils/log";
import { addStyles } from "../utils/style";

export function initMainColumn(nodes: Node[]) {
  const div = document.createElement("div");
  div.id = "okjike-initMainColumn";
  devLog("nodes", nodes);
  nodes.forEach((node) => {
    div.append(node);
  });
  removeElementById(div.id);
  document.body.appendChild(div);

  addStyles(
    div.id,
    `
      #${div.id} {
        position: fixed;
        z-index: 100;
        top: 0;
        left: 0;
        width: 50vw;
        height: 100vh;
        padding: 1rem;
        overflow-y: scroll;
        background-color: gray;
        opacity: 0.5;
      }
    `
  );
}
