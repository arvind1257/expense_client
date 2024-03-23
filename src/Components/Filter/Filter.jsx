import React from 'react'
import { Stack, Divider, Popover, Whisper, Dropdown,CheckboxGroup,Checkbox } from 'rsuite'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Filter.css"
import 'rsuite/dist/rsuite.min.css';
import 'bootstrap/dist/css/bootstrap.min.css'

const Filter = ({methodList,typeList,categoryList,changeValue,from,to,method,type,category,getMinDate}) => {

    const ref = React.useRef();
    
    const MenuPopover = React.forwardRef(({ selection, ...rest }, ref) => (
        <Popover ref={ref} {...rest}>
            
                <Dropdown.Menu className='Filter-DropDown'>
                    
                    {
                        selection === "method" &&
                        <CheckboxGroup value={method}>
                        {
                            methodList.map((item)=>(
                            <Checkbox onChange={(value) => { changeValue(selection,value); handleSelectMenu(); }} value={item} >{item}</Checkbox>
                        ))
                        }
                        </CheckboxGroup>
                    }
                    {
                        selection === "type" &&
                        <CheckboxGroup value={type}>{
                        typeList.map((item)=>(
                        <Checkbox onChange={(value) => { changeValue(selection,value); handleSelectMenu(); }} value={item} >{item}</Checkbox>
                        ))
                        }
                        </CheckboxGroup>
                    }
                    {
                        selection === "category" &&
                        <CheckboxGroup value={category}>{
                        categoryList.map((item)=>(
                        <Checkbox onChange={(value) => { changeValue(selection,value); handleSelectMenu(); }} value={item} >{item}</Checkbox>
                        ))
                        }</CheckboxGroup>
                    }
                </Dropdown.Menu>
            
        </Popover>

    ));

    function handleSelectMenu() {
        ref.current.close();
    }

    return (
        <>
            <div className='Filter-Container'>
                <Stack className='Filter-Stack' divider={<Divider vertical />}>
                    <div className='filter-date'>
                        <label className='filter-input-label'>From</label>
                        <DatePicker onKeyUp={(e)=>e.preventDefault()} onKeyDown={(e)=>e.preventDefault()} className='filter-input-text' selected={new Date(from)} onChange={(value) => changeValue("from",value) } dateFormat="MMM dd,yyyy" oneTap size="md" placeholder="Select Move-in Date" maxDate={ getMinDate()} />
                    </div>
                    
                    <div className='filter-date'>
                        <label className='filter-input-label'>To</label>
                        <DatePicker onKeyUp={(e)=>e.preventDefault()} onKeyDown={(e)=>e.preventDefault()} className='filter-input-text' selected={new Date(to)} onChange={(value) => changeValue("to",value)} dateFormat="MMM dd,yyyy" oneTap size="md" placeholder="Select Move-in Date" maxDate={getMinDate()} />
                    </div>
                    <div className='filter-method'>
                        <label className='filter-input-label'>Method</label>
                        <Whisper
                            placement="bottomStart"
                            controlId="control-id-with-dropdown"
                            trigger="click"
                            ref={ref}
                            speaker={<MenuPopover selection="method" />}
                        >
                            <input value={method.toString()} id="method" onKeyUp={(e)=>e.preventDefault()} onKeyDown={(e)=>e.preventDefault()} onChange={(e) => {  }} type='text' placeholder='Select Payment Method' className='filter-input-text' />
                        </Whisper>
                    </div>
                    <div className='filter-type'>
                        <label className='filter-input-label'>Type</label>
                        <Whisper
                            placement="bottomStart"
                            controlId="control-id-with-dropdown"
                            trigger="click"
                            ref={ref}
                            speaker={<MenuPopover selection="type" />}
                        >
                            <input value={type.toString()} id="type" onKeyUp={(e)=>e.preventDefault()} onKeyDown={(e)=>e.preventDefault()} onChange={(e) => {  }} type='text' placeholder='Select Expense Type' className='filter-input-text' />
                        </Whisper>
                    </div>
                    <div className='filter-category'>
                        <label className='filter-input-label'>Category</label>
                        <Whisper
                            placement="bottomStart"
                            controlId="control-id-with-dropdown"
                            trigger="click"
                            ref={ref}
                            speaker={<MenuPopover selection="category" />}
                        >
                            <input value={category.toString()} id="category" onKeyUp={(e)=>e.preventDefault()} onKeyDown={(e)=>e.preventDefault()} onChange={(e) => {  }} type='text' placeholder='Select Category' className='filter-input-text' />
                        </Whisper>
                    </div>
                </Stack>
            </div>
        </>
    )
}

export default Filter
