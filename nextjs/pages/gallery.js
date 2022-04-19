import React, {useState} from 'react';
import Layout from "../templates/Layout";
import Section from "../components/landing/Section";
import "../css/Gallery.css"
import {graphql} from "gatsby"
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Contacts from "../components/Contacts";
import {GatsbyImage, getImage, getSrcSet} from "gatsby-plugin-image";
import Video from "../components/Video";

function Gallery({data}) {
    // const {allStrapiPage: {edges: [{node: {Content: [{media}]}}]}} = data
    let {allStrapiPage: {edges: [{node: {Content: [{images}]}}]}} = data;
    images = images.map(el => el.image)
    console.log(images)

    return (
        <Layout>
            <div className="about-us__page">
                <Section className={"about-us"}>
                    <h1>О нас</h1>
                    <p> Компания ООО "Ликос" предлагает услуги плазменной резки металла по привлекательным ценам. Для
                        данного
                        вида обработки металла мы используем высокоточное оборудование, оснащенное современным
                        программным
                        обеспечением. Наши специалисты имеют высокую квалификацию и большой опыт работы, поэтому
                        выполняют
                        заказы на должном уровне и в кратчайшие сроки. Мы принимаем заказы любой сложности и по праву
                        гордимся безупречным качеством выполняемых работ.</p>

                    <div className={"mt-3"}>
                    </div>
                </Section>
                <Section className={"gallery__wrap"}>
                    <div className={"gallery"}>
                        {images.map((el, i) => <Media image={el} key={i} i={i}/>)}
                    </div>
                </Section>
            </div>
        </Layout>
    );
}

export default Gallery;

const Media = ({image: media, i}) => {
    const [open, setOpen] = useState(false)
    const image = getImage(media)
    const sizes = getSrcSet(media)?.split(",")
    const previewSrc = sizes?.length > 1 ? sizes?.[1].split(" ")[0] : sizes?.[0].split(" ")[0]

    return (<div className={"gallery__media-container " + (i === 0 ? "tall" : i === 3 ? "wide" : "")}>
        {media.ext !== ".mp4" ?
            <img src={previewSrc} alt={""} onClick={() => setOpen(true)}/> :
            <Video videoSrcURL={media.publicURL} videoTitle={"smth"}/>
        }
        <Dialog open={open} onClose={() => setOpen(false)} className={"gallery__full-image"}>
            <DialogContent>
                <GatsbyImage image={image} alt={""} onClick={() => setOpen(true)} className={"gallery__full-image"}/>
            </DialogContent>
        </Dialog>
    </div>)
}


export const query = graphql`
query Gallery {
  allStrapiPage(filter: {name: {eq: "gallery"}}) {
    edges {
      node {
        name
        id
        Content {
          images {
            image {
              name
              childImageSharp {
                gatsbyImageData(
                    placeholder: BLURRED
                )
              }
              publicURL
              ext
            }
          }
        }
      }
    }
  }
}   
`