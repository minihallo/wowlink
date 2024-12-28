/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://wowlink.me',
    generateRobotsTxt: true,
    exclude: ['/admin/*', '/private/*'] // 제외할 페이지
  }