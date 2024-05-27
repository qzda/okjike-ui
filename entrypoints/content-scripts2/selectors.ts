interface selector {
  [key: string]: string | selector
}

const selectors: selector = {}

// Layout
selectors.mainWrapper = `#__next > div > div`

selectors.navBar = `${selectors.mainWrapper} > div`
selectors.navBarItems = {
  links: {
    logo: `${selectors.navBar} > div > div > a:nth-child(1)`,
    home: `${selectors.navBar} > div > div > a:nth-child(2)`,
    recommend: `${selectors.navBar} > div > div > a:nth-child(3)`,
  },
  serchWrapper: `${selectors.navBar} > div > div:nth-child(2)`,
  serchWrapperInput: `${selectors.navBar} > div > div:nth-child(2) > input`,
}

selectors.mainColumn = `${selectors.mainWrapper} > div:nth-child(2) > div`
selectors.mainColumnItems = {
  /** 发帖 */
  createPostWrapper: `${selectors.mainColumn} > div:first-child`,
  /** 新帖提示 */
  newPost: `${selectors.mainColumn} > div[class*="NewMessageNoti"]`,
  /** 帖子列表 */
  posts: `${selectors.mainColumn} > div:last-child`,
}

selectors.sideBar = `${selectors.mainWrapper} > div:nth-child(2) > aside`
selectors.sideBarItems = {
  userInfo: `${selectors.sideBar} > div`,
  groupInfo: `${selectors.sideBar} > div:nth-child(2)`,
  footer: `${selectors.sideBar} > footer`,
}

export default selectors
