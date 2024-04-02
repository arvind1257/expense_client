

import React,{useEffect, useRef, useState} from 'react'
import "./Settings.css"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { editDetails, getUserDetails, updateDetails, updatePassword, updateProfile } from '../../Action/User.js'

import { Button, Input, InputGroup, Modal, SelectPicker } from 'rsuite';
import EyeIcon from '@rsuite/icons/legacy/Eye';
import EyeSlashIcon from '@rsuite/icons/legacy/EyeSlash';
import { getBankList } from '../../Action/Amount.js'

const Settings = ({onLoading,Loading}) => {

	const ref = useRef()
	const ref1 = useRef();
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const [height,setHeight] = useState(window.innerHeight);
	const [height1,setHeight1] = useState(-1);
	const [menu,setMenu] = useState("profile");
	const User = useSelector((state) => state.currentUserReducer)
	const bankList = useSelector((state) => state.bankListReducer)
	const [type,setType] = useState([])
	const [method,setMethod] = useState([])
	const [category,setCategory] = useState([])
	const [buttonType,setButtonType] = useState(null)
	const [buttonMethod,setButtonMethod] = useState(null)
	const [buttonCategory,setButtonCategory] = useState(null)
	const [password,setPassword] = useState({
		oldPass:"",
		newPass:"",
	})
	const [profile,setProfile] = useState({
		fname:"",
		lname:"",
		gender:null,
	})
	const [visible, setVisible] = React.useState(false);
	const [visible1, setVisible1] = React.useState(false);

	useEffect(() => {
		if (User === null) {
			dispatch(getUserDetails(navigate))
		}
	}, [User, dispatch, navigate])

	useEffect(()=>{
		if(bankList===null || bankList.length===0)
			dispatch(getBankList(navigate,onLoading))
	},[dispatch,navigate,onLoading,bankList])

	const delay = (delayInms) => {
		return new Promise(resolve => setTimeout(resolve, delayInms));
	};

	const openMenu = async(item,index,_count) =>{
		for(let i=0;i<ref.current.childNodes.length;i++){
			console.log("hi")
			ref.current.childNodes[i].classList.remove("active1")
		}
		ref.current.childNodes[index].classList.add("active1")
		console.log(ref.current.childNodes[index].classList)
		setMenu(item)
		await delay(10);
		setHeight1(-1);
	}

	const changeHeight = () =>{
		setHeight(window.innerHeight)
		setHeight1(ref1.current.offsetHeight)
	}

	const ChangeAction = (action) => {
		if(action==="New-type"){
			setType([{
				name:"",
				type:""
			}])
			setButtonType(action);
		}
		else if(action==="New-method"){
			setMethod([{
				name:"",
				type:"Bank",
				amount:0,
			}])
			setButtonMethod(action);
		}
		else if(action==="New-category"){
			setCategory([""])
			setButtonCategory(action);
		}
		else if(action==="Plus-Add-type"){
			let temp = type.filter(()=>true)
			temp.push({
				name:"",
				type:""	
			})
			setType(temp);
		}
		else if(action==="Plus-Add-method"){
			let temp = method.filter(()=>true)
			temp.push({
				name:"",
				type:"Bank",
				amount:0,
			})
			setMethod(temp);
		}
		else if(action==="Plus-Add-category"){
			let temp = category.filter(()=>true)
			temp.push("");
			setCategory(temp);
		}
		else if(action==="Edit-type"){
			let temp =  structuredClone(User.type.filter((item)=>item.type!=="Income"))
			temp.map((item)=>{item.action=false; return item})
			setButtonType(action);
			setType(temp);
		}
		else if(action==="Edit-method"){
			let temp =  structuredClone(User.method)
			temp.map((item)=>{item.action=false; return item})
			setButtonMethod(action);
			setMethod(temp);
		}
		else if(action==="Edit-category"){
			let temp = structuredClone(User.category)
			temp = temp.map((item,index)=>{return {name:item,action:false,index:index}})
			setButtonCategory(action);
			setCategory(temp);
		}
		else if(action===null){
			setType([])
			setMethod([])
			setCategory([])
			setButtonType(null)
			setButtonMethod(null)
			setButtonCategory(null)
		}
	}

	const changeType = (variable,index,value) =>{
		console.log({variable,index,value})
		if(value==="delete"){
			let temp = type.filter((item,i)=>{if(i!==index) return true; else return false;})
			setType(temp);
		}
		else if(variable==="action" && value===false){
			let temp = structuredClone(type);
			temp[index][variable] = value;
			temp[index].name = User.type[index].name;
			temp[index].type = User.type[index].type;
			setType(temp);
		}
		else{
			let temp =  structuredClone(type);
			temp[index][variable] = value;
			setType(temp);
		}
	}

	const changeMethod = (variable,index,value) =>{
		if(value==="delete"){
			let temp = method.filter((item,i)=>{if(i!==index) return true; else return false;})
			setMethod(temp);
		}
		else if(variable==="action" && value===false){
			let temp = structuredClone(method);
			temp[index][variable] = value;
			temp[index].name = User.method[index].name;
			setMethod(temp);
		}
		else{
			let temp =  structuredClone(method);
			temp[index][variable] = value;
			setMethod(temp);
		}
	}

	const changeCategory = (variable,index,value) =>{
		if(value==="delete"){
			let temp = category.filter((item,i)=>{if(i!==index) return true; else return false;})
			setCategory(temp);
		}
		else if(variable===""){
			let temp = structuredClone(category)
			temp[index] = value;
			setCategory(temp);
		}
		else{
			let temp =  structuredClone(category);
			temp[index][variable] = value;
			setCategory(temp);
		}
	}

	const handleProfile = () => {
		let temp = {};
		Object.keys(profile).map((key)=>{
			if(profile[key]!==null && profile[key]!==""){
				temp[key] = profile[key]
			}
			return true
		})
		onLoading(true)
		setProfile({
			fname:"",
			lname:"",
			gender:null
		})
		dispatch(updateProfile(temp,navigate,onLoading))
	}

	const handlePassword = () => {
		if(!password.newPass){
			alert("Enter the new password")
		}
		else if(!password.oldPass){
			alert("Enter the current password")
		}
		else if(password.newPass===password.oldPass){
			alert("Current Password and New Password can't be same")
		}
		else{
			onLoading(true)
			setPassword({
				oldPass:"",
				newPass:"",
			})
			dispatch(updatePassword(password,navigate,onLoading))
		}
	}

	const handleType = (action) => {
		if(action==="New"){
			if(type.filter((item)=>item.name==="" || item.type==="").length>0){
				alert("Kindly fill the empty fields")
			}
			else{
				if(type.filter((item1)=>{if(User.type.filter((item2)=>item1.name===item2.name).length>0) return true; else return false;}).length>0){
					alert("The value you have edited now, is already exist in the list")
				}
				else if(type.filter((item1,index1)=>{if(type.filter((item2,index2)=>item1.name===item2.name && index1!==index2).length>0) return true; else return false;}).length>0){
					alert("No Duplicate values are allowed")
				}
				else{
					onLoading(true);
					let temp = structuredClone(type)
					ChangeAction(null)
					console.log(temp)
					dispatch(updateDetails(temp,"type",navigate,onLoading))
				}
			}
		}
		else{
			let temp = []
			if(type.filter((item)=>item.action===true || item.action==="Delete").length===0){
				alert("No changes found to update the list")
			}
			else{
				if(type.filter((item1)=>{if(User.type.filter((item2)=>item1.name===item2.name && item1._id!==item2._id && item1.action===true).length>0) return true; else return false;}).length>0){
					alert("The value you have edited now, is already exist in the list")
				}
				else if(type.filter((item1)=>{if(type.filter((item2)=>item1.name===item2.name && item1._id!==item2._id).length>0) return true; else return false;}).length>0){
					alert("No duplicate values are allowed")
				}
				else{
					type.filter((item)=>item.action===true || item.action==="Delete").map((item)=>{
						temp.push({
							_id:item._id,
							name:item.name,
							type:item.type,
							action:item.action!=="Delete"?"Edit":"Delete"
						})
						return true;
					})
					onLoading(true)
					ChangeAction(null)
					console.log(temp)
					dispatch(editDetails(temp,"type",navigate,onLoading))
				}
			}
		}
	}

	const handleMethod = (action) => {
		if(action==="New"){
			if(method.filter((item)=>item.name==="").length>0){
				alert("Kindly fill the empty fields")
			}
			else{
				if(method.filter((item1)=>{if(User.method.filter((item2)=>item1.name===item2.name).length>0) return true; else return false;}).length>0){
					alert("The value you have edited now, is already exist in the list")
				}
				else if(method.filter((item1,index1)=>{if(method.filter((item2,index2)=>item1.name===item2.name && index1!==index2).length>0) return true; else return false;}).length>0){
					alert("No Duplicate values are allowed")
				}
				else{
					onLoading(true);
					let temp = structuredClone(method)
					ChangeAction(null)
					dispatch(updateDetails(temp,"method",navigate,onLoading))
					console.log(temp)
				}
			}
		}
		else{
			let temp = []
			if(method.filter((item)=>item.action===true || item.action==="Delete").length===0){
				alert("No changes found to update the list")
			}
			else{
				if(method.filter((item1)=>{if(User.method.filter((item2)=>item1.name===item2.name && item1._id!==item2._id && item1.action===true).length>0) return true; else return false;}).length>0){
					alert("The value you have edited now, is already exist in the list")
				}
				else if(method.filter((item1)=>{if(method.filter((item2)=>item1.name===item2.name && item1._id!==item2._id).length>0) return true; else return false;}).length>0){
					alert("No duplicate values are allowed")
				}
				else{

					method.filter((item)=>item.action===true || item.action==="Delete").map((item)=>{
						temp.push({
							_id:item._id,
							name:item.name,
							amount:item.amount,
							type:item.type,
							action:item.action!=="Delete" && item.name===User.method.filter((item1)=>item._id===item1._id)[0].name?"Custom":item.action!=="Delete"?"Edit":"Delete"
						})
						return true;
					})
					onLoading(true);
					ChangeAction(null)
					dispatch(editDetails(temp,"method",navigate,onLoading))
					console.log(temp)
				}
			}
		}
	}

	const handleCategory = (action) => {
		if(action==="New"){
			if(category.filter((item)=>item==="").length>0){
				alert("Kindly fill the empty fields")
			}
			else{
				if(category.filter((item1)=>{if(User.category.filter((item2)=>item1===item2).length>0) return true; else return false;}).length>0){
					alert("The value you have edited now, is already exist in the list")
				}
				else if(category.filter((item1,index1)=>{if(category.filter((item2,index2)=>item1===item2 && index1!==index2).length>0) return true; else return false;}).length>0){
					alert("No Duplicate values are allowed")
				}
				else{
					onLoading(true);
					let temp = structuredClone(category)
					ChangeAction(null)
					//console.log(category)
					dispatch(updateDetails(temp,"category",navigate,onLoading))
				}
			}
		}
		else{
			let temp = []
			if(category.filter((item)=>item.action===true || item.action==="Delete").length===0){
				alert("No changes found to update the list")
			}
			else{
				if(category.filter((item1)=>{if(User.category.filter((item2)=>item1.name===item2 && item1.action===true).length>0) return true; else return false;}).length>0){
					alert("The value you have edited now, is already exist in the list")
				}
				else if(category.filter((item1)=>{if(category.filter((item2)=>item1.name===item2.name && item1.index!==item2.index).length>0) return true; else return false;}).length>0){
					alert("No duplicate values are allowed")
				}
				else{
					category.filter((item)=>item.action===true || item.action==="Delete").map((item)=>{
						temp.push({
							name:item.name,
							index:item.index,
							action:item.action!=="Delete"?"Edit":"Delete"
						})
						return true;
					})
					onLoading(true);
					ChangeAction(null)
					console.log(temp)
					dispatch(editDetails(temp,"category",navigate,onLoading))
				}
			}
		}
	}

	if(ref1.current && height1===-1){
		changeHeight()
	}
	
	console.log(profile)
	console.log(User)
	console.log(type)
	console.log(category)
	console.log(method)
	console.log(bankList)

	return (
		<div className='tabContent'>
			<div className='tabContent1'>
				{
					User && bankList &&
				
				<div className='setting-content d-flex align-items-start'>
					<div style={{height:(height-110>height1?height-110:height1)}} className='setting-content-1'>
						<div style={{margin:"30px 0px"}}>
							<ul ref={ref}>
								<li title="Profile" className='active1 menu-list' onClick={(_e)=>openMenu("profile",0,0)}>
									<i className='bx bx-user'/><span>Profile</span>
								</li>
								<li title="Expense Types" className='menu-list' onClick={(_e)=>openMenu("type",1,0)}>
									<i className='bx bx-receipt'/><span>Expense Types</span>
								</li>
								<li title="Categories" className='menu-list' onClick={(_e)=>openMenu("category",2,0)}>
									<i className='bx bx-list-plus'/><span>Categories</span>
								</li>
								<li title="Payment Methods" className='menu-list' onClick={(_e)=>openMenu("method",3,0)}>
									<i className='bx bx-wallet'/><span>Payment Methods</span>
								</li>
							</ul>
						</div>
					</div>
					
					<div ref={ref1} className='setting-content-2 row justify-content-start'>
					{
						menu==="profile" && 
							<>
							<table className='col-xl-6 col-lg-8 col-md-9 col-sm-11 profile-table'>
								<tr>
									<td colSpan={2}>
										<span style={{fontSize:"20px"}}>Your Personal Details : </span>
									</td>
								</tr>
								<tr>
									<td>First Name</td>
									<td><Input value={profile.fname===""?User.fname:profile.fname} onChange={(value)=>setProfile((prev)=>{return {...prev,fname:value}})} className='element' /></td>
								</tr>
								<tr>
									<td>Last Name</td>
									<td><Input value={profile.lname===""?User.lname:profile.lname} onChange={(value)=>setProfile((prev)=>{return {...prev,lname:value}})} className='element' /></td>
								</tr>
								<tr>
									<td>Gender</td>
									<td><SelectPicker value={profile.gender===null?User.gender:profile.gender} onClean={()=>setProfile((prev)=>{return{...prev,gender:null}})} onChange={(value)=>setProfile((prev)=>{return{...prev,gender:value}})} data={[{label:"Male",value:"male"},{label:"Female",value:"female"},{label:"Other",value:"other"}]} className='element' /></td>
								</tr>
								<tr>
									<td>E-mail ID</td>
									<td><Input value={User.email} className='element' readOnly /></td>
								</tr>
								<tr>
									<td colSpan={2} align="right"><button onClick={()=>handleProfile()} className='action'>Update</button></td>
								</tr>
							</table>

							<table className='col-xl-6 col-lg-8 col-md-9 col-sm-11 profile-table'>
								<tr>
									<td colSpan={2}>
										<span style={{fontSize:"20px"}}>Your Password Settings : </span>
									</td>
								</tr>
								<tr>
									<td>Current Password</td>
									<td>
										<InputGroup inside className='element'>
											<Input value={password.oldPass} onChange={(value)=>setPassword((prev)=>{return {...prev,oldPass:value}})} type={visible ? 'text' : 'password'} />
											<InputGroup.Button onClick={()=>setVisible(!visible)}>
												{visible ? <EyeIcon /> : <EyeSlashIcon />}
											</InputGroup.Button>
										</InputGroup>
									</td>
								</tr>
								<tr>
									<td>New Password</td>
									<td>
										<InputGroup inside className='element'>
											<Input value={password.newPass} onChange={(value)=>setPassword((prev)=>{return {...prev,newPass:value}})} type={visible1 ? 'text' : 'password'} />
											<InputGroup.Button onClick={()=>setVisible1(!visible1)}>
												{visible1 ? <EyeIcon /> : <EyeSlashIcon />}
											</InputGroup.Button>
										</InputGroup>
									</td>
								</tr>
								<tr>
									<td colSpan={2} align="right"><button onClick={()=>handlePassword()} className='action'>Change</button></td>
								</tr>
							</table>
							<table className='col-xl-6 col-lg-8 col-md-9 col-sm-11 profile-table'>
								<tr>
									<td>
										<span style={{fontSize:"20px"}}>Reset Your Data : </span>
									</td>
									<td>
										<button className='action'>Reset</button>
									</td>
								</tr>
								<tr>
									<td colSpan={2}> Note: If you reset your data then all the expense data will be erased and can't be retrieved. </td>
								</tr>
								
							</table>
							</>
					}
					{
						menu==="type" &&
						<>
						<table className='col-xl-6 col-lg-8 col-md-9 col-sm-11 type-table'>
							<tr>
								<td colSpan={3}>
									<span style={{fontSize:"20px",fontWeight:"bold"}}>Your Current Expense Types : </span>
								</td>
							</tr>
							<tr>
								<td><b>Name</b></td>
								<td><b>Type</b></td>
								<td></td>
							</tr>
							
							{
								buttonType==="Edit-type" &&
								type.filter((item)=>item.type!=="Income").map((item,index) => (
									item.action!=="Delete" &&
									<tr>
										<td><Input value={item.name} readOnly={!item.action} onChange={(value)=>changeType("name",index,value)}/></td>
										<td><SelectPicker style={{width:"150px"}} value={item.type} readOnly={!item.action} onChange={(value)=>changeType("type",index,value)} data={[{label:"Expense",value:"Expense"},{label:"Settlement Expense",value:"Settlement Expense"}]} onClean={()=>changeType("type",index,User.type[index].type)}  /></td>
										<td align='left'>&emsp;<i onClick={()=>changeType("action",index,!item.action)} className={item.action?"bx bx-x":"bx bxs-pencil"}></i>&ensp;<i onClick={()=>changeType("action",index,"Delete")} className='bx bxs-trash'></i></td>
									</tr>
								))
							}
							{
								buttonType!=="Edit-type" &&
								User.type.filter((item)=>item.type!=="Income").map((item,index)=>(
									<tr>
										<td><Input value={item.name} readOnly={!item.action}/></td>
										<td><Input value={item.type} readOnly={!item.action}/></td>
										<td align='left'>&emsp;</td>
									</tr>
								))
							}
							{
								buttonType==="Edit-type" ? 
								<tr>
									<td><button className='action' onClick={()=>handleType("Edit")} >Save</button></td>
									<td><button className='action' onClick={()=>ChangeAction(null)}  >Cancel</button></td>
									<td></td>
								</tr>
								:
								<tr>
									<td><button className='action' onClick={()=>ChangeAction("New-type")} >New</button></td>
									<td><button className='action' onClick={()=>ChangeAction("Edit-type")}  >Edit</button></td>
									<td></td>
								</tr>

							}
						</table>
						</>
					}
					{
						menu==="category" &&
						<>
						<table className='col-xl-6 col-lg-8 col-md-9 col-sm-11 type-table'>
							<tr>
								<td colSpan={2}>
									<span style={{fontSize:"20px"}}>Your Current Caztegory Lists : </span>
								</td>
							</tr>
							{
								buttonCategory==="Edit-category" &&
								category.map((item,index) => (
									item.action!=="Delete" &&
									<tr>
										<td><Input value={item.name} readOnly={!item.action} onChange={(value)=>changeCategory("name",index,value)}/></td>
										<td align='left'>&emsp;<i onClick={()=>changeCategory("action",index,!item.action)} className={item.action?"bx bx-x":"bx bxs-pencil"}></i>&ensp;<i onClick={()=>changeCategory("action",index,"Delete")} className='bx bxs-trash'></i></td>
									</tr>
								))
							}{
								buttonCategory!=="Edit-category" &&
								User.category.map((item,index)=>(
									<tr>
										<td><Input value={item} readOnly={true}/></td>
										<td align='left'>&emsp;</td>
									</tr>
								))
							}
							{
								buttonCategory==="Edit-category" ? 
								<tr>
									<td><button className='action' onClick={()=>handleCategory("Edit")} >Save</button></td>
									<td><button className='action' onClick={()=>ChangeAction(null)}  >Cancel</button></td>
								</tr>
								:
								<tr>
									<td><button className='action' onClick={()=>ChangeAction("New-category")} >New</button></td>
									<td><button className='action' onClick={()=>ChangeAction("Edit-category")}  >Edit</button></td>
								</tr>

							}
						</table>
						</>
					}
					{
						menu==="method" &&
						<>
						<table className='col-xl-6 col-lg-8 col-md-9 col-sm-11 method-table'>
							<tr>
								<td colSpan={3}>
									<span style={{fontSize:"20px"}}>Your Current Payment Method : </span>
								</td>
							</tr>
							<tr>
								<td>Bank Name</td>
								<td>Amount</td>
								<td></td>
							</tr>
							{
								buttonMethod==="Edit-method" &&
								method.map((item,index) => (
									item.action!=="Delete" &&
									<tr>
										<td>
											<SelectPicker style={{width:"150px"}} value={item.name} readOnly={!item.action} onChange={(value)=>changeMethod("name",index,value)} onClean={()=>changeMethod("name",index,User.method[index].name)}  data={item.name==="Cash"?[{label:"Cash",value:"Cash"}]:bankList.map((item)=>{return{label:item.name,value:item.code}})}/>
										</td>
										<td>
											<Input type="number" value={item.amount} readOnly={!item.action} onChange={(value)=>changeMethod("amount",index,value)}/>
										</td>
										<td align='left'>
											&emsp;<i onClick={()=>changeMethod("action",index,!item.action)} className={item.action?"bx bx-x":"bx bxs-pencil"}></i>
											{ item.name!=="Cash" && <>&ensp;<i onClick={()=>changeMethod("action",index,"Delete")} className='bx bxs-trash'></i></>}
										</td>
									</tr>
								))
							}{
								buttonMethod!=="Edit-method" &&
								User.method.map((item,index)=>(
									<tr>
										<td><SelectPicker style={{width:"100%"}}  value={item.name} readOnly={true} data={item.name==="Cash"?[{label:"Cash",value:"Cash"}]:bankList.map((item)=>{return{label:item.name,value:item.code}})}  /></td>
										<td><Input value={item.amount} readOnly={true} /></td>
										<td align='left'>&emsp;</td>
									</tr>
								))
							}
							{
								buttonMethod==="Edit-method" ? 
								<tr>
									<td><button className='action' onClick={()=>handleMethod("Edit")} >Save</button></td>
									<td><button className='action' onClick={()=>ChangeAction(null)}  >Cancel</button></td>
								</tr>
								:
								<tr>
									<td><button className='action' onClick={()=>ChangeAction("New-method")} >New</button></td>
									<td><button className='action' onClick={()=>ChangeAction("Edit-method")}  >Edit</button></td>
								</tr>

							}
						</table>
						</>
					}
					</div>
				</div>
				}
			</div>
			<Modal size="xs" open={buttonType==="New-type"} onClose={()=>ChangeAction(null)}>
				<Modal.Header>
					<Modal.Title>Add Expense Type</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className='addexpensetype'>
						{
							User &&

							<table className='addType'>
								{
									type && type.map((item,index)=>(
										<tr>
											<td><Input value={item.name} onChange={(value)=>changeType("name",index,value)}/></td>
											<td><SelectPicker style={{width:"150px"}} value={item.type} onChange={(value)=>changeType("type",index,value)} data={[{label:"Expense",value:"Expense"},{label:"Settlement Expense",value:"Settlement Expense"}]} /></td>
											<td align='left'>&emsp;<i style={{position: "relative", top: "-10px"}} onClick={()=>changeType("action",index,"delete")} className='bx bxs-trash'></i></td>
										</tr>
									)) 
								}
								

							</table>
						}
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={()=>handleType("New")} color="green" appearance="primary">
						Save
					</Button>
					<Button onClick={()=>ChangeAction("Plus-Add-type")} appearance='primary'>
						Add
					</Button>
					<Button onClick={()=>ChangeAction(null)} color="gray" appearance="default">
						Cancel
					</Button>
				</Modal.Footer>
			</Modal>
			<Modal size="xs" open={buttonCategory==="New-category"} onClose={()=>ChangeAction(null)}>
				<Modal.Header>
					<Modal.Title>Add Category List</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className='addexpensetype'>
						{
							User &&

							<table className='addType'>
								{
									category && category.map((item,index)=>(
										<tr>
											<td><Input value={item} onChange={(value)=>changeCategory("",index,value)}/></td>
											<td align='left'>&emsp;<i onClick={()=>changeCategory("action",index,"delete")} className='bx bxs-trash'></i></td>
										</tr>
									)) 
								}
								

							</table>
						}
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={()=>handleCategory("New")} color="green" appearance="primary">
						Save
					</Button>
					<Button onClick={()=>ChangeAction("Plus-Add-category")} appearance='primary'>
						Add
					</Button>
					<Button onClick={()=>ChangeAction(null)} color="gray" appearance="default">
						Cancel
					</Button>
				</Modal.Footer>
			</Modal>
			<Modal size="xs" open={buttonMethod==="New-method"} onClose={()=>ChangeAction(null)}>
				<Modal.Header>
					<Modal.Title>Add Payment Method and Wallet</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className='addexpensetype'>
						{
							User &&
							<table className='addType'>
								{
									method && method.map((item,index) => (
										<tr>
											<td>
												<SelectPicker style={{width:"150px"}} value={item.name} onChange={(value)=>changeMethod("name",index,value)} data={item.name==="Cash"?[{label:"Cash",value:"Cash"}]:bankList.map((item)=>{return{label:item.name,value:item.code}})}/>
											</td>
											<td>
												<Input type="number" value={item.amount} onChange={(value)=>changeMethod("amount",index,value)}/>
											</td>
											<td align='left'>
												&ensp;<i style={{position:"relative",top:"-10px"}} onClick={()=>changeMethod("action",index,"delete")} className='bx bxs-trash'></i>
											</td>
										</tr>
									))
								}
								

							</table>
						}
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={()=>handleMethod("New")} color="green" appearance="primary">
						Save
					</Button>
					<Button onClick={()=>ChangeAction("Plus-Add-method")} appearance='primary'>
						Add
					</Button>
					<Button onClick={()=>ChangeAction(null)} color="gray" appearance="default">
						Cancel
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	)
}

export default Settings
