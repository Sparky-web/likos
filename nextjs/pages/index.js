import * as React from "react"
import axios from "axios"
import Layout from "../templates/Layout";
import Section from "../components/landing/Section";
import strapi from "../helpers/strapi"

import Link from "next/link";
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

import Headline from "../components/landing/Headline";
import iconCutting from "../images/"

// import Order from "../components/ContactForm";
// import Contacts from "../components/Contacts";

import Image from 'next/image'

const IndexPage = ({ data }) => {
  console.log(data)
  return (
    <Layout>
      <div className="header">
        <Image
          src={process.env.NEXT_PUBLIC_BACKEND_URL + data.headerImage?.data?.attributes?.url}
          layout="fill"
          className="headline__background"
        />

        <Headline />
      </div>
      <Section>
        <div className="top-cards">
          <div className="top-card">
            <AccessibilityNewIcon className={"top-card__icon"} />
            <h3 className="top-card__header">
              Расчет стоимости прямо на сайте
            </h3>
            <p>
              Вы можете воспользоваться <Link href={"/calculate"}>калькулятором стоимости резки</Link> прямо
              на сайте, скачать расчет в формате PDF, а так же сразу же заказать нужные вам изделия.
            </p>
          </div>
          <div className="top-card">
            {/* <StaticImage
              className={"top-card__icon"}
              alt={"Сварка"}
              src={"../images/welding.svg"}
              objectFit={"contain"}
              placeholder={"blur"}
              style={{ width: "72px" }}
            /> */}


            <h3 className="top-card__header">
              Полный цикл металообработки
            </h3>
            <p>
              Заказывая у нас изготовление изделий в комплексе, вы не только экономите на транспортных расходах, но и существенно сокращаете сроки производства, потому что мы начинаем варить с первого дня заказа (с первой готовой детали).
            </p>
          </div>
          <div className="top-card">
            <LocalShippingIcon className={"top-card__icon"} />
            <h3 className="top-card__header">
              Доставка
            </h3>
            <p>
              По вашему желанию мы можем доставить товар в любое удобное вам место, либо вы можете забрать
              изделия самостоятельно, наш цех распологается <Link href="#contacts">близко к ЕКАДУ.</Link>
            </p>
          </div>
        </div>
      </Section>
      {/* <Order header={"Оставьте заявку"}
        content={"Если у вас возникли вопросы, или же вы хотите сделать индивидуальный заказ - заполните эту форму, и мы свяжемся с вами в ближайшее время."}
        formImage={content.formImage} />
      <Contacts header={content.header} content={content.content} maps={content.maps} /> */}
    </Layout>
  )
}

export async function getStaticProps(context) {
  const data = await strapi.get("index", { populate: "*" })
  return {
    props: { data }, // will be passed to the page component as props
  }
}

export default IndexPage
