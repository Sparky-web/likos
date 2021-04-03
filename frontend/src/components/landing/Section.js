import React from 'react';


function Section(props) {
    return (
        <section {...props}>
            {props.outerElement}
            <div className="container">
                {props.children}
            </div>
        </section>
    );
}

export default Section;
