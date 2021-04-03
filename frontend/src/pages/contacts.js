import React from 'react';
import Layout from "../templates/Layout";
import ContactForm from "../components/ContactForm";
import {graphql} from "gatsby";
import Contacts from "../components/Contacts";

function Contacts_({data}) {
    const {allStrapiPage: {edges: [{node: {Content: [content]}}]}} = data
    return (
        <Layout>
            <Contacts header={content.header} content={content.contacts} maps={content.mapsLink} />
            <ContactForm header={content.formHeader} content={content.formText} formImage={content.formImage}/>
        </Layout>
    );
}


export const query = graphql`
query Contacts {
  allStrapiPage(filter: {name: {eq: "contacts"}}) {
    edges {
      node {
        Content {
          header
          formText
          contacts
          formHeader
          mapsLink
          formImage {
            childImageSharp {
              gatsbyImageData(placeholder: BLURRED)
            }
          }
        }
      }
    }
  }
}
`

export default Contacts_;