import React from 'react';

import Carousel from '@/Components/Carousels';

export default function imageCarousel({Photos}) {
        
    if (Photos.length) {
        return (
            <Carousel
                responsive={{
                    desktop: {
                        breakpoint: { max: 3000, min: 1024 },
                        items: 1,
                        slidesToSlide: 1 // optional, default to 1.
                    },
                    tablet: {
                        breakpoint: { max: 1024, min: 464 },
                        items: 1,
                        slidesToSlide: 1 // optional, default to 1.
                    },
                    mobile: {
                        breakpoint: { max: 464, min: 0 },
                        items: 1,
                        slidesToSlide: 1 // optional, default to 1.
                    }
                }
                }
                className={'h-full w-full'}
                infinite={true}
                autoPlay={true}
                buttons={false}
                containerClass={"single-property-carousel-container"}
                slides={Photos.map(function (photo, index) { return (<img key={index} src={photo.photo_path} className={"mx-auto w-full h-full object-cover"} />) })}
            />
        )
    } else {
        return (<img src={"/images/placeholder.png"} className="h-83 w-full object-cover" />);
    }
}
