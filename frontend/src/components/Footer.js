import React from 'react';
import Section from "./landing/Section";

function Footer(props) {
    return (
        <Section className={"footer"}>
            <p>
                © 2005–2021 ООО «Ликос». Все права защищены. Любое использование материалов и информации с сайта
                (копирование, распространение, в т.ч. на другие сайты и интернет-ресурсы) без предварительного согласия
                правообладателя ЗАПРЕЩЕНО.
            </p>
            <p>
                ИНН: 6658263024 ОГРН: 1076658010054 КПП: 667101001
            </p>
            <p>
                Создание сайтов - <a
                href="https://kwork.ru/user/vladislavdesign">vladislavdesign</a>
            </p>
        </Section>
    );
}

export default Footer;