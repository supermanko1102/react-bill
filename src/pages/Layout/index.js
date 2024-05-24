import { getBillList } from "@/store/modules/billStore"
import { TabBar } from "antd-mobile"
import {
    AddCircleOutline,
    BillOutline,
    CalculatorOutline,
    SmileOutline
} from 'antd-mobile-icons'
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { Outlet, useNavigate } from "react-router-dom"
import './index.scss'
const tabs = [
    {
        key: '/',
        title: '今日帳單',
        icon: <SmileOutline />,
    },
    {
        key: '/new',
        title: '記帳',
        icon: <AddCircleOutline />,
    },
    {
      key: '/month',
      title: '月度帳單',
      icon: <BillOutline />,
    },
    {
        key: '/year',
        title: '年度帳單',
        icon: <CalculatorOutline />,
    }
  ]
const Layout =()=>{
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getBillList())
    },[dispatch])
const navigate = useNavigate()
const switchRouter=(path)=>{
    navigate(path)
}
    return (
        <div className="layout">
            <div className="container">
                <Outlet/>
            </div>
            <div className="footer">
            <TabBar onChange={switchRouter}>
                {tabs.map(item => (
                <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
                ))}
            </TabBar>
            </div>
        </div>

    )
}
export default Layout