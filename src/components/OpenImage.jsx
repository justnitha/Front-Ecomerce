import React,{useState} from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Icons from './Icons';


export default function OpenImage({toggleNavbar,cancelClose}) {
    
    const [active, setAcrtive] = useState(0);

    const CustomPrevArrow = (props) => (
        <button className={`absolute top-[16rem] z-30 -left-6 bg-white py-[0.8rem] px-4  rounded-3xl border hover:border-Orange`}
        onClick={(e) =>{
          props.onClick(e);
        }}>
          <img src={Icons.previous} alt="" className='hover-filter' />
        </button>
      );
    
      const CustomNextArrow = (props) => (
        <button className={`absolute top-[16rem] z-30 -right-6 bg-white py-[0.8rem] px-4  rounded-3xl border hover:border-Orange`} 
         onClick={(e) =>{
          props.onClick(e);
        }}>
          <img src={Icons.next} alt="" className='hover-filter ' />
        </button>
      );

      const settings = {
        appendDots: (dots) => (
          <div>
            <ul className="gap-[100px] ms-3 flex  -top-8 h-[120px] absolute w-full" onClick={cancelClose}>{dots}</ul>
          </div>
        ),
        customPaging: function (i) {
          return (
            <div
              className={`w-[80px] mt-5 rounded-lg ${
                i === active ? "border-2 border-Orange opacity-60" : ""
              }`}
            >
              <img
                src={require(`../assets/images/image-product-${i + 1}-thumbnail.jpg`)}
                className={`rounded-md`}
                alt='foto semua'
              />
            </div>
          );
        },
        dots: true,
        // dotsClass: "slick-dots slick-thumb",
        beforeChange: (current, next) => setAcrtive(next),
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <CustomNextArrow />,
        prevArrow: <CustomPrevArrow />,
      };
  return (
    <div className='w-[45%] mx-auto' onClick={cancelClose}>
      <img src={Icons.close} alt="close" className='hover-filter cursor-pointer ms-auto filter' onClick={toggleNavbar} />
        <Slider {...settings} className="mx-auto mt-7 relative" >
            <img
              src={require('../assets/images/image-product-1.jpg')}
              alt="foto 1"
              className="rounded-xl"
            />
            <img
              src={require('../assets/images/image-product-2.jpg')}
              alt="foto 2"
              className="rounded-xl"
            />
            <img
             src={require('../assets/images/image-product-3.jpg')}
              alt="foto 3"
              className="rounded-xl"
            />
            <img
              src={require('../assets/images/image-product-4.jpg')}
              alt="foto 4"
              className="rounded-xl"
            />
          </Slider>
    </div>
  )
}
