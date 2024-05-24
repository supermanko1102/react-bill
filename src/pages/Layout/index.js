import { getBillList } from "@/store/modules/billStore"
import { Button } from "antd-mobile"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { Outlet } from "react-router-dom"

const Layout =()=>{
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getBillList())
    },[dispatch])

    return (
        <div> 
            <Outlet/>
            Layout
            <Button color="primary">111</Button>
            <div className="puple">
                <Button color="primary"> 222</Button>
            </div>
        </div>
    )
}
export default Layout