import React from 'react'
import { Helmet } from 'react-helmet'

const Meta = ({ title, description, keywords}) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name='description' content={description}/>
            <meta name='keywords' content={keywords}/>
        </Helmet>
    )
}

Meta.defaultProps = {
    title:'Welcom to Ace Box Shop',
    description: 'We heve product with best price and qaulity',
    keywords: 'cosmetics, buy cosmetic, fashion, makeup, cheap cosmetics'
}

export default Meta
