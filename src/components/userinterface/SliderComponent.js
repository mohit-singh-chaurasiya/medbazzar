import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { serverURL } from "../../Services/FetchNodeServices";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { createRef } from "react";
import { Skeleton } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
export default function SliderComponent(props) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  var sld = createRef()
  var settings = {

    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplayspeed: 4000,
    arrows: false

  };

  var banners = props.data || [];;

  const showBannerSlideShimmer = () => {
    return ["", "", ""]?.map((item) => {
      return (
        <div>
          <Skeleton height={300} width={450} animation="wave">
            <div
              style={{
                display: "flex",
                marginLeft: 12,
                marginRight: 12,
                boxShadow: "1px 1px 10px 0px #00000010",
              }}
            >
              <img
                src={`${serverURL}/images/${item.picture}`}
                style={{
                  width: '80%', height: "auto",
                  padding: 3,
                  borderRadius: 10,
                  aspectRatio: 8 / 3.5,


                  display: "block",
                  //   marginLeft: "auto",
                  //   marginRight: "auto",
                  // margin:'auto'
                }}
              />
            </div>
          </Skeleton>
        </div>
      );
    });
  };
  var images = Object?.values(banners)[0]?.picture.split(",")
  const showSlide = () => {
    return images?.map((item) => {
      return (<div style={{ display: 'flex', justifyContent: 'center' }}><img src={`${serverURL}/images/${item}`} style={{
        width: '95%', height: "100%", margin: 'auto', aspectRatio: 8 / 3.5, borderRadius: 10, display
          : 'Block'
      }} /></div>)
    })



  }
  const handleForward = () => {

    sld.current.slickNext()
  }
  const handleBackward = () => {

    sld.current.slickPrev()
  }
  return (
    <div style={{ width: '97%', height: '100%', position: 'relative', cursor: 'pointer' }}>
      {!matches ? <div style={{ zIndex: 2, top: '40%', position: 'absolute', display: 'flex', justifyContent: 'center', alignItems: 'center', width: 36, height: 36, borderRadius: 18, background: '#95a5a6', opacity: 0.6 }}>
        <ArrowBackIosIcon onClick={handleBackward} />
      </div> :
        <div></div>}
      <Slider ref={sld} {...settings}>
        {banners.length ? showSlide() : showBannerSlideShimmer()}</Slider>

      {!matches ?
        <div style={{ zIndex: 2, top: '40%', left: '98%', position: 'absolute', display: 'flex', justifyContent: 'center', alignItems: 'center', width: 36, height: 36, borderRadius: 18, background: '#95a5a6', opacity: 0.6 }}>
          <ArrowForwardIosIcon onClick={handleForward} />
        </div> :
        <div></div>}
    </div>
  );

}

