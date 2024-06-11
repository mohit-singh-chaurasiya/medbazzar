import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { serverURL } from "../../Services/FetchNodeServices";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { createRef } from "react";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useNavigate } from "react-router-dom";
import { Skeleton } from "@mui/material";
export default function BrandComponent(props) {
  var navigate = useNavigate()
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  const matchesMd = useMediaQuery(theme.breakpoints.down("md"));
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));
  var Bsld = createRef()
  var settings = {
    //dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: !matches ? 7 : 4,
    slidesToScroll: 2,
    autoplay: true,
    autoplayspeed: 3000,
    arrows: false,


  };

  var brand = props?.data || [];

  const showBrandSlideShimmer = () => {
    return ["", "", "","", "", "","",""]?.map((item) => {
      return (
        <div>
          <Skeleton height={190} width={190} animation="wave">
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
                  width: "80%",
                  padding: 3,
                  borderRadius: 10,
                  height: "auto",

                  display: "block",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              />
            </div>
          </Skeleton>
        </div>
      );
    });
  };


  const showBrandSlide = () => {
    return brand?.map((item) => {
      return (<div style={{ display: 'flex', marginLeft: 12, marginRight: 12, border: 'solid black', background: 'black', width: "20%", height: '100%' }} ><img src={`${serverURL}/images/${item.picture}`} style={{ width: '80%', height: '80%', aspectRatio: 3 / 3, margin: 'auto', boxShadow: '1px 1px 7px 1px grey', background: 'black', borderRadius: 10 }} /></div>)
    })
  }

  const handleForward = () => {
    Bsld.current.slickNext()
  }
  const handleBackward = () => {
    Bsld.current.slickPrev()
  }

  return (
    <div style={{ width: '100%', position: 'relative', cursor: 'pointer' }} >
      <div style={{ margin: '10px 0px 15px 15px', fontWeight: 'bold', fontSize: 16 }}>{props?.title}</div>
      {!matches ? <div style={{ zIndex: 2, top: '45%', position: 'absolute', display: 'flex', justifyContent: 'center', alignItems: 'center', width: 34, height: 34, borderRadius: 17, background: '#95a5a6', opacity: 0.6 }}>
        <ArrowBackIosIcon onClick={handleBackward} />
      </div> : <div></div>}
      <Slider ref={Bsld} {...settings}>
        {brand.length ? showBrandSlide() : showBrandSlideShimmer()}
      </Slider>
      {!matches ? <div style={{ zIndex: 2, top: '45%', left: '97.5%', position: 'absolute', display: 'flex', justifyContent: 'center', alignItems: 'center', width: 36, height: 36, borderRadius: 18, background: '#95a5a6', opacity: 0.6 }}>
        <ArrowForwardIosIcon onClick={handleForward} />
      </div>
        : <div></div>}
    </div>
  );

}