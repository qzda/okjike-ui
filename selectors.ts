const mainWrapper = `#root > div.mantine-ScrollArea-root > div.mantine-ScrollArea-viewport > div`;
const navBar = `${mainWrapper} > div.navbar`;
const postsWrapper = `${mainWrapper} .mantine-Container-root > div > div`;
const addNewPost = `${postsWrapper} > :nth-child(1)`;
const posts = `${postsWrapper} > :nth-child(n+2)`;

const selectors = {
  mainWrapper,
  navBar,
  postsWrapper,
  addNewPost,
  posts,
} as const;

export default selectors;
