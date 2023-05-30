import React from "react";

class ResponsiveFontSize extends React.Component {
    render() {   
        const { className, text } = this.props;
        const textLength = text.length;

        const getFontSize = (textLength) => {
            let fontSize = 250
            if (textLength >= 200) {
                fontSize = 300
            } else if (textLength >= 120) {
                fontSize = 350
            } else if (textLength >= 50) {
                fontSize = 400
            } else {
            fontSize = 500
        }
            return `${fontSize}%`    
        }

        const responsivFontSize = getFontSize(textLength);
                    
        return (
            <div className={className} style={{fontSize:responsivFontSize}}>
                <p>{text}</p>
                <p>{responsivFontSize}</p>
            </div>
        )    
    }
}

export default ResponsiveFontSize;