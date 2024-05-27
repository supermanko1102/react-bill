//帳單列表store
import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
 const billStore = createSlice({
    //定義data status
    name:'bill',
    initialState:{
        billList:[]
    },
    reducers:{
        //同步
        setBillList(state,action){
            state.billList  = action.payload
        }, 
        addBill (state, action) {
            state.billList.push(action.payload)
        }
    }
})
//解構
const {setBillList,addBill} = billStore.actions
//非同步
const getBillList =()=>{
    return async(dispatch)=>{
        const res= await axios.get('http://localhost:8888/ka')
        dispatch(setBillList(res.data))
    }
}
const addBillList = (data) => {
    return async (dispatch) => {
      const res = await axios.post('http://localhost:8888/ka', data)
      dispatch(addBill(res.data))
    }
  }

export { addBillList, getBillList }
const reducer = billStore.reducer
export default reducer
