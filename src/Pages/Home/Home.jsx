import React, { useEffect, useState } from 'react'
import "./Home.css"
import Filter from '../../Components/Filter/Filter'
import { DataTable } from "primereact/datatable"
import { Column } from "primereact/column"
import { useDispatch, useSelector } from "react-redux"
import { getCustomAmounts } from '../../Action/Amount'
import { getUserDetails } from '../../Action/User'
import {useNavigate} from "react-router-dom"

const Home = ({loading,onLoading}) => {

  const getMinDate = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to 00:00:00.000
    return today;
  };

  const getMonthFirst = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to 00:00:00.000
    today.setDate(1);
    return today;
  }


  const dispatch = useDispatch()
  const navigate = useNavigate()
  let data = useSelector((state) => state.customAmountReducer)
  const User = useSelector((state) => state.currentUserReducer)
  const [from, setFrom] = useState(getMonthFirst());
  const [to, setTo] = useState(getMinDate());
  const [method, setMethod] = useState([]);
  const [type, setType] = useState([]);
  const [category, setCategory] = useState([]);
  const [expense,setExpense] = useState(null);
  const [income,setIncome] = useState(null);

  const checkDate = (date1, date2) => {
    let Date1 = new Date(date1);
    Date1.setHours(0, 0, 0, 0);
    let Date2 = new Date(date2);
    Date2.setHours(0, 0, 0, 0);
    return Date2.getTime() - Date1.getTime() > 0;
  }

  const changeData = (variable,newData) => {
    let temp = data.filter(()=>true)

    if(variable==="method" && newData.length!==0){
      temp = temp.filter((item)=>newData.includes(item.method.bank))
    }else if(variable!=="method" && method.length!==0){
      temp = temp.filter((item)=>method.includes(item.method.bank))
    }

    if(variable==="type" && newData.length!==0){
      temp = temp.filter((item)=>newData.includes(item.type))
    }else if(variable!=="type" && type.length!==0){
      temp = temp.filter((item)=>type.includes(item.type))
    }

    if(variable==="category" && newData.length!==0){
      temp = temp.filter((item)=>newData.includes(item.category))
    }else if(variable!=="category" && category.length!==0){
      temp = temp.filter((item)=>category.includes(item.category))
    }

    console.log(temp);
    setFilter(temp);
  }

  const changeValue = (variable, value) => {
    let temp = []
    if (variable === "from") {
      if (checkDate(value, to)){
        dispatch({type:"FETCH_CUSTOM_AMOUNTS",payload:null})
        setFrom(value);
      }
      else
        alert("Invalid Date");
    }
    else if (variable === "to") {
      if (checkDate(from, value)){
        dispatch({type:"FETCH_CUSTOM_AMOUNTS",payload:null})
        setTo(value);
    }
      else
        alert("Invalid Date");
    }
    else if (variable === "method") {
      temp = method.filter(() => true);
      if (temp.indexOf(value) !== -1) {
        temp = temp.filter((item) => item !== value)
        changeData(variable,temp);
        setMethod(temp);
      }
      else {
        temp.push(value);
        changeData(variable,temp);
        setMethod(temp);
      }
    }
    else if (variable === "type") {
      temp = type.filter(() => true);
      if (temp.indexOf(value) !== -1) {
        temp = temp.filter((item) => item !== value)
        changeData(variable,temp);
        setType(temp);
      }
      else {
        temp.push(value);
        changeData(variable,temp);
        setType(temp);
      }
    }
    else if (variable === "category") {
      temp = category.filter(() => true)
      if (temp.indexOf(value) !== -1) {
        temp = temp.filter((item) => item !== value)
        changeData(variable,temp);
        setCategory(temp);
      }
      else {
        temp.push(value);
        changeData(variable,temp);
        setCategory(temp);
      }
    }
  }
  const [filter,setFilter] = useState([]);
  const [methodList,setMethodList] = useState([]);
  const [typeList,setTypeList] = useState([]);
  const [categoryList,setCategoryList] = useState([]);

  if(methodList.length===0 && filter.length!==0){
    setMethodList(Array.from( new Set(filter.map((element)=>element.method.bank?element.method.bank : element.method.name))))
  }

  if(typeList.length===0 && filter.length!==0){
    setCategoryList(Array.from( new Set(filter.map((element)=>element.category))))
  }
  if(categoryList.length===0 && filter.length!==0){
    setTypeList(Array.from(new Set(filter.map((element)=>element.type))))
  }

  console.log(User)
  useEffect(() => {
    if (!data) {
      dispatch(getCustomAmounts({from,to,userId:localStorage.getItem("id")},navigate,onLoading))
      onLoading(true)
    }
    else{
      setFilter(data);
      onLoading(false);
    }
  }, [data])
  useEffect(() => {
    if (filter.length!==0) {
      let temp = [];
      let exp= {}
      let inc = {}
      temp = Array.from(new Set(filter.map((item)=>item.method.bank )))
      temp.map((item1)=>{exp[item1]=0; return true;})
      temp.map((item1)=>{inc[item1]=0; return true;})
      filter.filter((item)=>item.type!=="Income").map((item)=>{
        exp[item.method.bank]=parseInt(exp[item.method.bank])+parseInt(item.amount.amount);
        return true;
      })
      filter.filter((item)=>item.type==="Income").map((item)=>{
        inc[item.method.bank]=parseInt(inc[item.method.bank])+parseInt(item.amount.amount);
        return true;
      })
      console.log(exp)
      setExpense(exp);
      setIncome(inc)
    }
  }, [filter])
  useEffect(() => {
    if (!User) {
      dispatch(getUserDetails({userId:localStorage.getItem("id")},navigate));
    }
  }, [User])

  console.log(data);

  return (
    <div className='tabContent'>
      <div className='tabContent1'>
        <div className='home-container row flex-column'>
          <div className='home-container-1 row align-items-center' style={{ textAlign: "center" }}>
            <div className='home-tab-1 col-xl-3 col-lg-3 col-md-4 col-sm-4 col-6'>
              <span className='title'>Expense</span>
              <div className='row justify-content-center flex-column'>
                {
                  expense!==null && Object.keys(expense).map((key)=>(
                    <div>{key}:₹{expense[key]}</div>
                  ))
                }
              </div>
            </div>
            <div className='home-tab-1 col-xl-3 col-lg-3 col-md-4 col-sm-4 col-6'>
              <span className='title'>Income</span>
              <div className='row justify-content-center flex-column'>
                {
                  income!==null && Object.keys(income).map((key)=>(
                    <div>{key}:₹{income[key]}</div>
                  ))
                }
              </div>
            </div>
            <div className='home-tab-1 col-xl-3 col-lg-3 col-md-4 col-sm-4 col-6'>
              <span className='title'>Wallet</span>
              <div className='row justify-content-center flex-column'>
                {
                  expense!==null && Object.keys(expense).map((key)=>(
                    User.method.filter((item)=>item.bank===key).map((item)=>(
                              <div>{key}:₹{item.amount}</div>
                    ))
                    
                  ))
                }
              </div>
            </div>
          </div>
          <div className='home-container-2 d-flex justify-content-center '>
            <Filter methodList={methodList} typeList={typeList} categoryList={categoryList} from={from} to={to} method={method} type={type} category={category} changeValue={changeValue} getMinDate={getMinDate} />
          </div>
          <div className='home-container-3` row justify-content-center'>
            {filter && 
            <DataTable className='col-xl-10 col-lg-10' stripedRows value={filter} showGridlines paginator rows={10} size={"large"} tableStyle={{ minWidth: '50rem' }}>
              <Column field='date' header="Date"></Column>
              <Column field="note" header="Items"></Column>
              <Column field="type" header="Type"></Column>
              <Column field="amount.display" header="Amount"></Column>
              <Column field="method.displayName" header="Method"></Column>
            </DataTable>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
