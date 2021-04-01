import React, {useState} from 'react';
import Layout from "../templates/Layout";
import Section from "../components/landing/Section";
import "../css/Gallery.css"
import {graphql} from "gatsby"
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Video from "../components/Video";
import Contacts from "../components/landing/Contacts";

function Gallery({data}) {
    const {allStrapiPage: {edges: [{node: {Content: [{media}]}}]}} = data

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
                        заказы на должном уровне и в кротчайшие сроки. Мы принимаем заказы любой сложности и по праву
                        гордимся безупречным качеством выполняемых работ.</p>

                    <div className={"mt-3"}>
                    </div>
                </Section>
                <Section className={"gallery__wrap"}>
                    <div className={"gallery"}>
                        {media.map((el, i) => <Media media={el} key={i} i={i}/>)}
                    </div>
                </Section>
                <Contacts/>
            </div>
        </Layout>
    );
}

export default Gallery;

const Media = ({media, i}) => {
    const [open, setOpen] = useState(false)
    const smallUrl = media?.formats?.small ? `${process.env.GATSBY_BACKEND_URL}${media.formats?.small?.url}` : `${process.env.GATSBY_BACKEND_URL}${media.url}`


    return (<div className={"gallery__media-container " + (i === 0 ? "tall" : i === 3 ? "wide" : "")}>
        {new RegExp("video", "ig").test(media.mime) ?
            <Video videoSrcURL={`${process.env.GATSBY_BACKEND_URL}${media.url}`}/> :
            <img alt={""} src={`${smallUrl}`} onClick={() => setOpen(true)}/>
        }
        <Dialog open={open} onClose={() => setOpen(false)} className={"gallery__full-image"}>
            <DialogContent>
                <img alt={""} src={`${process.env.GATSBY_BACKEND_URL}${media.url}`}/>
            </DialogContent>
        </Dialog>
    </div>)
}

export const query = graphql`
{
  allStrapiPage(filter: {name: {eq: "gallery"}}) {
    edges {
      node {
        name
        id
        Content {
          media {
            mime
            url
            formats {
              small {
                url
              }
              thumbnail {
                url
              }
            }
          }
        }
      }
    }
  }
}
`