import OneLineOverview from '@/components/OneLineOverview'
import TwoLineOverview from '@/components/TwoLineOverview'
import { useYearBillList } from '@/hooks/useBillList'
import { useDate } from '@/hooks/useDate'
import { getMonthOverview, getOverview } from '@/pages/contants'
import { DatePicker, NavBar } from 'antd-mobile'
import classNames from 'classnames'
import dayjs from 'dayjs'
import './index.scss'

const BillAll = () => {

  const { date, visible, onDateChange, onShowDate, onHideDate } = useDate()

  const selectedYear = date.get('year')
  const selectedYearBills = useYearBillList(selectedYear)

  const overview = getOverview(selectedYearBills)
  const thisYear = dayjs().get('year')
  const maxMonth = thisYear === selectedYear ? dayjs().get('month') + 1 : 12
  const monthBillList = new Array(maxMonth)
    .fill('')
    .map((_, month) => {
      return getMonthOverview(selectedYearBills, month)
    })
    .reverse()

  return (
    <div className="billDetail">
      <NavBar className="header" backArrow={false}>
        年度收支
      </NavBar>
      <NavBar className="nav" backArrow={false}>
        <div className="nav-title" onClick={onShowDate}>
          {selectedYear}年
          <span className={classNames('arrow', visible && 'expand')}></span>
        </div>
      </NavBar>
      <DatePicker
        className="kaDate"
        title="記帳日期"
        precision="year"
        visible={visible}
        onClose={onHideDate}
        max={new Date()}
        onConfirm={onDateChange}
      />

      <div className="content">
        <div className='overview'>
          <TwoLineOverview
            pay={overview.pay}
            income={overview.income}
            className="overview"
          />
        </div>
        {monthBillList.map((item, index) => {
          return (
            <div
              className="monthBill"
              key={index}
            >
              <div className="date">{maxMonth - index}月</div>
              <OneLineOverview pay={item.pay} income={item.income} />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default BillAll
