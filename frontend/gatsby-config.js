require("dotenv").config({
    path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
    siteMetadata: {
        title: "Ликос | Плазменная резка металла в Екатеринбурге",
        siteUrl: `localhost:5000`
    },
    plugins: [
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
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `images`,
                path: `${__dirname}/src/images/`,
            },
        },
        {
            resolve: "gatsby-source-strapi",
            options: {
                apiURL: process.env.GATSBY_BACKEND_URL || "http://192.168.0.107:1337",
                contentTypes: ["page"],
                queryLimit: 1000,
            },
        },
    ],
};
