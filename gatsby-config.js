module.exports = {
  siteMetadata: {
    title: `suite lab`,
    author: `yoon.homme`,
    description: `반갑습니다.
Software Engineer 윤우식 입니다.
기술과 커뮤니케이션의 힘이 세상을 바꾼다고 믿습니다.
편리한 세상으로 나아가기 위해 고민하고 개발합니다.
`,
    siteUrl: `https://suitee.me`,
    resumeUrl: `http://resume.suitee.me`,
    email: `woosiks.io@gmail.com`,
    social: {
      instagram: `yoon.homme`,
      github: `suites`,
      linkedin: `suitee`,
    },
    categories: [
      {
        name: "web",
        slug: "web",
        color: "#0c9ee4",
        icon: "../svg/categories/design.svg",
        link: "/category/web"
      },
      {
        name: "algorithm",
        slug: "algorithm",
        color: "#f7615f",
        icon: "../svg/categories/dev.svg",
        link: "/category/algorithm"
      },
      {
        name: "blog",
        slug: "blog",
        color: "#ffa22b",
        icon: "../svg/categories/self.svg",
        link: "/category/blog"
      },
      {
        name: "deep learning",
        slug: "deep learning",
        color: "#ffa22b",
        icon: "../svg/categories/self.svg",
        link: "/category/deep-learning"
      }
    ]
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`
      }
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          `gatsby-remark-code-titles`,
          {
            resolve: "gatsby-remark-embed-youtube",
            options: {
              width: 650,
              height: 365
            }
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 700,
              linkImagesToOriginal: false
            }
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`
            }
          },
          {
            resolve: "gatsby-remark-custom-blocks",
            options: {
              blocks: {
                simple: {
                  classes: "simple",
                  title: "optional"
                },
                info: {
                  classes: "info",
                  title: "optional"
                },
                alert: {
                  classes: "alert",
                  title: "optional"
                },
                notice: {
                  classes: "notice",
                  title: "optional"
                },
                imageSmall: {
                  classes: "image-small"
                },
                imageMedium: {
                  classes: "image-medium"
                }
              }
            }
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: "language-",
              inlineCodeMarker: null,
              aliases: {},
              noInlineHighlight: false
            }
          },
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`
        ]
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `suite.lab | 윤옴므의 기술블로그`,
        short_name: `suite.lab`,
        start_url: `/`,
        background_color: `rgb(33, 36, 45)`,
        theme_color: `#0c9ee4`,
        display: `minimal-ui`,
        icon: `content/assets/favicon.png`
      }
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-91992546-2"
      }
    },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        output: `/sitemap.xml`
      }
    },
    {
      resolve: `gatsby-plugin-disqus`,
      options: {
        shortname: `suitelab`
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-twitter`,
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-typescript`,
  ]
};
