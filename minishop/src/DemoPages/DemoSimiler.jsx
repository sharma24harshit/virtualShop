import React from "react";
import "./Demosimiler.scss";
import { BsStarFill } from "react-icons/bs";

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {  useNavigate } from "react-router-dom";

const DemoSimiler = ({data}) => {

  const navigate  = useNavigate();

  const settings = {
    dots: false,
    infinite: false,
    speed: 5000,
    slidesToShow: 5,
    slidesToScroll: 5,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
 
 
  return (
    <div className="proMainDiv">

      <Slider {...settings} >
          {
                data?.map((el,index) => (
                <div key={el?.id ?? index} className="prodiv">

                <img
                  src={el?.image?.[1] || el?.image?.[0] || ""}
                  alt={el?.brand ? `${el.brand} image` : "Product image"}
                />
                <p className="proName">{el.brand}</p>
                <div className="divPriceRating">
                  <p className="proPrice">
                    Price: <span>₹ {el?.price ?? "N/A"}</span>
                  </p>
                  <div className="divStar">
                    <p className="proRating"> <BsStarFill/></p>
                    <span>{el?.rating ?? "No rating"}</span></div>
                  
                </div>
                <button className="addtocart" onClick={()=>navigate(`/data/${el.id}`)}>
                    View Details
                </button>
                </div>
               
              ))}
      </Slider>
     
      

    </div>

  );
};

export default DemoSimiler;
