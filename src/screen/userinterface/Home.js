import Header from "../../components/userinterface/Header"
import MenuBar from "../../components/userinterface/MenuBar"
import SliderComponent from "../../components/userinterface/SliderComponent"
import CategoryComponent from "../../components/userinterface/CategoryComponent"
import BrandComponent from "../../components/userinterface/BrandComponent"
import FooterComponent from "../../components/userinterface/FooterComponent"
import ProductComponent from "../../components/userinterface/ProductComponet"
import ConcernComponent from "../../components/userinterface/ConcernComponent"
import BannerSlide from "../../components/userinterface/BannerSlide"
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
// import FilterLists from "../../components/userinterface/FilterLists"
import { useState, useEffect } from "react"
import { postData, getData } from "../../Services/FetchNodeServices"
import { Divider } from "@mui/material"
import { useSelector } from "react-redux"

export default function Home(props) {
  const [bannerList, setBannerList] = useState([])
  const [bannerList1, setBannerList1] = useState([])
  const [bannerSlideList, setBannerSlideList] = useState([])
  const [brandList, setBrandList] = useState([])
  const [categoryList, setCategoryList] = useState([])
  const [productDetailsList, setProductDetailsList] = useState([])
  const [productDetailsList1, setProductDetailsList1] = useState([])
  const [productDetailsFood, setProductDetailsFood] = useState([])
  const [productList, setProductList] = useState([])
  const [concernList, setConcernList] = useState([])
  const [pageRefresh, setPageRefresh] = useState(false)
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));
  const matchesMd = useMediaQuery(theme.breakpoints.down("md"));
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));

  var userData = Object.values(useSelector(state => state.user))[0]
  const [userAddress, setUserAddress] = useState([])

  const fetchAllBanners = async () => {
    var result = await postData('userinterface/show_all_banners', { bannertype: 'Latest' })
    setBannerList(result.data)


  }

  const fetchAllBanners1 = async () => {
    var result = await postData('userinterface/show_all_banners', { bannertype: 'General' })
    setBannerList1(result.data)

  }
  const fetchAllBannerSlide = async () => {
    var result = await postData('userinterface/show_all_banners', { bannertype: 'trending' })
    setBannerSlideList(result.data)

  }

  const fetchAllBrands = async () => {
    var result = await getData('userinterface/show_all_brands')
    setBrandList(result.data)

  }
  const fetchAllCategory = async () => {
    var result = await getData('userinterface/show_all_category')
    setCategoryList(result.data)

  }
  const fetchAllConcern = async () => {
    var result = await getData('userinterface/show_all_concern')
    setConcernList(result.data)

  }
  const fetchAllProductDetails = async (offertype) => {
    var result = await postData('userinterface/show_all_productdetails_by_offer', { offertype })
    setProductDetailsList(result.data)
    // alert(JSON.stringify(result))

  }

  const fetchAllProductDetails1 = async (offertype) => {
    var result = await postData('userinterface/show_all_productdetails_by_offer', { offertype })
    setProductDetailsList1(result.data)
    // alert(JSON.stringify(result))

  }

  const fetchAllProductDetailsFood = async (offertype) => {
    var result = await postData('userinterface/show_all_productdetails_by_offer', { offertype })
    setProductDetailsFood(result.data)
    // alert(JSON.stringify(result))

  }

  // const fetchAllProductDetails2=async()=>{
  //   var result=await postData('userinterface/display_all_productdetails')
  //   setProductDetailsList2(result.data)
  //   // alert(JSON.stringify(result))
  //   console.log("DASDASD",result.data)

  // }


  useEffect(function () {
    fetchAllBrands()
    fetchAllBanners()
    fetchAllBanners1()
    fetchAllBannerSlide()
    fetchAllCategory()
    fetchAllProductDetails("sell")
    fetchAllProductDetails1("festivalsell")
    fetchAllProductDetailsFood("specialoffer")
    // fetchAllProductDetails2()
    fetchAllConcern()

  }, [userData?.mobileno, pageRefresh])

  return (<div>
    <Header />
    <div>
      {!matches ? <MenuBar /> : <div></div>}
    </div>


    <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20, marginBottom: 45 }}>
      < SliderComponent data={bannerList} />
      < Divider style={{ borderWidth: 0.5 }} />
    </div>
    {/* <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20, marginBottom: 35 }}>
      < BannerSlide data={bannerSlideList} title="Specialized Stores" />
    </div> */}


    <div style={{ marginLeft: '1.5%', marginTop: 20, marginBottom: 35, marginRight: '1.5%' }}>

      < BrandComponent data={brandList} title="Brands" />
    </div>


    <div style={{ marginLeft: '1.5%', marginTop: 20, marginBottom: 35, marginRight: '1.5%' }}>


      <CategoryComponent data={categoryList} title="Brawse by category" />
    </div>


    <div style={{ marginLeft: '1.5%', marginTop: 20, marginBottom: 35, marginRight: '1.5%' }}>

      < ProductComponent pageRefresh={pageRefresh} setPageRefresh={setPageRefresh} data={productDetailsList} title="Trending Products" />
    </div>

    <div style={{ marginLeft: '1.5%', marginTop: 20, marginBottom: 35, marginRight: '1.5%' }}>

      < ProductComponent pageRefresh={pageRefresh} setPageRefresh={setPageRefresh} data={productDetailsList1} title="Best Deal" />
    </div>

    <div style={{ marginLeft: '1.5%', marginTop: 20, marginBottom: 35, marginRight: '1.5%' }}>

      < ProductComponent pageRefresh={pageRefresh} setPageRefresh={setPageRefresh} data={productDetailsFood} title="Dog Food" />
    </div>



    {/* <div style={{marginLeft:'1.5%',marginTop:20,marginBottom:35,marginRight:'1.5%'}}>
   
        < ProductComponent pageRefresh={pageRefresh} setPageRefresh={setPageRefresh} data={productDetailsList2} title="Recommended"/>
      </div> */}

    <div style={{ marginLeft: '1.5%', marginTop: 20, marginBottom: 35, marginRight: '1.5%' }}>


    </div>

    {/* <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20, marginBottom: 35 }}>
      < BannerSlide data={bannerList1} />
      < Divider style={{ borderWidth: 0.5 }} />
    </div> */}
     <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20, marginBottom: 35 }}>
      < BannerSlide data={bannerSlideList} title="Specialized Stores" />
      < Divider style={{ borderWidth: 0.5 }} />
    </div>
    <div style={{ marginLeft: '1.5%', marginTop: 20, marginBottom: 35, marginRight: '1.5%' }}>

      < ConcernComponent data={concernList} title="Concern" />
    </div>



    <div style={{ display: 'flex', justifyContent: 'center' }}>
      {!matches ? <FooterComponent /> : <div></div>}
    </div>

    {/* <div style={{display:'flex',justifyContent:'center'}}>
        { FooterComponent() }
       </div> */}


  </div>)
}