import dayjs from 'dayjs'
import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getBillList } from '@/store/modules/billStore'

export const useBillList = () => {
  const dispatch = useDispatch()
  const billList = useSelector(state => state.bill.billList)

  useEffect(() => {
    dispatch(getBillList())
  }, [dispatch])

  return { billList }
}

export const useYearBillList = selectedYear => {
  const { billList } = useBillList()
  const yearBills = useMemo(
    () =>
      billList.filter(item => selectedYear === dayjs(item.date).get('year')),
    [billList, selectedYear]
  )

  return yearBills
}

export const useMonthBillList = (selectedYear, selectedMonth) => {
  const selectedYearBills = useYearBillList(selectedYear)
  const currentBillList = useMemo(
    () =>
      selectedYearBills.filter(item => {
        return selectedMonth === dayjs(item.date).get('month')
      }),
    [selectedYearBills, selectedMonth]
  )

  return currentBillList
}
