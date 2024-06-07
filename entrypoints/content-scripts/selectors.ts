const mainWrapper = `#__next > div > div`
const navBar = `${mainWrapper} > div`
const mainColumn = `${mainWrapper} > div:nth-child(2) > div`
const sideBar = `${mainWrapper} > div:nth-child(2) > aside`
const posts = `${mainColumn} > div:last-child > div`

const selectors = {
  mainWrapper: mainWrapper,

  navBar: `${mainWrapper} > div`,
  navBarItems: {
    links: `${navBar} > div > div`,
    linksItem: {
      logo: `${navBar} > div > div > a:nth-child(1)`,
      home: `${navBar} > div > div > a:nth-child(2)`,
      recommend: `${navBar} > div > div > a:nth-child(3)`,
    },
    serchWrapper: `${navBar} > div > div:nth-child(2)`,
    serchWrapperInput: `${navBar} > div > div:nth-child(2) > input`,
  },

  mainColumn: `${mainWrapper} > div:nth-child(2) > div`,
  mainColumnItems: {
    /** 发帖 */
    newPost: `${mainColumn} > div:has(textarea[placeholder="分享你的想法..."])`,
    /** 新帖提示 */
    newMessage: `${mainColumn} > div[class*="NewMessageNoti"]`,
    /** 帖子列表 */
    posts: posts,
    /** 帖子的操作栏，点赞、评论、分享等 */
    postAction: `${posts} > div article > div:nth-child(2) > div:last-child > div:last-child`,
  },
  sideBar: sideBar,
  sideBarItems: {
    userInfo: `${sideBar} > div`,
    groupInfo: `${sideBar} > div:nth-child(2)`,
    footer: `${sideBar} > footer`,
  },
} as const

export default selectors
