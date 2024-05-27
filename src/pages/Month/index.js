import { DatePicker, NavBar } from "antd-mobile"
import classNames from "classnames"
import dayjs from "dayjs"
import _ from 'lodash'
import { useEffect, useMemo, useState } from "react"
import { useSelector } from "react-redux"
import DailyBill from "./components/DayBill"
import './index.scss'
const Month =()=>{
    //按月做數據分組
    const billList = useSelector(state=>state.bill.billList)
    const monthGroup = useMemo(()=>{
        return _.groupBy(billList,(item)=>dayjs(item.date).format('YYYY-MM'))
    },[billList])
    console.log(monthGroup)
    //控制彈框
    const [dateVisible,setDateVisible]=useState(false)
    //時間顯示
    const [currentDate,setCurrentDate]= useState(()=>{
        return  dayjs(new Date()).format('YYYY-MM')
    })
    const [currentMonthList, setMonthList] = useState([])
    //計算月總和
    const monthResult = useMemo(()=>{
        const pay = currentMonthList.filter(item=>item.type==='pay').reduce((a,c)=>a+c.money,0)
        const income = currentMonthList.filter(item=>item.type==='income').reduce((a,c)=>a+c.money,0)
        return {
            pay,
            income,
            total:pay+income
        }
    },[currentMonthList])
    // initial 
    useEffect(()=>{
        const nowDate = dayjs().format('YYYY-MM')
        setMonthList(monthGroup[nowDate]??[])
    },[monthGroup])

    //confirm callback
    const onConfimr=(date)=>{
        setDateVisible(false)
        // console.log(date)
        const formatDate = dayjs(date).format('YYYY-MM')
        // console.log(formatDate)
        setMonthList(monthGroup[formatDate]??[])
        setCurrentDate(formatDate)
    }
    //以月按照當前日分組
    const dayGroup = useMemo(()=>{
        const groupData =  _.groupBy(currentMonthList,(item)=>dayjs(item.date).format('YYYY-MM-DD'))
        const keys= Object.keys(groupData)
        return {
            groupData,
            keys
        }
    },[currentMonthList])
    return (    
    <div className="monthlyBill"> 
    <NavBar className="nav" backArrow={false}>
        月度收支
    </NavBar>
        <div className="content">
            <div className="header">
                {/* 日期 */}
                <div className="date" onClick={()=>setDateVisible(true)}>
                    <span className="text">
                        {currentDate +''}月帳單
                    </span>
                    <span className={classNames('arrow',dateVisible && "expand")}></span>
                </div>
                {/* 主體 */}
                <div className="twoLineOverview">
                    <div className="item">
                        <span className="money">{monthResult.pay.toFixed(2)}</span>
                        <span className="type">支出</span>
                    </div>
                    <div className="item">
                        <span className="money">{monthResult.income.toFixed(2)}</span>
                        <span className="type">收入</span>
                    </div>
                    <div className="item">
                        <span className="money">{monthResult.total.toFixed(2)}</span>
                        <span className="type">餘額</span>
                    </div>
                </div>
                {/* 時間選擇器 */}
                <DatePicker
                    className="kaDate"
                    title='記帳日期'
                    precision="month"   
                    visible={dateVisible}
                    onConfirm={onConfimr}
                    onClose={()=>{setDateVisible()}}
                    max={new Date()}
                />
            </div>
            {/* 單日列表 */}
            {
                dayGroup.keys.map(key=>{
                    return <DailyBill key={key} date={key} billList={dayGroup.groupData[key]}/>
                })
            }
            {/*  */}
        </div>
    </div>

    )
}
export default Month