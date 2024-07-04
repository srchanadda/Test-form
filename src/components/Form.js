import React, { useRef, useEffect, useState, } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'
import '../components/FormStyles.css'
import Data from '../components/sample-data.json'
import Edit_icons from '../asset/pencil.png'


export default function Form({ navigation }) {
    const navigate = useNavigate();
    const [isName, setName] = useState("")
    const [isSurName, setSurName] = useState("")
    const [isGender, setGender] = useState("")
    const [isScore, setScore] = useState("")
    const [isData, setData] = useState([])
    //แสดงข้อความ alert
    const [isNameError, setNameError] = useState("")
    const [isSurNameError, setSurNameError] = useState("")
    const [isGenderError, setGenderError] = useState("")
    const [isScoreError, setScoreError] = useState("")
    console.log('Loading Data', Data);
    //เมื่อแก้ไขข้อมูล
    const [isEditON, setEditON] = useState(false)
    const [isNameEdit, setNameEdit] = useState("")
    const [isSurNameEdit, setSurNameEdit] = useState("")
    const [isGenderEdit, setGenderEdit] = useState("")
    const [isScoreEdit, setScoreEdit] = useState("")
    //ค่าที่จะแก้ไข
    const [isEditItem, setEditItem] = useState({})
    const [isEditIndex, setEditIndex] = useState(null)

    useEffect(() => {
        console.log("หน้าหลัก");
        let Arr = Data.map(item => {
            return {
                ...item,
                score: parseFloat(item.score).toFixed(2)
            };
        });
        setData(Arr)
    }, []);

    useEffect(() => {
        if (isEditON && isEditIndex !== null) {
            setNameEdit(isData[isEditIndex].firstname || '');
        }
        if (isEditON && isEditIndex !== null) {
            setSurNameEdit(isData[isEditIndex].lastname || '');
        }
        if (isEditON && isEditIndex !== null) {
            setGenderEdit(isData[isEditIndex].gender || '');
        }
        if (isEditON && isEditIndex !== null) {
            setScoreEdit(isData[isEditIndex].score || '');
        }
    }, [isEditON, isData, isEditIndex]);

    const AddData = () => {
        if (!isName) {
            setNameError('First name is required.')
        }
        else {
            setNameError('')
        }
        if (!isSurName) {
            setSurNameError('Last name is required')
        }
        else {
            setSurNameError('')
        }
        if (!isGender) {
            setGenderError('Gender is required')
        }
        else {
            setGenderError('')
        }
        if (!isScore) {
            setScoreError('Score  is required')
        }
        else {
            setScoreError('')
        }
        if (isName && isSurName && isGender && isScore) {
            let numberScore = parseInt(isScore, 10);
            if (numberScore < 0) {
                setScoreError('Minimum is 0')
            }
            else if (numberScore > 100) {
                setScoreError('Maximum is 100')
            }
            else {
                const Arr = [...isData]
                const lastId = Arr.length > 0 ? Arr[Arr.length - 1].id : 0;
                let newitem = {
                    id: lastId + 1,
                    firstname: isName,
                    lastname: isSurName,
                    gender: isGender,
                    score: parseFloat(isScore).toFixed(2)
                }
                Arr.push(newitem)
                setData(Arr)
                ResetValue()
            }
        }
    }

    const ResetValue = () => {
        setName('')
        setSurName('')
        setGender('')
        setScore('')
        setNameError('')
        setSurNameError('')
        setGenderError('')
        setScoreError('')
        setEditON(false)
        setEditItem({})
        setEditIndex(null)
        setSurNameEdit('')
        setGenderEdit('')
        setScoreEdit('')
        setNameEdit('')

    }

    console.log('reset', isData);

    const Edit_Data = (valueRow, rowIdx) => {
        setEditON(true)
        console.log('ค่าที่ต้องการแก้ไข', valueRow);
        setName(valueRow.firstname)
        setSurName(valueRow.lastname)
        setGender(valueRow.gender)
        setScore(valueRow.score)
        setEditItem(valueRow)
        setEditIndex(rowIdx)
    }

    const On_Edit = () => {
        console.log('555',isNameEdit,isSurNameEdit,isGenderEdit,isScoreEdit);
        if (!isNameEdit || !isName) {
            setNameError('First name is required.')
        }
        else {
            setNameError('')
        }
        if (!isSurNameEdit || !isSurName) {
            setSurNameError('Last name is required')
        }
        else {
            setSurNameError('')
        }
        if (!isGenderEdit || !isGender) {
            setGenderError('Gender is required')
        }
        else {
            setGenderError('')
        }
        if (!isScoreEdit || !isScore) {
            setScoreError('Score  is required')
        }
        else {
            setScoreError('')
        }
        if (isNameEdit && isSurNameEdit && isGenderEdit && isScoreEdit) {
        let numberScore = parseInt(isScoreEdit, 10);
        if (numberScore < 0) {
            setScoreError('Minimum is 0')
        }
        else if (numberScore > 100) {
            setScoreError('Maximum is 100')
        }
        else {
            const Arr = [...isData]
            Arr[isEditIndex] = {
                id: isEditItem.id,
                firstname: isNameEdit || isEditItem.firstname,
                lastname: isSurNameEdit || isEditItem.lastname,
                gender: isGenderEdit || isEditItem.gender,
                score: parseFloat(isScoreEdit).toFixed(2) || parseFloat(isEditItem.score).toFixed(2)
            }
            setData(Arr)
            ResetValue()
        }
     }
    }

    return (
        <>
            <div>
                <div className='Form-styles'>
                        <div className='Form-rows' style={{ marginTop: 20 }}>
                            <div style={{ display: "flex", flexDirection: 'column' }}>
                                <div style={{ display: 'flex', flexDirection: "row" }}>
                                    <div>First name </div>
                                    <div style={{ color: 'red', marginLeft: 5 }}> *</div>
                                </div>
                                <input
                                    className='form-layout'
                                    value={isEditON ? isNameEdit : isName}
                                    onChange={(E) => (isEditON == false) ? setName(E.target.value) : setNameEdit(E.target.value)}
                                />
                                {(isNameError == '') ? <div style={{ color: 'red', justifySelf: 'left', display: 'flex' }}>⠀</div> 
                                : <div style={{ color: 'red', justifySelf: 'left', display: 'flex' }}>{isNameError}</div>}
                            </div>
                            <div style={{ display: "flex", flexDirection: 'column', marginLeft: 50, }}>
                                <div style={{ display: 'flex', flexDirection: "row" }}>
                                    <div>Last name </div>
                                    <div style={{ color: 'red', marginLeft: 5 }}> *</div>
                                </div>
                                <input
                                    className='form-layout'
                                    value={isEditON ? isSurNameEdit : isSurName}
                                    onChange={(E) => (isEditON == false) ? setSurName(E.target.value) : setSurNameEdit(E.target.value)}
                                />
                                {(isSurNameError == '') ? <div style={{ color: 'red', justifySelf: 'left', display: 'flex' }}>⠀</div> 
                                : <div style={{ color: 'red', justifySelf: 'left', display: 'flex' }}>{isSurNameError}</div>}
                            </div>
                        </div>
                        <div className='Form-rows' style={{ marginTop: 20 }}>
                            <div style={{ display: "flex", flexDirection: 'column' }}>
                                <div style={{ display: 'flex', flexDirection: "row" }}>
                                    <div>Gender </div>
                                    <div style={{ color: 'red', marginLeft: 5 }}> *</div>
                                </div>
                                <div style={{ position: 'relative', display: 'inline-block' }}>
                                    <select className='Dropdown-list'
                                        value={isEditON ? isGenderEdit : isGender}
                                        onChange={(E) => (isEditON == false) ? setGender(E.target.value) : setGenderEdit(E.target.value)}
                                    >
                                        <option value=""></option>
                                        <option value="M">Male</option>
                                        <option value="F">Female</option>
                                        <option value="U">Unknown</option>
                                    </select>
                                    <div className='Dropdown-transition'></div>
                                </div>
                                {(isGenderError == '') ? <div style={{ color: 'red', justifySelf: 'left', display: 'flex' }}>⠀</div>
                                : <div style={{ color: 'red', justifySelf: 'left', display: 'flex' }}>{isGenderError}</div>}
                            </div>
                            <div style={{ display: "flex", flexDirection: 'column', marginLeft: 50, }}>
                                <div style={{ display: 'flex', flexDirection: "row" }}>
                                    <div>Score </div>
                                    <div style={{ color: 'red', marginLeft: 5 }}> *</div>
                                </div>
                                <input
                                    className='form-layout'
                                    value={isEditON ? isScoreEdit : isScore}
                                    onChange={(E) => {
                                        const numericValue = E.target.value.replace(/[^0-9.-]/g, '');
                                        (isEditON == false) ? setScore(numericValue) : setScoreEdit(numericValue)
                                    }
                                    }
                                />
                                {(isScoreError == '') ? <div style={{ color: 'red', justifySelf: 'left', display: 'flex' }}>⠀</div> 
                                : <div style={{ color: 'red', justifySelf: 'left', display: 'flex' }}>{isScoreError}</div>}
                            </div>
                        </div>
                    <div style={{ flexDirection: 'row', display: 'flex' }}>

                        {(isEditON == false)
                            ?
                            <div className='button-color' onClick={() => AddData()}>
                                <div style={{ fontSize: 20, color: 'white' }} >Add</div>
                            </div>
                            : <div className='button-color' onClick={() => On_Edit()}>
                                <div style={{ fontSize: 20, color: 'white' }} >Edit</div>
                            </div>
                        }
                        <div className='button-cancel' onClick={() => ResetValue()}>
                            <div style={{ fontSize: 20, }}>Cancel</div>
                        </div>
                    </div>
                    <div style={{ marginTop: 30, width: "100%", marginRight: 20 }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'Prompt-Regular', fontSize: 16 }}>
                            <thead>
                                <tr style={{ backgroundColor: '#8ca8d8', color: 'white' }}>
                                    <td style={{ border: '1px solid #fafafa' }}><p>No.</p></td>
                                    <td style={{ border: '1px solid #fafafa' }}></td>
                                    <td style={{ border: '1px solid #fafafa',textAlign:'left',paddingLeft:20 }}><p>First name</p></td>
                                    <td style={{ border: '1px solid #fafafa',textAlign:'left',paddingLeft:20 }}><p>Last name</p></td>
                                    <td style={{ border: '1px solid #fafafa' }}><p>Gender</p></td>
                                    <td style={{ border: '1px solid #fafafa' }}><p>Score</p></td>
                                </tr>
                            </thead>
                            <tbody>
                                {isData.map((row, rowIdx) => (
                                    <tr style={{ backgroundColor: (row.id % 2 === 0) ? null : 'white' }}>
                                        <td style={{ border: '1px solid #fafafa', }}><p>{row.id}</p></td>
                                        <td style={{ border: '1px solid #fafafa', cursor: 'pointer' }} onClick={() => Edit_Data(row, rowIdx)}><img src={Edit_icons} style={{ width: 20, height: 20, }} /></td>
                                        <td style={{ border: '1px solid #fafafa',textAlign:'left',paddingLeft:20 }}><p>{row.firstname}</p></td>
                                        <td style={{ border: '1px solid #fafafa',textAlign:'left',paddingLeft:20 }}><p>{row.lastname}</p></td>
                                        <td style={{ border: '1px solid #fafafa' }} title={(row.gender == 'M') ? 'Male' : (row.gender == 'F') ? 'Female' : 'Unknown'}><p>{row.gender}</p></td>
                                        <td style={{ border: '1px solid #fafafa' }}><p>{row.score}</p></td>
                                    </tr>
                                ))}</tbody>

                        </table>
                    </div>
                </div >
            </div >
        </>

    );
};