module.exports = {
  base: '/person/',
  title: '起风的琐碎博客记录',
  description: '全栈成长之路，分享前后端以及 DevOps 相关文章，使各端开发者能够突破瓶颈进一步成长。',
  configureWebpack: {
    resolve: {
      alias: {
        '~@': '/person'
      }
    }
  },
  themeConfig: {
    sidebarDepth: 2,
    // 导航栏
    nav: [
      { text: '主页', link: '/' },
      { text: '随记博客', link: '/Css/css-flex' },
      { text: '思维导图', link: '/Xmind/map' }
    ],
    // 侧边栏
    sidebar: [
      {
        title: 'Css',   // 必要的
        collapsable: false, // 可选的, 默认值是 true,
        children: [
          ['/Css/css-flex', 'Flex布局'],
          ['/Css/scss', 'SCSS简易教程'],
          ['/Css/css-layout', 'CSS常见布局方案'],
          ['/Css/css-classname', 'CSS命名规范'],
          ['/Css/css-base', 'CSS基础知识'],
          ['/Css/css-bfc', 'CSS-BFC']
        ]
      }, 
      {
        title: 'Javascript',   // 必要的
        collapsable: false, // 可选的, 默认值是 true,
        children: [
          ['/Javascript/js-es6-async', 'ES6之async/await']
        ]
      },
      {
        title: 'Npm',   // 必要的
        collapsable: false, // 可选的, 默认值是 true,
        children: [
          ['/Npm/npm-verdaccio', 'window上搭建npm私仓']
        ]
      }
    ],
    // 假定是 GitHub. 同时也可以是一个完整的 GitLab URL
    repo: 'vuejs/vuepress',
    // 自定义仓库链接文字。默认从 `themeConfig.repo` 中自动推断为
    // "GitHub"/"GitLab"/"Bitbucket" 其中之一，或是 "Source"。
    repoLabel: 'GitHub',

    // 以下为可选的编辑链接选项

    // 假如你的文档仓库和项目本身不在一个仓库：
    docsRepo: 'vuejs/vuepress',
    // 假如文档不是放在仓库的根目录下：
    docsDir: 'docs',
    // 假如文档放在一个特定的分支下：
    docsBranch: 'master',
    // 默认是 false, 设置为 true 来启用
    editLinks: true,
    // 默认为 "Edit this page"
    editLinkText: '帮助我们改善此页面！'
  }
}