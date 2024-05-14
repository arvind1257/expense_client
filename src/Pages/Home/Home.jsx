import React, { useEffect, useRef, useState } from 'react'
import "./Home.css"
import { FaCalendar } from 'react-icons/fa';
import Filter from '../../Components/Filter/Filter'
import { DataTable } from "primereact/datatable"
import { Column } from "primereact/column"
import { useDispatch, useSelector } from "react-redux"
import { deleteAmount, deleteSettleExpense, getCustomAmounts, postAddAmounts, postSettleExpense, updateAmount } from '../../Action/Amount'
import { getUserDetails, postExchangeAmount } from '../../Action/User'
import { useNavigate, useLocation } from "react-router-dom"
import { Button, Modal, Input, SelectPicker, DatePicker,Whisper,Tooltip } from 'rsuite'
import {useWindowDimensions} from "../../utils.js"
import ContextMenu from "../../utils.js";
import "./AddExpense.css"
import moment from "moment"

const Home = ({search, loading, onLoading }) => {
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
	const [methodList, setMethodList] = useState(null);
	const [typeList, setTypeList] = useState(null);
	const [categoryList, setCategoryList] = useState(null);
	const [view,setView] = useState("settle")
	const [from, setFrom] = useState(getMonthFirst());
	const [to, setTo] = useState(getMinDate());
	const [method, setMethod] = useState([]);
	const [type, setType] = useState([]);
	const [category, setCategory] = useState([]);
	const [expense, setExpense] = useState(null);
	const [income, setIncome] = useState(null);
	const [open,setOpen] = useState(null);
	const [total,setTotal] = useState({});
	const [settle,setSettle] = useState({
		_id:null,
		original:0,
		amount:0,
		date:getMinDate(),
		method:"",
	})
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
		date:getMinDate()
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
			temp = temp.filter((item) => newData.includes(item.type.name))
		} else if (variable !== "type" && type.length !== 0) {
			temp = temp.filter((item) => type.includes(item.type.name))
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
			date:getMinDate()
		})
		setOpen(null)
		setSettle({
			_id:null,
			original:0,
			amount:0,
			date:getMinDate(),
			method:"",
		})
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

	const buttonView = (item) =>{
		return <button className='settle_trash' onClick={()=>handleDeleteSettlement(item)}><i className='bx bxs-trash'></i></button>
	}

	const handleDeleteSettlement = (id) => {
		handleClose();
		onLoading(true);
		dispatch(deleteSettleExpense({amountId:settle._id,id:id._id},{from,to},navigate,onLoading));
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
			console.log(addExpense)
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
			temp.date= moment(new Date(item.date)).format("YYYY-MM-DD")
			temp.method=item.method.name
			temp.category=item.category
			temp.type=item.type.name
			//temp.update=(User.type.filter((item1)=>item1._id===item.type._id).length>0 && item.payments.length===0)
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
			dispatch(postExchangeAmount(exchange,{from,to},navigate,onLoading));
			console.log(exchange)
		}
	}

	const handleSettle = (id) => {
		setOpen(null)
		let temp = filter.filter((item)=>item._id===id)[0]
		let amt = parseInt(temp.amount.amount)
		
		if(temp.type.name==="Paid")
			amt=0;

		setSettle((prev)=>{return {...prev,
			_id:id,
			original:amt,
		}})
	}

	const handleSettlement = () => {
		if(!settle.date || !settle.method || !settle.amount){
			alert("Kindly fill all the details to settle the expense");
		}
		else{
			let temp = structuredClone(settle)
			handleClose();
			onLoading(true);
			dispatch(postSettleExpense(temp,{from,to},navigate,onLoading));
			console.log(temp)
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

	useEffect(()=>{
		if(User!==null && filter!==null){
			let temp = []
			let exp = {}
			let inc = {}
			let total1 = {expense:0,income:0,wallet:0};
			User.method.map((item)=>{
				total1.wallet+=parseInt(item.amount);
				return true;
			})
			temp = Array.from(new Set(User.method.map((item) => item.name)))
			temp.map((item1) => { exp[item1] = 0; inc[item1] = 0; return true; })
			console.log()
			filter.filter((item) => item.type.type === "Expense" || item.type.type === "Settlement Expense" ).map((item) => {
				exp[item.method.name] = parseInt(exp[item.method.name]) + parseInt(item.amount.amount);
				total1.expense+=parseInt(item.amount.amount)
				return true;
			})
			filter.filter((item) => item.type.type === "Income").map((item) => {
				inc[item.method.name] = parseInt(inc[item.method.name]) + parseInt(item.amount.amount);
				total1.income+=parseInt(item.amount.amount)
				return true;
			})

			total1.expense = "₹"+total1.expense; 
			total1.income = "₹"+total1.income;
			total1.wallet = "₹"+total1.wallet;
			
			setExpense(exp)
			setIncome(inc)
			setTotal(total1)
			
		}
	},[User,filter])

	useEffect(() => {
		if (User && data ) {
			setMethodList(Array.from(new Set(data.map((element) => element.method.name))))
			setTypeList(Array.from(new Set(data.map((element) => element.type.name))))
			setCategoryList(Array.from(new Set(data.map((element) => element.category))).filter((element)=>element!=="None"))
			setMethod([])
			setType([])
			setCategory([])
		}
	}, [User, data])

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
	console.log(settle)
	if(settle._id){
		console.log(filter.filter((item)=>item._id===settle._id))
	}

	
	
	return (
		<>
			<div className='tabContent'>
				<div className='tabContent1'>
					<div className='home-container row flex-column'>
						<div className='home-container-1 row align-items-center' style={{ textAlign: "center" }}>
							<div className='home-tab-1 col-xl-3 col-lg-3 col-md-4 col-sm-4 col-6'>
								<Whisper placement="top" speaker={<Tooltip className="amount-tooltip"><p>{total.expense}</p></Tooltip>}>      
									<span className='title'>Expense</span>
								</Whisper>
								<div className='row justify-content-center flex-column'>
									<table style={{width:"fit-content",margin:"0px auto"}}>
									{
										expense !== null && Object.keys(expense).map((key) => (
											<tr key={key}>
												<td align="left">{key}</td>
												<td align='right'><span style={{float:"left"}}>:</span>&nbsp;₹{expense[key]}</td>
											</tr>
										))
									}
									</table>
								</div>
							</div>
							<div className='home-tab-1 col-xl-3 col-lg-3 col-md-4 col-sm-4 col-6'>
								<Whisper placement="top" speaker={<Tooltip className="amount-tooltip"><p>{total.income}</p></Tooltip>}>      
									<span className='title'>Income</span>
								</Whisper>
								<div className='row justify-content-center flex-column'>
									<table style={{width:"fit-content",margin:"0px auto"}}>
									{
										income !== null && Object.keys(income).map((key) => (
											<tr key={key}>
												<td align="left">{key}</td>
												<td align='right'><span style={{float:"left"}}>:</span>&nbsp;₹{income[key]}</td>
											</tr>
										))
									}
									</table>
								</div>
							</div>
							<div className='home-tab-1 col-xl-3 col-lg-3 col-md-4 col-sm-4 col-6'>
								<Whisper placement="top" speaker={<Tooltip className="amount-tooltip"><p>{total.wallet}</p></Tooltip>}>      
									<span className='title'>Wallet</span>
								</Whisper>
								<div className='row justify-content-center flex-column'>
									<table style={{width:"fit-content",margin:"0px auto"}}>
									{
										expense !== null && User !== null && Object.keys(expense).map((key) => (
											User.method.filter((item) => item.name === key).map((item) => (
											<tr key={key}>
												<td align="left">{key}</td>
												<td align='right'><span style={{float:"left"}}>:</span>&nbsp;₹{item.amount}</td>
											</tr>
										))
									))
									}
									</table>
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
								<DataTable  selectionMode={"single"} onRowClick={(event)=>handleOpen(event.data._id)} className='col-xl-10 col-lg-10' stripedRows value={search!==""?filter.filter((item)=>item.note.includes(search)):filter} showGridlines paginator rows={rows} size={"large"} tableStyle={{ minWidth: '50rem' }}>
									<Column field='date' header="Date"></Column>
									<Column field="note" header="Items"></Column>
									<Column field="type.name" header="Type"></Column>
									<Column field="amount.display" header="Amount"></Column>
									<Column field="method.name" header="Method"></Column>
								</DataTable>
							}
						</div>
					</div>
				</div>
			</div>
			<Modal size="xs" open={open!==null || location.pathname === "/addexpense"} onClose={()=>handleClose()}>
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
									<td><DatePicker className='addexpense_element' value={new Date(addExpense.date)} onChange={(value) => setAddExpense((prev) => { return { ...prev, date: moment(value).format("YYYY-MM-DD") } })} onClean={() => setAddExpense((prev) => { return { ...prev, date: getMinDate() } })} oneTap format="MMM dd, yyyy" caretAs={FaCalendar} shouldDisableDate={(date) => date > new Date(getMinDate())} /></td>
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
										User.type.filter((item)=>item.name===addExpense.type).length>0 ?
										<td><SelectPicker className='addexpense_element' value={addExpense.type} onChange={(value) => setAddExpense((prev) => { return { ...prev, type: value,category: User.type.filter((item)=>item.name===value)[0].type!=="Expense"?"None":"" } })} data={User.type.sort((a,b)=>a.type===b.type?a.name>b.name?1:-1:a.type>b.type?-1:1).map((item) => { return { label: item.type !== "Income" ? item.name + " Expense" : item.name, value: item.name } })} onClean={()=>setAddExpense((prev)=>{return {...prev,type:filter.filter((item)=>item._id===open).map((item)=>{return item.type.name})[0]}})} disabledItemValues={User.type.filter((item)=>item.name===addExpense.type)[0].type!=="Income" ?User.type.filter((item)=>item.type==="Income").map((item)=>{return item.name}):User.type.filter((item)=>item.type!=="Income").map((item)=>{return item.name})} /></td>
										:
										<td><SelectPicker className='addexpense_element' value={addExpense.type} readOnly data={[{label:addExpense.type,value:addExpense.type}]} /></td>
										:
										<td><SelectPicker className='addexpense_element' value={addExpense.type} onChange={(value) => setAddExpense((prev) => { return { ...prev, type: value,category: User.type.filter((item)=>item.name===value)[0].type!=="Expense"?"None":"" } })} data={User.type.sort((a,b)=>a.type===b.type?a.name>b.name?1:-1:a.type>b.type?-1:1).map((item) => { return { label: item.type !== "Income" ? item.name + " Expense" : item.name, value: item.name } })} /></td>
									}
								</tr>
								<tr>
									<th>Category</th>
									<td><SelectPicker className='addexpense_element' value={addExpense.category} onChange={(value) => setAddExpense((prev) => { return { ...prev, category: value } })} data={User.category.map((item) => { return { label: item, value: item } })} disabled={User.type.filter((item)=>item.name===addExpense.type).length>0? User.type.filter((item)=>item.name===addExpense.type)[0].type!=="Expense":true} /></td>
								</tr>
							</table>
						}
					</div>
				</Modal.Body>
				<Modal.Footer>
					{
						open!==null ? 
						<>
						{
							(filter.filter((item)=>item._id===open)[0].type.type ==="Settlement Expense" || filter.filter((item)=>item._id===open)[0].type.name ==="Credit" || filter.filter((item)=>item._id===open)[0].type.name ==="Paid")&&
							<Button onClick={()=>handleSettle(open)} appearance='primary'>
								Settle
							</Button>
						}
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
						<Button onClick={()=>handleClose()} appearance="default">
							Cancel
						</Button>
						</>
					}
					
				</Modal.Footer>
			</Modal>
			
			<Modal size="xs" open={location.pathname === "/exchange"} onClose={()=>handleClose()}>
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
					<Button onClick={()=>handleClose()} appearance="subtle">
						Cancel
					</Button>
				</Modal.Footer>
			</Modal>
			<Modal size="xs" open={settle._id!==null} onClose={()=>handleClose()}>
				<Modal.Header>
					<Modal.Title>Expense Settlement</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className='addexpense'>
						<div className='navigate'>
							<button className={view==="settle"?"active":""} onClick={()=>setView("settle")} >Settlement</button>
							<button className={view==="payment"?"active":""} onClick={()=>setView("payment")} >Payment List</button>
						</div>
						{
							User && view==="settle" &&

							<table>
								<tr>
									<th>Pending Amount</th>
									<td><Input value={settle.original} readOnly/></td>
								</tr>
								<tr>
									<th>Date</th>
									<td><DatePicker className='addexpense_element' value={new Date(settle.date)} onChange={(value) => setSettle((prev) => { return { ...prev, date: moment(value).format("YYYY-MM-DD") } })} onClean={() => setSettle((prev) => { return { ...prev, date: getMinDate() } })} oneTap format="MMM dd, yyyy" caretAs={FaCalendar} shouldDisableDate={(date) => date > new Date(getMinDate())} /></td>
								</tr>
								<tr>
									<th>Method</th>
									<td><SelectPicker className='addexpense_element' value={settle.method} onChange={(value) => setSettle((prev) => { return { ...prev, method: value } })} data={User.method.map((item) => { return { label: item.name,value: item.name } })}/></td>
								</tr>
								<tr>
									<th>Amount</th>
									<td><Input type="number" className='addexpense_element' value={settle.amount} onChange={(value) =>value<=settle.original && value>=0 ? setSettle((prev) => { return { ...prev, amount: value }}):alert("Invalid Amount")} /></td>
								</tr>
							</table>
						}
						{
							settle._id && User && view==="payment" && 
							<DataTable style={{fontSize:"14px",padding:"15px 0px"}}  selectionMode={"single"} size="small" stripedRows value={filter.filter((item)=>item._id===settle._id)[0].payments} showGridlines tableStyle={{ minWidth: '20rem' }}>
									<Column field='date' header="Date"></Column>
									<Column field="method.name" header="Method"></Column>
									<Column field="amount" header="Amount"></Column>
									<Column field='_id' header="Action" body={buttonView}></Column>
							</DataTable>
						}
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={()=>handleSettlement()} color="green" appearance="primary">
						Save
					</Button>
					<Button onClick={()=>handleClose()} appearance="subtle">
						Cancel
					</Button>
				</Modal.Footer>
			</Modal>
			<ContextMenu parent={ref} menuItems={menuItems} clickedMenu={()=>exportExcel()} />
		</>
	)
}

export default Home
