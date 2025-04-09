import React from 'react';


const SectionTitle = ({subtitle, title, description, textAlignment, textColor}) => {
    return (
        <div className={`${textAlignment} ${textColor}  `}>
            <br />
            {/* <div className="subtitle" dangerouslySetInnerHTML={{__html: subtitle}}></div> */}
            <h2 className="title" dangerouslySetInnerHTML={{__html: title}}></h2>
            {/* <p dangerouslySetInnerHTML={{__html: description}}></p> */}
        </div>
    )
}

export default SectionTitle;