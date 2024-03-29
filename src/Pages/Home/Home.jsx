import React, { useEffect, useRef, useState } from 'react'
import "./Home.css"
import { FaCalendar } from 'react-icons/fa';
import Filter from '../../Components/Filter/Filter'
import { DataTable } from "primereact/datatable"
import { Column } from "primereact/column"
import { useDispatch, useSelector } from "react-redux"
import { deleteAmount, getCustomAmounts, postAddAmounts, updateAmount } from '../../Action/Amount'
import { getUserDetails, postExchangeAmount } from '../../Action/User'
import { useNavigate, useLocation } from "react-router-dom"
import { Button, Modal, Input, SelectPicker, DatePicker } from 'rsuite'
import {useWindowDimensions} from "../../utils.js"
import ContextMenu from "../../utils.js";
import "./AddExpense.css"
import moment from "moment"

const Home = ({ loading, onLoading }) => {
	const menuItems = ["Download"];
	const getMinDate = () => {
		const today = new Date();
		today.setHours(0, 0, 0, 0); // Set time to 00:00:00.000
		return moment(today).format("YYYY-MM-DD");
	};

	const getMonthFirst = () => {
		const today = new Date();
		today.setHours(0, 0, 0, 0); // Set time to 00:00:00.000
		today.setDate(1);
		return moment(today).format("YYYY-MM-DD");
	}

	const ref = useRef();
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const location = useLocation()
	const [rows,setRows] = useState(10);
	const { height, width } = useWindowDimensions();
	let data = useSelector((state) => state.customAmountReducer)
	const User = useSelector((state) => state.currentUserReducer)
	const [filter, setFilter] = useState([]);
	const [methodList, setMethodList] = useState([]);
	const [typeList, setTypeList] = useState([]);
	const [categoryList, setCategoryList] = useState([]);
	const [from, setFrom] = useState(getMonthFirst());
	const [to, setTo] = useState(getMinDate());
	const [method, setMethod] = useState([]);
	const [type, setType] = useState([]);
	const [category, setCategory] = useState([]);
	const [expense, setExpense] = useState(null);
	const [income, setIncome] = useState(null);
	const [open,setOpen] = useState(null);
	const [addExpense, setAddExpense] = useState({
		item: "",
		amount: 0,
		date: getMinDate(),
		method: "",
		category: "",
		type: ""
	})
	const [exchange, setExchange] = useState({
		from: null,
		to: null,
		amount: 0,
	})

	const checkDate = (date1, date2) => {
		let Date1 = new Date(date1);
		Date1.setHours(0, 0, 0, 0);
		let Date2 = new Date(date2);
		Date2.setHours(0, 0, 0, 0);
		return Date2.getTime() - Date1.getTime() > 0;
	}

	const changeData = (variable, newData) => {
		let temp = data.filter(() => true)

		if (variable === "method" && newData.length !== 0) {
			temp = temp.filter((item) => newData.includes(item.method.name))
		} else if (variable !== "method" && method.length !== 0) {
			temp = temp.filter((item) => method.includes(item.method.name))
		}

		if (variable === "type" && newData.length !== 0) {
			temp = temp.filter((item) => newData.includes(item.type))
		} else if (variable !== "type" && type.length !== 0) {
			temp = temp.filter((item) => type.includes(item.type))
		}

		if (variable === "category" && newData.length !== 0) {
			temp = temp.filter((item) => newData.includes(item.category))
		} else if (variable !== "category" && category.length !== 0) {
			temp = temp.filter((item) => category.includes(item.category))
		}
		setFilter(temp);
	}

	const handleClose = () => {
		setAddExpense({
			item: "",
			amount: 0,
			date: getMinDate(),
			method: "",
			category: "",
			type: ""
		})
		setExchange({
			from:null,
			to:null,
			amount:0,
		})
		setOpen(null)
		navigate('/Home')
	}

	const changeValue = (variable, value) => {
		let temp = []
		if (variable === "from") {
			if (checkDate(value, to)) {
				dispatch({ type: "FETCH_CUSTOM_AMOUNTS", payload: null })
				setFrom(moment(value).format("YYYY-MM-DD"));
			}
			else
				alert("Invalid Date");
		}
		else if (variable === "to") {
			if (checkDate(from, value)) {
				dispatch({ type: "FETCH_CUSTOM_AMOUNTS", payload: null })
				setTo(moment(value).format("YYYY-MM-DD"));
			}
			else
				alert("Invalid Date");
		}
		else if (variable === "method") {
			temp = method.filter(() => true);
			if (temp.indexOf(value) !== -1) {
				temp = temp.filter((item) => item !== value)
				changeData(variable, temp);
				setMethod(temp);
			}
			else {
				temp.push(value);
				changeData(variable, temp);
				setMethod(temp);
			}
		}
		else if (variable === "type") {
			temp = type.filter(() => true);
			if (temp.indexOf(value) !== -1) {
				temp = temp.filter((item) => item !== value)
				changeData(variable, temp);
				setType(temp);
			}
			else {
				temp.push(value);
				changeData(variable, temp);
				setType(temp);
			}
		}
		else if (variable === "category") {
			temp = category.filter(() => true)
			if (temp.indexOf(value) !== -1) {
				temp = temp.filter((item) => item !== value)
				changeData(variable, temp);
				setCategory(temp);
			}
			else {
				temp.push(value);
				changeData(variable, temp);
				setCategory(temp);
			}
		}
	}

	const handleAdd = () =>{
		if(!addExpense.item || !addExpense.amount || !addExpense.date || !addExpense.category || !addExpense.method || !addExpense.type){
			alert("Kindly fill all the details to add expense");
		}
		else{
			handleClose();
			onLoading(true);
			dispatch(postAddAmounts(addExpense,{from,to},navigate,onLoading));
		}
	}

	const handleEdit = (id) =>{
		if(!addExpense.item || !addExpense.amount || !addExpense.date || !addExpense.category || !addExpense.method || !addExpense.type){
			alert("Kindly fill all the details to add expense");
		}
		else{
			handleClose();
			onLoading(true);
			dispatch(updateAmount(addExpense,id,{from,to},navigate,onLoading));
			
		}
	}

	const handleDelete = (id) =>{
		if(window.confirm("Do you want to delete?")){
		handleClose();
		onLoading(true)
		dispatch(deleteAmount(id,{from,to},navigate,onLoading))
		}
	}

	const handleOpen = (id) =>{
		let temp = {}
		filter.filter((item)=>item._id===id).map((item)=>{
			temp.item=item.note
			temp.amount = item.amount.amount
			console.log(new Date(item.date))
			temp.date= new Date(item.date)
			temp.method=item.method.name
			temp.category=item.category
			temp.type=item.type
			return true;
		});
		setAddExpense(temp);
		setOpen(id);
	}

	const handleExchange = () =>{
		if(!exchange.from || !exchange.to || !exchange.amount){
			alert("Kindly fill all the details to exchange amount");
		}
		else{
			handleClose();
			onLoading(true);
			dispatch(postExchangeAmount(exchange,navigate,onLoading));
		}
	}

	const exportExcel = () => {
        import('xlsx').then((xlsx) => {
            const worksheet = xlsx.utils.json_to_sheet(filter.map((item)=>{return {date:item.date,note:item.note,type:item.type,method:item.method.name,category:item.category,amount:parseInt(item.amount.amount)}}));
            const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
            const excelBuffer = xlsx.write(workbook, {
                bookType: 'xlsx',
                type: 'array'
            });

            saveAsExcelFile(excelBuffer, 'products');
        });
    };

	const saveAsExcelFile = (buffer, fileName) => {
        import('file-saver').then((module) => {
            if (module && module.default) {
                let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
                let EXCEL_EXTENSION = '.xlsx';
                const data = new Blob([buffer], {
                    type: EXCEL_TYPE
                });

                module.default.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
            }
        });
    };

	if (methodList.length === 0 && filter.length !== 0) {
		setMethodList(Array.from(new Set(filter.map((element) => element.method.name))))
	}
	if (typeList.length === 0 && filter.length !== 0) {
		setTypeList(Array.from(new Set(filter.map((element) => element.type))))
	}
	if (categoryList.length === 0 && filter.length !== 0) {
		setCategoryList(Array.from(new Set(filter.map((element) => element.category))))
	}

	useEffect(()=>{
		if(height>1200){
			setRows(20);
		}
		else{
			setRows(10);
		}
	},[height])

	useEffect(() => {
		if (!data) {
			dispatch(getCustomAmounts({ from, to }, navigate, onLoading))
			onLoading(true)
		}
		else {
			setFilter(data);
			onLoading(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data, dispatch])

	useEffect(() => {
		if (filter.length !== 0 && User!==null) {
			let temp = [];
			let exp = {}
			let inc = {}
			temp = Array.from(new Set(User.method.map((item) => item.name)))
			temp.map((item1) => { exp[item1] = 0; return true; })
			temp.map((item1) => { inc[item1] = 0; return true; })
			filter.filter((item) => item.type !== "Income").map((item) => {
				exp[item.method.name] = parseInt(exp[item.method.name]) + parseInt(item.amount.amount);
				return true;
			})
			filter.filter((item) => item.type === "Income").map((item) => {
				inc[item.method.name] = parseInt(inc[item.method.name]) + parseInt(item.amount.amount);
				return true;
			})
			setExpense(exp);
			setIncome(inc)
		}
	}, [filter,User])

	useEffect(() => {
		if (!User) {
			dispatch(getUserDetails(navigate));
		}
	}, [User, dispatch, navigate])


	console.log(User)
	console.log(data);
	console.log(addExpense)
	console.log(exchange)
	console.log(open)
	console.log({width,height})
	console.log({from,to})

	return (
		<>
			<div className='tabContent'>
				<div className='tabContent1'>
					<div className='home-container row flex-column'>
						<div className='home-container-1 row align-items-center' style={{ textAlign: "center" }}>
							<div className='home-tab-1 col-xl-3 col-lg-3 col-md-4 col-sm-4 col-6'>
								<span className='title'>Expense</span>
								<div className='row justify-content-center flex-column'>
									{
										expense !== null && Object.keys(expense).map((key) => (
											<div key={key}>{key}:₹{expense[key]}</div>
										))
									}
								</div>
							</div>
							<div className='home-tab-1 col-xl-3 col-lg-3 col-md-4 col-sm-4 col-6'>
								<span className='title'>Income{location.pathname === "addexpense"}</span>
								<div className='row justify-content-center flex-column'>
									{
										income !== null && Object.keys(income).map((key) => (
											<div key={key}>{key}:₹{income[key]}</div>
										))
									}
								</div>
							</div>
							<div className='home-tab-1 col-xl-3 col-lg-3 col-md-4 col-sm-4 col-6'>
								<span className='title'>Wallet</span>
								<div className='row justify-content-center flex-column'>
									{
										expense !== null && User !== null && Object.keys(expense).map((key) => (
											User.method.filter((item) => item.name === key).map((item) => (
												<div key={key}>{key}:₹{item.amount}</div>
											))

										))
									}
								</div>
							</div>
						</div>
						<div className='home-container-2 d-flex justify-content-center '>
							{
								method && type && category &&
								<Filter methodList={methodList} typeList={typeList} categoryList={categoryList} from={from} to={to} method={method} type={type} category={category} changeValue={changeValue} getMinDate={getMinDate} />
							}
						</div>
						<div ref={ref} className='home-container-3` row justify-content-center'>
							{filter &&
								<DataTable  selectionMode={"single"} onRowClick={(event)=>handleOpen(event.data._id)} className='col-xl-10 col-lg-10' stripedRows value={filter} showGridlines paginator rows={rows} size={"large"} tableStyle={{ minWidth: '50rem' }}>
									<Column field='date' header="Date"></Column>
									<Column field="note" header="Items"></Column>
									<Column field="type" header="Type"></Column>
									<Column field="amount.display" header="Amount"></Column>
									<Column field="method.name" header="Method"></Column>
								</DataTable>
							}
						</div>
					</div>
				</div>
			</div>
			<Modal size="xs" open={open!==null || location.pathname === "/addexpense"} onClose={handleClose}>
				<Modal.Header>
					<Modal.Title>
						{
							open!==null ? "Edit Expense" : "Add Expense"
						}
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className='addexpense'>
						{
							User && 

							<table>
								<tr>
									<th>Item</th>
									<td><Input className='addexpense_element' value={addExpense.item} onChange={(value) => setAddExpense((prev) => { return { ...prev, item: value } })} /></td>
								</tr>
								<tr>
									<th>Amount</th>
									<td><Input type="number" className='addexpense_element' value={addExpense.amount} onChange={(value) => setAddExpense((prev) => { return { ...prev, amount: value } })} /></td>
								</tr>
								<tr>
									<th>Date</th>
									<td><DatePicker className='addexpense_element' value={new Date(addExpense.date)} onChange={(value) => setAddExpense((prev) => { return { ...prev, date: moment(value).format("YYYY-MM-DD") } })} onClean={() => setAddExpense((prev) => { return { ...prev, date: getMinDate() } })} oneTap format="MMM dd, yyyy" caretAs={FaCalendar} shouldDisableDate={(date) => date > getMinDate()} /></td>
								</tr>
								<tr>
									<th>Category</th>
									<td><SelectPicker className='addexpense_element' value={addExpense.category} onChange={(value) => setAddExpense((prev) => { return { ...prev, category: value } })} data={User.category.map((item) => { return { label: item, value: item } })} /></td>
								</tr>
								<tr>
									<th>Method</th>
									{
										open!==null ?
										<td><Input readOnly={true} className='addexpense_element' value={addExpense.method} /></td> :
										<td><SelectPicker className='addexpense_element' value={addExpense.method} onChange={(value) => setAddExpense((prev) => { return { ...prev, method: value } })} data={User.method.map((item) => { return { label: item.name, value: item.name } })}/></td>
									}
								</tr>
								<tr>
									<th>Type</th>
									{
										open!==null ?
										<td><SelectPicker className='addexpense_element' value={addExpense.type} onChange={(value) => setAddExpense((prev) => { return { ...prev, type: value } })} data={User.type.map((item) => { return { label: item.name !== "Income" ? item.name + " Expense" : item.name, value: item.name } })} onClean={()=>setAddExpense((prev)=>{return {...prev,type:filter.filter((item)=>item._id===open).map((item)=>{return item.type})[0]}})} disabledItemValues={addExpense.type!=="Income"?["Income"]:User.type.filter((item)=>item.type!=="Income").map((item)=>{return item.name})} /></td>
										:
										<td><SelectPicker className='addexpense_element' value={addExpense.type} onChange={(value) => setAddExpense((prev) => { return { ...prev, type: value } })} data={User.type.map((item) => { return { label: item.name !== "Income" ? item.name + " Expense" : item.name, value: item.name } })} /></td>
									}
									
								</tr>
							</table>
						}
					</div>
				</Modal.Body>
				<Modal.Footer>
					{
						open!==null ? 
						<>
						<Button onClick={()=>handleEdit(open)} color="green" appearance="primary">
							Update
						</Button>
						<Button onClick={()=>handleDelete(open)} color="red" appearance="primary">
							Delete
						</Button>
						</> : 
						<>
						<Button onClick={()=>handleAdd()} color="green" appearance="primary">
							Save
						</Button>
						<Button onClick={handleClose} appearance="default">
							Cancel
						</Button>
						</>
					}
					
				</Modal.Footer>
			</Modal>
			
			<Modal size="xs" open={location.pathname === "/exchange"} onClose={handleClose}>
				<Modal.Header>
					<Modal.Title>Add Expense</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className='addexpense'>
						{
							User &&

							<table>
								<tr>
									<th>From</th>
									<td><SelectPicker className='addexpense_element' value={exchange.from} onChange={(value) => setExchange((prev) => { return { ...prev, from: value } })} data={User.method.map((item) => { return { label: item.name, value: item.name } })} onClean={() => setExchange((prev) => { return { ...prev, from: null, to: null } })} /></td>
								</tr>
								<tr>
									<th>To</th>
									<td><SelectPicker className='addexpense_element' value={exchange.to} onChange={(value) => setExchange((prev) => { return { ...prev, to: value } })} data={User.method.filter((item) => item.name !== exchange.from).map((item) => { return { label: item.name, value: item.name } })} disabled={exchange.from === null} /></td>
								</tr>
								<tr>
									<th>Amount</th>
									<td><Input type="number" className='addexpense_element' value={exchange.amount} onChange={(value) => setExchange((prev) => { return { ...prev, amount: value } })} /></td>
								</tr>

							</table>
						}
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={()=>handleExchange()} color="green" appearance="primary">
						Save
					</Button>
					<Button onClick={handleClose} appearance="subtle">
						Cancel
					</Button>
				</Modal.Footer>
			</Modal>
			<ContextMenu parent={ref} menuItems={menuItems} clickedMenu={()=>exportExcel()} />
		</>
	)
}

export default Home
