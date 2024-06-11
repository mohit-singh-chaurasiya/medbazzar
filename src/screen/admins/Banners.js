import { useState, useEffect } from "react";
import { Button, Grid, TextField, Avatar } from "@mui/material";

import { getData,postData, serverURL } from "../../Services/FetchNodeServices";
import { FormControl, Select, MenuItem, InputLabel } from '@mui/material'
import TitleComponent from "../../components/admin/TitleComponent";
import { ContactSupportOutlined, Label } from "@mui/icons-material";
import Swal from "sweetalert2";
import { BannerStyle } from "./BannersCss";
export default function Banners(props) {

    var classes = BannerStyle()
    const [bannerType, setBannerType] = useState('')
    const [bannerId, setBannerId] = useState('')
    const [brandId, setBrandId] = useState('')
    const [brandList, setBrandList] = useState([])
    const [picture, setPicture] = useState({ file: [], bytes: '' })
    const [error, setError] = useState({})



    const fetchAllBrand = async () => {
        var result = await getData('brand/display_all_brand')
        if (result.status) {
            setBrandList(result.data)

        }
    }
    useEffect(function () { fetchAllBrand() }, [])
    const fillAllBrand = () => {
        return brandList.map((item) => {

            return <MenuItem value={item.brandid}>{item.brandname}</MenuItem>
        })

    }

    const handlePicture = (event) => {
        // alert(JSON.stringify(event.target.files))

        if (Object.values(event.target.files).length >= 5) {
            setPicture({ file: Object.values(event.target.files), bytes: event.target.files })
        }
        else {
            alert("Pls upload 5 or more files")
        }

    }
    const showImages = () => {
        return picture?.file?.map((item) => {

            return (<div style={{ margin: 2, cursor: 'pointer' }}><Avatar alt="Remy Sharp" src={URL.createObjectURL(item)} variant="Rounded" /></div>)

        })

    }


    const handleError = (label, msg) => {
        setError((prev) => ({ ...prev, [label]: msg }))

    }


    const handleReset = () => {
        setBannerType('')
        setBrandId('')
        setPicture({ file: [] })
    }
    const handleSubmit = async () => {
        var submit = true

        if (bannerType.length == 0) {
            handleError('bannerType', "pls Input Bannertype....")
            submit = false
        }
        if (brandId.length == 0) {
            handleError('brandId', "pls Input brand....")
            submit = false
        }


        if (picture.bytes.length == 0) {

            handleError('picture', 'pls choose icon...')
            submit = false
        }
        if (submit) {
            var formData = new FormData()

            formData.append('brandid', brandId)

            formData.append('bannertype', bannerType)

            picture.file.map((item, i) => {
                formData.append('picture' + i, item)
            })


            var result = await postData('banners/submit_banners', formData)
            if (result.status) {

                Swal.fire({
                    icon: 'success',
                    timer: 1500,
                    title: result.message

                })

            }
            else {

                Swal.fire({
                    icon: 'error',
                    title: result.message,
                    timer: 1500
                })

            }
        }
    }


    return (
        <div className={classes.rootsix}>
            <div className={classes.boxsix}>
                <Grid container spacing={3}>

                    <Grid item xs={12}>
                        <TitleComponent title="Add New Banner" logo="logo.png" listicon="list.png"  />
                    </Grid>




                    <Grid item xs={6} >
                        <FormControl fullWidth>
                            <InputLabel>Bannertype</InputLabel>
                            <Select
                                label="Bannertype"
                                value={bannerType}
                                error={error.bannerType}
                                onFocus={() => handleError('bannerType', null)}
                                onChange={(event) => setBannerType(event.target.value)}
                            >
                                <MenuItem value={"General"}>General</MenuItem>
                                <MenuItem value={"Brand"}>Brand</MenuItem>
                                <MenuItem value={"Trending"}>Trending</MenuItem>
                                <MenuItem value={"Latest"}>Latest</MenuItem>
                                <MenuItem value={"Popular"}>Popular</MenuItem>

                            </Select>

                            {error.bannerId ? <span style={{ marginLeft: '4%', fontSize: 13, color: '#d32f2f' }}>{error.bannerId}</span> : <></>}
                        </FormControl>

                    </Grid>




                    <Grid item xs={6} fullWidth>
                        <FormControl fullWidth>
                            <InputLabel>Brand</InputLabel>
                            <Select
                                fullWidth
                                label="Brand"
                                value={brandId}
                                error={error.brandId}
                                onFocus={() => handleError('brandId', null)}
                                onChange={(event) => setBrandId(event.target.value)}
                            >
                                {bannerType === 'Brand' ? (
                                    fillAllBrand()
                                ) : (
                                    <MenuItem value={0}>None</MenuItem>
                                )}
                            </Select>
                            {error.brandId ? (
                                <span style={{ fontSize: 13, fontFamily: 'kanit', margin: '2%', color: '#d32f2f' }}>
                                    {error.brandId}
                                </span>
                            ) : (
                                <></>
                            )}
                        </FormControl>
                    </Grid>


                    <Grid item xs={6}>
                        <Button variant="contained" component="label" fullWidth>
                            upload
                            <input onChange={handlePicture} onClick={() => handleError('picture', null)} type="file" hidden  multiple />
                        </Button>
                        {error.picture ? <span style={{ marginLeft: '4%', fontSize: 13, color: '#d32f2f' }}>{error.picture}</span> : <></>}
                    </Grid>
                    <Grid item xs={6} style={{ display: 'flex', justifyContent: 'center' }}>
                        {showImages()}

                    </Grid>

                    <Grid item xs={6}>
                        <Button onClick={handleSubmit} variant="contained" fullWidth>
                            Submit
                        </Button>
                    </Grid>

                    <Grid item xs={6}>
                        <Button onClick={handleReset} variant="contained" fullWidth>
                            Reset
                        </Button>
                    </Grid>

                </Grid>

            </div>

        </div>

    )




}