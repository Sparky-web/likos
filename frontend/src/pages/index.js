import * as React from "react"
import Layout from "../templates/Layout";
import "../css/App.css"
import {graphql, Link} from "gatsby";
import {GatsbyImage, getImage, StaticImage} from "gatsby-plugin-image";
import Headline from "../components/landing/Headline";
import Section from "../components/landing/Section";
import AccessibilityNewIcon from "@material-ui/icons/AccessibilityNew";
import BuildIcon from "@material-ui/icons/Build";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import Order from "../components/ContactForm";
import Contacts from "../components/Contacts";

const IndexPage = ({data}) => {
    const {
        allStrapiPage: {edges: [{node: {Content: [{orderImage, headerImage}]}}]},
        contactsPage: {edges: [{node: {Content: [content]}}]}
    } = data
    const image = getImage(headerImage)
    console.log(data)

    return (
        <Layout>
            <div className="header">
                <GatsbyImage 
                             alt={""}
                             placeholder={"blurred"}
                             className={"headline__background"} image={image}/>
                <Headline/>
            </div>
            <Section>
                <div className="top-cards">
                    <div className="top-card">
                        <AccessibilityNewIcon className={"top-card__icon"}/>
                        <h3 className="top-card__header">
                            Расчет стоимости прямо на сайте
                        </h3>
                        <p>
                            Вы можете воспользоваться <Link to={"/calculate"}>калькулятором стоимости резки</Link> прямо
                            на сайте, скачать расчет в формате PDF, а так же сразу же заказать нужные вам изделия.
                        </p>
                    </div>
                    <div className="top-card">
                        <BuildIcon className={"top-card__icon"}/>
                        <h3 className="top-card__header">
                            Современное оборудование
                        </h3>
                        <p>
                            В работе мы используем современный "название станка" вместе с "название резщика", это
                            обеспечивает точность реза и минимальное количество брака.
                        </p>
                    </div>
                    <div className="top-card">
                        <LocalShippingIcon className={"top-card__icon"}/>
                        <h3 className="top-card__header">
                            Доставка
                        </h3>
                        <p>
                            По вашему желанию мы можем доставить товар в любое удобное вам место, либо вы можете забрать
                            изделия самостоятельно, наш цех распологается <Link to="#contacts">близко к ЕКАДУ.</Link>
                        </p>
                    </div>
                </div>
            </Section>
            <Order header={"Оставьте заявку"} content={"Если у вас возникли вопросы, или же вы хотите сделать индивидуальный заказ - заполните эту форму, и наш мы свяжемся с вами в ближайшее время."} formImage={content.formImage}/>
            <Contacts header={content.header} content={content.content} maps={content.maps}/>
        </Layout>
    )
}

export const pageQuery = graphql`
query MyQuery {
  allStrapiPage(filter: {name: {eq: "index"}}) {
    edges {
      node {
        Content {
          headerImage {
            childImageSharp {
              gatsbyImageData(
                 placeholder: BLURRED
              )
            } 
          }
        }
      }
    }
  }
  
  contactsPage: allStrapiPage(filter: {name: {eq: "contacts"}}) {
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

export default IndexPage
