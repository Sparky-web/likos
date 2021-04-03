import React from 'react';
import Section from "./landing/Section";
import ReactMarkdown from 'react-markdown'

function Contacts({header, maps, content}) {

    return (
        <Section id={"contacts"} className={"contacts"}>
            <div className="contacts__text">
                <h2>{header ? header : "Контакты"}</h2>
                {content ? <ReactMarkdown>{content}</ReactMarkdown> : <>
                    <p><b>Телефон: </b> <a href="tel:+73432675196">+7 (343) 267 51 96</a></p>
                    <p><b>Email: </b> <a href="mailto:lykos@mail.com">lykos@mail.com</a></p>
                    <p><b>Адрес: </b> г.Екатеринбург, ул. Мартовская, дом 13</p>
                </>}
            </div>

            <iframe title={"map"} className={"contacts__map"}
                    loading={"lazy"}
                    src={maps ? maps : "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2187.234248938764!2d60.611488222858476!3d56.756115043922456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x43c168f2217bda55%3A0x4528b954360d442c!2zVWxpdHNhIE1hcnRvdnNrYXlhLCA4INC60L7RgNC_0YPRgSAxLCBZZWthdGVyaW5idXJnLCBTdmVyZGxvdnNrYXlhIG9ibGFzdCcsIDYyMDAyNA!5e0!3m2!1sen!2sru!4v1611767592414!5m2!1sen!2sru"}
                    frameBorder="0" style={{border: 0}} allowFullScreen="" aria-hidden="false"
            />
        </Section>
    );
}


export default Contacts;