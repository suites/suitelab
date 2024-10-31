module.exports = {
  siteMetadata: {
    title: "suite.lab",
    author: "yoon.homme",
    description: `기술과 커뮤니케이션의 힘이 세상을 바꾼다고 믿습니다.
편리한 세상으로 나아가기 위해 고민하고 개발합니다.
`,
    siteUrl: "https://suitee.me",
    resumeUrl: "http://resume.suitee.me",
    email: "woosiks.io@gmail.com",
    social: {
      instagram: "yoon.homme",
      github: "suites",
      linkedin: "suitee",
    },
    categories: [
      {
        name: "web",
        slug: "web",
        color: "#0c9ee4",
        icon: "cactusBlue",
        link: "/category/web",
      },
      {
        name: "network",
        slug: "network",
        color: "#C0D545",
        icon: "cactusGreen",
        link: "/category/network",
      },
      {
        name: "computer science",
        slug: "cs",
        color: "#ffa22b",
        icon: "cactusYellow",
        link: "/category/cs",
      },
      {
        name: "infra",
        slug: "infra",
        color: "#f7615f",
        icon: "cactusRed",
        link: "/category/infra",
      },
      {
        name: "algorithm",
        slug: "algorithm",
        color: "#0c9ee4",
        icon: "cactusBlue",
        link: "/category/algorithm",
      },
      {
        name: "deep learning",
        slug: "deep-learning",
        color: "#C0D545",
        icon: "cactusGreen",
        link: "/category/deep-learning",
      },
    ],
  },
  plugins: [
    "gatsby-plugin-react-helmet",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/content/blog`,
        name: "blog",
      },
    },
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "suite.lab | 윤옴므의 기술블로그",
        short_name: "suite.lab",
        start_url: "/",
        background_color: "rgb(33, 36, 45)",
        theme_color: "#0c9ee4",
        display: "minimal-ui",
        icon: "static/images/favicon.png",
      },
    },
    {
      resolve: "gatsby-plugin-mdx",
      options: {
        extensions: [".md", ".mdx"],
        remarkPlugins: [require("remark-math"), require("remark-html-katex")],
        gatsbyRemarkPlugins: [
          "gatsby-remark-code-titles",
          {
            resolve: "gatsby-remark-embed-youtube",
            options: {
              width: 650,
              height: 365,
            },
          },
          {
            resolve: "gatsby-remark-images",
            options: {
              maxWidth: 700,
              linkImagesToOriginal: false,
            },
          },
          {
            resolve: "gatsby-remark-responsive-iframe",
            options: {
              wrapperStyle: "margin-bottom: 1.0725rem",
            },
          },
          {
            resolve: "gatsby-remark-prismjs",
            options: {
              classPrefix: "language-",
              inlineCodeMarker: null,
              aliases: {},
              noInlineHighlight: false,
            },
          },
          "gatsby-remark-copy-linked-files",
          "gatsby-remark-smartypants",
          {
            resolve: "gatsby-remark-katex",
            options: {
              strict: "ignore",
            },
          },
        ],
      },
    },
    {
      resolve: "gatsby-plugin-google-analytics",
      options: {
        trackingId: "UA-91992546-2",
      },
    },
    {
      resolve: "gatsby-plugin-sitemap",
    },
    {
      resolve: "gatsby-plugin-disqus",
      options: {
        shortname: "suitelab",
      },
    },
    "gatsby-transformer-sharp",
    "gatsby-plugin-sharp",
    "gatsby-plugin-twitter",
    "gatsby-plugin-offline",
    "gatsby-plugin-styled-components",
    "gatsby-plugin-typescript",
    "gatsby-plugin-netlify",
  ],
  graphqlTypegen: true,
};
