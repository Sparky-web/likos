import React from "react"

import {graphql, useStaticQuery} from "gatsby";
import {useLocation} from "@reach/router"
import {Helmet} from "react-helmet";

const SEO = ({title, description, image, article}) => {
    const {pathname} = useLocation()
    const {site} = useStaticQuery(query)
    const {
        defaultTitle,
        titleTemplate,
        defaultDescription,
        siteUrl,
        defaultImage,
    } = site.siteMetadata
    const seo = {
        title: title || defaultTitle,
        description: description || defaultDescription,
        image: `${siteUrl}${image || defaultImage}`,
        url: `${siteUrl}${pathname}`,
    }
    return (
        <Helmet title={seo.title} titleTemplate={titleTemplate}>
            <meta name="description" content={seo.description}/>
            {seo.url && <meta property="og:url" content={seo.url}/>}
            {(article ? true : null) && <meta property="og:type" content="article"/>}
            {seo.title && <meta property="og:title" content={seo.title}/>}
            {seo.description && (
                <meta property="og:description" content={seo.description}/>
            )}
            <meta name="twitter:card" content="summary_large_image"/>
            {seo.title && <meta name="twitter:title" content={seo.title}/>}
            {seo.description && (
                <meta name="twitter:description" content={seo.description}/>
            )}
        </Helmet>
    )
}
export default SEO

const query = graphql`
  query SEO {
    site {
      siteMetadata {
        defaultTitle: title
        defaultDescription: description
        siteUrl: siteUrl
      }
    }
  }`