import React from 'react';
import Layout from "../templates/Layout";
import Section from "./landing/Section";
import { graphql } from "gatsby"
import marked from "marked"
import Order from "./ContactForm";
import {Helmet} from "react-helmet";


const MarkdownViewer = ({markdown}) => {
    const renderer = {
        image(src) {
            return `<img src="${process.env.GATSBY_BACKEND_URL}${src}" alt="${src}"/>`
        }
    }
    marked.use({ renderer });
    return <div dangerouslySetInnerHTML={{__html: marked(markdown)}}/>
}


function ContentPage({data}) {
    const content = data.allStrapiPage.edges[0].node.Content[0]
    return (
        <Layout>
            <Helmet>
                <meta charSet="utf-8" />
                <title>{content.title}</title>
            </Helmet>

            <Section>
                <h1>{content.title}</h1>
                <MarkdownViewer markdown={content.content}>
                </MarkdownViewer>
            </Section>
            <Order header={"Оставьте заявку"}
                   content={"Мы свяжемся с вами в ближайшее время и обсудим детали заказа."}
                   formImage={"https://images.satu.kz/10544420_w640_h640_opory-osvescheniya-10.jpg"}/>
        </Layout>
    );
}

export const query = graphql`
  query($slug: String!) {
    allStrapiPage(filter: {Content: {elemMatch: {pageName: {eq: $slug}}}}) {
      edges {
        node {
          name
          Content {
            title
            pageName
            content
          }
        }
      }
    }
  }
`

export default ContentPage;