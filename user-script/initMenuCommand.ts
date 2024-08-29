export function initMenuCommand() {
  // @ts-ignore
  GM_registerMenuCommand(
    "显示/隐藏侧边栏",
    function (event: MouseEvent | KeyboardEvent) {
      alert("🚧施工中");
    },
    {
      autoClose: false,
    }
  );
}
