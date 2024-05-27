import dayjs from "dayjs"

export const billListData = {
  pay: [
    {
      type: 'foods',
      name: '伙食',
      list: [
        { type: 'food', name: '餐費' },
        { type: 'drinks', name: '飲料' },
        { type: 'dessert', name: '甜品' },
      ],
    },
    {
      type: 'taxi',
      name: '交通費',
      list: [
        { type: 'taxi', name: '計程車' },
        { type: 'longdistance', name: '車費' },
      ],
    },
    {
      type: 'recreation',
      name: '休閒',
      list: [
        { type: 'bodybuilding', name: '健身' },
        { type: 'game', name: '娛樂' },
        { type: 'audio', name: '媒體' },
        { type: 'travel', name: '旅遊' },
      ],
    },
    {
      type: 'daily',
      name: '日常支出',
      list: [
        { type: 'clothes', name: '衣服裤子' },
        { type: 'bag', name: '包包' },
        { type: 'book', name: '書籍' },
        { type: 'promote', name: '課程' },
        { type: 'home', name: '家具' },
      ],
    },
    {
      type: 'other',
      name: '其他支出',
      list: [{ type: 'community', name: '社區' }],
    },
  ],
  income: [
    {
      type: 'professional',
      name: '其他支出',
      list: [
        { type: 'salary', name: '工資' },
        { type: 'overtimepay', name: '加班' },
        { type: 'bonus', name: '獎金' },
      ],
    },
    {
      type: 'other',
      name: '其他收入',
      list: [
        { type: 'financial', name: '理財收入' },
        { type: 'cashgift', name: '禮金收入' },
      ],
    },
  ],
}

export const billTypeToName = Object.keys(billListData).reduce((prev, key) => {
  billListData[key].forEach(bill => {
    bill.list.forEach(item => {
      prev[item.type] = item.name
    })
  })
  return prev
}, {})

export const getOverview = (data = []) => {
  return data.reduce(
    (prev, item) => {
      return {
        ...prev,
        date: item.date,
        [item.type]: prev[item.type] + +item.money,
      }
    },
    { pay: 0, income: 0, date: null }
  )
}

export const getMonthOverview = (data, month) => {
  const bill = data.filter(item => {
    return month === dayjs(item.date).get('month')
  })
  return getOverview(bill)
}
