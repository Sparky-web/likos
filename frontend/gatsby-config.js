require("dotenv").config({
    path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
    siteMetadata: {
        title: "Ликос | Плазменная резка металла в Екатеринбурге",
        siteUrl: `localhost:5000`
    },
    plugins: [
        `gatsby-plugin-minify`,
        "gatsby-plugin-react-helmet",
        "gatsby-plugin-sitemap",
        "gatsby-plugin-offline",
        {
            resolve: "gatsby-plugin-manifest",
            options: {
                icon: "src/images/icon.png",
            },
        },
        `gatsby-plugin-image`,
        `gatsby-plugin-sharp`,
        `gatsby-transformer-sharp`,
        {
            resolve: "gatsby-source-filesystem",
            options: {
                name: "images",
                path: "./src/images/",
            },
            __key: "images",
        },
        {
            resolve: "gatsby-source-strapi",
            options: {
                apiURL: process.env.GATSBY_BACKEND_URL || "http://localhost:1337",
                contentTypes: ["gallery", "page"],
                queryLimit: 1000,
            },
        },
    ],
};
