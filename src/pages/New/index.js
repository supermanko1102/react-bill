import Icon from '@/components/Icon'
import { addBillList } from '@/store/modules/billStore'
import { Button, DatePicker, Input, Modal, NavBar } from 'antd-mobile'
import classNames from 'classnames'
import dayjs from 'dayjs'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { billListData } from '../contants'
import './index.scss'


const New = () => {
  const navigate = useNavigate()
  // 1. 控制收入支出的狀態
  const [billType, setBillType] = useState('pay') // pay-支出 income-收入

  // 收集金額
  const [money, setMoney] = useState(0)
  const moneyChange = (value) => {
    setMoney(value)
  }

  // 帳單類型
  const [useFor, setUseFor] = useState('')
  const dispatch = useDispatch()
  // 保存
  const saveBill = () => {
    // 表單數據
    const data = {
      type: billType,
      money: billType === 'pay' ? -money : +money,
      date: date,
      useFor: useFor
    }
    if(useFor==='' || money ===''){
        Modal.alert({
            content: '項目不得為空',
        })
        return
    }
    console.log(data)
    dispatch(addBillList(data))
    Modal.alert({
        content: '完成',
    })
  }
  // 選擇時間
  const [date, setDate] = useState(new Date())
  const [dateVisible, setDateVisible] = useState(false)
  const dateConfirm = (value) => {
    console.log(value)
    setDate(value)
    setDateVisible(false)
  }
  return (
    <div className="keepAccounts">
      <NavBar className="nav" onBack={() => navigate('/')}>
        記一筆
      </NavBar>

      <div className="header">
        <div className="kaType">
          <Button
            shape="rounded"
            className={classNames(billType === 'pay' ? 'selected' : '')}
            onClick={() => setBillType('pay')}
          >
            支出
          </Button>
          <Button
            className={classNames(billType === 'income' ? 'selected' : '')}
            shape="rounded"
            onClick={() => setBillType('income')}
          >
            收入
          </Button>
        </div>

        <div className="kaFormWrapper">
          <div className="kaForm">
            <div className="date">
              <Icon type="calendar" className="icon" />
              <span className="text" onClick={() => setDateVisible(true)}>{dayjs(date).format('YYYY-MM-DD')}</span>
              {/* 時間 */}
              <DatePicker
                className="kaDate"
                title="記帳日期"
                max={new Date()}
                visible={dateVisible}
                onConfirm={dateConfirm}
              />
            </div>
            <div className="kaInput">
              <Input
                className="input"
                placeholder="0.00"
                type="number"
                value={money}
                onChange={moneyChange}
              />
              <span className="iconYuan">¥</span>
            </div>
          </div>
        </div>
      </div>

      <div className="kaTypeList">
        {/* 數據 */}
        {billListData[billType].map(item => {
          return (
            <div className="kaType" key={item.type}>
              <div className="title">{item.name}</div>
              <div className="list">
                {item.list.map(item => {
                  return (
                    // selected
                    <div
                      className={classNames(
                        'item',
                        useFor === item.type ? 'selected' : ''
                      )}
                      key={item.type}
                      onClick={() => setUseFor(item.type)}
                    >
                      <div className="icon">
                        <Icon type={item.type} />
                      </div>
                      <div className="text">{item.name}</div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      <div className="btns">
        <Button className="btn save" onClick={saveBill}>
          保 存
        </Button>
      </div>
    </div>
  )
}

export default New